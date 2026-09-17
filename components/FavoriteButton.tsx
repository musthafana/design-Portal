'use client';

import { useFavorites, FavoriteItem } from '@/hooks/useFavorites';
import styles from './FavoriteButton.module.css';

export default function FavoriteButton({ item, className = '' }: { item: FavoriteItem, className?: string }) {
  const { isLoaded, isFavorite, toggleFavorite } = useFavorites();
  
  if (!isLoaded) return <div className={`${styles.placeholder} ${className}`} />;

  const active = isFavorite(item.id);

  return (
    <button 
      className={`${styles.button} ${active ? styles.active : ''} ${className}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(item);
      }}
      title={active ? "Remove from favorites" : "Add to favorites"}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
    >
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  );
}
