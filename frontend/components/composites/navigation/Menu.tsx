import Image from 'next/image';
import MenuItem from '@/components/composites/navigation/MenuItem';
import Link from 'next/link';
import SecondaryButton from '@/components/atoms/SecondaryButton';

const Menu = () => {
  return (
    <header
      className={
        'fixed left-0 right-0 top-0 z-30 w-full flex justify-center px-8 py-4'
      }
    >
      <div
        className={
          'w-11/12 h-14 px-6 flex flex-row items-center justify-between bg-secondary/85 rounded-2xl backdrop-blur-sm shadow-lg/12 shadow-text-primary'
        }
      >
        <nav className={'flex flex-row items-center gap-8'}>
          <Link href={'/'}>
            <Image
              src={'/logo/logo-light.svg'}
              alt={'Logo projektu světlé'}
              width={120}
              height={90}
            />
          </Link>
          <div className={'flex flex-row items-center gap-4'}>
            <MenuItem label={'Nejnovější'} isMulti />
            <MenuItem label={'O projektu'} isMulti />
            <MenuItem label={'Záložka'} isMulti />
          </div>
        </nav>
        <div>
          <SecondaryButton
            label={'Přihlásit se'}
            icon={'material-symbols:person-outline'}
            className={
              'bg-secondary/85 hover:bg-primary/10 hover:text-primary!'
            }
          />
        </div>
      </div>
    </header>
  );
};

export default Menu;
