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
import {createReferAndEarnSteps, updateReferAndEarnSteps} from "../../../../../Redux/Design/action";

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

const AddReferAndEarnDetailPopUp = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData, setFormData] = useState({ referAndEarnStepsTitle: '', referAndEarnStepsImage: '',isImageUpdated: false  });

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
                referAndEarnStepsImage: formData?.referAndEarnStepsImage,
                referAndEarnStepsTitle: formData?.referAndEarnStepsTitle.trim(),
            }
            setLoader(true)
            dispatch(createReferAndEarnSteps(jsonToFormData(payload))).then((res) => {
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
        setFormData({ ...formData, referAndEarnStepsImage: e.target.files[0], isImageUpdated: true })
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                referAndEarnStepsId: modalValue?.row?._id,
                referAndEarnStepsTitle: formData?.referAndEarnStepsTitle.trim(),
            }

            if (!payload.isImageUpdated) { delete payload.referAndEarnStepsImage }
            setLoader(true)
            dispatch(updateReferAndEarnSteps(jsonToFormData(payload))).then((res) => {
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
                referAndEarnStepsTitle: modalValue?.row?.referAndEarnStepsTitle,
                referAndEarnStepsImage: modalValue?.row?.referAndEarnStepsImage,
            })
        }
    },[modalValue?.isEdit])

    return(
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Refer And Earn Icon' : 'Add New Refer And Earn Icon'}</h2>
                </div>
                <div className={'add_admin_user_popup_content mt_15'}>
                    <form onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className={'level_popup_form_field '}>
                            <div className='form_group profile new_game_section profile-image-dropdown'>
                                <div className='user_profile'>
                                    <div className='user_profile_pic'>
                                        {profileImages(formData?.referAndEarnStepsImage, user)}
                                        {
                                            !formData?.referAndEarnStepsImage &&
                                            <span className='addnew'>
                                            <img src={icon_plus} alt='' />
                                            <input type='file' title="" name='labelIcon' id='' onChange={(e) => handleIconChange(e)} />
                                        </span>
                                        }

                                    </div>
                                    <label htmlFor='' className='profile_label'>Icon <span className={'validation-star'}>*</span></label>
                                </div>
                                {simpleValidator.current.message("icon", formData?.referAndEarnStepsImage, 'required')}
                                {
                                    formData?.referAndEarnStepsImage &&
                                    <div className={'close-icon'} onClick={()=> setFormData({...formData,referAndEarnStepsImage:''})}>
                                        <CloseSharpIcon/>
                                    </div>
                                }
                            </div>
                            <div className={'level_popup_form_field_left'}>
                                <div className={'user_kyc_section'}>
                                    <div className={'user_kyc_section_filed'}>
                                        <label>Description <span className={'validation-star'}>*</span></label>
                                        <div className={'user_kyc_section_input_filed'}>
                                            <input maxLength={100} type={'text'} placeholder={'Enter Description'} value={formData?.referAndEarnStepsTitle} name={'referAndEarnStepsTitle'} onChange={(e) => changeHandler(e)} />
                                        </div>
                                        {simpleValidator.current.message("description", formData?.referAndEarnStepsTitle, 'required')}
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

export default AddReferAndEarnDetailPopUp;