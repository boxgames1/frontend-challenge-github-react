import { ChangeEvent, useState } from "react";
import debounce from "lodash/debounce";
import { TextField } from "@mui/material";

type DebounceInputProps = {
	onChange: (value: string) => void;
	debounceTime?: number;
};

const DebounceInput = ({
	onChange,
	debounceTime = 1500,
}: DebounceInputProps) => {
	const [value, setValue] = useState("");

	const debounceFn = debounce(onChange, debounceTime);

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		setValue(event.target.value);
		debounceFn(event.target.value);
	}

	return (
		<TextField
			label="Outlined"
			variant="outlined"
			onChange={handleChange}
			value={value}
		/>
	);
};

export default DebounceInput;
