import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import user from '../../../../assets/images/avatar.png';
import SimpleReactValidator from "simple-react-validator";
import FilledButton from "../../../FileButton";
import { useDispatch } from "react-redux";
import { createWebsiteHeader, updateWebsiteHeader } from "../../../../Redux/website/action";
import { jsonToFormData, profileImages } from "../../../../utils";
import PopComponent from "../../../../hoc/PopContent";
import CommonModal from "../../../../hoc/CommonModal";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import icon_plus from "../../../../assets/images/plus.svg";


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

const AddHeaderSliderPop = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [, updateState] = useState({});
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [formData, setFormData] = useState({ websiteHeaderImage: '' });
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];

    const handleChange = (e) => {
        let img = new Image();
        img.src = window.URL.createObjectURL(e.target.files[0]);
        img.onload = () => {
            if ((img.width > 1200)) {
                setFormData({ ...formData, websiteHeaderImage: e.target.files[0] })
            } else {
                handleOpenErrorModal('CommonPop', { header: "Error", body: 'The width of the image should be  1200 pixels or greater' })
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (simpleValidator.current.allValid()) {
            setLoader(true);
            dispatch(createWebsiteHeader(jsonToFormData(formData))).then(res => {
                if (res.data.success) {
                    redirectApiHandler();
                    setLoader(false);
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                } else {
                    setLoader(false)
                    handleOpenErrorModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg });
                }
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };

    useEffect(() => {
        if (modalValue) {
            setFormData({
                ...formData,
                websiteHeaderImage: modalValue?.data?.headerImageLocation
            })
        }
    }, [modalValue])

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                headerId: modalValue?.data?.id
            }
            setLoader(true);
            dispatch(updateWebsiteHeader(jsonToFormData(payload))).then(res => {
                if (res.data.success) {
                    redirectApiHandler();
                    setLoader(false);
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                } else {
                    setLoader(false)
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message || res?.data?.msg });
                }
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
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

    return (
        <Box sx={style}>
            <div className={'add_admin_user_popup'}>
                <div className={'add_admin_user_popup_title'}>
                    <h2>{modalValue?.isEdit ? ' Edit Header Slider' : ' Add Header Slider'}</h2>
                </div>
                    <form  onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                <label htmlFor='profile_label' className='profile_label'>Image <span className={'validation-star'}>*</span></label>

                <div className='form_group profile new_game_section profile-image-dropdown'>
                                <div className='user_profile'>
                                    <div className='user_profile_pic'>
                                        {profileImages(formData?.websiteHeaderImage, user)}
                                        {
                                            !formData?.websiteHeaderImage &&
                                            <span className='addnew'>
                                            <img src={icon_plus} alt='' />
                                            <input type='file' name='labelIcon' id='' onChange={(e) => handleChange(e)} />
                                        </span>
                                        }

                                    </div>
                                </div>
                                {simpleValidator.current.message("websiteHeaderImage ", formData?.websiteHeaderImage, 'required')}
                                {
                                    formData?.websiteHeaderImage &&
                                    <div className={'close-icon'} onClick={()=> setFormData({...formData,websiteHeaderImage:''})}>
                                        <CloseSharpIcon/>
                                    </div>
                                }
                            </div>
                       
                        <div className={'d_flex_end mt_1'}>
                                <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                                <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'btn loader_css'} loading={loader} />
                            </div>
                    </form>
            </div>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenErrorModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenErrorModal} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Box>
    );
};
export default AddHeaderSliderPop