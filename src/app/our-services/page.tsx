import type { Metadata } from 'next';
import ServicesContent from '@/components/ServicesContent';

export const metadata: Metadata = {
  title: 'Our Services | Smart X Logistics Inc.',
  description: 'Explore the transportation and logistics services offered by Smart X Logistics Inc., including Dryvans & Reefers, Regional & Long Haul, and Warehousing.',
};

export default function OurServices() {
  return <ServicesContent />;
}
