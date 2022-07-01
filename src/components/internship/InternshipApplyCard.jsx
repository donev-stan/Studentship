import React, { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import applyImg from "../../images/Internship/apply.png";
import { getLoggedUser } from "../../services/AuthService";
import { Navigate } from "react-router-dom";

const InternshipApplyCard = () => {
	const [showModal, setShowModal] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [uploadedCV, setUploadedCV] = useState(false);

	const handleClose = () => {
		setShowModal(false);
		if (uploadedCV) {
			handleClick();
		}
	};

	const handleShow = () => {
		if (getLoggedUser()) {
			if (getLoggedUser().type === "student") setShowModal(true);
		} else setRedirect(true);
	};

	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleSnackClose = (event, reason) => {
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

	return (
		<>
			{redirect && <Navigate to={"/login"} />}

			<Modal
				show={showModal}
				onHide={handleClose}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Apply For A Job</Modal.Title>
				</Modal.Header>
				<Modal.Body className="p-4 m-4 pt-2 pb-2">
					<Form>
						{/* Upload CV */}
						<Form.Group controlId="formFile" className="mb-4">
							<Form.Label>Upload CV</Form.Label>
							<Form.Control
								type="file"
								onChange={() => setUploadedCV(true)}
							/>
						</Form.Group>

						{/* Message */}
						<Form.Group className="my-4">
							<Form.Label>Message</Form.Label>
							<Form.Control
								placeholder="Message / cover letter to the company ..."
								as="textarea"
								rows={3}
							/>
						</Form.Group>

						{/* Apply Btn */}
						<Col className="text-center">
							{uploadedCV ? (
								<Button
									variant="contained"
									endIcon={<SendIcon />}
									onClick={handleClose}
									size="large"
								>
									Apply
								</Button>
							) : (
								<Button
									variant="contained"
									endIcon={<SendIcon />}
									onClick={handleClose}
									size="large"
									disabled
								>
									Apply
								</Button>
							)}
						</Col>
					</Form>
				</Modal.Body>
			</Modal>

			<Card
				className="shadowItem pointer transformItem my-3"
				onClick={handleShow}
			>
				<Card.Body className="text-center">
					<Row>
						<Col lg={2}>
							<img src={applyImg} alt="" width={"80px"} />
						</Col>
						<Col lg={10} className="mt-4">
							<h5 className="align-middle">Apply For A Job</h5>
						</Col>
					</Row>
				</Card.Body>
			</Card>

			<Snackbar
				open={open}
				autoHideDuration={2500}
				onClose={handleSnackClose}
				message="Sending..."
				action={action}
			/>
		</>
	);
};

export default InternshipApplyCard;
