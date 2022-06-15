import axios from "axios";
import { logout } from "./AuthService";

const url = "https://studentship.herokuapp.com/companies";

export async function getAllCompanies() {
  const companies = (await axios.get(url)).data;
  return companies;
}

export async function getCompanyByPIC(pic) {
  const company = (await axios.get(`${url}/${pic}`)).data;
  return company;
}

export async function registerCompany(companyData) {
  const companies = await getAllCompanies();

  if (companies.find((company) => company.email === companyData.email)) {
    throw new Error(
      "This email address is already registered by another company!"
    );
  } else if (companies.find((company) => company.id === companyData.PIC)) {
    throw new Error(
      "This PIC number is already registered by another company!"
    );
  }

  companyData = {
    ...companyData,

    type: "company",

    id: companyData.PIC,

    image:
      companyData.image !== ""
        ? companyData.image
        : `https://picsum.photos/200/300?random=${companyData.id}`,

    info: {
      founded: companyData.founded,
      employees: companyData.employees,
      locations:
        companyData.locations !== "" ? companyData.locations.split(",") : [],
    },

    contacts: {
      PIC: companyData.PIC,
      address: companyData.address,
      telephone: companyData.telephone,
      websiteURL: companyData.websiteURL ? companyData.websiteURL : "",
    },

    technologies:
      companyData.technologies !== ""
        ? companyData.technologies.split(",").map((c) => c.replace(/\s/g, ""))
        : [],

    benefits:
      companyData.benefits !== ""
        ? companyData.benefits.split(",").map((c) => c.replace(/\s/g, ""))
        : [],

    bookmarks: [],
  };

  delete companyData.founded;
  delete companyData.employees;
  delete companyData.locations;

  delete companyData.PIC;
  delete companyData.address;
  delete companyData.telephone;
  delete companyData.websiteURL;

  return axios.post(`${url}/companies`, companyData);
}

export async function saveCompany(companyData) {
  if (companyData.id) {
    const companies = await getAllCompanies();

    if (
      companies.find(
        (company) =>
          company.email === companyData.email && company.id !== companyData.id
      )
    ) {
      throw new Error(
        "This email address is already registered by another company!"
      );
    } else if (
      companies.find(
        (company) =>
          company.contacts.telephone === companyData.telephone &&
          company.id !== companyData.id
      )
    ) {
      throw new Error(
        "This phone number is already registered by another company!"
      );
    }

    companyData = {
      ...companyData,

      image:
        companyData.image !== ""
          ? companyData.image
          : `https://picsum.photos/200/300?random=${companyData.id}`,

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
          : [],
    };

    return axios.put(`${url}/${companyData.id}`, companyData);
  }

  return registerCompany(companyData);
}

export async function deleteCompany(companyID) {
  //const companies = await getCompanyByPIC(companyID);

  /*
  const deleteRequests = [];
  companies.forEach(company => {
    deleteRequests.push(deleteJobs(company.id));
  });

  await Promise.all(deleteRequests);
  */

  logout();

  return axios.delete(`${url}/${companyID}`);
}

export function bookmarkStudent(studentID, company) {
  const id = parseInt(studentID);

  // console.log(company);
  // console.log(id);

  let updatedCompany = {
    ...company,

    bookmarks: company.bookmarks.push(id),
  };

  // console.log(updatedCompany);

  return axios.put(`${url}/${company.id}`, updatedCompany);
}
