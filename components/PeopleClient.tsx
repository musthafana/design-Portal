'use client';

import { useState } from 'react';
import { Drawer, Tag, Typography, Button } from 'antd';
import Link from 'next/link';
import styles from './People.module.css';
import booksData from '@/data/books.json';
import FavoriteButton from './FavoriteButton';

const { Text, Paragraph } = Typography;

export default function PeopleClient({ people }: { people: any[] }) {
  const [selectedPerson, setSelectedPerson] = useState<any | null>(null);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={`${styles.pageTitle} view-transition-title`}>Directory</h1>
      </header>

      <div className={styles.grid}>
        {people.map(person => (
          <div key={person.id} className={`${styles.personCard} has-favorite`} onClick={() => setSelectedPerson(person)}>
            <FavoriteButton item={{ id: person.id, type: 'people', title: person.name, subtitle: person.role, url: person.url, metadata: person }} />
            <h3 className={styles.name}>{person.name}</h3>
            <p className={styles.role}>{person.role}</p>
            {person.why && <p className={styles.description}>{person.why}</p>}
            <span className={styles.viewMore}>View details &rarr;</span>
          </div>
        ))}
      </div>

      <Drawer
        title={<span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 400 }}>{selectedPerson?.name}</span>}
        placement="right"
        width={450}
        onClose={() => setSelectedPerson(null)}
        open={!!selectedPerson}
        styles={{
          body: { padding: '24px' },
          header: { borderBottom: '1px solid var(--line)' }
        }}
      >
        {selectedPerson && (
          <div className={styles.drawerContent}>
            <Text style={{ fontFamily: 'var(--font-data)', color: 'var(--brass)', display: 'block', marginBottom: '1.5rem' }}>
              {selectedPerson.role}
            </Text>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>WHY IT MATTERS</div>
              <Paragraph style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--paper)' }}>
                {selectedPerson.why || selectedPerson.whyItMatters}
              </Paragraph>
            </div>

                        <Button 
              type="default" 
              href={selectedPerson.url || `https://www.google.com/search?q=${encodeURIComponent(selectedPerson.name + ' ' + selectedPerson.role)}`} 
              target="_blank" 
              style={{ marginTop: '1rem', background: 'transparent', borderColor: 'var(--line)', color: 'var(--paper2)' }}
            >
              {selectedPerson.url ? 'Visit Website ↗' : 'Search Online ↗'}
            </Button>

            {/* People <-> Books Cross-link */}
            {selectedPerson.books && selectedPerson.books.length > 0 && (
              <div className={styles.section} style={{ marginTop: '2.5rem' }}>
                <div className={styles.sectionTitle}>BOOKS ON THE SHELF</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {selectedPerson.books.map((bookId: string) => {
                    const book = booksData.find(b => b.id === bookId);
                    return book ? (
                      <Link href={`/books`} key={bookId} className={styles.bookLink}>
                        <span className={styles.bookLinkTitle}>{book.title}</span>
                        <span className={styles.bookLinkAuthor}>by {book.author}</span>
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
}
