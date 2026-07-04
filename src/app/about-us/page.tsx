import type { Metadata } from 'next';
import AboutContent from '@/components/AboutContent';

export const metadata: Metadata = {
  title: 'About Us | SmartX Logistics Inc.',
  description: 'Learn more about SmartX Logistics Inc., a Calgary-based trucking and logistics company providing transportation services all over Canada and the US.',
};

export default function AboutUs() {
  return <AboutContent />;
}
