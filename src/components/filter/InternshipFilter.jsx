import React, { useState, useRef } from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CheckboxesTags from "./CheckboxWorkOptions";
import KeywordSearch from "./KeywordSearch";
import TownSearch from "./TownSearch";


const InternshipFilter = ({ setCities, setKeywords, setStack }) => {
	return (
		<Container style={containerStyles} className="mt-3 p-4 text-center">
				<Row>
					<Col lg={4}>
						<CheckboxesTags />
					</Col>
					<Col lg={4}>
						<KeywordSearch />
					</Col>
					<Col lg={4}>
						<TownSearch />
					</Col>
				</Row>
		</Container>
	);
};

export default InternshipFilter;

const containerStyles = {
	backgroundColor: "#00000008",
	boxShadow:
		"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
	borderRadius: "5px",
};
