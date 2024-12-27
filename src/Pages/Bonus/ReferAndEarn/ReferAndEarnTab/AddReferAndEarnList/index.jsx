import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import FilledButton from "../../../../../Components/FileButton";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../hoc/PopContent";
import CommonModal from "../../../../../hoc/CommonModal";
import {createReferAndEarn} from "../../../../../Redux/Bonus/action";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};
const AddReferAndEarnList = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [, updateState] = useState({});
    const simpleValidator = useRef(new SimpleReactValidator());
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const forceUpdate = useCallback(() => updateState({}), []);
    const [filterData, setFilterData] = useState({
        bonusTypeUser: '',
        bonusTypeReferral: '',
        userBonus: '',
        refUserBonus: ''
    });

    const handleChange = (e) => {
        const { value, name } = e.target;
        // Validate the value to restrict it to a maximum of 20 characters and disallow /*-+ and alphabets and spaces
        const sanitizedValue = value.replace(/[/\-*+a-zA-Z\s]/g, '').slice(0, 20);
        setFilterData((prevFilterData) => ({
          ...prevFilterData,
          [name]: sanitizedValue,
        }));
      };
      

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                userBonusRealMoney: filterData?.bonusTypeUser === 'Real Money',
                userBonus: filterData?.userBonus,
                refUserBonusRealMoney: filterData?.bonusTypeReferral === 'Real Money',
                refUserBonus: filterData?.refUserBonus
            }
            setLoader(true)
            dispatch(createReferAndEarn(payload)).then(res => {
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
        if (modalValue?.isEdit) {
            const { row } = modalValue;
            setFilterData({
                bonusTypeUser: row?.userBonusRealMoney ? 'Real Money' : 'Coins',
                bonusTypeReferral: row?.refUserBonusRealMoney ? 'Real Money' : 'Coins',
                userBonus: row?.userBonus,
                refUserBonus: row?.refUserBonus
            })
        }
    }, [modalValue]);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                userBonusRealMoney: filterData?.bonusTypeUser === 'Real Money',
                userBonus: filterData?.userBonus,
                refUserBonusRealMoney: filterData?.bonusTypeReferral === 'Real Money',
                refUserBonus: filterData?.refUserBonus,
                // referAndEarnId:modalValue?.row?._id
            }
            setLoader(true)
            dispatch(createReferAndEarn(payload)).then(res => {
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

    return (
        <Box sx={style}>
            <div className={'modal_main_popup add_admin_user_popup'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? "Edit Refer And Earn Config" :`Add Refer And Earn Config`}</h2>
                </div>
                <div className={'add_admin_user_popup_content'}>
                    <form method={'POST'} className={'coupon_section_form earn_section_form'} onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className={'refer_form_details '}>
                            <h2>User Details :</h2>
                            <div className={'refer_form_sub_details user_bonus'}>
                                {/*<div className={'refer_form_details_filed'}>*/}
                                {/*    <label>Users Bonus </label>*/}
                                {/*    <GameStatusDropDown name={'bonusTypeUser'} setFilterData={setFilterData} filterData={filterData} option={['Real Money']}/>*/}
                                {/*    {simpleValidator.current.message("bonusTypeUser", filterData?.bonusTypeUser, 'required')}*/}
                                {/*</div>*/}
                                <div className="formData">
                                    <label>Bonus Prize <span className={'validation-star'}>*</span></label>
                                    <div className="emailWrap">
                                        <input onWheel={event => event.currentTarget.blur()} type="text" value={filterData?.userBonus} name={'userBonus'} onChange={(e) => handleChange(e)} />
                                    </div>
                                    {simpleValidator.current.message("user Bonus Prize", filterData?.userBonus?.toString(), 'required|numeric|min:0|max:10')}
                                </div>
                            </div>
                        </div>
                        <div className={'refer_form_details referral_user'}>
                            <h2>Referral User Details :</h2>
                            <div className={'refer_form_sub_details '}>
                                {/*<div className={'refer_form_details_filed'}>*/}
                                {/*    <label>Users Bonus </label>*/}
                                {/*    <GameStatusDropDown name={'bonusTypeReferral'} setFilterData={setFilterData} filterData={filterData} option={['Real Money']}/>*/}
                                {/*    {simpleValidator.current.message("bonusTypeReferral", filterData?.bonusTypeReferral, 'required')}*/}
                                {/*</div>*/}
                                <div className="formData">
                                    <label>Bonus Prize <span className={'validation-star'}>*</span></label>
                                    <div className="emailWrap">
                                        <input onWheel={event => event.currentTarget.blur()} type="text" value={filterData?.refUserBonus} name={'refUserBonus'} onChange={(e) => handleChange(e)} />
                                    </div>
                                    {simpleValidator.current.message("Referral User Bonus Prize", filterData?.refUserBonus?.toString(), 'required|numeric|min:0|max:10')}
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
export default AddReferAndEarnList