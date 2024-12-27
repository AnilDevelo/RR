import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../hoc/PopContent";
import {createAvatarData, editAvatarData} from "../../../../../Redux/Avatar/action";
import {jsonToFormData, profileImages} from "../../../../../utils";
import {Box} from "@mui/material";
import user from "../../../../../assets/images/avatar.png";
import icon_plus from "../../../../../assets/images/plus.svg";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import FilledButton from "../../../../../Components/FileButton";
import CommonModal from "../../../../../hoc/CommonModal";
import DropdownReleaseDate
    from "../../../../Bonus/ReferAndEarn/ReferAndEarnMonthlyTab/BonusReleaseDate/AddBonusReleaseDate/DropdownReleaseDate";
import {addGSTConfig, updateGSTConfig} from "../../../../../Redux/revenue/action";
import GSTPercentageDropdown from "Components/Dropdown/GSTPercentageDropdown";

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
const AddGSTConfig = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData, setFormData] = useState({ igstPercentage: '', sgstPercentage: '', startDate: '',  });

    const changeHandler = (e) => {
        const { value, name } = e.target;
        const truncatedValue = value.slice(0, 2); // Get the first three characters
        setFormData({
            ...formData,
            [name]: truncatedValue
        });
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
                igstPercentage:formData?.igstPercentage,
                sgstPercentage:formData?.sgstPercentage,
                monthlyGstCalculateDate:formData?.startDate
            }
            setLoader(true)
            dispatch(addGSTConfig(payload)).then((res) => {
                if (res.data.statusCode === 200 && res.data.success) {
                    setLoader(false);
                    redirectApiHandler()
                    handleOpenModal('CommonPop', { header: "Success", body: res.data.message })
                } else {
                    setLoader(false)
                    handleOpenModal('CommonPop', { header: "Error", body: res.data.message || res?.data?.msg })
                }
            });
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };


    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                igstPercentage:formData?.igstPercentage,
                sgstPercentage:formData?.sgstPercentage,
                monthlyGstCalculateDate:formData?.startDate,
                gstConfigId:modalValue?.row?._id
            }
            setLoader(true)
            dispatch(updateGSTConfig(payload)).then((res) => {
                if (res.data.success) {
                    redirectApiHandler();
                    setLoader(false)
                    handleOpenModal('CommonPop', { header: "Success", body: res.data.message });
                } else {
                    setLoader(false)
                    handleOpenModal('CommonPop', { header: "Error", body: res.data.message || res?.data?.msg });
                }
            }).catch(e => {
                setLoader(false)
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
                igstPercentage: modalValue?.row?.igstPercentage,
                sgstPercentage: modalValue?.row?.sgstPercentage,
                startDate:modalValue?.row?.monthlyGstCalculateDate
            })
        }
    },[modalValue?.isEdit])

    return(
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup add_avatar_section lobby_section_details'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update GST Config' : 'Add GST Config'}</h2>
                </div>
                <div className={'add_admin_user_popup_content mt_15'}>
                    <form onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className={'level_popup_form_field'}>
                            <div className={'w_100'}>
                                <div className={'user_kyc_section'}>
                                    <div className={'user_kyc_section_filed'}>
                                        <label>IGST (%)<span className={'validation-star'}>*</span></label>
                                        <div className={'user_kyc_section_input_filed'} style={{marginTop:"7px"}}>
                                            <GSTPercentageDropdown name={'igstPercentage'} formData={formData} setFormData={setFormData} placeholder={"Select IGST"} />
                                        </div>    
                                        {/* <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                            <input type={'number'} placeholder={'Enter IGST'} maxLength={2} value={formData?.igstPercentage} name={'igstPercentage'} onChange={(e) => changeHandler(e)} />
                                            <span>{formData?.igstPercentage?.toString()?.length}/2</span>
                                        </div> */}
                                        {simpleValidator.current.message("IGST", formData?.igstPercentage, 'required|numeric')}
                                    </div>
                                    <div className={'user_kyc_section_filed formData'}>
                                        <label>SGST (%)<span className={'validation-star'}>*</span></label>
                                        <div className={'user_kyc_section_input_filed'} style={{marginTop:"7px"}}>
                                        <GSTPercentageDropdown name={'sgstPercentage'} formData={formData} setFormData={setFormData} placeholder={"Select SGST"}/>
                                        </div>
                                        {/* <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                            <input type={'number'} placeholder={'Enter SGST'} maxLength={2} value={formData?.sgstPercentage} name={'sgstPercentage'} onChange={(e) => changeHandler(e)} />
                                            <span>{formData?.sgstPercentage?.toString()?.length}/2</span>
                                        </div> */}
                                        {simpleValidator.current.message("SGST", formData?.sgstPercentage, 'required|numeric')}
                                    </div>
                                    <div className={'date-picker_coupon formData'}>
                                        <div className={'start-date-picker'}>
                                            <label>Date <span className={'validation-star'}>*</span></label>
                                            <DropdownReleaseDate name={'startDate'} setFormData={setFormData} formData={formData}  />
                                            {simpleValidator.current.message("monthlyGstDate", formData?.startDate, "required")}
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
export default AddGSTConfig