import coursesData from '@/data/courses.json';
import CoursesClient from '@/components/CoursesClient';

export const metadata = { title: 'Courses | Design Portal' };

export default function CoursesPage() {
  return <CoursesClient courses={coursesData} />;
}
