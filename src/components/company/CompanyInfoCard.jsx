import Card from "react-bootstrap/Card";
import Zoom from "@mui/material/Zoom";

import foundedImg from "../../images/Company/founded.png";
import employeesImg from "../../images/Company/employees.png";
import locationImg from "../../images/Company/location.png";

const CompanyInfoCard = ({ info }) => {
  return (
		<Zoom in={true} style={{ transitionDelay: "0ms" }}>
    <Card className="pt-4 mt-3 shadowItem borderRadius">
      <Card.Title>Company Info</Card.Title>
      <hr className="m-3" />
      <Card.Body className="text-start">
        <Card.Text>
          {" "}
          <img src={foundedImg} width="30px" height="30px" alt=""/> &nbsp;{" "}
          <strong> Founded: </strong> {info.founded}{" "}
        </Card.Text>
        <Card.Text>
          {" "}
          <img src={employeesImg} width="30px" height="30px" alt=""/> &nbsp;{" "}
          <strong> Employees: </strong> {info.employees}{" "}
        </Card.Text>
        <Card.Text>
          {" "}
          <img src={locationImg} width="30px" height="30px" alt=""/> &nbsp;{" "}
          <strong> Locations: </strong> {displayLocations(info.locations)}{" "}
        </Card.Text>
      </Card.Body>
    </Card>
    </Zoom>
  );
};

export default CompanyInfoCard;

const displayLocations = (array) => {
  let result = "";
  for (let i = 0; i < array.length; i++) {
    if (i === array.length - 1) {
      result += `${array[i]}.`;
    } else {
      result += `${array[i]}, `;
    }
  }

  return result;
};
