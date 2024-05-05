import { Comment, Post } from '../../types/postTypes';
import { FC, useState } from 'react';
import map from 'lodash/map';
import { Button, Card } from 'react-bootstrap';
import AddCommentForm from '../forms/AddCommentForm';

type CommentsProps = {
  comments: Comment[];
  post: Post;
};
const Comments: FC<CommentsProps> = ({ comments, post }) => {
  const [activeReply, setActiveReply] = useState<string>('0');

  return (
    <div>
      <AddCommentForm post={post} />
      {comments.length > 0 ? (
        <>
          <h4>Comments</h4>
          {map(comments, (comment, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <div className={'d-flex justify-content-between align-items-center'}>
                  <Card.Text className="fw-bold">{comment.name}</Card.Text>
                  <Button size="sm" className="mb-2" onClick={() => setActiveReply(comment.id)}>
                    Reply
                  </Button>
                </div>
                <Card.Text>{comment.comment}</Card.Text>
                {comment.replies.length > 0 ? (
                  <div className="pl-4">
                    {map(comment.replies, (reply, replyIndex) => (
                      <Card key={replyIndex} className="mt-2 bg-light">
                        <Card.Body>
                          <Card.Text className="fw-bold">{reply.name}</Card.Text>
                          {reply.comment}
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                ) : (
                  ''
                )}
                {activeReply === comment.id ? (
                  <div className={'mt-4'}>
                    <AddCommentForm post={post} replyToId={comment.id} />
                  </div>
                ) : (
                  ''
                )}
              </Card.Body>
            </Card>
          ))}
        </>
      ) : (
        ''
      )}
    </div>
  );
};
export default Comments;
