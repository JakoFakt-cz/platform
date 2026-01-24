"use client";

import Image from 'next/image';
import { Icon } from '@iconify/react';
import { redirect, useSearchParams } from 'next/navigation';
import ArticleComponent from '@/components/composites/article/ArticleComponent';
import RetrieveArticleFromBackend, { ArticleModel } from '@/actions/article';
import { useEffect, useState } from 'react';
import { dummyArticle } from '@/dummy/dummyArticle';
import LoaderComponent from '@/components/loader';

export default function SearchPage() {
  const searchParams = useSearchParams();

  const queryParam = searchParams.get('query');
  const queryTypeParam = searchParams.get('queryType');

  if (!queryParam) {
    redirect('/');
  }

  const [loading, setLoading] = useState<boolean>(true);
  const [articles, setArticles] = useState<ArticleModel[]>();
  const [topArticle, setTopArticle] = useState<ArticleModel>(dummyArticle);

  useEffect(() => {
    RetrieveArticleFromBackend({ query: queryParam }).then((value) => {
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
            description: topArticle.body.content,
            author: topArticle.header.authorId,
            tagline: topArticle.header.headline,
            numberOfComments: 0, //TODO: add number of comments
            votes: 0, //TODO: add number of views
            id: topArticle._id,
            date: "1/1/2000", //TODO: add date
          }}
        />
        </div>
      </section>
      <section className="w-full flex flex-col gap-4 px-5 md:px-30">
        <h2 className="text-2xl font-semibold">Další vyhledané výsledky</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mb-10">
          {[topArticle, ...articles!!].map((article, index) => {
            return (
              <div key={index}>
                <ArticleComponent
                  article={{
                    description: article.body.content,
                    author: article.header.authorId,
                    tagline: article.header.headline,
                    numberOfComments: 5,
                    votes: -2,
                    id: article._id,
                    date: "1/1/2000"
                  }}
                />
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
