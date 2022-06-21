import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Header from "../header/Header";
import InternshipCard from "./InternshipCard";
import {
	getAllInternships,
	getAllOffers,
} from "../../services/InternshipService";
import InternshipFilter from "../filter/InternshipFilter";
import Loader from "../loader/Loader";
// import FilterInternships from "../filter/FilterInternships";

const Internships = () => {
	const [internships, setInternships] = useState([]);

	const [cities, setCities] = useState([]);
	const [keywords, setKeywords] = useState([]);
	const [stack, setStack] = useState([]);

	useEffect(() => {
		getAllInternships().then((offers) => {
			setInternships(offers);
		});
	}, [cities, keywords, stack, internships]);

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
						internships.map((offer) => (
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

export default Internships;
