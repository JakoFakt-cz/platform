import { ArticleModel } from "@/actions/article";

export const dummyArticle: ArticleModel = {
  _id: "",
  header: {
    title: "Jak správně strukturovat Next.js + NestJS monorepo",
    headline: "Praktický průvodce moderním fullstackem",
    authorId: "author_123",
  },
  body: {
    content: `
      Toto je ukázkový obsah článku.
      Slouží pouze jako dummy data pro vývoj,
      testování nebo layout frontend komponent.
    `,
  },
  meta: {
    views: 42,
    tags: [""],
  },
};