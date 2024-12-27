import {Box} from "@mui/material";
import React from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 850,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};

const ViewSandboxTDSForm16A = ({ modalValue, handleOpenModal }) => {
    return(
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup add_avatar_section lobby_section_details'}>
                <div className={'modal_popup_title'}>
                    <h2>{'View Signed URL'}</h2>
                </div>
                <div className={'mt_2'}>
                    <div className={'signed_url_box d_flex role_field_id mt_1'}>
                        <div>https://s3.ap-south-1.amazonaws.com/form16a.tds-compliance.sandbox.co.in/AHMJ12345A_Q2_2022-23_1.zip</div>
                        <span className={'edit_btn edit-btn-action'}><a href={`https://s3.ap-south-1.amazonaws.com/form16a.tds-compliance.sandbox.co.in/AHMJ12345A_Q2_2022-23_1.zip`} className={'edit_btn edit-btn-action'} target={'_blank'} >Download</a></span>
                    </div>
                    <div className={'signed_url_box d_flex role_field_id mt_1'}>
                        <div>https://s3.ap-south-1.amazonaws.com/form16a.tds-compliance.sandbox.co.in/AHMJ12345A_Q2_2022-23_2.zip</div>
                        <span className={'edit_btn edit-btn-action'}><a href={`https://s3.ap-south-1.amazonaws.com/form16a.tds-compliance.sandbox.co.in/AHMJ12345A_Q2_2022-23_1.zip`} className={'edit_btn edit-btn-action'} target={'_blank'} >Download</a></span>
                    </div>
                </div>

            </div>
        </Box>
    )
}
export default ViewSandboxTDSForm16A