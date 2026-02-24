"use client";

import Image from 'next/image';
import Search from "@/components/composites/Search";
import { Icon } from '@iconify/react';
import LoaderComponent from '@/components/loader';
import { ArticleModel, RetrieveArticlesFromBackend } from '@/actions/article';
import { useEffect, useState } from 'react';
import ArticleComponent from '@/components/composites/article/ArticleComponent';
import { FormatTimeArticle } from '@/formatters/timeformatter';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<ArticleModel[]>();
  const [topArticle, setTopArticle] = useState<ArticleModel | null>(null);

  useEffect(() => {
    RetrieveArticlesFromBackend({ latest: true, limit: 9 }).then(async (value) => {
      setArticles(value);
      setTopArticle(value[0]);
      await new Promise((resolve) => setTimeout(resolve, 200)); // Make sure everything is loaded
      setLoading(false);
    })
  }, []);

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

          <h2
            className={
              'text-7xl text-center text-balance font-bold text-primary text-shadow-lg z-5'
            }
          >
            {/* TODO: Doladit design hlavního textu */}
            {/* NÁPAD: Text "dezinformace" by se mohl nějak měnit i na "podvody", "lži" atd. */}
            Odhalujeme, <span className={'underline'}>jak je to</span>,<br />
            <span className={'text-accent'}>doopravdy</span>
          </h2>
          <Search/>
        </section>
        <section className="w-full relative overflow-hidden items-center justify-center px-5 md:px-30 py-16 flex flex-col gap-4">
          <span className='font-bold text-primary text-shadow-lg'>Načítání článků...</span>
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

          <h2
            className={
              'text-7xl text-center text-balance font-bold text-primary text-shadow-lg z-5'
            }
          >
            {/* TODO: Doladit design hlavního textu */}
            {/* NÁPAD: Text "dezinformace" by se mohl nějak měnit i na "podvody", "lži" atd. */}
            tohle <span className={'underline'}>je</span>,<br />
            <span className={'text-accent'}>dokonalé hero</span>
          </h2>
          <Search/>
        </section>
        <section className="w-full relative overflow-hidden items-center justify-center px-5 md:px-30 py-16 flex flex-col gap-4">
          <span className='font-bold text-primary text-shadow-lg'>Omlouváme se, ale žádný článek jsme nenašli...</span>
          <Icon icon="mage:robot-sad" width="48" height="48" />
        </section>
      </main>
    );
  }

  return (
    <main className={'w-full'}>
      {/*   HERO SEKCE   */}
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

        <h2
          className={
            'text-7xl text-center text-balance font-bold text-primary text-shadow-lg z-5'
          }
        >
          {/* TODO: Doladit design hlavního textu */}
          {/* NÁPAD: Text "dezinformace" by se mohl nějak měnit i na "podvody", "lži" atd. */}
          <span className={'underline'}>Odhalujeme</span>, jak je to,<br />
          <span className={'text-accent'}>doopravdy</span>
        </h2>
        <Search />
      </section>
      <section className="w-full relative overflow-hidden flex flex-col items-center justify-center px-5 md:px-30">
        <div className="mb-4 w-full">
          <ArticleComponent
            article={{
              description: topArticle.header.headline,
              author: topArticle.header.author.displayName,
              authorImage: topArticle.header.author.profilePictureUrl,
              tagline: topArticle.header.title,
              numberOfComments: (topArticle.meta.comments ?? []).length,
              votes: 0, //TODO: add number of views
              id: topArticle._id,
              date: FormatTimeArticle(new Date(topArticle.createdAt)),
            }}
          />
        </div>
      </section>
      <section className="w-full flex flex-col items-center justify-center px-4 md:px-30">
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 shadow-xl rounded-2xl border border-primary mb-10 overflow-hidden">
          <a
            href="/"
            className="p-5 flex flex-col items-center hover:bg-primary hover:text-white transition-all border-b border-r border-primary/20 lg:border-b-0 last:border-r-0 lg:[&:not(:last-child)]:border-r"
          >
            <Icon
              icon="material-symbols:category-outline-rounded"
              fontSize="24"
            />
            <span className="font-semibold mt-2 text-center">Kategorie</span>
          </a>
          <a
            href="/"
            className="p-5 flex flex-col items-center hover:bg-primary hover:text-white transition-all border-b border-r border-primary/20 lg:border-b-0 last:border-r-0 lg:[&:not(:last-child)]:border-r"
          >
            <Icon
              icon="material-symbols:category-outline-rounded"
              fontSize="24"
            />
            <span className="font-semibold mt-2 text-center">Kategorie</span>
          </a>
          <a
            href="/"
            className="p-5 flex flex-col items-center hover:bg-primary hover:text-white transition-all border-b border-r border-primary/20 lg:border-b-0 last:border-r-0 lg:[&:not(:last-child)]:border-r"
          >
            <Icon
              icon="material-symbols:category-outline-rounded"
              fontSize="24"
            />
            <span className="font-semibold mt-2 text-center">Kategorie</span>
          </a>
          <a
            href="/"
            className="p-5 flex flex-col items-center hover:bg-primary hover:text-white transition-all border-b border-r border-primary/20 lg:border-b-0 last:border-r-0 lg:[&:not(:last-child)]:border-r"
          >
            <Icon
              icon="material-symbols:category-outline-rounded"
              fontSize="24"
            />
            <span className="font-semibold mt-2 text-center">Kategorie</span>
          </a>
          <a
            href="/"
            className="p-5 flex flex-col items-center hover:bg-primary hover:text-white transition-all border-b border-r border-primary/20 lg:border-b-0 last:border-r-0 lg:[&:not(:last-child)]:border-r"
          >
            <Icon
              icon="material-symbols:category-outline-rounded"
              fontSize="24"
            />
            <span className="font-semibold mt-2 text-center">Kategorie</span>
          </a>
          <a
            href="/"
            className="p-5 flex flex-col items-center hover:bg-primary hover:text-white transition-all border-b border-r border-primary/20 lg:border-b-0 last:border-r-0 lg:[&:not(:last-child)]:border-r"
          >
            <Icon
              icon="material-symbols:category-outline-rounded"
              fontSize="24"
            />
            <span className="font-semibold mt-2 text-center">Kategorie</span>
          </a>
        </div>
      </section>
      {articles && articles.length > 1 && (
        <section className="w-full flex flex-col items-center justify-center px-5 md:px-30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mb-10">
            {articles
              ?.filter((article) => article._id != topArticle._id)
              .map((article, index) => {
                return (
                  <div key={index}>
                    <ArticleComponent
                      article={{
                        description: article.header.headline,
                        author: article.header.author.displayName,
                        authorImage: article.header.author.profilePictureUrl,
                        tagline: article.header.title,
                        numberOfComments: article.meta.comments.length,
                        votes: -2,
                        id: article._id,
                        date: FormatTimeArticle(new Date(article.createdAt)),
                      }}
                    />
                  </div>
                );
              })}
          </div>
        </section>
      )}
    </main>
  );
}
