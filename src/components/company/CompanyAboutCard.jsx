import Card from "react-bootstrap/Card";
import Zoom from "@mui/material/Zoom";

const CompanyAboutCard = ({ about, name }) => {
	return (
		<Zoom in={true} style={{ transitionDelay: "0ms" }}>
			<Card className="pt-4 mt-3 shadowItem borderRadius">
				<Card.Title>{name}</Card.Title>
				<hr className="m-3" />
				<Card.Body className="text-start">
					<Card.Text>{about}</Card.Text>
				</Card.Body>
			</Card>
		</Zoom>
	);
};

export default CompanyAboutCard;
