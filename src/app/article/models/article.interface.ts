import {UserInterface} from "../../user/models/user.interface";

export interface ArticleInterface {
  slug: string;
  title: string;
  content: string;
  cover: string;
  views: number;
  status: string;
  publishedAt: string;
  author: UserInterface;
  category: string;
  tags: string[];
}
