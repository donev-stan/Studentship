import React, { useEffect, useState } from "react";
import { getLocalStorageData } from "../../services/AuthService";
import { getStudentByID } from "../../services/StudentService";
import Loader from "../loader/Loader";
import StudentCard from "../student/StudentCard";

const BookmarkStudentCard = ({ studentID }) => {
	// student е променлива, която се променя само от useState-hoock
	const [student, setStudent] = useState({});

	useEffect(() => {
		const students = getLocalStorageData("students");

		if (!students) {
			console.log("Got student data from Firebase");
			getStudentByID(studentID).then((student) => {
				setStudent(student);
			});
		} else {
			console.log("Got student data from Local Storage");
			const student = students.find(
				(student) => student.id === studentID
			);
			if (student) setStudent(student);
			else setStudent(null);
		}
	}, [studentID]);

	return (
		<>
			{student ? (
				Object.entries(student).length !== 0 ? (
					<StudentCard student={student} key={studentID} />
				) : (
					<Loader />
				)
			) : null}
		</>
	);
};

export default BookmarkStudentCard;
