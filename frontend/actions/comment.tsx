"use server";

import { cookies } from 'next/headers';
import { ArticleModel } from "./article";
import { UserModel } from "./user";
import { VoteModel } from "./vote";

export interface CommentModel {
  user: UserModel;
  content: string;
  createdAt: string;
  votes: VoteModel[];
  _id: string;
}

export interface BackendCommentModel {
  userId: string;
  content: string;
}

interface CommentRequest {
  status: number,
  statusText: string,
  message: string,
  newCommentId?: string,
}

export async function AddCommentToArticle({
  articleId,
  comment,
}: {
  articleId: string,
  comment: BackendCommentModel,
}): Promise<CommentRequest> {
  const body = {
    articleId: articleId,
    comment: {
      user: comment.userId,
      content: comment.content,
    },
  };
  
  const cookieStore = await cookies();
  const token = cookieStore.get('jako_access_token')?.value;

  const res = await fetch(
    `${process.env.BACKEND_URL}/articles/comment`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Cookie: `jako_access_token=${token}`,
      },
    },
  );

  if (res.ok && res.status === 201) {
    const resJson = await res.json();
    return {
      status: res.status,
      statusText: res.statusText,
      message: JSON.stringify(resJson.article),
      newCommentId: resJson.newCommentId,
    };
  }

  return {
    status: res.status,
    statusText: res.statusText,
    message: await res.text(),
  };
}

export async function GetCommentsByAuthor({
  authorId,
  limit,
}: {
  authorId: string;
  limit?: number;
}): Promise<{ article: ArticleModel, comments: CommentModel[] }[]> {
  let queryParams = '';
  queryParams = addQueryParam(queryParams, 'limit', limit);
  queryParams = addQueryParam(queryParams, 'authorId', authorId);
  const res = await fetch(`${process.env.BACKEND_URL}/articles/comments/author${queryParams}`, {
    method: 'GET',
  });

  if (!res.ok) {
    console.error(queryParams);
    throw new Error(
      `Failed to find articles with author ${authorId}. ${await res.text()} ${res.statusText}`
    );
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