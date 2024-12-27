import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DatePreviousMonthFilter = ({ setValue, value }) => {
  const currentDate = new Date(); // Get the current date

  // Calculate the maximum date (current month and year)
  const maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth());

  return (
    <div className={'start-date-picker'}>
      <LocalizationProvider dateAdapter={AdapterDateFns} >
        <DatePicker
          name='start-date'
          views={['month', 'year']}
          renderInput={(params) => {
            return <TextField {...params} />;
          }}
          value={value}
          onChange={setValue}
          inputFormat="MMM yyyy"
          inputProps={{ readOnly: true }}
          minDate={null} // No minimum date
          maxDate={maxDate} // Maximum date is the current month and year
        />
      </LocalizationProvider>
    </div>
  );
};

export default DatePreviousMonthFilter;
