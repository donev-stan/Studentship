import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import emailImg from "../../images/Company/email.png";

const CompanySubscribeCard = () => {
	const [showModal, setShowModal] = useState(false);

	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	return (
		<>
			<Modal
				className="text-center"
				show={showModal}
				onHide={handleClose}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Body className="text-center">
					<Form>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
							/>
							<Form.Text className="text-muted">
								We'll never share your email with anyone else.
							</Form.Text>
						</Form.Group>
					</Form>
					<Button variant="success" onClick={handleClose}>
						Subscribe
					</Button>
				</Modal.Body>
			</Modal>

			<Card
				className="shadowItem mt-3 mb-4 borderRadius transformItem pointer"
				onClick={handleShow}
			>
				<Card.Body>
					<img src={emailImg} alt="" width={"80px"} />
					<h5>Subscribe so you don't miss any new offers</h5>
				</Card.Body>
			</Card>
		</>
	);
};

export default CompanySubscribeCard;
