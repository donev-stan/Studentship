import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Header from "../header/Header";
import InternshipCard from "./InternshipCard";
import { getAllOffers } from "../../services/InternshipService";
// import FilterInternships from "../filter/FilterInternships";

const Internships = () => {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    getAllOffers().then((offers) => {
      setInternships(offers);
    });
  }, []);

  return (
    <>
      <Header />
      <Container className="my-4">
        <Row>
          {/* <FilterInternships /> */}
        </Row>
        <Row className="text-center">
          {internships.map((offer) => (
            <InternshipCard offer={offer} key={offer.id} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Internships;
