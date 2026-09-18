'use client';

import { useEffect, useRef } from 'react';
import styles from './LiveMarquee.module.css';

const row1 = [
  { tag: 'TALK', title: 'The discipline of the grid', by: 'Massimo Vignelli', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600&h=400' },
  { tag: 'BOOK', title: 'The Vignelli Canon', by: 'Design Archive', img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600&h=400' },
  { tag: 'ARTICLE', title: 'Typography in ten minutes', by: 'Butterick', img: 'https://images.unsplash.com/photo-1561089489-0268571936c5?auto=format&fit=crop&q=80&w=600&h=400' },
  { tag: 'PODCAST', title: 'Design Matters', by: 'Debbie Millman', img: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=600&h=400' },
  { tag: 'REFERENCE', title: 'Apple Human Interface', by: 'Guidelines', img: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=600&h=400' },
  // Duplicates for seamless loop
  { tag: 'TALK', title: 'The discipline of the grid', by: 'Massimo Vignelli', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600&h=400' },
  { tag: 'BOOK', title: 'The Vignelli Canon', by: 'Design Archive', img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600&h=400' },
  { tag: 'ARTICLE', title: 'Typography in ten minutes', by: 'Butterick', img: 'https://images.unsplash.com/photo-1561089489-0268571936c5?auto=format&fit=crop&q=80&w=600&h=400' },
  { tag: 'PODCAST', title: 'Design Matters', by: 'Debbie Millman', img: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=600&h=400' },
  { tag: 'REFERENCE', title: 'Apple Human Interface', by: 'Guidelines', img: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=600&h=400' },
];

const row2 = [
  { tag: 'COURSE', title: 'Make Your Own Fonts', by: 'Type Foundry', img: 'https://images.unsplash.com/photo-1524673450801-b5aa9b621b76?auto=format&fit=crop&q=80&w=600&h=400' },
  { tag: 'WORK', title: 'Dashboard Design Service', by: 'Studio', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400' },
  { tag: 'PEOPLE', title: 'Josef Müller-Brockmann', by: 'Swiss Grid', img: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=600&h=400' },
  { tag: 'TALK', title: 'Beauty of Data Viz', by: 'David McCandless', img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600&h=400' },
  { tag: 'REFERENCE', title: 'GOV.UK Design System', by: 'Gov Services', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600&h=400' },
  // Duplicates for seamless loop
  { tag: 'COURSE', title: 'Make Your Own Fonts', by: 'Type Foundry', img: 'https://images.unsplash.com/photo-1524673450801-b5aa9b621b76?auto=format&fit=crop&q=80&w=600&h=400' },
  { tag: 'WORK', title: 'Dashboard Design Service', by: 'Studio', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400' },
  { tag: 'PEOPLE', title: 'Josef Müller-Brockmann', by: 'Swiss Grid', img: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=600&h=400' },
  { tag: 'TALK', title: 'Beauty of Data Viz', by: 'David McCandless', img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600&h=400' },
  { tag: 'REFERENCE', title: 'GOV.UK Design System', by: 'Gov Services', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600&h=400' },
];

function Card({ item }: { item: any }) {
  return (
    <div className={styles.card}>
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
    </div>
  );
}

export default function LiveMarquee() {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Live Activity</h2>
        <span className={styles.liveIndicator}>
          <span className={styles.dot} />
          SYNCHRONIZING
        </span>
      </div>

      <div className={styles.marqueeWrapper}>
        {/* Left scrolling track */}
        <div className={styles.track} style={{ '--duration': '50s', '--direction': 'normal' } as React.CSSProperties}>
          <div className={styles.scroller}>
            {row1.map((item, i) => (
              <Card key={`r1-${i}`} item={item} />
            ))}
          </div>
        </div>

        {/* Right scrolling track */}
        <div className={styles.track} style={{ '--duration': '60s', '--direction': 'reverse' } as React.CSSProperties}>
          <div className={styles.scroller}>
            {row2.map((item, i) => (
              <Card key={`r2-${i}`} item={item} />
            ))}
          </div>
        </div>
        
        {/* Gradients to fade edges */}
        <div className={styles.fadeLeft} />
        <div className={styles.fadeRight} />
      </div>
    </section>
  );
}
