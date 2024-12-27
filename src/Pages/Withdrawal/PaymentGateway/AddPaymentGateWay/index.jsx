import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../hoc/PopContent";
import {
    addPaymentGatewaySettings,
    UpdatePaymentGatewaySettings
} from "../../../../Redux/Master/action";
import {Box} from "@mui/material";
import CommonDropdown from "../../../../Components/Dropdown/CommonDropdown";
import FilledButton from "../../../../Components/FileButton";
import CommonModal from "../../../../hoc/CommonModal";


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

const AddPaymentGateWay = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData, setFormData] = useState({
        depositPaymentGateway: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                depositPaymentGateway: formData?.depositPaymentGateway === 'PhonePe' ? 'PhonePay' : formData?.depositPaymentGateway
            }
            setLoader(true)
            dispatch(addPaymentGatewaySettings(payload)).then(res => {
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


    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                depositPaymentGateway: formData?.depositPaymentGateway === 'PhonePe' ? 'PhonePay' : formData?.depositPaymentGateway,
                paymentGatewayId:modalValue?.row?._id
            }
            setLoader(true)
            dispatch(UpdatePaymentGatewaySettings(payload)).then(res => {
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

    useEffect(() => {
        if (modalValue?.isEdit) {
            setFormData({
                ...formData,
                depositPaymentGateway: modalValue?.row?.depositPaymentGateway === 'PhonePay' ? 'PhonePe' : modalValue?.row?.depositPaymentGateway,
            })
        }
    }, [modalValue?.isEdit]);


    // useEffect(() => {
    //     if (document.getElementsByClassName('notranslate')) {
    //         document.getElementsByClassName('notranslate')[0].innerHTML = 'Select'
    //     }
    // }, []);


    return (
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup lobby_section_details'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Payment Gateway' : 'Add Payment Gateway'}</h2>
                </div>
                <div className={'add_admin_user_popup_content mt_15'}>
                    <form onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className={'level_popup_form_field_left'}>
                            <div className={'user_kyc_section'}>
                                <div className={'user_kyc_section_filed'}>
                                    <label>Select Deposit Payment Gateway <span className={'validation-star'}>*</span></label>
                                    <div className={'formData mt_margin mb_1  '}>
                                        <CommonDropdown options={['PhonePe','Manually']} name={'depositPaymentGateway'} setFormData={setFormData} formData={formData} />
                                    </div>
                                    {simpleValidator.current.message("depositPaymentGateway", formData?.depositPaymentGateway, 'required')}
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
export default AddPaymentGateWay