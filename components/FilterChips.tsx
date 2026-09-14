import React from 'react';
import styles from './FilterChips.module.css';

export type FilterOption = 'all' | 'must-see' | 'unread' | 'for-me' | 'archived' | 'design' | 'branding' | 'ai' | 'dataviz' | 'opportunity';

interface FilterChipsProps {
  activeFilters: FilterOption[];
  onToggle: (filter: FilterOption) => void;
}

export default function FilterChips({ activeFilters, onToggle }: FilterChipsProps) {
  const options: { id: FilterOption; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'must-see', label: 'Must-see' },
    { id: 'unread', label: 'Unread' },
    { id: 'for-me', label: 'For me' },
    { id: 'design', label: 'Design' },
    { id: 'branding', label: 'Branding' },
    { id: 'ai', label: 'AI' },
    { id: 'dataviz', label: 'DataViz' },
    { id: 'opportunity', label: 'Opportunities' },
    { id: 'archived', label: 'Archive' },
  ];

  return (
    <div className={styles.container}>
      {options.map((opt) => {
        const isActive = activeFilters.includes(opt.id) || (opt.id === 'all' && activeFilters.length === 0);
        return (
          <button
            key={opt.id}
            onClick={() => onToggle(opt.id)}
            className={`${styles.chip} ${isActive ? styles.active : ''}`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
