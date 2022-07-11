import React, { useState, useEffect } from "react";

import Header from "../../header/Header";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { Link, Navigate } from "react-router-dom";
import { getLoggedUser, login } from "../../../services/AuthService";

import imgLeftRegister from "../../../images/login/register_0.png";
import imgRightRegister from "../../../images/login/register_1.png";

const Login = () => {
	const [userData, setUserData] = useState({});
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (getLoggedUser()) setRedirect(true);
	}, []);

	const onInputChange = (event) => {
		event.persist();

		setError(false);

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

			<Container className="my-3">
				{error && (
					<Alert key={3} variant={"danger"} className="text-center">
						{error}
					</Alert>
				)}
			</Container>

			<Container className="my-4">
				<Form
					onSubmit={onFormSubmit}
					style={{ width: "60%" }}
					className="my-4 m-auto align-self-center"
				>
					<TextField
						name="email"
						type="email"
						label="Email"
						className="mt-4 mb-4"
						value={userData.email}
						onChange={onInputChange}
						fullWidth
						component={Paper}
					/>

					<TextField
						name="password"
						type="password"
						label="Password"
						className="mt-2 mb-4"
						value={userData.password}
						onChange={onInputChange}
						fullWidth
						component={Paper}
					/>

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
						<Container className="justify-content-center my-2">
							<Row>
								<Col>
									<Image
										src={imgLeftRegister}
										style={imgStyles}
										loading="lazy"
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
										loading="lazy"
									/>
								</Col>
							</Row>
						</Container>
					</Form.Group>
				</Form>
			</Container>

			<Container style={{ marginTop: "50px" }}>
				<Row>
					<Col lg={6}>
						<TableContainer component={Paper} elevation={20}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell align="center">
											Student Email
										</TableCell>
										<TableCell align="center">
											Password
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell align="center">
											anita@gmail.com
										</TableCell>
										<TableCell align="center">
											{" "}
											anita
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align="center">
											kuitov@gmail.com
										</TableCell>
										<TableCell align="center">
											{" "}
											kuitov
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align="center">
											dimitar@gmail.com
										</TableCell>
										<TableCell align="center">
											{" "}
											dimitar
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Col>
					<Col lg={6}>
						<TableContainer component={Paper} elevation={20}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell align="center">
											Company Email
										</TableCell>
										<TableCell align="center">
											Password
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell align="center">
											SENSATA@gmail.com
										</TableCell>
										<TableCell align="center">
											{" "}
											SENSATA
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align="center">
											Kognayt@gmail.com
										</TableCell>
										<TableCell align="center">
											{" "}
											Kognayt
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align="center">
											TTEC@gmail.com
										</TableCell>
										<TableCell align="center">
											{" "}
											TTEC
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Login;

const imgStyles = {
	width: "80px",
	height: "80px",
};

// Най - горе се импортват библиотеки, и функции от други файлове
// След това следва компонента, който представлява arrow функция, в нея се съдържа логиката и поведението на компонента и връща в(return) html i javascript
