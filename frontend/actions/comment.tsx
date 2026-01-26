"use server";

import { UserModel } from "./user";

export interface CommentModel {
  user: UserModel;
  content: string;
  createdAt: string;
}