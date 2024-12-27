import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../hoc/PopContent";
import {addReasonReport, createAvatarData, editAvatarData, updateReasonReport} from "../../../../Redux/Avatar/action";
import {jsonToFormData, profileImages} from "../../../../utils";
import {Box} from "@mui/material";
import user from "../../../../assets/images/avatar.png";
import icon_plus from "../../../../assets/images/plus.svg";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import FilledButton from "../../../../Components/FileButton";
import CommonModal from "../../../../hoc/CommonModal";

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

const AddReportReason = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData, setFormData] = useState({ reportReason: '' });

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
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData
            }
            setLoader(true)
            dispatch(addReasonReport(payload)).then((res) => {
                if (res.data.success) {
                    setLoader(false);
                    redirectApiHandler()
                    handleOpenModal('CommonPop', { header: "Success", body: res.data.message })
                } else {
                    setLoader(false)
                    handleOpenModal('CommonPop', { header: "Error", body: res.data.message || res?.data?.msg })
                }
            });
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                reportReasonId:modalValue?.row?._id
            }
            setLoader(true)
            dispatch(updateReasonReport(payload)).then((res) => {
                if (res.data.success) {
                    setLoader(false);
                    redirectApiHandler()
                    handleOpenModal('CommonPop', { header: "Success", body: res.data.message })
                } else {
                    setLoader(false)
                    handleOpenModal('CommonPop', { header: "Error", body: res.data.message || res?.data?.msg })
                }
            });
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };

    useEffect(()=>{
        if(modalValue?.isEdit){
            setFormData({
                ...formData,
                reportReason: modalValue?.row?.reportReason
            })
        }
    },[modalValue?.isEdit]);

    return(
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup add_avatar_section lobby_section_details'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Report Reason' : 'Add Report Reason'}</h2>
                </div>
                <div className={'add_admin_user_popup_content mt_15'}>
                    <form onSubmit={modalValue?.isEdit ? (e)=>handleEditSubmit(e):(e) => handleSubmit(e)}>
                        <div className={'level_popup_form_field '}>
                            <div className={'w_100'}>
                                <div className={'user_kyc_section'}>
                                    <div className={'user_kyc_section_filed'}>
                                        <label>Reason <span className={'validation-star'}>*</span></label>
                                        <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                            <input type={'text'} placeholder={'Enter Reason'} maxLength={100} value={formData?.reportReason} name={'reportReason'} onChange={(e) => setFormData({...formData, reportReason:e.target.value})} />
                                            <span>{formData?.reportReason?.length}/100</span>
                                        </div>
                                        {simpleValidator.current.message("reportReason", formData?.reportReason, 'required')}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'formData_btn'}>
                            <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                            <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'btn loader_css'} loading={loader} />
                        </div>
                    </form>
                </div>
            </div>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenErrorModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenErrorModal} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Box>
    )
}
export default AddReportReason