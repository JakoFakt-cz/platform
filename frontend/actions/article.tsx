'use server';

import { CommentModel } from './comment';
import { UserModel } from './user';

export interface ArticleModel {
  _id: string;
  createdAt: string;
  header: {
    title: string;
    headline: string;
    author: UserModel;
  };
  body: {
    content: string;
  };
  meta: {
    views: number;
    tags?: string[];
    comments: CommentModel[];
  };
}

export async function RetrieveArticlesFromBackend({
  query,
  limit = 5,
  latest,
}: {
  query?: string;
  limit?: number;
  latest?: boolean;
}): Promise<ArticleModel[]> {
  let queryParams = '';
  queryParams = addQueryParam(queryParams, 'query', query);
  queryParams = addQueryParam(queryParams, 'limit', limit);
  queryParams = addQueryParam(queryParams, 'latest', latest);
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
