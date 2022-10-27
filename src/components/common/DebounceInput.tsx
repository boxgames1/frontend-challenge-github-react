import { ChangeEvent, useState } from 'react';
import debounce from 'lodash/debounce';
import { TextField } from '@mui/material';

type DebounceInputProps = {
  onChange: (value: string) => void;
  debounceTime?: number;
  placeholder?: string;
};

const DebounceInput = ({
  onChange,
  debounceTime = 1500,
  placeholder = '',
  ...restProps
}: DebounceInputProps) => {
  const [value, setValue] = useState('');

  const debounceFn = debounce(onChange, debounceTime);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    debounceFn(event.target.value);
  }

  return (
    <TextField
      {...restProps}
      label={placeholder}
      variant="outlined"
      onChange={handleChange}
      value={value}
    />
  );
};

export default DebounceInput;
