import React, { useState, useEffect } from "react";
import {
	getAllCompanies,
	getAllCompaniesF,
} from "../../services/CompanyService";

import Header from "../header/Header";
import CompanyCard from "./CompanyCard";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Loader from "../loader/Loader";

const Companies = () => {
	const [companies, setCompanies] = useState([]);

	useEffect(() => {
		getAllCompaniesF().then((companies) => {
			setCompanies(companies);
		});
	}, []);

	return (
		<>
			<Header />
			<Container className="my-4">
				<Row className="">
					{companies.length !== 0 ? (
						companies.map((company) => (
							<CompanyCard company={company} key={company.id} />
						))
					) : (
						<Loader />
					)}
				</Row>
			</Container>
		</>
	);
};

export default Companies;
