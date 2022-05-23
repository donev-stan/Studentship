import { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import applyImg from "../../images/Internship/apply.png";
import { getLoggedUser } from "../../core/services/AuthService";
import { Navigate } from "react-router-dom";

const InternshipApplyCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    if (getLoggedUser()) {
      if (getLoggedUser().type === "student") setShowModal(true);
    } else setRedirect(true);
  };

  return (
    <>
      {redirect && <Navigate to={"/login"} />}

      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Apply For A Job</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4 m-4 pt-2 pb-2">
          <Form>
            {/* Upload CV */}
            <Form.Group controlId="formFile" className="mb-4">
              <Form.Label>Upload CV</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            {/* Message */}
            <Form.Group className="my-4">
              <Form.Label>Message</Form.Label>
              <Form.Control
                placeholder="Message / cover letter to the company ..."
                as="textarea"
                rows={3}
              />
            </Form.Group>

            {/* Apply Btn */}
            <Col className="text-center">
              <Button variant="success" onClick={handleClose}>
                Apply
              </Button>
            </Col>
          </Form>
        </Modal.Body>
      </Modal>

      <Card
        className="shadowItem pointer transformItem my-3"
        onClick={handleShow}
      >
        <Card.Body className="text-center">
          <Row>
            <Col lg={2}>
              <img src={applyImg} alt="" width={"80px"} />
            </Col>
            <Col lg={10} className="mt-4">
              <h5 className="align-middle">Apply For A Job</h5>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default InternshipApplyCard;
