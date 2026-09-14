'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';
import newsData from '@/data/news.json';
import { Story } from '@/lib/types';
import { groupStoriesByDate } from '@/lib/utils';
import { useDeskStore } from '@/hooks/useStore';
import StoryRow from '@/components/StoryRow';
import FilterChips, { FilterOption } from '@/components/FilterChips';
import DeadlinesAside from '@/components/DeadlinesAside';

export default function LatestPage() {
  const { store, isLoaded, toggleArchive, markRead } = useDeskStore();
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>([]);

  const handleToggleFilter = (filter: FilterOption) => {
    if (filter === 'all') {
      setActiveFilters([]);
      return;
    }
    
    // Toggle logic for multi-select
    setActiveFilters((prev) => {
      if (prev.includes(filter)) {
        return prev.filter((f) => f !== filter);
      } else {
        // Remove 'archived' if selecting something else, or vice-versa, depending on UX. 
        // Let's just allow pure multi-select for now.
        return [...prev, filter];
      }
    });
  };

  const filteredStories = useMemo(() => {
    let stories = newsData.stories as Story[];

    // If 'archived' is NOT active, filter out archived items by default
    if (!activeFilters.includes('archived')) {
      stories = stories.filter((s) => !store.archivedStoryIds.includes(s.id));
    }

    if (activeFilters.length === 0) return stories;

    return stories.filter((story) => {
      // Must match ALL active filters (AND logic for status, OR logic for categories)
      // For simplicity, let's just do a basic match where if you select 'design', you see design.
      // If you select 'must-see' and 'design', it must be both.
      
      const cats = ['design', 'branding', 'ai', 'dataviz', 'opportunity'];
      const activeCats = activeFilters.filter((f) => cats.includes(f));
      const hasCatFilter = activeCats.length > 0;
      
      if (hasCatFilter && !activeCats.includes(story.category)) return false;
      if (activeFilters.includes('must-see') && story.importance !== 'must-see') return false;
      if (activeFilters.includes('unread') && store.readStoryIds.includes(story.id)) return false;
      if (activeFilters.includes('for-me') && !story.career) return false;
      if (activeFilters.includes('archived') && !store.archivedStoryIds.includes(story.id)) return false;

      return true;
    });
  }, [activeFilters, store.archivedStoryIds, store.readStoryIds]);

  const grouped = useMemo(() => groupStoriesByDate(filteredStories), [filteredStories]);

  return (
    <div style={{ display: 'flex', padding: '4rem 2rem', gap: '4rem', maxWidth: '1200px', margin: '0 auto' }}>
      
      <main style={{ flexGrow: 1, minWidth: 0 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 400, color: 'var(--paper)', margin: '0 0 2rem 0' }}>
          Latest
        </h1>

        <FilterChips activeFilters={activeFilters} onToggle={handleToggleFilter} />

        {!isLoaded ? (
          <div style={{ color: 'var(--muted)', fontFamily: 'var(--font-data)', fontSize: '12px' }}>Loading...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {grouped.map((group) => {
              // Check if the "New since last visit" divider should appear in this group
              let renderedDivider = false;
              
              return (
                <div key={group.header}>
                  <h2 style={{ fontFamily: 'var(--font-data)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', margin: '0 0 1rem 0', position: 'sticky', top: '1rem', background: 'var(--ground)', padding: '0.5rem 0', zIndex: 10 }}>
                    {group.header}
                  </h2>
                  
                  <motion.div layout>
                    <AnimatePresence>
                      {group.items.map((story) => {
                        const isNew = store.lastVisit && dayjs(story.publishedAt).isAfter(store.lastVisit);
                        const renderDividerBefore = !isNew && !renderedDivider && store.lastVisit;
                        if (renderDividerBefore) renderedDivider = true;

                        return (
                          <div key={story.id}>
                            {renderDividerBefore && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '2rem 0' }}>
                                <div style={{ height: '1px', flexGrow: 1, background: 'var(--line)' }} />
                                <span style={{ fontFamily: 'var(--font-data)', fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                  New since your last visit
                                </span>
                                <div style={{ height: '1px', flexGrow: 1, background: 'var(--line)' }} />
                              </div>
                            )}
                            <StoryRow
                              story={story}
                              onArchive={toggleArchive}
                              onRead={markRead}
                              isArchived={store.archivedStoryIds.includes(story.id)}
                              isRead={store.readStoryIds.includes(story.id)}
                            />
                          </div>
                        );
                      })}
                    </AnimatePresence>
                  </motion.div>
                </div>
              );
            })}
            
            {grouped.length === 0 && (
              <p style={{ color: 'var(--muted)', fontFamily: 'var(--font-text)' }}>No stories found.</p>
            )}
          </div>
        )}
      </main>

      <DeadlinesAside />

    </div>
  );
}
