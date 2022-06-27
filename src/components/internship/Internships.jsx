import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Header from "../header/Header";
import InternshipCard from "./InternshipCard";
import { getAllInternships } from "../../services/InternshipService";
import InternshipFilter from "../filter/InternshipFilter";
import Loader from "../loader/Loader";
import { getLocalStorageData } from "../../services/AuthService";

const Internships = () => {
	const [internships, setInternships] = useState([]);

	const [cities, setCities] = useState([]);
	const [keywords, setKeywords] = useState([]);
	const [stack, setStack] = useState([]);

	useEffect(() => {
		const offers = getLocalStorageData("internships");

		if (!offers) {
			console.log("Got Internships from Firebase");
			getAllInternships().then((offers) => {
				setInternships(offers);
			});
		} else {
			console.log("Got Internships from Local Storage");
			setInternships(offers);
		}
	}, []);

	return (
		<>
			<Header />
			<InternshipFilter
				setCities={setCities}
				setKeywords={setKeywords}
				setStack={setStack}
			/>
			<Container className="my-4">
				<Row className="text-center">
					{internships.length !== 0 ? (
						internships.map((offer, index) => (
							<Col lg={6}>
								<InternshipCard key={index} offer={offer} />
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

export default Internships;
