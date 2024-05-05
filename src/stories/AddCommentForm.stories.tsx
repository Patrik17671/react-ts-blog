import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AddCommentForm from '../components/forms/AddCommentForm';
import { Post } from '../types/postTypes';

export default {
  title: 'Forms/AddCommentForm',
  component: AddCommentForm,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <QueryClientProvider client={new QueryClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} as Meta;

type FormProps = {
  post: Post;
  replyToId?: string;
};

const samplePost: Post = {
  id: 'post1',
  title: 'Example Post',
  content: 'This is an example post content.',
  createdAt: new Date().toISOString(),
  avatar: 'https://example.com/avatar.jpg',
  urlName: 'example-post',
  comments: [
    {
      id: 'comment1',
      name: 'John Doe',
      comment: 'A sample comment.',
      replies: [],
    },
  ],
};

const Template: StoryObj<FormProps> = {
  args: {
    post: samplePost,
  },
  render: args => <AddCommentForm {...args} />,
};

export const Default = {
  ...Template,
  args: {
    ...Template.args,
    replyToId: undefined,
  },
};

export const ReplyToComment = {
  ...Template,
  args: {
    ...Template.args,
    replyToId: 'comment1',
  },
};
