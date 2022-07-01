import Zoom from "@mui/material/Zoom";
import Card from "react-bootstrap/Card";
import checkedImg from "../../images/Company/checkbox.png";

const CompanyBenefitsCard = ({ benefits }) => {
	return (
		<Zoom in={true} style={{ transitionDelay: "0ms" }}>
			<Card className="pt-4 mt-3 shadowItem">
				<Card.Title>Benefits</Card.Title>
				<hr className="m-3" />
				<Card.Body className="text-start">
					{benefits.map((benefit) => (
						<Card.Text>
							{" "}
							<img
								src={checkedImg}
								width="30px"
								height="30px"
								alt=""
							/>{" "}
							{benefit}
						</Card.Text>
					))}
				</Card.Body>
			</Card>
		</Zoom>
	);
};

export default CompanyBenefitsCard;
