import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { getLocalStorageData, logout } from "../../services/AuthService";
import { deleteStudent } from "../../services/StudentService";
import { deleteCompany } from "../../services/CompanyService";

import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { styled, alpha } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AddBoxIcon from "@mui/icons-material/AddBox";
import WorkIcon from "@mui/icons-material/Work";

import { deepPurple } from "@mui/material/colors";

import logo from "../../images/logo.png";

import companyProfileImg from "../../images/companyProfileImg.png";

const StyledMenu = styled((props) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "right",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "right",
		}}
		{...props}
	/>
))(({ theme }) => ({
	"& .MuiPaper-root": {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		color:
			theme.palette.mode === "light"
				? "rgb(55, 65, 81)"
				: theme.palette.grey[300],
		boxShadow:
			"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
		"& .MuiMenu-list": {
			padding: "4px 0",
		},
		"& .MuiMenuItem-root": {
			"& .MuiSvgIcon-root": {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			"&:active": {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity
				),
			},
		},
	},
}));

const Header = () => {
	const [user, setUser] = useState(null);
	const [redirect, setRedirect] = useState(false);

	const [showModal, setShowModal] = useState(false);

	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleClose = () => setShowModal(false);
	const handleShow = () => {
		handleCloseUserMenu();
		setShowModal(true);
	};

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	useEffect(() => {
		const user = getLocalStorageData("loggedUser");
		setUser(user);
	}, []);

	const userLogout = (e) => {
		handleCloseUserMenu();
		logout();
		setRedirect(true);
	};

	const userDelete = () => {
		handleCloseUserMenu();
		if (user.type === "student") {
			deleteStudent(user.id).then((_) => {
				// logout();
				// setRedirect(true);
			});
		} else if (user.type === "company") {
			deleteCompany(user).then((_) => {
				logout();
				setRedirect(true);
			});
		}

		handleClose();
	};

	return (
		<>
			{redirect && <Navigate to="/login" />}

			<Modal
				className="text-center"
				show={showModal}
				onHide={handleClose}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Delete Profile</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h3 className="text-warning"> Warning! </h3>
					<p style={{ fontSize: "larger" }}>
						You are about to delete your profile! <br /> This action
						is irreversible!
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="danger" onClick={userDelete}>
						Delete Profile
					</Button>
				</Modal.Footer>
			</Modal>

			<Container fluid style={{ padding: 0 }}>
				<Navbar
					collapseOnSelect
					expand="md"
					bg="dark"
					variant="dark"
					className="shadowItem"
				>
					<Container>
						<Navbar.Brand as={Link} to="/">
							{" "}
							<img
								alt="Internship Logo"
								src={logo}
								width="35"
								height="35"
								className="d-inline-block align-top"
							/>{" "}
							StudentShip
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="responsive-navbar-nav" />
						<Navbar.Collapse id="responsive-navbar-nav">
							<Nav className="me-auto">
								<Nav.Link as={Link} to="/internships">
									{" "}
									Internships{" "}
								</Nav.Link>
								<Nav.Link as={Link} to="/companies">
									{" "}
									Companies{" "}
								</Nav.Link>

								<Nav.Link as={Link} to="/students">
									{" "}
									Students{" "}
								</Nav.Link>
							</Nav>

							<Nav>
								{user?.name ? (
									<Navbar.Text>
										Signed in as:{" "}
										<span
											style={{
												color: "white",
												fontSize: "18px",
											}}
										>
											{user.name} {user?.lastName}
										</span>
									</Navbar.Text>
								) : (
									<>
										<Nav.Link as={Link} to="/login">
											{" "}
											Login{" "}
										</Nav.Link>
										<Nav.Link as={Link} to="/register">
											{" "}
											Register{" "}
										</Nav.Link>
									</>
								)}
							</Nav>
							{user && (
								<div>
									<Box sx={{ flexGrow: 0 }}>
										<Tooltip title="Open settings">
											<IconButton
												onClick={handleOpenUserMenu}
												sx={{ p: "0 10px 0 10px" }}
											>
												<Avatar
													className="pointer"
													alt={user.name}
													src={
														user.type === "company"
															? companyProfileImg
															: user.picture
													}
													sx={{
														bgcolor:
															deepPurple[500],
													}}
												>
													{user.type === "student" &&
														user.picture ===
															"default" &&
														user.name[0] +
															user.lastName[0]}
												</Avatar>
											</IconButton>
										</Tooltip>
										<StyledMenu
											sx={{ mt: "45px" }}
											id="menu-appbar"
											anchorEl={anchorElUser}
											anchorOrigin={{
												vertical: "top",
												horizontal: "right",
											}}
											keepMounted
											transformOrigin={{
												vertical: "top",
												horizontal: "right",
											}}
											open={Boolean(anchorElUser)}
											onClose={handleCloseUserMenu}
										>
											<Link
												to={`/profile/${user.id}`}
												className="decorationNone black"
											>
												<MenuItem
													onClick={
														handleCloseUserMenu
													}
													disableRipple
													sx={{
														"&:hover": {
															color: "black",
														},
													}}
												>
													<AccountBoxIcon />
													Profile
												</MenuItem>
											</Link>

											{user.type === "company" && (
												<div>
													<Link
														to="/internships/create"
														className="decorationNone black"
													>
														<MenuItem
															onClick={
																handleCloseUserMenu
															}
															disableRipple
														>
															<AddBoxIcon />
															Create Internship
														</MenuItem>
													</Link>

													<Link
														to="/company/jobs"
														className="decorationNone black"
													>
														<MenuItem
															onClick={
																handleCloseUserMenu
															}
															disableRipple
														>
															<WorkIcon />
															My Internships
														</MenuItem>
													</Link>
												</div>
											)}

											<Link
												to={"/bookmarks"}
												className="decorationNone black"
											>
												<MenuItem
													onClick={
														handleCloseUserMenu
													}
													disableRipple
													sx={{
														"&:hover": {
															color: "green",
														},
													}}
												>
													<BookmarksIcon />
													Bookmarks
												</MenuItem>
											</Link>

											<Divider sx={{ my: 0.5 }} />

											<MenuItem
												onClick={userLogout}
												disableRipple
												sx={{
													"&:hover": {
														color: "blue",
													},
												}}
											>
												<LogoutIcon />
												Logout
											</MenuItem>

											<Link
												to={`/${
													user?.lastName
														? "students"
														: "companies"
												}/edit/${user?.id}`}
												className="decorationNone black"
											>
												<MenuItem
													onClick={
														handleCloseUserMenu
													}
													disableRipple
													sx={{
														"&:hover": {
															color: "orange",
														},
													}}
												>
													<EditIcon />
													Edit Profile
												</MenuItem>
											</Link>

											<MenuItem
												onClick={handleShow}
												disableRipple
												sx={{
													"&:hover": {
														color: "red",
													},
												}}
											>
												<DeleteForeverIcon />
												Delete Profile
											</MenuItem>
										</StyledMenu>
									</Box>
								</div>
							)}
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</Container>
		</>
	);
};

export default Header;
