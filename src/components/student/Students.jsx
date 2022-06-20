import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import StudentCard from "./StudentCard";
import { getAllStudentsF } from "../../services/StudentService";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getAllStudentsF().then((students) => {
      setStudents(students);
    });
  }, []);

  return (
    <>
      <Header />
      <Container className="my-2">
        <Row className="text-center">
          {students.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Students;
