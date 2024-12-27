import React, {useCallback, useEffect, useRef, useState} from "react";
import {Box} from "@mui/material";
import FilledButton from "../../../../../Components/FileButton";
import CommonModal from "../../../../../hoc/CommonModal";
import {useDispatch} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../hoc/PopContent";
import {AddTDSConfig} from "../../../../../Redux/TDSReport/action";
import PercentageDropdown from "../../../../../Components/Dropdown/PercentageDropdown";

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

const AddTDSConfigPopup = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData, setFormData] = useState({
        tdsPercentage: '',
        tdsOnWinning:'',
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
            setLoader(true)
            dispatch(AddTDSConfig(formData)).then(res => {
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
    }

    useEffect(()=>{
        if(modalValue?.isEdit){
            setFormData({
                ...formData,
                tdsPercentage: modalValue?.row?.tdsPercentage,
                tdsOnWinning:modalValue?.row?.tdsOnWinning
            })
        }
    },[modalValue?.isEdit])
    return(
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup game-mode-config-design'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Edit TDS Config' : 'Add TDS Config'}</h2>
                </div>
                <div className={'header_slider_details header_slider_details_Ads'}>
                    <form className='form_group ' onSubmit={(e) => handleSubmit(e)}>
                        <div className={'user_kyc_section'}>
                            <div className={'formData'}>
                                <label>TDS Percentage (%)<span className={'validation-star'}>*</span></label>
                                <div className={'user_kyc_section_input_filed'}>
                                    <PercentageDropdown name={'tdsPercentage'} formData={formData} setFormData={setFormData} />
                                    {/*<input type={'text'} placeholder={'Enter TDS Percentage'} value={formData?.tdsPercentage} name={'tdsPercentage'} onChange={(e) => changeHandler(e)} />*/}
                                </div>
                                {simpleValidator.current.message("TDS Percentage", formData?.tdsPercentage, 'required')}
                            </div>
                        </div>
                        {/*<div className={'user_kyc_section'}>*/}
                        {/*    <div className={'formData'}>*/}
                        {/*        <label>TDS On Winnings Amount</label>*/}
                        {/*        <div className={'user_kyc_section_input_filed'}>*/}
                        {/*            <input type={'text'} placeholder={'Enter TDS On Winnings'} value={formData?.tdsOnWinning} name={'tdsOnWinning'} onChange={(e) => changeHandler(e)} />*/}
                        {/*        </div>*/}
                        {/*        {simpleValidator.current.message("TDS OnWinnings", formData?.tdsOnWinning, 'required')}*/}
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
export default AddTDSConfigPopup