import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import Header from "../header/Header";
import InternshipCard from "../internship/InternshipCard";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { getLoggedUser } from "../../services/AuthService";
import {
	getInternshipsByCompanyID,
	getOffersByCompanyID,
} from "../../services/InternshipService";
import Loader from "../loader/Loader";

const CompanyJobs = () => {
	const [offers, setOffers] = useState(["load"]);
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		const loggedUser = getLoggedUser();

		if (loggedUser.type === "student") setRedirect(true);

		getInternshipsByCompanyID(loggedUser?.PIC).then((offers) => {
			setOffers(offers);
		});
	}, []);

	return (
		<>
			{redirect && <Navigate to="/" />}
			<Header />
			<Container className="my-4">
				<Row className="text-center">
					<Col>
						<h2>My Internship Offers</h2>
						<hr />
					</Col>
				</Row>
				<Row>
					{offers[0] !== "load" ? (
						offers.map((offer) => (
							<Col lg={6}>
								<InternshipCard offer={offer} key={offer.id} />
							</Col>
						))
					) : (
						<Loader />
					)}
				</Row>
			</Container>
		</>
	);
};

export default CompanyJobs;
