import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import Header from "../header/Header";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import { getOfferByID, saveOffer } from "../../services/InternshipService";
import { getLoggedUser } from "../../services/AuthService";

const InternshipEdit = () => {
  const [internshipData, setInternshipData] = useState({});
  const [offerOptions, setOfferoptions] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getOfferByID(id).then((offer) => {
      if (getLoggedUser().id !== offer.companyID) setRedirect(true);

      setInternshipData(offer);
      setOfferoptions(offer.options);
    });
  }, [id]);

  const onInputChange = (event) => {
    event.persist();

    setInternshipData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    saveOffer(internshipData)
      .then((_) => {
        setRedirect(true);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      {redirect && <Navigate to={`/internships/${id}`} />}
      <Header />
      <Container className="my-4">
        <Row className="text-center">
          <Col>
            <h2>Edit Internship Offer</h2>
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
                  value={internshipData.title}
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
                    value={internshipData.salaryMin}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="Max"
                    name="salaryMax"
                    onChange={onInputChange}
                    value={internshipData.salaryMax}
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
                  value={internshipData.officeLocation}
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
                  value={internshipData.description}
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
                  value={internshipData?.technologies}
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
                      checked={offerOptions.permanent}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Temporary Job"
                      name="temporary"
                      onChange={onInputChange}
                      checked={offerOptions.temporary}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Freelance Project"
                      name="freelanceProject"
                      onChange={onInputChange}
                      checked={offerOptions.freelanceProject}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Full Time"
                      name="fullTime"
                      onChange={onInputChange}
                      checked={offerOptions.fullTime}
                    />
                  </Col>

                  <Col>
                    <Form.Check
                      type="checkbox"
                      label="Part Time"
                      name="partTime"
                      onChange={onInputChange}
                      checked={offerOptions.partTime}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Flexible Time"
                      name="flexibleTime"
                      onChange={onInputChange}
                      checked={offerOptions.flexibleTime}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Remote Interview"
                      name="remoteInterview"
                      onChange={onInputChange}
                      checked={offerOptions.remoteInterview}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Home Office"
                      name="homeOffice"
                      onChange={onInputChange}
                      checked={offerOptions.homeOffice}
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
                Cancel Edit
              </Button>
            </Col>
            <Col>
              <Button type="submit" variant="warning">
                Edit Offer
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default InternshipEdit;
