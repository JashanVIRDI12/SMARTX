import type { Metadata } from 'next';
import SafetyContent from '@/components/SafetyContent';

export const metadata: Metadata = {
  title: 'Safety & Security | Smart X Logistics Inc.',
  description: 'Learn about our rigorous safety and security protocols, including real-time tracking and cargo protection at Smart X Logistics.',
};

export default function SafetyAndSecurity() {
  return <SafetyContent />;
}
