import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import moment from "moment";
import SimpleReactValidator from "simple-react-validator";
import CashbackType from "./CashbackType";
import PopComponent from "../../../../hoc/PopContent";
import DropdownList from "../../../../Components/Dropdown/DropdownList";
import FilledButton from "../../../../Components/FileButton";
import CommonModal from "../../../../hoc/CommonModal";
import {createOfferList, updateOfferList} from "../../../../Redux/Bonus/action";
import PercentageDropdown from "../../../../Components/Dropdown/PercentageDropdown";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 0,
    borderRadius: "5px",
};

const AddOffer = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [filterData, setFilterData] = useState({
        startDate: '',
        endDate: '',
        offerName: '',
        offerDescription: '',
        minDepositAmount: '',
        isCashbackBonusInPercentage: false,
        cashbackBonus: '',
        cashbackType:'',
        depositInto:'',
        upTo:'',
        isDeductTDS:false
    });
    const [openCale, setOpenCale] = useState({
        endDate: false,
        startDate: false
    })

    const handleChangeNumber = (e) => {
        const { value, name } = e.target;
        // Validate the value to restrict it to a maximum of 20 characters and disallow /*-+ and alphabets
        const sanitizedValue = value.replace(/[^0-9]/g, '').slice(0, 20);
        const finalValue = sanitizedValue === '0' ? '' : sanitizedValue;
        setFilterData((prevFilterData) => ({
          ...prevFilterData,
          [name]: finalValue,
        }));
    };
    
      
      const handleChange = (event) => {
        setFilterData({
            ...filterData,
            [event.target.name]: event.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...filterData,
                cashbackType: filterData?.cashbackType === 'Fix Amount' ? 'FixAmount' : filterData?.cashbackType === 'Upto Amount' ? 'Upto' :  'Percentage',
                depositInto:filterData?.depositInto === 'Winning Cash' ? 'WinCash' : filterData?.depositInto === 'Deposit Cash' ? 'DepositCash' : filterData?.depositInto === 'Bonus Cash' && 'Bonus',
                startDate: moment(filterData?.startDate).format("YYYY-MM-DD"),
                endDate: moment(filterData?.endDate).format("YYYY-MM-DD"),
            }
            setLoader(true)
            dispatch(createOfferList(payload)).then(res => {
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
            setFilterData({
                ...filterData,
                offerName: row?.offerName,
                offerDescription: row?.offerDescription,
                cashbackType: row?.cashbackType === 'FixAmount' ? 'Fix Amount' : row?.cashbackType === 'Upto' ? 'Upto Amount' :  'Percentage',
                cashbackBonus: row?.cashbackBonus,
                depositInto: row?.depositInto === 'WinCash' ?  'Winning Cash' : row?.depositInto === 'DepositCash' ? 'Deposit Cash' : row?.depositInto === 'Bonus' && 'Bonus Cash',
                minDepositAmount: row?.minDepositAmount,
                startDate: row?.startDate,
                endDate: row?.endDate,
                upTo:row?.upTo
            })
        }
    }, [modalValue]);



    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...filterData,
                cashbackType: filterData?.cashbackType === 'Fix Amount' ? 'FixAmount' : filterData?.cashbackType === 'Upto Amount' ? 'Upto' :  'Percentage',
                depositInto:filterData?.depositInto === 'Winning Cash' ? 'WinCash' : filterData?.depositInto === 'Deposit Cash' ? 'DepositCash' : filterData?.depositInto === 'Bonus Cash' && 'Bonus',
                startDate: moment(filterData?.startDate).format("YYYY-MM-DD"),
                endDate: moment(filterData?.endDate).format("YYYY-MM-DD"),
                offerId: modalValue?.row?._id
            }
            setLoader(true)
            dispatch(updateOfferList(payload)).then(res => {
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
        if(type === 'startDate'){
            setFilterData({ ...filterData, [type]: newValue, endDate: null });
        }else {
            setFilterData({ ...filterData, [type]: newValue });
        }

        setOpenCale({ ...openCale, [type]: false });
    };


    return (
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup offer-details-section'}>
                <div className={'add_admin_user_popup_title modal_popup_title offer-details-section-title'}>
                    <h2>{modalValue?.isEdit ? 'Update Offer' : 'Add Offer'}</h2>
                </div>
                <div className={'add_admin_user_popup_content coupon_section_form offer-details-section'}>
                    <form method={'POST'} onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        {/*<div className="formData">*/}
                        {/*    <label>Title</label>*/}
                        {/*    <div className="emailWrap">*/}
                        {/*        <input type="text" value={filterData?.offerName} name='offerName' onChange={(e) => handleChange(e)} />*/}
                        {/*    </div>*/}
                        {/*    {simpleValidator.current.message("offerName", filterData?.offerName, 'required')}*/}
                        {/*</div>*/}

                        <div className="formData">
                            <label>Title <span className={'validation-star'}>*</span></label>
                            <div className="emailWrap">
                                <input type="text" value={filterData?.offerName} className={'wrap_input_modal'} maxLength={40} name='offerName' placeholder={'Enter Offer Title'} onChange={(e)=>handleChange(e)} />
                                <span>{filterData?.offerName?.length}/40</span>
                            </div>
                            {simpleValidator.current.message("offer Title", filterData?.offerName, 'required')}
                        </div>

                        <div className="formData">
                            <label>Description</label>
                            <div className="emailWrap offer-description">
                                <textarea maxLength={100} rows={4} name={'offerDescription'} value={filterData?.offerDescription} onChange={(e) => handleChange(e)} placeholder="Enter Description"/>
                            </div>
                        </div>
                        <div className={'date-picker_coupon'}>
                            <div className={'start-date-picker'}>
                                <label>Start Date <span className={'validation-star'}>*</span></label>
                                <div className={'date_picker_value'}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}  >
                                        <DatePicker
                                            name='startDate'
                                            value={filterData?.startDate}
                                            onChange={(newValue) => handleDatePicker(newValue, 'startDate')}
                                            open={openCale.startDate}
                                            onClose={() => setOpenCale({ ...openCale, startDate: false })}
                                            minDate={new Date()}
                                            renderInput={(params) => {
                                                return <TextField {...params} onClick={() => setOpenCale({ ...openCale, startDate: !openCale.startDate })} />
                                            }}

                                            inputProps={{ readOnly: true , placeholder: "Select Start Date" }}
                                            inputFormat="MMM dd, yyyy"
                                            className={'datePicker_details'}
                                        />
                                    </LocalizationProvider>
                                </div>
                                {simpleValidator.current.message("startDate", filterData?.startDate, 'required')}
                            </div>
                            <div className={'end-date-picker ml_1'}>
                                <label>End Date <span className={'validation-star'}>*</span></label>
                                <div className={'date_picker_value'}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                                        <DatePicker
                                            name='endDate'
                                            value={filterData?.endDate}
                                            onChange={(newValue) => handleDatePicker(newValue, 'endDate')}
                                            open={openCale.endDate}
                                            onClose={() => setOpenCale({ ...openCale, endDate: false })}
                                            inputFormat="MMM dd, yyyy"
                                            minDate={filterData?.startDate ? filterData?.startDate : new Date()}
                                            renderInput={(params) => <TextField {...params} onClick={() => setOpenCale({ ...openCale, endDate: !openCale.endDate })} />}
                                            inputProps={{ readOnly: true , placeholder: "Select End Date" }}
                                        />
                                    </LocalizationProvider>

                                </div>
                                {simpleValidator.current.message("endDate", filterData?.endDate, 'required')}
                            </div>
                        </div>
                        <div className={'d_flex_start'}>
                            <div className="formData w_100">
                                <label>Cashback Type <span className={'validation-star'}>*</span></label>
                                <CashbackType options={['Fix Amount', 'Percentage']} name={'cashbackType'} setFormData={setFilterData} formData={filterData} placeholder={"Select Cashback Type"} />
                                {simpleValidator.current.message("CashbackType", filterData?.cashbackType, "required")}
                            </div>
                            { filterData?.cashbackType === 'Fix Amount' &&
                            <div className="formData w_100 ml_1">
                                <label>Cashback Bonus <span className={'validation-star'}>*</span></label>
                                <div className="emailWrap">
                                    <input autoComplete="off" onWheel={event => event.currentTarget.blur()} type="text" value={filterData?.cashbackBonus} name='cashbackBonus' onChange={(e) => handleChangeNumber(e)} placeholder="Enter Cashback Bonus"/>
                                </div>
                                {simpleValidator.current.message("cashback Bonus", filterData?.cashbackBonus?.toString(), 'required|min:0|max:10')}
                            </div>
                            }

                            { filterData?.cashbackType === 'Percentage' &&
                            <div className="formData w_100 ml_1">
                                    <label>Cashback Bonus (%)<span className={'validation-star'}>*</span></label>
                                <div className="emailWrap mt_margin">
                                    <PercentageDropdown name={'cashbackBonus'} formData={filterData} setFormData={setFilterData} placeholder={"Select Percentage"}/>
                                </div>
                                {simpleValidator.current.message("cashback Bonus", filterData?.cashbackBonus?.toString(), 'required')}
                            </div>
                            }
                        </div>
                        { filterData?.cashbackType === 'Percentage' &&
                        <div className="formData w_100 ">
                            <label>Up To Amount <span className={'validation-star'}>*</span></label>
                            <div className="emailWrap">
                                <input onWheel={event => event.currentTarget.blur()} type="text" value={filterData?.upTo} name='upTo' onChange={(e) => handleChangeNumber(e)} />
                            </div>
                            {simpleValidator.current.message("Up To Amount", filterData?.upTo?.toString(), 'required|min:0|max:10')}
                        </div>
                        }

                        <div className={'d_flex_start'}>
                            <div className={'date-picker_coupon formData monthly-bonus-type w_100'} style={{marginTop:"10px"}}>
                                <div className={'start-date-picker'}>
                                    <label>Bonus Type <span className={'validation-star'}>*</span></label>
                                    <DropdownList name={'depositInto'} options={['Winning Cash','Bonus Cash', 'Deposit Cash']} setFormData={setFilterData} formData={filterData}  placeholder={"Select Bonus Type"}/>
                                    {simpleValidator.current.message("bonusType", filterData?.depositInto, "required")}
                                </div>
                            </div>
                            {
                                filterData?.depositInto &&
                                <div className="formData w_100 ml_1">
                                    <label>Minimum Deposit Amount <span className={'validation-star'}>*</span></label>
                                    <div className="emailWrap">
                                        <input autoComplete="off" onWheel={event => event.currentTarget.blur()} type="text" value={filterData?.minDepositAmount} name='minDepositAmount' onChange={(e) => handleChangeNumber(e)} placeholder={"Enter Minimum Deposit Amount"}/>
                                    </div>
                                    {simpleValidator.current.message("MinimumDepositAmount", filterData?.minDepositAmount?.toString(), 'required|min:0|max:10')}
                                </div>
                            }

                        </div>
                        {/* <div className={'common_checkbox_details mt_more_margin'} >
                            <label>Is Deduct TDS  ? <span className={'validation-star'}>*</span></label>
                            <div className={'game_mode_btn'}>
                                <div className={'game_mode_btn_option yes_radio_btn'}>
                                    <input type={'radio'} name={`isDeductTDS`} checked={filterData?.isDeductTDS} onChange={(e) => setFilterData({...filterData, isDeductTDS:true})} />
                                    <label>Yes</label>
                                </div>
                                <div className={'game_mode_btn_option no_radio_btn'}>
                                    <input type={'radio'} name={`isDeductTDS`} checked={!filterData?.isDeductTDS} onChange={(e) => setFilterData({...filterData, isDeductTDS:false})} />
                                    <label>No</label>
                                </div>
                            </div>
                        </div> */}

                        {/*<div className="filter_data_radio">*/}
                        {/*    <label>Is Percentage Amount?</label>*/}
                        {/*    <div className={'filter_data_radio_sub'}>*/}
                        {/*        <div className="filter_data_radio_field tab_field_left">*/}
                        {/*            <input type="radio" name='isCashbackBonusInPercentage' checked={filterData?.isCashbackBonusInPercentage} onChange={() => setFilterData({ ...filterData, isCashbackBonusInPercentage: true })} />*/}
                        {/*            <label>Yes</label>*/}
                        {/*        </div>*/}
                        {/*        <div className="filter_data_radio_field tab_field_right">*/}
                        {/*            <input type="radio" name='isCashbackBonusInPercentage' checked={!filterData?.isCashbackBonusInPercentage} onChange={() => setFilterData({ ...filterData, isCashbackBonusInPercentage: false })} />*/}
                        {/*            <label>No</label>*/}
                        {/*        </div>*/}
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
export default AddOffer;