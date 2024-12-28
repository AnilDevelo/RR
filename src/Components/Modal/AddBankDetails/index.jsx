import React, { useState } from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, TextField, Button, FormControl, FormLabel } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 420,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};

const BankDetailsForm = () => {
    const [selectedBank, setSelectedBank] = useState('Super Admin Bank Account');
    const [bankDetails, setBankDetails] = useState({
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        amount: '',
    });

    const handleRadioChange = (event) => {
        setSelectedBank(event.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBankDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <Box sx={{ width: 420, padding: 4, boxShadow: 3, borderRadius: 2, ...style }}>
            <Typography variant="h6" gutterBottom>
                Enter Bank Details for Client
            </Typography>
            
            <FormControl component="fieldset" sx={{ mb: 2 }}>
                <FormLabel component="legend">Select Bank</FormLabel>
                <RadioGroup
                    value={selectedBank}
                    onChange={handleRadioChange}
                    row
                    aria-labelledby="bank-selection"
                >
                    <FormControlLabel value="Super Admin Bank Account" control={<Radio />} label="Super Admin Bank Account" />
                    <FormControlLabel value="Trader Bank Account" control={<Radio />} label="Trader Bank Account" />
                </RadioGroup>
            </FormControl>

            {/* Bank Name Input */}
            <TextField
                fullWidth
                label="Bank Name"
                name="bankName"
                value={bankDetails.bankName}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#ccc', // Default border color
                        },
                        '&:hover fieldset': {
                            borderColor: '#1976d2', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#1976d2', // Border color when focused
                            borderWidth: 2, // Thicker border on focus
                        },
                    },
                }}
            />

            {/* Account Number Input */}
            <TextField
                fullWidth
                label="Account Number"
                name="accountNumber"
                value={bankDetails.accountNumber}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#ccc', // Default border color
                        },
                        '&:hover fieldset': {
                            borderColor: '#1976d2', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#1976d2', // Border color when focused
                            borderWidth: 2, // Thicker border on focus
                        },
                    },
                }}
            />

            {/* IFSC Code Input */}
            <TextField
                fullWidth
                label="IFSC Code"
                name="ifscCode"
                value={bankDetails.ifscCode}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#ccc', // Default border color
                        },
                        '&:hover fieldset': {
                            borderColor: '#1976d2', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#1976d2', // Border color when focused
                            borderWidth: 2, // Thicker border on focus
                        },
                    },
                }}
            />

            {/* Deposit Amount Input */}
            <TextField
                fullWidth
                label="Deposit Amount"
                name="amount"
                value={bankDetails.amount}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                type="number"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#ccc', // Default border color
                        },
                        '&:hover fieldset': {
                            borderColor: '#1976d2', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#1976d2', // Border color when focused
                            borderWidth: 2, // Thicker border on focus
                        },
                    },
                }}
            />

            {/* Submit Button */}
            <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleFormSubmit}
                sx={{ mt: 2 }}
            >
                Submit
            </Button>
        </Box>
    );
};

export default BankDetailsForm;
