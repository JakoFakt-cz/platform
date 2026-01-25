"use client";

import Image from 'next/image';
import { Icon } from '@iconify/react';
import { redirect, useSearchParams } from 'next/navigation';
import ArticleComponent from '@/components/composites/article/ArticleComponent';
import { ArticleModel, RetrieveArticlesFromBackend } from '@/actions/article';
import { useEffect, useState } from 'react';
import LoaderComponent from '@/components/loader';
import { FormatTimeArticle } from '@/formatters/timeformatter';

export default function SearchPage() {
  const searchParams = useSearchParams();

  const queryParam = searchParams.get('query');

  if (!queryParam) {
    redirect('/');
  }

  const [loading, setLoading] = useState<boolean>(true);
  const [articles, setArticles] = useState<ArticleModel[]>();
  const [topArticle, setTopArticle] = useState<ArticleModel | null>(null);

  useEffect(() => {
    RetrieveArticlesFromBackend({ query: queryParam }).then((value) => {
      setArticles(value);
      setTopArticle(value[0]);
      setLoading(false);
    })
  }, [queryParam]);

  if (loading) {
    return (
      <main className={'w-full'}>
        {/*   HERO SEKCE   */}
        <section className={'w-full h-120 relative overflow-hidden bg-secondary/50 flex flex-col items-center justify-center'}>
          <Image
            src={'/images/background-pattern.png'}
            alt={'Vzor pozadí'}
            width={2560}
            height={1440}
            className={
              'w-full h-100 object-cover scale-150 absolute -z-10 select-none'
            }
          />
          <div
            className={
              'w-full mt-70 h-100 absolute bottom-0 left-0 bg-linear-to-b from-transparent to-secondary'
            }
          />

          <h1
            className={
              'text-5xl text-center text-balance font-bold text-primary text-shadow-lg z-5 w-2/3'
            }
          >
            výsledky vyhledávání na dotaz <br />
            <span className={'text-accent w-20 break-keep'}>{queryParam}</span>
          </h1>
        </section>
        <section className="w-full relative overflow-hidden items-center justify-center px-5 md:px-30 py-16 flex flex-col gap-4">
          <span className='font-bold text-primary text-shadow-lg'>Načítání výsledků pro dotaz...</span>
          <LoaderComponent size="normal" color='#2d4059' />
        </section>
      </main>
    );
  }

  if (topArticle == null) {
    return (
      <main className={'w-full'}>
        {/*   HERO SEKCE   */}
        <section className={'w-full h-120 relative overflow-hidden bg-secondary/50 flex flex-col items-center justify-center'}>
          <Image
            src={'/images/background-pattern.png'}
            alt={'Vzor pozadí'}
            width={2560}
            height={1440}
            className={
              'w-full h-100 object-cover scale-150 absolute -z-10 select-none'
            }
          />
          <div
            className={
              'w-full mt-70 h-100 absolute bottom-0 left-0 bg-linear-to-b from-transparent to-secondary'
            }
          />

          <h1
            className={
              'text-5xl text-center text-balance font-bold text-primary text-shadow-lg z-5 w-2/3'
            }
          >
            výsledky vyhledávání na dotaz <br />
            <span className={'text-accent w-20 break-keep'}>{queryParam}</span>
          </h1>
        </section>
        <section className="w-full relative overflow-hidden items-center justify-center px-5 md:px-30 py-16 flex flex-col gap-4">
          <span className='font-bold text-primary text-shadow-lg'>Omlouváme se, ale k danému dotazu jsme nic nenašli...</span>
          <Icon icon="mage:robot-sad" width="48" height="48" />
        </section>
      </main>
    );
  }

  return (
    <main className={'w-full'}>
      {/*   HERO SEKCE   */}
      <section className={'w-full h-120 relative overflow-hidden bg-secondary/50 flex flex-col items-center justify-center'}>
        <Image
          src={'/images/background-pattern.png'}
          alt={'Vzor pozadí'}
          width={2560}
          height={1440}
          className={
            'w-full h-100 object-cover scale-150 absolute -z-10 select-none'
          }
        />
        <div
          className={
            'w-full mt-70 h-100 absolute bottom-0 left-0 bg-linear-to-b from-transparent to-secondary'
          }
        />

        <h1
          className={
            'text-5xl text-center text-balance font-bold text-primary text-shadow-lg z-5 w-2/3'
          }
        >
          výsledky vyhledávání na dotaz <br />
          <span className={'text-accent w-20 break-keep'}>{queryParam}</span>
        </h1>
      </section>
      <section className="w-full relative overflow-hidden flex flex-col items-center justify-center px-5 md:px-30">
        <div className='mb-10 w-full'>
          <ArticleComponent
            header={
              <div className="bg-accent rounded-t-2xl text-white font-medium text-xl p-3 px-3 -m-5 flex items-center gap-1">
                <Icon icon="mdi:fire" width="24" height="24" />
                Nejlepší výsledek
              </div>
            }
            borderType='shadow'
            article={{
              description: topArticle.header.headline,
              author: topArticle.header.author.displayName,
              authorImage: topArticle.header.author.profilePictureUrl,
              tagline: topArticle.header.title,
              numberOfComments: 0, //TODO: add number of comments
              votes: 0, //TODO: add number of views
              id: topArticle._id,
              date: FormatTimeArticle(new Date(topArticle.createdAt)),
            }}
          />
        </div>
      </section>
      {articles && articles.length > 1 && (
        <section className="w-full flex flex-col gap-4 px-5 md:px-30">
          <h2 className="text-2xl font-semibold">Další vyhledané výsledky</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mb-10">
          {articles?.filter((article) => article._id != topArticle._id).map((article, index) => {
              return (
                <div key={index}>
                  <ArticleComponent
                    article={{
                      description: article.header.headline,
                      author: article.header.author.displayName,
                      authorImage: article.header.author.profilePictureUrl,
                      tagline: article.header.title,
                      numberOfComments: 5,
                      votes: -2,
                      id: article._id,
                      date: FormatTimeArticle(new Date(article.createdAt)),
                    }}
                  />
                </div>
              );
            })
          }
          </div>
        </section>
      )}
    </main>
  );
}
