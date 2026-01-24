"use client";

import { useRef, useState } from 'react';
import Image from 'next/image';
import MenuItem from '@/components/composites/navigation/MenuItem';
import Link from 'next/link';
import SecondaryButton from '@/components/atoms/SecondaryButton';
import { Icon } from '@iconify/react';

const Menu = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const testItems = [
    { label: 'Něco1', href: '/1' },
    { label: 'Něco2', href: '/2' },
    { label: 'Něco3', href: '/3' },
  ];

  return (
      <header className={'fixed left-0 right-0 top-0 z-100 w-full flex flex-col items-center px-4 md:px-8 py-4'}>
        <div
            className={`w-full max-w-7xl h-14 px-6 flex flex-row items-center justify-between bg-secondary/85 rounded-2xl backdrop-blur-md shadow-lg transition-all duration-300 ${
                isMobileOpen ? 'rounded-b-none' : ''
            }`}
        >
          <nav className={'flex flex-row items-center gap-8'}>
            <Link href={'/'} className="shrink-0">
              <Image
                  src={'/logo/logo-light.svg'}
                  alt={'Logo projektu'}
                  width={100}
                  height={70}
                  priority
              />
            </Link>

            <div className={'hidden lg:flex flex-row items-center gap-4'}>
              <MenuItem label={'Záložka'} href={'/'} />
              <MenuItem label={'Dropdown'} isMulti items={testItems} />
              <MenuItem label={'Další dropdown'} isMulti items={testItems} />
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <Icon icon="material-symbols:search" width="24" height="24" onClickCapture={() => {
                searchInputRef?.current?.focus();
              }}/>
              <input type='text' className='w-32 border border-bg-primary/10 rounded-lg p-1' ref={searchInputRef} />

              <SecondaryButton
                  label={'Přihlásit se'}
                  icon={'material-symbols:person-outline'}
                  className={'bg-secondary/85 hover:bg-primary/10 hover:text-primary!'}
              />
            </div>

            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden p-2 text-primary text-3xl cursor-pointer"
            >
              <Icon icon={isMobileOpen ? 'mdi:close' : 'mdi:menu'} />
            </button>
          </div>
        </div>

        {isMobileOpen && (
            <div className="lg:hidden w-full max-w-7xl bg-secondary/95 backdrop-blur-md rounded-b-2xl shadow-xl border-t border-primary/10 overflow-hidden animate-in slide-in-from-top-2 duration-300">
              <div className="flex flex-col p-6 gap-4">
                <MenuItem label={'Nejnovější'} href={'/'} />
                <MenuItem label={'O projektu'} isMulti items={testItems} />
                <MenuItem label={'Záložka'} isMulti items={testItems} />

                <hr className="border-primary/10 my-2" />

                <div className="sm:hidden w-full">
                  <SecondaryButton
                      label={'Přihlásit se'}
                      icon={'material-symbols:person-outline'}
                      className="w-full justify-center"
                      href="/auth"
                  />
                </div>
              </div>
            </div>
        )}
      </header>
  );
};

export default Menu;