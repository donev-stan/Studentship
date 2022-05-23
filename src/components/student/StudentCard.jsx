import React from "react";
import { Link } from "react-router-dom";
import { yearWithWords } from "../../core/services/StudentService";

import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

// import profileImg from "../../images/user.png";

const StudentCard = ({ student }) => {
  const {
    id,
    picture,
    name,
    lastName,
    university,
    yearAtUni,
    specialty
  } = student;

  return (
    <Col className="my-4 d-flex justify-content-center">
      <Card
        style={{ width: "18rem" }}
        className="pointer shadowItem transformItem decorationNone black"
        as={Link}
        to={`/students/${id}`}
      >
        <Card.Img variant="top" src={picture} />
        <Card.Body>
          <Card.Title>
            {name} {lastName}
          </Card.Title>
          <hr />
          <Card.Text>{yearWithWords(yearAtUni)}</Card.Text>
          <Card.Text>{university}</Card.Text>
          <Card.Text>{specialty}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            Last login {Math.floor(Math.random() * 60)} mins ago
          </small>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default StudentCard;
