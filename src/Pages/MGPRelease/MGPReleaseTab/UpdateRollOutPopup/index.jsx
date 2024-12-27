import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { Box } from "@mui/material";
import FilledButton from "../../../../Components/FileButton";
import { updateRollOutDetails } from "../../../../Redux/MGPRelease/action";
import PopComponent from "../../../../hoc/PopContent";
import CommonModal from "../../../../hoc/CommonModal";
import DropdownRollOUT from "./DropdownRollOUT";
import DropdownReleaseDate from "../../../Bonus/ReferAndEarn/ReferAndEarnMonthlyTab/BonusReleaseDate/AddBonusReleaseDate/DropdownReleaseDate";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 486,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};
const UpdateRollOutPopup = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState({ rolloutPercentage: '' });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            setLoader(true)
            let payload = {
                ...formData,
                mgpReleaseId: modalValue?.id
            }
            dispatch(updateRollOutDetails(payload)).then(res => {
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
        if (modalValue) {
            setFormData({
                ...formData,
                rolloutPercentage: modalValue?.rolloutPercentage
            })
        }
    }, [modalValue?.isEdit]);



    return (
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup'}>
                <div className={'modal_popup_title'}>
                    <h2>Update RollOut</h2>
                </div>
                <div className={'add_admin_user_popup_content'}>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className={'user_kyc_section'}>
                            <div className={'user_kyc_section_filed'}>
                                <label>Rollout Percentage</label>
                                <DropdownRollOUT  name={'rolloutPercentage'} setFormData={setFormData} formData={formData}/>
                                {/*<div className={'user_kyc_section_input_filed'}>*/}
                                {/*    <input onWheel={event => event.currentTarget.blur()} type="number" value={formData?.rolloutPercentage} onChange={(e) => setFormData({ ...formData, rolloutPercentage: e.target.value })} />*/}
                                {/*</div>*/}
                                {simpleValidator.current.message("rolloutPercentage", formData?.rolloutPercentage, 'required')}
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
export default UpdateRollOutPopup