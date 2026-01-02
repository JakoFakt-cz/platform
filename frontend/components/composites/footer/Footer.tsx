import Image from 'next/image';
import { Icon } from '@iconify/react';

const Footer = () => {
    return (
        <footer className="w-full bg-primary text-white p-8 md:py-10 md:px-30">
            <div className="mx-auto flex flex-col lg:flex-row justify-between gap-12 lg:gap-20">
                <div className="flex flex-col gap-6 w-full lg:max-w-sm">
                    <Image
                        src="/logo/logo-orange-white.svg"
                        alt="logo"
                        width={150}
                        height={50}
                        className="h-auto"
                    />
                    <p className="text-sm md:text-base leading-relaxed opacity-90">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <a href="#" className="flex items-center border border-white/30 font-semibold rounded-xl py-2 px-4 gap-2 hover:bg-white hover:text-primary transition-all cursor-pointer">
                            <Icon icon="mingcute:up-line"/>
                            <span>Zpět nahoru</span>
                        </a>
                        <div className="flex gap-2">
                            <a href="/" className="flex items-center border border-white/30 font-semibold rounded-xl aspect-square p-2.5 hover:bg-white hover:text-primary transition-all cursor-pointer text-xl">
                                <Icon icon="mdi:instagram"/>
                            </a>
                            <a href="https://discord.gg/pjgjHHUpZV" className="flex items-center border border-white/30 font-semibold rounded-xl aspect-square p-2.5 hover:bg-white hover:text-primary transition-all cursor-pointer text-xl">
                                <Icon icon="ic:baseline-discord"/>
                            </a>
                            <a href="/contact" className="flex items-center border border-white/30 font-semibold rounded-xl aspect-square p-2.5 hover:bg-white hover:text-primary transition-all cursor-pointer text-xl">
                                <Icon icon="material-symbols:mail"/>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-16">
                    <div className="flex flex-col gap-4">
                        <h2 className="font-work text-xl font-bold">Kategorie</h2>
                        <nav className="flex flex-col gap-2 opacity-80">
                            <a className="hover:opacity-70 transition-colors cursor-pointer text-sm md:text-base">Item 1</a>
                            <a className="hover:opacity-70 transition-colors cursor-pointer text-sm md:text-base">Item 2</a>
                        </nav>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h2 className="font-work text-xl font-bold">Kategorie</h2>
                        <nav className="flex flex-col gap-2 opacity-80">
                            <a className="hover:opacity-70 transition-colors cursor-pointer text-sm md:text-base">Item 1</a>
                        </nav>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h2 className="font-work text-xl font-bold">Kategorie</h2>
                        <nav className="flex flex-col gap-2 opacity-80">
                            <a className="hover:opacity-70 transition-colors cursor-pointer text-sm md:text-base">Item 1</a>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 mt-12 pt-8 text-center">
                <span className="text-sm opacity-60">
                    © 2025 JakoFakt.cz | Všechna práva vyhrazena.
                </span>
            </div>
        </footer>
    );
};

export default Footer;