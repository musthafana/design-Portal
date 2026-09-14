'use client';

import TransitionLink from './TransitionLink';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Rail.module.css';

interface RailProps {
  counts: Record<string, number>;
  status: {
    lastFetchRelative: string;
    sourceCount: number;
    failedSources: number;
  };
}

export default function Rail({ counts, status }: RailProps) {
  const pathname = usePathname();
  const [notesCount, setNotesCount] = useState<number | null>(null);

  // Hydrate notes count dynamically on the client
  useEffect(() => {
    const updateCount = () => {
      try {
        const stored = localStorage.getItem('desk_notes');
        if (stored) {
          const parsed = JSON.parse(stored);
          setNotesCount(Array.isArray(parsed) ? parsed.length : 0);
        } else {
          setNotesCount(0);
        }
      } catch {
        setNotesCount(0);
      }
    };
    
    updateCount();
    window.addEventListener('desk_notes_changed', updateCount);
    return () => window.removeEventListener('desk_notes_changed', updateCount);
  }, []);

  const groups = [
    {
      label: 'LATEST',
      items: [{ name: 'Latest', path: '/latest', count: counts.latest }],
    },
    {
      label: 'READ',
      items: [
        { name: 'Articles', path: '/articles', count: counts.articles },
        { name: 'Books', path: '/books', count: counts.books },
      ],
    },
    {
      label: 'WATCH',
      items: [
        { name: 'Talks', path: '/talks', count: counts.talks },
        { name: 'Podcasts', path: '/podcasts', count: counts.podcasts },
      ],
    },
    {
      label: 'LOOK',
      items: [
        { name: 'References', path: '/references', count: counts.references },
        { name: 'People', path: '/people', count: counts.people },
      ],
    },
    {
      label: 'GROW',
      items: [
        { name: 'Courses', path: '/courses', count: counts.courses },
        { name: 'Work', path: '/work', count: counts.work },
      ],
    },
    {
      label: 'MINE',
      items: [{ name: 'Notes', path: '/notes', count: notesCount }],
    },
  ];

  return (
    <aside className={styles.rail}>
      <nav className={styles.nav}>
        {/* Back to Landing Page Button */}
        <div className={styles.group}>
           <ul className={styles.itemList}>
             <li>
               <TransitionLink href="/" className={`${styles.itemLink} ${styles.returnLink}`}>
                 <span style={{ fontSize: '1.2em', marginRight: '6px' }}>↰</span>
                 <span>Portal</span>
               </TransitionLink>
             </li>
           </ul>
        </div>

        {groups.map((group) => (
          <div key={group.label} className={styles.group}>
            <div className={styles.groupLabel}>{group.label}</div>
            <ul className={styles.itemList}>
              {group.items.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li key={item.name}>
                    <TransitionLink
                      href={item.path}
                      className={`${styles.itemLink} ${
                        isActive ? styles.active : ''
                      }`}
                    >
                      <span>{item.name}</span>
                      {item.count !== null && (
                        <span className={styles.countBadge}>{item.count}</span>
                      )}
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className={styles.footer}>
        <p>Fetched {status.lastFetchRelative}</p>
        <p>{status.sourceCount} sources active</p>
        {status.failedSources > 0 && (
          <p className={styles.errorText}>
            {status.failedSources} source{status.failedSources > 1 ? 's' : ''} failed
          </p>
        )}
      </div>
    </aside>
  );
}
