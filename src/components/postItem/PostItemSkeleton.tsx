import { Card, Placeholder, Button } from 'react-bootstrap';

const PostItemSkeleton = () => {
  return (
    <Card className="mb-3">
      <Card.Header>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={3} />
        </Placeholder>
      </Card.Header>
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
        </Placeholder>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" disabled>
          Detail
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default PostItemSkeleton;
