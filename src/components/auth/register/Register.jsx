import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { getLoggedUser } from "../../../services/AuthService";

import Header from "../../header/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import Button from "@mui/material/Button";

import imgRegisterCompany from "../../../images/register/company.png";
import imgRegisterStudent from "../../../images/register/student.png";

const Register = () => {
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		if (getLoggedUser()) setRedirect(true);
	}, []);

	return (
		<>
			{redirect && <Navigate to="/" />}
			<Header />
			<Container className="my-4 text-center">
				<Row>
					<Col>
						<Card
							className="my-4 m-auto align-self-center shadowItem transformItem pointer"
							style={{ width: "24rem" }}
						>
							<Link
								to="/registerCompany"
								className="decorationNone black"
							>
								<Card.Body className="my-2">
									<h3>Register as a Company</h3>
									<Button
										variant="outlined"
										color="info"
										size="large"
										className="my-3 shadowItem"
									>
										Company
									</Button>
									<br />
									<img
										src={imgRegisterCompany}
										style={imgStyles}
										alt="Register Company"
										loading="lazy"
									/>
								</Card.Body>
							</Link>
						</Card>
					</Col>
					<Col>
						<Card
							className="my-4 m-auto align-self-center shadowItem transformItem pointer"
							style={{ width: "24rem" }}
						>
							<Link
								to="/registerStudent"
								className="decorationNone black"
							>
								<Card.Body className="my-2">
									<h3>Register as a Student</h3>
									<Button
										variant="outlined"
										color="info"
										size="large"
										className="my-3 shadowItem"
									>
										Student
									</Button>
									<br />
									<img
										src={imgRegisterStudent}
										style={imgStyles}
										alt="Register Student"
										loading="lazy"
									/>
								</Card.Body>
							</Link>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Register;

const imgStyles = {
	marginTop: "20px",
	width: "80px",
	height: "80px",
};