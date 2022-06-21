import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInternshipByID } from "../../services/InternshipService";
import Loader from "../loader/Loader";

import InternshipCard from "../internship/InternshipCard";

const BookmarkJobsCard = ({ internshipID }) => {
	const [internship, setInternship] = useState({});

	useEffect(() => {
		getInternshipByID(internshipID).then((offer) => {
			setInternship(offer);
		});
	}, [internshipID]);

	return (
		<>
			{Object.entries(internship).length !== 0 ? (
				<InternshipCard
					offer={internship}
					key={internshipID}
					as={Link}
					to={`${internshipID}`}
				/>
			) : (
				<Loader />
			)}
		</>
	);
};

export default BookmarkJobsCard;
