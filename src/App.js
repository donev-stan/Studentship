import React from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/auth/guard/RequireAuth";

import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import RegisterCompany from "./components/auth/register/RegisterCompany";
import RegisterStudent from "./components/auth/register/RegisterStudent";
import Bookmarks from "./components/bookmark/Bookmarks";
import Companies from "./components/company/Companies";
import Company from "./components/company/Company";
import CompanyEdit from "./components/company/CompanyEdit";
import CompanyJobs from "./components/company/CompanyJobs";
import Home from "./components/home/Home";
import Internship from "./components/internship/Internship";
import InternshipCreate from "./components/internship/InternshipCreate";
import InternshipEdit from "./components/internship/InternshipEdit";
import Internships from "./components/internship/Internships";
import Layout from "./components/layout/Layout";
import Profile from "./components/profile/Profile";
import Student from "./components/student/Student";
import StudentEdit from "./components/student/StudentEdit";
import Students from "./components/student/Students";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route path="internships" element={<Internships />} />
        <Route path="internships/:id" element={<Internship />} />

        <Route path="companies" element={<Companies />} />
        <Route path="companies/:id" element={<Company />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="registerStudent" element={<RegisterStudent />} />
        <Route path="registerCompany" element={<RegisterCompany />} />

        {/* Protected Routes*/}
        <Route path="*" element={<RequireAuth />}>
          <Route path="profile/:id" element={<Profile />} />
          <Route path="bookmarks" element={<Bookmarks />} />

          <Route path="companies/edit/:id" element={<CompanyEdit />} />
          <Route path="company/jobs" element={<CompanyJobs />} />

          <Route path="internships/create" element={<InternshipCreate />} />
          <Route path="internships/edit/:id" element={<InternshipEdit />} />
          <Route path="internships/:id/edit" element={<InternshipEdit />} />
          <Route path="company/jobs/:id" element={<Internship />} />
          {/* <Route path="profile/:id" element={<Internship />} /> */}

          <Route path="students" element={<Students />} />
          <Route path="students/:id" element={<Student />} />
          <Route path="students/edit/:id" element={<StudentEdit />} />
        </Route>

        {/* Catch All */}
        {/* <Route path="*" element={<Missing />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
