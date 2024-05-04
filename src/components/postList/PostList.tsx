import { useQuery } from 'react-query';
import { fetchBlogList } from '../../utils/fetches';
import PostItem from '../postItem/PostItem';
import { map } from 'lodash';

const PostList = () => {
  const { data: posts, isLoading, error } = useQuery('blogs', fetchBlogList);

  if (isLoading) return <div>Loading...</div>;

  if (error instanceof Error) {
    return (
      <div>
        <div>An error occurred: {error?.message}</div>
      </div>
    );
  }

  return (
    <div>
      {map(posts, (post, index) => {
        return <PostItem key={index} post={post} />;
      })}
    </div>
  );
};
export default PostList;
