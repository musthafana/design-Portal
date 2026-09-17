'use client';

import { useState, useEffect } from 'react';

export interface FavoriteItem {
  id: string;
  type: string;
  title: string;
  subtitle?: string;
  url?: string;
  image?: string;
  metadata?: any; 
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadFavs = () => {
      try {
        const stored = localStorage.getItem('desk_favorites');
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (e) {
        console.warn('Failed to load favorites', e);
      }
      setIsLoaded(true);
    };
    
    loadFavs();
    
    // Listen for cross-tab or same-tab events
    window.addEventListener('desk_favorites_changed', loadFavs);
    return () => window.removeEventListener('desk_favorites_changed', loadFavs);
  }, []);

  const toggleFavorite = (item: FavoriteItem) => {
    setFavorites((prev) => {
      const isFav = prev.some((x) => x.id === item.id);
      let next;
      if (isFav) {
        next = prev.filter((x) => x.id !== item.id);
      } else {
        next = [...prev, item];
      }
      localStorage.setItem('desk_favorites', JSON.stringify(next));
      
      // Dispatch event to update counts/state across components
      window.dispatchEvent(new Event('desk_favorites_changed'));
      
      return next;
    });
  };

  const isFavorite = (id: string) => favorites.some((x) => x.id === id);

  return { favorites, isLoaded, toggleFavorite, isFavorite };
}
