import { useDispatch } from "react-redux";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../hoc/PopContent";
import {addBankList, updateBank} from "../../../../Redux/Master/action";
import { jsonToFormData, profileImages } from "../../../../utils";
import { Box } from "@mui/material";
import user from "../../../../assets/images/avatar.png";
import icon_plus from "../../../../assets/images/plus.svg";
import FilledButton from "../../../../Components/FileButton";
import CommonModal from "../../../../hoc/CommonModal";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";

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

const AddBankAndUpi = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState({
        bankName: '',
        bankAndUPIIcon: '',
        isBankIconUpdated: false,
        isPrimary:false
    });
    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            const trimmedBankName = formData.bankName.trim();
            let payload = {
                ...formData,
                bankName: trimmedBankName,
                bankId: modalValue?.row?._id
            }
            if (!payload?.isBankIconUpdated) {
                delete payload?.bankAndUPIIcon
            }
            setLoader(true)
            dispatch(updateBank(jsonToFormData(payload))).then(res => {
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
    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData
            }
            delete payload?.isBankIconUpdated;

            setLoader(true)
            dispatch(addBankList(jsonToFormData(payload))).then(res => {
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

    useEffect(() => {
        if (modalValue?.isEdit) {
            setFormData({
                ...formData,
                bankAndUPIIcon: modalValue?.row?.bankIcon,
                bankName: modalValue?.row?.bankName,
                isPrimary:modalValue?.row?.isPrimary
            })
        }
    }, [modalValue?.isEdit]);

    return (
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup bank_upi_section lobby_section_details'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Withdrawal Bank' : 'Add New Withdrawal Bank'}</h2>
                </div>
                <div className={'add_admin_user_popup_content mt_15'}>
                    <form onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className={'level_popup_form_field'}>
                            <div className='form_group profile new_game_section profile-image-dropdown bank-icon-details '>
                                <div className='user_profile'>
                                    <div className='user_profile_pic'>
                                        {profileImages(formData?.bankAndUPIIcon, user)}
                                        {
                                            !formData?.bankAndUPIIcon &&
                                            <span className='addnew'>
                                            <img src={icon_plus} alt='' />
                                            <input type='file' title="" accept=".jpg, .jpeg, .png" name='bankAndUPIIcon' id='' onChange={(e) => {
                                                if(e.target.files[0]?.type?.includes('image/') &&  e.target.files[0].type !== 'image/gif'){
                                                    setFormData({ ...formData, bankAndUPIIcon: e.target.files[0], isBankIconUpdated: true })
                                                }else {
                                                    handleOpenErrorModal('CommonPop', { header: "Error", body: 'Please Enter Only Image File' });
                                                }

                                            }} />
                                        </span>
                                        }
                                    </div>
                                    <label htmlFor='' className='profile_label'> Bank Icon <span className={'validation-star'}>*</span></label>
                                </div>
                                {simpleValidator.current.message("bankIcon", formData?.bankAndUPIIcon, 'required')}
                                {
                                    formData?.bankAndUPIIcon &&
                                    <div className={'close-icon'} onClick={()=> setFormData({...formData,bankAndUPIIcon:'',})}>
                                        <CloseSharpIcon/>
                                    </div>
                                }
                            </div>
                            <div className={'level_popup_form_field_left'}>
                                <div className={'user_kyc_section'}>
                                    <div className={'user_kyc_section_filed'}>
                                        <label>Bank Name <span className={'validation-star'}>*</span></label>
                                        <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                            <input type={'text'} value={formData?.bankName} maxLength={20} name={'bankName'} onChange={(e) => changeHandler(e)} />
                                            <span>{formData?.bankName?.length}/20</span>
                                        </div>
                                        {simpleValidator.current.message("bankName", formData?.bankName, 'required')}
                                    </div>
                                </div>
                                <div className={'dropdown_content_list_field'}>
                                    <input name={`isPrimary`}  type={'checkbox'} checked={formData?.isPrimary} onChange={(e)=>setFormData({...formData, isPrimary: e.target?.checked})} />
                                    <label htmlFor={`setAsPrimary`}>Set As Primary</label>
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
export default AddBankAndUpi