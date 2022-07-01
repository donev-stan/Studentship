import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({ setOptions }) {

	return (
		<Autocomplete
			onChange={(event, value) => setOptions(value)}
			style={{ backgroundColor: "white" }}
			multiple
			id="checkboxes-tags-demo"
			options={jobOptios}
			disableCloseOnSelect
			renderOption={(props, option, { selected }) => (
				<li {...props}>
					<Checkbox
						icon={icon}
						checkedIcon={checkedIcon}
						style={{ marginRight: 8 }}
						checked={selected}
					/>
					{option}
				</li>
			)}
			renderInput={(params) => (
				<TextField {...params} label="Internship Options" />
			)}
		/>
	);
}

const jobOptios = [
	"Flexible Time",
	"Freelance Project",
	"Full Time",
	"Part Time",
];