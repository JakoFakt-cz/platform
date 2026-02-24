import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import './globals.css';
import Menu from '@/components/composites/navigation/Menu';
import Footer from '@/components/composites/footer/Footer';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { cookies } from 'next/headers';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const hasAccessToken = cookieStore.has('jako_access_token');
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';

  return (
    <html lang="en">
      <body className={`${workSans.variable} antialiased scroll-smooth`}>
        <AuthProvider initialAuth={hasAccessToken} backendUrl={backendUrl}>
          <Menu />
          {children}
          <ToastContainer />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
