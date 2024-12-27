import {useDispatch} from "react-redux";
import React, {useCallback, useEffect, useRef, useState} from "react";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../hoc/PopContent";
import {Box} from "@mui/material";
import FilledButton from "../../../../../Components/FileButton";
import CommonModal from "../../../../../hoc/CommonModal";
import {referAndEarnRankConfig, updateReferAndEarnRankConfig} from "../../../../../Redux/Bonus/action";

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

const AddGameLeaderboard = ({ modalValue, handleOpenModal, redirectApiHandler,monthlyBonus }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData, setFormData] = useState({
        startRank: '',
        endRank:'',
        bonus:''
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
            let payload = {
                startRank:+formData?.startRank,
                endRank:+formData?.endRank,
                bonus:+formData?.bonus
            }
            setLoader(true)
            dispatch(referAndEarnRankConfig(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    redirectApiHandler()
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                } else {
                    setLoader(false)
                    handleOpenErrorModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                }
            })
        }else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                startRank:+formData?.startRank,
                endRank:+formData?.endRank,
                bonus:+formData?.bonus,
                referAndEarnRankConfigId: modalValue?.row?._id
            }
            setLoader(true)
            dispatch(updateReferAndEarnRankConfig(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    redirectApiHandler()
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                } else {
                    setLoader(false)
                    handleOpenErrorModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                }
            })
        }else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }


    useEffect(()=>{
        if(modalValue?.isEdit){
            setFormData({
                ...formData,
                startRank:modalValue?.row?.startRank,
                endRank:modalValue?.row?.endRank,
                bonus:modalValue?.row?.bonus
            })
        }
    },[modalValue?.isEdit])

    useEffect(()=>{
        monthlyBonus?.ranks?.reduce((acc,cur)=> acc + cur['bonus'],0)
       // let temp =  monthlyBonus?.monthlyBonusAmountConfig?.reduce((acc,cur)=>{return {...cur}},{});
    },[])

    return(
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup leaderboard-bonus-section monthly-refer-and-earn-config'}>
                <div className={'modal_popup_title '}>
                    <h2>{modalValue?.isEdit ? 'Update Monthly Refer & Earn Rank' : 'Add Monthly Refer & Earn Rank'}</h2>
                    {/*<div>*/}
                    {/*  <p className={'bonus-count'}>BonusLimit: { formData?.bonus ? ((+monthlyBonus?.monthlyBonusConfig?.maxMonthlyBonusLimit - monthlyBonus?.ranks?.reduce((acc,cur)=> acc + cur['bonus'],0)) - (+formData?.bonus))  : (+monthlyBonus?.monthlyBonusConfig?.maxMonthlyBonusLimit - monthlyBonus?.ranks?.reduce((acc,cur)=> acc + cur['bonus'],0))} </p>*/}
                    {/*</div>*/}
                </div>
                <div className={'header_slider_details header_slider_details_Ads'}>
                    <form className='form_group ' onSubmit={modalValue?.isEdit ? (e ) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        {/*--------------------------------------- Game Logo [Start] ----------------------------------------- */}
                        <div className={'config-refer-section'}>
                            <div className={'config-refer-section-left-main'}>
                                <div className={'config-refer-section-left'}>
                                    <div className={'user_kyc_section tab-01'}>
                                        <div className={modalValue?.isEdit ?  'formData readOnly_field' : 'formData'}>
                                            <label>Start Rank Range <span className={'validation-star'}>*</span></label>
                                            <div className={'user_kyc_section_input_filed'}>
                                                <input type={'number'} onWheel={(e)=> e.currentTarget.blur()} readOnly={modalValue?.isEdit} className={modalValue?.isEdit ? 'readOnly' : ''} placeholder={'Rank Start'}  value={formData?.startRank} name={'startRank'} onChange={(e) => changeHandler(e)} />
                                            </div>
                                            {simpleValidator.current.message("startRank", formData?.startRank?.toString(), 'required|min:0|max:7')}
                                        </div>
                                    </div>
                                    <div className={'center-to'}>TO</div>
                                    <div className={'formData tab-02 w_100 '} style={{marginTop:0}}>
                                        <div className={modalValue?.isEdit ?  'formData readOnly_field' : 'formData'}>
                                            <label>End Rank Range <span className={'validation-star'}>*</span></label>
                                            <div className={'user_kyc_section_input_filed'}>
                                                <input type={'number'} onWheel={(e)=> e.currentTarget.blur()} className={modalValue?.isEdit ? 'readOnly' : ''} readOnly={modalValue?.isEdit} value={formData?.endRank} placeholder={'Rank End'}  name={'endRank'} onChange={(e) => changeHandler(e)} />
                                            </div>
                                            {simpleValidator.current.message("endRank", formData?.endRank?.toString(), 'required|min:0|max:7')}
                                            <span className={'srv-validation-message'}>{((+formData?.endRank) >= (+formData?.startRank) ) ? '' : formData?.endRank !== '' ? 'please enter end rank equal or greater than start rank' : ''}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={'user_kyc_section right-section'}>
                            <div className={'formData'}>
                                <label>Bonus <span className={'validation-star'}>*</span></label>
                                <div className={'user_kyc_section_input_filed'}>
                                    <input type={'number'} placeholder={'Enter Bonus'} onWheel={(e)=> e.currentTarget.blur()} value={formData?.bonus >= 0 && formData?.bonus} name={'bonus'} onChange={(e) => changeHandler(e)} />
                                </div>
                                {simpleValidator.current.message("bonus", formData?.bonus?.toString(), 'required|min:0|max:10')}
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
export default AddGameLeaderboard