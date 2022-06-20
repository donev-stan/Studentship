import { db } from "../firebase-config";
import {
	addDoc,
	collection,
	getDocs,
	updateDoc,
	doc,
	deleteDoc,
} from "firebase/firestore";

const studentsCollectionRef = collection(db, "students");

export async function getAllStudentsF() {
	const students = (await getDocs(studentsCollectionRef)).docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));

	return students;
}

export async function getStudentByIDF(id) {
	const students = await getAllStudentsF();

	const student = students.find((student) => student.id === id);

	if (!student) throw new Error("Invalid student ID: " + id);

	return student;
}

async function checkForErrorsBeforeRegistering(studentData) {
	const students = await getAllStudentsF();

	if (students.find((stu) => stu.email === studentData.email)) {
		throw new Error(
			"This email address is already registered by another user!"
		);
	} else if (
		students.find((stu) => stu.telephone === studentData.telephone)
	) {
		throw new Error(
			"This phone number is already registered by another user!"
		);
	}

	if (studentData.password !== studentData.repeatedPassword)
		throw new Error("Passwords does not match!");

	if (!studentData.age) throw new Error("Please select your age!");

	if (!studentData.yearAtUni)
		throw new Error("Please select year at university!");
}

export async function registerStudentF(studentData) {
	checkForErrorsBeforeRegistering(studentData);

	studentData = {
		...studentData,

		type: "student",

		yearAtUni: parseInt(studentData.yearAtUni),

		skills: studentData.skills
			? studentData.skills.split(",").map((t) => t.replace(/\s/g, ""))
			: [],

		picture: studentData.picture ? studentData.picture : "default",

		bookmarks: [],
	};

	delete studentData.repeatedPassword;

	return await addDoc(studentsCollectionRef, studentData);
}

export async function saveStudentF(studentData) {
	const students = await getAllStudentsF();

	if (
		students.find(
			(stu) =>
				stu.email === studentData.email && stu.id !== studentData.id
		)
	) {
		throw new Error(
			"This email address is already registered by another user!"
		);
	} else if (
		students.find(
			(stu) =>
				stu.telephone === studentData.telephone &&
				stu.id !== studentData.id
		)
	) {
		throw new Error(
			"This phone number is already registered by another user!"
		);
	}

	studentData = {
		...studentData,

		skills: studentData.skills
			.toString()
			.split(",")
			.map((t) => t.replace(/\s/g, "")),

		yearAtUni: parseInt(studentData.yearAtUni),

		picture: studentData.picture ? studentData.picture : "default",
	};

	const studentDoc = doc(db, "students", studentData.id);

	return await updateDoc(studentDoc, studentData);
}

export async function deleteStudentF(studentID) {
	const studentDoc = doc(db, "students", studentID);

	return await deleteDoc(studentDoc);
}

export const yearWithWords = (year) => {
	switch (year) {
		case 1:
			return "First Year";

		case 2:
			return "Second Year";

		case 3:
			return "Third Year";

		case 4:
			return "Fourth Year";

		case 5:
			return "Fifth Year";

		default:
			return "";
	}
};

export async function bookmarkInternship(internshipID, studentData) {

	// if you find such student id then remove it else add it
	if (studentData.bookmarks.find((id) => id === internshipID)) {
		studentData = {
			...studentData,

			bookmarks: studentData.bookmarks.splice(
				studentData.bookmarks.indexOf(internshipID),
				0
			),
		};
	} else {
		studentData = {
			...studentData,

			bookmarks: [...studentData.bookmarks, internshipID],
		};
	}

	const studentDoc = doc(db, "students", studentData.id);

	return await updateDoc(studentDoc, studentData);
}
