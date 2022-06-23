import React, { useState, useEffect } from "react";

import Header from "../../header/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Button from "@mui/material/Button";

import { Link, Navigate } from "react-router-dom";
import { getLoggedUser, login } from "../../../services/AuthService";

import imgLeftRegister from "../../../images/login/register_0.png";
import imgRightRegister from "../../../images/login/register_1.png";

const Login = () => {
	const [userData, setUserData] = useState(null);
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (getLoggedUser()) setRedirect(true);
	}, []);

	const onInputChange = (event) => {
		event.persist();

		setUserData((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value.trim(),
		}));
	};

	const onFormSubmit = (event) => {
		event.preventDefault();

		login(userData)
			.then((_) => {
				setRedirect(true);
			})
			.catch((error) => setError(error.message));
	};

	return (
		<>
			{redirect && <Navigate to={`/`} />}

			<Header />
			<Container className="my-4">
				{error && (
					<Alert key={3} variant={"danger"} className="text-center">
						{error}
					</Alert>
				)}

				<Form
					onSubmit={onFormSubmit}
					style={{ width: "50rem" }}
					className="my-4 m-auto align-self-center"
				>
					{/* Email */}
					<Form.Group className="mb-3">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							name="email"
							autoComplete="on"
							onChange={onInputChange}
						/>
					</Form.Group>

					{/* Password */}
					<Form.Group className="mb-3">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							name="password"
							autoComplete="on"
							onChange={onInputChange}
						/>
					</Form.Group>

					{/* Submit */}
					<Row className="text-center">
						<Col>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								size="large"
								className="my-3 shadowItem"
							>
								Login
							</Button>
						</Col>
					</Row>

					<Form.Group className="my-4 text-center">
						<Form.Label>Don't have an account yet?</Form.Label>{" "}
						<br />
						<Container
							className="justify-content-center my-2"
							style={{ width: "80%" }}
						>
							<Row>
								<Col>
									<Image
										src={imgLeftRegister}
										style={imgStyles}
									/>
								</Col>

								<Col>
									<Link
										to="/register"
										className="decorationNone"
									>
										<Button
											variant="contained"
											color="secondary"
											size="large"
											className="my-2 shadowItem"
										>
											Register
										</Button>
									</Link>
								</Col>

								<Col>
									<Image
										src={imgRightRegister}
										rounded
										style={imgStyles}
									/>
								</Col>
							</Row>
						</Container>
					</Form.Group>
				</Form>
			</Container>
		</>
	);
};

export default Login;

const imgStyles = {
	width: "80px",
	height: "80px",
};
