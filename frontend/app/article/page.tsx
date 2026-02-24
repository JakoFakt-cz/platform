'use client';

import {
  ArticleModel,
  RetrieveExactArticleFromBackend,
} from '@/actions/article';
import LoaderComponent from '@/components/loader';
import {
  FormatTimeArticle,
  FormatWhenMessage,
} from '@/formatters/timeformatter';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PostDetail() {
  const params = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [article, setArticle] = useState<ArticleModel | null>(null);

  const idParam = params.get('id');

  if (!idParam) {
    redirect('/');
  }

  useEffect(() => {
    RetrieveExactArticleFromBackend({ id: idParam }).then((article) => {
      setArticle(article);
      setLoading(false);
    });
  }, [idParam]);

  if (loading) {
    return (
      <main className={'w-full min-h-screen'}>
        <section
          className={
            'w-full h-120 relative overflow-hidden bg-secondary/50 flex flex-col items-center justify-center'
          }
        >
          <Image
            src={'/images/background-pattern.png'}
            alt={'Vzor pozadí'}
            width={2560}
            height={1440}
            className={
              'w-full h-100 object-cover scale-150 absolute -z-10 select-none inset-0'
            }
          />
          <div
            className={
              'w-full mt-70 h-100 absolute bottom-0 left-0 bg-linear-to-b from-transparent to-secondary'
            }
          />

          <div
            className={
              'text-center text-balance font-bold text-primary text-shadow-lg z-5 w-2/3 flex flex-col items-center justify-center'
            }
          >
            <h1 className="text-4xl mb-8">Vyhledávání informací o článku</h1>
            <LoaderComponent size="normal" color="#2d4059" />
          </div>
        </section>
      </main>
    );
  }

  if (article == null) {
    // article not found
    return (
      <main className={'w-full min-h-screen'}>
        <section
          className={
            'w-full h-120 relative overflow-hidden bg-secondary/50 flex flex-col items-center justify-center'
          }
        >
          <Image
            src={'/images/background-pattern.png'}
            alt={'Vzor pozadí'}
            width={2560}
            height={1440}
            className={
              'w-full h-100 object-cover scale-150 absolute -z-10 select-none inset-0'
            }
          />
          <div
            className={
              'w-full mt-70 h-100 absolute bottom-0 left-0 bg-linear-to-b from-transparent to-secondary'
            }
          />

          <div
            className={
              'text-center text-balance font-bold text-primary text-shadow-lg z-5 w-2/3 flex flex-col items-center justify-center'
            }
          >
            <h1 className="text-4xl">
              Omlouváme se, ale daný článek jsme nenašli...
            </h1>
            <Icon icon="mage:robot-sad" width="64" height="64" />
            <span className="text-2xl mt-8">
              Myslíte že se jedná o chybu? Zkuste nás kontaktovat.
            </span>
            <span className="text-accent break-keep text-2xl">
              support@jakofakt.cz
            </span>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="w-full bg-secondary/20 min-h-screen">
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
          priority
          className={
            'w-full h-150 object-cover scale-150 absolute -z-1 select-none'
          }
        />
        <div
          className={
            'w-full mt-70 h-150 absolute bottom-0 left-0 bg-linear-to-b from-transparent to-secondary'
          }
        />
      </section>

      <section className="max-w-4xl mx-auto px-4 relative z-10 pb-20 -mt-130">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-primary/10">
          <div className="bg-accent text-white p-4 px-6 flex justify-between items-center">
            <span className="font-medium">Kategorie</span>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <img
                src={article.header.author?.profilePictureUrl ?? ''}
                width="45"
                height="45"
                className="rounded-full border-2 border-secondary"
              />
              <div className="flex flex-col">
                <span className="font-bold text-primary">
                  {article.header.author?.displayName ?? 'Neznámý autor'}
                </span>
                <span className="text-sm text-gray-500">
                  {FormatWhenMessage(new Date(article.createdAt))} •{' '}
                  {FormatTimeArticle(new Date(article.createdAt))}
                </span>
              </div>
            </div>

            <h1 className="text-4xl font-extrabold text-primary leading-tight">
              {article.header.title}
            </h1>

            <h1 className="text-xl text-primary/70 mb-4 leading-tight">
              {article.header.headline}
            </h1>

            <div className="text-gray-700 text-lg leading-relaxed space-y-4">
              <p>{article.body.content}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-secondary/20 flex items-center gap-4">
              <div className="border border-secondary rounded-full flex px-3 py-1 items-center bg-secondary/5">
                <button className="hover:scale-120 transition-all hover:cursor-pointer text-primary">
                  <Icon icon="bx:up-arrow" fontSize={20} />
                </button>
                <span className="px-3 font-bold text-primary text-lg">
                  TODO
                </span>
                <button className="hover:scale-120 transition-all hover:cursor-pointer text-primary">
                  <Icon icon="bx:down-arrow" fontSize={20} />
                </button>
              </div>

              <button className="cursor-pointer flex items-center gap-2 text-primary px-4 py-2 rounded-full hover:bg-secondary/20 transition-all">
                <Icon icon="material-symbols:share-outline" fontSize={18} />
                <span className="font-medium">Sdílet</span>
              </button>

              <button className="cursor-pointer ml-auto flex items-center text-sm gap-1 hover:text-accent transition-all text-gray-400">
                <Icon icon="ci:flag" />
                Nahlásit
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-bold text-primary px-2">Komentáře (x)</h3>

          <div className="bg-white p-4 rounded-2xl shadow-md border border-primary/5 flex gap-4">
            <div className="w-full">
              <textarea
                className="w-full bg-secondary/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all border border-primary resize-none"
                placeholder="Napište svůj komentář..."
                rows={4}
              />
              <div className="flex justify-end mt-2">
                <button className="bg-primary text-white px-6 py-1.5 rounded-full font-medium cursor-pointer hover:bg-primary/90 transition-all">
                  Odeslat
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-primary/5">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src="favicon.ico"
                  width="30"
                  height="30"
                  className="rounded-full border-2 border-secondary"
                />
                <span className="font-bold text-sm text-primary">
                  Někdo Někdo
                </span>
                <span className="text-xs text-gray-400">před x hodinami</span>
              </div>

              <p className="text-gray-700 ml-10">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              </p>

              <div className="ml-10 mt-3 flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Icon
                    icon="bx:up-arrow"
                    className="cursor-pointer hover:text-primary"
                  />
                  <span className="font-bold">xyz</span>
                  <Icon
                    icon="bx:down-arrow"
                    className="cursor-pointer hover:text-primary"
                  />
                </div>
                <button className="hover:text-primary cursor-pointer font-medium">
                  Odpovědět
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
