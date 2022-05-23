import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

import { getLoggedUser, logout } from "../../services/AuthService";
import { deleteStudent } from "../../services/StudentService";
import { deleteCompany } from "../../services/CompanyService";

import logo from "../../images/logo.png";

const Header = () => {
  const [user, setUser] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    setUser(getLoggedUser());
  }, []);

  const userLogout = (e) => {
    logout();
    setRedirect(true);
  };

  const userDelete = () => {
    if (user.type === "student") {
      deleteStudent(user.id).then((_) => {
        setRedirect(true);
      });
    } else if (user.type === "company") {
      deleteCompany(user.id).then((_) => {
        setRedirect(true);
      });
    }

    handleClose();
  };

  return (
    <Row>
      {redirect && <Navigate to="/login" />}

      <Modal
        className="text-center"
        show={showModal}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 className="text-warning"> Warning! </h3>
          <p style={{ fontSize: "larger" }}>
            You are about to delete your profile! <br /> This action is
            irreversible!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={userDelete}>
            Delete Profile
          </Button>
        </Modal.Footer>
      </Modal>

      <Container fluid>
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">
              {" "}
              <img
                alt="Internship Logo"
                src={logo}
                width="35"
                height="35"
                className="d-inline-block align-top"
              />{" "}
              Find Internship
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/internships">
                  {" "}
                  Internships{" "}
                </Nav.Link>
                <Nav.Link as={Link} to="/companies">
                  {" "}
                  Companies{" "}
                </Nav.Link>

                {user?.contacts?.PIC && (
                  <Nav.Link as={Link} to="/students">
                    {" "}
                    Students{" "}
                  </Nav.Link>
                )}
              </Nav>

              <Nav>
                {user?.name ? (
                  <Navbar.Text>
                    Signed in as:{" "}
                    <Link to="/profile">
                      {user.name} {user?.lastName}
                    </Link>
                  </Navbar.Text>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/login">
                      {" "}
                      Login{" "}
                    </Nav.Link>
                    <Nav.Link as={Link} to="/register">
                      {" "}
                      Register{" "}
                    </Nav.Link>
                  </>
                )}
              </Nav>
              {user && (
                <Nav>
                  <NavDropdown
                    id="nav-dropdown-dark-example"
                    title=""
                    menuVariant="dark"
                    align={{ lg: "end" }}
                  >
                    <NavDropdown.Item
                      className="text-light"
                      as={Link}
                      to="/profile"
                    >
                      Profile
                    </NavDropdown.Item>

                    {user.type === "company" && (
                      <>
                        <NavDropdown.Item
                          className="text-light"
                          as={Link}
                          to="/internships/create"
                        >
                          Create Job
                        </NavDropdown.Item>

                        <NavDropdown.Item
                          className="text-light"
                          as={Link}
                          to="/company/jobs"
                        >
                          My Jobs
                        </NavDropdown.Item>
                      </>
                    )}

                    <NavDropdown.Item
                      className="text-success"
                      as={Link}
                      to="/bookmarks"
                    >
                      Bookmarks
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item
                      className="text-info"
                      onClick={userLogout}
                    >
                      Logout
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="text-warning"
                      as={Link}
                      to={`/${user?.lastName ? "students" : "companies"}/edit/${
                        user?.id
                      }`}
                    >
                      Edit profile
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      className="text-danger"
                      onClick={handleShow}
                    >
                      Delete Profile
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </Row>
  );
};

export default Header;