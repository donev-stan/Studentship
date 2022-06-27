import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Header from "../header/Header";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { createInternship, getAllInternships, saveOffer } from "../../services/InternshipService";
import { getLoggedUser } from "../../services/AuthService";

const InternshipCreate = () => {
  const [internshipData, setInternshipData] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (getLoggedUser().type !== "company") setRedirect(true);
  }, []);

  const onInputChange = (event) => {
    event.persist();

    setInternshipData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    createInternship(internshipData)
      .then((_) => {
        localStorage.removeItem("internships"); // In order to get latest internship data from the firebase
        setRedirect(true);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      {redirect && <Navigate to="/internships" />}
      <Header />
      <Container className="my-4">
        <Row className="text-center">
          <Col>
            <h2>Create Internship Offer</h2>
            <hr />
          </Col>
        </Row>
        {error && (
          <Alert key={3} variant={"danger"} className="text-center">
            {error}
          </Alert>
        )}
        <Form
          onSubmit={onFormSubmit}
          className="m-auto"
          style={{ width: "60rem" }}
        >
          <Row>
            <Col>
              {/* Title */}
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  onChange={onInputChange}
                  required
                />
              </Form.Group>

              {/* Salary */}
              <Row className="mb-3">
                <Form.Label>Salary Range (gross)</Form.Label>
                <Col>
                  <Form.Control
                    placeholder="Min"
                    name="salaryMin"
                    onChange={onInputChange}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="Max"
                    name="salaryMax"
                    onChange={onInputChange}
                  />
                </Col>
              </Row>

              {/* Location */}
              <Form.Group className="mb-3">
                <Form.Label>Office Location</Form.Label>
                <Form.Control
                  name="officeLocation"
                  onChange={onInputChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col>
              {/* Description */}
              <Form.Group className="mb-2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  onChange={onInputChange}
                  required
                />
              </Form.Group>

              {/* Technologies */}
              <Form.Group className="mb-3">
                <Form.Label>Technologies</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="technologies"
                  onChange={onInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              {/* Options */}
              <Form.Group className="mb-3">
                <Form.Label>Options</Form.Label>
                <Row>
                  <Col>
                    <Form.Check
                      type="checkbox"
                      label="Permanent Job"
                      name="permanent"
                      onChange={onInputChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Temporary Job"
                      name="temporary"
                      onChange={onInputChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Freelance Project"
                      name="freelanceProject"
                      onChange={onInputChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Full Time"
                      name="fullTime"
                      onChange={onInputChange}
                    />
                  </Col>

                  <Col>
                    <Form.Check
                      type="checkbox"
                      label="Part Time"
                      name="partTime"
                      onChange={onInputChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Flexible Time"
                      name="flexibleTime"
                      onChange={onInputChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Remote Interview"
                      name="remoteInterview"
                      onChange={onInputChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Home Office"
                      name="homeOffice"
                      onChange={onInputChange}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>

          {/* Submit */}
          <Row className="text-center my-4">
            <Col>
              <Button onClick={() => navigate(-1)} variant="danger">
                Cancel Creation
              </Button>
            </Col>
            <Col>
              <Button type="submit" variant="success">
                Create Offer
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default InternshipCreate;
