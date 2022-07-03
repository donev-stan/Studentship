import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Alert from "react-bootstrap/esm/Alert";
import Form from "react-bootstrap/esm/Form";

import Header from "../header/Header";
import {
	getLocalStorageData,
	getLoggedUser,
	login,
} from "../../services/AuthService";
import { getStudentByID, yearWithWords } from "../../services/StudentService";

import profileImg from "../../images/user.png";
import bookmark from "../../images/Student/bookmark.png";
import resume from "../../images/Student/resume.png";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { BsTelephone, BsBookmarks, BsFillBookmarksFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { FaUniversity } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { returnStackWithIcons } from "../../services/InternshipService";
import { bookmarkStudent } from "../../services/CompanyService";
import Loader from "../loader/Loader";

// import { bookmarkStudent } from "../../services/CompanyService";

import Zoom from "@mui/material/Zoom";

const Student = (props) => {
	const [student, setStudent] = useState({});
	const [error, setError] = useState(false);

	const [isCompanyViewer, setIsCompanyViewer] = useState(false);
	const [company, setCompany] = useState(null);
	const [bookmarked, setBookmarked] = useState(false);

	const [snackMessage, setSnackMessage] = useState("");

	const { id } = useParams();
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const action = (
		<React.Fragment>
			<Button color="secondary" size="small" onClick={handleClose}>
				UNDO
			</Button>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);

	const {
		picture,
		name,
		lastName,
		bio,
		email,
		age,
		town,
		university,
		yearAtUni,
		specialty,
		telephone,
		skills,
	} = student;

	useEffect(() => {
		const students = getLocalStorageData("students");
		const studentStorage = students.find((stu) => stu.id === id);

		if (!studentStorage) {
			console.log("Got Student from Firebase");
			getStudentByID(id)
				.then((student) => {
					setStudent(student);
					setError(false);
				})
				.catch((error) => setError(error.message));
		} else {
			console.log("Got Student from Local Storage");
			setStudent(studentStorage);
			setError(false);
		}

		const loggedUser = getLoggedUser();
		if (loggedUser.type === "company") {
			setCompany(loggedUser);
			setIsCompanyViewer(true);

			if (loggedUser.bookmarks.find((bookmarkID) => bookmarkID === id)) {
				setBookmarked(true);
			}
		}
	}, [props.student, id]);

	function onFormSubmit(e) {
		e.preventDefault();

		bookmarkStudent(id, company)
			.then((_) => {
				setBookmarked(!bookmarked);
				if (bookmarked) setSnackMessage("Bookmark Removed!");
				else setSnackMessage("Bookmark Set!");

				handleClick();
				login(getLoggedUser());
			})
			.catch((error) => setError(error.message));
	}

	return (
		<>
			<Header />
			<Zoom in={true} style={{ transitionDelay: "50ms" }}>
				<Container className="my-4">
					{error && (
						<Alert
							key={3}
							variant={"danger"}
							className="text-center"
						>
							{error}
						</Alert>
					)}
					{Object.entries(student).length !== 0 ? (
						<>
							{" "}
							<Row>
								<Col lg={3} className="my-4 text-center">
									<Row>
										{/* <img src={profileImg} /> */}
										<img
											src={
												picture === "default"
													? profileImg
													: picture
											}
											alt="Profile"
										/>
										<hr className="mt-1"></hr>
									</Row>

									<Row>
										<h4>
											{" "}
											<FaUniversity /> University:
										</h4>
										<p>
											{university},{" "}
											{yearWithWords(yearAtUni)}
										</p>

										<p>{specialty}</p>

										<h4>
											{" "}
											<GrMapLocation /> Town:
										</h4>
										<p>{town}</p>

										<h4>Age:</h4>
										<p>{age}</p>
									</Row>
								</Col>

								<Col lg={9} className="my-4 p-4 pt-0 pb-0">
									<Row className="my-4">
										<Col>
											<Stack direction="row" spacing={1}>
												<h2>
													{" "}
													{name} {lastName}
												</h2>

												<h4 className="mt-1">
													{company ? (
														bookmarked ? (
															<BsFillBookmarksFill
																width={"10px"}
															/>
														) : (
															<BsBookmarks
																width={"10px"}
															/>
														)
													) : null}
												</h4>
											</Stack>
										</Col>
										<hr />

										<Row>
											<Col>
												{bio && (
													<>
														<h4>Bio:</h4>
														<p>{bio}</p>
													</>
												)}
											</Col>
										</Row>

										<Row>
											<Col>
												{skills && (
													<>
														<h4 className="mb-3">
															{" "}
															Skills:{" "}
														</h4>
														{skills.map((skill) =>
															returnStackWithIcons(
																skill
															)
														)}
													</>
												)}
											</Col>
										</Row>

										<Row className="my-4">
											<h4>Contacts</h4>
											<Col className="text-center mt-2">
												<h5>
													{" "}
													<BsTelephone /> Telephone :
												</h5>
												<p>{telephone}</p>
											</Col>

											<Col className="text-center mt-2">
												<h5>
													{" "}
													<AiOutlineMail /> E-mail:
												</h5>
												<p>{email}</p>
											</Col>
										</Row>
										{isCompanyViewer && (
											<>
												<Row className="text-center mt-4">
													<Col>
														<img
															src={resume}
															alt="Download CV"
															style={imgStyles}
														/>
														<br />
														<Button
															className="shadowItem mt-4"
															variant="contained"
															size="large"
															startIcon={
																<CloudDownloadIcon />
															}
															onClick={() => {
																handleClick();
																setSnackMessage("Downloading...")
															}}
														>
															Download CV
														</Button>

														<Snackbar
															open={open}
															autoHideDuration={
																3000
															}
															onClose={
																handleClose
															}
															message={
																snackMessage
															}
															action={action}
														/>
													</Col>
													<Col>
														<img
															src={bookmark}
															alt="Bookmark Student"
															style={imgStyles}
														/>
														<br />

														<Form
															onSubmit={
																onFormSubmit
															}
														>
															<Button
																className="shadowItem mt-4"
																type="submit"
																variant="contained"
																startIcon={
																	bookmarked ? (
																		<BookmarkRemoveIcon />
																	) : (
																		<BookmarkAddIcon />
																	)
																}
																size="large"
																color="success"
															>
																{bookmarked
																	? "Remove Bookmark"
																	: "Bookmark Student"}
															</Button>
														</Form>
													</Col>
												</Row>
											</>
										)}
									</Row>
								</Col>
							</Row>
						</>
					) : (
						<Loader />
					)}
				</Container>
			</Zoom>
		</>
	);
};

export default Student;

const imgStyles = {
	width: "60px",
	height: "60px",
};
