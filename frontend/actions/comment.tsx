"use server";

import { UserModel } from "./user";

export interface CommentModel {
  user: UserModel;
  content: string;
  createdAt: string;
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
  
  const res = await fetch(
    `${process.env.BACKEND_URL}/articles/comment`,
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