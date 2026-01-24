"use server";

export interface ArticleModel {
  _id: string,
  createdAt: string,
  header: {
    title: string,
    headline: string,
    authorId: string,
  },
  body: {
    content: string,
  },
  meta: {
    views: number,
    tags?: string[],
  },
}

export default async function RetrieveArticleFromBackend({ 
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
    throw new Error(`Failed to find articles. ${res.statusText}`);
  }

  return res.json();
}