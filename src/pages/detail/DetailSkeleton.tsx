import { Card, Placeholder, Row, Col, Container } from 'react-bootstrap';
const DetailSkeleton = () => {
  return (
    <Container>
      <Row className="justify-content-md-center my-5">
        <Col md={8}>
          <Card>
            <Card.Header>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
            </Card.Header>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={7} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={12} />
                <Placeholder xs={12} />
                <Placeholder xs={10} />
              </Placeholder>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default DetailSkeleton;
