import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import Header from "../header/Header";
import InternshipCard from "../internship/InternshipCard";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { getLocalStorageData, getLoggedUser } from "../../services/AuthService";
import { getInternshipsByCompanyID } from "../../services/InternshipService";
import Loader from "../loader/Loader";
import { Typography } from "@mui/material";

const CompanyJobs = () => {
	const [offers, setOffers] = useState(["load"]);
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		const loggedUser = getLoggedUser();
		if (loggedUser.type !== "company") setRedirect(true);

		const internships = getLocalStorageData("internships");
		const companyInternships = internships?.find(
			(offer) => offer.companyId === loggedUser.PIC
		);

		if (!companyInternships) {
			getInternshipsByCompanyID(loggedUser?.PIC).then((offers) => {
				setOffers(offers);
			});
		} else {
			setOffers(companyInternships);
		}
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
					{console.log(offers)}
					{offers.length !== 0 ? (
						offers[0] !== "load" ? (
							offers.map((offer) => (
								<Col lg={6}>
									<InternshipCard
										offer={offer}
										key={offer.id}
										zoom={false}
									/>
								</Col>
							))
						) : (
							<Loader />
						)
					) : (
						<Typography variant="h5" className="text-center"> No Internships offered </Typography>
					)}
				</Row>
			</Container>
		</>
	);
};

export default CompanyJobs;
