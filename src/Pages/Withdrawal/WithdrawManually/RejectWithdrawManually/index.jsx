import React, {useCallback, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import {ApproveRejectUserDepositRequest, ApproveWithdrawalManuallyRequest} from "../../../../Redux/Master/action";
import {Box, Button} from "@mui/material";
import Typography from "@mui/material/Typography";
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
const  RejectWithdrawManually = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const simpleValidator = useRef(new SimpleReactValidator());
    const [formData, setFormData] = useState();
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [loader, setLoader] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (simpleValidator.current.allValid()) {
            setLoader(true);
            let payload = {
                ...modalValue,
                rejectReason: formData
            }
            dispatch(ApproveWithdrawalManuallyRequest(payload)).then(res => {
                if (res?.data?.success) {
                    redirectApiHandler();
                    setLoader(false);
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                } else {
                    setLoader(false);
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message || res?.data?.msg })
                }
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }

    }
    return (
        <Box sx={style} className={'user_popup_section'}>
            <div className='d_flex justify_content_center'>
                <Typography id="modal-modal-title" variant="h6" component="h2" className={"block-user-title"}>
                    Do you want to reject the withdraw manually?
                </Typography>
            </div>
            <div className='publisher_popup'>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={'textarea_form_field'}>
                        <textarea rows={4}
                                  placeholder={`Reason for user deposit request`}
                                  onChange={(e) => setFormData(e.target.value)} />
                        {simpleValidator.current.message("Reason", formData, 'required')}
                    </div>
                    <div className='form_main'>
                        <Box mb={3} className={"publisher_popup_box"}>
                            <Button className={'cancel_btn'} variant="outlined" type='reset' onClick={() => handleOpenModal()}> No </Button>
                            <FilledButton type={'submit'} value={'Yes'} className={'submit_btn loader_css'} loading={loader} />
                        </Box>
                    </div>
                </form>
            </div>
        </Box>
    )
}
export default RejectWithdrawManually;