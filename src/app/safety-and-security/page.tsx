import type { Metadata } from 'next';
import SafetyContent from '@/components/SafetyContent';

export const metadata: Metadata = {
  title: 'Safety & Security | SmartX Logistics Inc.',
  description: 'Learn about our rigorous safety and security protocols, including real-time tracking and cargo protection at SmartX Logistics.',
};

export default function SafetyAndSecurity() {
  return <SafetyContent />;
}
