'use client';

import Link from 'next/link';
import styles from './HeroFrames.module.css';

const items = [
  { label: 'The discipline of the grid', tag: 'TALK', href: '/talks' },
  { label: 'The Vignelli Canon', tag: 'BOOK', href: '/books' },
  { label: 'Typography in ten minutes', tag: 'ARTICLE', href: '/articles' },
  { label: 'Dashboard Design Service', tag: 'WORK', href: '/work' },
  { label: 'Josef Müller-Brockmann', tag: 'PEOPLE', href: '/people' },
  { label: 'Beauty of Data Viz', tag: 'TALK', href: '/talks' },
  { label: 'Make Your Own Fonts', tag: 'COURSE', href: '/courses' },
  { label: 'Apple Human Interface', tag: 'REFERENCE', href: '/references' },
  { label: 'Design Matters', tag: 'PODCAST', href: '/podcasts' },
];

// Double the items for seamless infinite scroll
const seamlessItems = [...items, ...items, ...items];

export default function HeroFrames() {
  return (
    <>
      {/* Top Horizontal Frame */}
      <div className={styles.topBar}>
        <div className={styles.scrollHorizontal}>
          {seamlessItems.map((item, i) => (
            <Link key={`top-${i}`} href={item.href} className={styles.link}>
              <span className={styles.tag}>{item.tag}</span>
              <span className={styles.label}>{item.label}</span>
              <span className={styles.dot}>+</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Right Vertical Frame */}
      <div className={styles.rightBarWrapper}>
        <div className={styles.rightBarRotator}>
          <div className={styles.scrollVertical}>
            {seamlessItems.map((item, i) => (
              <Link key={`right-${i}`} href={item.href} className={styles.link}>
                <span className={styles.tag}>{item.tag}</span>
                <span className={styles.label}>{item.label}</span>
                <span className={styles.dot}>+</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
