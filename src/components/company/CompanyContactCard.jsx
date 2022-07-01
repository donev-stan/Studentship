import Card from "react-bootstrap/Card";
import Zoom from "@mui/material/Zoom";

const CompanyContactCard = ({ contacts, name }) => {
	return (
		<Zoom in={true} style={{ transitionDelay: "0ms" }}>
			<Card className="pt-4 mt-3 shadowItem borderRadius">
				<Card.Title>Contacts</Card.Title>
				<hr className="m-3" />
				<Card.Body className="text-start">
					<Card.Text>
						{" "}
						<strong> {name} </strong>
					</Card.Text>
					<Card.Text>
						<strong> PIC: </strong> {contacts.PIC}{" "}
					</Card.Text>
					<Card.Text>
						<strong> Address: </strong>
						{contacts.address}
					</Card.Text>
					<Card.Text>
						<strong> Telephone: </strong>
						{contacts.telephone}
					</Card.Text>
					{contacts.websiteURL !== "" && (
						<Card.Text>
							<strong> Website: </strong>{" "}
							<a
								href={contacts.websiteURL}
								target="_blank"
								rel="noreferrer"
							>
								{" "}
								{contacts.websiteURL}{" "}
							</a>
						</Card.Text>
					)}
				</Card.Body>
			</Card>
		</Zoom>
	);
};

export default CompanyContactCard;
