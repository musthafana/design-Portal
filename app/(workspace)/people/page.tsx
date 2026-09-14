import peopleData from '@/data/people.json';
import PeopleClient from '@/components/PeopleClient';

export const metadata = { title: 'Directory | Design Portal' };

export default function PeoplePage() {
  return <PeopleClient people={peopleData} />;
}
