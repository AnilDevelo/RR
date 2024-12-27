import {Box} from "@mui/material";
import {jsonToFormData, profileImages} from "../../../../../utils";
import user from "../../../../../assets/images/avatar.png";
import icon_plus from "../../../../../assets/images/plus.svg";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import FilledButton from "../../../../../Components/FileButton";
import CommonModal from "../../../../../hoc/CommonModal";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../hoc/PopContent";
import { addFooterIcon, editFooterIcon } from "Redux/Design/action";

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

const AddFooterPopup = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData, setFormData] = useState({ footerIconImage: '', title: '',isImageUpdated: false });

    const changeHandler = (e) => {
        const { value, name } = e.target;
        setFormData({
            ...formData,
            [name]: value?.replace(/^\s+/, '')
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
                footerIconImage: formData?.footerIconImage,
                title: formData?.title.trim(),
            }
            setLoader(true)
            dispatch(addFooterIcon(jsonToFormData(payload))).then((res) => {
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
        setFormData({ ...formData, footerIconImage: e.target.files[0], isImageUpdated: true })
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                loginScreenFooterId: modalValue?.row?._id,
                title: formData?.title.trim(),
            }

            if (!payload.isImageUpdated) { delete payload.footerIconImage }
            setLoader(true)
            dispatch(editFooterIcon(jsonToFormData(payload))).then((res) => {
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
                title: modalValue?.row?.title,
                footerIconImage: modalValue?.row?.footerIconImage,
            })
        }
    },[modalValue?.isEdit])

    return(
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Footer Icon' : 'Add New Footer Icon'}</h2>
                </div>
                <div className={'add_admin_user_popup_content mt_15'}>
                    <form onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className={'level_popup_form_field '}>
                            <div className='form_group profile new_game_section profile-image-dropdown'>
                                <div className='user_profile'>
                                    <div className='user_profile_pic'>
                                        {profileImages(formData?.footerIconImage, user)}
                                        {
                                            !formData?.footerIconImage &&
                                            <span className='addnew'>
                                            <img src={icon_plus} alt='' />
                                            <input type='file' accept=".jpg, .jpeg, .png" name='labelIcon' id='' onChange={(e) => handleIconChange(e)} />
                                        </span>
                                        }

                                    </div>
                                    <label htmlFor='' className='profile_label'>Footer Icon <span className={'validation-star'}>*</span></label>
                                </div>
                                {simpleValidator.current.message("footer Icon", formData?.footerIconImage, 'required')}
                                {
                                    formData?.footerIconImage &&
                                    <div className={'close-icon'} onClick={()=> setFormData({...formData,footerIconImage:''})}>
                                        <CloseSharpIcon/>
                                    </div>
                                }
                            </div>
                            <div className={'level_popup_form_field_left'}>
                                <div className={'user_kyc_section'}>
                                    <div className={'user_kyc_section_filed'}>
                                        <label>Title <span className={'validation-star'}>*</span></label>
                                        <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                            <input style={{paddingRight: "52px"}} type={'text'} maxLength={40} placeholder={'Enter Name'} value={formData?.title} name={'title'} onChange={(e) => changeHandler(e)} />
                                            <span>{formData?.title?.length}/40</span>
                                        </div>
                                        {simpleValidator.current.message("title", formData?.title, 'required|min:2')}
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
};

export default AddFooterPopup;