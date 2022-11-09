import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./navbar.css";
import { Link } from "react-scroll";
import { Link as NavLink } from "react-router-dom";
export default function Hpnavbar() {
  return (
    <Navbar className="hp-navbar" collapseOnSelect expand="lg" variant="light">
      <Container>
        <Navbar.Brand className="fw-bold hp-navbrand" href="/">
          gooly.
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link>
              <Link
                activeClass="active"
                to="hero"
                spy={true}
                hashSpy={true}
                offset={50}
                duration={500}
                delay={1000}
                isDynamic={true}
                ignoreCancelEvents={false}
                spyThrottle={500}
              >
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                activeClass="active"
                to="about"
                spy={true}
                offset={50}
                duration={500}
                delay={1000}
                isDynamic={true}
                ignoreCancelEvents={false}
                spyThrottle={500}
              >
                About
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                activeClass="active"
                to="shorten"
                spy={true}
                offset={50}
                duration={500}
                delay={1000}
                isDynamic={true}
                ignoreCancelEvents={false}
                spyThrottle={500}
              >
                Shorten
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                activeClass="active"
                to="faq"
                spy={true}
                offset={50}
                duration={500}
                delay={1000}
                isDynamic={true}
                ignoreCancelEvents={false}
                spyThrottle={500}
              >
                FAQ
              </Link>
            </Nav.Link>
            <Nav.Link className="ms-4" href="#login">
              <NavLink to="/login" className="navbar-cta">
                Sign In
              </NavLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
