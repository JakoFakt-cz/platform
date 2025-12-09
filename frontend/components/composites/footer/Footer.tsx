import Image from 'next/image';
import MenuItem from '@/components/composites/navigation/MenuItem';
import Link from 'next/link';
import SecondaryButton from '@/components/atoms/SecondaryButton';
import { Icon } from '@iconify/react';

const Footer = () => {
    return (
        <footer className="w-full flex flex-col bg-primary text-white p-10 md:px-30">
            <div className="flex justify-between">
                <div className="flex flex-col gap-5 w-1/3">
                    <Image src="/logo/logo-orange-white.svg" alt="logo" width={150} height={50} />
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div className="flex gap-2">
                        <a href="#" className="flex items-center border font-semibold rounded-xl py-1.25 px-3 w-fit gap-1 hover:bg-white hover:text-primary transition-all cursor-pointer"><Icon icon="mingcute:up-line"/>Zpět nahoru</a>
                        <a href="/" className="flex items-center border font-semibold rounded-xl aspect-square p-2 w-fit hover:bg-white hover:text-primary transition-all cursor-pointer text-xl"><Icon icon="mdi:instagram"/></a>
                        <a href="https://discord.gg/pjgjHHUpZV" className="flex items-center border font-semibold rounded-xl aspect-square p-2 w-fit hover:bg-white hover:text-primary transition-all cursor-pointer text-xl"><Icon icon="ic:baseline-discord"/></a>
                        <a href="/contact" className="flex items-center border font-semibold rounded-xl aspect-square p-2 w-fit hover:bg-white hover:text-primary transition-all cursor-pointer text-xl"><Icon icon="material-symbols:mail"/></a>
                    </div>
                </div>
                <div className="flex gap-20">
                    <div>
                        <h1 className="font-work text-2xl font-bold">Kategorie</h1>
                        <a className="hover:cursor-pointer">Item</a>
                    </div>
                    <div>
                        <h1 className="font-work text-2xl font-bold">Kategorie</h1>
                        <a className="hover:cursor-pointer">Item</a>
                    </div>
                    <div>
                        <h1 className="font-work text-2xl font-bold">Kategorie</h1>
                        <a className="hover:cursor-pointer">Item</a>
                    </div>
                </div>
            </div>
            <span className="text-center w-full mt-10">© 2025 JakoFakt.cz | Všechna práva vyhrazena.</span>        </footer>
    );
};

export default Footer;
