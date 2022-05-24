import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Alert from "react-bootstrap/esm/Alert";
import Form from "react-bootstrap/esm/Form";

import Header from "../header/Header";
import { getLoggedUser } from "../../services/AuthService";
import { getStudentByID, yearWithWords } from "../../services/StudentService";

// import profileImg from "../../images/user.png";
import bookmark from "../../images/Student/bookmark.png";
import resume from "../../images/Student/resume.png";

import { BsTelephone, BsBookmarks, BsFillBookmarksFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { FaUniversity } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { returnStackWithIcons } from "../../services/InternshipService";
import { bookmarkStudent } from "../../services/CompanyService";

const Student = (props) => {
  const [student, setStudent] = useState({});
  const [error, setError] = useState(true);

  const [isCompanyViewer, setIsCompanyViewer] = useState(false);
  const [company, setCompany] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);

  const { id } = useParams();

  const {
    picture,
    name,
    lastName,
    bio,
    email,
    age,
    town,
    university,
    yearAtUni,
    specialty,
    telephone,
    skills,
  } = student;

  useEffect(() => {
    if (id) {
      getStudentByID(id).then((student) => {
        setStudent(student);
        setError(false);
      });
    } else {
      setStudent(props?.student);
      setError(false);
    }
  }, [props.student, id]);

  useEffect(() => {
    const user = getLoggedUser();
    if (user.type === "company") {
      setCompany(user);
      setIsCompanyViewer(true);

      /*
      if (user.bookmarks.filter((element) => element === parseInt(id))) {
        setBookmarked(true);
      }
      */
    }
  }, []);

  function onFormSubmit(e) {
    e.preventDefault();

    /*
    bookmarkStudent(id, company)
      .then((_) => setBookmarked(true))
      .catch((error) => setError(error.message));
      */
    setBookmarked(!bookmarked);
  }

  return (
    <>
      <Header />
      <Container className="my-4">
        {error && (
          <Alert key={3} variant={"danger"} className="text-center">
            {error}
          </Alert>
        )}
        <Row>
          <Col lg={3} className="my-4 text-center">
            <Row>
              {/* <img src={profileImg} /> */}
              <img src={picture} alt="Profile" />
              <hr className="mt-1"></hr>
            </Row>

            <Row>
              <h4>
                {" "}
                <FaUniversity /> University:
              </h4>
              <p>
                {university}, {yearWithWords(yearAtUni)}
              </p>

              <p>{specialty}</p>

              <h4>
                {" "}
                <GrMapLocation /> Town:
              </h4>
              <p>{town}</p>

              <h4>Age:</h4>
              <p>{age}</p>
            </Row>
          </Col>

          <Col lg={9} className="my-4 p-4 pt-0 pb-0">
            <Row className="my-4">
              <h2>
                {name} {lastName}
                {bookmarked ? <BsFillBookmarksFill /> : <BsBookmarks />}
              </h2>

              <hr />

              <Row>
                <Col>
                  {bio && (
                    <>
                      <h4>Bio:</h4>
                      <p>{bio}</p>
                    </>
                  )}
                </Col>
              </Row>

              <Row>
                <Col>
                  {skills && (
                    <>
                      <h4 className="mb-3"> Skills: </h4>
                      {skills.map((skill) => returnStackWithIcons(skill))}
                    </>
                  )}
                </Col>
              </Row>

              <Row className="my-4">
                <h4>Contacts</h4>
                <Col className="text-center">
                  <h5>
                    {" "}
                    <BsTelephone /> Telephone :
                  </h5>
                  <p>{telephone}</p>
                </Col>

                <Col className="text-center">
                  <h5>
                    {" "}
                    <AiOutlineMail /> E-mail:
                  </h5>
                  <p>{email}</p>
                </Col>
              </Row>
              {isCompanyViewer && (
                <>
                  <Row className="text-center mt-4">
                    <Col>
                      <img src={resume} alt="Download CV" style={imgStyles} />
                      <br />
                      <Button className="shadowItem mt-4">Download CV</Button>
                    </Col>
                    <Col>
                      <img
                        src={bookmark}
                        alt="Bookmark Student"
                        style={imgStyles}
                      />
                      <br />

                      <Form onSubmit={onFormSubmit}>
                        <Button className="shadowItem mt-4" type="submit">
                          Bookmark Student
                        </Button>
                      </Form>
                    </Col>
                  </Row>
                </>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Student;

const imgStyles = {
  width: "60px",
  height: "60px",
};
