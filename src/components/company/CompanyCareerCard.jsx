import Card from "react-bootstrap/Card";

const CompanyCareerCard = ({career}) => {
  return (
    <Card className="pt-4 mt-3 shadowItem" style={{ borderRadius: "5%" }}>
      <Card.Title>Career at the company</Card.Title>
      <hr className="m-3" />
      <Card.Body className="text-start">
        <Card.Text>{career}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CompanyCareerCard;
