import { ArticleModel } from "@/actions/article";
import { AddCommentToArticle, CommentModel } from "@/actions/comment";
import { AddVoteToArticle, AddVoteToComment } from "@/actions/vote";
import { toast } from "react-toastify/unstyled";

export const SendComment = (idParam: string, writtenComment: string, setWrittenComment: (value: string) => void) => {
  AddCommentToArticle({ 
    articleId: idParam, 
    comment: {
      userId: '69492c68e2b63e716b2dd9d1',
      content: writtenComment,
    }
  }).then((request) => {
    if (request.status === 201) {
      setWrittenComment('');
      toast.success('Komentář úspěšně odeslán!');
      window.location.reload();
    }
    else {
      toast(`${request.status} ${request.statusText}: Stala se chyba při odesílání komentáře.`);
      console.log(request.message);
    }
  }).catch((error) => {
    console.log(error);
  });
};

export const SendArticleVote = async (article: ArticleModel, userId: string, positive: boolean): Promise<ArticleModel> => {
  if ((article.meta.votes ?? []).some((vote) => vote.user._id === userId && vote.positive === positive)) {
    toast('Tento hlas již máte odeslaný!');
    return article;
  }

  const request = await AddVoteToArticle({
    articleId: article._id,
    userId: userId,
    positive: positive,
  })

  if (request && request.status === 201) {
    toast.success('Hlasování úspěšně odesláno!');
    return JSON.parse(request.message) as ArticleModel;
  }
  else {
    toast(`${request.status} ${request.statusText}: Stala se chyba při odesílání hlasu.`);
    throw new Error(`Failed to send vote: ${request.statusText} ${request.message}`);
  }
};

export const SendCommentVote = async (article: ArticleModel, commentId: string, userId: string, positive: boolean): Promise<ArticleModel> => {
  if ((article.meta.comments ?? []).find((comment) => (comment as any)._id === commentId)?.votes?.some((vote) => vote.user._id === userId && vote.positive === positive)) {
    toast('Tento hlas již máte odeslaný!');
    return article;
  }

  const request = await AddVoteToComment({
    articleId: article._id,
    userId: userId,
    positive: positive,
    commentId: commentId,
  })

  if (request && request.status === 201) {
    toast.success('Hlasování úspěšně odesláno!');
    return JSON.parse(request.message) as ArticleModel;
  }
  else {
    toast(`${request.status} ${request.statusText}: Stala se chyba při odesílání hlasu.`);
    throw new Error(`Failed to send vote: ${request.statusText} ${request.message}`);
  }
};