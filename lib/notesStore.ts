export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = 'desk_notes';

export function getNotes(): Note[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to parse notes', e);
    return [];
  }
}

export function saveNotes(notes: Note[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  // Dispatch custom event so Rail.tsx could theoretically update, 
  // though standard React doesn't auto-listen unless we add an event listener.
  window.dispatchEvent(new Event('desk_notes_changed'));
}

export function exportNotesToMarkdown(notes: Note[]): string {
  return notes.map(note => {
    const frontmatter = [
      '---',
      `id: ${note.id}`,
      `title: ${note.title.replace(/:/g, '&#58;')}`,
      `tags: [${note.tags.join(', ')}]`,
      `createdAt: ${note.createdAt}`,
      `updatedAt: ${note.updatedAt}`,
      '---'
    ].join('\n');
    return `${frontmatter}\n\n${note.content}\n\n`;
  }).join('---\n\n');
}

export function importNotesFromMarkdown(markdown: string): Note[] {
  const notes: Note[] = [];
  const rawNotes = markdown.split('---\n\n---'); // split by the divider if multiple
  
  // A more robust regex split for frontmatter blocks
  const blockRegex = /---\n([\s\S]*?)\n---\n([\s\S]*?)(?=\n---|__END__)/g;
  const searchString = markdown + '\n__END__';
  
  let match;
  while ((match = blockRegex.exec(searchString)) !== null) {
    const frontmatter = match[1];
    const content = match[2].trim();
    
    const idMatch = frontmatter.match(/id:\s*(.+)/);
    const titleMatch = frontmatter.match(/title:\s*(.+)/);
    const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/);
    const createdAtMatch = frontmatter.match(/createdAt:\s*(\d+)/);
    const updatedAtMatch = frontmatter.match(/updatedAt:\s*(\d+)/);
    
    if (idMatch && titleMatch) {
      notes.push({
        id: idMatch[1].trim(),
        title: titleMatch[1].trim().replace(/&#58;/g, ':'),
        content: content,
        tags: tagsMatch ? tagsMatch[1].split(',').map(t => t.trim()).filter(Boolean) : [],
        createdAt: createdAtMatch ? parseInt(createdAtMatch[1], 10) : Date.now(),
        updatedAt: updatedAtMatch ? parseInt(updatedAtMatch[1], 10) : Date.now(),
      });
    }
  }
  return notes;
}
