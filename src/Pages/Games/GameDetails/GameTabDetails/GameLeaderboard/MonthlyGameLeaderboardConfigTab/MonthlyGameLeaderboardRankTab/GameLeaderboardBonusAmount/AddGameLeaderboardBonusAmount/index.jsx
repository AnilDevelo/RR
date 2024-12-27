import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import {Box} from "@mui/material";
import DropdownList from "../../../../../../../../../Components/Dropdown/DropdownList";
import FilledButton from "../../../../../../../../../Components/FileButton";
import {useParams} from "react-router-dom";
import {addGameMonthlyLeaderboardBonusAmountList} from "../../../../../../../../../Redux/games/action";

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
const AddGameLeaderboardBonusAmount = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator({
        validators: {
            negativevalue: {
                message: "Negative values are not allowed.",
                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val,/[/*\-+]/)
                },
                required: true
            }
        }
    }));
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState({ maxMonthlyBonusLimit: '', depositInto:'', isDeductTds:false });


    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            setLoader(true)
            let payload = {
                gameId:id,
                maxMonthlyBonusLimit:formData?.maxMonthlyBonusLimit,
                isDeductTds:formData?.isDeductTds,
                depositInto:formData?.depositInto === 'Winning Cash' ? 'WinCash' : formData?.depositInto === 'Deposit Cash' ? 'DepositCash' : formData?.depositInto === 'Bonus Cash' && 'Bonus'
            }
            dispatch(addGameMonthlyLeaderboardBonusAmountList(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    redirectApiHandler();
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

    useEffect(() => {
        if (modalValue?.isEdit) {
            setFormData({ ...formData,
                maxMonthlyBonusLimit: modalValue?.row?.maxMonthlyBonusLimit,
                depositInto: modalValue?.row?.depositInto === 'WinCash' ?  'Winning Cash' : modalValue?.row?.depositInto === 'DepositCash' ? 'Deposit Cash' : modalValue?.row?.depositInto === 'Bonus' && 'Bonus Cash',
                isDeductTds: modalValue?.row?.isDeductTds
            })
        }
    }, [modalValue?.isEdit]);


    return (
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup leaderboard-bonus-section'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? "Update Leaderboard Bonus Amount" : ' Add  Leaderboard Bonus Amount'}</h2>
                </div>
                <div className={'add_admin_user_popup_content'}>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className={'user_kyc_section'}>
                            <div className={'user_kyc_section_filed'}>
                                <label>Bonus Amount <span className={'validation-star'}>*</span></label>
                                <div className={'user_kyc_section_input_filed'}>
                                <input maxLength={10} type="text" pattern="[0-9]*" placeholder="Enter Bonus Amount" onWheel={(e) => e.currentTarget.blur()} value={formData?.maxMonthlyBonusLimit} onChange={(e) => {
                                    const { value, name } = e.target;
                                    const sanitizedValue = value.replace(/\D/g, ""); // Remove non-numeric characters
                                    setFormData({ ...formData, maxMonthlyBonusLimit: sanitizedValue });
                                }}
                                />

                                </div>
                                {simpleValidator.current.message("bonusAmount", formData?.maxMonthlyBonusLimit?.toString(), 'required|min:0|max:10')}
                            </div>
                            <div className={'date-picker_coupon monthly-bonus-type'}>
                                <div className={'start-date-picker'}>
                                    <label>Bonus Type <span className={'validation-star'}>*</span></label>
                                    <DropdownList name={'depositInto'} options={['Winning Cash','Bonus Cash', 'Deposit Cash']} setFormData={setFormData} formData={formData}  />
                                    {simpleValidator.current.message("bonusType", formData?.depositInto, "required")}
                                </div>
                            </div>
                            {/* <div className={'common_checkbox_details mt_more_margin'}>
                                <label>Is Deduct TDS  ? <span className={'validation-star'}>*</span></label>
                                <div className={'game_mode_btn'}>
                                    <div className={'game_mode_btn_option yes_radio_btn'}>
                                        <input type={'radio'} name={'isDeductTds'} checked={formData?.isDeductTds} onChange={(e) => setFormData({ ...formData, isDeductTds: true })} />
                                        <label>Yes</label>
                                    </div>
                                    <div className={'game_mode_btn_option no_radio_btn'}>
                                        <input type={'radio'} name={'isDeductTds'} checked={!formData?.isDeductTds} onChange={(e) => setFormData({ ...formData, isDeductTds: false })} />
                                        <label>No</label>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className={'formData_btn'}>
                            <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                            <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'btn loader_css'} loading={loader} />
                        </div>
                    </form>
                </div>
            </div>
        </Box>
    )
}
export default AddGameLeaderboardBonusAmount