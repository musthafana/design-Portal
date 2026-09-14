'use client';
import React from 'react';
import styles from './Thumbnail.module.css';

export default function Thumbnail({ 
  title = '', 
  size = 'small',
  showOverlay = false
}: { 
  title?: string;
  size?: 'small' | 'large';
  showOverlay?: boolean;
}) {
  function hashString(str: string) {
    if (!str) return 0;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  }

  const hash = hashString(title);
  // Using picsum to provide a consistent image placeholder per item based on hash
  const imgUrl = `https://picsum.photos/seed/${hash}/400/300`;
  
  const isSmall = size === 'small';

  return (
    <div className={`${styles.thumbnailWrapper} ${isSmall ? styles.small : styles.large}`}>
      <img src={imgUrl} alt={title} className={styles.image} loading="lazy" />
      {showOverlay && (
        <div className={styles.overlay}>
          <span className={styles.overlayAction}>View Details</span>
        </div>
      )}
    </div>
  );
}
