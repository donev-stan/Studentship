import Zoom from "@mui/material/Zoom";
import Card from "react-bootstrap/Card";
import { returnStackWithIcons } from "../../services/InternshipService";

const CompanyStackCard = ({ stack }) => {
	return (
		<Zoom in={true} style={{ transitionDelay: "0ms" }}>
			<Card className="pt-4 pb-2 mt-3 shadowItem borderRadius">
				<Card.Title>Technologies</Card.Title>
				<hr className="m-3" />
				<Card.Body className="text-start">
					{stack.map((technology) =>
						returnStackWithIcons(technology)
					)}
				</Card.Body>
			</Card>
		</Zoom>
	);
};

export default CompanyStackCard;
