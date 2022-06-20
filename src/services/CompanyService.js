import { db } from "../firebase-config";
import {
	addDoc,
	collection,
	getDocs,
	updateDoc,
	doc,
	deleteDoc,
} from "firebase/firestore";

const companiesCollectionRef = collection(db, "companies");

export async function getAllCompaniesF() {
	const companies = (await getDocs(companiesCollectionRef)).docs.map(
		(doc) => ({
			...doc.data(),
			id: doc.id,
		})
	);

	return companies;
}
export async function getCompanyByIDF(companyID) {
	const companies = await getAllCompaniesF();

	const company = companies.find((company) => company.id === companyID);

	if (!company) throw new Error("Invalid company ID: " + companyID);

	return await company;
}

export async function getCompanyByPICF(companyPIC) {
	const companies = await getAllCompaniesF();

	const company = companies.find((company) => company.PIC === companyPIC);

	if (!company) throw new Error("Invalid company PIC: " + companyPIC);

	return await company;
}

async function checkForErrorsBeforeRegistering(companyData) {
	const companies = await getAllCompaniesF();

	if (companies.find((company) => company.email === companyData.email)) {
		throw new Error(
			"This email address is already registered by another user!"
		);
	} else if (
		companies.find((company) => company.telephone === companyData.telephone)
	) {
		throw new Error(
			"This phone number is already registered by another user!"
		);
	} else if (companies.find((company) => company.PIC === companyData.PIC)) {
		throw new Error(
			"This company (PIC) is already registered by another user!"
		);
	}

	// if (companyData.password !== companyData.repeatedPassword) throw new Error("Passwords does not match!");
}

export async function registerCompanyF(companyData) {
	checkForErrorsBeforeRegistering(companyData);

	companyData = {
		...companyData,

		type: "company",

		picture: companyData.picture ? companyData.picture : "default",

		locations:
			companyData.locations !== ""
				? companyData.locations.split(",")
				: [],

		websiteURL: companyData.websiteURL ? companyData.websiteURL : "",

		technologies:
			companyData.technologies !== ""
				? companyData.technologies
						.split(",")
						.map((c) => c.replace(/\s/g, ""))
				: [],

		benefits:
			companyData.benefits !== ""
				? companyData.benefits.split(",")
				: // .map((c) => c.replace(/\s/g, ""))
				  [],

		employees: parseInt(companyData.employees),

		PIC: parseInt(companyData.PIC),

		founded: parseInt(companyData.founded),

		bookmarks: [],
	};

	delete companyData.repeatedPassword;

	return await addDoc(companiesCollectionRef, companyData);
}

export async function saveCompanyF(companyData) {
	const companies = await getAllCompaniesF();

	if (
		companies.find(
			(company) =>
				company.email === companyData.email &&
				company.id !== companyData.id
		)
	) {
		throw new Error(
			"This email address is already registered by another company!"
		);
	} else if (
		companies.find(
			(company) =>
				company.telephone === companyData.telephone &&
				company.id !== companyData.id
		)
	) {
		throw new Error(
			"This phone number is already registered by another company!"
		);
	}

	companyData = {
		...companyData,

		picture: companyData.picture ? companyData.picture : "default",

		locations:
			companyData.locations !== ""
				? companyData.locations.toString().split(",")
				: [],

		websiteURL: companyData.websiteURL ? companyData.websiteURL : "",

		technologies:
			companyData.technologies !== ""
				? companyData.technologies
						.toString()
						.split(",")
						.map((c) => c.replace(/\s/g, ""))
				: [],

		benefits:
			companyData.benefits !== ""
				? companyData.benefits.toString().split(",")
				: // .map((c) => c.replace(/\s/g, ""))
				  [],

		employees: parseInt(companyData.employees),

		PIC: parseInt(companyData.PIC),

		founded: parseInt(companyData.founded),
	};

	const companyDoc = doc(db, "companies", companyData.id);

	return await updateDoc(companyDoc, companyData);
}

export async function deleteCompanyF(companyID) {
	const companyDoc = doc(db, "companies", companyID);

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

	return await updateDoc(companyDoc, companyData);
}
