import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { jsonToFormData, profileImages } from "../../../../utils";
import user from "../../../../assets/images/avatar.png";
import FilledButton from "../../../../Components/FileButton";
import CommonModal from "../../../../hoc/CommonModal";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../hoc/PopContent";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import moment from "moment";
import {createInternalAdsList, updateInternalAdsList} from "../../../../Redux/Master/action";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import DropdownList from "../../../../Components/Dropdown/DropdownList";
import GameListDropdown from "./GameListDropdown";
import {getLeaderboardGameList} from "../../../../Redux/Bonus/action";

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
const CreateAds = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [, updateState] = useState({});
    const [gameFilterData, setGameFilterData] = useState([])
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [formData, setFormData] = useState({
        internalAdsBanner: '',
        expireDate: '',
        startDate: '',
        isInternalAdsUpdated: false,
        redirectToScreen:'',
        gameId:'',
        isRedirectToGameScreen:true
    });
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [openCale, setOpenCale] = useState({
        expireDate: false,
        startDate: false
    })
    let Modal = PopComponent[modalDetails.modalName];

    useEffect(() => {
        dispatch(getLeaderboardGameList()).then(res => {
            setGameFilterData(res.data.data)
        })
    }, []);

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
                ...formData,
                startDate: moment(formData?.startDate).format("YYYY-MM-DD"),
                expireDate: moment(formData?.expireDate).format("YYYY-MM-DD"),
                isRedirectToGameScreen: true,
                redirectToScreen: formData?.redirectToScreen?.replaceAll(' ', '')
            }
            if(payload?.redirectToScreen === 'AddCashScreen' || payload?.redirectToScreen === 'ReferEarn' || payload?.redirectToScreen === 'AddCashScreenQR'){
                payload = {
                    ...payload,
                    isRedirectToGameScreen: false,
                    gameId: ''
                }
            }
            delete payload?.isInternalAdsUpdated
            setLoader(true)
            dispatch(createInternalAdsList(payload)).then(res => {
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

    function getAspectRatio(a, b){
        if (a === 0 || b === 0)
            return Math.abs(Math.max(Math.abs(a), Math.abs(b)));
        let r = a % b;
        return (r !== 0) ? getAspectRatio(b, r) : Math.abs(b);
    }

    const handleChange = (e) => {
        if(e.target.files[0]?.type?.includes('image/') &&  e.target.files[0].type !== 'image/gif'){
            let img = new Image();
            img.src = window.URL.createObjectURL(e.target.files[0]);
            img.onload = () => {
                let ratioAvg = getAspectRatio( img.width,img.height);
                let right = (img.width/ratioAvg),
                    left = (img.height/ratioAvg)
                let aspectRatio = `${right}:${left}`;
                if (aspectRatio === '32:7') {
                    setFormData({ ...formData, internalAdsBanner: e.target.files[0], isInternalAdsUpdated: true });
                } else {
                    handleOpenErrorModal('CommonPop', { header: "Error", body: 'The Aspect Ratio of the image should be 32:7' });
                }
            }
        }
        else {
            handleOpenErrorModal('CommonPop', { header: "Error", body: 'Please Enter Only Image File' });
        }

    };

    const handleDatePicker = (newValue, type) => {
        if(type === 'startDate'){
            setFormData({ ...formData, [type]: newValue, expireDate:null });
        }else {
            setFormData({ ...formData, [type]: newValue });
        }

        setOpenCale({ ...openCale, [type]: false });
    };

    useEffect(() => {
        if (modalValue?.isEdit) {
            const redirectToScreenMapping = {
                'GameDetailsScreen': 'Game Details Screen',
                'AddCashScreen': 'Add Cash Screen',
                'AddCashScreenQR': 'Add Cash Screen QR',
                'ReferEarn': 'Refer Earn'
            };
            const mappedRedirectToScreen = modalValue?.row?.isRedirectToGameScreen ? redirectToScreenMapping['GameDetailsScreen'] : redirectToScreenMapping[modalValue?.row?.redirectToScreen] || '';
            setFormData({
                ...formData,
                internalAdsBanner: modalValue?.row?.inetrnalAdsBanner,
                expireDate: moment(modalValue?.row?.expireDate).format("YYYY-MM-DD"),
                startDate: moment(modalValue?.row?.startDate).format("YYYY-MM-DD"),
                redirectToScreen: mappedRedirectToScreen,
                gameId: modalValue?.row?.gameId,
                isRedirectToGameScreen:modalValue?.row?.isRedirectToGameScreen
            })
        }
    }, [modalValue]);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                startDate: moment(formData?.startDate).format("YYYY-MM-DD"),
                expireDate: moment(formData?.expireDate).format("YYYY-MM-DD"),
                internalAdsId: modalValue?.row?._id,
                isRedirectToGameScreen: true,
                redirectToScreen: formData?.redirectToScreen?.replaceAll(' ', '')
            }
            if(payload?.redirectToScreen === 'AddCashScreen' || payload?.redirectToScreen === 'ReferEarn' || payload?.redirectToScreen === 'AddCashScreenQR'){
                payload = {
                    ...payload,
                    isRedirectToGameScreen: false,
                    gameId: ''
                }
            }
            if (!payload?.isInternalAdsUpdated) {
                delete payload?.internalAdsBanner;
            }
            setLoader(true)
            dispatch(updateInternalAdsList(payload)).then(res => {
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
    };

    return (
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Promotion Ads' : 'Add Promotion Ads'}</h2>
                </div>
                <div className={'header_slider_details header_slider_details_Ads'}>
                    <form className='form_group ' onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        {/*--------------------------------------- Game Logo [Start] ----------------------------------------- */}
                        <div className='user_profile profile-image-dropdown ads_internal'>
                            <label htmlFor='' className='profile_label'>Ads Banner  <span className={'validation-star'}>*</span></label>
                            <div className={'header_section_slider '}>
                                <div className='user_profile_pic'>
                                    {profileImages(formData?.internalAdsBanner, user)}
                                    {
                                        !formData?.internalAdsBanner &&
                                        <span className='add_new'>
                                        <input type='file' title="" name='internalAdsBanner' id='' onChange={(e) => handleChange(e)} /> </span>
                                    }

                                </div>
                            </div>
                            {simpleValidator.current.message("internalAdsBanner", formData?.internalAdsBanner, "required")}
                            {
                                formData?.internalAdsBanner &&
                                <div className={'close-icon'} onClick={()=> setFormData({...formData,internalAdsBanner:'',})}>
                                    <CloseSharpIcon/>
                                </div>
                            }
                        </div>
                        <div className={'date-picker_coupon'}>
                            <div className={'start-date-picker'}>
                                <label>Start Date <span className={'validation-star'}>*</span></label>
                                <div className={'date_picker_value'}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}  >
                                        <DatePicker
                                            name='start-date'
                                            value={formData?.startDate}
                                            open={openCale.startDate}
                                            onChange={(newValue) => handleDatePicker(newValue, 'startDate')}
                                            minDate={new Date()}
                                            renderInput={(params) => {
                                                return <TextField {...params} onClick={() => setOpenCale({ ...openCale, startDate: !openCale?.startDate, expireDate: false })} />
                                            }}
                                            inputFormat="MMM dd, yyyy"
                                            className={'datePicker_details'}
                                            inputProps={{ readOnly: true , placeholder: "Select Start Date"}}
                                        />
                                    </LocalizationProvider>
                                </div>
                                {simpleValidator.current.message("startDate", formData?.startDate, "required")}
                            </div>
                            <div className={'end-date-picker'}>
                                <label>Expired Date <span className={'validation-star'}>*</span></label>
                                <div className={'date_picker_value'}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                                        <DatePicker
                                            name='expireDate'
                                            value={formData?.expireDate}
                                            onChange={(newValue) => handleDatePicker(newValue, 'expireDate')}
                                            inputFormat="MMM dd, yyyy"
                                            minDate={formData?.startDate ? formData?.startDate : new Date()}
                                            open={openCale.expireDate}
                                            renderInput={(params) => <TextField {...params} onClick={() => setOpenCale({ ...openCale, expireDate: !openCale?.expireDate, startDate: false })} />}
                                            inputProps={{ readOnly: true, placeholder: "Select Expiry Date" }}
                                        />
                                    </LocalizationProvider>
                                </div>
                                {simpleValidator.current.message("expireDate", formData?.expireDate, "required")}
                            </div>
                        </div>
                        <div className={'date-picker_coupon monthly-bonus-type'}>
                            <div className={'start-date-picker'} style={{marginRight:"0px"}}>
                                <label>Screen <span className={'validation-star'}>*</span></label>
                                <DropdownList name={'redirectToScreen'} options={['Game Details Screen','Add Cash Screen', 'Add Cash Screen QR','Refer Earn']} setFormData={setFormData} formData={formData} placeholder={"Select Screen"} />
                                {simpleValidator.current.message("screen", formData?.redirectToScreen, "required")}
                            </div>
                        </div>
                        {/*{*/}
                        {/*    formData?.redirectToScreen  === 'Game' &&*/}
                        {/*    <div className={'select_game_platform_value game_mode game_mode_main_section '}>*/}
                        {/*        <div className={'select_label tab01 game_mode_left_details '}>*/}
                        {/*            <label>Is Redirect To Game Screen ?</label>*/}
                        {/*            <div className={'game_mode_btn'}>*/}
                        {/*                <div className={'game_mode_btn_option'}>*/}
                        {/*                    <input type={'radio'} name={'isPracticeMode'} checked={formData?.isRedirectToGameScreen} onChange={(e) => setFormData({ ...formData, isRedirectToGameScreen: true })} />*/}
                        {/*                    <label>Yes</label>*/}
                        {/*                </div>*/}
                        {/*                <div className={'game_mode_btn_option tab_radio'}>*/}
                        {/*                    <input type={'radio'} name={'isPracticeMode'} checked={!formData?.isRedirectToGameScreen} onChange={(e) => setFormData({ ...formData, isRedirectToGameScreen: false })} />*/}
                        {/*                    <label>No</label>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}

                        {/*}*/}
                        {
                            (formData?.redirectToScreen === 'Game Details Screen' ) &&
                                <div className={'mt_margin'}>
                                    <label>Select Game <span className={'validation-star'}>*</span></label>
                                    <div className={'mt_margin'}>
                                   <GameListDropdown name={'gameId'} options={gameFilterData} formData={formData} setFormData={setFormData}/>
                               </div>
                                    {simpleValidator.current.message("game", formData?.gameId, "required")}
                                </div>

                        }
                        {/*<LeaderBoardGameListDropdown options={gameFilterData} name={'gameId'} setFormData={setFormData} formData={formData} />*/}
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
export default CreateAds;