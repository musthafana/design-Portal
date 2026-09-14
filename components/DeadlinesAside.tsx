import React from 'react';
import opportunitiesData from '@/data/opportunities.json';
import { extractUpcomingDeadlines } from '@/lib/utils';
import dayjs from 'dayjs';
import styles from './DeadlinesAside.module.css';

export default function DeadlinesAside() {
  const deadlines = extractUpcomingDeadlines(opportunitiesData).slice(0, 5); // top 5 closest

  if (deadlines.length === 0) return null;

  return (
    <aside className={styles.aside}>
      <h3 className={styles.title}>Deadlines</h3>
      <ul className={styles.list}>
        {deadlines.map(({ opp, date, daysRemaining }) => (
          <li key={`${opp.id}-${date.valueOf()}`} className={styles.item}>
            <div className={styles.days}>
              {daysRemaining === 0 ? 'Today' : `In ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}`}
            </div>
            <a href={opp.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {opp.name}
            </a>
            <div className={styles.date}>{date.format('D MMM YYYY')}</div>
          </li>
        ))}
      </ul>
      
      {/* Continue stub per step 3 spec (Notes is Step 8) */}
      <div className={styles.continueSection}>
        <h3 className={styles.title}>Continue</h3>
        <p className={styles.emptyNotes}>No recent notes.</p>
      </div>
    </aside>
  );
}
