'use client';

import {
  ArticleModel,
  RetrieveExactArticleFromBackend,
} from '@/actions/article';
import LoaderComponent from '@/components/loader';
import { scrollToHash } from '@/components/scroll';
import {
  FormatTimeArticle,
  FormatWhenMessage,
} from '@/formatters/timeformatter';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { redirect, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { SendComment, SendArticleVote, SendCommentVote } from './actions';
import { UserModel } from '@/actions/user';

export default function PostDetail() {
  const params = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [article, setArticle] = useState<ArticleModel | null>(null);
  const [plainComment, setPlainComment] = useState<string>('');
  const [stopVoting, setStopVoting] = useState<boolean>(false);
  const [cachedUsers, setCachedUsers] = useState<UserModel[]>([]);
  const divRef = useRef<HTMLDivElement>(null);
  const idParam = params.get('id');
  const userId = '69492c68e2b63e716b2dd9d1'; // TODO: replace with real user ID

  if (!idParam) {
    redirect('/');
  }

  const VoteToArticle = async (positive: boolean) => {
    if (stopVoting) return;
    if (!article) return;
    try {
      setStopVoting(true);
      const updatedArticle = await SendArticleVote(article, userId, positive);
      setArticle(updatedArticle);
      setStopVoting(false);
    } catch (error) {
      console.error('Failed to send vote:', error);
    }
  };
  const currentArticleVote = article?.meta.votes?.find((vote) => vote.user._id === userId);

  const VoteToComment = async (commentId: string, positive: boolean) => {
    if (stopVoting) return;
    if (!article) return;
    try {
      setStopVoting(true);
      const updatedArticle = await SendCommentVote(article, commentId, userId, positive);
      setArticle(updatedArticle);
      setStopVoting(false);
    } catch (error) {
      console.error('Failed to send comment vote:', error);
      setStopVoting(false);
    }
  };

  const Comment = async () => {
    if (!article) return;
    await SendComment(idParam, plainComment, setPlainComment);
    // Po odeslání vyčisti div
    if (divRef.current) {
      divRef.current.textContent = '';
    }
  };

  const ReplyToComment = (userId: string) => {
    const mention = `<@${userId}> `;
    setPlainComment(prev => mention + prev);

    if (!divRef.current) return;

    const span = document.createElement('span');
    span.className = 'mention bg-accent/60 p-1 rounded-lg';
    span.contentEditable = 'false';
    span.setAttribute('data-user-id', userId);
    const user = cachedUsers.find(u => u._id.toString() === userId);
    span.textContent = `@${user ? user.displayName : userId}`;

    // Mezera jako samostatný textový uzel - PŘED span, aby kurzor byl správně
    const spaceAfter = document.createTextNode('\u00A0'); // non-breaking space
    divRef.current.prepend(spaceAfter); // nejdřív mezera (bude za spanem)
    divRef.current.prepend(span);       // pak span (půjde před mezeru)

    // Posuň kurzor na konec
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(divRef.current);
    range.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(range);
    divRef.current.focus();
  };

  const SerializeComment = () => {
    if (!divRef.current) return;
    const serialize = (node: Node): string => {
      if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? '';
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as Element;
        if (el.classList.contains('mention')) {
          const id = el.getAttribute('data-user-id');
          return id ? `<@${id}>` : '';
        }
        return Array.from(node.childNodes).map(serialize).join('');
      }
      return '';
    };
    setPlainComment(Array.from(divRef.current.childNodes).map(serialize).join(''));
  };

  const ParseComment = (content: string) => {
    const parts = content.split(/(<@!?[\s]*[a-fA-F0-9]{24}[\s]*>)/g);

    return (
      <span>
        {parts.map((part, i) => {
          const match = part.match(/^<@!?[\s]*([a-fA-F0-9]{24})[\s]*>$/);
          if (match) {
            const user = cachedUsers.find(u => u._id.toString() === match[1]);
            return (
              <span key={i} className="mention bg-accent/60 p-1 rounded-lg" contentEditable={false} data-user-id={match[1]}>
                @{user ? user.displayName : match[1]}
              </span>
            );
          }
          return <React.Fragment key={i}>{part}</React.Fragment>;
        })}
      </span>
    );
  };

  useEffect(() => {
    const onHashChange = () => scrollToHash();

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (!article) return;

    scrollToHash();
  }, [article]);

  useEffect(() => {
    RetrieveExactArticleFromBackend({ id: idParam }).then((article) => {
      const cachedUsersTemp: UserModel[] = [];
      cachedUsersTemp.push(article.header.author!!);
      for (const comment of article.meta.comments ?? []) {
        cachedUsersTemp.push(comment.user);
      }

      setCachedUsers(cachedUsersTemp);
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

  if (article == null) { // article not found
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
            <span className="font-medium">Článek</span>
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

            <div className="text-gray-700 text-lg leading-relaxed space-y-4 break-all">
              <p>{article.body.content}</p>
            </div>

            <div className='text-blue/400 leading-normal break-all mt-8'>
              <h3 className='text-primary text-xl font-bold'>Zdroje</h3>
              <div className='flex flex-col gap-2'>
                {(article.body.sources ?? []).map((source, index) => {

                  return (
                    <a className='text-accent hover:text-blue-400 transition-all duration-300' href={source.link} key={index}>{source.link}</a>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-secondary/20 flex items-center gap-4">
              <div className="border border-secondary rounded-full flex px-3 py-1 items-center bg-secondary/5">
                <button className="hover:scale-120 transition-all hover:cursor-pointer text-primary" onClick={() => VoteToArticle(true)}>
                  <Icon icon={currentArticleVote != undefined && currentArticleVote.positive ? "bxs:up-arrow" : "bx:up-arrow"} fontSize={20}/>
                </button>
                <span className="px-3 font-bold text-primary text-lg">{(article.meta.votes ?? []).reduce((cur, vote) => (vote.positive ? 1 : -1) + cur, 0)}</span>
                <button className="hover:scale-120 transition-all hover:cursor-pointer text-primary" onClick={() => VoteToArticle(false)}>
                  <Icon icon={currentArticleVote != undefined && !currentArticleVote.positive ? "bxs:down-arrow" : "bx:down-arrow"} fontSize={20}/>
                </button>
              </div>

              <button 
                className="cursor-pointer flex items-center gap-2 text-primary px-4 py-2 rounded-full hover:bg-secondary/20 transition-all"
                onClickCapture={async () => {
                  await navigator.clipboard.writeText(window.location.href);
                  toast.success('Odkaz na článek zkopírován do schránky!');
                }}
              >
                <Icon icon="material-symbols:share-outline" fontSize={18} />
                <span className="font-medium">Sdílet</span>
              </button>

              {/* 
              TODO: add reporting
              <button className="cursor-pointer ml-auto flex items-center text-sm gap-1 hover:text-accent transition-all text-gray-400">
                <Icon icon="ci:flag" />
                Nahlásit
              </button>
              */}
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-bold text-primary px-2">Komentáře ({(article.meta.comments ?? []).length})</h3>

          <div className="bg-white p-4 rounded-2xl shadow-md border border-primary/5 flex gap-4" id="comments">
            <div className="w-full">
              <div
                ref={divRef}
                contentEditable
                className="w-full bg-secondary/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all border border-primary min-h-24"
                data-placeholder="Napište svůj komentář..."
                suppressContentEditableWarning
                onInput={() => SerializeComment()}
                onKeyDownCapture={(e) => {
                  const sel = window.getSelection();
                  if (!sel || !sel.rangeCount) return;

                  if (e.key === 'Backspace') {
                    e.preventDefault();

                    const range = sel.getRangeAt(0);
                    if (e.ctrlKey) {
                      const { startContainer, startOffset } = range;
                      if (startContainer.nodeType === Node.TEXT_NODE) {
                        const text = startContainer.textContent ?? '';
                        const before = text.slice(0, startOffset);
                        const wordStart = before.search(/\S+\s*$/);
                        const deleteFrom = wordStart === -1 ? 0 : wordStart;
                        startContainer.textContent = text.slice(0, deleteFrom) + text.slice(startOffset);
                        range.setStart(startContainer, deleteFrom);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                      }
                    } else {
                      const { startContainer, startOffset } = range;
                      if (startContainer.nodeType === Node.TEXT_NODE && startOffset > 0) {
                        const text = startContainer.textContent ?? '';
                        startContainer.textContent = text.slice(0, startOffset - 1) + text.slice(startOffset);
                        range.setStart(startContainer, startOffset - 1);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                      } else {
                        const prev = startContainer.previousSibling;
                        if (prev) prev.remove();
                      }
                    }

                    SerializeComment();
                  }

                  if (e.key === 'Delete') {
                    e.preventDefault();
                    const range = sel.getRangeAt(0);
                    const { startContainer, startOffset } = range;

                    if (e.ctrlKey) {
                      if (startContainer.nodeType === Node.TEXT_NODE) {
                        const text = startContainer.textContent ?? '';
                        const after = text.slice(startOffset);
                        const wordEnd = after.search(/\s\S/);
                        const deleteCount = wordEnd === -1 ? after.length : wordEnd + 1;
                        startContainer.textContent = text.slice(0, startOffset) + text.slice(startOffset + deleteCount);
                        range.setStart(startContainer, startOffset);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                      }
                    } else {
                      if (startContainer.nodeType === Node.TEXT_NODE) {
                        const text = startContainer.textContent ?? '';
                        if (startOffset < text.length) {
                          startContainer.textContent = text.slice(0, startOffset) + text.slice(startOffset + 1);
                          range.setStart(startContainer, startOffset);
                          range.collapse(true);
                          sel.removeAllRanges();
                          sel.addRange(range);
                        }
                      } else {
                        const next = (startContainer as Element).childNodes[startOffset];
                        if (next) next.remove();
                      }
                    }

                    SerializeComment();
                  }

                  if (e.key === 'Enter' && !e.shiftKey) {
                    Comment();
                  }
                }}
              />
              <div className="flex justify-end mt-2">
                <button 
                  className="bg-primary text-white px-6 py-1.5 rounded-full font-medium cursor-pointer hover:bg-primary/90 transition-all"
                  onClickCapture={() => {
                    Comment();
                  }}
                >
                  Odeslat
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {(article.meta.comments ?? []).map((comment, index) => {
              const { user, createdAt, content, votes } = comment;
              const currentVote = comment.votes.find((vote) => vote.user._id === userId);

              return (
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-primary/5" key={index}>
                  <div className="flex items-center gap-2 mb-2">
                    <Image src={user.profilePictureUrl} alt="logo" width="30" height="30" className="rounded-full border-2 border-secondary" />
                    <span className="font-bold text-sm text-primary">{user.displayName}</span>
                    <span className="text-xs text-gray-400">{FormatWhenMessage(new Date(createdAt))}</span>
                  </div>
              
                  <p className="text-gray-700 ml-10">
                    {ParseComment(content)}
                  </p>
                
                  <div className="ml-10 mt-3 flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Icon icon={currentVote != undefined && currentVote.positive ? "bxs:up-arrow" : "bx:up-arrow"} className="cursor-pointer hover:text-primary" onClick={() => VoteToComment(comment._id, true)} />
                      <span className="font-bold">{(votes ?? []).reduce((cur, vote) => (vote.positive ? 1 : -1) + cur, 0)}</span>
                      <Icon icon={currentVote != undefined && !currentVote.positive ? "bxs:down-arrow" : "bx:down-arrow"} className="cursor-pointer hover:text-primary" onClick={() => VoteToComment(comment._id, false)} />
                    </div>
                    <button className="hover:text-primary cursor-pointer font-medium" onClick={() => ReplyToComment(user._id)}>Odpovědět</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
