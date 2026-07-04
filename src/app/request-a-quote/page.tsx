import type { Metadata } from 'next';
import QuoteContent from '@/components/QuoteContent';

export const metadata: Metadata = {
  title: 'Request a Quote | SmartX Logistics Inc.',
  description: 'Request a quote from SmartX Logistics Inc. for your transportation and logistics needs across Canada and the US.',
};

export default function RequestAQuote() {
  return <QuoteContent />;
}
