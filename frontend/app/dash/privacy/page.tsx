import Image from 'next/image';
import {Icon} from "@iconify/react";
import SessionRow from "../../../components/composites/SessionRow";

export default function PrivacyPage() {
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
                        <Icon icon="mdi:shield-lock" className="text-5xl" />
                        <div>
                            <h1 className="text-3xl font-bold leading-tight">Soukromí a bezpečnost</h1>
                            <p className="text-lg text-primary/70 leading-tight">Správa aktivních relací, změna hesla a nastavení viditelnosti vašich údajů.</p>
                        </div>
                    </div>
                    <form className="gap-3 flex flex-col">
                        <div className="flex gap-5">
                            <div className="w-full">
                                <label htmlFor="current-password" className="font-semibold text-sm">Současné heslo</label>
                                <input id="current-password" type="password" className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium outline-none" placeholder="Zadejte současné heslo"/>
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="w-full">
                                <label htmlFor="new-password" className="font-semibold text-sm">Nové heslo</label>
                                <input id="new-password" type="password" className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium outline-none" placeholder="Zadejte nové heslo"/>
                            </div>
                            <div className="w-full">
                                <label htmlFor="confirm-password" className="font-semibold text-sm">Potvrdit nové heslo</label>
                                <input id="confirm-password" type="password" className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium outline-none" placeholder="Potvrďte nové heslo"/>
                            </div>
                        </div>
                        <div className="w-full items-center flex justify-end">
                            <button type="submit" className="py-2 w-min-content px-3 flex items-center justify-center gap-2 bg-primary text-white font-semibold rounded-lg border-1 border-primary/30 cursor-pointer hover:bg-white hover:text-primary transition-all duration-200">
                                Změnit heslo
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-col gap-3">
                        <h2 className="text-xl font-bold">Aktivní relace</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="border-b border-primary/20">
                                <tr>
                                    <th className="p-2">Zařízení</th>
                                    <th className="p-2">Poslední přihlášení</th>
                                    <th className="p-2">IP adresa</th>
                                    <th className="p-2">Lokace</th>
                                    <th className="p-2"></th>
                                </tr>
                                </thead>
                                <tbody> {/* TODO: zprovoznit relace */}
                                    <SessionRow
                                        icon="simple-icons:vivaldi"
                                        device="Vivaldi Linux"
                                        lastLogin="2. ledna 2024"
                                        ipAddress="192.168.1.1"
                                        location="Praha, Česko"
                                    />
                                    <SessionRow
                                        icon="mdi:cellphone"
                                        device="iPhone"
                                        lastLogin="1. ledna 2024"
                                        ipAddress="10.0.0.1"
                                        location="Brno, Česko"
                                    />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}