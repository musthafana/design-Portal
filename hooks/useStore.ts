'use client';

import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

interface DeskStore {
  archivedStoryIds: string[];
  readStoryIds: string[];
  lastVisit: string | null;
}

const DEFAULT_STORE: DeskStore = {
  archivedStoryIds: [],
  readStoryIds: [],
  lastVisit: null,
};

export function useDeskStore() {
  const [store, setStore] = useState<DeskStore>(DEFAULT_STORE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('desk_state');
      if (stored) {
        setStore(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load desk_state', e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    
    // Update last visit 5 seconds after page load
    const timer = setTimeout(() => {
      setStore((prev) => {
        const next = { ...prev, lastVisit: dayjs().toISOString() };
        localStorage.setItem('desk_state', JSON.stringify(next));
        return next;
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [isLoaded]);

  const toggleArchive = (id: string) => {
    setStore((prev) => {
      const isArchived = prev.archivedStoryIds.includes(id);
      const nextArchived = isArchived
        ? prev.archivedStoryIds.filter((x) => x !== id)
        : [...prev.archivedStoryIds, id];
      
      const next = { ...prev, archivedStoryIds: nextArchived };
      localStorage.setItem('desk_state', JSON.stringify(next));
      return next;
    });
  };

  const markRead = (id: string) => {
    setStore((prev) => {
      if (prev.readStoryIds.includes(id)) return prev;
      const next = { ...prev, readStoryIds: [...prev.readStoryIds, id] };
      localStorage.setItem('desk_state', JSON.stringify(next));
      return next;
    });
  };

  return { store, isLoaded, toggleArchive, markRead };
}
