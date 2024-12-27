import { Box } from "@mui/material";
import React from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};
const UpdateGameCurrency = () => {
    return (
        <Box sx={style}>
            <div className={'add_admin_user_popup_title'}>
                <h2>{'Update Game Currency'}</h2>
            </div>
        </Box>
    )
}
export default UpdateGameCurrency