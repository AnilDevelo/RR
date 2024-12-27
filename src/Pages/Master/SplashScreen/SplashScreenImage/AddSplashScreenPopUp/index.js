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
import { addSplashScreenImage, editSplashScreenImage } from "Redux/Master/action";

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

const AddSplashScreenPopUp = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData, setFormData] = useState({ splashScreenImage: '', title: '',isImageUpdated: false, description:"" });

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
                splashScreenImage: formData?.splashScreenImage,
                title: formData?.title,
                description: formData?.description
            }
            setLoader(true)
            dispatch(addSplashScreenImage(jsonToFormData(payload))).then((res) => {
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
        setFormData({ ...formData, splashScreenImage: e.target.files[0], isImageUpdated: true })
    }

    // const handleIconChange = (e) => {
    //     const imageFile = e.target.files[0];
        
    //     if (imageFile) {
    //         const img = new Image();
    //         img.src = URL.createObjectURL(imageFile);
    //         img.onload = () => {
    //             if (img.width === 512 && img.height === 512) {
    //                 setFormData({
    //                     ...formData,
    //                     splashScreenImage: imageFile,
    //                     isImageUpdated: true,
    //                 });
    //             } else {
    //                 handleOpenModal("CommonPop", {
    //                     header: "Error",
    //                     body: "The width and height of the image should be  512 * 512 size.",
    //                 });
    //             }
    //         };
    //     }
    // };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                splashScreenImageId : modalValue?.row?._id
            }

            if (!payload.isImageUpdated) { delete payload.splashScreenImage }
            setLoader(true)
            dispatch(editSplashScreenImage(jsonToFormData(payload))).then((res) => {
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
                description: modalValue?.row?.description,
                splashScreenImage: modalValue?.row?.splashScreenImage,
            })
        }
    },[modalValue?.isEdit])

    return(
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Splash Screen Image' : 'Add Splash Screen Image'}</h2>
                </div>
                <div className={'add_admin_user_popup_content mt_15'}>
                    <form onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className={'level_popup_form_field '}>
                            <div className='form_group profile new_game_section profile-image-dropdown'>
                                <div className='user_profile'>
                                    <div className='user_profile_pic'>
                                        {profileImages(formData?.splashScreenImage, user)}
                                        {
                                            !formData?.splashScreenImage &&
                                            <span className='addnew'>
                                            <img src={icon_plus} alt='' />
                                            <input type='file' title="" name='labelIcon' id='' onChange={(e) => handleIconChange(e)} />
                                        </span>
                                        }

                                    </div>
                                    <label htmlFor='' className='profile_label'>Splash Screen Icon <br/><span className={'size-validation'}>(512*512 size)</span> <span className={'validation-star'}>*</span></label>
                                </div>
                                {simpleValidator.current.message("Splash Screen Icon", formData?.splashScreenImage, 'required')}
                                {
                                    formData?.splashScreenImage &&
                                    <div className={'close-icon'} onClick={()=> setFormData({...formData,splashScreenImage:''})}>
                                        <CloseSharpIcon/>
                                    </div>
                                }
                            </div>
                            <div className={'level_popup_form_field_left'}>
                                <div className={'user_kyc_section'}>
                                    <div className={'user_kyc_section_filed'}>
                                        <label>Title <span className={'validation-star'}>*</span></label>
                                        <div className={'user_kyc_section_input_filed'}>
                                            <input type={'text'} maxLength={50} placeholder={'Enter Name'} value={formData?.title} name={'title'} onChange={(e) => changeHandler(e)} />
                                        </div>
                                        {simpleValidator.current.message("title", formData?.title, 'required')}
                                    </div>
                                </div>
                            </div>
                            <div className={'level_popup_form_field_left'}>
                                <div className={'user_kyc_section'}>
                                    <div className={'user_kyc_section_filed'}>
                                        <label>Description <span className={'validation-star'}>*</span></label>
                                        <div className={'user_kyc_section_input_filed'}>
                                            <input type={'text'} maxLength={50} placeholder={'Enter Description'} value={formData?.description} name={'description'} onChange={(e) => changeHandler(e)} />
                                        </div>
                                        {simpleValidator.current.message("description", formData?.description, 'required')}
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

export default AddSplashScreenPopUp;