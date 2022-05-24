import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../header/Header";
import { getLoggedUser } from "../../services/AuthService";
import BookmarkStudentCard from "./BookmarkStudentCard";
import BookmarkJobsCard from "./BookmarkJobsCard";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([1,2]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = getLoggedUser();
    setUser(user);
    //setBookmarks(user.bookmarks);
  }, []);

  return (
    <>
      <Header />

      <Container className="my-4">
        <Row>
          <Col>
            {user.type === "company" && (
              <>
                <h2>Saved Students</h2>
                <hr />

                <Row className="text-center">
                  {console.log(bookmarks)}
                  {bookmarks.length !== 0 ? (
                    bookmarks.map((id) => (
                      <BookmarkStudentCard studentID={id} key={id} />
                    ))
                  ) : (
                    <p> No saved students. </p>
                  )}
                </Row>
              </>
            )}

            {user.type === "student" && (
              <>
                <h2>Saved Internships</h2>
                <hr />
                <Row className="text-center">
                  {/* {console.log(bookmarks)} */}
                  {bookmarks.length !== 0 ? (
                    bookmarks.map((id) => (
                      <BookmarkJobsCard internshipID={id} key={id} />
                    ))
                  ) : (
                    <p> No saved job offers. </p>
                  )}
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Bookmarks;
