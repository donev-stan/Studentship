import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import StudentCard from "./StudentCard";
import { getAllStudents } from "../../services/StudentService";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { getLocalStorageData } from "../../services/AuthService";

const Students = () => {
	const [students, setStudents] = useState([]);

	useEffect(() => {
		const studentsStorage = getLocalStorageData("students");

		if (!studentsStorage) {
      console.log("Got Students from Firebase");
			getAllStudents().then((students) => {
				setStudents(students);
			});
		} else {
      console.log("Got Students from Local Storage");
      setStudents(studentsStorage);
    }
	}, []);

	return (
		<>
			<Header />
			<Container className="my-2">
				<Row className="text-center">
					{students.map((student, index) => (
						<StudentCard key={student.id} student={student} delay={index * 100} />
					))}
				</Row>
			</Container>
		</>
	);
};

export default Students;
