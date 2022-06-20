import React, { useEffect, useState } from "react";
import { getStudentByIDF } from "../../services/StudentService";
import StudentCard from "../student/StudentCard";

const BookmarkStudentCard = ({ studentID }) => {
	const [student, setStudent] = useState({});

	useEffect(() => {
		getStudentByIDF(studentID).then((student) => {
			setStudent(student);
		});
	}, [studentID]);

	return <StudentCard student={student} key={studentID} />;
};

export default BookmarkStudentCard;
