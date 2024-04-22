import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export function NavMenu() {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
    <Container>
      <LinkContainer to="/">
        <Navbar.Brand>React | AppMusic</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
        <LinkContainer to="/home">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/albums-webapi">
            <Nav.Link>Music groups</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}