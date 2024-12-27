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
import {createWalletHelpScreen, updateWalletHelpScreen} from "../../../../../Redux/Design/action";

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

const AddWalletScreenIconPopUp = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData, setFormData] = useState({ walletHelpScreenIconTitle: '', walletHelpScreenIconImage: '',isWalletHelpScreenIconImageUpdated: false  });

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
                walletHelpScreenIconImage: formData?.walletHelpScreenIconImage,
                walletHelpScreenIconTitle: formData?.walletHelpScreenIconTitle.trim(),
            }
            setLoader(true)
            dispatch(createWalletHelpScreen(jsonToFormData(payload))).then((res) => {
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
        setFormData({ ...formData, walletHelpScreenIconImage: e.target.files[0], isWalletHelpScreenIconImageUpdated: true })
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                walletHelpScreenIconId: modalValue?.row?._id,
                walletHelpScreenIconTitle: formData?.walletHelpScreenIconTitle.trim(),
            }
            if (!payload.isWalletHelpScreenIconImageUpdated) { delete payload.walletHelpScreenIconImage }
            setLoader(true)
            dispatch(updateWalletHelpScreen(jsonToFormData(payload))).then((res) => {
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
                walletHelpScreenIconTitle: modalValue?.row?.walletHelpScreenIconTitle,
                walletHelpScreenIconImage: modalValue?.row?.walletHelpScreenIconImage,
            })
        }
    },[modalValue?.isEdit])

    return(
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Wallet Help Screen' : 'Add New Wallet Help Screen'}</h2>
                </div>
                <div className={'add_admin_user_popup_content mt_15'}>
                    <form onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className={'level_popup_form_field '}>
                            <div className='form_group profile new_game_section profile-image-dropdown'>
                                <div className='user_profile'>
                                    <div className='user_profile_pic'>
                                        {profileImages(formData?.walletHelpScreenIconImage, user)}
                                        {
                                            !formData?.walletHelpScreenIconImage &&
                                            <span className='addnew'>
                                            <img src={icon_plus} alt='' />
                                            <input accept=".jpg, .jpeg, .png" type='file' name='labelIcon' id='' onChange={(e) => handleIconChange(e)} />
                                        </span>
                                        }

                                    </div>
                                    <label htmlFor='' className='profile_label'>Wallet Icon <span className={'validation-star'}>*</span></label>
                                </div>
                                {simpleValidator.current.message("wallet icon", formData?.walletHelpScreenIconImage, 'required')}
                                {
                                    formData?.walletHelpScreenIconImage &&
                                    <div className={'close-icon'} onClick={()=> setFormData({...formData,walletHelpScreenIconImage:''})}>
                                        <CloseSharpIcon/>
                                    </div>
                                }
                            </div>
                            <div className={'level_popup_form_field_left'}>
                                <div className={'user_kyc_section'}>
                                    <div className={'user_kyc_section_filed'}>
                                        <label>Title <span className={'validation-star'}>*</span></label>
                                        <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                            <input style={{paddingRight: "51px"}} maxLength={40} type={'text'} placeholder={'Enter Name'} value={formData?.walletHelpScreenIconTitle} name={'walletHelpScreenIconTitle'} onChange={(e) => changeHandler(e)} />
                                            <span>{formData?.walletHelpScreenIconTitle?.length}/40</span>
                                        </div>
                                        {simpleValidator.current.message("title", formData?.walletHelpScreenIconTitle, 'required')}
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

export default AddWalletScreenIconPopUp;