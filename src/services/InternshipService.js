import React from "react";
import axios from "axios";
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
//---------

const url = "https://studentship.herokuapp.com/internships";

export async function getAllOffers() {
  return (await axios.get(`${url}`)).data;
}

export async function getOffersByCompanyID(companyID) {
  const offers = (await axios.get(`${url}`)).data;

  return offers.filter((offer) => offer.companyID === companyID);
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

export async function saveOffer(offerData) {
  if (offerData.id) {
    const updatedOffer = {
      ...offerData,

      technologies: offerData.technologies
        ? offerData.technologies
            .toString()
            .split(",")
            .map((c) => c.replace(/\s/g, ""))
        : [],

      lastUpdate: new Date(),
    };

    console.log(updatedOffer);
    return axios.put(`${url}/${offerData.id}`, updatedOffer);
  }

  const newOffer = {
    ...offerData,

    companyID: getLoggedUser().id,

    salaryRange: {
      salaryMin: offerData.salaryMin,
      salaryMax: offerData.salaryMax,
    },

    options: {
      remoteInterview: offerData.remoteInterview ? true : false,
      permanent: offerData.permanent ? true : false,
      temporary: offerData.temporary ? true : false,
      freelanceProject: offerData.freelanceProject ? true : false,
      fullTime: offerData.fullTime ? true : false,
      partTime: offerData.partTime ? true : false,
      flexibleTime: offerData.flexibleTime ? true : false,
      homeOffice: offerData.homeOffice ? true : false,
    },

    technologies: offerData.technologies
      ? offerData.technologies.split(",").map((c) => c.replace(/\s/g, ""))
      : [],

    published: new Date(),
    lastUpdate: new Date(),
  };

  delete newOffer.remoteInterview;
  delete newOffer.permanent;
  delete newOffer.temporary;
  delete newOffer.freelanceProject;
  delete newOffer.fullTime;
  delete newOffer.partTime;
  delete newOffer.flexibleTime;
  delete newOffer.homeOffice;

  delete newOffer.salaryMin;
  delete newOffer.salaryMax;

  console.log(newOffer);
  return axios.post(`${url}`, newOffer);
}

export async function getOfferByID(offerID) {
  return (await axios.get(`${url}/${offerID}`)).data;
}

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

export function deleteOffer(internshipID) {
  return axios.delete(`${url}/${internshipID}`);
}
