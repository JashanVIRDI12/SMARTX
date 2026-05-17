import type { Metadata } from 'next';
import QuoteContent from '@/components/QuoteContent';

export const metadata: Metadata = {
  title: 'Request a Quote | Smart X Logistics Inc.',
  description: 'Request a quote from Smart X Logistics Inc. for your transportation and logistics needs across Canada and the US.',
};

export default function RequestAQuote() {
  return <QuoteContent />;
}
