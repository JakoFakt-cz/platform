import Image from 'next/image';

export default function Home() {
  return (
    <main className={'w-full'}>
      {/*   HERO SEKCE   */}
      <section
        className={
          'w-full h-lvh relative overflow-hidden bg-secondary/50 flex flex-col items-center justify-center'
        }
      >
        <Image
          src={'/images/background-pattern.png'}
          alt={'Vzor pozadí'}
          width={2560}
          height={1440}
          className={
            'w-full h-full object-cover scale-150 absolute -z-10 select-none'
          }
        />
        <div
          className={
            'w-full h-48 absolute bottom-0 left-0 bg-linear-to-b from-transparent to-secondary'
          }
        />

        <h2
          className={
            'text-5xl sm:text-7xl md:text-8xl leading-tight text-center text-balance font-bold text-primary text-shadow-lg'
          }
        >
          {/* TODO: Doladit design hlavního textu */}
          {/* NÁPAD: Text "dezinformace" by se mohl nějak měnit i na "podvody", "lži" atd. */}
          Vyhledejte <span className={'underline'}>dezinformace</span>,<br />
          <span className={'text-accent'}>než naletíte</span>
        </h2>
      </section>
    </main>
  );
}
