import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOfferByID } from "../../services/InternshipService";

import InternshipCard from "../internship/InternshipCard";

const BookmarkJobsCard = ({ internshipID }) => {
  const [internship, setInternship] = useState({});

  useEffect(() => {
    getOfferByID(internshipID).then((offer) => {
      setInternship(offer);
    });
  }, [internshipID]);

  return (
    <>
      <InternshipCard
        offer={internship}
        key={internshipID}
        as={Link}
        to={`${internshipID}`}
      />
    </>
  );
};

export default BookmarkJobsCard;
