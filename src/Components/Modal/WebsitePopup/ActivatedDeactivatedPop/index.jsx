import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import FilledButton from "../../../FileButton";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { activeDeactiveTopWebsiteGame } from "../../../../Redux/website/action";

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
const ActivatedDeactivatedPop = ({ modalValue, handleOpenModal }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        let payload = {
            gameId: modalValue?.gameId,
            isActive: modalValue?.isActive
        }
        dispatch(activeDeactiveTopWebsiteGame(payload)).then(res => {
            if (res.data.success) {
                modalValue?.redirectApiHandler()
                setLoader(false)
                handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
            } else {
                handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message || res?.data?.msg })
            }
        })
    }
    return (
        <Box sx={style} className={'user_popup_section'}>
            <div className='sd_flex sd_justcenter '>
                <Typography id="modal-modal-title" variant="h6" component="h2" className={"block-user-title"}>
                    Do you want to {modalValue?.isActive ? 'active' : 'deactivated'} the data?
                </Typography>
            </div>
            <div className='publisher_popup'>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='form_main'>
                        <Box mb={3} className={"publisher_popup_box"}>
                            <Button className={'cancel_btn'} variant="outlined" type='reset' onClick={() => handleOpenModal()}> NO </Button>
                            <FilledButton type={'submit'} value={'Yes'} className={'submit_btn loader_css'} loading={loader} />
                        </Box>
                    </div>
                </form>
            </div>
        </Box>
    )
}
export default ActivatedDeactivatedPop