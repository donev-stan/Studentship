import { getAllCompaniesF } from "./CompanyService";
import { getAllStudentsF } from "./StudentService";

export async function login(userData) {
	const companies = await getAllCompaniesF();
	const students = await getAllStudentsF();

	const loggedUserAsCompany = companies.find(
	  (c) =>
	    c.email === userData.email && c.password === userData.password.toString()
	);

	const loggetUserAsStudent = students.find(
		(s) =>
			s.email === userData.email &&
			s.password === userData.password.toString()
	);

	if (loggedUserAsCompany) {
	  localStorage.setItem("loggedUser", JSON.stringify(loggedUserAsCompany));
	  return;
	} else if (loggetUserAsStudent) {
	  localStorage.setItem("loggedUser", JSON.stringify(loggetUserAsStudent));
	  return;
	}

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