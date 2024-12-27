import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import {
    createHelpFAQQuestionList,
    getAllFAQType,
    updateHelpFAQQuestionList
} from "../../../../Redux/HelpAndSupport/action";
import {Box} from "@mui/material";
import FilledButton from "../../../../Components/FileButton";
import DropdownMode from "../../../Games/GameDetails/GameTabDetails/LobbyTab/CreateLobby/DropdownMode";
import CommonModal from "../../../../hoc/CommonModal";
import PopComponent from "../../../../hoc/PopContent";
import FAQTypeDropdown from "./FAQTypeDropdown";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 486,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};

const AddFAQPopup = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState({ question: '', answer:'', FAQTypeId:'' });
    const [getAllTypeFAQ, setFAQType] = useState([]);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            setLoader(true);
            let payload = {
                ...formData,
                question: formData.question.trim(),
                answer: formData.answer.trim(),
            }
            if(!payload?.FAQTypeId){
                delete payload?.FAQTypeId
            }
            dispatch(createHelpFAQQuestionList(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    redirectApiHandler()
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                } else {
                    setLoader(false)
                    handleOpenModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                }
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }

    useEffect(() => {
        if (modalValue?.isEdit) {
            setFormData({ ...formData, question: modalValue?.row?.question, answer: modalValue?.row?.answer, FAQTypeId:modalValue?.row?.FAQTypeId?._id })
        }
    }, [modalValue]);

    useEffect(()=>{
        dispatch(getAllFAQType({})).then(res=>{
            setFAQType(res.data.data)
        })
    },[])

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                FAQId: modalValue?.row?._id,
                question: formData.question.trim(),
                answer: formData.answer.trim(),
            }

            if(!payload?.FAQTypeId){
                delete payload?.FAQTypeId
            }
            setLoader(true)
            dispatch(updateHelpFAQQuestionList(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    redirectApiHandler()
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                } else {
                    setLoader(false)
                    handleOpenErrorModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                }
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }

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
    return (
        <Box sx={style} className={'faq-section'}>
            <div className={'add_admin_user_popup modal_main_popup'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? "Update FAQs" : ' Add FAQs'}</h2>
                </div>
                <div className={'add_admin_user_popup_content'}>
                    <form onSubmit={ modalValue?.isEdit ? (e) => handleEditSubmit(e) :(e) => handleSubmit(e)}>
                        <div className={'user_kyc_section'}>
                            <div className={'user_kyc_section_filed'}>
                                <label>Question <span className={'validation-star'}>*</span></label>
                                <div className={'user_kyc_section_input_filed'}>
                                    <input maxLength={100} type={'text'} placeholder={'Enter Question'} value={formData?.question} onChange={(e) => setFormData({ ...formData, question: e.target.value })} />
                                </div>
                                {simpleValidator.current.message("question", formData?.question, 'required')}
                            </div>
                        </div>
                        <div className={'user_kyc_section'}>
                            <div className={'user_kyc_section_filed'}>
                                <label>Answer <span className={'validation-star'}>*</span></label>
                                <div className={"Answer"}>
                                    <textarea maxLength={100} placeholder={'Enter Answer'} rows={4} value={formData?.answer} onChange={(e) => setFormData({ ...formData, answer: e.target.value })} style={{ resize: "none" }} />
                                </div>
                                {simpleValidator.current.message("answer", formData?.answer, 'required')}
                            </div>
                        </div>
                        <div className={'formData checkbox_modal real_money_field'}>
                            <div>
                                <label>FAQs Type</label>
                            </div>
                            <div className={'select_game_option_mode'}>
                                <div className={'select_game_option'}>
                                    <FAQTypeDropdown options={getAllTypeFAQ} name={'FAQTypeId'} formData={formData} setFormData={setFormData} placeholder={"Select FAQ Type"} />
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
export default AddFAQPopup