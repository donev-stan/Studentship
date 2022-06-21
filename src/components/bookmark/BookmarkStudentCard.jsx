import React, { useEffect, useState } from "react";
import { getStudentByIDF } from "../../services/StudentService";
import Loader from "../loader/Loader";
import StudentCard from "../student/StudentCard";

const BookmarkStudentCard = ({ studentID }) => {
	const [student, setStudent] = useState({});

	useEffect(() => {
		getStudentByIDF(studentID).then((student) => {
			setStudent(student);
		});
	}, [studentID]);

	return (
		<>
			{Object.entries(student).length !== 0 ? (
				<StudentCard student={student} key={studentID} />
			) : (
				<Loader />
			)}
		</>
	);
};

export default BookmarkStudentCard;
