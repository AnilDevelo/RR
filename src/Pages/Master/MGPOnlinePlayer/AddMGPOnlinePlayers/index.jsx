import {Box} from "@mui/material";
import FilledButton from "../../../../Components/FileButton";
import CommonModal from "../../../../hoc/CommonModal";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../hoc/PopContent";
import {createGameNumberOfPlayers} from "../../../../Redux/games/action";
import {createMGPOnlinePlayer} from "../../../../Redux/Master/action";


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


const AddMGPOnlinePlayers = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [, updateState] = useState({});
    const simpleValidator = useRef(new SimpleReactValidator());
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState({
        isDummyPlayer:false,
        dummyPlayerStartPoint:0
    })
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];

    const handleOpenErrorModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData?.isDummyPlayer){
            simpleValidator.current.fields.dummyPlayerStartPoint = true
        }
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData
            }
            setLoader(true);
            dispatch(createMGPOnlinePlayer(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    redirectApiHandler();
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                } else {
                    setLoader(false)
                    handleOpenErrorModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg });
                }
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }


    const handleOpenModalError = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };
    useEffect(() => {
        if (modalValue?.isEdit) {
            setFormData({
                ...formData,
                isDummyPlayer: modalValue?.row?.isDummyPlayer,
                dummyPlayerStartPoint: modalValue?.row?.dummyPlayerStartPoint,
            })
        }
    }, [modalValue]);
    return(
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup genre_popup_details'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Edit MGP Online Players' : `Add MGP Online Players`}</h2>
                </div>
                <div className={'add_admin_user_popup_content'}>
                    <form method={'POST'} onSubmit={ (e) => handleSubmit(e)}>
                        <div className={'common_checkbox_details'}>
                            <label>Is Dummy Player?</label>
                            <div className={'game_mode_btn'}>
                                <div className={'game_mode_btn_option yes_radio_btn'}>
                                    <input type={'radio'} name={'isDummyPlayer'} checked={formData?.isDummyPlayer} onChange={(e) => setFormData({ ...formData, isDummyPlayer: true })} />
                                    <label>Yes</label>
                                </div>
                                <div className={'game_mode_btn_option no_radio_btn'}>
                                    <input type={'radio'} name={'isDummyPlayer'} checked={!formData?.isDummyPlayer} onChange={(e) => setFormData({ ...formData, isDummyPlayer: false })} />
                                    <label>No</label>
                                </div>
                            </div>
                        </div>

                        {
                            formData?.isDummyPlayer &&
                            <div className="formData mt_15  ">
                                <label>Start Point <span className={'validation-star'}>*</span> </label>
                                <div className="emailWrap">
                                    <input type="number" onWheel={(e)=> e?.currentTarget?.blur()} name='dummyPlayerStartPoint' value={formData?.dummyPlayerStartPoint} placeholder={'Enter Start Point'} onChange={(e) => setFormData({ ...formData, dummyPlayerStartPoint: e.target.value })} />
                                </div>
                                {simpleValidator.current.message("dummyPlayerStartPoint", formData?.dummyPlayerStartPoint?.toString(), 'required|min:1|max:10|numeric')}
                            </div>
                        }

                        <div className={'formData_btn'}>
                            <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                            <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'btn loader_css'} loading={loader} />
                        </div>
                    </form>
                </div>
            </div>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModalError}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModalError} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Box>
    )
}
export default AddMGPOnlinePlayers