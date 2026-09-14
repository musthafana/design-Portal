import Rail from '@/components/Rail';
import PageTransition from '@/components/PageTransition';
import AuroraBackground from '@/components/AuroraBackground';
import { getNavCounts, getFooterStatus } from '@/lib/data';

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const counts = getNavCounts();
  const status = getFooterStatus();

  return (
    <>
      <AuroraBackground opacity={0.6} />
      <div style={{ display: 'flex', minHeight: '100dvh', position: 'relative', zIndex: 1 }}>
        <PageTransition>
          <Rail counts={counts} status={status} />
        </PageTransition>
        <div style={{ 
          flexGrow: 1, 
          paddingBottom: '5rem',
          background: 'radial-gradient(ellipse at top, rgba(10, 15, 13, 0.4) 0%, rgba(10, 15, 13, 0.8) 100%)',
          minHeight: '100dvh'
        }}>
          <PageTransition delay={0.04}>
            {children}
          </PageTransition>
        </div>
      </div>
    </>
  );
}
