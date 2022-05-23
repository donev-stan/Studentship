import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getCompanyByPIC, saveCompany } from "../../services/CompanyService";
import { login } from "../../services/AuthService";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import Header from "../header/Header";

const CompanyEdit = () => {
  const [companyData, setCompanyData] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});
  const [companyContacts, setCompanyContacts] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    getCompanyByPIC(id).then((company) => {
      setCompanyData(company);
      setCompanyInfo(company.info);
      setCompanyContacts(company.contacts);
    });
  }, [id]);

  const onInputChange = (event) => {
    event.persist();

    setCompanyData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    saveCompany(companyData)
      .then((_) => {
        login(companyData)
          .then((_) => {
            setRedirect(true);
          })
          .catch((error) => setError(error.message));
      })
      .catch((error) => setError(error.message));
  };

  return (
    <>
      {redirect && <Navigate to={`/profile`} />}

      <Header />
      <Container className="my-4">
        <Row className="text-center">
          <Col>
            <h2>Company Edit</h2>
            <hr />
          </Col>
        </Row>
        <Form
          onSubmit={onFormSubmit}
          style={{ width: "60rem" }}
          className="my-4 m-auto"
        >
          {error && (
            <Alert key={3} variant={"danger"} className="text-center">
              {error}
            </Alert>
          )}

          <Row>
            <Col>
              {/* Image */}
              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  placeholder="Place image link or leave blank for randomly generated one"
                  className="my-1"
                  name="image"
                  autoComplete="on"
                  onChange={onInputChange}
                  value={companyData.image}
                />
              </Form.Group>

              {/* PIC */}
              <Form.Group className="mb-3">
                <Form.Label>PIC*</Form.Label>
                <Form.Control
                  name="id"
                  onChange={onInputChange}
                  required
                  value={companyData.id}
                  disabled
                />
              </Form.Group>

              {/* Name*/}
              <Form.Group className="mb-3">
                <Form.Label>Name of Company*</Form.Label>
                <Form.Control
                  name="name"
                  onChange={onInputChange}
                  required
                  value={companyData.name}
                />
              </Form.Group>

              {/* Founded */}
              <Form.Group className="mb-3">
                <Form.Label>Founded*</Form.Label>
                <Form.Control
                  name="founded"
                  onChange={onInputChange}
                  required
                  value={companyInfo.founded}
                />
              </Form.Group>

              {/* Address */}
              <Form.Group className="mb-3">
                <Form.Label>Address*</Form.Label>
                <Form.Control
                  name="address"
                  onChange={onInputChange}
                  required
                  value={companyContacts.address}
                />
              </Form.Group>

              {/* Telephone */}
              <Form.Group className="mb-3">
                <Form.Label>Telephone*</Form.Label>
                <Form.Control
                  name="telephone"
                  onChange={onInputChange}
                  required
                  value={companyContacts.telephone}
                />
              </Form.Group>

              {/* Employees */}
              <Form.Group className="mb-3">
                <Form.Label>Employees*</Form.Label>
                <Form.Control
                  name="employees"
                  onChange={onInputChange}
                  required
                  value={companyInfo.employees}
                />
              </Form.Group>

              {/* Locations */}
              <Form.Group className="mb-3">
                <Form.Label>Work Locations*</Form.Label>
                <Form.Control
                  placeholder="Separate them with comas: e.g. Sofia, Plovdiv"
                  name="locations"
                  onChange={onInputChange}
                  required
                  value={companyInfo.locations}
                />
              </Form.Group>

              {/* WebsiteURL */}
              <Form.Group>
                <Form.Label>Link to your website</Form.Label>
                <Form.Control
                  placeholder="Place link here"
                  name="websiteURL"
                  onChange={onInputChange}
                  value={companyContacts.websiteURL}
                />
              </Form.Group>
            </Col>

            <Col>
              {/* About */}
              <Form.Group className="mb-3">
                <Form.Label>About the company*</Form.Label>
                <Form.Control
                  placeholder="Tell us about this company ..."
                  as="textarea"
                  rows={3}
                  name="about"
                  autoComplete="on"
                  onChange={onInputChange}
                  required
                  value={companyData.about}
                />
              </Form.Group>

              {/* Career */}
              <Form.Group className="mb-3">
                <Form.Label>Career at the company</Form.Label>
                <Form.Control
                  placeholder="What stands out from your company compared to others ..."
                  as="textarea"
                  rows={3}
                  name="career"
                  autoComplete="on"
                  onChange={onInputChange}
                  value={companyData.career}
                />
              </Form.Group>

              {/* Benefits */}
              <Form.Group className="mb-3">
                <Form.Label>Benefits*</Form.Label>
                <Form.Control
                  placeholder="Separate each benefit with comas"
                  as="textarea"
                  rows={4}
                  name="benefits"
                  autoComplete="on"
                  onChange={onInputChange}
                  required
                  value={companyData.benefits}
                />
              </Form.Group>

              {/* Technologies */}
              <Form.Group className="mb-3">
                <Form.Label>Tech Stack*</Form.Label>
                <Form.Control
                  placeholder="Separate technologies with comas: e.g. JavaScript, Node.js"
                  name="technologies"
                  onChange={onInputChange}
                  required
                  value={companyData.technologies}
                />
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label>Email address*</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  autoComplete="off"
                  onChange={onInputChange}
                  required
                  value={companyData.email}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-2">
                <Form.Label>Password*</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  autoComplete="on"
                  onChange={onInputChange}
                  required
                  value={companyData.password}
                />
              </Form.Group>

              {/* Repeat Password */}
              <Form.Group>
                <Form.Label>Repeat password*</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Repeat password"
                  required
                  value={companyData.password}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Submit */}
          <Row className="text-center my-4">
            <Col>
              <Button variant="danger" onClick={() => navigate(-1)}>
                Cancel Edit
              </Button>
            </Col>
            <Col>
              <Button type="submit" variant="warning">
                Edit Company Information
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default CompanyEdit;
