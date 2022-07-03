import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../header/Header";
import { getLoggedUser } from "../../services/AuthService";
import BookmarkStudentCard from "./BookmarkStudentCard";
import BookmarkJobsCard from "./BookmarkJobsCard";
import { Typography } from "@mui/material";

const Bookmarks = () => {
	const [bookmarks, setBookmarks] = useState([]);
	const [user, setUser] = useState({});

	useEffect(() => {
		const user = getLoggedUser();
		setUser(user);
		setBookmarks(user.bookmarks);
	}, []);

	return (
		<>
			<Header />

			<Container className="my-4 text-center">
				<Row>
					<Col>
						{user.type === "company" && (
							<>
								<h2>Saved Students</h2>
								<hr />

								<Row className="text-center">
									{bookmarks.length !== 0 ? (
										bookmarks.map((id) => (
											<BookmarkStudentCard
												studentID={id}
												key={id}
											/>
										))
									) : (
										<Typography variant="h5">
											{" "}
											No saved students{" "}
										</Typography>
									)}
								</Row>
							</>
						)}

						{user.type === "student" && (
							<>
								<h2>Saved Internships</h2>
								<hr />
								<Row className="text-center">
									{bookmarks.length !== 0 ? (
										bookmarks.map((id) => (
											<Col lg={6}>
												<BookmarkJobsCard
													internshipID={id}
													key={id}
												/>
											</Col>
										))
									) : (
										<Typography variant="h5">
											{" "}
											No saved job offers{" "}
										</Typography>
									)}
								</Row>
							</>
						)}
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Bookmarks;
