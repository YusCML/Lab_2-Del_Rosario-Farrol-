import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GearHub',
  description: 'A modern storefront for premium tech gear',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
