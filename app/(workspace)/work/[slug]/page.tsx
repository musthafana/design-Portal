import { notFound } from 'next/navigation';
import servicesData from '@/data/services.json';
import ServiceDetailClient from '@/components/ServiceDetailClient';

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const service = servicesData.find(s => s.slug === slug);
  
  if (!service) {
    return { title: 'Service Not Found' };
  }

  return {
    title: `${service.title} | Design Portal`,
    description: service.shortIntro,
    alternates: {
      canonical: `/work/${service.slug}`
    },
    openGraph: {
      title: service.title,
      description: service.shortIntro,
      type: 'website'
    }
  };
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = servicesData.find(s => s.slug === slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
