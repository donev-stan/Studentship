import axios from "axios";
import { logout } from "./AuthService";

const url = "http://localhost:3000/students";

export async function getAllStudents() {
  const students = (await axios.get(url)).data;
  return students;
}

export async function getStudentByID(id) {
  const student = (await axios.get(`${url}/${id}`)).data;
  return student;
}

async function checkForErrorsBeforeRegistering(studentData) {
  const students = await getAllStudents();

  if (students.find((stu) => stu.email === studentData.email)) {
    throw new Error(
      "This email address is already registered by another user!"
    );
  } else if (students.find((stu) => stu.telephone === studentData.telephone)) {
    throw new Error("This phone number is already registered by another user!");
  }

  if (studentData.password !== studentData.repeatedPassword)
    throw new Error("Passwords does not match!");

  if (!studentData.age) throw new Error("Please select your age!");

  if (!studentData.yearAtUni)
    throw new Error("Please select year at university!");
}

export async function registerStudent(studentData) {
  checkForErrorsBeforeRegistering(studentData);

  studentData = {
    ...studentData,

    type: "student",

    yearAtUni: parseInt(studentData.yearAtUni),

    skills: studentData.skills
      ? studentData.skills.split(",").map((t) => t.replace(/\s/g, ""))
      : [],

    picture: studentData.picture
      ? studentData.picture
      : `https://robohash.org/set_set5/${studentData.name}${
          studentData.lastName
        }${Math.round(Math.random() * 10)}?size=300x300`,

    bookmarks: [],
  };

  delete studentData.repeatedPassword;

  console.log(studentData);

  return axios.post(`${url}/students`, studentData);
}

export async function saveStudent(student) {
  if (student.id) {
    const students = await getAllStudents();

    if (
      students.find(
        (stu) => stu.email === student.email && stu.id !== student.id
      )
    ) {
      throw new Error(
        "This email address is already registered by another user!"
      );
    } else if (
      students.find(
        (stu) => stu.telephone === student.telephone && stu.id !== student.id
      )
    ) {
      throw new Error(
        "This phone number is already registered by another user!"
      );
    }
    console.log(student);

    student = {
      ...student,

      skills: student.skills
        .toString()
        .split(",")
        .map((t) => t.replace(/\s/g, "")),

      yearAtUni: parseInt(student.yearAtUni),

      image: student.image
        ? student.image
        : `https://robohash.org/set_set5/${student.name}${
            student.lastName
          }${Math.round(Math.random() * 10)}?size=300x300`,
    };

    return axios.put(`${url}/${student.id}`, student);
  }

  return registerStudent(student);
}

export async function deleteStudent(studentID) {
  const students = await getStudentByID(studentID);

  logout();

  return axios.delete(`${url}/${studentID}`);
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
