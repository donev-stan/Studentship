import React from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/auth/guard/RequireAuth";

import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import RegisterCompany from "./components/auth/register/RegisterCompany";
import RegisterStudent from "./components/auth/register/RegisterStudent";
import Company from "./components/company/Company";
import Home from "./components/home/Home";
import Layout from "./components/layout/Layout";
import Profile from "./components/profile/Profile";
import Student from "./components/student/Student";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        {/* <Route path="internships" element={<Internships />} /> */}
        {/* <Route path="internships/:id" element={<Internship />} /> */}

        {/* <Route path="companies" element={<Companies />} /> */}
        <Route path="companies/:id" element={<Company />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="registerStudent" element={<RegisterStudent />} />
        <Route path="registerCompany" element={<RegisterCompany />} />

        {/* Protected Routes*/}
        <Route path="*" element={<RequireAuth />}>
          <Route path="profile" element={<Profile />} />
          {/* <Route path="bookmarks" element={<Bookmarks />} /> */}

          {/* <Route path="companies/edit/:id" element={<CompanyEdit />} /> */}
          {/* <Route path="company/jobs" element={<CompanyJobs />} /> */}

          {/* <Route path="internships/create" element={<InternshipCreate />} /> */}
          {/* <Route path="internships/edit/:id" element={<InternshipEdit />} /> */}
          {/* <Route path="internships/:id/edit" element={<InternshipEdit />} /> */}
          {/* <Route path="company/jobs/:id" element={<Internship />} /> */}
          {/* <Route path="profile/:id" element={<Internship />} /> */}

          {/* <Route path="students" element={<Students />} /> */}
          <Route path="students/:id" element={<Student />} />
          {/* <Route path="students/edit/:id" element={<StudentEdit />} /> */}
        </Route>

        {/* Catch All */}
        {/* <Route path="*" element={<Missing />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
