import Image from 'next/image';
import { DashboardCard } from "@/components/DashboardCard";


export default function DashPage() {
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
                        <Image src="/images/background-pattern.png" alt="Logo projektu" width={50} height={50} className="border border-primary rounded-full aspect-square" />
                        <h1>Dobrý den, name!</h1>
                    </div>
                    <div className="grid grid-cols-3 gap-5">
                        <DashboardCard
                            href="/dash/profile"
                            icon="mdi:user"
                            title="Editace profilu"
                        >
                            <span>Upravte své kontaktní údaje, nahrajte profilovou fotku nebo změňte své jméno.</span>
                        </DashboardCard>
                        <DashboardCard
                            href="/dash/privacy"
                            icon="mdi:shield-lock"
                            title="Soukromí a bezpečnost"
                        >
                            <span>Správa aktivních relací, změna hesla a nastavení viditelnosti vašich údajů.</span>
                        </DashboardCard>
                        <DashboardCard
                            href="/dash/activity"
                            icon="mdi:history"
                            title="Obsah a interakce"
                        >
                            <span>Přehled vašich příspěvků, komentářů a historie aktivity na platformě.</span>
                        </DashboardCard>
                        <DashboardCard
                            href="/dash/settings"
                            icon="mdi:settings"
                            title="Nastavení účtu"
                        >
                            <span>Konfigurace systémových preferencí, jazyka a správa propojených aplikací.</span>
                        </DashboardCard>
                        <DashboardCard
                            href="/dash/notifications"
                            icon="mdi:bell"
                            title="Notifikace"
                        >
                            <span>Zobrazení a správa komunitních notifikací.</span>
                        </DashboardCard>
                        <DashboardCard
                            href="/support"
                            icon="mdi:help-circle"
                            title="Podpora"
                        >
                            <span>Potřebujete pomoc? Kontaktujte nás nebo prozkoumejte nápovědu.</span>
                        </DashboardCard>
                        <DashboardCard
                            href="/dash/logout"
                            icon="mdi:logout"
                            title="Odhlásit se"
                        >
                            <span>Bezpečné ukončení aktuální relace a odhlášení z aplikace.</span>
                        </DashboardCard>
                    </div>
                </div>
            </section>
        </main>
    );
}