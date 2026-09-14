'use client';

import { Tabs, Tag } from 'antd';
import { motion } from 'framer-motion';
import styles from './Work.module.css';
import Thumbnail from './Thumbnail';

export default function WorkClient({ work, opportunities, ideas }: { work: any[], opportunities: any[], ideas: any }) {
  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 350, damping: 25 } }
  };

  const items = [
    {
      key: '1',
      label: 'Job Boards & Networks',
      children: (
        <motion.div 
          className={styles.grid}
          variants={containerVars}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {work.map(w => (
            <motion.div variants={itemVars} key={w.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <Thumbnail title={w.name} size="large" showOverlay={true} />
                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 className={styles.name}>{w.name}</h3>
                  <Tag>{w.kind}</Tag>
                </div>
              </div>
              <div className={styles.content}>
                <div className={styles.section}>
                  <div className={styles.sectionLabel}>WHAT IT IS</div>
                  <p>{w.what}</p>
                </div>
                <div className={styles.section}>
                  <div className={styles.sectionLabel}>HOW TO WIN</div>
                  <p>{w.howToWin}</p>
                </div>
                {w.caution && (
                  <div className={styles.section}>
                    <div className={styles.sectionLabel} style={{ color: 'var(--ember)' }}>CAUTION</div>
                    <p>{w.caution}</p>
                  </div>
                )}
                {w.feeNote && (
                  <div className={styles.section}>
                    <div className={styles.sectionLabel}>FEES</div>
                    <p>{w.feeNote}</p>
                  </div>
                )}
              </div>
              <div className={styles.footer}>
                <a href={w.url} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                  Visit Site ↗
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ),
    },
    {
      key: '2',
      label: 'Competitions & Opportunities',
      children: (
        <motion.div 
          className={styles.grid}
          variants={containerVars}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {opportunities.map(opp => (
            <motion.div variants={itemVars} key={opp.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <Thumbnail title={opp.name} size="large" showOverlay={true} />
                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 className={styles.name}>{opp.name}</h3>
                  <Tag>{opp.kind}</Tag>
                </div>
              </div>
              <div className={styles.content}>
                <div className={styles.section}>
                  <div className={styles.sectionLabel}>WHAT IT IS</div>
                  <p>{opp.what}</p>
                </div>
                <div className={styles.section}>
                  <div className={styles.sectionLabel}>WHY ENTER</div>
                  <p>{opp.why}</p>
                </div>
                {opp.prize && (
                  <div className={styles.section}>
                    <div className={styles.sectionLabel}>PRIZE</div>
                    <p>{opp.prize}</p>
                  </div>
                )}
                {opp.timing && (
                  <div className={styles.section}>
                    <div className={styles.sectionLabel}>TIMING</div>
                    <p>{opp.timing}</p>
                  </div>
                )}
              </div>
              <div className={styles.footer}>
                <a href={opp.url} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                  View Details ↗
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ),
    },
    {
      key: '3',
      label: 'Income Ideas',
      children: (
        <div className={styles.ideasContainer}>
          <div className={styles.screeningBlock}>
            <h2 className={styles.screeningTitle}>{ideas.screening.title}</h2>
            <p className={styles.screeningNote}>{ideas.screening.note}</p>
            
            <div className={styles.screeningCols}>
              <div className={styles.screeningCol}>
                <h4 style={{ color: 'var(--ember)', fontFamily: 'var(--font-data)' }}>AVOID</h4>
                <ul>
                  {ideas.screening.avoid.map((text: string, i: number) => <li key={i}>{text}</li>)}
                </ul>
              </div>
              <div className={styles.screeningCol}>
                <h4 style={{ color: '#52c41a', fontFamily: 'var(--font-data)' }}>PREFER</h4>
                <ul>
                  {ideas.screening.prefer.map((text: string, i: number) => <li key={i}>{text}</li>)}
                </ul>
              </div>
            </div>
            
            <div className={styles.practicalBlock}>
              <h4 style={{ fontFamily: 'var(--font-data)' }}>PRACTICAL NOTES</h4>
              <ul>
                {ideas.screening.practical.map((text: string, i: number) => <li key={i}>{text}</li>)}
              </ul>
            </div>
          </div>

          <div className={styles.grid}>
            {ideas.income.map((idea: any) => (
              <div key={idea.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.name}>{idea.name}</h3>
                  <Tag>{idea.kind}</Tag>
                </div>
                <div className={styles.content}>
                  <div className={styles.section}>
                    <div className={styles.sectionLabel}>WHAT IT IS</div>
                    <p>{idea.what}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={`${styles.pageTitle} view-transition-title`}>The Workshop</h1>
      </header>

      <Tabs 
        defaultActiveKey="1" 
        items={items} 
        className={styles.tabs}
        tabBarStyle={{ borderColor: 'var(--line)' }}
      />
    </div>
  );
}
