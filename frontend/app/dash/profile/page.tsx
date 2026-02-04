import Image from 'next/image';
import {Icon} from "@iconify/react";
import SecondaryButton from "@/components/atoms/SecondaryButton";


export default function ProfileEdit() {
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
                    <div className="flex items-center gap-4 text-2xl font-bold">
                        <div className="relative group cursor-pointer"> {/* TODO: přidat fukncionalitu pro úpravu profilového obrázku*/}
                            <Image src="/images/background-pattern.png" alt="Logo projektu" width={50} height={50} className="border border-primary rounded-full aspect-square group-hover:bg-black/30 transition-all" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Icon icon="mdi:pencil" className="text-white" />
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <h1>Name</h1>
                        </div>
                    </div>
                    <form className="gap-3 flex flex-col">
                        <div className="flex gap-5">
                            <div className="w-full">
                                <label htmlFor="name" className="font-semibold text-sm">Jméno a přijmení</label>
                                <input id="name" className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium outline-none" placeholder="Jméno a přijmení"/>
                            </div>
                            <div className="w-full">
                                <label htmlFor="username" className="font-semibold text-sm">Uživatelské jméno</label>
                                <input id="username" className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium outline-none" placeholder="uzivatelske_jmeno"/>
                            </div>
                        </div>
                        <div className="w-full">
                            <label htmlFor="bio" className="font-semibold text-sm">Biografie</label>
                            <textarea id="bio" className="max-h-40 min-h-10.5 bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium outline-none" placeholder="Něco stručného o sobě..."/>
                        </div>
                        <div className="w-full items-center flex justify-end">
                            <button type="submit" className="py-2 w-min-content px-3 flex items-center justify-center gap-2 bg-primary text-white font-semibold rounded-lg border-1 border-primary/30 cursor-pointer hover:bg-white hover:text-primary transition-all duration-200">
                                Uložit změny
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}