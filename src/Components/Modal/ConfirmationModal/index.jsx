import React from 'react';
import { Button, Box, } from '@mui/material';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};

const ConfirmationModal = ({ modalValue, cancelModal, DeleteYes, YesNoText }) => {
    const { header = "Do you want to delete this data?" } = modalValue;
    const { yes, no } = YesNoText;

    return (
        <>
            <Box sx={style}>
                <Box mb={2} className='sd_flex sd_justcenter '>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {header}
                    </Typography>
                </Box>
                <Box className=''>
                    <Box sx={{ textAlign: "center" }} >
                        <Button classname={'cancel_btn'} sx={{ marginRight: "10px" }} variant="outlined" type='reset' onClick={() => cancelModal()}> {no} </Button>
                        <Button mr={1} onClick={() => DeleteYes()} variant="contained" color="primary" type='submit'> {yes} </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
};

export default ConfirmationModal