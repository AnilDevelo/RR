import React, {useEffect, useState} from "react";
import Box from "@material-ui/core/Box";
import {CircularProgress} from "@mui/material";
import Clip from "../AddTicketsVideo/VideoPlayer";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height:400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};

const ViewVideoImage = ({modalValue,handleOpenModal}) => {
    const [loader,setLoader] = useState(false)

    useEffect(()=>{
        setLoader(true)
        setTimeout(()=>{
            setLoader(false)
        },500)
    },[]);

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
            <div className={'ticket_video_image_section'}>
                <h2>View Video</h2>
                {
                    loader ?
                    <div className={'loader_ticket_video'}>
                        <div className={'btn-loader loader_css'}>
                            <CircularProgress />
                        </div>
                    </div>
                        :
                        <div className={'ticket_show'}>
                            {
                                modalValue?.isImage ?
                                    <img src={modalValue?.ticketVideoImage} alt={'images'}/>
                                    :
                                    <Clip url={modalValue?.ticketVideo}/>
                            }

                        </div>
                }

            </div>
        </Box>
    )
}
export default ViewVideoImage