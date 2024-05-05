import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Comments from '../components/comments/Comments';
import { StoryObj, Meta } from '@storybook/react';
import { Post, Comment } from '../types/postTypes';

const queryClient = new QueryClient();

export default {
  title: 'Components/Comments',
  component: Comments,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} as Meta;

interface CommentsProps {
  comments: Comment[];
  post: Post;
}

const Template: StoryObj<CommentsProps> = {
  render: args => <Comments {...args} />,
};

export const Default = {
  ...Template,
  args: {
    post: {
      id: '1',
      title: 'Sample Post Title',
      content: 'Here is some sample content of the post.',
    },
    comments: [
      {
        id: 'c1',
        name: 'John Doe',
        comment: 'This is a sample comment.',
        replies: [
          {
            id: 'r1',
            name: 'Jane Doe',
            comment: 'This is a reply.',
          },
        ],
      },
    ],
  },
};

export const NoComments = {
  ...Template,
  args: {
    post: {
      id: '2',
      title: 'Another Post',
      content: 'This post has no comments yet.',
    },
    comments: [],
  },
};
