import React, { useState, useRef } from "react";

import Container from "react-bootstrap/Container";
import CheckboxesTags from "./CheckboxWorkOptions";

const InternshipFilter = ({ setCities, setKeywords, setStack }) => {

	return (
		<Container
			style={{
				backgroundColor: "rgba(0,0,0,.03)",
				// borderRadius: "15px",
				boxShadow:
					"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
			}}
			className="mt-3 p-4 text-center"
		>
      <CheckboxesTags />
		</Container>
	);
};

export default InternshipFilter;