import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Form, Card, Alert } from 'react-bootstrap';
import { FC, useEffect, useState, useCallback } from 'react';
import { Post } from '../../types/postTypes';
import { addComment } from '../../utils/fetches';
import { useMutation, useQueryClient } from 'react-query';

interface IFormInput {
  name: string;
  comment: string;
  replyToId?: string;
}

type FormProps = {
  post: Post;
  replyToId?: string;
};
const AddCommentForm: FC<FormProps> = ({ post, replyToId }) => {
  // Hooks into React Query's client for caching and state management.
  const queryClient = useQueryClient();
  // Setup form handling with react-hook-form.
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);

  // Mutation hook from React Query to handle the asynchronous request for adding a comment.
  const mutation = useMutation((updatedPost: Post) => addComment(updatedPost), {
    onSuccess: () => {
      // Invalidate and refetch data related to post details after successful comment addition.
      queryClient.invalidateQueries('postDetails');
      reset();
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
      setShowErrorAlert(false);
    },
    onError: error => {
      // Log and show error message on submission failure.
      console.error('Submission error', error);
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 3000);
      setShowSuccessAlert(false);
    },
  });
  const onSubmit = useCallback<SubmitHandler<IFormInput>>(
    data => {
      // Logic to determine if this is a new comment or a reply to an existing comment.
      if (replyToId) {
        const updatedComments = post.comments.map(comment => {
          if (comment.id === replyToId) {
            return {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: Date.now().toString(), // Generate a unique ID for the new reply.
                  name: data.name,
                  comment: data.comment,
                  replies: [],
                },
              ],
            };
          }
          return comment;
        });

        mutation.mutate({ ...post, comments: updatedComments });
      } else {
        // Handling adding a new comment to the post.
        const newComment = {
          id: Date.now().toString(),
          name: data.name,
          comment: data.comment,
          replies: [],
        };

        const updatedPost = {
          ...post,
          comments: [...post.comments, newComment],
        };

        mutation.mutate(updatedPost);
      }
    },
    [replyToId, post, mutation],
  );

  // Keyboard event listener to trigger form submission on Ctrl+R.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'r') {
        event.preventDefault(); // Prevent default browser refresh action.
        handleSubmit(onSubmit)();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSubmit, onSubmit]);

  return (
    <Card className={'mb-4'}>
      <Card.Header as="h5">{replyToId ? 'Add reply' : 'Add comment'}</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label htmlFor="name">Name*</Form.Label>
            <Form.Control
              type="text"
              id="name"
              {...register('name', { required: 'Name is required' })}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="comment">Comment*</Form.Label>
            <Form.Control
              as="textarea"
              id="comment"
              {...register('comment', { required: 'Comment is required' })}
              isInvalid={!!errors.comment}
            />
            <Form.Control.Feedback type="invalid">{errors.comment?.message}</Form.Control.Feedback>
          </Form.Group>

          <Button className={'mt-2'} type="submit">
            {replyToId ? 'Add reply' : 'Add comment'}
          </Button>
          {showSuccessAlert ? (
            <Alert className={'mt-2'} variant="success">
              {replyToId ? 'Reply added successfully!' : 'Comment added successfully!'}
            </Alert>
          ) : (
            ''
          )}
          {showErrorAlert ? (
            <Alert className={'mt-2'} variant="danger">
              {replyToId ? 'Failed to add reply!' : 'Failed to add comment!'}
            </Alert>
          ) : (
            ''
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};
export default AddCommentForm;
