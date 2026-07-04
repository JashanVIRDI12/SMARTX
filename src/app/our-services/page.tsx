import type { Metadata } from 'next';
import ServicesContent from '@/components/ServicesContent';

export const metadata: Metadata = {
  title: 'Our Services | SmartX Logistics Inc.',
  description: 'Explore the transportation and logistics services offered by SmartX Logistics Inc., including Dryvans & Reefers, Regional & Long Haul, and Warehousing.',
};

export default function OurServices() {
  return <ServicesContent />;
}
