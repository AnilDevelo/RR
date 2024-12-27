import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import FilledButton from "../../../../Components/FileButton";
import CommonModal from "../../../../hoc/CommonModal";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../hoc/PopContent";
import { createHelpTicketType, updateHelpTicketType } from "../../../../Redux/HelpAndSupport/action";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 485,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};

const AddTicketTypePop = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState({ ticketType: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                ticketType:formData?.ticketType?.trim(),
            }
            setLoader(true)
            dispatch(createHelpTicketType(payload)).then(res => {
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

    useEffect(() => {
        if (modalValue?.isEdit) {
            setFormData({
                ...formData,
                ticketType: modalValue?.row?.ticketType,

            })
        }
    }, [modalValue])

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

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                ticketId: modalValue?.row?._id,
                ticketType:formData?.ticketType?.trim(),
            }
            setLoader(true)
            dispatch(updateHelpTicketType(payload)).then(res => {
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

    return (
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup lobby_section_details'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Ticket Type' : 'Add  Ticket Type'}</h2>
                </div>
                <div className={'add_admin_user_popup_content'}>
                    <form onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className={'user_kyc_section'}>
                            <div className={'user_kyc_section_filed'}>
                                <label>Ticket Type <span className={'validation-star'}>*</span></label>
                                <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                    <input type={'text'} value={formData?.ticketType} maxLength={20} name={'ticketType'} placeholder={'Enter Ticket Type'} onChange={(e) => setFormData({ ...formData, ticketType: e.target.value })} />
                                    <span>{formData?.ticketType?.length}/20</span>
                                </div>
                                {simpleValidator.current.message("ticketType", formData?.ticketType, 'required')}
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
export default AddTicketTypePop