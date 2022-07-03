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
import { deleteInternship, getInternshipsByCompanyID } from "./InternshipService";

const companiesCollectionRef = collection(db, "companies");

export async function getAllCompanies() {
	const companies = (await getDocs(companiesCollectionRef)).docs.map(
		(doc) => ({
			...doc.data(),
			id: doc.id,
		})
	);

	console.log("GET All Companies - getAllCompanies() function");

	// localStorage.setItem("companies", JSON.stringify(companies));

	return companies;
}

export async function getCompanyByID(companyID) {
	const companies = await getAllCompanies();

	console.log("GET All Companies - getCompanyByID() function");

	const company = companies.find((company) => company.id === companyID);

	if (!company) throw new Error("Invalid company ID: " + companyID);

	return await company;
}

export async function getCompanyByPIC(companyPIC) {
	const companies = await getAllCompanies();

	console.log("GET All Companies - getCompanyByPIC() function");

	const company = companies.find((company) => company.PIC === companyPIC);

	if (!company) throw new Error("Invalid company PIC: " + companyPIC);

	return await company;
}

export async function registerCompany(companyData) {
	// const companies = await getAllCompanies();
	let companies = getLocalStorageData("companies");

	if (!companies) companies = await getAllCompanies();

	const {
		PIC,
		name,
		address,
		telephone,
		employees,
		locations,
		founded,
		about,
		career,
		benefits,
		technologies,
		email,
		password,
		repeatedPassword,
	} = companyData;

	// Check for errors
	if (PIC === "") throw new Error("Please enter a PIC!");
	if (name === "") throw new Error("Please enter a name!");
	if (address === "") throw new Error("Please enter an address!");
	if (telephone === "") throw new Error("Please enter a telephone number!");
	if (employees === "") throw new Error("Please enter employees count!");
	if (locations.length === 0)
		throw new Error("Please enter office locations!");
	if (founded === "") throw new Error("Please enter year of foundation!");
	if (about === "")
		throw new Error("Please enter company about information!");
	if (career === "")
		throw new Error("Please enter compant career information!");
	if (benefits.length === 0)
		throw new Error("Please enter company benefits!");
	if (technologies.length === 0)
		throw new Error("Please enter company technologies!");
	if (email === "") throw new Error("Please enter email!");
	if (password === "") throw new Error("Please enter password!");
	if (password !== repeatedPassword)
		throw new Error("Passwords does not match!");

	if (companies.find((company) => company.email === email)) {
		throw new Error(
			"This email address is already registered by another user!"
		);
	} else if (companies.find((company) => company.telephone === telephone)) {
		throw new Error(
			"This phone number is already registered by another user!"
		);
	} else if (companies.find((company) => company.PIC === PIC)) {
		throw new Error(
			"This company (PIC) is already registered by another user!"
		);
	}

	companyData = {
		...companyData,

		type: "company",

		employees: parseInt(companyData.employees),

		PIC: parseInt(companyData.PIC),

		founded: parseInt(companyData.founded),

		bookmarks: [],
	};

	delete companyData.repeatedPassword;

	console.log("ADD All Company - registerCompany() function");

	return await addDoc(companiesCollectionRef, companyData);
}

export async function saveCompany(companyData) {
	// const companies = await getAllCompanies();
	const companies = getLocalStorageData("companies");

	console.log(companyData)

	const {
		id,
		PIC,
		name,
		address,
		telephone,
		employees,
		locations,
		founded,
		about,
		career,
		benefits,
		technologies,
		email,
		password,
		repeatedPassword,
	} = companyData;

	// Check for errors
	if (PIC === "") throw new Error("Please enter a PIC!");
	if (name === "") throw new Error("Please enter a name!");
	if (address === "") throw new Error("Please enter an address!");
	if (telephone === "") throw new Error("Please enter a telephone number!");
	if (employees === "") throw new Error("Please enter employees count!");
	if (locations.length === 0)
		throw new Error("Please enter office locations!");
	if (founded === "") throw new Error("Please enter year of foundation!");
	if (about === "")
		throw new Error("Please enter company about information!");
	if (career === "")
		throw new Error("Please enter company career information!");
	if (benefits.length === 0)
		throw new Error("Please enter company benefits!");
	if (technologies.length === 0)
		throw new Error("Please enter company technologies!");
	if (email === "") throw new Error("Please enter email!");
	if (password === "") throw new Error("Please enter password!");
	if (password !== repeatedPassword)
		throw new Error("Passwords does not match!");

	if (
		companies.find(
			(company) => company.email === email && company.id !== id
		)
	) {
		throw new Error(
			"This email address is already registered by another company!"
		);
	} else if (
		companies.find(
			(company) => company.telephone === telephone && company.id !== id
		)
	) {
		throw new Error(
			"This phone number is already registered by another company!"
		);
	}

	// Save Company
	companyData = {
		...companyData,

		employees: parseInt(companyData.employees),

		PIC: parseInt(companyData.PIC),

		founded: parseInt(companyData.founded),
	};

	delete companyData.repeatedPassword;

	const companyDoc = doc(db, "companies", companyData.id);

	console.log("UPDATE Company - saveCompany() function");

	return await updateDoc(companyDoc, companyData);
}

export async function deleteCompany(company) {
	const companyDoc = doc(db, "companies", company.id);

	const deleteRequests = [];
	const internships = await getInternshipsByCompanyID(company.PIC);

	internships.forEach(offer => deleteRequests.push(deleteInternship(offer.id)));

	await Promise.all(deleteRequests);

	return await deleteDoc(companyDoc);
}

export async function bookmarkStudent(studentID, companyData) {
	// if you find such student id then remove it else add it
	if (companyData.bookmarks.find((id) => id === studentID)) {
		companyData = {
			...companyData,

			bookmarks: companyData.bookmarks.splice(
				companyData.bookmarks.indexOf(studentID),
				0
			),
		};
	} else {
		companyData = {
			...companyData,

			bookmarks: [...companyData.bookmarks, studentID],
		};
	}

	const companyDoc = doc(db, "companies", companyData.id);

	console.log("UPDATE Company - bookmarkStudent() function");

	return await updateDoc(companyDoc, companyData);
}
