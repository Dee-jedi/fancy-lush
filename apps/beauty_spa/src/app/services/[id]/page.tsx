import { SERVICES } from "@/constants";
import { SPECIALISTS } from "@/constants/specialists";
import { Metadata } from 'next';
import ServiceDetailClient from './ServiceDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const service = SERVICES.find(s => s.id === id);
  return {
    title: `${service?.name || 'Service'} | Luxury Spa Experience`,
    description: service?.fullDescription.substring(0, 160) || 'Indulge in our premium spa treatments.',
  };
}

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = SERVICES.find(s => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8 text-center">
        <h1 className="text-4xl font-serif text-[var(--primary)] mb-6">Service Not Found</h1>
      </div>
    );
  }

  const relatedServices = SERVICES.filter(s => s.id !== id).slice(0, 3);

  return (
    <ServiceDetailClient 
      service={service} 
      specialists={SPECIALISTS} 
      relatedServices={relatedServices} 
    />
  );
}
