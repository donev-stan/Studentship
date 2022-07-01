import React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

const TownSearch = () => {

	return (
		<Autocomplete
			style={{ backgroundColor: "white" }}
			multiple
			id="tags-outlined"
			freeSolo
			options={towns.map((option) => option.title)}
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
			renderInput={(params) => <TextField {...params} label="Where" />}
		/>
	);
};

export default TownSearch;

const towns = [
	{ title: "Sofia" },
	{ title: "Plovdiv" },
	{ title: "Varna" },
	{ title: "Burgas" },
	{ title: "Stara Zagora" },
];
