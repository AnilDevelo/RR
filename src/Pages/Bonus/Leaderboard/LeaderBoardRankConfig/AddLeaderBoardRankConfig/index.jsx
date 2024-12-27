import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../hoc/PopContent";
import {Box} from "@mui/material";
import FilledButton from "../../../../../Components/FileButton";
import CommonModal from "../../../../../hoc/CommonModal";


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

const AddLeaderBoardRankConfig = ({ modalValue, handleOpenModal, redirectApiHandler,monthlyBonus }) => {
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
                startRank:+formData?.startRank,
                endRank:+formData?.endRank,
                bonus:+formData?.bonus
            }
            setLoader(true)
            // dispatch(referAndEarnRankConfig(payload)).then(res => {
            //     if (res.data.success) {
            //         setLoader(false)
            //         redirectApiHandler()
            //         handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
            //     } else {
            //         setLoader(false)
            //         handleOpenErrorModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
            //     }
            // })
        }else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };

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
            // dispatch(updateReferAndEarnPointsConfig(payload)).then(res => {
            //     if (res.data.success) {
            //         setLoader(false)
            //         redirectApiHandler()
            //         handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
            //     } else {
            //         setLoader(false)
            //         handleOpenErrorModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
            //     }
            // })
        }else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };

    useEffect(()=>{
        if(modalValue?.isEdit){
            setFormData({
                ...formData,
                startRank:modalValue?.row?.startRank,
                endRank:modalValue?.row?.endRank,
                bonus:modalValue?.row?.bonus
            })
        }
    },[modalValue?.isEdit]);

    useEffect(()=>{
        monthlyBonus?.ranks?.reduce((acc,cur)=> acc + cur['bonus'],0);
    },[]);

    return(
        <Box sx={style}>
            <div className={'add_admin_user_popup leaderboard-bonus-section monthly-refer-and-earn-config'}>
                <div className={'add_admin_user_popup_title '}>
                    <h2>{modalValue?.isEdit ? 'Update  Monthly Leaderboard' : 'Add Monthly Leaderboard'}</h2>
                </div>
                <div className={'header_slider_details header_slider_details_Ads'}>
                    <form className='form_group ' onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        {/*--------------------------------------- Game Logo [Start] ----------------------------------------- */}
                        <div className={'config-refer-section'}>
                            <div className={'config-refer-section-left-main'}>
                                <div className={'config-refer-section-left'}>
                                    <div className={'user_kyc_section tab-01'}>
                                        <div className={'user_kyc_section_filed'}>
                                            <label>Start Rank Range <span className={'validation-star'}>*</span></label>
                                            <div className={'user_kyc_section_input_filed'}>
                                                <input type={'number'} onWheel={(e)=> e.currentTarget.blur()} readOnly={modalValue?.isEdit} className={modalValue?.isEdit ? 'readOnly' : ''} placeholder={'Rank Start'}  value={formData?.startRank} name={'startRank'} onChange={(e) => changeHandler(e)} />
                                            </div>
                                            {simpleValidator.current.message("startRank", formData?.startRank, 'required')}
                                        </div>
                                    </div>
                                    <div className={'center-to'}>TO</div>
                                    <div className={'user_kyc_section tab-02'}>
                                        <div className={'user_kyc_section_filed'}>
                                            <label>End Rank Range <span className={'validation-star'}>*</span></label>
                                            <div className={'user_kyc_section_input_filed'}>
                                                <input type={'number'} onWheel={(e)=> e.currentTarget.blur()} className={modalValue?.isEdit ? 'readOnly' : ''} readOnly={modalValue?.isEdit} value={formData?.endRank} placeholder={'Rank End'}  name={'endRank'} onChange={(e) => changeHandler(e)} />
                                            </div>
                                            {simpleValidator.current.message("endRank", formData?.endRank, 'required')}
                                            <span className={'srv-validation-message'}>{((+formData?.endRank) >= (+formData?.startRank) ) ? '' : formData?.endRank !== '' ? 'please enter end rank equal or greater than start rank' : ''}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={'user_kyc_section right-section'}>
                            <div className={'user_kyc_section_filed'}>
                                <label>Bonus <span className={'validation-star'}>*</span></label>
                                <div className={'user_kyc_section_input_filed'}>
                                    <input type={'number'} placeholder={'Enter Bonus'} onWheel={(e)=> e.currentTarget.blur()} value={formData?.bonus} name={'bonus'} onChange={(e) => changeHandler(e)} />
                                </div>
                                {simpleValidator.current.message("bonus", formData?.bonus, 'required')}
                            </div>
                        </div>
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
    )
}
export default AddLeaderBoardRankConfig