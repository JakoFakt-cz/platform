import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

type borderType = "shadow" | "border" | "none";

interface Props {
  borderType?: borderType;
  header?: ReactNode;
  article: {
    author: string;
    authorImage: string;
    tagline: string;
    date: string;
    description: string;
    votes: number;
    numberOfComments: number;
    id: string;
  }
}

export default function ArticleComponent({
  borderType = "border",
  header,
  article,
}: Props) {
  return (
    <div className={`rounded-2xl flex flex-col p-5 w-full ${borderType == "border" ? "shadow-xl border" : borderType == "shadow" && "shadow-xl" }`}>
      {header && (
        <div className="mb-10">
          {header}
        </div>
      )}
      <div className="flex-row flex items-center content-center gap-1.5 mb-3">
        <Image src={article.authorImage} alt="logo" className="rounded-xl" width="18" height="18" />
        <span className="text-sm font-semibold">{article.author}</span>
        <span className="text-sm">{article.date}</span>
      </div>
      <hr className="border-primary my-3"/>
      <h1 className="text-2xl font-semibold mb-1">{article.tagline}</h1>
      <span className="truncate">{article.description}</span>
      <div className="flex-row flex items-center gap-2 pt-5 mt-auto">
        <div className="border rounded-full flex px-2 py-1 items-center">
          {/* TODO: add voting */}
          <button className="hover:scale-120 transition-all hover:cursor-pointer">
            <Icon icon="bx:up-arrow"/>
          </button>
          <span className="px-1">{article.votes}</span>
          {/* TODO: add voting */}
          <button className="hover:scale-120 transition-all hover:cursor-pointer">
            <Icon icon="bx:down-arrow"/>
          </button>
        </div>
        <Link
          className="border flex items-center gap-1 text-primary px-3 py-1 rounded-full hover:scale-105 hover:cursor-pointer transition-all"
          href={`/article?id=${article.id}#comments`}
        >
          <Icon icon="material-symbols:comment-outline"/>
          {article.numberOfComments}
        </Link>
        <a href={`/article?id=${article.id}`} className="bg-primary text-white px-3 py-1 rounded-full hover:scale-105 hover:cursor-pointer transition-all">
          Číst
        </a>
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
      </div>
    </div>
  );
}