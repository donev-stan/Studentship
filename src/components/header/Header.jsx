import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { getLoggedUser, logout } from "../../services/AuthService";
import { deleteStudentF } from "../../services/StudentService";
import { deleteCompanyF } from "../../services/CompanyService";

import logo_0 from "../../images/logo_0.png";
import logo_1 from "../../images/logo_1.png";
import logo_2 from "../../images/logo_2.png";
import logo_3 from "../../images/logo_3.png";
import logo_4 from "../../images/logo_4.png";
import logo_5 from "../../images/logo_5.png";

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
      deleteStudentF(user.id).then((_) => {
        logout();
        setRedirect(true);
      });
    } else if (user.type === "company") {
      deleteCompanyF(user.id).then((_) => {
        logout();
        setRedirect(true);
      });
    }

    handleClose();
  };

  return (
    <>
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
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className="shadowItem">
          <Container>
            <Navbar.Brand as={Link} to="/">
              {" "}
              <img
                alt="Internship Logo"
                src={logo_3}
                width="35"
                height="35"
                className="d-inline-block align-top"
              />{" "}
              StudentShip
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

                {user?.type === "company" && (
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
                    <Link to={`/profile/${user.id}`}>
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
                      to={`/profile/${user.id}`}
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
    </>
  );
};

export default Header;