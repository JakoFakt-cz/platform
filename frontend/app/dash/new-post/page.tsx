import Image from 'next/image';
import { BackBtn } from "@/components/BackBtn";
import {Icon} from "@iconify/react";

export default function NewPostPage() {
    return (
        <main className={'w-full min-h-screen relative'}>
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
            <section className="w-full bg-transparent relative flex flex-col items-center justify-center -mt-125 md:px-50 px-10 pb-20">
                <div className="border border-primary shadow-xl rounded-2xl p-5 py-10 bg-secondary px-10 w-full max-w-7xl flex flex-col gap-8">
                    <BackBtn/>
                    <div className="flex items-center gap-3">
                        <Icon icon="mdi:pencil" className="text-5xl" />
                        <div>
                            <h1 className="text-3xl font-bold leading-tight">Nový příspěvěk</h1>
                            <p className="text-lg text-primary/70 leading-tight">Napište nový, zajímavý příspěvěk!</p>
                        </div>
                    </div>
                    <form className="gap-3 flex flex-col">
                        <div className="w-full">
                            <label htmlFor="title" className="font-semibold text-sm">Nadpis</label>
                            <input id="title" className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium outline-none" placeholder="Nadpis příspěvku"/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="headline" className="font-semibold text-sm">Popisek</label>
                            <input id="headline" className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium outline-none" placeholder="Popisek příspěvku"/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="content" className="font-semibold text-sm">Obsah</label>
                            <textarea id="content" className="min-h-40 bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium outline-none" placeholder="Napište něco zajímavého..."/>
                        </div>
                        <div className="w-full items-center flex justify-end">
                            <button type="submit" className="py-2 w-min-content px-3 flex items-center justify-center gap-2 bg-primary text-white font-semibold rounded-lg border-1 border-primary/30 cursor-pointer hover:bg-white hover:text-primary transition-all duration-200">
                                Vytvořit příspěvek
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}