'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import LoaderComponent from '@/components/loader';

export default function OAuthCallbackPage() {
  const router = useRouter();
  const { setAuthenticated } = useAuth();

  useEffect(() => {
    setAuthenticated(true);
    router.replace('/');
  }, [setAuthenticated, router]);

  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <LoaderComponent size="normal" />
    </main>
  );
}
