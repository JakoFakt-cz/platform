"use client"

import Image from 'next/image';
import {Icon} from "@iconify/react";
import Link from "next/link";
import SettingsToggle from "@/components/SettingsToggle";
import {useState} from "react";

export default function SettingsPage() {
    const [doplnSi, setDoplnSi] = useState(true);

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
                    <div className="flex items-center gap-3">
                        <Icon icon="mdi:settings" className="text-5xl" />
                        <div>
                            <h1 className="text-3xl font-bold leading-tight">Nastavení</h1>
                            <p className="text-lg text-primary/70 leading-tight">Přehled vašich příspěvků, komentářů a historie aktivity na platformě.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* profile visibility */}
                        <div className="flex flex-col gap-3">
                            <h2 className="text-xl font-semibold">Viditelnost profilu</h2>
                            <SettingsToggle
                                title="Veřejný profil"
                                description="Vypnutí této možnosti Vám znemožní publikovat příspěvky a psát komentáře. Všechny vaše doposud publikované příspěvky a komentáře budou archivovány."
                                checked={doplnSi}
                                onChange={setDoplnSi}
                            />
                            <SettingsToggle
                                title="Povolit vyhledávání"
                                description="Povolí zobrazovat Váš profil ve vyhledávači v rámci platformy."
                                checked={doplnSi}
                                onChange={setDoplnSi}
                            />
                            <SettingsToggle
                                title="Zobrazit email"
                                description="Zobrazí Váš ověřený email na stránce profilu."
                                checked={doplnSi}
                                onChange={setDoplnSi}
                            />
                        </div>

                        {/* notifs */}
                        <div className="flex flex-col gap-3">
                            <h2 className="text-xl font-semibold">Komunikace a oznámení</h2>
                            <SettingsToggle
                                title="Emailové notifikace"
                                description="Povolí zobrazovat Váš profil ve vyhledávači v rámci platformy."
                                checked={doplnSi}
                                onChange={setDoplnSi}
                            />
                            <SettingsToggle
                                title="Newsletter"
                                description="Dostávejte do emailu pravdielný newsletter s nejlepšími příspěvky a dalšími novinkami."
                                checked={doplnSi}
                                onChange={setDoplnSi}
                            />
                        </div>
                    </div>
                    <div className="w-full items-center flex justify-end mt-5">
                        <button type="submit" className="py-2 w-min-content px-3 flex items-center justify-center gap-2 bg-primary text-white font-semibold rounded-lg border-1 border-primary/30 cursor-pointer hover:bg-white hover:text-primary transition-all duration-200">
                            Uložit změny
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
