"use server";

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
  
  const res = await fetch(
    `${process.env.BACKEND_URL}/articles/vote`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
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
  
  const res = await fetch(
    `${process.env.BACKEND_URL}/articles/comment/vote`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
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