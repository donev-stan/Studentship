import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";

import { returnStackWithIcons } from "../../services/InternshipService";

import "../GlobalStyles.css";

import Zoom from "@mui/material/Zoom";

const InternshipCard = ({ offer, noZoom }) => {
	return (
		<>
			{noZoom ? (
				<>
					{" "}
					<Card
						className="text-center my-3 shadowItem pointer transformItem decorationNone black"
						as={Link}
						to={`/internships/${offer.id}`}
					>
						<Card.Header className="black">
							{offer.officeLocation}
						</Card.Header>
						<Card.Body>
							<Card.Title>{offer.title}</Card.Title>
							<Card.Text className="mt-3 black">
								{offer?.technologies?.map((tech) =>
									returnStackWithIcons(tech)
								)}
							</Card.Text>
						</Card.Body>
						<Card.Footer className="text-muted">
							{/* {returnReadableDate(offer.lastUpdate)} */}
							{offer.lastUpdate.toString()}
						</Card.Footer>
					</Card>
				</>
			) : (
				<>
					{" "}
					<Zoom in={true} style={{ transitionDelay: "0ms" }}>
						<Card
							className="text-center my-3 shadowItem pointer transformItem decorationNone black"
							as={Link}
							to={`/internships/${offer.id}`}
						>
							<Card.Header className="black">
								{offer.officeLocation}
							</Card.Header>
							<Card.Body>
								<Card.Title>{offer.title}</Card.Title>
								<Card.Text className="mt-3 black">
									{offer?.technologies?.map((tech) =>
										returnStackWithIcons(tech)
									)}
								</Card.Text>
							</Card.Body>
							<Card.Footer className="text-muted">
								{/* {returnReadableDate(offer.lastUpdate)} */}
								{offer.lastUpdate.toString()}
							</Card.Footer>
						</Card>
					</Zoom>
				</>
			)}
		</>
	);
};

export default InternshipCard;
