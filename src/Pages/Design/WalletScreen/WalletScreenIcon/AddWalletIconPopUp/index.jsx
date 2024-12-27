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
import {  createWalletScreenImage,  updateKYCScreenData, updateWalletScreenImage } from "Redux/Design/action";
import {createWalletScreen, updateWalletScreen} from "../../../../../Redux/Design/action";

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

const AddWalletIconPopUp = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData, setFormData] = useState({ walletIconTooltipInfo: '',walletIconTitle:'', walletIconImage: '',isWalletIconImageUpdated: false  });

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
                walletIconImage: formData?.walletIconImage,
                walletIconTitle: formData?.walletIconTitle.trim(),
                walletIconTooltipInfo: formData?.walletIconTooltipInfo.trim(),
            }
            setLoader(true)
            dispatch(createWalletScreen(jsonToFormData(payload))).then((res) => {
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
        setFormData({ ...formData, walletIconImage: e.target.files[0], isWalletIconImageUpdated: true })
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                walletIconId: modalValue?.row?._id,
                walletIconTitle: formData?.walletIconTitle.trim(),
                walletIconTooltipInfo: formData?.walletIconTooltipInfo.trim(),
            }

            if (!payload.isWalletIconImageUpdated) { delete payload.walletIconImage }
            setLoader(true)
            dispatch(updateWalletScreen(jsonToFormData(payload))).then((res) => {
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
                walletIconTitle: modalValue?.row?.walletIconTitle,
                walletIconImage: modalValue?.row?.walletIconImage,
                walletIconTooltipInfo:modalValue?.row?.walletIconTooltipInfo
            })
        }
    },[modalValue?.isEdit])

    return(
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup add_avatar_section lobby_section_details'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Wallet Screen Icon' : 'Add Wallet Screen Icon'}</h2>
                </div>
                <div className={'add_admin_user_popup_content mt_15'}>
                    <form onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className={'level_popup_form_field '}>
                            <div className='form_group profile new_game_section profile-image-dropdown'>
                                <div className='user_profile'>
                                    <div className='user_profile_pic'>
                                        {profileImages(formData?.walletIconImage, user)}
                                        {
                                            !formData?.walletIconImage &&
                                            <span className='addnew'>
                                            <img src={icon_plus} alt='' />
                                            <input accept=".jpg, .jpeg, .png" type='file' name='walletIconImage' id='' onChange={(e) => handleIconChange(e)} />
                                        </span>
                                        }

                                    </div>
                                    <label htmlFor='' className='profile_label'>Wallet Icon <span className={'validation-star'}>*</span></label>
                                </div>
                                {simpleValidator.current.message("wallet Icon", formData?.walletIconImage, 'required')}
                                {
                                    formData?.walletIconImage &&
                                    <div className={'close-icon'} onClick={()=> setFormData({...formData,walletIconImage:''})}>
                                        <CloseSharpIcon/>
                                    </div>
                                }
                            </div>
                            <div className={'level_popup_form_field_left'}>
                                <div className={'user_kyc_section'}>
                                    <div className={'user_kyc_section_filed'}>
                                        <label>Title <span className={'validation-star'}>*</span></label>
                                        <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                            <input maxLength={12} type={'text'} placeholder={'Enter Name'} value={formData?.walletIconTitle} name={'walletIconTitle'} onChange={(e) => changeHandler(e)} />
                                            <span>{formData?.walletIconTitle?.length}/12</span>
                                        </div>
                                        {simpleValidator.current.message("title", formData?.walletIconTitle, 'required|min:5')}
                                    </div>
                                </div>
                                <div className={'user_kyc_section'}>
                                    <div className={'user_kyc_section_filed'}>
                                        <label>Tooltip <span className={'validation-star'}>*</span></label>
                                        <div className={'user_kyc_section_input_filed'}>
                                            <input type={'text'} maxLength={80} placeholder={'Enter Tooltip'} value={formData?.walletIconTooltipInfo} name={'walletIconTooltipInfo'} onChange={(e) => changeHandler(e)} />
                                        </div>
                                        {simpleValidator.current.message("tooltip", formData?.walletIconTooltipInfo, 'required|min:25')}
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

export default AddWalletIconPopUp;