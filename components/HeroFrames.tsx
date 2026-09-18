'use client';

import Link from 'next/link';
import styles from './HeroFrames.module.css';

const items = [
  { label: 'The discipline of the grid', tag: 'TALK', href: '/talks', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=100&h=100' },
  { label: 'The Vignelli Canon', tag: 'BOOK', href: '/books', img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=100&h=100' },
  { label: 'Typography in ten minutes', tag: 'ARTICLE', href: '/articles', img: 'https://images.unsplash.com/photo-1561089489-0268571936c5?auto=format&fit=crop&q=80&w=100&h=100' },
  { label: 'Dashboard Design Service', tag: 'WORK', href: '/work', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=100&h=100' },
  { label: 'Josef Müller-Brockmann', tag: 'PEOPLE', href: '/people', img: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=100&h=100' },
  { label: 'Beauty of Data Viz', tag: 'TALK', href: '/talks', img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=100&h=100' },
  { label: 'Make Your Own Fonts', tag: 'COURSE', href: '/courses', img: 'https://images.unsplash.com/photo-1524673450801-b5aa9b621b76?auto=format&fit=crop&q=80&w=100&h=100' },
  { label: 'Apple Human Interface', tag: 'REFERENCE', href: '/references', img: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=100&h=100' },
  { label: 'Design Matters', tag: 'PODCAST', href: '/podcasts', img: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=100&h=100' },
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
              <img src={item.img} alt={item.label} className={styles.thumbnail} loading="lazy" />
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
                <img src={item.img} alt={item.label} className={styles.thumbnail} loading="lazy" />
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
