import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import NavbarLogo from "../../assets/images/todo-logo.svg";

const navItems = [
  {
    to: "/",
    value: "Home",
  },
  {
    to: "/contacts",
    value: "Contacts",
  },
  {
    to: "/about",
    value: "About",
  },
];

function NavBar() {
  const navItemJSX = navItems.map((navItem, index) => {
    return (
      <NavLink key={index} to={navItem.to} className="nav-link" exact={true}>
        {navItem.value}
      </NavLink>
    );
  });
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <NavLink to="/" className="navbar-brand">
          <img style={{ width: "140px" }} src={NavbarLogo} alt="Logo" />
        </NavLink>
        <Nav className="ml-auto">{navItemJSX}</Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
