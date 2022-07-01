import Card from "react-bootstrap/Card";
import Zoom from "@mui/material/Zoom";

const CompanyCareerCard = ({ career }) => {
	return (
		<Zoom in={true} style={{ transitionDelay: "0ms" }}>
			<Card className="pt-4 mt-3 shadowItem borderRadius">
				<Card.Title>Career at the company</Card.Title>
				<hr className="m-3" />
				<Card.Body className="text-start">
					<Card.Text>{career}</Card.Text>
				</Card.Body>
			</Card>
		</Zoom>
	);
};

export default CompanyCareerCard;
