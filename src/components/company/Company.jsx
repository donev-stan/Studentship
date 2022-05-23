import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getCompanyByPIC } from "../../services/CompanyService";
import { getOffersByCompanyID } from "../../services/InternshipService";

import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import Header from "../header/Header";
import CompanyInfoCard from "./CompanyInfoCard";
import CompanyAboutCard from "./CompanyAboutCard";
import CompanyCareerCard from "./CompanyCareerCard";
import CompanyContactCard from "./CompanyContactCard";
import CompanyBenefitsCard from "./CompanyBenefitsCard";
import CompanyStackCard from "./CompanyStackCard";

import InternshipCard from "../internship/InternshipCard";
import CompanySubscribeCard from "./CompanySubscribeCard";

const Company = (props) => {
  const [company, setCompany] = useState({});
  const [offers, setoffers] = useState([]);
  const [error, setError] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getCompanyByPIC(id).then((company) => {
        setCompany(company);
        setError(false);
      });
    } else {
      setCompany(props?.company);
      setError(false);
    }

    getOffersByCompanyID(company.id).then((offers) => {
      setoffers(offers);
    });
  }, [props.company, id, company.id]);

  return (
    <>
      <Header />
      <Container className="my-4 text-center">
        <Row>
          <Col>
            <img
              src={company?.image}
              alt="Company Logo"
              style={{ maxWidth: "100%" }}
            />
            <h3 className="my-3"> {!error && company.name} </h3>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            {/* About */}
            {!error && (
              <CompanyAboutCard name={company.name} about={company.about} />
            )}

            {/* Career */}
            {!error & (company.career !== "") ? (
              <CompanyCareerCard career={company.career} />
            ) : (
              ""
            )}

            {/* Contacts */}
            {!error && (
              <CompanyContactCard
                name={company.name}
                contacts={company.contacts}
              />
            )}

            {/* Subscribe */}
            {!error && <CompanySubscribeCard />}
          </Col>

          <Col lg={6}>
            {/* Info */}
            {!error && <CompanyInfoCard info={company.info} />}

            {/* Stack */}
            {!error && company.technologies.length !== 0 && (
              <CompanyStackCard stack={company.technologies} />
            )}

            {/* Benefits */}
            {!error && <CompanyBenefitsCard benefits={company.benefits} />}
          </Col>
        </Row>

        <Row className="my-4">
          {!error && offers && <h4>Internships Offered:</h4>}
          {!error &&
            offers &&
            offers.map((offer) => (
              <InternshipCard offer={offer} key={offer.id} />
            ))}
        </Row>
      </Container>
    </>
  );
};

export default Company;