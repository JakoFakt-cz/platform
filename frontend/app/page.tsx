import Menu from '@/components/composites/navigation/menu';
import Image from 'next/image';

export default function Home() {
  return (
    <main className={'w-full relative'}>
      <Menu />
      <section
        className={'w-full h-lvh relative overflow-hidden bg-secondary/50'}
      >
        <Image
          src={'/images/background-pattern.png'}
          alt={'Vzor pozadí'}
          width={2560}
          height={1440}
          className={'w-full h-full object-cover scale-150 absolute -z-10'}
        />
        <div
          className={
            'w-full h-48 absolute bottom-0 left-0 bg-gradient-to-b from-transparent to-secondary'
          }
        />
      </section>
    </main>
  );
}
