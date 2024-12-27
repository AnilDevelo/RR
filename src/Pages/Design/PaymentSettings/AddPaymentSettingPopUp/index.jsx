import {Box} from "@mui/material";
import {jsonToFormData, profileImages} from "../../../../utils";
import user from "../../../../assets/images/avatar.png";
import icon_plus from "../../../../assets/images/plus.svg";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import FilledButton from "../../../../Components/FileButton";
import CommonModal from "../../../../hoc/CommonModal";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../hoc/PopContent";
import { createPaymentSettings, createReferAndEarnStepsInReferAndEarn, updateHomeScreenFooterIcon, updatePaymentSettingsData, updateReferAndEarnData } from "Redux/Design/action";

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

const AddPaymentSettingPopUp = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
   const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData, setFormData] = useState({ paymentModeTitle: '', paymentSettingModeIcon: '',ispaymentModeIconUpdated: false  });

    const changeHandler = (e) => {
        const { value, name } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    };

    
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
                paymentSettingModeIcon: formData?.paymentSettingModeIcon,
                paymentModeTitle: formData?.paymentModeTitle.trim(),
            }
            setLoader(true)
            dispatch(createPaymentSettings(jsonToFormData(payload))).then((res) => {
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

    const handleIconChange = (e) => {
        setFormData({ ...formData, paymentSettingModeIcon: e.target.files[0], ispaymentModeIconUpdated: true })
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                paymentModeIconId: modalValue?.row?._id,
                paymentModeTitle: formData?.paymentModeTitle.trim(),
            }

            if (!payload.ispaymentModeIconUpdated) { delete payload.paymentSettingModeIcon }
            setLoader(true)
            dispatch(updatePaymentSettingsData(jsonToFormData(payload))).then((res) => {
                if (res.data.success) {
                    redirectApiHandler();
                    setLoader(false)
                    handleOpenModal('CommonPop', { header: "Success", body: res.data.message });
                } else {
                    setLoader(false)
                    handleOpenModal('CommonPop', { header: "Error", body: res.data.message || res?.data?.msg });
                }
            }).catch(e => {
                setLoader(false)
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }
    useEffect(()=>{
        if(modalValue?.isEdit){
            setFormData({
                ...formData,
                paymentModeTitle: modalValue?.row?.paymentModeTitle,
                paymentSettingModeIcon: modalValue?.row?.paymentModeIcon,
            })
        }
    },[modalValue?.isEdit])
    return(
        <Box sx={style}>
            <div className={'modal_main_popup'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Payment Settings' : 'Add New Payment Settings'}</h2>
                </div>
                <div className={'add_admin_user_popup_content mt_15'}>
                    <form onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className={'level_popup_form_field '}>
                            <div className='form_group profile new_game_section profile-image-dropdown'>
                                <div className='user_profile' style={{width:"102px"}}>
                                    <div className='user_profile_pic'>
                                        {profileImages(formData?.paymentSettingModeIcon, user)}
                                        {
                                            !formData?.paymentSettingModeIcon &&
                                            <span className='addnew'>
                                            <img src={icon_plus} alt='' />
                                            <input accept=".jpg, .jpeg, .png" type='file' name='labelIcon' id='' onChange={(e) => handleIconChange(e)} />
                                        </span>
                                        }

                                    </div>
                                    <label htmlFor='' className='profile_label'>Payment Icon <span className={'validation-star'}>*</span></label>
                                </div>
                                {simpleValidator.current.message("payment icon", formData?.paymentSettingModeIcon, 'required')}
                                {
                                    formData?.paymentSettingModeIcon &&
                                    <div className={'close-icon'} onClick={()=> setFormData({...formData,paymentSettingModeIcon:''})}>
                                        <CloseSharpIcon/>
                                    </div>
                                }
                            </div>
                            <div className={'level_popup_form_field_left'} style={{marginTop:"1rem"}}>
                                <div className={'user_kyc_section'}>
                                    <div className={'user_kyc_section_filed'}>
                                        <label>Title <span className={'validation-star'}>*</span></label>
                                        <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                            <input style={{paddingRight: "52px"}} type={'text'} placeholder={'Enter Name'} value={formData?.paymentModeTitle} name={'paymentModeTitle'} onChange={(e) => changeHandler(e)} maxLength={40}/>
                                            <span>{formData?.paymentModeTitle?.length}/40</span>
                                        </div>
                                        {simpleValidator.current.message("title", formData?.paymentModeTitle, 'required')}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'formData_btn d_flex_end'}>
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
};

export default AddPaymentSettingPopUp;