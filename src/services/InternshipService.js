import { getLoggedUser } from "./AuthService";

// Import Icons
import { SiCsharp } from "react-icons/si";
import { RiFileExcel2Line } from "react-icons/ri";
import {
	SiJavascript,
	SiReact,
	SiAngular,
	SiVuetify,
	SiDotnet,
	SiJquery,
	SiNodedotjs,
	SiTypescript,
	SiMicrosoftazure,
	SiJava,
	SiCplusplus,
	SiPython,
	SiPostgresql,
	SiRabbitmq,
	SiPhp,
	SiFlutter,
	SiWindows,
	SiAmazonaws,
} from "react-icons/si";
import { TiHtml5 } from "react-icons/ti";
import { FcLinux } from "react-icons/fc";
import { AiOutlineConsoleSql } from "react-icons/ai";
//----------------------------------------------------------------

import { db } from "../firebase-config";
import {
	addDoc,
	collection,
	getDocs,
	updateDoc,
	doc,
	deleteDoc,
} from "firebase/firestore";

const internshipsCollectionRef = collection(db, "internships");

export async function getAllInternships() {
	const internships = (await getDocs(internshipsCollectionRef)).docs.map(
		(doc) => ({
			...doc.data(),
			id: doc.id,
		})
	);

	return internships;
}

export async function getInternshipByID(internshipID) {
	const all_internships = await getAllInternships();

	const internship = all_internships.find(
		(offer) => offer.id === internshipID
	);

	if (!internship) throw new Error("Internship offer not found");

	return internship;
}

export async function getInternshipsByCompanyID(companyPIC) {
	const all_internships = await getAllInternships();

	const company_internships = all_internships.filter(
		(offer) => offer.companyID === companyPIC
	);

	if (!company_internships) throw new Error("No company internships found");

	return company_internships;
}

export async function updateInternship(internshipData) {
	const updatedOffer = {
		...internshipData,

		technologies: internshipData.technologies
			? internshipData.technologies
					.toString()
					.split(",")
					.map((c) => c.replace(/\s/g, ""))
			: [],

		lastUpdate: new Date(),
	};

	const internshipDoc = doc(db, "internships", internshipData.id);

	return await updateDoc(internshipDoc, internshipData);
}

export async function createInternship(internshipData) {
	const newOffer = {
		...internshipData,

		companyID: getLoggedUser().PIC,

		salaryMin: parseInt(internshipData.salaryMin),
		salaryMax: parseInt(internshipData.salaryMax),

		options: {
			remoteInterview: internshipData.remoteInterview ? true : false,
			permanent: internshipData.permanent ? true : false,
			temporary: internshipData.temporary ? true : false,
			freelanceProject: internshipData.freelanceProject ? true : false,
			fullTime: internshipData.fullTime ? true : false,
			partTime: internshipData.partTime ? true : false,
			flexibleTime: internshipData.flexibleTime ? true : false,
			homeOffice: internshipData.homeOffice ? true : false,
		},

		technologies: internshipData.technologies
			? internshipData.technologies
					.toString()
					.split(",")
					.map((c) => c.replace(/\s/g, ""))
			: [],

		published: new Date().toDateString(),
		lastUpdate: new Date().toDateString(),
	};

	delete newOffer.remoteInterview;
	delete newOffer.permanent;
	delete newOffer.temporary;
	delete newOffer.freelanceProject;
	delete newOffer.fullTime;
	delete newOffer.partTime;
	delete newOffer.flexibleTime;
	delete newOffer.homeOffice;

	return await addDoc(internshipsCollectionRef, newOffer);
}

export async function deleteInternship(internshipID) {
	const internshipDoc = doc(db, "internships", internshipID);

	return await deleteDoc(internshipDoc);
}

//----------------------------------------------------------------

const stackspan = {
	marginTop: "5px",
	marginLeft: "5px",
	borderRadius: "16px",
	border: "1px solid #e0e0e0",
	backgroundColor: "#fff",
	padding: "10px",
};

