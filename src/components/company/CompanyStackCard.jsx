import Card from "react-bootstrap/Card";
import { returnStackWithIcons } from "../../services/InternshipService";

const CompanyStackCard = ({ stack }) => {
  return (
    <Card className="pt-4 pb-2 mt-3 shadowItem" style={{ borderRadius: "5%" }}>
      <Card.Title>Technologies</Card.Title>
      <hr className="m-3" />
      <Card.Body className="text-start">
        {stack.map((technology) => returnStackWithIcons(technology))}
      </Card.Body>
    </Card>
  );
};

export default CompanyStackCard;