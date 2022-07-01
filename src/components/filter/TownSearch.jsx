import React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

const TownSearch = ({ setCities }) => {
	return (
		<Autocomplete
			onChange={(event, value) => setCities(value)}
			style={{ backgroundColor: "white" }}
			multiple
			id="tags-outlined"
			freeSolo
			options={towns}
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

const towns = ["Sofia", "Plovdiv", "Varna", "Burgas", "Stara Zagora"];
