import { ArticleModel } from "@/actions/article";
import { VoteModel } from "@/actions/vote";
import { FormatWhenMessage } from "@/formatters/timeformatter";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

type borderType = "shadow" | "border" | "none";

interface Props {
  borderType?: borderType;
  header?: ReactNode;
  article: ArticleModel;
  userId: string;
  events: {
    onVote: (positive: boolean) => void;
  };
}

export default function ArticleComponent({
  borderType = "border",
  header,
  article,
  userId,
  events
}: Props) {
  // articles do not have populated vote which means there's no _id but just vote.user which is the _id unless they have been updated manually
  const currentVote = article?.meta.votes?.find((vote) => vote.user._id === userId || vote.user as any as string === userId);

  return (
    <div className={`rounded-2xl flex flex-col p-5 w-full ${borderType === "border" ? "shadow-xl border" : borderType === "shadow" && "shadow-xl" }`}>
      {header && (
        <div className="mb-10">
          {header}
        </div>
      )}
      <div className="flex-row flex items-center content-center gap-1.5 mb-3">
        <Image src={article.header.author?.profilePictureUrl ?? ''} alt="logo" className="rounded-xl" width="18" height="18" />
        <span className="text-sm font-semibold">{article.header.author?.displayName ?? 'Neznamy autor'}</span>
        <span className="text-sm">{FormatWhenMessage(new Date(article.createdAt))}</span>
      </div>
      <hr className="border-primary my-3"/>
      <h1 className="text-2xl font-semibold mb-1">{article.header.headline}</h1>
      <span className="truncate">{article.body.content ?? ''}</span>
      <div className="flex-row flex items-center gap-2 pt-5 mt-auto">
        <div className="border rounded-full flex px-2 py-1 items-center">
          {/* TODO: fix that upvote/downvote is not shown initially */}
          <button className="hover:scale-120 transition-all hover:cursor-pointer" onClick={() => events.onVote(true)}>
            <Icon icon={currentVote != undefined && currentVote.positive ? "bxs:up-arrow" : "bx:up-arrow"}/>
          </button>
          <span className="px-1">{(article.meta.votes ?? []).reduce((cur, vote) => (vote.positive ? 1 : -1) + cur, 0)}</span>
          <button className="hover:scale-120 transition-all hover:cursor-pointer" onClick={() => events.onVote(false)}>
            <Icon icon={currentVote != undefined && !currentVote.positive ? "bxs:down-arrow" : "bx:down-arrow"}/>
          </button>
        </div>
        <Link
          className="border flex items-center gap-1 text-primary px-3 py-1 rounded-full hover:scale-105 hover:cursor-pointer transition-all"
          href={`/article?id=${article._id}#comments`}
        >
          <Icon icon="material-symbols:comment-outline"/>
          {(article.meta.comments ?? []).length}
        </Link>
        <a href={`/article?id=${article._id}`} className="bg-primary text-white px-3 py-1 rounded-full hover:scale-105 hover:cursor-pointer transition-all">
          Číst
        </a>
        {/*
        TODO: add reporting
        <button 
          className="flex items-center text-sm gap-1 hover:cursor-pointer hover:text-accent transition-all"
          onClickCapture={(e) => {
            e.preventDefault();
            // TODO: pomoci API na backend zavolat report
          }}  
        >
          <Icon icon="ci:flag" className=""/>
          Nahlásit
        </button>
        */}
      </div>
    </div>
  );
}