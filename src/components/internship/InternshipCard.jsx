import React from "react";
import { Link } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import {
  returnReadableDate,
  returnStackWithIcons,
} from "../../services/InternshipService";

import "../GlobalStyles.css";

const InternshipCard = ({ offer }) => {
  return (
    <Col lg={6}>
      <Card
        className="text-center my-3 shadowItem pointer transformItem decorationNone black"
        as={Link}
        to={`/internships/${offer.id}`}
        // style={{ minHeight: "250px"}}
      >
        <Card.Header className="black">{offer.officeLocation}</Card.Header>
        <Card.Body>
          <Card.Title>{offer.title}</Card.Title>
          <Card.Text className="mt-3 black">
            {offer?.technologies?.map((tech) => returnStackWithIcons(tech))}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          {/* {returnReadableDate(offer.lastUpdate)} */}
          {offer.lastUpdate}
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default InternshipCard;
