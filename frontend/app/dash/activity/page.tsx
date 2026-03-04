"use client";

import Image from 'next/image';
import {Icon} from "@iconify/react";
import SessionRow from "../../../components/composites/SessionRow";
import {useState} from "react";
import Link from "next/link";
import {BackBtn} from "@/components/BackBtn";

export default function ActivityPage() {
    const [activeTab, setActiveTab] = useState<'posts' | 'comments' | 'history'>('posts');

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
                        <Icon icon="mdi:history" className="text-5xl" />
                        <div>
                            <h1 className="text-3xl font-bold leading-tight">Obsah a interakce</h1>
                            <p className="text-lg text-primary/70 leading-tight">Přehled vašich příspěvků, komentářů a historie aktivity na platformě.</p>
                        </div>
                    </div>
                    <div>
                        <div className="w-full flex items-center justify-center">
                            <nav className="flex gap-1">
                                <button
                                    onClick={() => setActiveTab('posts')}
                                    className={`cursor-pointer shrink-0 px-6 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${activeTab === 'posts' ? 'text-secondary bg-primary' : 'text-primary ring-primary ring-1 hover:text-primary hover:bg-primary/5'}`}
                                >
                                    Příspěvky
                                </button>
                                <button
                                    onClick={() => setActiveTab('comments')}
                                    className={`cursor-pointer shrink-0 px-6 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${activeTab === 'comments' ? 'text-secondary bg-primary' : 'text-primary ring-primary ring-1 hover:text-primary hover:bg-primary/5'}`}
                                >
                                    Komentáře
                                </button>
                                <button
                                    onClick={() => setActiveTab('history')}
                                    className={`cursor-pointer shrink-0 px-6 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${activeTab === 'history' ? 'text-secondary bg-primary' : 'text-primary ring-primary ring-1 hover:text-primary hover:bg-primary/5'}`}
                                >
                                    Historie
                                </button>
                            </nav>
                        </div>

                        <div className="py-6">
                            {activeTab === 'posts' && (
                                <div>
                                    <h2 className="text-2xl font-bold">Vaše příspěvky</h2>
                                    <p className="text-primary/70">Zde uvidíte seznam všech vašich příspěvků.</p>
                                    <div className="mt-4 space-y-4">
                                        <Link href="/">
                                            <div className="p-4 border border-primary/10 rounded-lg">
                                                <h3 className="font-bold">Dechberoucí header</h3>
                                                <p className="text-sm text-primary/60">Vytvořeno: 1. ledna 2024</p>
                                            </div>
                                        </Link>

                                    </div>
                                </div>
                            )} {/* TODO: zprovoznit */}
                            {activeTab === 'comments' && (
                                <div>
                                    <h2 className="text-2xl font-bold">Vaše komentáře</h2>
                                    <p className="text-primary/70">Zde uvidíte seznam všech vašich komentářů.</p>
                                    <div className="mt-4 space-y-4">
                                        <Link href="/">
                                            <div className="p-4 border border-primary/10 rounded-lg">
                                                <p className="text-primary/80">"Toto je dechberoucí příspěvek!"</p>
                                                <p className="text-sm text-primary/60">Okomentováno u příspěvku "Dechberoucí příspěvek" dne 1. ledna 2026</p>
                                            </div>
                                        </Link>

                                    </div>
                                </div>
                            )} {/* TODO: zprovoznit */}
                            {activeTab === 'history' && (
                                <div>
                                    <h2 className="text-2xl font-bold">Historie aktivity</h2>
                                    <p className="text-primary/70">Zde uvidíte vaši nedávnou aktivitu.</p>
                                    <div className="mt-4 space-y-4">
                                        <div className="p-4 border border-primary/10 rounded-lg">
                                            <p>Přihlásili jste se z nového zařízení, blah blah. <span className="text-sm text-primary/60">(1. ledna 2026)</span></p>
                                        </div>
                                    </div>
                                </div>
                            )} {/* TODO: zprovoznit */}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
