import * as React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@mui/material';
import { Box } from '@mui/system';

export default function OTP({ length, value, onChange, separator }) {
  const inputRefs = React.useRef([]);

  // Ensure value is always a valid string
  const paddedValue = (value || '').padEnd(length, '');

  const handleChange = (event, index) => {
    const inputValue = event.target.value;

    if (!/^\d*$/.test(inputValue)) return; // Allow only numeric input

    const newValue = [...paddedValue];
    newValue[index] = inputValue.slice(-1); // Update current field with the last entered character
    onChange(newValue.join(''));

    // Focus the next input field if the current one is filled
    if (inputValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    switch (event.key) {
      case 'Backspace':
        event.preventDefault();
        const newValue = [...paddedValue];
        newValue[index] = ''; // Clear current field
        onChange(newValue.join(''));

        // Move focus to the previous field if possible
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
        break;

      case 'ArrowLeft':
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
        break;

      case 'ArrowRight':
        if (index < length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
        break;

      default:
        break;
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData('text').slice(0, length);

    if (!/^\d*$/.test(pastedData)) return; // Allow only numeric input

    const newValue = pastedData.padEnd(length, '').split('');
    onChange(newValue.join(''));

    // Update input values and focus the last filled field
    newValue.forEach((char, idx) => {
      if (inputRefs.current[idx]) {
        inputRefs.current[idx].value = char;
      }
    });
    const lastFilledIndex = Math.min(pastedData.length - 1, length - 1);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      {Array.from({ length }).map((_, index) => (
        <React.Fragment key={index}>
          <Input
            disableUnderline
            inputRef={(ref) => (inputRefs.current[index] = ref)}
            value={paddedValue[index] || ''} // Use padded value here
            onChange={(event) => handleChange(event, index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onPaste={handlePaste}
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: 'center',
                width: '40px',
                height: '40px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '16px',
              },
            }}
          />
          {index < length - 1 && separator}
        </React.Fragment>
      ))}
    </Box>
  );
}

OTP.propTypes = {
  length: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  separator: PropTypes.node,
};
