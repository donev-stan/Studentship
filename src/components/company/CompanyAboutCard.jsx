import Card from "react-bootstrap/Card";

const CompanyAboutCard = ({ about, name }) => {
  return (
    <Card className="pt-4 mt-3 shadowItem borderRadius">
      <Card.Title>{name}</Card.Title>
      <hr className="m-3" />
      <Card.Body className="text-start">
        <Card.Text>{about}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CompanyAboutCard;
