import type { Metadata } from 'next';
import AboutContent from '@/components/AboutContent';

export const metadata: Metadata = {
  title: 'About Us | Smart X Logistics Inc.',
  description: 'Learn more about Smart X Logistics Inc., a Calgary-based trucking and logistics company providing transportation services all over Canada and the US.',
};

export default function AboutUs() {
  return <AboutContent />;
}
