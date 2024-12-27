import { useDispatch } from "react-redux";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../hoc/PopContent";
import { jsonToFormData, profileImages } from "../../../../utils";
import { Box } from "@mui/material";
import user from "../../../../assets/images/avatar.png";
import icon_plus from "../../../../assets/images/plus.svg";
import FilledButton from "../../../../Components/FileButton";
import CommonModal from "../../../../hoc/CommonModal";
import { createUpcomingGames, updateUpcomingGamesDetails } from "../../../../Redux/popularGames/action";
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

const AddUpcomingGamesPopup = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState({
        upcomingGameName: '',
        upcomingGameIcon: '',
        isupcomingGameIconUpdated: false
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData
            }
            setLoader(true)
            dispatch(createUpcomingGames(jsonToFormData(payload))).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    redirectApiHandler();
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

    useEffect(() => {
        if (modalValue?.isEdit) {
            setFormData({
                ...formData,
                upcomingGameName: modalValue?.item?.upcomingGameName,
                upcomingGameIcon: modalValue?.item?.upcomingGameIcon,
            })
        }
    }, [modalValue?.isEdit]);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                upcomingGameId: modalValue?.item?._id
            }
            setLoader(true)
            dispatch(updateUpcomingGamesDetails(jsonToFormData(payload))).then(res => {
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
            <div className={'add_admin_user_popup modal_main_popup upcoming-popup-details'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Upcoming Game' : 'Add New Upcoming Game'}</h2>
                </div>
                <div className={'add_admin_user_popup_content'}>
                    <form onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className={'level_popup_form_field'}>
                            <div className='form_group profile new_game_section profile-image-dropdown'>
                                <div className='user_profile'>
                                    <div className='user_profile_pic'>
                                        {profileImages(formData?.upcomingGameIcon, user)}
                                        {
                                            !formData?.upcomingGameIcon &&
                                            <span className='addnew'>
                                            <img src={icon_plus} alt='' />
                                            <input type='file' title="" name='gameIcon' id=''
                                                   onChange={(e) => {
                                                       if(e.target.files[0]?.type?.includes('image/') &&  e.target.files[0].type !== 'image/gif'){
                                                           setFormData({ ...formData, upcomingGameIcon: e.target.files[0], isupcomingGameIconUpdated: true })
                                                       }else {
                                                           handleOpenErrorModal('CommonPop', { header: "Error", body: 'Please Enter Only Image File' });
                                                       }
                                                   }}
                                            />
                                        </span>
                                        }

                                    </div>
                                    <label htmlFor='' className='profile_label'>Game Icon <span className={'validation-star'}>*</span> <br/> <span className={'size_mb'}>size max 5MB</span>  </label>
                                </div>
                                {simpleValidator.current.message("GameIcon", formData?.upcomingGameIcon, 'required')}
                                {
                                    formData?.upcomingGameIcon &&
                                    <div className={'close-icon'} onClick={()=> setFormData({...formData,upcomingGameIcon:'',})}>
                                        <CloseSharpIcon/>
                                    </div>
                                }
                            </div>
                            <div className={'level_popup_form_field_left'}>
                                <div className={'user_kyc_section'}>
                                    <div className={'user_kyc_section_filed'}>
                                        <label>Enter Game Name <span className={'validation-star'}>*</span></label>
                                        <div className={'user_kyc_section_input_filed'}>
                                            <input maxLength={30}type={'text'} value={formData?.upcomingGameName} name={'upcomingGameName'} onChange={(e) => changeHandler(e)} />
                                        </div>
                                        {simpleValidator.current.message("gameName", formData?.upcomingGameName, 'required')}
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
export default AddUpcomingGamesPopup