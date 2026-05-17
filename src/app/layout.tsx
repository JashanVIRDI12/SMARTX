import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Smart X Logistics Inc. — North America\'s Premier Transport Partner',
  description: 'Smart X Logistics is a Calgary, Alberta based trucking and logistics company providing transportation services across Canada and the US.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="page-wrap">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
