import { getAllCompanies } from "./CompanyService";
import { getAllStudents } from "./StudentService";

export async function login(userData) {
	const companies = await getAllCompanies();
	const students = await getAllStudents();

	console.log("GET All Companies - login function");
	console.log("GET All Students - login function");

	setLocalStorageData("companies", companies);
	setLocalStorageData("students", students);

	const loggedUserAsCompany = companies.find(
		(c) =>
			c.email === userData.email &&
			c.password === userData.password.toString()
	);

	const loggetUserAsStudent = students.find(
		(s) =>
			s.email === userData.email &&
			s.password === userData.password.toString()
	);

	if (loggedUserAsCompany)
		return setLocalStorageData("loggedUser", loggedUserAsCompany);
	else if (loggetUserAsStudent)
		return setLocalStorageData("loggedUser", loggetUserAsStudent);

	throw new Error("Invalid email or password");
}

export function logout() {
	return localStorage.removeItem("loggedUser");
}

export function getLoggedUser() {
	const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

	if (!loggedUser) {
		return undefined;
	}

	return loggedUser;
}

export function getLocalStorageData(nameData) {
	const data = JSON.parse(localStorage.getItem(nameData));

	if (!data) {
		return undefined;
	}

	return data;
}

export function setLocalStorageData(nameData, data) {
	return localStorage.setItem(nameData, JSON.stringify(data));
}
