"use client";

import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export default function PostDetail() {
  const params = useSearchParams();

    return (
        <main className="w-full bg-secondary/20 min-h-screen">
            <section className={'w-full h-170 relative overflow-hidden bg-secondary/50 flex flex-col items-center justify-center'}>
                <Image
                    src={'/images/background-pattern.png'}
                    alt={'Vzor pozadí'}
                    width={2560}
                    height={1440}
                    priority
                    className={'w-full h-150 object-cover scale-150 absolute -z-1 select-none'}
                />
                <div className={'w-full mt-70 h-150 absolute bottom-0 left-0 bg-linear-to-b from-transparent to-secondary'} />
            </section>

            <section className="max-w-4xl mx-auto px-4 relative z-10 pb-20 -mt-130">
                <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-primary/10">
                    <div className="bg-accent text-white p-4 px-6 flex justify-between items-center">
                        <span className="font-medium">Kategorie</span>
                    </div>
                    <div className="p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <img src="favicon.ico" width="45" height="45" className="rounded-full border-2 border-secondary" />
                            <div className="flex flex-col">
                                <span className="font-bold text-primary">Někdo Někdo</span>
                                <span className="text-sm text-gray-500">před x hodinami • 1. 1. 2000</span>
                            </div>
                        </div>

                        <h1 className="text-4xl font-extrabold text-primary mb-4 leading-tight">
                            Dechberoucí header příspěvku
                        </h1>

                        <div className="text-gray-700 text-lg leading-relaxed space-y-4">
                            <p>
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Duis risus. Fusce consectetuer risus a nunc.
                                Vivamus porttitor turpis ac leo. Etiam egestas wisi a erat.
                            </p>
                            <p>
                                Integer tempor. Aliquam erat volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla,
                                et sollicitudin sem purus in lacus. Sed convallis magna eu sem.
                            </p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-secondary/20 flex items-center gap-4">
                            <div className="border-1 border-secondary rounded-full flex px-3 py-1 items-center bg-secondary/5">
                                <button className="hover:scale-120 transition-all hover:cursor-pointer text-primary">
                                    <Icon icon="bx:up-arrow" fontSize={20}/>
                                </button>
                                <span className="px-3 font-bold text-primary text-lg">xyz</span>
                                <button className="hover:scale-120 transition-all hover:cursor-pointer text-primary">
                                    <Icon icon="bx:down-arrow" fontSize={20}/>
                                </button>
                            </div>

                            <button className="cursor-pointer flex items-center gap-2 text-primary px-4 py-2 rounded-full hover:bg-secondary/20 transition-all">
                                <Icon icon="material-symbols:share-outline" fontSize={18} />
                                <span className="font-medium">Sdílet</span>
                            </button>

                            <button className="cursor-pointer ml-auto flex items-center text-sm gap-1 hover:text-accent transition-all text-gray-400">
                                <Icon icon="ci:flag" />
                                Nahlásit
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 space-y-4">
                    <h3 className="text-xl font-bold text-primary px-2">Komentáře (x)</h3>

                    <div className="bg-white p-4 rounded-2xl shadow-md border border-primary/5 flex gap-4">
                        <div className="w-full">
                            <textarea
                                className="w-full bg-secondary/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all border border-primary resize-none"
                                placeholder="Napište svůj komentář..."
                                rows={4}
                            />
                            <div className="flex justify-end mt-2">
                                <button className="bg-primary text-white px-6 py-1.5 rounded-full font-medium cursor-pointer hover:bg-primary/90 transition-all">
                                    Odeslat
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-primary/5">
                            <div className="flex items-center gap-2 mb-2">
                                <img src="favicon.ico" width="30" height="30" className="rounded-full border-2 border-secondary" />
                                <span className="font-bold text-sm text-primary">Někdo Někdo</span>
                                <span className="text-xs text-gray-400">před x hodinami</span>
                            </div>
                            <p className="text-gray-700 ml-10">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                            </p>
                            <div className="ml-10 mt-3 flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Icon icon="bx:up-arrow" className="cursor-pointer hover:text-primary" />
                                    <span className="font-bold">xyz</span>
                                    <Icon icon="bx:down-arrow" className="cursor-pointer hover:text-primary" />
                                </div>
                                <button className="hover:text-primary cursor-pointer font-medium">Odpovědět</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}