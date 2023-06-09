import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  updateAuthStoreStateLogOut,
  updateAuthStoreStateLogIn,
} from "../../features/authentication/updateAuthState";
import authService from "../../_services/authService";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import navLogo from "../../assets/header_logo.png";
import formLogo from "../../assets/logo_diamond_form.png";
import validator from "validator";
import "./Header.scss";

export default function Header() {
  const initialFormValues = {
    email: "francisco@francisco.com",
    password: "12345678",
  };

  // HOOKS
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const isLoggedIn = authState.isLoggedIn;
  const { role, name, balance } = authState.userInfo;
  const isAdmin = role == "admin";
  const isPlayer = role == "player";
  const [showSignIn, setShowSignIn] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [formValues, setFormValues] = useState(initialFormValues);

  // HANDLERS
  const handleLogout = () => {
    updateAuthStoreStateLogOut();
    navigate("/");
  };

  const handleShowSignIn = () => {
    setShowSignIn(true);
  };

  // const handleHideSignIn = () => {
  //   setShowSignIn(false);
  // };

  const handleCloseForm = (e) => {
    e.preventDefault();
    setShowSignIn(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      email: formValues.email,
      password: formValues.password,
    };
    if (
      validator.isEmail(credentials.email) &&
      validator.isByteLength(credentials.password, { min: 8, max: undefined })
    ) {
      login(credentials);
      setShowSignIn(false);
    } else if (!validator.isEmail(credentials.email)) {
      setLoginError("Debes introducir un correo real");
    } else if (
      !validator.isByteLength(credentials.password, { min: 8, max: undefined })
    ) {
      setLoginError("La contraseña debe contener mínimo 8 caracteres");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // FUNCTIONS
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const token = response.token;
      setLoginError(null);
      updateAuthStoreStateLogIn(token);
    } catch (error) {
      console.log(error);
      setLoginError(error.response.data.message);
    }
  };

  // RETURN
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
            <Nav className="ms-auto">
              {isAdmin && (
                <>
                  <NavLink className="nav-link administrator-link" to="/admin">
                    Administrador
                  </NavLink>
                </>
              )}
            </Nav>
            {!isLoggedIn && (
              <Nav>
                <NavLink className="nav-link" onClick={handleShowSignIn}>
                  Iniciar sesión
                </NavLink>
              </Nav>
            )}
            {isPlayer && (
              <>
                <div className="balance">${balance}</div>
                <NavLink className="bet-history-link" to="/bet-history">
                  Historial
                </NavLink>
              </>
            )}
            {isLoggedIn && (
              <Nav>
                <NavDropdown
                  title={name}
                  id="collasible-nav-dropdown"
                  align={"end"}
                >
                  <NavDropdown.Item onClick={handleLogout}>
                    Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {showSignIn && (
        <>
          <div className="overlay">
            <div className="login-modal">
              <div className="logo">
                <img src={formLogo} alt="Logo de la empresa" />
              </div>
              <div>
                <form noValidate className="form" onSubmit={handleSubmit}>
                  <button className="close-button" onClick={handleCloseForm}>
                    X
                  </button>
                  <span className="sign-in-title">Iniciar sesión</span>
                  <div className="form-group">
                    <label>Email*</label>
                    <input
                      type="email"
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Contraseña*</label>
                    <input
                      type="password"
                      name="password"
                      value={formValues.password}
                      onChange={handleChange}
                    />
                  </div>
                  <br />
                  <button className="btn signInButton">Iniciar Sesión</button>
                </form>
                {loginError && <p style={{ color: "red" }}>{loginError}</p>}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
