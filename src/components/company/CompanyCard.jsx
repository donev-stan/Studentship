import React from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/esm/Col";

const CompanyCard = ({ company }) => {
  const { id, name, image } = company;

  return (
    <Col className="mt-4 text-center d-flex justify-content-center" lg={4}>
      <Card
        style={{ width: "18rem" }}
        className="shadowItem transformItem black decorationNone "
        as={Link}
        to={`/companies/${id}`}
      >
        <Card.Img variant="top" src={image} />{" "}
        <Card.Body  className="d-flex align-items-center justify-content-center">
          <Card.Title> {name} </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CompanyCard;
