'use client';

import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Link from 'next/link';
import styles from './Home.module.css';

gsap.registerPlugin(ScrollTrigger);

const LANDMARKS = [
  { id: 'latest',     name: 'The Feed',             sub: 'Latest discoveries & updates',        href: '/latest' },
  { id: 'books',      name: 'Publications',         sub: 'Curated books & monographs',          href: '/books' },
  { id: 'articles',   name: 'Editorials',           sub: 'Design theory & critical essays',     href: '/articles' },
  { id: 'talks',      name: 'Keynotes',             sub: 'Lectures, panels & conferences',      href: '/talks' },
  { id: 'podcasts',   name: 'Dialogues',            sub: 'Audio interviews with makers',        href: '/podcasts' },
  { id: 'references', name: 'Archive',              sub: 'Visual references & moodboards',      href: '/references' },
  { id: 'people',     name: 'Directory',            sub: 'Studios & independent makers',        href: '/people' },
  { id: 'work',       name: 'Case Studies',         sub: 'Deep dives into applied design',      href: '/work' },
  { id: 'notes',      name: 'Field Notes',          sub: 'Fragments, concepts & works in progress', href: '/notes' },
];

function getCSSVar(name: string, fallback: string) {
  if (typeof window === 'undefined') return fallback;
  return getComputedStyle(document.body).getPropertyValue(name).trim() || fallback;
}

import AuroraBackground from '@/components/AuroraBackground';
import HeroGallery from '@/components/HeroGallery';

export default function LandingSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    // Smooth Scroll Setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-char', 
        { y: 150, opacity: 0, rotateX: -90 },
        { 
          y: 0, opacity: 1, rotateX: 0, duration: 1.8, stagger: 0.08, ease: 'expo.out', delay: 0.2, transformOrigin: "50% 100%"
        }
      );
      gsap.fromTo('.hero-sub',
        { opacity: 0, y: 30 },
        { opacity: 0.7, y: 0, duration: 1.5, delay: 1.4, ease: 'power3.out' }
      );
      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(row,
          { opacity: 0, y: 80 },
          {
            opacity: 1, y: 0, duration: 1.2, ease: 'expo.out',
            scrollTrigger: { trigger: row, start: 'top 95%' }
          }
        );
      });
    }, containerRef);

    return () => {
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="hero-char" style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <>
      {/* Serene Aurora WebGL Background */}
      <AuroraBackground />

      <main className={styles.main} ref={containerRef}>
        <section className={styles.hero}>
          <HeroGallery />
          <div className={styles.heroText}>
            <div style={{ perspective: '1200px' }}>
              <h1 className={styles.heroTitle}>
                <div style={{ overflow: 'hidden', paddingBottom: '1rem' }}>{splitText('DESIGN')}</div>
                <div className={styles.italic} style={{ overflow: 'hidden', paddingBottom: '1rem' }}>{splitText('PORTAL')}</div>
              </h1>
            </div>
            <p className={`hero-sub ${styles.heroSub}`}>
              An archive of craft. Where modern makers map their references and trace their steps into the unknown.
            </p>
          </div>
        </section>

        

        <section className={styles.index}>
          <div className={styles.indexHeader}>
            <span>Index</span>
            <span>( 09 )</span>
          </div>
          
          {LANDMARKS.map((lm, i) => (
            <Link 
              key={lm.id} href={lm.href} className={styles.row}
              ref={(el) => { rowsRef.current[i] = el; }}
            >
              <span className={styles.rowNumber}>{(i + 1).toString().padStart(2, '0')}</span>
              <div className={styles.rowContent}>
                <h2 className={styles.rowName}>{lm.name}</h2>
                <span className={styles.rowSub}>{lm.sub}</span>
              </div>
              <div className={styles.rowArrow}>↗</div>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
