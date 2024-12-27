import React, {useCallback, useEffect, useRef, useState} from "react";
import {Box} from "@mui/material";
import {jsonToFormData, profileImages} from "../../../../../utils";
import user from "../../../../../assets/images/avatar.png";
import icon_plus from "../../../../../assets/images/plus.svg";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import LobbyTypeDropdown from "../../../../Master/LobbyLabel/AddLobbyLabel/LobbyTypeDropdown";
import FilledButton from "../../../../../Components/FileButton";
import CommonModal from "../../../../../hoc/CommonModal";
import {useDispatch} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../hoc/PopContent";
import {
    addLobbyLabelList,
    createWithdrawalProcessingFees,
    updateWithdrawalProcessingFees
} from "../../../../../Redux/Master/action";
import PercentageDropdown from "../../../../../Components/Dropdown/PercentageDropdown";

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

const AddWithdrawalProcessingFees = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData, setFormData] = useState({
        percentage: '',
        start: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData
            }
            setLoader(true)
            dispatch(createWithdrawalProcessingFees(payload)).then(res => {
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
    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                processingId:modalValue?.row?._id
            }
            setLoader(true)
            dispatch(updateWithdrawalProcessingFees(payload)).then(res => {
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

    useEffect(()=>{
        if(modalValue?.isEdit){
            setFormData({
                ...formData,
                start: modalValue?.row?.start,
                percentage: modalValue?.row?.percentage
            })
        }
    },[modalValue?.isEdit])

    return(
        <>
            <Box sx={style}>
                <div className={'add_admin_user_popup modal_main_popup lobby_section_details'}>
                    <div className={'modal_popup_title'}>
                        <h2>{modalValue?.isEdit ? 'Update Withdrawal Processing Fees' : 'Add Withdrawal Processing Fee'}</h2>
                    </div>
                    <div className={'add_admin_user_popup_content mt_15'}>
                        <form onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                            <div className={'level_popup_form_field_left'}>
                                <div className={'user_kyc_section'}>
                                    <div className={'user_kyc_section_filed'}>
                                        <label>Start Amount <span className={'validation-star'}>*</span></label>
                                        <div className={'user_kyc_section_input_filed'}>
                                        <input
                                            type={'text'}
                                            maxLength={10}    
                                            placeholder={'Enter Start Amount'}
                                            value={formData?.start}
                                            name={'start'}
                                            onChange={(e) => {
                                                const inputVal = e.target.value;
                                                if (/^[1-9][0-9]*$/.test(inputVal) || inputVal === "") {
                                                    setFormData({ ...formData, start: inputVal });
                                                }
                                            }}
                                        />
                                        </div>
                                        {simpleValidator.current.message("startAmount", formData?.start?.toString(), 'required|min:0|max:10')}
                                    </div>
                                </div>
                                <div className={'formData checkbox_modal real_money_field'}>
                                    <div>
                                        <label>Enter Withdrawal Processing Fee Percentage (%) <span className={'validation-star'}>*</span></label>
                                    </div>
                                    <div className={'select_game_option_mode'}>
                                        <div className={'select_game_option withdrawal_processing_section'}>
                                        <input
                                            type={'text'}
                                            placeholder={'Enter Withdrawal Processing Fee'}
                                            value={formData?.percentage}
                                            name={'percentage'}
                                            onChange={(e) => {
                                                const { name, value } = e.target;
                                                let numberRegex = /^(?!00)[0-9]*(\.[0-9]{0,2})?$/;

                                                // Check if the entered value is empty or a number within the range of 0 to 100
                                                if (value === '' || (numberRegex.test(value) && parseFloat(value) >= 0 && parseFloat(value) <= 100)) {
                                                setFormData({ ...formData, percentage: value });
                                                }
                                            }}
                                            />
                                            {simpleValidator.current.message("Withdrawal Processing Fee Percentage", formData?.percentage, 'required')}
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
        </>
    )
}
export default AddWithdrawalProcessingFees