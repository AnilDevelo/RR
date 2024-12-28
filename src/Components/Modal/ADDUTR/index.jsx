import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Input } from '@mui/material';

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
        utrId: '',
    });

    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState({
        utrId: '',
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

        // Clear error message on change
        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(URL.createObjectURL(selectedFile)); // Create a temporary URL for the image
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        let formErrors = {};
        if (!bankDetails.utrId) {
            formErrors.utrId = 'UTR ID is required';
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        // Handle form submission logic here
        console.log('Form submitted:', bankDetails, file);
    };

    return (
        <Box sx={{ width: 420, padding: 4, boxShadow: 3, borderRadius: 2, ...style }}>
            <Typography variant="h6" gutterBottom>
                Enter Bank Details for Client
            </Typography>

            {/* UTR ID (Required) */}
            <TextField
                fullWidth
                label="UTR ID"
                name="utrId"
                value={bankDetails.utrId}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                required
                error={!!errors.utrId}  // Show error if UTR ID is empty
                helperText={errors.utrId}  // Display validation message
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#ccc',
                        },
                        '&:hover fieldset': {
                            borderColor: '#1976d2',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#1976d2',
                            borderWidth: 2,
                        },
                    },
                }}
            />

            {/* Upload Payment Receipt (Optional) */}
            <Input
                type="file"
                onChange={handleFileChange}
                inputProps={{ accept: '.pdf,.jpg,.jpeg,.png' }}
                sx={{ mt: 2, mb: 2 }}
            />
            <Typography variant="body2" color="textSecondary">
                (Optional) Upload the Payment Receipt (Image or PDF)
            </Typography>
            {file && (
                <Box sx={{ mt: 2 }}>
                    <img src={file} alt="preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                </Box>
            )}

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
