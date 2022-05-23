import React from "react";
import Header from "../header/Header";

import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

import homeImg from "../../images/Home/homeImg.jpg";

const Home = () => {
  return (
    <>
      <Header />
      <Container>
        <Row>
          <img className="d-block w-100" src={homeImg} alt="Welcome" />
          <hr/>
        </Row>
      </Container>
    </>
  );
};

export default Home;
