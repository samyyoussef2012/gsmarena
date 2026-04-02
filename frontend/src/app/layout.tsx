import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import '../styles/globals.css';
import Navbar from '@/shared/components/layout/Navbar';
import Footer from '@/shared/components/layout/Footer';
import CompareTray from '@/features/compare/components/CompareTray';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'GSM Hub | Premium Device Database & Comparison',
  description: 'Technically precise data on the world\'s leading flagships, powered by next-gen specs analytics.',
  keywords: ['smartphone specs', 'device comparison', 'gadget reviews', 'GSMArena clone'],
  authors: [{ name: 'GSM Hub' }],
  openGraph: {
    title: 'GSM Hub | Premium Device Database',
    description: 'Technical specs, side-by-side comparison, and news.',
    images: ['/og-image.jpg'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
         <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-[var(--color-brand)] focus:text-white focus:rounded-xl focus:font-bold focus:shadow-2xl">
          Skip to content
        </a>
        <div className="flex flex-col min-h-screen bg-[#ffffff]">
          <Navbar />
          <main id="main-content" className="flex-grow pt-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto w-full text-[#333]">
            {children}
          </main>
          <Footer />
        </div>
        <CompareTray />
      </body>
    </html>
  );
}
