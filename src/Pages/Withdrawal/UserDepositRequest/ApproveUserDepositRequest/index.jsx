import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {updateGameStatus, updateGameStatusActiveDeactivated} from "../../../../Redux/games/action";
import {Box, Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import FilledButton from "../../../../Components/FileButton";
import SimpleReactValidator from "simple-react-validator";
import {ApproveRejectUserDepositRequest} from "../../../../Redux/Master/action";

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

const ApproveUserDepositRequest = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const [loader, setLoader] = useState(false);
    const [formData, setFormData] = useState('');
    const simpleValidator = useRef(new SimpleReactValidator());
    const dispatch = useDispatch();
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);


    const handleSubmit = (event) => {
        event.preventDefault();
        if (simpleValidator.current.allValid()) {
        setLoader(true);
        let payload = {
            ...modalValue,
            amount:formData
        }
        dispatch(ApproveRejectUserDepositRequest(payload)).then(res => {
            if (res.data.success) {
                redirectApiHandler();
                setLoader(false);
                handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
            } else {
                setLoader(false)
                handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message || res?.data?.msg });
            }
        });
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };

    useEffect(()=>{
        if(modalValue){
            setFormData(modalValue?.amount)
        }
    },[modalValue])

    return (
        <Box sx={style} className={'user_popup_section'}>
            <div className='d_flex justify_content_center'>
                <Typography id="modal-modal-title" variant="h6" component="h2" className={"block-user-title"}>
                    Do you want to approve the user deposit request ?
                </Typography>
            </div>
            <div className='publisher_popup'>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={'user_kyc_section'}>
                        <div className={'formData'}>
                            <label>Amount <span className={'validation-star'}>*</span></label>
                            <div className={'user_kyc_section_input_filed'}>
                                <input type={'number'} placeholder={'Enter Amount'} onWheel={(e)=>e.currentTarget.blur()}  value={formData} name={'avatarName'} onChange={(e) => setFormData(e.target.value)} />
                            </div>
                            {simpleValidator.current.message("amount", formData?.toString(), 'required|mix:10')}
                        </div>
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
export default ApproveUserDepositRequest