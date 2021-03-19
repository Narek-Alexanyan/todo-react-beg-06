import {NavLink} from 'react-router-dom';
import { Navbar, Nav, Container } from "react-bootstrap";
import NavbarLogo from '../../assets/images/todo-logo.svg';

function NavBar() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <NavLink to="/" className="navbar-brand"><img style={{width: "140px"}} src={NavbarLogo} alt="Logo"/></NavLink>
        <Nav className="ml-auto">
          <NavLink to="/" className="nav-link" exact>Home</NavLink>
          <NavLink to="/contacts" className="nav-link" exact>Contacts</NavLink>
          <NavLink to="/about" className="nav-link" exact>About</NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
