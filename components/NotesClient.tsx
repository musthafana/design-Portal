'use client';

import { useState, useEffect } from 'react';
import { Drawer, Button, Input, Tag, Space, message, Popconfirm, Upload } from 'antd';
import { UploadOutlined, DownloadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './Notes.module.css';
import { Note, getNotes, saveNotes, exportNotesToMarkdown, importNotesFromMarkdown } from '@/lib/notesStore';

const { TextArea } = Input;

export default function NotesClient() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Partial<Note> | null>(null);

  // Load notes on mount
  useEffect(() => {
    setNotes(getNotes());
  }, []);

  const handleSave = () => {
    const isNew = !editingNote?.id;
    
    // Fallback for crypto.randomUUID in non-secure contexts
    const generateId = () => {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
      }
      return Date.now().toString(36) + Math.random().toString(36).substring(2);
    };

    const newNote: Note = {
      id: editingNote?.id || generateId(),
      title: editingNote?.title?.trim() || 'Untitled Note',
      content: editingNote?.content || '',
      tags: editingNote?.tags || [],
      createdAt: editingNote?.createdAt || Date.now(),
      updatedAt: Date.now(),
    };

    let updatedNotes;
    if (isNew) {
      updatedNotes = [newNote, ...notes];
    } else {
      updatedNotes = notes.map(n => n.id === newNote.id ? newNote : n);
    }

    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    setIsDrawerOpen(false);
    setEditingNote(null);
    message.success(isNew ? 'Note created' : 'Note updated');
  };

  const handleDelete = (id: string) => {
    const updatedNotes = notes.filter(n => n.id !== id);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    message.success('Note deleted');
    if (editingNote?.id === id) {
      setIsDrawerOpen(false);
      setEditingNote(null);
    }
  };

  const handleExport = () => {
    const markdown = exportNotesToMarkdown(notes);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `desk_notes_export_${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
    message.success('Exported notes to Markdown');
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const imported = importNotesFromMarkdown(content);
      if (imported.length === 0) {
        message.error('No valid notes found in file');
        return;
      }
      
      // Merge: imported notes override existing if same ID, else appended
      const existingIds = new Set(notes.map(n => n.id));
      const newNotes = [...notes];
      
      imported.forEach(imp => {
        const index = newNotes.findIndex(n => n.id === imp.id);
        if (index >= 0) {
          newNotes[index] = imp;
        } else {
          newNotes.push(imp);
        }
      });
      
      setNotes(newNotes);
      saveNotes(newNotes);
      message.success(`Imported ${imported.length} notes`);
    };
    reader.readAsText(file);
    return false; // Prevent default upload
  };

  const allTags = Array.from(new Set(notes.flatMap(n => n.tags))).sort();
  const filteredNotes = activeTag ? notes.filter(n => n.tags.includes(activeTag)) : notes;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={`${styles.pageTitle} view-transition-title`}>Field Notes</h1>
          <Space>
            <Upload beforeUpload={handleImport} showUploadList={false} accept=".md">
              <Button icon={<DownloadOutlined />} className={styles.actionBtn}>Import</Button>
            </Upload>
            <Button icon={<UploadOutlined />} onClick={handleExport} className={styles.actionBtn} disabled={notes.length === 0}>Export</Button>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => { setEditingNote({ tags: [] }); setIsDrawerOpen(true); }}
              style={{ background: 'var(--brass)', color: 'var(--on-brass)', fontWeight: 500 }}
            >
              New Note
            </Button>
          </Space>
        </div>

        {allTags.length > 0 && (
          <div className={styles.tagCloud}>
            <button 
              className={`${styles.tagBtn} ${!activeTag ? styles.active : ''}`}
              onClick={() => setActiveTag(null)}
            >
              All
            </button>
            {allTags.map(tag => (
              <button 
                key={tag}
                className={`${styles.tagBtn} ${activeTag === tag ? styles.active : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </header>

      {notes.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No notes yet.</p>
          <p className={styles.emptySub}>Field notes are stored locally in your browser. Export them as Markdown to back them up.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredNotes.map(note => (
            <div key={note.id} className={styles.noteCard} onClick={() => { setEditingNote(note); setIsDrawerOpen(true); }}>
              <div className={styles.noteHeader}>
                <h3 className={styles.noteTitle}>{note.title}</h3>
                <span className={styles.noteDate}>{new Date(note.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className={styles.notePreview}>
                {note.content.substring(0, 150)}{note.content.length > 150 ? '...' : ''}
              </div>
              {note.tags.length > 0 && (
                <div className={styles.noteTags}>
                  {note.tags.map(tag => (
                    <span key={tag} className={styles.noteTag}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Drawer
        title={
          <Input 
            variant="borderless" 
            placeholder="Note Title" 
            value={editingNote?.title}
            onChange={e => setEditingNote(prev => ({ ...prev, title: e.target.value }))}
            style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--paper)', padding: 0 }}
          />
        }
        placement="right"
        width={600}
        onClose={() => { setIsDrawerOpen(false); setEditingNote(null); }}
        open={isDrawerOpen}
        styles={{
          body: { padding: '24px', display: 'flex', flexDirection: 'column', gap: '1rem' },
          header: { borderBottom: '1px solid var(--line)' }
        }}
        extra={
          <Space>
            {editingNote?.id && (
              <Popconfirm title="Delete this note?" onConfirm={() => handleDelete(editingNote.id!)} okText="Yes" cancelText="No">
                <Button danger type="text" icon={<DeleteOutlined />} />
              </Popconfirm>
            )}
            <Button onClick={handleSave} type="primary" style={{ background: 'var(--brass)', color: 'var(--on-brass)' }}>
              Save
            </Button>
          </Space>
        }
      >
        <Input 
          placeholder="Tags (comma separated, e.g. reference, ideas)" 
          value={editingNote?.tags?.join(', ')}
          onChange={e => {
            const tags = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
            setEditingNote(prev => ({ ...prev, tags }));
          }}
          style={{ background: 'var(--surface2)', borderColor: 'var(--line)', color: 'var(--paper)', fontFamily: 'var(--font-data)' }}
        />
        
        <TextArea 
          placeholder="Write your note in Markdown..."
          value={editingNote?.content}
          onChange={e => setEditingNote(prev => ({ ...prev, content: e.target.value }))}
          style={{ 
            flexGrow: 1, 
            background: 'var(--surface2)', 
            borderColor: 'var(--line)', 
            color: 'var(--paper)',
            fontFamily: 'var(--font-text)',
            fontSize: '15px',
            lineHeight: 1.6,
            resize: 'none'
          }}
        />
      </Drawer>
    </div>
  );
}
