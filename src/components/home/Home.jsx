import React from "react";
import { Link } from "react-router-dom";
import Header from "../header/Header";

import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";

import homeImg from "../../images/Home/homeImg.jpg";

const Home = () => {
	return (
		<>
			<Header />
			<Container>
				<Row style={{ position: "relative" }}>
					<img
						className="d-block w-100"
						src={homeImg}
						alt="Welcome"
						loading="lazy"
					/>
					<h3
						style={{
							position: "absolute",
							marginTop: "50px",
							marginLeft: "65px",
							color: "white",
							textShadow: "1px 1px black",
						}}
					>
						Your future is created by what <br /> you do today not
						tomorrow!
					</h3>
					<hr />
				</Row>

				<Row className="text-center">
					<Col className="my-4 d-flex justify-content-center">
						<Card
							style={{ width: "18rem", border: "none" }}
							className="pointer decorationNone black"
							as={Link}
							to={`/internships`}
						>
							<Card.Img
								variant="top"
								src="https://images.techhive.com/images/article/2016/07/internships-ts-100669679-large.jpg"
							/>
							<Card.Body>
								<Card.Title>Internships</Card.Title>
							</Card.Body>
						</Card>
					</Col>

					<Col className="my-4 d-flex justify-content-center">
						<Card
							style={{ width: "18rem", border: "none" }}
							className="pointer decorationNone black"
							as={Link}
							to={`/companies`}
						>
							<Card.Img
								variant="top"
								src="https://www.invoicefactoring.com/wp-content/uploads/2021/01/cityscape-scaled.jpg"
							/>
							<Card.Body>
								<Card.Title>Companies</Card.Title>
							</Card.Body>
						</Card>
					</Col>

					<Col className="my-4 d-flex justify-content-center">
						<Card
							style={{ width: "18rem", border: "none" }}
							className="pointer decorationNone black"
							as={Link}
							to={`/internships`}
						>
							<Card.Img
								variant="top"
								src="https://www.cumbria.ac.uk/media/Stock-Image-Study-Group.jpg"
							/>
							<Card.Body>
								<Card.Title>Students</Card.Title>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Home;
