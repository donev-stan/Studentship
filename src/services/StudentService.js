import { db } from "../firebase-config";
import {
	addDoc,
	collection,
	getDocs,
	updateDoc,
	doc,
	deleteDoc,
} from "firebase/firestore";
import { getLocalStorageData } from "./AuthService";
import { getAllCompanies, saveCompany } from "./CompanyService";

const studentsCollectionRef = collection(db, "students");

export async function getAllStudents() {
	const students = (await getDocs(studentsCollectionRef)).docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));

	// setLocalStorageData("students", students);

	console.log("GET All Students - getAllStudents() function");

	return students;
}

export async function getStudentByID(id) {
	const students = await getAllStudents();

	console.log("GET All Students - getStudentByID() function");

	const student = students.find((student) => student.id === id);

	if (!student) throw new Error("Invalid student ID: " + id);

	return student;
}

export async function registerStudent(studentData) {
	let students = getLocalStorageData("students");

	if (!students) students = await getAllStudents();

	const {
		name,
		lastName,
		telephone,
		age,
		town,
		bio,
		university,
		specialty,
		yearAtUni,
		email,
		password,
		repeatedPassword,
	} = studentData;

	// Check for errors
	if (name === "") throw new Error("Please enter a name!");
	if (lastName === "") throw new Error("Please enter a last name!");
	if (telephone === "") throw new Error("Please enter a telephone!");
	if (age === "") throw new Error("Please enter an age!");
	if (town === "") throw new Error("Please enter a town!");
	if (bio === "") throw new Error("Please enter a bio!");
	if (university === "") throw new Error("Please enter a university!");
	if (specialty === "") throw new Error("Please enter a specialty!");
	if (yearAtUni === "") throw new Error("Please enter a year at university!");
	if (email === "") throw new Error("Please enter a email!");
	if (password === "") throw new Error("Please enter a password!");
	if (password !== repeatedPassword)
		throw new Error("Passwords does not match!");

	if (students.find((stu) => stu.email === email)) {
		throw new Error(
			"This email address is already registered by another user!"
		);
	} else if (students.find((stu) => stu.telephone === telephone)) {
		throw new Error(
			"This phone number is already registered by another user!"
		);
	}

	console.log(studentData);

	// Register Student
	studentData = {
		...studentData,

		type: "student",

		picture: studentData.picture === "" ? "default" : studentData.picture,

		age: parseInt(age),

		bookmarks: [],
	};

	delete studentData.repeatedPassword;

	console.log("ADD Student - registerStudent() function");

	return await addDoc(studentsCollectionRef, studentData);
}

export async function saveStudent(studentData) {
	const students = getLocalStorageData("students");

	const {
		id,
		name,
		lastName,
		telephone,
		age,
		town,
		bio,
		university,
		specialty,
		yearAtUni,
		email,
		password,
		repeatedPassword,
	} = studentData;

	// Check for errors
	if (name === "") throw new Error("Please enter a name!");
	if (lastName === "") throw new Error("Please enter a last name!");
	if (telephone === "") throw new Error("Please enter a telephone!");
	if (age === "") throw new Error("Please enter an age!");
	if (town === "") throw new Error("Please enter a town!");
	if (bio === "") throw new Error("Please enter a bio!");
	if (university === "") throw new Error("Please enter a university!");
	if (specialty === "") throw new Error("Please enter a specialty!");
	if (yearAtUni === "") throw new Error("Please enter a year at university!");
	if (email === "") throw new Error("Please enter a email!");
	if (password === "") throw new Error("Please enter a password!");
	if (password !== repeatedPassword)
		throw new Error("Passwords does not match!");

	if (students.find((stu) => stu.email === email && stu.id !== id)) {
		throw new Error(
			"This email address is already registered by another user!"
		);
	} else if (
		students.find((stu) => stu.telephone === telephone && stu.id !== id)
	) {
		throw new Error(
			"This phone number is already registered by another user!"
		);
	}

	studentData = {
		...studentData,

		picture: studentData.picture === "" ? "default" : studentData.picture,

		age: parseInt(age),
	};

	const studentDoc = doc(db, "students", studentData.id);

	console.log("UPDATE Student - saveStudent() function");

	return await updateDoc(studentDoc, studentData);
}

export async function deleteStudent(studentID) {
	const studentDoc = doc(db, "students", studentID);

	let companies = getLocalStorageData("companies");
	if (!companies) companies = await getAllCompanies();

	const updateCompaniesRequests = [];
	const changedCompanies = [];

	companies.map((company, index) => {
		if (company.bookmarks.find((id) => id === studentID)) {
			company.bookmarks.splice(index, 1);
			changedCompanies.push(company);
		}
	});

	changedCompanies.forEach((company) =>
		updateCompaniesRequests.push(saveCompany(company))
	);

	await Promise.all(updateCompaniesRequests);

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

	console.log("UPDATE Student - bookmarkInternship() function");

	return await updateDoc(studentDoc, studentData);
}
