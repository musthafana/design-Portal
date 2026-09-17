'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MediaList.module.css';
import Thumbnail from './Thumbnail';
import FavoriteButton from './FavoriteButton';

interface MediaItem {
  title: string;
  year?: number;
  url: string;
  tags: string[];
  // flexible fields
  primaryPerson?: string; // author, speaker, or guest
  secondaryPerson?: string; // host
  durationInfo?: string; // readTime or duration
}

export default function MediaList({ 
  items, 
  title, 
  type 
}: { 
  items: MediaItem[], 
  title: string,
  type: 'articles' | 'talks' | 'podcasts' 
}) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = Array.from(new Set(items.flatMap(item => item.tags))).sort();

  const filteredItems = activeTag 
    ? items.filter(item => item.tags.includes(activeTag))
    : items;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={`${styles.pageTitle} view-transition-title`}>{title}</h1>
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
      </header>

      <ul className={styles.list}>
        <AnimatePresence>
          {filteredItems.map((item, idx) => (
            <motion.li 
              layout
              transition={{ type: "spring", stiffness: 350, damping: 25, bounce: 0.2 }}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
              key={`${item.title}-${idx}`} 
              className={`${styles.listItem} has-favorite`}
            >
              <FavoriteButton item={{ id: item.url || item.title, type, title: item.title, subtitle: item.primaryPerson, url: item.url, metadata: item }} className={styles.favBtn} />
              <div className={styles.itemMeta}>
                {item.year && <span className={styles.year}>{item.year}</span>}
                <span className={styles.duration}>{item.durationInfo}</span>
              </div>
              <Thumbnail title={item.title} />
              <div className={styles.itemContent}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.itemTitle}>
                  {item.title} <span className={styles.arrowOut}>↗</span>
                </a>
                <div className={styles.peopleBlock}>
                  {item.primaryPerson && <span className={styles.primaryPerson}>{item.primaryPerson}</span>}
                  {item.secondaryPerson && <span className={styles.secondaryPerson}> (Hosted by {item.secondaryPerson})</span>}
                </div>
                <div className={styles.tagsList}>
                  {item.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
