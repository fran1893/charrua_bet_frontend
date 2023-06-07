import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateAuthStoreStateLogOut } from "../../features/authentication/updateAuthState";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import navLogo from "../../assets/header_logo.png";
import "./Header.scss";

export default function Header() {
  // hooks
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const isLoggedIn = authState.isLoggedIn;
  const { role, name } = authState.userInfo;
  const isAdmin = role == "admin";
  const isDoctor = role == "player";

  // handlers
  const handleLogout = () => {
    updateAuthStoreStateLogOut();
    navigate("/");
  };
  return (
    <div className="Header">
      <Navbar
        className="bg-gradient"
        collapseOnSelect
        expand="lg"
        variant="dark"
      >
        <Container>
          <Navbar.Brand href="/">
            <img
              src={navLogo}
              width="175.73"
              height="40px"
              className="d-inline-block align-top"
              alt="Charrua bet logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {isAdmin && (
                <>
                  <NavLink className="nav-link" to="/admin">
                    Administrador
                  </NavLink>
                  <NavLink className="nav-link" to="/register-doctor">
                    Registrar jugador
                  </NavLink>
                </>
              )}
            </Nav>
            {!isLoggedIn && (
              <Nav>
                <NavLink className="nav-link">Iniciar sesion</NavLink>
                {/* <NavLink className="nav-link" to="/register">
                  Registrarse
                </NavLink> */}
              </Nav>
            )}
            {isLoggedIn && (
              <Nav>
                <NavDropdown
                  title={name}
                  id="collasible-nav-dropdown"
                  align={"end"}
                >
                  <NavDropdown.Item href="/history">Historial</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
