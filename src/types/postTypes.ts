export type Post = {
  id: string;
  title: string;
  summary: string;
  createdAt: string;
  avatar: string;
  comments: Comment[];
  urlName: string;
  content: string;
};

export type Comment = {
  id: string;
  text: string;
  author: string;
};
