import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Header from "../../header/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";

import { getLoggedUser, login } from "../../../services/AuthService";
import { registerStudent } from "../../../services/StudentService";

const steps = [
	"Personal Information",
	"Academic Information",
	"Login Credentials",
];

const defaultStudentData = {
	picture: "default",
	name: "",
	lastName: "",
	telephone: "",
	age: "",
	town: "",
	bio: "",
	university: "",
	specialty: "",
	yearAtUni: "",
	skills: [],
	email: "",
	password: "",
	repeatedPassword: "",
};

const RegisterStudent = () => {
	const [studentData, setStudentData] = useState(defaultStudentData);

	const [university, setUniversity] = useState("");
	const [stack, setStack] = useState([]);

	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState(false);

	const [activeStep, setActiveStep] = useState(0);

	const navigate = useNavigate();

	const handleNext = () => {
		activeStep === 2
			? onFormSubmit()
			: setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		activeStep === 0
			? navigate(-1)
			: setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	useEffect(() => {
		if (getLoggedUser()) setRedirect(true);
	}, []);

	useEffect(() => {
		setStudentData((prevState) => ({
			...prevState,
			university: university,
			skills: stack,
		}));
	}, [university, stack]);

	const onInputChange = (event) => {
		// event.persist();

		setError(false);

		setStudentData((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	};

	const onFormSubmit = (event) => {
		// event.preventDefault();

		setError(false);

		setStudentData((prevState) => ({
			...prevState,
			university: university,
			skills: stack,
		}));

		registerStudent(studentData)
			.then((_) => {
				login(studentData)
					.then((_) => {
						setRedirect(true);
					})
					.catch((error) => setError(error.message));
			})
			.catch((error) => setError(error.message));
	};

	return (
		<>
			{redirect && <Navigate to="/" />}

			<Header />

			<Container className="mt-3">
				{error && (
					<Alert key={3} variant={"danger"} className="text-center">
						{error}
					</Alert>
				)}
			</Container>

			<Container className="my-4 pt-4">
				<Stepper
					activeStep={activeStep}
					sx={{ orientation: { xs: "vertical", xl: "horizontal" } }}
				>
					{steps.map((label, index) => {
						const stepProps = {};
						const labelProps = {};

						return (
							<Step key={label} {...stepProps}>
								<StepLabel {...labelProps}>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>

				<Form
					onSubmit={onFormSubmit}
					style={{ width: "80%" }}
					className="m-auto mt-4"
				>
					<Container className="pt-3">
						{activeStep === 0 && (
							<>
								<TextField
									label="Image"
									name="picture"
									value={studentData.picture}
									onChange={onInputChange}
									variant="outlined"
									className="mt-2 mb-4"
									fullWidth
								/>

								<Row>
									<Col lg={6}>
										<TextField
											label="First Name"
											name="name"
											value={studentData.name}
											onChange={onInputChange}
											variant="outlined"
											className="mt-2 mb-4"
											required
											fullWidth
										/>
									</Col>
									<Col lg={6}>
										<TextField
											label="Last Name"
											name="lastName"
											value={studentData.lastName}
											onChange={onInputChange}
											variant="outlined"
											className="mt-2 mb-4"
											required
											fullWidth
										/>
									</Col>
								</Row>

								<TextField
									type="number"
									label="Telephone Number"
									name="telephone"
									value={studentData.telephone}
									onChange={onInputChange}
									variant="outlined"
									className="mt-2 mb-4"
									required
									fullWidth
								/>

								<Row>
									<Col lg={6}>
										<TextField
											type="number"
											label="Age"
											name="age"
											value={studentData.age}
											onChange={onInputChange}
											variant="outlined"
											className="mt-2 mb-4"
											required
											fullWidth
										/>
									</Col>
									<Col lg={6}>
										<FormControl fullWidth>
											<InputLabel
												id="town-select-label"
												className="mt-2 mb-4"
											>
												Town *
											</InputLabel>
											<Select
												labelId="town-select-label"
												label="Town"
												name="town"
												onChange={onInputChange}
												value={studentData.town}
												className="mt-2 mb-4"
												required
											>
												<MenuItem value={"Sofia"}>
													Sofia
												</MenuItem>
												<MenuItem value={"Plovdiv"}>
													Plovdiv
												</MenuItem>
												<MenuItem value={"Varna"}>
													Varna
												</MenuItem>
												<MenuItem value={"Burgas"}>
													Burgas
												</MenuItem>
												<MenuItem
													value={"Stara Zagora"}
												>
													Stara Zagora
												</MenuItem>
											</Select>
										</FormControl>
									</Col>
								</Row>

								<TextField
									label="Bio"
									name="bio"
									value={studentData.bio}
									onChange={onInputChange}
									className="mt-2 mb-4"
									fullWidth
									required
									multiline
									minRows={4}
									maxRows={12}
								/>
							</>
						)}

						{activeStep === 1 && (
							<>
								<Autocomplete
									className="mt-2 mb-4"
									value={university}
									onChange={(event, value) =>
										setUniversity(value)
									}
									options={unis}
									renderInput={(params) => (
										<TextField
											{...params}
											label="University"
											required
										/>
									)}
								/>

								<TextField
									label="Specialty"
									name="specialty"
									value={studentData.specialty}
									onChange={onInputChange}
									variant="outlined"
									className="mt-2 mb-4"
									fullWidth
									required
								/>

								<Row>
									<Col lg={6}>
										<FormControl fullWidth>
											<InputLabel className="mt-2 mb-4">
												Year *
											</InputLabel>
											<Select
												label="Year"
												name="yearAtUni"
												onChange={onInputChange}
												value={studentData.yearAtUni}
												className="mt-2 mb-4"
												required
											>
												<MenuItem value={1}>
													First Year
												</MenuItem>
												<MenuItem value={2}>
													Second Year
												</MenuItem>
												<MenuItem value={3}>
													Third Year
												</MenuItem>
												<MenuItem value={4}>
													Fourth Year
												</MenuItem>
												<MenuItem value={5}>
													Fifth Year
												</MenuItem>
											</Select>
										</FormControl>
									</Col>
									<Col lg={6}>
										<Autocomplete
											className="mt-2 mb-4"
											value={stack}
											onChange={(event, value) =>
												setStack(value)
											}
											style={{ backgroundColor: "white" }}
											multiple
											freeSolo
											options={stackOptions}
											renderTags={(value, getTagProps) =>
												value.map((option, index) => (
													<Chip
														style={{
															backgroundColor:
																"#00000008",
														}}
														variant="outlined"
														label={option}
														{...getTagProps({
															index,
														})}
													/>
												))
											}
											renderInput={(params) => (
												<TextField
													{...params}
													label="Skills"
												/>
											)}
										/>
									</Col>
								</Row>
							</>
						)}

						{activeStep === 2 && (
							<>
								<TextField
									name="email"
									type="email"
									label="Email"
									className="mt-2 mb-4"
									value={studentData.email}
									onChange={onInputChange}
									fullWidth
								/>

								<TextField
									name="password"
									type="password"
									label="Password"
									className="mt-2 mb-4"
									value={studentData.password}
									onChange={onInputChange}
									fullWidth
								/>

								<TextField
									name="repeatedPassword"
									type="password"
									label="Repeat Password"
									className="mt-2 mb-4"
									value={studentData.repeatedPassword}
									onChange={onInputChange}
									fullWidth
								/>
							</>
						)}
					</Container>
				</Form>

				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						pt: 2,
					}}
				>
					<Button
						variant="outlined"
						color="error"
						className="shadowItem"
						onClick={handleBack}
						sx={{ mr: 1 }}
					>
						{activeStep === 0 ? "Cancel" : "Back"}
					</Button>
					<Box sx={{ flex: "1 1 auto" }} />

					<Button
						onClick={handleNext}
						variant="outlined"
						className="shadowItem"
					>
						{activeStep === steps.length - 1 ? "Register" : "Next"}
					</Button>
				</Box>
			</Container>
		</>
	);
};

export default RegisterStudent;

const unis = ["Paisii Hilendarski", "Technical University"];

const stackOptions = [
	"JavaScript",
	"Node.js",
	"React",
	"React Native",
	"Angular",
	"Vue.js",
	"Azure",
	"Java",
	"PostgreSQL",
	"Python",
	"Linux",
	"C",
	"C++",
	"SQL",
	"Excel",
	".NET",
	"AWS",
	"HTML/CSS",
	"jQuery",
	"TypeScript",
	"RabbitMQ",
	"C#",
	"Windows",
];
