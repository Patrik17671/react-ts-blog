import { useParams } from 'react-router-dom';
import { Post } from '../../types/postTypes';
import { useQuery } from 'react-query';
import { fetchPostDetail } from '../../utils/fetches';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import Comments from '../../components/comments/Comments';
import DetailSkeleton from './DetailSkeleton';

const Detail = () => {
  //Get id of post
  const { id } = useParams<{ id: string }>();

  //Get post by ID
  const {
    data: post,
    isLoading,
    error,
  } = useQuery<Post, Error>(
    ['postDetails', id],
    () => (id ? fetchPostDetail(id) : Promise.reject(new Error('ID is undefined'))),
    { enabled: !!id },
  );

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (error) return <Alert variant="danger">An error occurred: {error.message}</Alert>;

  if (!post) return <Alert variant="warning">Post not found</Alert>;

  return (
    <Container>
      <Row className="justify-content-md-center my-5">
        <Col md={8}>
          <Card>
            <Card.Header as="h1">{post?.title}</Card.Header>
            <Card.Body>
              <Card.Title>Published: {new Date(post?.createdAt).toLocaleDateString()}</Card.Title>
              <Card.Text>{post?.content}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-4">
        <Col md={8}>
          <Comments comments={post.comments} post={post} />
        </Col>
      </Row>
    </Container>
  );
};
export default Detail;
