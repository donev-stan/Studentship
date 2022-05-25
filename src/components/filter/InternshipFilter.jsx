import React, { useState, useRef } from "react";

import Container from "react-bootstrap/Container";
import Overlay from "react-bootstrap/Overlay";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const InternshipFilter = () => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <Container
      style={{
        backgroundColor: "rgba(0,0,0,.03)",
        borderRadius: "15px",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        // boxShadow: "0px 20px 30px 0px rgb(0 0 0 / 10%)",
      }}
      className="mt-3 p-4 text-center"
    >
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="fs-5 mb-2 fw-bold">Town</Form.Label>
              <Form.Control type="text" className="shadowItem" />
            </Form.Group>

            <Row className="p-4 pb-0 pt-3">
              <span
                style={stackSpan}
                ref={target}
                onClick={() => setShow(!show)}
              >
                Plovdiv
              </span>
              <Overlay target={target.current} show={show} placement="top">
                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                  <div
                    {...props}
                    style={{
                      position: "absolute",
                      backgroundColor: "rgba(255, 100, 100, 0.85)",
                      padding: "2px 10px",
                      color: "white",
                      borderRadius: 3,
                      ...props.style,
                    }}
                  >
                    Remove
                  </div>
                )}
              </Overlay>
            </Row>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label className="fs-5 mb-2 fw-bold">Keywords</Form.Label>
              <Form.Control type="text" className="shadowItem" />
            </Form.Group>

            <Row className="p-4 pb-0 pt-3">
              <span style={stackSpan}>Remote</span>
              <span style={stackSpan}>Full-stack</span>
              <span style={stackSpan}>Senior</span>
              <Col></Col>
            </Row>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label className="fs-5 mb-2 fw-bold">Technology</Form.Label>
              <Form.Control type="text" className="shadowItem" />
            </Form.Group>

            <Row className="p-4 pb-0 pt-3">
              {/* <span style={stackSpan}>.Net</span> */}
              <span style={stackSpan}>Angular</span>
              <span style={stackSpan}>React</span>
              <span style={stackSpan}>TypeScript</span>
              <Col></Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default InternshipFilter;

const stackSpan = {
  marginTop: "5px",
  borderRadius: "16px",
  border: "1px solid #e0e0e0",
  backgroundColor: "#fff",
  paddingTop: "7px",
  paddingBottom: "7px",
  cursor: "pointer",
  // boxShadow: "0px 20px 30px 0px rgb(0 0 0 / 10%)"
  boxShadow:
    "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
};
