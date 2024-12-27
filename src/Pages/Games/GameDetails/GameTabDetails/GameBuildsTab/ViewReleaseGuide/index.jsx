import React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

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
const ViewReleaseGuide = ({ modalValue, handleOpenModal }) => {
    const handleCopyURL = (url) => {
        navigator.clipboard.writeText(url).then(res => {
            handleOpenModal('CommonPop', { header: "Success", body: 'Release Guide Link is Copy Successfully ' })
        });
    };
    return (
        <Box sx={style} className={'user_popup_section'}>
            <div className='d_flex justify_content_center'>
                <Typography id="modal-modal-title" variant="h6" component="h2" className={"block-user-title"}>
                    Release Guide Link
                </Typography>
            </div>
            <div className={'rejected_modal_content_text release_guid_link_sec'}>
                <p>Link : {modalValue?.releaseGuideLink} <button onClick={() => handleCopyURL(modalValue?.releaseGuideLink)}>Copy</button></p>
            </div>
        </Box>
    );
};
export default ViewReleaseGuide;