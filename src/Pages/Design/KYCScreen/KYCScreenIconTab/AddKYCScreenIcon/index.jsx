import {useDispatch} from "react-redux";
import React, {useCallback, useEffect, useRef, useState} from "react";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../hoc/PopContent";
import {jsonToFormData, profileImages} from "../../../../../utils";
import {Box} from "@mui/material";
import user from "../../../../../assets/images/avatar.png";
import icon_plus from "../../../../../assets/images/plus.svg";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import FilledButton from "../../../../../Components/FileButton";
import CommonModal from "../../../../../hoc/CommonModal";
import {createKYCScreenIcon, updateKYCScreenIcon} from "../../../../../Redux/Design/action";


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 650,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};
const AddKYCScreenIcon = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData, setFormData] = useState({
        KYCIconImage: '',
        KYCTitle: '',
        KYCDescription: '',
        isImageUpdated: false
    });

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
                ...formData,
                KYCTitle:formData.KYCTitle.trim(),
                KYCDescription:formData.KYCDescription.trim(),
            }
            setLoader(true)
            dispatch(createKYCScreenIcon(jsonToFormData(payload))).then((res) => {
                if (res.data.statusCode === 200 && res.data.success) {
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
        setFormData({ ...formData, KYCIconImage: e.target.files[0], isImageUpdated: true })
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                KYCScreenIconId: modalValue?.row?._id,
                KYCTitle:formData.KYCTitle.trim(),
                KYCDescription:formData.KYCDescription.trim(),
            }
            if(!formData?.isImageUpdated){
                delete payload?.KYCIconImage
            }
            setLoader(true)
            dispatch(updateKYCScreenIcon(jsonToFormData(payload))).then((res) => {
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
                KYCIconImage: modalValue?.row?.KYCIconImage,
                KYCTitle: modalValue?.row?.KYCTitle,
                KYCDescription: modalValue?.row?.KYCDescription
            })
        }
    },[modalValue?.isEdit])

    return(
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup add_avatar_section lobby_section_details'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update KYC Screen Icon' : 'Add KYC Screen Icon'}</h2>
                </div>
                <div className={'add_admin_user_popup_content mt_15'}>
                    <form onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className={'level_popup_form_field '}>
                            <div className='form_group profile new_game_section profile-image-dropdown'>
                                <div className='user_profile'>
                                    <div className='user_profile_pic'>
                                        {profileImages(formData?.KYCIconImage, user)}
                                        {
                                            !formData?.KYCIconImage &&
                                            <span className='addnew'>
                                            <img src={icon_plus} alt='' />
                                            <input type='file' accept=".jpg, .jpeg, .png" name='labelIcon' id='' onChange={(e) => handleIconChange(e)} />
                                        </span>
                                        }

                                    </div>
                                    <label htmlFor='' className='profile_label'>KYC Icon <span className={'validation-star'}>*</span></label>
                                </div>
                                {simpleValidator.current.message("kyc icon", formData?.KYCIconImage, 'required')}
                                {
                                    formData?.KYCIconImage &&
                                    <div className={'close-icon'} onClick={()=> setFormData({...formData,KYCIconImage:'',isImageUpdated: false})}>
                                        <CloseSharpIcon/>
                                    </div>
                                }
                            </div>
                            <div className={'level_popup_form_field_left'}>
                                <div className={'user_kyc_section'}>
                                    <div className={'user_kyc_section_filed'}>
                                        <label>Title <span className={'validation-star'}>*</span></label>
                                        <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                            <input type={'text'} placeholder={'Enter KYC Title'} maxLength={20} value={formData?.KYCTitle} name={'KYCTitle'} onChange={(e) => changeHandler(e)} />
                                            <span>{formData?.KYCTitle?.length}/20</span>
                                        </div>
                                        {simpleValidator.current.message("title", formData?.KYCTitle, 'required')}
                                    </div>
                                </div>
                                <div className={'user_kyc_section'}>
                                    <div className={'user_kyc_section_filed'}>
                                        <label>Description <span className={'validation-star'}>*</span></label>
                                        <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                            <input type={'text'} placeholder={'Enter KYC Description'} maxLength={20} value={formData?.KYCDescription} name={'KYCDescription'} onChange={(e) => changeHandler(e)} />
                                            <span>{formData?.KYCDescription?.length}/20</span>
                                        </div>
                                        {simpleValidator.current.message("description", formData?.KYCDescription, 'required')}
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
export default AddKYCScreenIcon