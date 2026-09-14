'use client';

import { useState } from 'react';
import { Drawer, Button, Tag, Space, Typography } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Books.module.css';

const { Title, Text, Paragraph } = Typography;

export default function BooksClient({ books }: { books: any[] }) {
  const [filterCat, setFilterCat] = useState<string | null>(null);
  const [filterLevel, setFilterLevel] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);

  const filteredBooks = books.filter(b => {
    if (filterCat && b.category !== filterCat) return false;
    if (filterLevel && b.level !== filterLevel) return false;
    return true;
  });

  const categories = Array.from(new Set(books.map(b => b.category)));
  const levels = Array.from(new Set(books.map(b => b.level)));

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={`${styles.pageTitle} view-transition-title`}>Books</h1>
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>CATEGORY</span>
            <button 
              className={`${styles.filterBtn} ${!filterCat ? styles.active : ''}`}
              onClick={() => setFilterCat(null)}
            >All</button>
            {categories.map(cat => (
              <button 
                key={cat}
                className={`${styles.filterBtn} ${filterCat === cat ? styles.active : ''}`}
                onClick={() => setFilterCat(cat as string)}
              >{cat}</button>
            ))}
          </div>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>LEVEL</span>
            <button 
              className={`${styles.filterBtn} ${!filterLevel ? styles.active : ''}`}
              onClick={() => setFilterLevel(null)}
            >All</button>
            {levels.map(lvl => (
              <button 
                key={lvl}
                className={`${styles.filterBtn} ${filterLevel === lvl ? styles.active : ''}`}
                onClick={() => setFilterLevel(lvl as string)}
              >{lvl}</button>
            ))}
          </div>
        </div>
      </header>

      <motion.div layout className={styles.grid}>
        <AnimatePresence>
          {filteredBooks.map(book => (
            <motion.div 
              layout
              transition={{ type: "spring", stiffness: 350, damping: 25, bounce: 0.2 }}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
              key={book.id} 
              className={styles.bookCard} 
              onClick={() => setSelectedBook(book)}
            >
              <div className={styles.coverWrapper}>
                {book.coverUrl ? (
                  <img src={book.coverUrl} alt={book.title} className={styles.coverImage} loading="lazy" />
                ) : (
                  <div className={styles.typographicCover}>
                    <div className={styles.typoTitle}>{book.title}</div>
                    <div className={styles.typoAuthor}>{book.author}</div>
                  </div>
                )}
                <div className={styles.bookOverlay}>
                  <span className={styles.overlayAction}>View Details</span>
                </div>
                {book.access === 'free' && (
                  <div className={styles.freeBadge}>FREE</div>
                )}
              </div>
              <div className={styles.bookMeta}>
                <h3 className={styles.bookTitle}>{book.title}</h3>
                <p className={styles.bookAuthor}>{book.author}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <Drawer
        title={<span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 400 }}>{selectedBook?.title}</span>}
        placement="right"
        width={450}
        onClose={() => setSelectedBook(null)}
        open={!!selectedBook}
        styles={{
          body: { padding: '24px' },
          header: { borderBottom: '1px solid var(--line)' }
        }}
      >
        {selectedBook && (
          <div className={styles.drawerContent}>
            <div className={styles.drawerMeta}>
              <Text style={{ fontFamily: 'var(--font-data)', color: 'var(--brass)' }}>{selectedBook.author}</Text>
              {selectedBook.year && <Text type="secondary" style={{ fontFamily: 'var(--font-data)' }}> • {selectedBook.year}</Text>}
            </div>
            
            <Space size="small" style={{ marginBottom: '2rem' }}>
              <Tag color="default" style={{ borderColor: 'var(--line)', background: 'var(--surface2)', color: 'var(--paper2)' }}>{selectedBook.category}</Tag>
              <Tag color="default" style={{ borderColor: 'var(--line)', background: 'var(--surface2)', color: 'var(--paper2)' }}>{selectedBook.level}</Tag>
              {selectedBook.hours && <Tag color="default" style={{ borderColor: 'var(--line)', background: 'var(--surface2)', color: 'var(--paper2)' }}>{selectedBook.hours} hours</Tag>}
            </Space>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>WHY IT MATTERS</div>
              <Paragraph style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--paper)' }}>
                {selectedBook.whyItMatters}
              </Paragraph>
            </div>

            {selectedBook.access === 'free' && selectedBook.freeUrl && (
              <div className={styles.section} style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--surface2)', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div className={styles.sectionTitle} style={{ margin: 0, color: 'var(--brass)' }}>FREE ACCESS</div>
                  <Button type="primary" href={selectedBook.freeUrl} target="_blank" style={{ background: 'var(--brass)', color: 'var(--on-brass)', fontWeight: 500 }}>
                    Read Now ↗
                  </Button>
                </div>
                {selectedBook.freeBasis && (
                  <Text type="secondary" style={{ fontSize: '13px', lineHeight: 1.5, display: 'block' }}>
                    {selectedBook.freeBasis}
                  </Text>
                )}
              </div>
            )}

            {selectedBook.citedBy && selectedBook.citedBy.length > 0 && (
              <div className={styles.section} style={{ marginTop: '2.5rem' }}>
                <div className={styles.sectionTitle}>RECOMMENDED BY</div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {selectedBook.citedBy.map((cite: string) => (
                    <Tag key={cite} color="default" style={{ borderColor: 'var(--line)', background: 'transparent', color: 'var(--paper2)' }}>
                      {cite}
                    </Tag>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
}
