import {useDispatch} from "react-redux";
import React, {useCallback, useEffect, useRef, useState} from "react";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../hoc/PopContent";
import {addBotList, addLobbyLabelList, updateBotList, updateLobbyLabelList} from "../../../../Redux/Master/action";
import {jsonToFormData, profileImages} from "../../../../utils";
import {Box} from "@mui/material";
import user from "../../../../assets/images/avatar.png";
import icon_plus from "../../../../assets/images/plus.svg";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import FilledButton from "../../../../Components/FileButton";
import CommonModal from "../../../../hoc/CommonModal";

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
const AddBot =  ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData, setFormData] = useState({
        fullName: '',
        bonus: '',
        cash: '',
        profileImage: '',
        isProfileImageUpdated: false,
    });

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                userId:modalValue?.row?._id
            }
            if(!payload?.isProfileImageUpdated){
                delete payload?.profileImage
            }
            setLoader(true)
            dispatch(updateBotList(jsonToFormData(payload))).then(res => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
            }
            setLoader(true)
            dispatch(addBotList(jsonToFormData(payload))).then(res => {
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
    };

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
                profileImage: modalValue?.row?.profileImage,
                fullName: modalValue?.row?.fullName,
                bonus: modalValue?.row?.bonus,
                cash:modalValue?.row?.cash
            })
        }
    }, [modalValue?.isEdit]);

    const handleIconChange = (e) => {
        let img = new Image();
        img.src = window.URL.createObjectURL(e.target.files[0]);
        img.onload = () => {
            if (img.width === 56 && img.height === 56) {
                setFormData({ ...formData, lobbyTypeIcon: e.target.files[0], isLobbyTypeIconUpdated: true })
            } else {
                handleOpenErrorModal('CommonPop', { header: "Error", body: 'The width and height of the image should be  56 * 56 size' });
            }
        }
    }

    return (
        <Box sx={style}>
            <div className={'modal_main_popup bot_section_details lobby_section_details'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Bot' : 'Add New Bot'}</h2>
                </div>
                <div className={'add_admin_user_popup_content mt_15'}>
                    <form onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className={'level_popup_form_field '}>
                            <div className='form_group profile new_game_section profile-image-dropdown'>
                                <div className='user_profile'>
                                    <div className='user_profile_pic'>
                                        {profileImages(formData?.profileImage, user)}
                                        {
                                            !formData?.profileImage &&
                                            <span className='addnew'>
                                            <img src={icon_plus} alt='' />
                                            <input type='file' title="" name='profileImage' id='' onChange={(e) => {
                                                if(e.target.files[0]?.type?.includes('image') &&  e.target.files[0].type !== 'image/gif'){
                                                    setFormData({ ...formData, profileImage: e.target.files[0], isProfileImageUpdated: true })
                                                }else {
                                                    handleOpenErrorModal('CommonPop', { header: "Error", body: 'Please Add Only Image File' });
                                                }
                                            }} />
                                        </span>
                                        }

                                    </div>
                                    <label htmlFor='' className='profile_label'>Profile <span className={'validation-star'}>*</span></label>
                                </div>
                                {simpleValidator.current.message("profileImage", formData?.profileImage, 'required')}
                                {
                                    formData?.profileImage &&
                                    <div className={'close-icon'} onClick={()=> setFormData({...formData,profileImage:'',})}>
                                        <CloseSharpIcon/>
                                    </div>
                                }
                            </div>
                            <div className={'level_popup_form_field_left'}>
                                <div className={'user_kyc_section'}>
                                    <div className={'user_kyc_section_filed'}>
                                        <label>Name <span className={'validation-star'}>*</span></label>
                                        <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                            <input type={'text'} placeholder={'Enter Full Name'} maxLength={20} value={formData?.fullName} name={'fullName'} onChange={(e) => changeHandler(e)} />
                                            <span>{formData?.fullName?.length}/20</span>
                                        </div>
                                        {simpleValidator.current.message("fullName", formData?.fullName, 'required')}
                                    </div>
                                </div>
                                <div className={'user_kyc_section'}>
                                    <div className={'user_kyc_section_filed'}>
                                        <label>Total Bonus <span className={'validation-star'}>*</span></label>
                                        <div className={'user_kyc_section_input_filed'}>
                                            <input type={'number'} onWheel={event => event.currentTarget.blur()} placeholder={'Enter Bonus'} value={formData?.bonus} name={'bonus'} onChange={(e) => changeHandler(e)} />
                                        </div>
                                        {simpleValidator.current.message("bonus", formData?.bonus?.toString(), 'required|numeric|min:0|max:10')}
                                    </div>
                                </div>
                                <div className={'user_kyc_section'}>
                                    <div className={'user_kyc_section_filed'}>
                                        <label>Cash <span className={'validation-star'}>*</span></label>
                                        <div className={'user_kyc_section_input_filed'}>
                                            <input type={'number'} onWheel={event => event.currentTarget.blur()}  placeholder={'Enter Cash'} value={formData?.cash} name={'cash'} onChange={(e) => changeHandler(e)} />
                                        </div>
                                        {simpleValidator.current.message("cash", formData?.cash?.toString(), 'required|numeric|min:0|max:10')}
                                    </div>
                                </div>
                                {/*<div className={'select_game_platform_value game_mode game_mode_main_section '}>*/}
                                {/*    <div className={'select_label tab01 game_mode_left_details '}>*/}
                                {/*        <label>Is Practice Mode ?</label>*/}
                                {/*        <div className={'game_mode_btn'}>*/}
                                {/*            <div className={'game_mode_btn_option'}>*/}
                                {/*                <input type={'radio'} name={'isPracticeMode'} checked={formData?.isPracticeMode} onChange={(e) => setFormData({ ...formData, isPracticeMode: true })} />*/}
                                {/*                <label>Yes</label>*/}
                                {/*            </div>*/}
                                {/*            <div className={'game_mode_btn_option tab_radio'}>*/}
                                {/*                <input type={'radio'} name={'isPracticeMode'} checked={!formData?.isPracticeMode} onChange={(e) => setFormData({ ...formData, isPracticeMode: false })} />*/}
                                {/*                <label>No</label>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <div className={'formData_btn d_flex_end mt_2'}>
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
export default AddBot