import type { Metadata } from 'next';
import ContactContent from '@/components/ContactContent';

export const metadata: Metadata = {
  title: 'Contact Us | Smart X Logistics Inc.',
  description: 'Get in touch with Smart X Logistics Inc. Call us at (403) 681-1515 or visit our office in Calgary, AB.',
};

export default function ContactUs() {
  return <ContactContent />;
}
