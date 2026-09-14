'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './ServiceDetail.module.css';

export default function ServiceDetailClient({ service }: { service: any }) {
  const [calcDays, setCalcDays] = useState(5);
  const [calcRate, setCalcRate] = useState(500);
  const [calcPm, setCalcPm] = useState(15);
  const [calcComplexity, setCalcComplexity] = useState(0);

  const calculateTotal = () => {
    const base = calcDays * calcRate;
    const pm = base * (calcPm / 100);
    const comp = base * (calcComplexity / 100);
    return base + pm + comp;
  };

  const sectionVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const sections = [
    { id: "what", title: "What this service is" },
    { id: "who", title: "Who needs this service" },
    { id: "where", title: "Where to find projects" },
    { id: "approach", title: "How to approach a client" },
    { id: "discovery", title: "Project discovery" },
    { id: "process", title: "Complete project process" },
    { id: "deliverables", title: "Deliverables" },
    { id: "pricing", title: "How to charge" },
    { id: "terms", title: "Scope & Terms" },
  ];

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.hero}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className={styles.category}>{service.category}</span>
        <h1 className={`${styles.title} view-transition-title`}>{service.title}</h1>
        <p className={styles.intro}>{service.fullDescription}</p>
        
        <div className={styles.heroMeta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Duration</span>
            <span>{service.duration}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Starting From</span>
            <span>{service.pricingTiers[0].price}</span>
          </div>
        </div>

        <div className={styles.heroActions}>
          <a href="#cta" className={styles.primaryBtn}>Discuss a project</a>
          <Link href="/work" className={styles.secondaryBtn}>Return to all services</Link>
        </div>
      </motion.div>

      <div className={styles.contentLayout}>
        <aside className={styles.sidebar}>
          <ul className={styles.sidebarNav}>
            {sections.map(s => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.title}</a>
              </li>
            ))}
          </ul>
        </aside>

        <main className={styles.mainContent}>
          <motion.section id="what" className={styles.section} variants={sectionVars} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className={styles.sectionTitle}>What this service is</h2>
            <p className={styles.textBlock}><strong>The problem:</strong> {service.problemSolved}</p>
            <p className={styles.textBlock}><strong>The value:</strong> {service.valueProposition}</p>
            <p className={styles.textBlock}><strong>The final result:</strong> {service.finalResult}</p>
          </motion.section>

          <motion.section id="who" className={styles.section} variants={sectionVars} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className={styles.sectionTitle}>Who needs this service</h2>
            <div className={styles.tagGrid}>
              {service.clientTypes.map((type: string, i: number) => (
                <span key={i} className={styles.tag}>{type}</span>
              ))}
            </div>
          </motion.section>

          <motion.section id="where" className={styles.section} variants={sectionVars} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className={styles.sectionTitle}>Where to find projects</h2>
            <div className={styles.cardGrid}>
              <div className={styles.infoCard}>
                <h3 className={styles.cardTitle}>Direct Opportunities</h3>
                <ul className={styles.list}>
                  {service.projectSources.direct.map((s: string, i: number) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div className={styles.infoCard}>
                <h3 className={styles.cardTitle}>Professional Networking</h3>
                <ul className={styles.list}>
                  {service.projectSources.networking.map((s: string, i: number) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div className={styles.infoCard}>
                <h3 className={styles.cardTitle}>Partnerships</h3>
                <ul className={styles.list}>
                  {service.projectSources.partnerships.map((s: string, i: number) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section id="approach" className={styles.section} variants={sectionVars} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className={styles.sectionTitle}>How to approach a client</h2>
            <div className={styles.emailTemplate}>
Subject: Design support for {service.outreachContext}

Hello [Name],

I am a senior graphic designer specializing in {service.outreachService}. I noticed that your organization is involved in {service.outreachContext}. I support organizations with clear, professionally structured visual communication for complex business and technical information.

I would be pleased to discuss your upcoming requirements. I can also share relevant examples of similar work where confidentiality permits.

Kind regards,
Musthafa
            </div>
          </motion.section>

          <motion.section id="discovery" className={styles.section} variants={sectionVars} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className={styles.sectionTitle}>What to ask before quoting</h2>
            <div className={styles.checklist}>
              {service.discoveryQuestions.map((q: string, i: number) => (
                <label key={i} className={styles.checkItem}>
                  <input type="checkbox" />
                  <span>{q}</span>
                </label>
              ))}
            </div>
          </motion.section>

          <motion.section id="process" className={styles.section} variants={sectionVars} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className={styles.sectionTitle}>Complete project process</h2>
            <div className={styles.stepper}>
              {service.processStages.map((stage: any, i: number) => (
                <div key={i} className={styles.step}>
                  <div className={styles.stepNum}>{i + 1}</div>
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{stage.title}</h3>
                    <p className={styles.stepDesc}>{stage.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section id="deliverables" className={styles.section} variants={sectionVars} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className={styles.sectionTitle}>Deliverables</h2>
            <ul className={styles.list}>
              {service.deliverables.map((d: string, i: number) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </motion.section>

          <motion.section id="pricing" className={styles.section} variants={sectionVars} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className={styles.sectionTitle}>Pricing Guidance</h2>
            {service.pricingTiers.map((tier: any, i: number) => (
              <div key={i} className={styles.pricingTier}>
                <div className={styles.tierHeader}>
                  <span className={styles.tierName}>{tier.name}</span>
                  <span className={styles.tierPrice}>{tier.price}</span>
                </div>
                <p className={styles.textBlock} style={{ marginBottom: 0 }}>{tier.desc}</p>
              </div>
            ))}

            <div className={styles.calculator}>
              <h3 className={styles.cardTitle}>Calculate Project Fee</h3>
              <div className={styles.calcGrid}>
                <div className={styles.calcField}>
                  <label>Estimated Working Days</label>
                  <input type="number" value={calcDays} onChange={e => setCalcDays(Number(e.target.value))} />
                </div>
                <div className={styles.calcField}>
                  <label>Professional Day Rate ($)</label>
                  <input type="number" value={calcRate} onChange={e => setCalcRate(Number(e.target.value))} />
                </div>
                <div className={styles.calcField}>
                  <label>Project Mgmt Allowance (%)</label>
                  <input type="number" value={calcPm} onChange={e => setCalcPm(Number(e.target.value))} />
                </div>
                <div className={styles.calcField}>
                  <label>Complexity Allowance (%)</label>
                  <input type="number" value={calcComplexity} onChange={e => setCalcComplexity(Number(e.target.value))} />
                </div>
              </div>
              <div className={styles.calcResult}>
                <span className={styles.tierName}>Indicative Total</span>
                <span className={styles.calcTotal}>${calculateTotal().toLocaleString()}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem' }}>Pricing guidance is illustrative. The final quotation should reflect project scope, complexity, schedule, and expertise.</p>
            </div>
          </motion.section>

          <motion.section id="terms" className={styles.section} variants={sectionVars} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className={styles.sectionTitle}>Scope, Exclusions & Terms</h2>
            
            <div className={styles.cardGrid}>
              <div className={styles.infoCard}>
                <h3 className={styles.cardTitle}>Price Factors</h3>
                <ul className={styles.list}>
                  {service.priceFactors.map((f: string, i: number) => <li key={i}>{f}</li>)}
                </ul>
              </div>
              <div className={styles.infoCard}>
                <h3 className={styles.cardTitle}>Common Exclusions</h3>
                <ul className={styles.list}>
                  {service.exclusions.map((e: string, i: number) => <li key={i}>{e}</li>)}
                </ul>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <h3 className={styles.cardTitle}>Sample Scope Statement</h3>
              <p className={styles.textBlock} style={{ fontStyle: 'italic', borderLeft: '3px solid var(--accent)', paddingLeft: '1rem' }}>
                "This quotation includes the deliverables listed above and two consolidated revision rounds. New deliverables, major content changes, additional concepts or changes requested after final approval will be quoted separately."
              </p>
            </div>
          </motion.section>

          <motion.section id="cta" className={styles.ctaSection} variants={sectionVars} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className={styles.sectionTitle} style={{ borderBottom: 'none', marginBottom: '1rem' }}>Have a project that fits this service?</h2>
            <p className={styles.textBlock} style={{ marginBottom: '2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
              Share the available requirements, expected deliverables and target timeline. The scope can then be reviewed before a formal quotation is prepared.
            </p>
            <div className={styles.heroActions} style={{ justifyContent: 'center' }}>
              <a href="mailto:contact@example.com" className={styles.primaryBtn}>Discuss a project</a>
              <a href="mailto:contact@example.com" className={styles.secondaryBtn}>Request a quotation</a>
            </div>
          </motion.section>

        </main>
      </div>
    </div>
  );
}
