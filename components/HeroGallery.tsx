'use client';

import Link from 'next/link';
import styles from './HeroGallery.module.css';

const bentoItems = [
  { 
    tag: 'CASE STUDY', 
    title: 'Dashboard Design Service', 
    by: 'Studio', 
    href: '/work/dashboard-design-service', 
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=400',
    className: styles.horizontal
  },
  { 
    tag: 'TALK', 
    title: 'The discipline of the grid', 
    by: 'Massimo Vignelli', 
    href: '/talks', 
    img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=400&h=800',
    className: styles.vertical
  },
  { 
    tag: 'BOOK', 
    title: 'The Vignelli Canon', 
    by: 'Design Archive', 
    href: '/books', 
    img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=400',
    className: styles.square1
  },
  { 
    tag: 'PEOPLE', 
    title: 'Josef Müller-Brockmann', 
    by: 'Swiss Grid', 
    href: '/people', 
    img: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=400&h=400',
    className: styles.square2
  }
];

export default function HeroGallery() {
  return (
    <div className={styles.bentoContainer}>
      <div className={styles.bentoGrid}>
        {bentoItems.map((item, i) => (
          <Link href={item.href} key={i} className={`${styles.card} ${item.className}`}>
            <div className={styles.imageWrapper}>
              <img src={item.img} alt={item.title} className={styles.image} loading="lazy" />
              <div className={styles.overlay} />
              <div className={styles.tagBadge}>{item.tag}</div>
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.by}>{item.by}</p>
            </div>
            <div className={styles.glow} />
          </Link>
        ))}
      </div>
    </div>
  );
}
