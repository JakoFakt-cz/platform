"use server";

import { cookies } from 'next/headers';
import { ArticleModel } from "./article";
import { UserModel } from "./user";

export interface VoteModel {
  user: UserModel;
  positive: boolean;
}

interface VoteRequest {
  status: number,
  statusText: string,
  message: string,
}

export async function AddVoteToArticle({
  userId,
  positive,
  articleId,
}: {
  userId: string;
  positive: boolean;
  articleId: string;
}): Promise<VoteRequest> {
  const body = {
    userId,
    positive,
    articleId,
  };
  
  const cookieStore = await cookies();
  const token = cookieStore.get('jako_access_token')?.value;

  const res = await fetch(
    `${process.env.BACKEND_URL}/articles/vote`,
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
      message: JSON.stringify(resJson),
    };
  }

  return {
    status: res.status,
    statusText: res.statusText,
    message: await res.text(),
  };
}


export async function AddVoteToComment({
  userId,
  positive,
  articleId,
  commentId,
}: {
  userId: string;
  positive: boolean;
  articleId: string;
  commentId: string;
}): Promise<VoteRequest> {
  const body = {
    userId,
    positive,
    articleId,
    commentId,
  };
  
  const cookieStore = await cookies();
  const token = cookieStore.get('jako_access_token')?.value;

  const res = await fetch(
    `${process.env.BACKEND_URL}/articles/comment/vote`,
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
      message: JSON.stringify(resJson),
    };
  }

  return {
    status: res.status,
    statusText: res.statusText,
    message: await res.text(),
  };
}