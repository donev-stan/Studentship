import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Typography from "@mui/material/Typography";

import Header from "../header/Header";
import InternshipCard from "./InternshipCard";
import { getAllInternships } from "../../services/InternshipService";
import InternshipFilter from "../filter/InternshipFilter";
import Loader from "../loader/Loader";
import { getLocalStorageData } from "../../services/AuthService";

const Internships = () => {
	const [internships, setInternships] = useState([]);
	const [noFound, setNoFound] = useState(false);

	const [options, setOptions] = useState([]);
	const [stack, setStack] = useState([]);
	const [cities, setCities] = useState([]);

	useEffect(() => {
		let offers = getLocalStorageData("internships");

		if (options.length !== 0) {
			// Filter offers
		}

		if (cities.length !== 0) {
			offers = offers.filter((offer) =>
				cities.includes(offer.officeLocation)
			);
		}

		if (stack.length !== 0) {
			offers = offers.filter((offer) => {
				return offer.technologies.some((loc) => stack.includes(loc));
			});
		}

		console.log(offers)
		offers?.length === 0 ? setNoFound(true) : setNoFound(false);

		if (!offers) {
			console.log("Got Internships from Firebase");
			getAllInternships().then((offers) => {
				setInternships(offers);
			});
		} else {
			console.log("Got Internships from Local Storage");
			setInternships(offers);
		}
	}, [options, stack, cities]);

	return (
		<>
			<Header />
			<InternshipFilter
				setOptions={setOptions}
				setStack={setStack}
				setCities={setCities}
			/>
			<Container className="my-4">
				<Row className="text-center">
					{!noFound ? (
						internships.length !== 0 ? (
							internships.map((offer, index) => (
								<Col lg={6}>
									<InternshipCard key={index} offer={offer} />
								</Col>
							))
						) : (
							<Loader />
						)
					) : (
						<Typography variant="h5">
							{" "}
							No Internships Matched Your Search Criteria!{" "}
						</Typography>
					)}
				</Row>
			</Container>
		</>
	);
};

export default Internships;
