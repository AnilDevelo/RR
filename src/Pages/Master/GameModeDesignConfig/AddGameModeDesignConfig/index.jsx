import React, {useCallback, useEffect, useRef, useState} from "react";
import {Box} from "@mui/material";
import {jsonToFormData, profileImages} from "../../../../utils";
import user from "../../../../assets/images/avatar.png";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import FilledButton from "../../../../Components/FileButton";
import CommonModal from "../../../../hoc/CommonModal";
import {useDispatch} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../hoc/PopContent";
import {addGameModeDesignList, addLobbyLabelList, updateGameModeDesignList} from "../../../../Redux/Master/action";
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
const AddGameModeDesignConfig = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData, setFormData] = useState({
        gameModeDesignImage: '',
        designName:'',
        isGameModeDesignUpdated:false
    });

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
                ...formData
            }
            delete payload?.isGameModeDesignUpdated
            setLoader(true);
            dispatch(addGameModeDesignList(jsonToFormData(payload))).then(res => {
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
    }

    useEffect(()=>{
        if(modalValue?.isEdit){
            setFormData({
                ...formData,
                designName:modalValue?.row?.designName,
                gameModeDesignImage: modalValue?.row?.designNameImage
            })
        }
    },[modalValue?.isEdit])


    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                gameModeDesignId: modalValue?.row?._id
            }
            if(!payload?.isGameModeDesignUpdated){
                delete payload?.gameModeDesignImage
            }
            setLoader(true);
            dispatch(updateGameModeDesignList(jsonToFormData(payload))).then(res => {
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
    }


    return(
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup game-mode-config-design lobby_section_details'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Game Mode Design' : 'Add Game Mode Design'}</h2>
                </div>
                <div className={'header_slider_details header_slider_details_Ads'}>
                    <form className='form_group ' onSubmit={modalValue?.isEdit ?   (e) => handleEditSubmit(e) :  (e) => handleSubmit(e)}>
                        <div className={'user_kyc_section'}>
                            <div className={'formData user_kyc_section_filed'}>
                                <label>Design Name <span className={'validation-star'}>*</span></label>
                                <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                    <input type={'text'} placeholder={'Enter Design Name'}  maxLength={40} value={formData?.designName} name={'designName'} onChange={(e) => changeHandler(e)} />
                                    <span>{formData?.designName?.length}/40</span>
                                </div>

                                {simpleValidator.current.message("designName", formData?.designName, 'required')}
                            </div>
                        </div>
                        {/*--------------------------------------- Game Logo [Start] ----------------------------------------- */}
                        <div className='user_profile profile-image-dropdown ads_internal'>
                            <label htmlFor='' className='profile_label'>Design Image <span className={'validation-star'}>*</span> <span className={"size-validation"}>
                              (350 * 60 size)
                            </span></label>
                            <div className={'header_section_slider'}>
                                <div className='user_profile_pic'>
                                    {profileImages(formData?.gameModeDesignImage, user)}
                                    <span className='add_new'>
                                        <input type='file' title="" name='gameModeDesignImage' id='' onChange={(e) => {
                                            if(e.target.files[0]?.type?.includes('image/') &&  e.target.files[0].type !== 'image/gif'){
                                                let img = new Image();
                                                img.src = window.URL.createObjectURL(e.target.files[0]);
                                                img.onload = () => {
                                                    if (img.width === 350 && img.height === 60) {
                                                        setFormData({...formData,gameModeDesignImage:e.target.files[0], isGameModeDesignUpdated:true })
                                                    } else {
                                                        handleOpenErrorModal('CommonPop', { header: "Error", body: 'The width and height of the image should be  350 * 60 size' });
                                                    }
                                                }
                                            }else {
                                                handleOpenErrorModal('CommonPop', { header: "Error", body: 'Please add only image file' });
                                            }
                                        }} /> </span>
                                </div>
                            </div>
                            {simpleValidator.current.message("gameModeDesignImage", formData?.gameModeDesignImage, "required")}
                            {
                                formData?.gameModeDesignImage &&
                                <div className={'close-icon'} onClick={()=> setFormData({...formData,gameModeDesignImage:'',})}>
                                    <CloseSharpIcon/>
                                </div>
                            }
                        </div>
                        {/*--------------------------------------- Game Logo [End] ----------------------------------------- */}
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
export default AddGameModeDesignConfig