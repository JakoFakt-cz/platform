import Image from 'next/image';
import Search from "@/components/composites/Search";

export default function Home() {

    return (
    <main className={'w-full'}>
      {/*   HERO SEKCE   */}
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
          className={
            'w-full h-150 object-cover scale-150 absolute -z-10 select-none'
          }
        />
        <div
          className={
            'w-full mt-70 h-150 absolute bottom-0 left-0 bg-linear-to-b from-transparent to-secondary'
          }
        />

        <h2
          className={
            'text-5xl md:text-7xl leading-tight text-center text-balance font-bold text-primary text-shadow-lg z-5'
          }
        >
          {/* TODO: Doladit design hlavního textu */}
          {/* NÁPAD: Text "dezinformace" by se mohl nějak měnit i na "podvody", "lži" atd. */}
          Vyhledejte <span className={'underline'}>dezinformace</span>,<br />
          <span className={'text-accent'}>než naletíte</span>
        </h2>
          <Search/>
      </section>
        <section className="w-full relative overflow-hidden flex flex-col items-center justify-center px-30">
            <div className="w-full shadow-xl rounded-2xl p-5">
                <div className="bg-accent rounded-t-2xl text-white font-medium text-xl p-3 px-6 -m-5">
                    Právě koluje
                </div>
                <div>
                    <h1 className="text-3xl mt-10 font-semibold mb-2">
                        Dechberoucí header
                    </h1>
                    <span>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Duis risus. Fusce consectetuer risus a nunc. Vivamus porttitor turpis ac leo. Etiam egestas wisi a erat. Integer tempor. Aliquam erat volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Sed convallis magna eu sem. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Donec quis nibh at felis congue commodo. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam.
                    </span>
                </div>
            </div>
        </section>
    </main>
  );
}
