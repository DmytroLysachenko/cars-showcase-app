import { Footer, Navbar } from '@/components';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CarHub',
  description: 'Find the car you need',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
