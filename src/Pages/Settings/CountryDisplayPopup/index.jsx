import {Box} from "@mui/material";
import React from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 0,
    borderRadius: "5px",
};
const CountryDisplayPopup = ({modalValue,handleOpenModal}) => {
    return(
        <Box sx={style}>
            <p className={'custom_close_btn'} onClick={()=>handleOpenModal()}>
                <svg viewBox="0 0 24 24" x="1008" y="432" fit="" height="28" width="25"
                     preserveAspectRatio="xMidYMid meet" focusable="false">
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                        fill="#64748b" />
                </svg>
            </p>
            <Box className={'create_headToHead_modal modal_main_popup country_display_popup add_admin_user_popup'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.title}</h2>
                </div>
                <div className={'country_availability_details'}>
                    {
                        modalValue?.countryList?.map((item, i) => {
                            return (
                                <div className={'country_availability_details_info'}>
                                    {`${i + 1}) ${item}`}
                                </div>
                            )
                        })
                    }
                </div>
            </Box>
        </Box>
    )
}
export default CountryDisplayPopup