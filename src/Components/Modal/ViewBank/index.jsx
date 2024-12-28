import React, { useCallback, useRef, useState } from "react";
import FilledButton from "../../FileButton";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch } from "react-redux";
import { forgotPasswordHandler } from "../../../Redux/auth/action";
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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

const ForgotPassword = ({ handleOpenModal,modalValue, ...res }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [formData, setFormData] = useState({ email: '' });
    const [, updateState] = useState({});
    const simpleValidator = useRef(new SimpleReactValidator({
        validators: {
            email: {
                message: "The email must be a valid email address.",
                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val,/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)
                },
                required: true
            }
        }
    }));
    const forceUpdate = useCallback(() => updateState({}), []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            setLoader(true);
            let payload = {
                ...formData
            }
            dispatch(forgotPasswordHandler(payload)).then(res => {
                if (res.data.success) {
                    handleOpenModal('CommonPop', { header: "Success", body: res.data.message })
                } else {
                    handleOpenModal('CommonPop', { header: "Error", body: res.data.message || res?.data?.msg })
                }
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }

    return (
        <Box sx={style}>
        {/* Close Button */}
        <IconButton
            onClick={() => handleOpenModal()}
            sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: '#64748b',
            }}
        >
            <CloseIcon />
        </IconButton>

        {/* Bank Details */}
        {modalValue?.row && (
            <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Client Bank Details
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Bank Name:</strong> {modalValue.row.bankName}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Account Holder:</strong> {modalValue.row.accountHolder}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Account Number:</strong> {modalValue.row.accountNumber}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>IFSC Code:</strong> {modalValue.row.ifscCode}
                </Typography>
            </Box>
        )}
    </Box>
    )
}
export default ForgotPassword