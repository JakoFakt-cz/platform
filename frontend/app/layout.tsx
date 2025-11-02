import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import './globals.css';
import Menu from '@/components/composites/navigation/Menu';

const workSans = Work_Sans({
  variable: '--font-work-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'JakoFakt? • Hlavní stránka',
    template: 'JakoFakt? • %s',
  },
  description:
    'Vyhledejte dezinformace, hoaxy, podvody a lži dříve, než naletíte. JakoFakt? je váš spolehlivý vyhledávač pro ověřování informací online.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.variable} antialiased`}>
        <Menu />
        {children}
      </body>
    </html>
  );
}
