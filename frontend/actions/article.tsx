"use server";

import { UserModel } from "./user";

export interface ArticleModel {
  _id: string,
  createdAt: string,
  header: {
    title: string,
    headline: string,
    author: UserModel,
  },
  body: {
    content: string,
  },
  meta: {
    views: number,
    tags?: string[],
  },
}

export async function RetrieveArticlesFromBackend({ 
  query,
}: {
  query: string,
}): Promise<ArticleModel[]> {
  const res = await fetch(
    `${process.env.BACKEND_URL}/articles?query=${query}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to find articles with query ${query}. ${res.statusText}`);
  }

  return res.json();
}

export async function RetrieveExactArticleFromBackend({
  id,
}: {
  id: string
}): Promise<ArticleModel> {
  const res = await fetch(
    `${process.env.BACKEND_URL}/articles/exact?id=${id}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to find article with id ${id}. ${res.statusText}`);
  }

  return res.json();
}