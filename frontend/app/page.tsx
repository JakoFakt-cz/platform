import Image from 'next/image';
import Search from "@/components/composites/Search";
import { Icon } from '@iconify/react';

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
            'text-7xl text-center text-balance font-bold text-primary text-shadow-lg z-5'
          }
        >
          {/* TODO: Doladit design hlavního textu */}
          {/* NÁPAD: Text "dezinformace" by se mohl nějak měnit i na "podvody", "lži" atd. */}
          tohle <span className={'underline'}>je</span>,<br />
          <span className={'text-accent'}>dokonalé hero</span>
        </h2>
          <Search/>
      </section>
        <section className="w-full relative overflow-hidden flex flex-col items-center justify-center px-5 md:px-30">
            <div className="w-full shadow-xl rounded-2xl p-5 mb-10">
                <div className="bg-accent rounded-t-2xl text-white font-medium text-xl p-3 px-6 -m-5">
                    Právě koluje
                </div>
                <div className="mt-10">
                    <div className="flex-row flex items-center content-center gap-1.5 mb-3">
                        <img src="favicon.ico" width="18" height="18" className="rounded-xl"/>
                        <span className="text-sm font-semibold">Někdo Někdo</span>
                        <span className="text-sm">1/1/2000</span>
                    </div>
                    <hr className="border-primary my-3"/>
                    <h1 className="text-3xl font-semibold mb-1">
                        Dechberoucí header
                    </h1>
                    <span>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Duis risus. Fusce consectetuer risus a nunc. Vivamus porttitor turpis ac leo. Etiam egestas wisi a erat. Integer tempor. Aliquam erat volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Sed convallis magna eu sem. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Donec quis nibh at felis congue commodo. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam.
                    </span>
                </div>
                <div className="mt-5 flex-row flex items-center gap-2">
                    <div className="border-1 rounded-full flex px-2 py-1 items-center">
                        <button className="hover:scale-120 transition-all hover:cursor-pointer">
                            <Icon icon="bx:up-arrow"/>
                        </button>
                        <span className="px-1">0</span>
                        <button className="hover:scale-120 transition-all hover:cursor-pointer">
                            <Icon icon="bx:down-arrow"/>
                        </button>
                    </div>
                    <a className="border flex items-center gap-1 text-primary px-3 py-1 rounded-full hover:scale-105 hover:cursor-pointer transition-all"><Icon icon="material-symbols:comment-outline"/>0</a>
                    <a className="bg-primary text-white px-3 py-1 rounded-full hover:scale-105 hover:cursor-pointer transition-all">Číst</a>
                    <a className="flex items-center text-sm gap-1 hover:cursor-pointer hover:text-accent transition-all">
                        <Icon icon="ci:flag" className=""/>
                        Nahlásit
                    </a>
                </div>
            </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center px-4 md:px-30">
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 shadow-xl rounded-2xl border border-primary mb-10 overflow-hidden">
                <a href="/" className="p-5 flex flex-col items-center hover:bg-primary hover:text-white transition-all border-b border-r border-primary/20 lg:border-b-0 last:border-r-0 lg:[&:not(:last-child)]:border-r">
                    <Icon icon="material-symbols:category-outline-rounded" fontSize="24" />
                    <span className="font-semibold mt-2 text-center">Kategorie</span>
                </a>
                <a href="/" className="p-5 flex flex-col items-center hover:bg-primary hover:text-white transition-all border-b border-r border-primary/20 lg:border-b-0 last:border-r-0 lg:[&:not(:last-child)]:border-r">
                    <Icon icon="material-symbols:category-outline-rounded" fontSize="24" />
                    <span className="font-semibold mt-2 text-center">Kategorie</span>
                </a>
                <a href="/" className="p-5 flex flex-col items-center hover:bg-primary hover:text-white transition-all border-b border-r border-primary/20 lg:border-b-0 last:border-r-0 lg:[&:not(:last-child)]:border-r">
                    <Icon icon="material-symbols:category-outline-rounded" fontSize="24" />
                    <span className="font-semibold mt-2 text-center">Kategorie</span>
                </a>
                <a href="/" className="p-5 flex flex-col items-center hover:bg-primary hover:text-white transition-all border-b border-r border-primary/20 lg:border-b-0 last:border-r-0 lg:[&:not(:last-child)]:border-r">
                    <Icon icon="material-symbols:category-outline-rounded" fontSize="24" />
                    <span className="font-semibold mt-2 text-center">Kategorie</span>
                </a>
                <a href="/" className="p-5 flex flex-col items-center hover:bg-primary hover:text-white transition-all border-b border-r border-primary/20 lg:border-b-0 last:border-r-0 lg:[&:not(:last-child)]:border-r">
                    <Icon icon="material-symbols:category-outline-rounded" fontSize="24" />
                    <span className="font-semibold mt-2 text-center">Kategorie</span>
                </a>
                <a href="/" className="p-5 flex flex-col items-center hover:bg-primary hover:text-white transition-all border-b border-r border-primary/20 lg:border-b-0 last:border-r-0 lg:[&:not(:last-child)]:border-r">
                    <Icon icon="material-symbols:category-outline-rounded" fontSize="24" />
                    <span className="font-semibold mt-2 text-center">Kategorie</span>
                </a>
            </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center px-5 md:px-30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mb-10">
                <div className="shadow-xl rounded-2xl border p-5">
                    <div className="flex-row flex items-center content-center gap-1.5 mb-3">
                        <img src="favicon.ico" width="18" height="18" className="rounded-xl"/>
                        <span className="text-sm font-semibold">Někdo Někdo</span>
                        <span className="text-sm">1/1/2000</span>
                    </div>
                    <hr className="border-primary my-3"/>
                    <h1 className="text-2xl font-semibold mb-1">Tohle je header</h1>
                    <span>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Duis risus. Fusce consectetuer risus a nunc. Vivamus porttitor turpis ac leo. Etiam egestas wisi a erat. Integer tempor. Aliquam erat volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Sed convallis magna eu sem. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Donec quis nibh at felis congue commodo. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam.
                    </span>
                    <div className="mt-5 flex-row flex items-center gap-2">
                        <div className="border-1 rounded-full flex px-2 py-1 items-center">
                            <button className="hover:scale-120 transition-all hover:cursor-pointer">
                                <Icon icon="bx:up-arrow"/>
                            </button>
                            <span className="px-1">0</span>
                            <button className="hover:scale-120 transition-all hover:cursor-pointer">
                                <Icon icon="bx:down-arrow"/>
                            </button>
                        </div>
                        <a className="border flex items-center gap-1 text-primary px-3 py-1 rounded-full hover:scale-105 hover:cursor-pointer transition-all"><Icon icon="material-symbols:comment-outline"/>0</a>
                        <a className="bg-primary text-white px-3 py-1 rounded-full hover:scale-105 hover:cursor-pointer transition-all">Číst</a>
                        <a className="flex items-center text-sm gap-1 hover:cursor-pointer hover:text-accent transition-all">
                            <Icon icon="ci:flag" className=""/>
                            Nahlásit
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </main>
  );
}
