'use client';

import { motion } from 'framer-motion';
import styles from './Courses.module.css';
import Thumbnail from './Thumbnail';
import FavoriteButton from './FavoriteButton';

export default function CoursesClient({ courses }: { courses: any[] }) {
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
        <h1 className={`${styles.pageTitle} view-transition-title`}>Courses</h1>
      </header>

      <motion.div 
        className={styles.grid}
        variants={containerVars}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {courses.map(course => (
          <motion.div variants={itemVars} key={course.id} className={`${styles.card} has-favorite`}>
            <FavoriteButton item={{ id: course.id, type: 'course', title: course.name, subtitle: course.provider, url: course.officialUrl, metadata: course }} />
            <div className={styles.cardHeader}>
              <Thumbnail title={course.name} size="large" showOverlay={true} />
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <h3 className={styles.name}>{course.name}</h3>
                <p className={styles.provider}>by {course.provider}</p>
              </div>
            </div>
            
            <div className={styles.metaRow}>
              <span className={styles.badge}>{course.level}</span>
              <span className={styles.badge}>{course.format}</span>
              <span className={styles.badge}>{course.field}</span>
            </div>

            <div className={styles.content}>
              <p className={styles.duration}>{course.durationNote}</p>
              
              <div className={styles.why}>
                <div className={styles.sectionLabel}>WHY TAKE IT</div>
                <p>{course.why}</p>
              </div>

              {course.recognitionEvidenceUrl && (
                <div className={styles.recognition}>
                  <div className={styles.sectionLabel}>RECOGNITION</div>
                  <p>{course.recognition}</p>
                  <a href={course.recognitionEvidenceUrl} target="_blank" rel="noopener noreferrer" className={styles.evidenceLink}>
                    View evidence ↗
                  </a>
                </div>
              )}
            </div>

            <div className={styles.footer}>
              {course.price !== null ? (
                <span className={styles.price}>{course.currency} {course.price}</span>
              ) : (
                <span className={styles.price}>See site for pricing</span>
              )}
              <a href={course.officialUrl} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                View Course
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
