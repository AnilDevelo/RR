import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../../../../../hoc/PopContent";
import {addGameMonthlyLeaderboardBonusReleaseDate} from "../../../../../../../../../Redux/games/action";
import {Box} from "@mui/material";
import DropdownReleaseDate from "./DropdownReleaseDate";
import FilledButton from "../../../../../../../../../Components/FileButton";
import CommonModal from "../../../../../../../../../hoc/CommonModal";

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

const AddGameLeaderboardBonusReleaseDate = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const [openCale, setOpenCale] = useState({ expireDate: false, startDate: false });
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData, setFormData] = useState({
        startDate: '',
    });

    const handleDatePicker = (newValue, type) => {
        setFormData({ ...formData, [type]: newValue });
        setOpenCale({ ...openCale, [type]: false });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            setLoader(true)
            let payload = {
                gameId:id,
                bonusReleaseDate : formData?.startDate
            }
            dispatch(addGameMonthlyLeaderboardBonusReleaseDate(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    redirectApiHandler()
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                } else {
                    setLoader(false)
                    handleOpenModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                }
            })
        }else {
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
    useEffect(()=>{
        if(modalValue?.isEdit){
            setFormData({
                ...formData,
                startDate: modalValue?.row?.bonusReleaseDate || modalValue?.row?.date
            })
        }
    },[modalValue?.isEdit])


    return(
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup leaderboard-bonus-section monthly-refer-and-earn-config'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Leaderboard Release Date' : 'Add  Leaderboard Release Date'}</h2>
                </div>
                <div className={'header_slider_details header_slider_details_Ads'}>
                    <form className='form_group ' onSubmit={ (e) => handleSubmit(e)}>
                        {/*--------------------------------------- Game Logo [Start] ----------------------------------------- */}
                        <div className={'date-picker_coupon'}>
                            <div className={'start-date-picker'}>
                                <label>Date <span className={'validation-star'}>*</span></label>
                                <DropdownReleaseDate name={'startDate'} setFormData={setFormData} formData={formData}  />
                                {simpleValidator.current.message("Date", formData?.startDate, "required")}
                            </div>
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
export default AddGameLeaderboardBonusReleaseDate