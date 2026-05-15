import { SPECIALISTS } from '@/constants/specialists';
import { Metadata } from 'next';
import SpecialistClient from './SpecialistClient';

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const { name } = await params;
  const specialist = SPECIALISTS.find(s => s.id === name);
  return {
    title: `${specialist?.name || 'Specialist'} | Expert Wellness Team`,
    description: specialist?.bio || 'Meet our expert wellness specialists.',
  };
}

export default async function SpecialistPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const specialist = SPECIALISTS.find(s => s.id === name);

  if (!specialist) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8 text-center">
        <h1 className="text-4xl font-serif text-[var(--primary)] mb-6">Specialist Not Found</h1>
      </div>
    );
  }

  return <SpecialistClient specialist={specialist} />;
}
