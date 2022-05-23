import React, { useEffect, useState } from "react";
import { getLoggedUser } from "../../services/AuthService";

import Row from "react-bootstrap/Row"

import Company from "../company/Company";
import Student from "../student/Student";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = getLoggedUser();
    setUser(loggedUser);
  }, []);

  return (
    <Row>
      {user && user?.type === "student" && <Student student={user} />}
      {user && user?.type === "company" && <Company company={user} />}
    </Row>
  );
};

export default Profile;