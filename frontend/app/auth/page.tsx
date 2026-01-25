import Image from 'next/image';
import AuthForm from '@/components/composites/AuthForm';

export default function AuthPage() {
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

            <section className="w-full bg-transparent relative flex flex-col items-center justify-center -mt-125 md:px-100 px-10 pb-20">
                <AuthForm />
            </section>
        </main>
    );
}