import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags() {
	return (
		<Autocomplete
			style={{ backgroundColor: "white" }}
			multiple
			id="checkboxes-tags-demo"
			options={jobOptions}
			disableCloseOnSelect
			getOptionLabel={(option) => option.title}
			renderOption={(props, option, { selected }) => (
				<li {...props}>
					<Checkbox
						icon={icon}
						checkedIcon={checkedIcon}
						style={{ marginRight: 8 }}
						checked={selected}
					/>
					{option.title}
				</li>
			)}
			renderInput={(params) => (
				<TextField {...params} label="Internship Options" />
			)}
		/>
	);
}

const jobOptions = [
	{ title: "Flexible Time" },
	{ title: "Freelance Project" },
	{ title: "Full Time" },
	{ title: "Part Time" },
	{ title: "Home Office" },
	{ title: "Permanent" },
	{ title: "Temporary" },
	{ title: "Remote Interview" },
];
