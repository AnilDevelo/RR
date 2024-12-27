import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {activeDeactivateUPITransaction} from "../../../../Redux/Master/action";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FilledButton from "../../../../Components/FileButton";

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

const ActivateDeactivateUserDepositRequest = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoader(true);
        let payload = {
            upiQrCodeId:modalValue?._id,
            isActive:!modalValue?.isActive
        }
        dispatch(activeDeactivateUPITransaction(payload)).then(res => {
            if (res.data.success) {
                setLoader(false);
                redirectApiHandler();
                handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
            } else {
                setLoader(false)
                handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message || res?.data?.msg });
            }
        });
    };

    return (
        <>
            <Box sx={style} className={'user_popup_section'}>
                <div className='d_flex justify_content_center'>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className={"block-user-title"}>
                        Do you want to  {modalValue?.isActive ? 'activate' : 'deactivate'} the UPI Transaction?
                    </Typography>
                </div>
                <div className='publisher_popup'>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className='form_main'>
                            <Box mb={3} className={"publisher_popup_box"}>
                                <Button className={'cancel_btn'} variant="outlined" type='reset' onClick={() => handleOpenModal()}> No </Button>
                                <FilledButton type={'submit'} value={'Yes'} className={'submit_btn loader_css'} loading={loader} />
                            </Box>
                        </div>
                    </form>
                </div>
            </Box>
        </>
    )
}
export default ActivateDeactivateUserDepositRequest