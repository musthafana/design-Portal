import referencesData from '@/data/references.json';
import ReferencesClient from '@/components/ReferencesClient';

export const metadata = { title: 'Archive | Design Portal' };

export default function ReferencesPage() {
  return <ReferencesClient references={referencesData} />;
}
