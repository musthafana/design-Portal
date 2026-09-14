'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './References.module.css';
import Thumbnail from './Thumbnail';

export default function ReferencesClient({ references }: { references: any[] }) {
  const kinds = Array.from(new Set(references.map(r => r.kind)));
  // Ensure "design-system" is first
  kinds.sort((a, b) => {
    if (a === 'design-system') return -1;
    if (b === 'design-system') return 1;
    return (a as string).localeCompare(b as string);
  });

  const [activeKind, setActiveKind] = useState<string>(kinds[0] as string);

  const filtered = references.filter(r => r.kind === activeKind);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={`${styles.pageTitle} view-transition-title`}>Archive</h1>
        <div className={styles.filters}>
          {kinds.map((kind: any) => (
            <button 
              key={kind}
              className={`${styles.filterBtn} ${activeKind === kind ? styles.active : ''}`}
              onClick={() => setActiveKind(kind)}
            >
              {kind.replace('-', ' ')}
            </button>
          ))}
        </div>
      </header>

      <motion.div layout className={styles.grid}>
        <AnimatePresence>
          {filtered.map(ref => (
            <motion.a 
              layout
              transition={{ type: "spring", stiffness: 350, damping: 25, bounce: 0.2 }}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
              key={ref.id} 
              href={ref.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.tile}
            >
              <Thumbnail title={ref.name} size="large" showOverlay={true} />
              <h3 className={styles.name}>{ref.name} <span className={styles.arrowOut}>↗</span></h3>
              {ref.learn && <p className={styles.learn}>{ref.learn}</p>}
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
