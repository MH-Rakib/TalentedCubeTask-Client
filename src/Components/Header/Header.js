import React, { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "./../../App";
import { MdExitToApp } from "react-icons/md";
import "./Header.css";

const Header = () => {
  const { user } = useContext(UserContext);

  const [loggedInUser, setLoggedInUser] = user;

  const handleSignOut = () => {
    const user = {
      isSigned: false,
      name: "",
      email: "",
    };
    setLoggedInUser(user);
  };

  return (
    <Navbar className="header" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <h3>TalentedCube</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="navItems" as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link
              style={{ marginRight: "30px" }}
              className="navItems"
              as={Link}
              to="/myEvents"
            >
              My Events
            </Nav.Link>

            {loggedInUser.isSigned ? (
              <Nav.Link className="navItems">
                <span>{loggedInUser.email}</span>
                &nbsp; &nbsp;
                <span>
                  <MdExitToApp
                    onClick={handleSignOut}
                    style={{ fontSize: "30px", marginTop: "-5px" }}
                  />
                </span>
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="./Login">
                <span className="user">Login</span>
              </Nav.Link>
            )}

            <Nav.Link as={Link} to="./admin">
              <span className="admin">Admin</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
