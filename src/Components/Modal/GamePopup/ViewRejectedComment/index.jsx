import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import React from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: "5px",
};

const ViewRejectedComment = ({ modalValue, handleOpenModal }) => {
    return (
        <Box sx={style} className={'user_popup_section view_description_details'}>
            <div className='d_flex justify_content_center'>
                <Typography id="modal-modal-title" variant="h6" component="h2" className={"block-user-title"}>
                    {
                        modalValue?.title
                    }
                    <p className={'custom_close_btn'} onClick={()=>handleOpenModal()}>
                        <svg viewBox="0 0 24 24" x="1008" y="432" fit="" height="28" width="25"
                             preserveAspectRatio="xMidYMid meet" focusable="false">
                            <path
                                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                                fill="#64748b" />
                        </svg>
                    </p>
                </Typography>
            </div>
            {
                modalValue?.isGamePlay ?
                    <div className={'rejected_modal_content_text'}>
                        <p dangerouslySetInnerHTML={{ __html: modalValue?.data }} />
                    </div>
                    :
                    <div className={'rejected_modal_content_text'}>
                        <p> {modalValue?.data}</p>
                    </div>
            }

        </Box>
    )
}
export default ViewRejectedComment