export function returnStackWithIcons(technology) {
	switch (technology) {
		case "AWS":
			return (
				<span lg={3} style={stackspan} className="shadowItem">
					{" "}
					<SiAmazonaws /> AWS{" "}
				</span>
			);

		case "Windows":
			return (
				<span lg={3} style={stackspan} className="shadowItem">
					{" "}
					<SiWindows /> Windows{" "}
				</span>
			);

		case "Flutter":
			return (
				<span lg={3} style={stackspan} className="shadowItem">
					{" "}
					<SiFlutter /> Flutter{" "}
				</span>
			);

		case "PHP":
			return (
				<span lg={3} style={stackspan} className="shadowItem">
					{" "}
					<SiPhp /> PHP{" "}
				</span>
			);
		case "JavaScript":
			return (
				<span lg={3} style={stackspan} className="shadowItem">
					{" "}
					<SiJavascript /> JavaScript{" "}
				</span>
			);

		case ".NET":
			return (
				<span lg={3} style={stackspan} className="shadowItem">
					{" "}
					<SiDotnet /> .NET{" "}
				</span>
			);

		case "React":
			return (
				<span lg={3} style={stackspan} className="shadowItem">
					{" "}
					<SiReact /> React{" "}
				</span>
			);

		case "Angular":
			return (
				<span lg={3} style={stackspan} className="shadowItem">
					{" "}
					<SiAngular /> Angular{" "}
				</span>
			);

		case "HTML/CSS":
			return (
				<span lg={3} style={stackspan} className="shadowItem">
					{" "}
					<TiHtml5 /> HTML/CSS{" "}
				</span>
			);

		case "jQuery":
			return (
				<span lg={3} style={stackspan} className="shadowItem">
					{" "}
					<SiJquery /> jQuery{" "}
				</span>
			);

		case "Vue.js":
			return (
				<span lg={3} style={stackspan} className="shadowItem">
					{" "}
					<SiVuetify /> Vue.js{" "}
				</span>
			);

		case "Node.js":
			return (
				<span style={stackspan} className="shadowItem">
					{" "}
					<SiNodedotjs /> Node.js{" "}
				</span>
			);

		case "TypeScript":
			return (
				<span lg={3} style={stackspan} className="shadowItem">
					{" "}
					<SiTypescript /> TypeScript{" "}
				</span>
			);

		case "SQL":
			return (
				<span lg={3} style={stackspan} className="shadowItem">
					{" "}
					<AiOutlineConsoleSql /> SQL{" "}
				</span>
			);

		case "C#":
			return (
				<span lg={3} style={stackspan} className="shadowItem">
					{" "}
					<SiCsharp /> C#{" "}
				</span>
			);

		case "Java":
			return (
				<span lg={3} style={stackspan} className="shadowItem">
					{" "}
					<SiJava /> Java{" "}
				</span>
			);

		case "Excel":
			return (
				<span lg={3} style={stackspan} className="shadowItem">
					{" "}
					<RiFileExcel2Line /> Excel{" "}
				</span>
			);

		case "Python":
			return (
				<span lg={3} style={stackspan} className="shadowItem">
					{" "}
					<SiPython /> Python{" "}
				</span>
			);

		case "C++":
			return (
				<span lg={3} style={stackspan} className="shadowItem">
					{" "}
					<SiCplusplus /> C++{" "}
				</span>
			);

		case "Linux":
			return (
				<span lg={3} style={stackspan} className="shadowItem">
					{" "}
					<FcLinux /> Linux{" "}
				</span>
			);

		case "C":
			return (
				<span lg={3} style={stackspan} className="shadowItem">
					C{" "}
				</span>
			);

		case "Azure":
			return (
				<span lg={3} style={stackspan} className="shadowItem">
					{" "}
					<SiMicrosoftazure /> Azure{" "}
				</span>
			);

		case "PostgreSQL":
			return (
				<span lg={3} style={stackspan} className="shadowItem">
					{" "}
					<SiPostgresql /> PostgreSQL{" "}
				</span>
			);

		case "RabbitMQ":
			return (
				<span lg={3} style={stackspan} className="shadowItem">
					{" "}
					<SiRabbitmq /> RabbitMQ{" "}
				</span>
			);

		default:
			return (
				<span lg={3} style={stackspan} className="shadowItem">
					{" "}
					{technology}{" "}
				</span>
			);
	}
}

export function returnReadableDate(unreadableDate) {
	if (!unreadableDate) return;

	let [date, time] = unreadableDate.split("T");
	time = time.split(".")[0];
	let [year, month, day] = date.split("-");

	switch (month) {
		case "01":
			month = "January";
			break;
		case "02":
			month = "February";
			break;
		case "03":
			month = "March";
			break;
		case "04":
			month = "April";
			break;
		case "05":
			month = "May";
			break;
		case "06":
			month = "June";
			break;
		case "07":
			month = "July";
			break;
		case "08":
			month = "August";
			break;
		case "09":
			month = "September";
			break;
		case "10":
			month = "October";
			break;
		case "11":
			month = "November";
			break;
		case "12":
			month = "December";
			break;
		default:
			break;
	}

	//return `${time} ${day} ${month} ${year}`;
	return `${day} ${month} ${year}`;
}
