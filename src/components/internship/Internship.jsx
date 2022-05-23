import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";

import Header from "../header/Header";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

import {
  deleteOffer,
  getOfferByID,
  returnReadableDate,
  returnStackWithIcons,
} from "../../services/InternshipService";

import { MdWork } from "react-icons/md";
import { ImHome } from "react-icons/im";
import { GiTemporaryShield } from "react-icons/gi";
import { SiFreelancer } from "react-icons/si";
import { AiOutlineFieldTime } from "react-icons/ai";
import { MdTimer } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { VscRemoteExplorer } from "react-icons/vsc";
import { getLoggedUser } from "../../services/AuthService";
import InternshipApplyCard from "./InternshipApplyCard";

import locationImg from "../../images/Internship/location.png";
import updateImg from "../../images/Internship/update.png";
import salaryImg from "../../images/Internship/salary.png";
import { getCompanyByPIC } from "../../services/CompanyService";
import InternshipCompanyCard from "./InternshipCompanyCard";

const Internship = () => {
  const { id } = useParams();

  const [offer, setOffer] = useState({});
  const [company, setCompany] = useState(null);
  const [offerOptions, setOfferOptions] = useState({});
  const [isOwner, setIsOwner] = useState(false);
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    getOfferByID(id)
      .then((offer) => {
        //Check if owner
        if (getLoggedUser()) {
          if (getLoggedUser().id === offer.companyID) setIsOwner(true);
        }

        // Set Offer Data
        setOffer(offer);
        // Set Offer Options Data
        setOfferOptions(offer.options);

        //Set Company Data
        getCompanyByPIC(offer.companyID).then((companyData) => {
          setCompany(companyData);
        });
      })
      .catch((error) => setError(error.message));
  }, [id]);

  const deleteInternship = () => {
    deleteOffer(offer.id);
    setRedirect(true);
  };

  return (
    <>
      {redirect && <Navigate to={"/company/jobs"} />}

      <Header />

      <Modal
        className="text-center"
        show={showModal}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Internship</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3 className="text-warning"> Warning! </h3>
          <p style={{ fontSize: "larger" }}>
            You are about to delete your offer! <br /> This action is
            irreversible!
          </p>
          <hr />
          {offer.title}
          <hr />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteInternship}>
            Delete Internship
          </Button>
        </Modal.Footer>
      </Modal>

      <Container className="my-4">
        {error && (
          <Alert key={3} variant={"danger"} className="text-center">
            {error}
          </Alert>
        )}
        <Row>
          <Col lg={8}>
            <h2>{offer.title}</h2>
            <hr />

            <Row>
              <Col>
                <p>{offer.description}</p>
              </Col>
            </Row>

            <Row className="mt-2 mb-4">
              <Col>
                {offerOptions.permanent && (
                  <span style={stackspan} className="shadowItem">
                    {" "}
                    <MdWork /> Permanent Job{" "}
                  </span>
                )}
                {offerOptions.temporary && (
                  <span style={stackspan} className="shadowItem">
                    {" "}
                    <GiTemporaryShield /> Temporary Job{" "}
                  </span>
                )}
                {offerOptions.freelanceProject && (
                  <span style={stackspan} className="shadowItem">
                    {" "}
                    <SiFreelancer /> Freelance Project{" "}
                  </span>
                )}
                {offerOptions.fullTime && (
                  <span style={stackspan} className="shadowItem">
                    {" "}
                    <BiTimeFive /> Full Time{" "}
                  </span>
                )}
                {offerOptions.partTime && (
                  <span style={stackspan} className="shadowItem">
                    {" "}
                    <AiOutlineFieldTime /> Part Time{" "}
                  </span>
                )}
                {offerOptions.flexibleTime && (
                  <span style={stackspan} className="shadowItem">
                    {" "}
                    <MdTimer /> Flexible Time{" "}
                  </span>
                )}
                {offerOptions.homeOffice && (
                  <span style={stackspan} className="shadowItem">
                    {" "}
                    <ImHome /> Home Office{" "}
                  </span>
                )}
                {offerOptions.remoteInterview && (
                  <span style={stackspan} className="shadowItem">
                    {" "}
                    <VscRemoteExplorer /> Remote Interview{" "}
                  </span>
                )}
              </Col>
            </Row>

            <Row>
              <Col>
                <p>
                  <img
                    src={locationImg}
                    alt="location"
                    width="30px"
                    height="30px"
                  />{" "}
                  &nbsp; Office Location:{" "}
                  <strong> {offer.officeLocation} </strong>
                </p>
                <p>
                  <img
                    src={salaryImg}
                    alt="salary"
                    width="30px"
                    height="30px"
                  />{" "}
                  &nbsp; Salary from <strong> {offer.salaryMin} </strong> to{" "}
                  <strong> {offer.salaryMax} </strong> (gross)
                </p>
              </Col>
            </Row>

            <Row className="mt-2 mb-4">
              <Col>
                <h5 className="mb-3">Technologies:</h5>
                {offer?.technologies?.map((tech) => returnStackWithIcons(tech))}
              </Col>
            </Row>

            <Row>
              <Col>
                <p>
                  {" "}
                  <img
                    src={updateImg}
                    alt="update"
                    width="20px"
                    height="20px"
                  />{" "}
                  &nbsp; Last Update: {returnReadableDate(offer.lastUpdate)}
                </p>
              </Col>
            </Row>
          </Col>

          <Col lg={4}>
            {company && <InternshipCompanyCard companyData={company} />}

            <InternshipApplyCard />

            <Row className="text-center">
              {isOwner && (
                <>
                  <Col>
                    <Button
                      variant="warning"
                      as={Link}
                      to={`edit`}
                      className="shadowItem"
                    >
                      Edit Job Offer
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="danger"
                      className="shadowItem"
                      onClick={handleShow}
                    >
                      Delete Job Offer
                    </Button>
                  </Col>
                </>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Internship;

const stackspan = {
  marginTop: "5px",
  marginLeft: "5px",
  borderRadius: "16px",
  border: "1px solid #e0e0e0",
  backgroundColor: "#fff",
  padding: "9px",
};
