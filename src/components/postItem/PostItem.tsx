import { FC } from 'react';
import { Post } from '../../types/postTypes';
import { Card } from 'react-bootstrap';
import truncate from 'lodash/truncate';
import { Link } from 'react-router-dom';

type PostProps = {
  post: Post;
};
const PostItem: FC<PostProps> = ({ post }) => {
  return (
    <Card className="mb-3">
      <Card.Header as="h5">{post.title}</Card.Header>
      <Card.Body>
        <Card.Title>Published: {new Date(post.createdAt).toLocaleDateString()}</Card.Title>
        <Card.Text>
          {truncate(post.content, {
            length: 100,
            separator: /,? +/,
            omission: '...',
          })}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Link to={`/post/${post.id}`} className={'btn btn-primary'}>
          Detail
        </Link>
      </Card.Footer>
    </Card>
  );
};
export default PostItem;
