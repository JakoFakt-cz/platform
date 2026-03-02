'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '@/components/providers/AuthProvider';
import { redirect } from 'next/navigation';

const LogoutPage = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    redirect('/');
  }, []);

  return (
    <main className={'w-full min-h-screen relative'}>
      <section
        className={
          'w-full h-170 relative overflow-hidden bg-secondary/50 flex flex-col items-center justify-center'
        }
      >
        <Image
          src={'/images/background-pattern.png'}
          alt={'Vzor pozadí'}
          width={2560}
          height={1440}
          priority
          className={
            'w-full h-150 object-cover scale-150 absolute -z-1 select-none'
          }
        />
        <div
          className={
            'w-full mt-70 h-150 absolute bottom-0 left-0 bg-linear-to-b from-transparent to-secondary'
          }
        />
      </section>
      <section className="w-full bg-transparent relative flex flex-col items-center justify-center -mt-125 md:px-50 px-10 pb-20">
        <div className="border border-primary shadow-xl rounded-2xl p-5 py-10 bg-secondary px-10 w-full max-w-7xl flex flex-col gap-8">
          <h2 className="text-2xl font-bold text-center">
            Probíhá odhlášení...
          </h2>
        </div>
      </section>
    </main>
  );
};

export default LogoutPage;
