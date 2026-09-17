'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavorites, FavoriteItem } from '@/hooks/useFavorites';
import styles from './Favorites.module.css';
import Thumbnail from './Thumbnail';
import FavoriteButton from './FavoriteButton';
import TransitionLink from './TransitionLink';

// Helper to render the appropriate link
function FavoriteLink({ item, children, className }: { item: FavoriteItem, children: React.ReactNode, className: string }) {
  if (item.type === 'work' && item.metadata?.slug) {
    return <TransitionLink href={`/work/${item.metadata.slug}`} className={className}>{children}</TransitionLink>;
  }
  if (item.url) {
    return <a href={item.url} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
  }
  
  // For books/people/notes that don't have direct external links, just render a div
  return <div className={className}>{children}</div>;
}

export default function FavoritesClient() {
  const { favorites, isLoaded } = useFavorites();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  if (!isLoaded) return null;

  // Derive available categories from current favorites
  const categories = Array.from(new Set(favorites.map(f => f.type))).sort();

  const filtered = activeFilter === 'all' 
    ? favorites 
    : favorites.filter(f => f.type === activeFilter);

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 350, damping: 25 } }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={`${styles.pageTitle} view-transition-title`}>Favorites</h1>
        
        {favorites.length > 0 && (
          <div className={styles.filters}>
            <button 
              className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            {categories.map(cat => (
              <button 
                key={cat}
                className={`${styles.filterBtn} ${activeFilter === cat ? styles.active : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}s
              </button>
            ))}
          </div>
        )}
      </header>

      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <p>You haven't saved any items yet.</p>
          <span>Click the heart icon on any item to save it here.</span>
        </div>
      ) : (
        <motion.div 
          className={styles.grid}
          variants={containerVars}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map(item => (
              <motion.div 
                layout
                variants={itemVars}
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                style={{ 
                  background: 'var(--surface)', 
                  border: '1px solid var(--line)', 
                  padding: '1.5rem', 
                  position: 'relative' 
                }}
                className="has-favorite"
              >
                <FavoriteButton item={item} />
                <FavoriteLink item={item} className="">
                  <div style={{ marginBottom: '1rem' }}>
                    {item.image ? (
                       <img src={item.image} alt={item.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: '2px' }} />
                    ) : (
                       <Thumbnail title={item.title} size="large" showOverlay={false} />
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontFamily: 'var(--font-data)', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.05em' }}>
                      {item.type}
                    </span>
                    <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-main)' }}>{item.title}</h3>
                    {item.subtitle && (
                      <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>{item.subtitle}</p>
                    )}
                  </div>
                </FavoriteLink>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
