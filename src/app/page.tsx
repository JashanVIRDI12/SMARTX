import type { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';

export const metadata: Metadata = {
  title: 'SmartX Logistics Inc. — North America\'s Premier Transport Partner',
  description: 'SmartX Logistics is a Calgary, Alberta based trucking and logistics company providing fast, secure transportation services across Canada and the US.',
};

export default function Home() {
  return <HomeContent />;
}
