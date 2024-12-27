import React, {useCallback, useEffect, useRef, useState} from "react";
import Paper from "@mui/material/Paper";
import {hideActionFunc} from "../../../utils";
import FilledButton from "../../../Components/FileButton";
import SimpleReactValidator from "simple-react-validator";
import {createFlagConfig, getFlagConfig} from "../../../Redux/settings/action";
import PopComponent from "../../../hoc/PopContent";
import CommonModal from "../../../hoc/CommonModal";
import {useDispatch} from "react-redux";

const FlagConfig = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];

    const [formData,setFormData] = useState({
        isMonthlyReferAndEarnBonus:false,
        isGameLeaderboardBonus:false,
        isMobileNumberUpdateRequest:false,
        isKycUpdateRequest:false,
        isWithdrawlProcessAutomatic:false,
        verifyAdharCard: false
    })



    const handleOpenModal = (type, data) => {
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
        getFlagConfigList();
    }, []);

    const getFlagConfigList = () => {
        dispatch(getFlagConfig({})).then(res => {
            setLoader(false)
            if (res?.data?.success) {
                let flagConfig = res?.data?.data?.reduce((acc,cur)=>{return{...cur}},{})
                setFormData({
                    ...formData,
                    isMonthlyReferAndEarnBonus: flagConfig?.isMonthlyReferAndEarnBonus,
                    isGameLeaderboardBonus: flagConfig?.isGameLeaderboardBonus,
                    isMobileNumberUpdateRequest: flagConfig?.isMobileNumberUpdateRequest,
                    isKycUpdateRequest: flagConfig?.isKycUpdateRequest,
                    isWithdrawlProcessAutomatic: flagConfig?.isWithdrawlProcessAutomatic,
                    verifyAdharCard: flagConfig?.verifyAdharCard
                })
            }
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData
            }
            dispatch(createFlagConfig(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false);
                    getFlagConfigList()
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

    return(
        <Paper sx={{ mb: 2 }} className="outer-box">
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className={'flag_config'}>
                    <div className={'main_setting_block'}>
                        <div className="main_switch_block">
                            <h5>Monthly Refer & Earn Bonus :</h5>
                            <div className="switch_box">
                                <p className={`${!formData?.isMonthlyReferAndEarnBonus ? 'off checked' : 'off'}`}>Off</p>
                                <div className={!formData?.isMonthlyReferAndEarnBonus ? "switch turnOff_btn" : 'switch'}>
                                    <input type="checkbox" checked={formData?.isMonthlyReferAndEarnBonus} onChange={() => setFormData({...formData,isMonthlyReferAndEarnBonus: !formData?.isMonthlyReferAndEarnBonus})} />
                                    <span className="slider"/>
                                </div>
                                <p className={`${formData?.isMonthlyReferAndEarnBonus ? 'on checked' : 'on'}`}>On</p>
                            </div>
                        </div>
                    </div>
                    <div className={'main_setting_block'}>
                        <div className="main_switch_block">
                            <h5>Game Leaderboard Bonus :</h5>
                            <div className="switch_box">
                                <p className={`${!formData?.isGameLeaderboardBonus ? 'off checked' : 'off'}`}>Off</p>
                                <div className={!formData?.isGameLeaderboardBonus ? "switch turnOff_btn" : 'switch'}>
                                    <input type="checkbox" checked={formData?.isGameLeaderboardBonus} onChange={() => setFormData({...formData,isGameLeaderboardBonus: !formData?.isGameLeaderboardBonus})} />
                                    <span className="slider"/>
                                </div>
                                <p className={`${formData?.isGameLeaderboardBonus ? 'on checked' : 'on'}`}>On</p>
                            </div>
                        </div>
                    </div>
                    <div className={'main_setting_block'}>
                        <div className="main_switch_block">
                            <h5>Mobile Number Update Request :</h5>
                            <div className="switch_box">
                                <p className={`${!formData?.isMobileNumberUpdateRequest ? 'off checked' : 'off'}`}>Off</p>
                                <div className={!formData?.isMobileNumberUpdateRequest ? "switch turnOff_btn" : 'switch'}>
                                    <input type="checkbox" checked={formData?.isMobileNumberUpdateRequest} onChange={() => setFormData({...formData,isMobileNumberUpdateRequest: !formData?.isMobileNumberUpdateRequest})} />
                                    <span className="slider"/>
                                </div>
                                <p className={`${formData?.isMobileNumberUpdateRequest ? 'on checked' : 'on'}`}>On</p>
                            </div>
                        </div>
                    </div>
                    <div className={'main_setting_block'}>
                        <div className="main_switch_block">
                            <h5>KYC Update Request :</h5>
                            <div className="switch_box">
                                <p className={`${!formData?.isKycUpdateRequest ? 'off checked' : 'off'}`}>Off</p>
                                <div className={!formData?.isKycUpdateRequest ? "switch turnOff_btn" : 'switch'}>
                                    <input type="checkbox" checked={formData?.isKycUpdateRequest} onChange={() => setFormData({...formData,isKycUpdateRequest: !formData?.isKycUpdateRequest})} />
                                    <span className="slider"/>
                                </div>
                                <p className={`${formData?.isKycUpdateRequest ? 'on checked' : 'on'}`}>On</p>
                            </div>
                        </div>
                    </div>
                    <div className={'main_setting_block'}>
                        <div className="main_switch_block">
                            <h5>Withdrawal Process Automatic :</h5>
                            <div className="switch_box">
                                <p className={`${!formData?.isWithdrawlProcessAutomatic ? 'off checked' : 'off'}`}>Off</p>
                                <div className={!formData?.isWithdrawlProcessAutomatic ? "switch turnOff_btn" : 'switch'}>
                                    <input type="checkbox" checked={formData?.isWithdrawlProcessAutomatic} onChange={() => setFormData({...formData, isWithdrawlProcessAutomatic: !formData?.isWithdrawlProcessAutomatic})} />
                                    <span className="slider"/>
                                </div>
                                <p className={`${formData?.isWithdrawlProcessAutomatic ? 'on checked' : 'on'}`}>On</p>
                            </div>
                        </div>
                    </div>
                    <div className={'main_setting_block'}>
                        <div className="main_switch_block">
                            <h5>Verify Aadhaar Card :</h5>
                            <div className="switch_box">
                                <p className={`${!formData?.verifyAdharCard ? 'off checked' : 'off'}`}>Off</p>
                                <div className={!formData?.verifyAdharCard ? "switch turnOff_btn" : 'switch'}>
                                    <input type="checkbox" checked={formData?.verifyAdharCard} onChange={() => setFormData({...formData, verifyAdharCard: !formData?.verifyAdharCard})} />
                                    <span className="slider"/>
                                </div>
                                <p className={`${formData?.verifyAdharCard ? 'on checked' : 'on'}`}>On</p>
                            </div>
                        </div>
                    </div>
                    {
                        hideActionFunc('setting') &&
                        // <div className={'game-play-rules'}>
                        //     <button >Save</button>
                        // </div>
                        <div className={'formData_btn game-play-rules'}>
                        <FilledButton type={'submit'} value={'Save'} className={'btn loader_css'} loading={loader} />
                        </div>
                    }
                </div>
            </form>
            <CommonModal className={modalDetails?.modalName} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen}  />
            </CommonModal>
        </Paper>
    )
}
export default FlagConfig