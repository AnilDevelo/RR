import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import FilledButton from "../../../../../Components/FileButton";
import CommonModal from "../../../../../hoc/CommonModal";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../hoc/PopContent";
import DropdownReleaseDate
    from "../../../../Bonus/ReferAndEarn/ReferAndEarnMonthlyTab/BonusReleaseDate/AddBonusReleaseDate/DropdownReleaseDate";
import DropdownList from "../../../../../Components/Dropdown/DropdownList";
import {addLeaderboardBonusList} from "../../../../../Redux/Bonus/action";


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
const AddLeaderboardBonus = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [, updateState] = useState({});
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [formData, setFormData] = useState({ numberOfTopPlayer: '',  startDate: '',  bonusPositions: [], isPositionChange:false,isLeaderBoardBonusConfigOn:false, depositInto:'' });
    const forceUpdate = useCallback(() => updateState({}), []);
    const [openCale, setOpenCale] = useState({ expireDate: false, startDate: false });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
                let payload = {
                    numberOfTopPlayer:formData?.numberOfTopPlayer,
                    bonusPositions:formData?.bonusPositions,
                    date: formData?.startDate,
                    isLeaderBoardBonusConfigOn:formData?.isLeaderBoardBonusConfigOn,
                    depositInto:formData?.depositInto === 'Winning Cash' ? 'WinCash' : formData?.depositInto === 'Deposit Cash' ? 'DepositCash' : formData?.depositInto === 'Bonus Cash' && 'Bonus'
                }
            setLoader(true)
            dispatch(addLeaderboardBonusList(payload)).then(res => {
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
        if (formData?.numberOfTopPlayer && formData?.isPositionChange) {
            setFormData({
                ...formData,
                bonusPositions: Array(+formData?.numberOfTopPlayer).fill('')
            })
        }
        if(formData?.numberOfTopPlayer === '' && formData?.isPositionChange){
            setFormData({
                ...formData,
                bonusPositions: []
            })
        }
    }, [formData?.numberOfTopPlayer])

    const positionChangeHandler = (e, index) => {
        let temp = [...formData.bonusPositions]
        temp[index] = e.target.value;
        setFormData({
            ...formData,
            bonusPositions: temp
        })
    }

    useEffect(()=>{
        if(modalValue?.isEdit){
            setFormData({
                ...formData,
                numberOfTopPlayer: modalValue?.row?.numberOfTopPlayer,
                bonusPositions: modalValue?.row?.bonusPositions,
                startDate:  modalValue?.row?.date,
                isLeaderBoardBonusConfigOn:modalValue?.row?.isLeaderBoardBonusConfigOn,
                depositInto: modalValue?.row?.depositInto === 'WinCash' ?  'Winning Cash' : modalValue?.row?.depositInto === 'DepositCash' ? 'Deposit Cash' : modalValue?.row?.depositInto === 'Bonus' && 'Bonus Cash'
            })
        }
    },[modalValue?.isEdit])

    return (
        <Box sx={style}>
            <div className={'add_admin_user_popup leaderboard-bonus-section'}>
                <div className={'add_admin_user_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Leaderboard Bonus' : 'Add Leaderboard Bonus'}</h2>
                </div>
                <div className={'header_slider_details header_slider_details_Ads'}>
                    <form className='form_group ' onSubmit={ (e) => handleSubmit(e)}>
                        {/*--------------------------------------- Game Logo [Start] ----------------------------------------- */}
                        <div className={'date-picker_coupon'}>
                            <div className={'start-date-picker'}>
                                <label>Date</label>
                                <DropdownReleaseDate name={'startDate'} setFormData={setFormData} formData={formData}  />
                                {simpleValidator.current.message("startDate", formData?.startDate, "required")}
                            </div>
                        </div>
                        <div className={'select_game_platform_value game_mode game_mode_main_section'}>
                            <div className={'select_label tab01 game_mode_left_details'}>
                                <label>Is Leaderboard Bonus ? </label>
                                <div className={'game_mode_btn'}>
                                    <div className={'game_mode_btn_option'}>
                                        <input type={'radio'} name={'isLeaderBoardBonusConfigOn'} checked={formData?.isLeaderBoardBonusConfigOn} onChange={(e) => setFormData({ ...formData, isLeaderBoardBonusConfigOn: true })} />
                                        <label>Yes</label>
                                    </div>
                                    <div className={'game_mode_btn_option tab_radio'}>
                                        <input type={'radio'} name={'isLeaderBoardBonusConfigOn'} checked={!formData?.isLeaderBoardBonusConfigOn} onChange={(e) => setFormData({ ...formData, isLeaderBoardBonusConfigOn: false })} />
                                        <label>No</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'date-picker_coupon'}>
                            <div className={'start-date-picker'}>
                                <label>Bonus Type</label>
                                <DropdownList name={'depositInto'} options={['Winning Cash','Bonus Cash', 'Deposit Cash']} setFormData={setFormData} formData={formData}  />
                                {simpleValidator.current.message("bonusType", formData?.depositInto, "required")}
                            </div>
                        </div>
                        <div className={'user_kyc_section_filed'}>
                            <label>Number Of Top Player</label>
                            <div className={'user_kyc_section_input_filed'}>
                                <input type={'number'} onWheel={(e) => e.currentTarget.blur()} placeholder={'Enter Number Of Top Player'} value={formData?.numberOfTopPlayer} name={'lobbyType'} onChange={(e) => setFormData({ ...formData, numberOfTopPlayer: e.target.value, isPositionChange:true })} />
                            </div>
                            {simpleValidator.current.message("noOfPlayer", formData?.numberOfTopPlayer, 'required')}
                        </div>
                        {
                            formData?.bonusPositions?.map((item, i) => {
                                return (
                                    <div className={'user_kyc_section_filed'}>
                                        <label>{`${i + 1} Positions`}</label>
                                        <div className={'user_kyc_section_input_filed'}>
                                            <input type={'number'} onWheel={(e) => e.currentTarget.blur()} placeholder={'Enter Positions Bonus'} value={item} name={'lobbyType'} onChange={(e) => positionChangeHandler(e, i)} />
                                        </div>
                                        {simpleValidator.current.message("Positions", item, 'required')}
                                    </div>
                                )
                            })
                        }
                        {/*--------------------------------------- Game Logo [End] ----------------------------------------- */}
                        <div className={'formData_btn'}>
                            <button className={'cancel_btn'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                            <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'submit_btn loader_css'} loading={loader} />
                        </div>
                    </form>
                </div>
            </div>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenErrorModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenErrorModal} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Box>
    );
};
export default AddLeaderboardBonus;