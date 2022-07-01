import React from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/esm/Col";
import Grow from "@mui/material/Grow";

import companyImg from "../../images/Company/company.png";

const CompanyCard = ({ company, delay }) => {
	const { id, name, picture } = company;

	return (
		<Col className="mt-4 text-center d-flex justify-content-center" lg={4}>
			<Grow
				in={true}
				style={{ transformOrigin: "0 100 0" }}
				{...{ timeout: (500 + delay) } }
			>
				<Card
					style={{ width: "18rem" }}
					className="shadowItem transformItem black decorationNone "
					as={Link}
					to={`/companies/${id}`}
				>
					<Card.Img
						variant="top"
						src={picture === "default" ? companyImg : picture}
						loading="lazy"
					/>{" "}
					<Card.Body className="d-flex align-items-center justify-content-center">
						<Card.Title> {name} </Card.Title>
					</Card.Body>
				</Card>
			</Grow>
		</Col>
	);
};

export default CompanyCard;
