import React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

const KeywordSearch = ({ setStack }) => {
	return (
		<Autocomplete
			onChange={(event, value) => setStack(value)}
			style={{ backgroundColor: "white" }}
			multiple
			id="tags-outlined"
			freeSolo
			options={stack}
			renderTags={(value, getTagProps) =>
				value.map((option, index) => (
					<Chip
						style={{ backgroundColor: "#00000008" }}
						variant="outlined"
						label={option}
						{...getTagProps({ index })}
					/>
				))
			}
			renderInput={(params) => (
				<TextField {...params} label="Technologies" />
			)}
		/>
	);
};

export default KeywordSearch;

const stack = [
	"JavaScript",
	"Node.js",
	"React",
	"React Native",
	"Angular",
	"Vue.js",
	"Azure",
	"Java",
	"PostgreSQL",
	"Python",
	"Linux",
	"C",
	"C++",
	"SQL",
	"Excel",
	".NET",
	"AWS",
	"HTML/CSS",
	"jQuery",
	"TypeScript",
	"RabbitMQ",
	"C#",
	"Windows",
];
