import Image from 'next/image';
import Search from "@/components/composites/Search";
import {Icon} from "@iconify/react";

export default function Home() {

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
                    <div className="flex flex-col items-center gap-1">
                        <Image
                            src={'/logo/logo-light.svg'}
                            alt={'Logo projektu světlé'}
                            width={100}
                            height={90}
                        />
                        <h1 className="font-bold text-4xl">Vytvoření nového účtu</h1>
                    </div>
                    <div className="items-center flex flex-col gap-2 mt-5">
                        <button
                            className={
                                'py-2 w-full px-3 flex items-center justify-center gap-2 ' +
                                'bg-white text-primary font-semibold rounded-xl border-1 border-primary/30 cursor-pointer ' +
                                'hover:bg-primary hover:text-white transition-all duration-200 '
                            }
                        >
                            <img src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw" width="16" height="16"/>
                            Pokračovat přes Google
                        </button>
                        <button
                            className={
                                'py-2 w-full px-3 flex items-center justify-center gap-2 ' +
                                'bg-white text-primary font-semibold rounded-xl border-1 border-primary/30 cursor-pointer ' +
                                'hover:bg-primary hover:text-white transition-all duration-200 '
                            }
                        >
                            <img src="/images/facebook.png" width="16" height="16"/>
                            Pokračovat přes Facebook
                        </button>
                    </div>
                    <hr className="my-3 text-primary/30" />
                    <form className="flex flex-col items-center gap-3 w-full">
                        <div className="w-full">
                            <label htmlFor="email" className="font-semibold">Email</label>
                            <input id="email" className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium" placeholder="jmeno@domena.cz" required/>
                        </div>
                        <div className="w-full relative">
                            <label htmlFor="username" className="font-semibold">Uživatelské jméno</label>
                            <input id="username" className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium" placeholder="@vase_jmeno" required/><Icon icon="material-symbols:check" className="text-xl opacity-0 absolute right-3 -translate-y-7.5"/>
                        </div>
                        <div className="w-full relative">
                            <label htmlFor="password" className="font-semibold">Heslo</label>
                            <input id="password" type="password" className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium" placeholder="Vaše nové heslo" required/><Icon icon="material-symbols:check" className="text-xl opacity-0 absolute right-3 -translate-y-7.5"/>
                        </div>
                        <div className="w-full relative">
                            <label htmlFor="password" className="font-semibold">Heslo ještě jednou</label>
                            <input id="password" type="password" className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium" placeholder="Zopakujte své heslo" required/><Icon icon="material-symbols:check" className="text-xl opacity-0 absolute right-3 -translate-y-7.5"/>
                        </div>
                        <div className="w-full flex gap-5 items-center">
                            <input id="tosAgreement" type="checkbox" className="bg-white border-primary border font-medium " required/>
                            <label htmlFor="tosAgreement" className="text-sm font-medium">Prohlašuji, že jsem se seznámil(a) s Všeobecnými podmínkami účtu JakoFakt a se Zásadami zpracování osobních údajů, a souhlasím s jejich zněním.</label>
                        </div>
                        <div className="w-full flex gap-5 items-center">
                            <input id="newsletterDisagreement" type="checkbox" className="bg-white border-primary border font-medium "/>
                            <label htmlFor="newsletterDisagreement" className="text-sm font-medium">Nesouhlasím se zasíláním marketingových informací a novinek z oblasti PR od JakoFakt.</label>
                        </div>
                        <button
                            type="submit"
                            className={
                                'py-2 w-full px-3 flex items-center justify-center gap-2 ' +
                                'bg-primary text-white font-semibold rounded-xl border-1 border-primary/30 cursor-pointer ' +
                                'hover:bg-white hover:text-primary transition-all duration-200 '
                            }
                        >
                            Pokračovat
                        </button>

                    </form>
                </div>
            </section>
        </main>
    );
}
