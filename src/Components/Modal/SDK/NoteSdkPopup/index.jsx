import React from "react";
import Box from "@material-ui/core/Box";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};

const NoteSdkPopup = ({ modalValue }) => {
    return (
        <Box sx={style} className={'release_Note'}>
            <h5>Release Note</h5>
            <p dangerouslySetInnerHTML={{ __html: modalValue }} />
        </Box>
    )
}
export default NoteSdkPopup