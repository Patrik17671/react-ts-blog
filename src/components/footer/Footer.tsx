import { Container, Navbar } from 'react-bootstrap';
const Header = () => {
  return (
    <footer>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Spilus Blog</Navbar.Brand>
        </Container>
      </Navbar>
    </footer>
  );
};
export default Header;
