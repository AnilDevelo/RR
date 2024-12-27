import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loader from "../../../../images/Loader";
import TableLoader from "hoc/CommonTable/TableLoader";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 0,
    borderRadius: "5px",
};
const DocumentOpenPopup = ({ modalValue, handleOpenModal }) => {
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        setLoader(true)
        setTimeout(() => {
            setLoader(false);
        }, 1000);
    }, [modalValue]);

    return (
        <Box sx={style} className={'document-details modal_main_popup'}>
            {loader && <TableLoader />}
            <div className={'add_admin_user_popup'}>
                <div className={'modal_popup_title mt_2 mb_2'}>
                    <h2>{`Image`}</h2>
                    <p className={'custom_close_btn'} onClick={()=>handleOpenModal()}>
                        <svg viewBox="0 0 24 24" x="1008" y="432" fit="" height="28" width="25"
                             preserveAspectRatio="xMidYMid meet" focusable="false">
                            <path
                                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                                fill="#64748b" />
                        </svg>
                    </p>
                </div>
                <div className={'document-details-images'}>
                    <div className={'document_images_section'}>
                        {
                            !loader &&
                            <img src={modalValue?.front} alt={'document img'} />
                        }
                    </div>
                    {
                        modalValue?.back &&
                        <div className={'document_images_section'}>
                            {
                                !loader &&
                                <img src={modalValue?.back} alt={'document img'} />
                            }
                        </div>
                    }
                </div>
            </div>
        </Box>
    )
}
export default DocumentOpenPopup