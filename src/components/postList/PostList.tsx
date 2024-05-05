import { useQuery } from 'react-query';
import { fetchPostsList } from '../../utils/fetches';
import PostItem from '../postItem/PostItem';
import map from 'lodash/map';
import times from 'lodash/times';
import PostItemSkeleton from '../postItem/PostItemSkeleton';

const PostList = () => {
  const { data: posts, isLoading, error } = useQuery('posts', fetchPostsList);

  if (isLoading)
    return (
      <>
        {times(4, index => (
          <PostItemSkeleton key={index} />
        ))}
      </>
    );

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
