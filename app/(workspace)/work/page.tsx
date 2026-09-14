import workData from '@/data/work.json';
import oppsData from '@/data/opportunities.json';
import ideasData from '@/data/ideas.json';
import servicesData from '@/data/services.json';
import WorkClient from '@/components/WorkClient';

export const metadata = { title: 'The Workshop | Design Portal' };

export default function WorkPage() {
  return <WorkClient work={workData} opportunities={oppsData} ideas={ideasData} services={servicesData} />;
}
