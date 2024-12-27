import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { jsonToFormData, profileImages } from "../../../../utils";
import user from "../../../../assets/images/avatar.png";
import icon_plus from "../../../../assets/images/plus.svg";
import FilledButton from "../../../../Components/FileButton";
import CommonModal from "../../../../hoc/CommonModal";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../hoc/PopContent";
import {
    addLobbyLabelList,
    updateLobbyLabelList
} from "../../../../Redux/Master/action";
import LobbyTypeDropdown from "./LobbyTypeDropdown";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import CommonDropdown from "../../../../Components/Dropdown/CommonDropdown";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};

const AddLobbyLabel = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData, setFormData] = useState({
        lobbyType: '',
        lobbyTypeIcon: '',
        description: '',
        type: '',
        isLobbyTypeIconUpdated: false,
        isPracticeMode:false
    });

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                type: formData?.type === 'BATTLE (One Vs One)' ? 'HeadToHead' : formData?.type === 'CONTEST (One vs Many)' ? 'Contest' : '',
                lobbyTypeId: modalValue?.row?._id
            }
            setLoader(true)
            dispatch(updateLobbyLabelList(payload)).then(res => {
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
                type: formData?.type === 'BATTLE (One Vs One)' ? 'HeadToHead' : formData?.type === 'CONTEST (One vs Many)' ? 'Contest' : ''
            }
            delete payload?.isLabelIconUpdated;
            setLoader(true)
            dispatch(addLobbyLabelList(jsonToFormData(payload))).then(res => {
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
                lobbyTypeIcon: modalValue?.row?.lobbyTypeIcon,
                lobbyType: modalValue?.row?.lobbyType,
                description: modalValue?.row?.description,
                type: modalValue?.row?.type === 'HeadToHead' ? 'BATTLE (One Vs One)' : modalValue?.row?.type === 'Contest' ? 'CONTEST (One vs Many)' : '',
                isPracticeMode:modalValue?.row?.isPracticeMode || false
            })
        }
    }, [modalValue?.isEdit]);

    const handleIconChange = (e) => {
        if(e.target.files[0]?.type?.includes('image/') &&  e.target.files[0].type !== 'image/gif'){
            let img = new Image();
            img.src = window.URL.createObjectURL(e.target.files[0]);
            img.onload = () => {
                if (img.width === 56 && img.height === 56) {
                    setFormData({ ...formData, lobbyTypeIcon: e.target.files[0], isLobbyTypeIconUpdated: true })
                } else {
                    handleOpenErrorModal('CommonPop', { header: "Error", body: 'The width and height of the image should be  56 * 56 size' });
                }


            }
        }else {
            handleOpenErrorModal('CommonPop', { header: "Error", body: 'Please add only image file' });
        }

    }

    useEffect(() => {
        if (document.getElementsByClassName('notranslate')) {
            document.getElementsByClassName('notranslate')[0].innerHTML = 'Select'
        }
    }, []);

    return (
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup lobby_section_details'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Lobby Type' : 'Add New Lobby Type'}</h2>
                </div>
                <div className={'add_admin_user_popup_content mt_15'}>
                    <form onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className={'level_popup_form_field '}>
                            <div className='form_group profile new_game_section profile-image-dropdown'>
                                <div className='user_profile'>
                                    <div className='user_profile_pic'>
                                        {profileImages(formData?.lobbyTypeIcon, user)}
                                        {
                                            !formData?.lobbyTypeIcon &&
                                            <span className='addnew'>
                                            <img src={icon_plus} alt='' />
                                            <input type='file' title="" name='labelIcon' id='' onChange={(e) => handleIconChange(e)} />
                                        </span>
                                        }

                                    </div>
                                    <label htmlFor='' className='profile_label'>Lobby Icon <span className={'validation-star'}>*</span></label>
                                </div>
                                {simpleValidator.current.message("labelIcon", formData?.lobbyTypeIcon, 'required')}
                                {
                                    formData?.lobbyTypeIcon &&
                                    <div className={'close-icon'} onClick={()=> setFormData({...formData,lobbyTypeIcon:'',})}>
                                        <CloseSharpIcon/>
                                    </div>
                                }
                            </div>
                            <div className={'level_popup_form_field_left'}>
                                <div className={'user_kyc_section'}>
                                    <div className={'user_kyc_section_filed'}>
                                        <label>Title <span className={'validation-star'}>*</span></label>
                                        <div className={'formData mt_margin mb_1  '}>
                                            <CommonDropdown options={modalValue?.lobby} name={'lobbyType'} setFormData={setFormData} formData={formData} />
                                            {/*<input type={'text'} placeholder={'Enter Title'} maxLength={40} value={formData?.lobbyType} name={'lobbyType'} onChange={(e) => changeHandler(e)} />*/}
                                            {/*<span>{formData?.lobbyType?.length}/40</span>*/}
                                        </div>
                                        {simpleValidator.current.message("lobbyTitle", formData?.lobbyType, 'required')}
                                    </div>
                                </div>
                                <div className={'user_kyc_section'}>
                                    <div className={'user_kyc_section_filed'}>
                                        <label>Description <span className={'validation-star'}>*</span></label>
                                        <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                            <input type={'text'} value={formData?.description} placeholder={'Enter Description'} maxLength={40} name={'description'} onChange={(e) => changeHandler(e)} />
                                            <span>{formData?.description?.length}/40</span>
                                        </div>
                                        {simpleValidator.current.message("description", formData?.description, 'required')}
                                    </div>
                                </div>
                                <div className={'formData checkbox_modal real_money_field'}>
                                    <div>
                                        <label> Type <span className={'validation-star'}>*</span></label>
                                    </div>
                                    <div className={'select_game_option_mode'}>
                                        <div className={'select_game_option'}>
                                            <LobbyTypeDropdown formData={formData} setFormData={setFormData} />
                                            {simpleValidator.current.message("type", formData?.type, 'required')}
                                        </div>
                                    </div>
                                </div>
                                <div className={'common_checkbox_details mt_1'}>
                                    <label>Is Practice Mode ?</label>
                                    <div className={'game_mode_btn'}>
                                        <div className={'game_mode_btn_option yes_radio_btn'}>
                                            <input type={'radio'} name={'isPracticeMode'} checked={formData?.isPracticeMode} onChange={(e) => setFormData({ ...formData, isPracticeMode: true })} />
                                            <label>Yes</label>
                                        </div>
                                        <div className={'game_mode_btn_option no_radio_btn'}>
                                            <input type={'radio'} name={'isPracticeMode'} checked={!formData?.isPracticeMode} onChange={(e) => setFormData({ ...formData, isPracticeMode: false })} />
                                            <label>No</label>
                                        </div>
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
export default AddLobbyLabel