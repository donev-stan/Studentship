import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";

import foundedImg from "../../images/Company/founded.png";
import employeesImg from "../../images/Company/employees.png";


const InternshipCompanyCard = ({ companyData }) => {
  return (
    <Card
      className="shadowItem pointer transformItem decorationNone black"
      as={Link}
      to={`/companies/${companyData.id}`}
    >
      <img src={companyData.picture} alt="Company Logo" />
      <Card.Body>
        <Card.Title>{companyData.name}</Card.Title>
        <hr />
        <Card.Text>{companyData.about.split(".")[0] + `...`}</Card.Text>
        <Card.Text> <img src={foundedImg} alt="" width="30px" height="30px" /> &nbsp; Founded: {companyData.founded}</Card.Text>
        <Card.Text> <img src={employeesImg} alt="" width="30px" height="30px" /> &nbsp; Employees: {companyData.employees}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default InternshipCompanyCard;
