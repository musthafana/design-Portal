'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './HeroGallery.module.css';

const col1 = [
  { tag: 'TALK', title: 'The discipline of the grid', by: 'Massimo Vignelli', href: '/talks', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=400&h=600' },
  { tag: 'BOOK', title: 'The Vignelli Canon', by: 'Design Archive', href: '/books', img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=600' },
  { tag: 'ARTICLE', title: 'Typography in ten minutes', by: 'Butterick', href: '/articles', img: 'https://images.unsplash.com/photo-1561089489-0268571936c5?auto=format&fit=crop&q=80&w=400&h=600' },
  { tag: 'PODCAST', title: 'Design Matters', by: 'Debbie Millman', href: '/podcasts', img: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=400&h=600' },
  // duplicates
  { tag: 'TALK', title: 'The discipline of the grid', by: 'Massimo Vignelli', href: '/talks', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=400&h=600' },
  { tag: 'BOOK', title: 'The Vignelli Canon', by: 'Design Archive', href: '/books', img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=600' },
  { tag: 'ARTICLE', title: 'Typography in ten minutes', by: 'Butterick', href: '/articles', img: 'https://images.unsplash.com/photo-1561089489-0268571936c5?auto=format&fit=crop&q=80&w=400&h=600' },
  { tag: 'PODCAST', title: 'Design Matters', by: 'Debbie Millman', href: '/podcasts', img: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=400&h=600' },
];

const col2 = [
  { tag: 'COURSE', title: 'Make Your Own Fonts', by: 'Type Foundry', href: '/courses', img: 'https://images.unsplash.com/photo-1524673450801-b5aa9b621b76?auto=format&fit=crop&q=80&w=400&h=600' },
  { tag: 'WORK', title: 'Dashboard Design Service', by: 'Studio', href: '/work/dashboard-design-service', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=600' },
  { tag: 'PEOPLE', title: 'Josef Müller-Brockmann', by: 'Swiss Grid', href: '/people', img: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=400&h=600' },
  { tag: 'TALK', title: 'Beauty of Data Viz', by: 'David McCandless', href: '/talks', img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=400&h=600' },
  // duplicates
  { tag: 'COURSE', title: 'Make Your Own Fonts', by: 'Type Foundry', href: '/courses', img: 'https://images.unsplash.com/photo-1524673450801-b5aa9b621b76?auto=format&fit=crop&q=80&w=400&h=600' },
  { tag: 'WORK', title: 'Dashboard Design Service', by: 'Studio', href: '/work/dashboard-design-service', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=600' },
  { tag: 'PEOPLE', title: 'Josef Müller-Brockmann', by: 'Swiss Grid', href: '/people', img: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=400&h=600' },
  { tag: 'TALK', title: 'Beauty of Data Viz', by: 'David McCandless', href: '/talks', img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=400&h=600' },
];

function Card({ item }: { item: any }) {
  return (
    <Link href={item.href} className={styles.card}>
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
  );
}

export default function HeroGallery() {
  return (
    <div className={styles.gallery}>
      <div className={styles.track} style={{ '--duration': '40s', '--direction': 'normal' } as React.CSSProperties}>
        <div className={styles.scroller}>
          {col1.map((item, i) => (
            <Card key={`c1-${i}`} item={item} />
          ))}
        </div>
      </div>

      <div className={styles.track} style={{ '--duration': '50s', '--direction': 'reverse' } as React.CSSProperties}>
        <div className={styles.scroller}>
          {col2.map((item, i) => (
            <Card key={`c2-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
