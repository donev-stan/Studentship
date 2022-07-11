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
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";

import { getLoggedUser, login } from "../../../services/AuthService";
import { registerCompany } from "../../../services/CompanyService";

const steps = [
	"Company Info and Contacts",
	"Company General Information",
	"Login Credentials",
];

const defaultCompanyData = {
	picture: "default",
	PIC: "",
	name: "",
	websiteURL: "",
	address: "",
	telephone: "",
	employees: "",
	locations: [],
	founded: "",
	about: "",
	career: "",
	benefits: [],
	technologies: [],
	email: "",
	password: "",
	repeatedPassword: "",
};

const RegisterCompany = () => {

	// React Hook (useState) за запазване на информация
	const [companyData, setCompanyData] = useState(defaultCompanyData);
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState(false);

	// Активната стъпка от stepper-a
	const [activeStep, setActiveStep] = useState(0);

	const navigate = useNavigate();

	// функция за преминаване на следваща стъпка от stepper
	const handleNext = () => {
		// ако стъпката е 2 (тоест последната) тогава ще submit-нем данните от form-а
		// ако ли не ще преминем на следваща стъпка
		activeStep === 2
			? onFormSubmit()
			: setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	// функция за преминаване на предишна стъпка от stepper
	const handleBack = () => {
		// ако стъпката е 0 (тоест първа) и потребителя натисне cancel ще го пратим на предишната посетена от него страница
		// в противен случай ще натисне back и ще се върне на предишната стъпка
		activeStep === 0
			? navigate(-1)
			: setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	// При зареждане на компонента ще се провери дали има logg-нат потребител и ако да, ще се пренасочи
	useEffect(() => {
		if (getLoggedUser()) setRedirect(true);
	}, []);


	// При промяна в полетата за попълване на данни се извиква тази функция и запазва въведените данни в променлива
	const onInputChange = (event) => {
		// event.persist();

		setError(false);

		setCompanyData((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	};

	// Функция която ще се извика при submit на form и тя от своя страна ще извика функция за регистрация 
	// при случай че няма проблем ще се влезе автоматично в системата с новорегистрираната информация и ще се пренасочи потребителя
	// при случай че има грешка - няма да се регистрира и ще се изпише грешка на екрана
	const onFormSubmit = (event) => {
		// event.preventDefault();

		setError(false);
//извикваме функцията registerCompany, ако тя се изпълни отиваме в  първото .then
		registerCompany(companyData)
			.then((_) => {
				login(companyData)
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
								<Row>
									<Col lg={6}>
										<TextField
											label="Image"
											name="picture"
											value={companyData.picture}
											onChange={onInputChange}
											variant="outlined"
											className="mt-2 mb-4"
											fullWidth
										/>

										<TextField
											type="number"
											label="PIC"
											name="PIC"
											value={companyData.PIC}
											onChange={onInputChange}
											variant="outlined"
											className="mt-2 mb-4"
											required
											fullWidth
										/>

										<TextField
											label="Name"
											name="name"
											value={companyData.name}
											onChange={onInputChange}
											variant="outlined"
											className="mt-2 mb-4"
											required
											fullWidth
										/>

										<TextField
											label="Link to website"
											name="websiteURL"
											value={companyData.websiteURL}
											onChange={onInputChange}
											variant="outlined"
											className="mt-2 mb-4"
											fullWidth
										/>
									</Col>

									<Col lg={6}>
										<TextField
											label="Address"
											name="address"
											value={companyData.address}
											onChange={onInputChange}
											variant="outlined"
											className="mt-2 mb-4"
											required
											fullWidth
										/>

										<TextField
											type="number"
											label="Telephone Number"
											name="telephone"
											value={companyData.telephone}
											onChange={onInputChange}
											variant="outlined"
											className="mt-2 mb-4"
											required
											fullWidth
										/>

										<TextField
											type="number"
											label="Employees Count"
											name="employees"
											value={companyData.employees}
											onChange={onInputChange}
											variant="outlined"
											className="mt-2 mb-4"
											required
											fullWidth
										/>

										<Autocomplete
											className="mt-2 mb-4"
											value={companyData.locations}
											onChange={(event, value) =>
												setCompanyData((prevState) => ({
													...prevState,
													locations: value,
												}))
											}
											style={{ backgroundColor: "white" }}
											multiple
											freeSolo
											options={[
												"Sofia",
												"Plovdiv",
												"Varna",
												"Burgas",
												"Stara Zagora",
											]}
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
													label="Office Locations *"
												/>
											)}
										/>
									</Col>
								</Row>
							</>
						)}

						{activeStep === 1 && (
							<>
								<TextField
									type="number"
									label="Founded"
									name="founded"
									value={companyData.founded}
									onChange={onInputChange}
									variant="outlined"
									className="mt-2 mb-4"
									required
									fullWidth
								/>

								<TextField
									label="About"
									name="about"
									value={companyData.about}
									onChange={onInputChange}
									className="mt-2 mb-4"
									fullWidth
									required
									multiline
									minRows={4}
									maxRows={12}
								/>

								<TextField
									label="Career"
									name="career"
									value={companyData.career}
									onChange={onInputChange}
									className="mt-2 mb-4"
									fullWidth
									required
									multiline
									minRows={4}
									maxRows={12}
								/>

								<Row>
									<Col lg={6}>
										<Autocomplete
											className="mt-2 mb-4"
											value={companyData.benefits}
											onChange={(event, value) =>
												setCompanyData((prevState) => ({
													...prevState,
													benefits: value,
												}))
											}
											style={{ backgroundColor: "white" }}
											multiple
											freeSolo
											options={benefitsOptions}
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
													label="Benefits *"
												/>
											)}
										/>
									</Col>

									<Col lg={6}>
										<Autocomplete
											className="mt-2 mb-4"
											value={companyData.technologies}
											onChange={(event, value) =>
												setCompanyData((prevState) => ({
													...prevState,
													technologies: value,
												}))
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
													label="Technologies *"
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
									value={companyData.email}
									onChange={onInputChange}
									fullWidth
								/>

								<TextField
									name="password"
									type="password"
									label="Password"
									className="mt-2 mb-4"
									value={companyData.password}
									onChange={onInputChange}
									fullWidth
								/>

								<TextField
									name="repeatedPassword"
									type="password"
									label="Repeat Password"
									className="mt-2 mb-4"
									value={companyData.repeatedPassword}
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
						color={activeStep === 0 ? "error" : "inherit"}
						className="shadowItem"
						onClick={handleBack}
					>
						{activeStep === 0 ? "Cancel" : "Back"}
					</Button>
					<Box sx={{ flex: "1 1 auto" }} />

					<Button
						onClick={handleNext}
						variant="outlined"
						className="shadowItem"
						color={activeStep === steps.length - 1 ? "success" : "primary"}
					>
						{activeStep === steps.length - 1 ? "Register" : "Next"}
					</Button>
				</Box>
			</Container>
		</>
	);
};

export default RegisterCompany;

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

const benefitsOptions = [
	"Flexible working locations",
	"Additional health and dental insurance",
	"Opportunity to work from home",
	"Technical and soft skills trainings",
	"Additional days of annual leave",
	"Annual performance bonus",
	"Fuel card",
	"Multisport Card",
	"Open space office",
	"Company fitness",
	"Discounts with different partners",
	"Events and team building",
	"Achievement program",
	"Free drinks in the office",
];