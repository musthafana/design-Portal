import { Story } from '@/lib/types';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Thumbnail from './Thumbnail';
import FavoriteButton from './FavoriteButton';
import styles from './StoryRow.module.css';

dayjs.extend(relativeTime);

interface StoryRowProps {
  story: Story;
  onArchive: (id: string) => void;
  onRead: (id: string) => void;
  isArchived: boolean;
  isRead: boolean;
}

export default function StoryRow({ story, onArchive, onRead, isArchived, isRead }: StoryRowProps) {
  if (isArchived) return null;

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 350, damping: 25, bounce: 0.2 }}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
      className={`${styles.row} ${isRead ? styles.read : ''} has-favorite`}
      onClick={() => onRead(story.id)}
    >
      <div className={`${styles.importanceBar} ${styles[story.importance]}`} />
      
      <div style={{ marginRight: '1.5rem' }}>
        <Thumbnail title={story.title} size="small" />
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.category}>{story.category}</span>
          <span className={styles.dot}>·</span>
          <span>{story.sourceName}</span>
          <span className={styles.dot}>·</span>
          <span>{dayjs(story.publishedAt).fromNow()}</span>
          <span className={styles.dot}>·</span>
          <span>{story.readMinutes} min</span>
        </div>

        <a href={story.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
          <h2 className={styles.title}>
            {story.title}
            <span className={styles.arrow}>↗</span>
          </h2>
        </a>

        {story.whyItMatters && (
          <p className={styles.why}>{story.whyItMatters}</p>
        )}
      </div>

      <div className={styles.actions}>
        <FavoriteButton item={{ id: story.id, type: 'article', title: story.title, subtitle: story.sourceName, url: story.url, metadata: story }} className={styles.favBtnOverride} />
        <button
        onClick={(e) => {
          e.stopPropagation();
          onArchive(story.id);
        }}
        className={styles.archiveBtn}
        aria-label="Archive story"
        title="Archive"
      >
        ⌫
      </button>
      </div>
    </motion.div>
  );
}
