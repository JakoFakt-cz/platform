'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AuthForm({ backendLink }: { backendLink: string }) {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.value.length === 1 && index < 5) {
      const nextInput =
        e.target.parentElement?.querySelectorAll('input')[index + 1];
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }
  };

  const tryRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    if (payload['passwordAgain'] !== payload['password']) return;
    // TODO: Make some visual signal that passwords are not equal
    // Add more frontend validations according to signup.dto.ts

    const response = await fetch(`${backendLink}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: payload['username'],
        displayName: payload['displayName'],
        email: payload['email'],
        password: payload['password'],
      }),
      credentials: 'include',
    });

    // TODO: Vyřešit ukládání access tokenu

    if (!response.ok) {
      const error = await response.json();
      console.error(error);
      return;
    }

    setStep(2);
  };

  const tryLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError(null);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      setLoginError('Vyplňte e-mail a heslo.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${backendLink}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) {
          setLoginError('Nesprávný e-mail nebo heslo.');
        } else if (response.status === 429) {
          setLoginError('Příliš mnoho pokusů. Zkuste to později.');
        } else {
          setLoginError('Něco se pokazilo. Zkuste to znovu.');
        }
        return;
      }

      router.push('/');
    } catch {
      setLoginError('Nelze se připojit k serveru. Zkontrolujte připojení.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border border-primary shadow-xl rounded-2xl p-5 py-10 bg-secondary px-10 w-full max-w-xl">
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
          <h1 className="font-bold w-full text-center text-4xl">
            {isRegister ? 'Vytvořit účet' : 'Vítejte zpět!'}
          </h1>
          <div className="w-full flex p-0.5 rounded-full border border-primary/30 my-5">
            <button
              type="button"
              onClick={() => {
                setIsRegister(false);
                setLoginError(null);
              }}
              className={`w-full cursor-pointer rounded-full py-1 transition-colors duration-150 ${!isRegister ? 'bg-primary text-white' : 'bg-transparent text-primary'}`}
            >
              Přihlášení
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRegister(true);
                setLoginError(null);
              }}
              className={`w-full cursor-pointer rounded-full py-1 transition-colors duration-150 ${isRegister ? 'bg-primary text-white' : 'bg-transparent text-primary'}`}
            >
              Registrace
            </button>
          </div>
          {!isRegister ? (
            <form
              className="flex flex-col items-center gap-2 w-full"
              onSubmit={tryLogin}
            >
              {loginError && (
                <div className="w-full text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {loginError}
                </div>
              )}
              <div className="w-full">
                <label htmlFor="login-email" className="font-semibold text-sm">
                  Email
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium focus:ring-2 ring-primary/20 outline-none"
                  placeholder="jmeno@domena.cz"
                  required
                />
              </div>
              <div className="w-full relative">
                <label
                  htmlFor="login-password"
                  className="font-semibold text-sm"
                >
                  Heslo
                </label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium focus:ring-2 ring-primary/20 outline-none"
                  placeholder="Minimálně 8 znaků"
                  required
                />
              </div>
              <a
                className="text-sm text-left w-full mb-3 text-primary hover:underline"
                href="/auth/forgotten-password"
              >
                Zapomněli jste své heslo?
              </a>
              <button
                type="submit"
                disabled={isLoading}
                className="py-2.5 w-full px-3 flex items-center justify-center gap-2 bg-primary text-white font-semibold rounded-lg border-1 border-primary/30 cursor-pointer hover:bg-white hover:text-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Přihlašování...' : 'Přihlásit se'}
              </button>
            </form>
          ) : (
            <form
              className="flex flex-col items-center gap-2 w-full"
              onSubmit={tryRegister}
            >
              <div className="w-full">
                <label htmlFor="displayName" className="font-semibold text-sm">
                  Jméno a přijmení
                </label>
                <input
                  id="displayName"
                  name="displayName"
                  className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium outline-none"
                  placeholder="Jakub Šulc"
                />
              </div>
              <div className="w-full">
                <label htmlFor="email" className="font-semibold text-sm">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium outline-none"
                  placeholder="jmeno@domena.cz"
                />
              </div>
              <div className="w-full">
                <label htmlFor="username" className="font-semibold text-sm">
                  Uživatelské jméno
                </label>
                <input
                  id="username"
                  name="username"
                  className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium outline-none"
                  placeholder="uzivatelske_jmeno"
                />
              </div>
              <div className="w-full relative">
                <label htmlFor="password" className="font-semibold text-sm">
                  Heslo
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium outline-none"
                  placeholder="Minimálně 8 znaků"
                />
              </div>
              <div className="w-full relative mb-3">
                <label
                  htmlFor="passwordAgain"
                  className="font-semibold text-sm"
                >
                  Heslo ještě jednou
                </label>
                <input
                  id="passwordAgain"
                  type="password"
                  name="passwordAgain"
                  className="bg-white border-primary border rounded-lg py-2 w-full px-3 font-medium outline-none"
                  placeholder="Minimálně 8 znaků"
                />
              </div>
              <button
                type="submit"
                className="py-2.5 w-full px-3 flex items-center justify-center gap-2 bg-primary text-white font-semibold rounded-lg border-1 border-primary/30 cursor-pointer hover:bg-white hover:text-primary transition-all duration-200"
              >
                Registrovat se
              </button>
            </form>
          )}
          <hr className="my-6 w-full border-primary/20" />
          <div className="items-center flex flex-col gap-2 w-full">
            <Link
              href={`${backendLink}/auth/oauth/google`}
              className="py-2 w-full px-3 flex items-center justify-center gap-3 bg-white text-primary font-semibold rounded-xl border-1 border-primary/30 cursor-pointer hover:bg-primary/5 transition-all"
            >
              <img
                src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw"
                width="18"
                height="18"
                alt="Google"
              />
              Pokračovat s Google
            </Link>
            <button className="py-2 w-full px-3 flex items-center justify-center gap-3 bg-white text-primary font-semibold rounded-xl border-1 border-primary/30 cursor-pointer hover:bg-primary/5 transition-all">
              <img
                src="/images/seznam.png"
                width="18"
                height="18"
                alt="Google"
              />
              Pokračovat se Seznamem
            </button>
            <button className="py-2 w-full px-3 flex items-center justify-center gap-3 bg-white text-primary font-semibold rounded-xl border-1 border-primary/30 cursor-pointer hover:bg-primary/5 transition-all">
              <Icon icon="ic:baseline-apple" className="text-2xl" />
              Pokračovat s Apple
            </button>
            <button className="py-2 w-full px-3 flex items-center justify-center gap-3 bg-white text-primary font-semibold rounded-xl border-1 border-primary/30 cursor-pointer hover:bg-primary/5 transition-all">
              <Icon icon="ic:baseline-facebook" className="text-2xl" />
              Pokračovat s Facebook
            </button>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <button
            onClick={() => setStep(1)}
            className="flex items-center gap-1 text-primary mb-4 hover:underline cursor-pointer"
          >
            <Icon icon="material-symbols:arrow-back" />
            Zpět
          </button>
          <h1 className="font-bold w-full text-center text-4xl">
            Jako fakt jste to vy?
          </h1>
          <p className="text-center mt-2 text-primary/70">
            Pro dokončení registrace zadejte kód, který jsme vám právě poslali
            na váš e-mail.
          </p>
          <div className="flex items-center justify-center m-10">
            <div className="flex gap-2 items-center">
              {[0, 1, 2].map((i) => (
                <input
                  key={i}
                  className="rounded-lg border-2 border-primary/30 text-2xl md:text-3xl w-8 md:w-12 h-12 md:h-16 text-center focus:border-primary outline-none"
                  maxLength={1}
                  onChange={(e) => handleOtpChange(e, i)}
                />
              ))}
              <span className="text-2xl font-bold text-primary/30">-</span>
              {[3, 4, 5].map((i) => (
                <input
                  key={i}
                  className="rounded-lg border-2 border-primary/30 text-2xl md:text-3xl w-8 md:w-12 h-12 md:h-16 text-center focus:border-primary outline-none"
                  maxLength={1}
                  onChange={(e) => handleOtpChange(e, i)}
                />
              ))}
            </div>
          </div>
          <button
            onClick={() => setStep(3)}
            className="py-3 w-full px-3 flex items-center justify-center gap-2 bg-primary text-white font-semibold rounded-lg hover:bg-white hover:text-primary border-1 border-primary transition-all duration-200 cursor-pointer"
          >
            Ověřit a pokračovat
          </button>
          <p className="text-center mt-4 text-sm">
            Nedostal jste kód?{' '}
            <button className="font-bold text-primary hover:underline">
              Zaslat znovu
            </button>
          </p>
        </>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center text-center py-5">
          <div className="text-primary rounded-full flex items-center justify-center mb-6">
            <Icon icon="material-symbols:check-circle" className="text-6xl" />
          </div>
          <h1 className="font-bold text-4xl mb-2">A to je vše!</h1>
          <p className="text-primary/70 mb-8">
            Váš účet byl úspěšně vytvořen a ověřen. Nyní můžete začít objevovat
            všechny možnosti JakoFakt!
          </p>
          <button
            onClick={() => (window.location.href = '/dashboard')}
            className="cursor-pointer py-3 w-full px-3 flex items-center justify-center gap-2 bg-primary text-white font-semibold rounded-lg hover:bg-white hover:text-primary border-1 border-primary transition-all duration-200"
          >
            Přejít na dashboard
            <Icon
              icon="material-symbols:arrow-right-alt-rounded"
              className="text-2xl"
            />
          </button>
        </div>
      )}
    </div>
  );
}
