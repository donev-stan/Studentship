import React, { useEffect, useState } from "react";
import { getStudentByID } from "../../services/StudentService";
import StudentCard from "../student/StudentCard";

const BookmarkStudentCard = ({ studentID }) => {
  const [student, setStudent] = useState({});

  useEffect(() => {
    getStudentByID(studentID).then((student) => {
      setStudent(student);
    });
  }, [studentID]);

  return <StudentCard student={student} key={studentID} />;
};

export default BookmarkStudentCard;
