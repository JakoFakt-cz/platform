'use server';

import { cookies } from 'next/headers';
import { CommentModel } from './comment';
import { UserModel } from './user';
import { VoteModel } from './vote';

export interface ArticleModel {
  _id: string;
  createdAt: string;
  header: {
    title: string;
    headline: string;
    author: UserModel | null;
  };
  body: {
    content: string;
    sources: SourceModel[];
  };
  meta: {
    views: number;
    tags?: string[];
    comments: CommentModel[];
    votes: VoteModel[];
  };
}

export interface SourceModel {
  link: string;
}

export async function RetrieveArticlesFromBackend({
  query,
  limit = 5,
  latest,
  author,
}: {
  query?: string;
  limit?: number;
  latest?: boolean;
  author?: string;
}): Promise<ArticleModel[]> {
  let queryParams = '';
  queryParams = addQueryParam(queryParams, 'query', query);
  queryParams = addQueryParam(queryParams, 'limit', limit);
  queryParams = addQueryParam(queryParams, 'latest', latest);
  queryParams = addQueryParam(queryParams, 'authorId', author);
  const res = await fetch(`${process.env.BACKEND_URL}/articles${queryParams}`, {
    method: 'GET',
  });

  if (!res.ok) {
    console.error(queryParams);
    throw new Error(
      `Failed to find articles with query ${query}. ${res.statusText}`
    );
  }

  return res.json();
}

export async function RetrieveExactArticleFromBackend({
  id,
}: {
  id: string;
}): Promise<ArticleModel> {
  const res = await fetch(
    `${process.env.BACKEND_URL}/articles/exact?id=${id}`,
    {
      method: 'GET',
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to find article with id ${id}. ${res.statusText}`);
  }

  return res.json();
}

function addQueryParam(
  input: string,
  paramName: string,
  paramValue?: any
): string {
  if (!paramValue) return input;
  const separator = input.includes('?') ? '&' : '?';
  return input + separator + paramName + '=' + paramValue;
}

export async function CreateArticleToBackend({
  title,
  headline,
  content,
  sources,
}: {
  title: string;
  headline: string;
  content: string;
  sources: string[];
}): Promise<ArticleModel> {
  const cookieStore = await cookies();
  const token = cookieStore.get('jako_access_token')?.value;

  const res = await fetch(`${process.env.BACKEND_URL}/articles/create`, {
    method: 'POST',
    body: JSON.stringify({
      title: title,
      headline: headline,
      content: content,
      sources: sources,
    }),
    headers: {
      'Content-Type': 'application/json',
      Cookie: `jako_access_token=${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to create article with title ${title}. ${await res.text()} ${res.statusText}`
    );
  }

  return res.json();
}
