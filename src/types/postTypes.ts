export type Post = {
  id: string;
  title: string;
  createdAt: string;
  avatar: string;
  comments: Comment[];
  urlName: string;
  content: string;
};

export type Comment = {
  id: string;
  comment: string;
  name: string;
  replies: Reply[];
};

export type Reply = {
  id: string;
  comment: string;
  name: string;
};
