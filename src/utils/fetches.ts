import { Post } from '../types/postTypes';

export const fetchBlogList = async (): Promise<Post[]> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log(response);
    return response.json();
  } catch (error) {
    console.error('Fetching movie details failed:', error);
    throw error;
  }
};
