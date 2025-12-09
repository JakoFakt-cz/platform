"use client"
import Image from 'next/image';
import Search from "@/components/composites/Search";
import {Icon} from "@iconify/react";
import SecondaryButton from "@/components/atoms/SecondaryButton";
import {useState} from "react";

export default function Auth() {

    const [isRegister, setIsRegister] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1);

    return (
        <main className={'w-full'}>
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
            </section>
            <section className="w-full relative flex flex-col items-center justify-center -mt-125 md:px-100">
                <div className="w-full border border-primary shadow-xl rounded-2xl p-5 py-10 bg-secondary px-10">
                    <div className="flex flex-col items-center mb-1">
                        <Image
                            src={'/logo/logo-light.svg'}
                            alt={'Logo projektu světlé'}
                            width={100}
                            height={90}
                        />
                    </div>

                    {step === 1 && (
                        <>
                            <h1 className="font-bold w-full text-center text-4xl">Vítejte zpět!</h1>
                            <div className="w-full flex p-0.5 rounded-full border-1 border-primary/30 mb-2 mt-5">
                                <button
                                    type="button"
                                    onClick={() => setIsRegister(false)}
                                    className={`w-full cursor-pointer rounded-full p-0.5 transition-colors duration-150 ${!isRegister ? 'bg-primary text-white' : 'bg-transparent text-primary'}`}
                                    aria-pressed={!isRegister}
                                >
                                    Přihlášení
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsRegister(true)}
                                    className={`w-full cursor-pointer rounded-full p-0.5 transition-colors duration-150 ${isRegister ? 'bg-primary text-white' : 'bg-transparent text-primary'}`}
                                    aria-pressed={isRegister}
                                >
                                    Registrace
                                </button>
                            </div>

                            {!isRegister ? (
                                <form className="flex flex-col items-center gap-2 w-full">
                                    <div className="w-full">
                                        <label htmlFor="email" className="font-semibold">Email</label>
                                        <input id="email" className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium" placeholder="jmeno@domena.cz"/>
                                    </div>
                                    <div className="w-full relative">
                                        <label htmlFor="password" className="font-semibold">Heslo</label>
                                        <input id="password" type="password" className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium" placeholder="Minimálně 8 znaků"/>
                                        <Icon icon="material-symbols:check" className="text-xl opacity-0 absolute right-3 -translate-y-7.5"/>
                                    </div>
                                    <a className="text-sm text-left w-full mb-3" href="/auth/forgotten-password">Zapomněli jste své heslo?</a>
                                    <button type="submit" className={
                                        'py-2 w-full px-3 flex items-center justify-center gap-2 ' +
                                        'bg-primary text-white font-semibold rounded-lg border-1 border-primary/30 cursor-pointer ' +
                                        'hover:bg-white hover:text-primary transition-all duration-200 '
                                    }>
                                        Přihlásit se
                                    </button>
                                </form>
                            ) : (
                                <form className="flex flex-col items-center gap-2 w-full">
                                    <div className="w-full">
                                        <label htmlFor="displayName" className="font-semibold">Jméno a přijmení</label>
                                        <input id="displayName" className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium" placeholder="Jakub Šulc"/>
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="email" className="font-semibold">Email</label>
                                        <input id="email" className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium" placeholder="jmeno@domena.cz"/>
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="username" className="font-semibold">Uživatelské jméno</label>
                                        <input id="username" className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium" placeholder="uzivatelske_jmeno"/>
                                    </div>
                                    <div className="w-full relative">
                                        <label htmlFor="password" className="font-semibold">Heslo</label>
                                        <input id="password" type="password" className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium" placeholder="Minimálně 8 znaků"/>
                                        <Icon icon="material-symbols:check" className="text-xl opacity-0 absolute right-3 -translate-y-7.5"/>
                                    </div>
                                    <div className="w-full relative mb-3">
                                        <label htmlFor="passwordAgain" className="font-semibold">Heslo ještě jednou</label>
                                        <input id="passwordAgain" type="password" className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium" placeholder="Minimálně 8 znaků"/>
                                        <Icon icon="material-symbols:check" className="text-xl opacity-0 absolute right-3 -translate-y-7.5"/>
                                    </div>
                                    <button type="submit" onClick={(e) => { e.preventDefault(); setStep(2); }} className={
                                        'py-2 w-full px-3 flex items-center justify-center gap-2 ' +
                                        'bg-primary text-white font-semibold rounded-lg border-1 border-primary/30 cursor-pointer ' +
                                        'hover:bg-white hover:text-primary transition-all duration-200 '
                                    }>
                                        Registrovat se
                                    </button>
                                </form>
                            )}
                                <hr className="my-5 text-primary/30" />
                            <div className="items-center flex flex-col gap-2">
                                <button
                                    className={
                                        'py-2 w-full px-3 flex items-center justify-center gap-2 ' +
                                        'bg-white text-primary font-semibold rounded-xl border-1 border-primary/30 cursor-pointer ' +
                                        'hover:bg-primary hover:text-white transition-all duration-200 '
                                    }
                                >
                                    <img src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw" width="16" height="16" alt="Google"/>
                                    Pokračovat s Google
                                </button>
                                <button
                                    className={
                                        'py-2 w-full px-3 flex items-center justify-center gap-2 ' +
                                        'bg-white text-primary font-semibold rounded-xl border-1 border-primary/30 cursor-pointer ' +
                                        'hover:bg-primary hover:text-white transition-all duration-200 '
                                    }
                                >
                                    <img src="/images/apple.png" width="16" height="16" alt="Apple"/>
                                    Pokračovat s Apple
                                </button>
                                <button
                                    className={
                                        'py-2 w-full px-3 flex items-center justify-center gap-2 ' +
                                        'bg-white text-primary font-semibold rounded-xl border-1 border-primary/30 cursor-pointer ' +
                                        'hover:bg-primary hover:text-white transition-all duration-200 '
                                    }
                                >
                                    <img src="/images/seznam.png" width="16" height="16" alt="Seznam"/>
                                    Pokračovat přes Seznam
                                </button>
                                <button
                                    className={
                                        'py-2 w-full px-3 flex items-center justify-center gap-2 ' +
                                        'bg-white text-primary font-semibold rounded-xl border-1 border-primary/30 cursor-pointer ' +
                                        'hover:bg-primary hover:text-white transition-all duration-200 '
                                    }
                                >
                                    <img src="/images/facebook.png" width="16" height="16" alt="Facebook"/>
                                    Pokračovat přes Facebook
                                </button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                        <h1 className="font-bold w-full text-center text-4xl">Jako fakt jste to vy?</h1>
                        <div className="flex gap-2">
                            <input className="rounded-xl"/>
                            <input className="rounded-xl"/>
                            <input className="rounded-xl"/>
                            <input className="rounded-xl"/>
                            <input className="rounded-xl"/>
                            <input className="rounded-xl"/>

                        </div>
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}
