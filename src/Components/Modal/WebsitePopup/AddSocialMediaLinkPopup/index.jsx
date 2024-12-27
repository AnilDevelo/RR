import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import icon_plus from "../../../../assets/images/plus.svg";
import user from '../../../../assets/images/avatar.png'
import FilledButton from "../../../FileButton";
import { jsonToFormData, profileImages } from "../../../../utils";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch } from "react-redux";
import PopComponent from "../../../../hoc/PopContent";
import CommonModal from "../../../../hoc/CommonModal";
import { createWebsiteSocialMedia, updateWebSiteSocialMedia } from "../../../../Redux/website/action";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};
const AddSocialMediaLinkPopup = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [, updateState] = useState({});
    const simpleValidator = useRef(new SimpleReactValidator());
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState({ webSiteSocialMediaIcon: '', link: '', isSocialMediaUpdated: false });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData
            }
            delete payload.isSocialMediaUpdated
            setLoader(true);
            dispatch(createWebsiteSocialMedia(jsonToFormData(payload))).then(res => {
                if (res.data.success) {
                    redirectApiHandler();
                    setLoader(false)
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

    useEffect(() => {
        if (modalValue?.isEdit) {
            const { row } = modalValue;
            setFormData({
                ...formData,
                webSiteSocialMediaIcon: row?.socialIcon,
                link: row?.link
            })
        }

    }, [modalValue])
    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                socialMediaId: modalValue?.row?._id
            }
            if (!payload?.isSocialMediaUpdated) { delete payload?.webSiteSocialMediaIcon }
            setLoader(true);
            dispatch(updateWebSiteSocialMedia(jsonToFormData(payload))).then(res => {
                if (res.data.success) {
                    redirectApiHandler();
                    setLoader(false)
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
    return (
        <Box sx={style}>
            <div className={'add_admin_user_popup'}>
                <div className={'add_admin_user_popup_title'}>
                    <h2>Add Social Media</h2>
                </div>
                <div className={'add_game_details_sec add_admin_user_popup_content'}>
                    <form onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className={'game_display_form winner_content_form social_media_section'}>
                            <div className='form_group profile profile-image-dropdown'>
                                <div className='user_profile'>
                                    <div className='user_profile_pic'>
                                        {profileImages(formData?.webSiteSocialMediaIcon, user)}
                                        {
                                            !formData?.webSiteSocialMediaIcon &&
                                            <span className='addnew'>
                                            <img src={icon_plus} alt='' />
                                            <input type='file' name='webSiteSocialMedia' id='' onChange={(e) => setFormData({ ...formData, webSiteSocialMediaIcon: e.target.files[0], isSocialMediaUpdated: true })} />
                                        </span>
                                        }

                                    </div>
                                    <label htmlFor='' className='profile_label'>Social image <span className={'validation-star'}>*</span></label>
                                </div>
                                {simpleValidator.current.message("image", formData?.webSiteSocialMediaIcon, "required")}
                                {
                                    formData?.webSiteSocialMediaIcon &&
                                    <div className={'close-icon'} onClick={()=> setFormData({...formData,webSiteSocialMediaIcon:'',})}>
                                        <CloseSharpIcon/>
                                    </div>
                                }
                            </div>
                            <div className={'game_flex'}>
                                <div className="formData formData_field">
                                    <label>Social Link <span className={'validation-star'}>*</span></label>
                                    <div className="emailWrap">
                                        <input type="text" name='link' placeholder={'Enter Social Link'} value={formData?.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} />
                                    </div>
                                    {simpleValidator.current.message("link", formData?.link, "required")}
                                </div>

                            </div>
                        </div>
                        <div className={'d_flex_end mt_1'}>
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
export default AddSocialMediaLinkPopup