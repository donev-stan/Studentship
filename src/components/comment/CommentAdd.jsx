import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { deepPurple } from "@mui/material/colors";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getLoggedUser } from "../../services/AuthService";
import { postComment } from "../../services/StudentService";

import defaultImg from "../../images/user.png";
import companyProfileImg from "../../images/companyProfileImg.png";

const CommentAdd = ({ internshipID }) => {
	const [comment, setComment] = useState("");
	const [user, setUser] = useState(null);
	const [showBtns, setShowBtns] = useState(false);
	const [error, setError] = useState(false);
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		const loggedUser = getLoggedUser();
		setUser(loggedUser);
	}, []);

	function onCommentChange(e) {
		setComment(e.target.value);
	}

	function commentSubmit() {
        console.log("submit comment");
		if (!getLoggedUser()) setRedirect(true);

		if (comment.trim() !== "") {
			postComment(comment, internshipID, user)
				.then((_) => {})
				.catch((error) => setError(error.message));
		}
	}

	return (
		<>
			{redirect && <Navigate to={"/login"} />}

			<Container className="text-center">
				<Row>
					<Col
						lg={1}
						className="pt-2"
						style={{ paddingLeft: "25px" }}
					>
						<Avatar
							sx={{
								bgcolor: deepPurple[500],
								width: 46,
								height: 46,
							}}
							alt={user && user.name}
							src={
								user
									? user.type === "company"
										? companyProfileImg
										: user?.picture
									: defaultImg
							}
						>
							{" "}
							{user &&
								user.type === "student" &&
								user.picture === "default" &&
								user.name[0] + user.lastName[0]}
						</Avatar>
					</Col>
					<Col lg={11}>
						<TextField
							name="commentText"
							onChange={onCommentChange}
							onFocus={() => setShowBtns(true)}
							label="Write a comment"
							variant="standard"
							fullWidth
							multiline
						/>
					</Col>
				</Row>
				<Row className="text-end mt-1">
					<Col>
						{showBtns === true ? (
							<>
								<Button
									variant="text"
									onClick={() => setShowBtns(false)}
								>
									Cancel
								</Button>

								<Button
									variant="text"
									onClick={commentSubmit}
								>
									Comment
								</Button>
							</>
						) : null}
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default CommentAdd;
