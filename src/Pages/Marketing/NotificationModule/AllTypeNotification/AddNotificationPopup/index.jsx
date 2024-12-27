import React, {useCallback, useEffect, useRef, useState} from "react";
import Box from "@material-ui/core/Box";
import FilledButton from "../../../../../Components/FileButton";
import SimpleReactValidator from "simple-react-validator";
import CommonDropdown from "../../../../../Components/Dropdown/CommonDropdown";
import DatePickerReact from "react-datepicker";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ImageTypeDropdown from "./ImageTypeDropdown";
import {useDispatch} from "react-redux";
import {
    createNotificationList,
    getOfferDropDownList, updateNotificationList
} from "../../../../../Redux/Master/action";
import UserTypeDropdown from "./UserTypeDropdown";
import moment from "moment";
import { jsonToFormData } from "../../../../../utils";
import CommonModal from "../../../../../hoc/CommonModal";
import PopComponent from "../../../../../hoc/PopContent";
import OfferTypeDropdown from "./OfferTypeDropdown";
import GameListDropdown from "../../../InternalAdsList/CreateAds/GameListDropdown";
import {getLeaderboardGameList} from "../../../../../Redux/Bonus/action";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 0,
    borderRadius: "5px",
};

const AddNotificationPopup = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const simpleValidator = useRef(new SimpleReactValidator());
    const dispatch = useDispatch();
    const [, updateState] = useState({});
    const [loader, setLoader] = useState(false);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [offerTypeList,setOfferTypeList]=useState([]);
    const forceUpdate = useCallback(() => updateState({}), []);
    const [openCale, setOpenCale] = useState({
        endDate: false,
        startDate: false
    });
    const [validTime,setValidTime] = useState(false);
    const [gameFilterData, setGameFilterData] = useState([]);
    const [formData,setFormData] = useState({
        title:'',
        description:'',
        sendTime:null,
        sendDate: '',
        isLogo:false,
        isBanner:false,
        logoImage:'',
        bannerImage:'',
        userTypeId:'',
        notificationType:'',
        repeatType:'',
        navigationScreen:'',
        imageType:'',
        isRedirectToGameScreen:false,
        gameId: '',
    });

    useEffect(() => {
        dispatch(getLeaderboardGameList()).then(res => {
            setGameFilterData(res.data.data)
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData?.notificationType !== 'Offer'){
            simpleValidator.current.fields.Offer = true
        }
        if(formData?.imageType === 'Banner'){
            simpleValidator.current.fields.logoImage = true
            simpleValidator.current.fields.logo = true
        }

        if(formData?.imageType === 'Logo'){
            simpleValidator.current.fields.banner = true
        }
        if(formData?.navigationScreen !== 'Game Details Screen'){
            simpleValidator.current.fields.game = true
        }
        if (simpleValidator.current.allValid()) {
            if(!validTime){
                // let time = moment(`${moment(formData?.sendDate).format('YYYY-MM-DD')} ${moment(formData?.sendTime).format('hh:mm A')}`).format();
                // let convertedTime = moment.utc(time).format().toISOString();
                let sendDate = moment(formData?.sendDate).format('YYYY-MM-DD');
                let sendTime = moment(formData?.sendTime, 'hh:mm A').format('HH:mm');
                let sendDateTime = moment(`${sendDate} ${sendTime}`, 'YYYY-MM-DD HH:mm').toISOString();                
                let payload = {
                    ...formData,
                    sendTime: moment(formData?.sendTime).format('HH:mm'),
                    sendDate : moment(formData?.sendDate).format('YYYY-MM-DD'),
                    notificationType: formData?.notificationType?.toLowerCase(),
                    repeatType: formData?.repeatType === 'One Time only' ? 'oneTimeOnly': formData?.repeatType === 'Daily' ? 'daily' : '',
                    sendAt: sendDateTime,
                    navigationScreen: formData?.navigationScreen?.replaceAll(' ', ''),
                    isRedirectToGameScreen:  formData?.navigationScreen === 'Game Details Screen'
                }
                if(formData?.navigationScreen !== 'Game Details Screen' || formData?.gameId === undefined){
                    delete payload.gameId
                }
                if(formData?.notificationType === 'normal'){
                    delete payload?.offerId
                }
                Object?.keys(payload).forEach(ele => {
                    if (payload[ele] === '' || payload[ele] === null) { delete payload[ele] }
                });
                setLoader(true)
                dispatch(createNotificationList(jsonToFormData(payload))).then(res => {
                    if (res.data.success) {
                        setLoader(false)
                        redirectApiHandler()
                        handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                    } else {
                        setLoader(false)
                        handleOpenErrorModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                    }
                })
            }
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };
const handleEditSubmit = (e) => {
    e.preventDefault();
    if(formData?.notificationType !== 'Offer'){
        simpleValidator.current.fields.Offer = true
    }
    if(formData?.imageType === 'Banner'){
        simpleValidator.current.fields.logoImage = true
        simpleValidator.current.fields.logo = true
    }

    if(formData?.imageType === 'Logo'){
        simpleValidator.current.fields.banner = true
    }
    if(formData?.navigationScreen !== 'Game Details Screen'){
        simpleValidator.current.fields.game = true
    }

    if (simpleValidator.current.allValid()) {
        if (!validTime) {
            // let time = moment(`${moment(formData?.sendDate).format('YYYY-MM-DD')} ${moment(formData?.sendTime).format('hh:mm A')}`).format();
            // let sendTime = moment.utc(time).format();

            let sendDate = moment(formData?.sendDate).format('YYYY-MM-DD');
            let sendTime = moment(formData?.sendTime, 'hh:mm A').format('HH:mm');
            let sendDateTime = moment(`${sendDate} ${sendTime}`, 'YYYY-MM-DD HH:mm').toISOString();                
        let payload = {
                ...formData,
                sendTime: moment(formData?.sendTime).format('HH:mm'),
                sendDate : moment(formData?.sendDate).format('YYYY-MM-DD'),
                notificationType: formData?.notificationType?.toLowerCase(),
                repeatType: formData?.repeatType === 'One Time only' ? 'oneTimeOnly': formData?.repeatType === 'Daily' ? 'daily' : '',
                sendAt: sendDateTime,
                notificationId:modalValue?.row?._id,
                isLogoUpdate: formData?.isLogo,
                isBannerUpdate:formData?.isBanner,
                isRedirectToGameScreen:  formData?.navigationScreen === 'Game Details Screen'
            }



            if(formData?.navigationScreen){
                payload = {
                    ...payload,
                    navigationScreen: formData?.navigationScreen?.replaceAll(' ', ''),
                }
            }

            if(!formData?.navigationScreen){
                delete payload?.navigationScreen
            }

            if(!payload?.isLogoUpdate){
                delete payload?.logoImage
            }
            if(!payload?.isBannerUpdate){
                delete payload?.bannerImage
            }
            if(payload?.notificationType === 'normal'){
                delete payload?.offerId
            }
            if(formData?.navigationScreen !== 'Game Details Screen' || formData?.gameId === undefined){
                delete payload.gameId
            }

            setLoader(true)
            dispatch(updateNotificationList(jsonToFormData(payload))).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    redirectApiHandler()
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                } else {
                    setLoader(false)
                    handleOpenErrorModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                }
            })
        }


    } else {
        simpleValidator.current.showMessages();
        forceUpdate();
    }

};

    const handleDatePicker = (newValue, type) => {
        setFormData({ ...formData, [type]: newValue, sendTime: null });
        setOpenCale({ ...openCale, [type]: false });
    }

    useEffect(()=>{
        dispatch(getOfferDropDownList()).then(res=>{
            setOfferTypeList(res?.data?.data)
        })
    },[gameFilterData]);

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

    useEffect(()=>{
        if(modalValue?.isEdit){
            const { row } = modalValue;

            setFormData({
                ...formData,
                title: row?.title,
                description: row?.description,
                 sendDate:row?.sendDate,
                 sendTime: moment(modalValue?.row?.sendTime, 'HH:mm A')?._d ,
                userTypeId: row?.userTypeId,
                notificationType: row?.notificationType === 'normal' ? 'Normal' : 'Offer',
                repeatType:row?.repeatType === 'oneTimeOnly' ? 'One Time only': row?.repeatType === 'daily' ? 'Daily' : '',
                imageType: row?.logoImage ? 'Logo' : 'Banner',
                logoImage: row?.logoImage,
                bannerImage: row?.bannerImage,
                offerId: row?.offerId,
                gameId: row?.gameId,
                isRedirectToGameScreen: modalValue?.row?.isRedirectToGameScreen,
                navigationScreen: (row?.navigationScreen === 'ReferEarn')
                ? 'Refer Earn'
                : (row?.navigationScreen === 'AddCashScreenQR')
                  ? 'Add Cash Screen QR'
                  : (row?.navigationScreen === 'GameDetailsScreen')
                    ? 'Game Details Screen'
                    : row?.navigationScreen ===  'AddCashScreen'
                      ? 'Add Cash Screen'
                      : '',
            })
        }
    },[modalValue]);
    


    return(
        <Box sx={style}>
            <div className={'create_headToHead_modal modal_main_popup notification_popup  add_admin_user_popup'}>
                <div className={'add_admin_user_popup_title modal_popup_title'}>
                    <h2>{ modalValue?.isEdit ? `Update Notification` : `Create Notification` }</h2>
                </div>
                <div className={'add_admin_user_popup_content coupon_section_form '}>
                    <form method={'POST'} onSubmit={modalValue?.isEdit ?  (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className="formData">
                            <label> Title <span className={'validation-star'}>*</span></label>
                            <div className="emailWrap">
                                <input type="text" maxLength={20} value={formData?.title} className={'wrap_input_modal'}  name='title' placeholder={'Enter name'} onChange={(e)=>handleChange(e)} />
                                <span>{formData?.title?.length}/20</span>
                            </div>
                            {simpleValidator.current.message("title", formData?.title, 'required')}
                        </div>
                        <div className="formData">
                            <label> Description <span className={'validation-star'}>*</span></label>
                            <div className="text_Wrap emailWrap lo">
                                <input type={'text'} className={'wrap_input_modal'} style={{paddingRight:"70px"}} maxLength={100} value={formData.description} name='description' placeholder={'Enter description'} onChange={(e)=>handleChange(e)}  />
                                <span>{formData?.description?.length}/100</span>
                            </div>
                            {simpleValidator.current.message("description", formData?.description, 'required')}
                        </div>
                        <div>
                            <div className="formData">
                                <label> Image Type <span className={'validation-star'}>*</span></label>
                                <div className="emailWrap dropdown-mt">
                                    <CommonDropdown options={['Logo','Banner']} name={'imageType'} formData={formData} setFormData={setFormData} placeholder={"Select Image Type"}/>
                                </div>
                                {simpleValidator.current.message("imageType", formData?.imageType, 'required')}
                            </div>
                            <ImageTypeDropdown setFormData={setFormData} formData={formData} handleOpenErrorModal={handleOpenErrorModal} simpleValidator={simpleValidator} modalValue={modalValue} />
                            {formData?.imageType ? 
                            
                            (formData?.imageType === 'Banner' ?
                               (simpleValidator.current.message("banner", formData?.bannerImage, 'required'))
                                 :
                               (simpleValidator.current.message("logo", formData?.logoImage, 'required')))
                         : ""
                         }
                        </div>
                        <div className="formData">
                            <label> Notification Type <span className={'validation-star'}>*</span></label>
                            <div className="emailWrap">
                                <CommonDropdown options={['Offer', 'Normal']} name={'notificationType'} formData={formData} setFormData={setFormData} placeholder={"Select Notification Type"} />
                            </div>
                            {simpleValidator.current.message("notificationType", formData?.notificationType, 'required')}
                        </div>
                        {
                            formData?.notificationType === 'Offer' &&
                            <div className="formData">
                                <label>All Offer <span className={'validation-star'}>*</span></label>
                                <div className="emailWrap">
                                    <OfferTypeDropdown options={offerTypeList} name={'offerId'} formData={formData} setFormData={setFormData} placeholder={"Select All Offer"}/>
                                </div>
                                {simpleValidator.current.message("Offer", formData?.offerId, 'required')}
                            </div>
                        }
                        <div className="formData">
                            <label> User Type <span className={'validation-star'}>*</span></label>
                            <div className="emailWrap">
                                <UserTypeDropdown options={modalValue?.notificationType} name={'userTypeId'} formData={formData} setFormData={setFormData} placeholder={"Select User Type"}/>
                            </div>
                            {simpleValidator.current.message("userType", formData?.userTypeId, 'required')}
                        </div>
                        <div className={'date-picker-details-section'}>
                            <div className={'care-datePicker d_flex_start'}>
                                <div className={'date-picker_coupon w_100 mr'}>
                                    <div className={'start-date-picker'}>
                                        <label>Start Date <span className={'validation-star'}>*</span></label>
                                        <div className={'date_picker_value'}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}  >
                                                <DatePicker
                                                    name='sendDate'
                                                    value={formData?.sendDate}
                                                    onChange={(newValue) => handleDatePicker(newValue, 'sendDate')}
                                                    open={openCale.startDate}
                                                    onClose={() => setOpenCale({ ...openCale, startDate: false })}
                                                    minDate={new Date()}
                                                    renderInput={({ inputProps, ...restParams }) => {
                                                        return <TextField {...restParams} onClick={() => setOpenCale({ ...openCale, startDate: !openCale.startDate })}   inputProps={{
                                                            ...inputProps,
                                                            placeholder: "Select Start Date",
                                                        }} />
                                                    }}
                                                    inputProps={{ readOnly: true }}
                                                    inputFormat="MMM dd, yyyy"
                                                    className={'datePicker_details'}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                        {simpleValidator.current.message("start date", formData?.sendDate, 'required')}
                                    </div>
                                </div>
                                <div className={'user_kyc_section_filed start-time-date w_100 ml '}>
                                    <label>Send Time <span className={'validation-star'}>*</span></label>
                                    <DatePickerReact
                                        selected={formData?.sendTime}
                                        className="form_control mb_0"
                                        showTimeSelect
                                        showTimeSelectOnly
                                        onChange={(date) => {
                                            let date1 = new Date(date).getTime();
                                            let date2 = new Date().getTime();
                                            if(moment(moment(formData.sendDate)).isSame(moment(), 'day')   ){
                                                if(date1 < date2){
                                                   setValidTime(true)
                                                    setFormData({ ...formData, sendTime: date })
                                                }else {
                                                    setValidTime(false)
                                                    setFormData({ ...formData, sendTime: date })
                                                }
                                            }else {
                                                setValidTime(false)
                                                setFormData({ ...formData, sendTime: date })
                                            }
                                        }}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                        timeIntervals={1}
                                        placeholderText="hh:mm"
                                        minTime={moment(moment(formData.sendDate)).isSame(moment(), 'day') ? new Date() : new Date(formData.sendDate)}
                                        maxTime={moment().endOf('days').toDate()}
                                        onKeyDown={(e) => {
                                            e.preventDefault();
                                        }}
                                    />
                                    { validTime ? <span className={'srv-validation-message'}>Please Select Valid Time </span> : simpleValidator.current.message("send time", formData.sendTime, 'required')}
                                </div>


                            </div>
                        </div>

                       <div className={'d_flex_start'}>
                           <div className="formData mr">
                               <label> Navigation  </label>
                               <div className="emailWrap">
                                   <CommonDropdown options={['Game Details Screen','Add Cash Screen', 'Add Cash Screen QR','Refer Earn']} name={'navigationScreen'} formData={formData} setFormData={setFormData} placeholder={"Select Navigation"}/>
                               </div>
                           </div>

                           <div className="formData ml">
                               <label> Repeat Type <span className={'validation-star'}>*</span></label>
                               <div className="emailWrap">
                                   <CommonDropdown options={['Daily','One Time only']} name={'repeatType'} formData={formData} setFormData={setFormData} placeholder={"Select Repeat Type"}/>
                               </div>
                               {simpleValidator.current.message("repeatType", formData?.repeatType, 'required')}
                           </div>
                       </div>
                        {
                            (formData?.navigationScreen === 'Game Details Screen') &&
                            <div className={'mt_margin'}>
                                <GameListDropdown name={'gameId'} options={gameFilterData} formData={formData} setFormData={setFormData}/>
                                {simpleValidator.current.message("game", formData?.gameId, "required")}
                            </div>

                        }
                        <div className={'formData_btn'}>
                            <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                            <FilledButton type={'submit'} value={modalValue?.isEdit ? "Update" : 'Save'} className={'btn loader_css'} loading={loader} />
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
export default AddNotificationPopup