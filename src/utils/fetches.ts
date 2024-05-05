import { Post } from '../types/postTypes';

//Fetching functions
export const fetchPostsList = async (): Promise<Post[]> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log(response);
    return response.json();
  } catch (error) {
    console.error('Fetching post list failed:', error);
    throw error;
  }
};

export const fetchPostDetail = async (id: string): Promise<Post> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log(response);
    return response.json();
  } catch (error) {
    console.error('Fetching post details failed:', error);
    throw error;
  }
};

export const addComment = async (formData: Post): Promise<Post> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts/${formData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Failed to post comment');
    }
    console.log('Comment posted successfully:', response);
    return response.json();
  } catch (error) {
    console.error('Error posting comment:', error);
    throw error;
  }
};
