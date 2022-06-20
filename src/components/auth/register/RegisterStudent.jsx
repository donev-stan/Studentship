import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Header from "../../header/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import { getLoggedUser, login } from "../../../services/AuthService";
import { saveStudent } from "../../../services/StudentService";

import { registerStudentF } from "../../../services/StudentService";

const RegisterStudent = () => {
	const [studentData, setStudentData] = useState({});
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState(false);

	//const [towns, setTowns] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		if (getLoggedUser()) setRedirect(true);
	}, []);

	const onInputChange = (event) => {
		event.persist();

		setStudentData((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	};

	const onFormSubmit = (event) => {
		event.preventDefault();

		registerStudentF(studentData)
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
			{redirect && <Navigate to="/profile" />}

			<Header />
			<Container className="my-4" fluid>
				<Row className="text-center">
					<Col>
						<h2>Register Student</h2>
						<hr />
					</Col>
				</Row>
				<Form
					onSubmit={onFormSubmit}
					style={{ width: "60rem" }}
					className="m-auto mt-2"
				>
					{error && (
						<Alert
							key={3}
							variant={"danger"}
							className="text-center"
						>
							{error}
						</Alert>
					)}
					<Row>
						<Col lg={6}>
							{/* Image */}
							<Form.Group className="mb-2">
								<Form.Label>Image</Form.Label>
								<Form.Control
									placeholder="Place image link or leave blank for randomly generated avatar (takes while to load at first)"
									className="mb-1"
									name="picture"
									autoComplete="on"
									onChange={onInputChange}
								/>
							</Form.Group>

							{/* Name*/}
							<Row className="mb-3">
								{/* <Form.Label>Names</Form.Label> */}
								<Col>
									<Form.Control
										placeholder="First name*"
										name="name"
										autoComplete="on"
										onChange={onInputChange}
										required
									/>
								</Col>
								<Col>
									<Form.Control
										placeholder="Last name*"
										name="lastName"
										autoComplete="on"
										onChange={onInputChange}
										required
									/>
								</Col>
							</Row>

							{/* Telephone */}
							<Form.Group className="mb-3">
								<Form.Label>Phone*</Form.Label>
								<Form.Control
									name="telephone"
									autoComplete="on"
									onChange={onInputChange}
									required
								/>
							</Form.Group>

							{/* Age */}
							<Form.Group className="mb-3">
								<Form.Label>Age*</Form.Label>
								<Form.Select
									onChange={onInputChange}
									name="age"
									required
								>
									<option>Select Age</option>
									<option value="18">18</option>
									<option value="19">19</option>
									<option value="20">20</option>
									<option value="21">21</option>
									<option value="22">22</option>
									<option value="23">23</option>
									<option value="24">24</option>
									<option value="25">25</option>
									<option value="26">26</option>
									<option value="27">27</option>
									<option value="28">28</option>
									<option value="29">29</option>
									<option value="30">30</option>
									<option value="31">31</option>
									<option value="32">32</option>
									<option value="33">33</option>
									<option value="34">34</option>
									<option value="35">35</option>
									<option value="36">36</option>
									<option value="37">37</option>
									<option value="38">38</option>
									<option value="39">39</option>
									<option value="40">40</option>
									<option value="41">41</option>
									<option value="42">42</option>
									<option value="44">43</option>
									<option value="44">44</option>
									<option value="45">45</option>
									<option value="46">46</option>
									<option value="47">47</option>
									<option value="48">48</option>
									<option value="49">49</option>
									<option value="50">50</option>
									<option value="51">51</option>
									<option value="52">52</option>
									<option value="53">53</option>
									<option value="54">54</option>
									<option value="55">55</option>
									<option value="56">56</option>
									<option value="57">57</option>
									<option value="58">58</option>
									<option value="59">59</option>
									<option value="60">60</option>
								</Form.Select>
							</Form.Group>

							{/* Town */}
							<Form.Group className="mb-3">
								<Form.Label>Town*</Form.Label>
								<Form.Control
									name="town"
									autoComplete="on"
									onChange={onInputChange}
									required
								/>
							</Form.Group>

							{/* University */}
							<Form.Group className="mb-3">
								<Form.Label>University</Form.Label>
								<Form.Control
									placeholder="Name of University"
									name="university"
									autoComplete="on"
									onChange={onInputChange}
									required
								/>
							</Form.Group>

							{/* Year at University */}
							<Form.Group className="mb-3">
								<Form.Label>Year at University</Form.Label>
								<Form.Select
									onChange={onInputChange}
									name="yearAtUni"
									required
								>
									<option>Select Year</option>
									<option value="1">First Year</option>
									<option value="2">Second Year</option>
									<option value="3">Third Year</option>
									<option value="4">Fourth Year</option>
									<option value="5">Fifth Year</option>
								</Form.Select>
							</Form.Group>

							{/* Specialty */}
							<Form.Group>
								<Form.Label>Specialty*</Form.Label>
								<Form.Control
									name="specialty"
									autoComplete="on"
									onChange={onInputChange}
									required
								/>
							</Form.Group>
						</Col>

						<Col lg={6}>
							{/* CV */}
							<Form.Group controlId="formFile" className="mb-3">
								<Form.Label>Upload CV</Form.Label>
								<Form.Control type="file" />
							</Form.Group>

							{/* Bio */}
							<Form.Group className="mb-3">
								<Form.Label>Bio</Form.Label>
								<Form.Control
									placeholder="Tell us about yourself ..."
									as="textarea"
									rows={3}
									name="bio"
									autoComplete="on"
									onChange={onInputChange}
								/>
							</Form.Group>

							{/* Skills */}
							<Form.Group className="mb-4">
								<Form.Label>Skills</Form.Label>
								<Form.Control
									placeholder="e.g. Node.js, JavaScript, React"
									as="textarea"
									rows={3}
									name="skills"
									autoComplete="on"
									onChange={onInputChange}
								/>
							</Form.Group>

							{/* Email */}
							<Form.Group className="mb-3">
								<Form.Label>Email address*</Form.Label>
								<Form.Control
									type="email"
									placeholder="Enter email"
									name="email"
									autoComplete="off"
									onChange={onInputChange}
									required
								/>
								<Form.Text className="text-muted">
									Choose more representative email!
								</Form.Text>
							</Form.Group>

							{/* Password */}
							<Form.Group className="mb-3">
								<Form.Label>Password*</Form.Label>
								<Form.Control
									type="password"
									placeholder="Enter password"
									name="password"
									onChange={onInputChange}
									required
								/>
							</Form.Group>

							{/* Repeat Password */}
							<Form.Group>
								<Form.Label>Repeat password*</Form.Label>
								<Form.Control
									type="password"
									name="repeatedPassword"
									placeholder="Enter password again"
									onChange={onInputChange}
									required
								/>
							</Form.Group>
						</Col>
					</Row>

					{/* Submit */}
					<Row className="text-center">
						<Col>
							<Button
								variant="danger"
								className="my-4"
								onClick={() => navigate(-1)}
								style={shadow}
							>
								Cancel Registration
							</Button>
						</Col>
						<Col>
							<Button
								type="submit"
								className="my-4"
								style={shadow}
							>
								Register Student
							</Button>
						</Col>
					</Row>
				</Form>
			</Container>
		</>
	);
};

export default RegisterStudent;

const shadow = {
	WebkitBoxShadow: "2px 2px 3px 2px #ccc",
	MozBoxShadow: "2px 2px 3px 2px #ccc",
	boxShadow: "2px 2px 3px 2px #ccc",
};
