import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../hoc/PopContent";
import moment from "moment";
import {
    createNotificationUserTypeList,
   getNotificationUserTypeDropdownList,
} from "../../../../../Redux/Master/action";
import {Box} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import DropdownList from "../../../../../Components/Dropdown/DropdownList";
import FilledButton from "../../../../../Components/FileButton";
import CommonModal from "../../../../../hoc/CommonModal";
import CommonDropdown from "../../../../../Components/Dropdown/CommonDropdown";
import {MultiSelect} from "react-multi-select-component";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {getLeaderboardGameList} from "../../../../../Redux/Bonus/action";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 0,
    borderRadius: "5px",
};


const AddUserTypeNotification = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [gameFilterData, setGameFilterData] = useState([])
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [notificationType, setNotificationType] = useState([])
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        userType: '',
        minAddCash: '',
        minWalletCash: '',
        maxEntryFees: '',
        gameIds: [],
        minRank:'',
        inActiveType:'',
        inActiveTime:'',
        numericId:''
    });
    const [openCale, setOpenCale] = useState({
        endDate: false,
        startDate: false
    })

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData({
            ...formData,
            [name]: value?.replace(/^0+/, "")
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                gameIds: formData?.gameIds?.length > 0 ? formData?.gameIds?.map(item=>item?.value) : []
            }
            // if(payload?.userType === 'Inactive User - Last 24 Hour' || payload?.userType === 'Inactive User - Last 1 Week' || payload?.userType === 'Inactive User - Last 1 Month'){
            //     payload = {
            //         ...payload,
            //         // userType : 'Inactive User',
            //         // inActiveType: formData?.userType === 'Inactive User - Last 24 Hour' ? 'Hour' :  payload?.userType === 'Inactive User - Last 1 Week' ?  'Week' : payload?.userType === 'Inactive User - Last 1 Month' && 'Month',
            //         // inActiveTime: formData?.userType === 'Inactive User - Last 24 Hour' ? '24' :  payload?.userType === 'Inactive User - Last 1 Week' ?  '1' : payload?.userType === 'Inactive User - Last 1 Month' && '1',
            //     }
            // }
            Object?.keys(payload).forEach(ele => {
                if (payload[ele] === '' || payload[ele] === null) { delete payload[ele] }
            });
            if(payload?.gameIds?.length <= 0){
                delete payload?.gameIds
            }
            setLoader(true)
            dispatch(createNotificationUserTypeList(payload)).then(res => {
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

    useEffect(() => {
        if (modalValue?.isEdit) {
            const { row } = modalValue;

        }
    }, [modalValue]);

    useEffect(() => {
        dispatch(getLeaderboardGameList()).then(res => {
            setGameFilterData(res.data.data?.map((item) => { return { value: item?._id, label: item?.gameName} }) || [])
        })
    }, []);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        // if (simpleValidator.current.allValid()) {
        //
        //     setLoader(true)
        //     dispatch(updateOfferList(payload)).then(res => {
        //         if (res.data.success) {
        //             setLoader(false)
        //             redirectApiHandler()
        //             handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
        //         } else {
        //             setLoader(false)
        //             handleOpenErrorModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
        //         }
        //     })
        // } else {
        //     simpleValidator.current.showMessages();
        //     forceUpdate();
        // }
    };

    useEffect(()=>{
        if(modalValue?.isEdit){
            setFormData({
                userType: modalValue?.row?.userType,
                minAddCash: modalValue?.row?.minAddCash,
                minWalletCash: modalValue?.row?.minWalletCash,
                maxEntryFees: modalValue?.row?.maxEntryFees,
                gameIds: modalValue?.row?.gameIds,
                minRank:modalValue?.row?.minRank,
                inActiveType:modalValue?.row?.inActiveType,
                inActiveTime:modalValue?.row?.inActiveTime,
            })
        }
    },[modalValue])

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

    const handleDatePicker = (newValue, type) => {
        setFormData({ ...formData, [type]: newValue });
        setOpenCale({ ...openCale, [type]: false });
    }

    return (
        <Box sx={style}>
            <div className={'add_admin_user_popup user_notification_type modal_main_popup'}>
                <div className={'add_admin_user_popup_title modal_popup_title offer-details-section-title'}>
                    <h2>{modalValue?.isEdit ? 'Update User Notification Type' : 'Add User Notification Type '}</h2>
                </div>
                <div className={'add_admin_user_popup_content coupon_section_form offer-details-section'}>
                    <form method={'POST'} onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className="formData">
                            <label> User Type <span className={'validation-star'}>*</span></label>
                            <div className="emailWrap dropdown-mt">
                                <CommonDropdown options={['Highest Add Cash User', 'New User', 'Not Collected User', 'All User', 'Good Money', 'Low Lobby', 'Leaderboard', 'Inactive User',]} name={'userType'} formData={formData} setFormData={setFormData} placeholder={"Select User Type"} />
                            </div>
                            {simpleValidator.current.message("userType", formData?.userType, 'required')}
                        </div>
                        { formData?.userType === 'Highest Add Cash User' &&
                        <div className="formData w_100">
                            <label>Minimum Add Cash <span className={'validation-star'}>*</span></label>
                            <div className="emailWrap">
                                <input onWheel={event => event.currentTarget.blur()} type="number" value={formData?.minAddCash > 0 ? formData?.minAddCash : ''} name='minAddCash' onChange={(e) => handleChange(e)} />
                            </div>
                            {simpleValidator.current.message("minAddCash", formData?.minAddCash?.toString(), 'required|min:0|max:10')}
                        </div>
                        }

                        { formData?.userType === 'Good Money' &&
                        <div className="formData w_100">
                            <label>Minimum Wallet Cash <span className={'validation-star'}>*</span></label>
                            <div className="emailWrap">
                                <input onWheel={event => event.currentTarget.blur()} type="number" value={formData?.minWalletCash} name='minWalletCash' onChange={(e) => handleChange(e)} />
                            </div>
                            {simpleValidator.current.message("minWalletCash", formData?.minWalletCash?.toString(), 'required|min:0|max:10')}
                        </div>
                        }
                        {
                            formData?.userType === 'Low Lobby' &&
                                <div className={'d_flex_start lobby_label_testing'}>
                                    <div className="formData w_100 ">
                                        <label>Maximum Entry Fees <span className={'validation-star'}>*</span></label>
                                        <div className="emailWrap">
                                            <input style={{marginBottom:"0"}} onWheel={event => event.currentTarget.blur()} type="number" value={formData?.maxEntryFees} placeholder={'Maximum Entry Fees'} name='maxEntryFees' onChange={(e) => handleChange(e)} />
                                        </div>
                                        {simpleValidator.current.message("maxEntryFees", formData?.maxEntryFees?.toString(), 'required|min:0|max:10')}
                                    </div>
                                    <div className={'formData w_100 ml_1 '}>
                                        <label>Select Game <span className={'validation-star'}>*</span></label>
                                        <MultiSelect
                                            options={gameFilterData}
                                            value={formData?.gameIds}
                                            onChange={(value) => setFormData({ ...formData, gameIds: value })}
                                            labelledBy="Select State"
                                            name='adminUserPermission'
                                            className={'dropdown-mt game_dropdown'}
                                            arrowRenderer={() => <ArrowDropUpIcon />}
                                        />
                                        {simpleValidator.current.message("Game", formData?.gameIds, "required")}
                                    </div>
                                </div>
                        }

                        {
                            formData?.userType === 'Leaderboard' &&
                            <div className={'d_flex_start lobby_label_testing'}>
                                <div className="formData w_100 ">
                                    <label>Minimum Rank <span className={'validation-star'}>*</span></label>
                                    <div className="emailWrap">
                                        <input onWheel={event => event.currentTarget.blur()} type="number" value={formData?.minRank} placeholder={'Enter Minimum Rank'} name='minRank' onChange={(e) => handleChange(e)} />
                                    </div>
                                    {simpleValidator.current.message("minRank", formData?.minRank?.toString(), 'required|min:0|max:10')}
                                </div>
                                <div className={'formData w_100 ml_1 '}>
                                    <label>Select Game <span className={'validation-star'}>*</span></label>
                                    <MultiSelect
                                        options={gameFilterData}
                                        value={formData?.gameIds}
                                        onChange={(value) => setFormData({ ...formData, gameIds: value })}
                                        labelledBy="Select State"
                                        name='adminUserPermission'
                                        className={'dropdown-mt game_dropdown'}
                                        arrowRenderer={() => <ArrowDropUpIcon />}
                                    />
                                    {simpleValidator.current.message("Game", formData?.gameIds, "required")}
                                </div>
                            </div>
                        }

                        {
                            formData?.userType === 'Inactive User' &&
                            <div className={'inactive-user-details'}>
                                <div className="formData w_100 mr">
                                    <label>Select Last Hour/Week/Month <span className={'validation-star'}>*</span></label>
                                    <div className="emailWrap mt">
                                            <CommonDropdown options={Array.from(Array(30))} isActiveTime={true} name={'inActiveTime'} formData={formData} setFormData={setFormData} placeholder={"Select Last Hour/Week/Month"} />
                                    </div>
                                    {simpleValidator.current.message("inactive time", formData?.inActiveTime, 'required')}
                                </div>
                                <div className="formData w_100 ml">
                                    <label>Inactive User Type <span className={'validation-star'}>*</span></label>
                                    <div className="emailWrap mt">
                                        <CommonDropdown options={['Hour','Week','Month']} name={'inActiveType'} formData={formData} setFormData={setFormData} placeholder={"Select Inactive User Type"}/>
                                    </div>
                                    {simpleValidator.current.message("inactive user type", formData?.inActiveType, 'required')}
                                </div>
                            </div>
                        }

                        {/*<div className={'date-picker_coupon'}>*/}
                        {/*    <div className={'start-date-picker'}>*/}
                        {/*        <label>Start Date</label>*/}
                        {/*        <div className={'date_picker_value'}>*/}
                        {/*            <LocalizationProvider dateAdapter={AdapterDateFns}  >*/}
                        {/*                <DatePicker*/}
                        {/*                    name='startDate'*/}
                        {/*                    value={formData?.startDate}*/}
                        {/*                    onChange={(newValue) => handleDatePicker(newValue, 'startDate')}*/}
                        {/*                    open={openCale.startDate}*/}
                        {/*                    onClose={() => setOpenCale({ ...openCale, startDate: false })}*/}
                        {/*                    minDate={new Date()}*/}
                        {/*                    renderInput={(params) => {*/}
                        {/*                        return <TextField {...params} onClick={() => setOpenCale({ ...openCale, startDate: !openCale.startDate })} />*/}
                        {/*                    }}*/}

                        {/*                    inputProps={{ readOnly: true }}*/}
                        {/*                    inputFormat="MMM dd, yyyy"*/}
                        {/*                    className={'datePicker_details'}*/}
                        {/*                />*/}
                        {/*            </LocalizationProvider>*/}
                        {/*        </div>*/}
                        {/*        {simpleValidator.current.message("startDate", formData?.startDate, 'required')}*/}
                        {/*    </div>*/}
                        {/*    <div className={'end-date-picker ml_1'}>*/}
                        {/*        <label>End Date</label>*/}
                        {/*        <div className={'date_picker_value'}>*/}
                        {/*            <LocalizationProvider dateAdapter={AdapterDateFns} >*/}
                        {/*                <DatePicker*/}
                        {/*                    name='endDate'*/}
                        {/*                    value={formData?.endDate}*/}
                        {/*                    onChange={(newValue) => handleDatePicker(newValue, 'endDate')}*/}
                        {/*                    open={openCale.endDate}*/}
                        {/*                    onClose={() => setOpenCale({ ...openCale, endDate: false })}*/}
                        {/*                    inputFormat="MMM dd, yyyy"*/}
                        {/*                    minDate={formData?.startDate}*/}
                        {/*                    renderInput={(params) => <TextField {...params} onClick={() => setOpenCale({ ...openCale, endDate: !openCale.endDate })} />}*/}
                        {/*                    inputProps={{ readOnly: true }}*/}
                        {/*                />*/}
                        {/*            </LocalizationProvider>*/}

                        {/*        </div>*/}
                        {/*        {simpleValidator.current.message("endDate", formData?.endDate, 'required')}*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className={'d_flex_start'}>*/}
                        {/*    <div className="formData w_100">*/}
                        {/*        <label>Cashback Type</label>*/}
                        {/*        <CashbackType options={['Fix Amount', 'Upto Amount', 'Percentage']} name={'cashbackType'} setFormData={setFormData} formData={formData}/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

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
export default AddUserTypeNotification