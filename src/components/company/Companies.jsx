import React, { useState, useEffect } from "react";
import { getAllCompanies, getAllCompaniesF } from "../../services/CompanyService";

import Header from "../header/Header";
import CompanyCard from "./CompanyCard";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getAllCompaniesF().then((companies) => {
      setCompanies(companies);
    });
  }, []);

  return (
    <>
    <Header />
    <Container className="my-4">
      <Row className="">
        {companies.map((company) => (
          <CompanyCard company={company} key={company.id} />
        ))}
      </Row>
    </Container>
    </>

  );
};

export default Companies;

