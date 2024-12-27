import React, { useCallback, useRef, useState } from "react";
import { Box } from "@mui/material";
import FilledButton from "../../../FileButton";
import SimpleReactValidator from "simple-react-validator";
import {
    updateBonus,
    updateDepositCash,
    updateDepositWinningCash,
} from "../../../../Redux/user/action";
import { useDispatch } from "react-redux";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};
const UpdateCashAndBonus = ({ modalValue, handleOpenModal }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState({
        bonus: '',
        userId: modalValue.id,
        cash: '',
        winningCash:'',
        isDeductTds:false,
        type:''
    })
    const simpleValidator = useRef(new SimpleReactValidator());

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData?.type === 'cash'){
            simpleValidator.current.fields.winningCash = true;
            simpleValidator.current.fields.bonus = true;
        }
        if(formData?.type === 'winningCash'){
            simpleValidator.current.fields.DepositCash = true;
            simpleValidator.current.fields.bonus = true;
        }
        if(formData?.type === 'bonus'){
            simpleValidator.current.fields.DepositCash = true;
            simpleValidator.current.fields.winningCash = true;
        }
        if (simpleValidator.current.allValid()) {
            updateBonusAndCashDetails();
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };


    const updateBonusAndCashDetails = () => {

        if (modalValue?.isModalCash) {
            let payload = {
                userId: modalValue.id,
                cash:formData?.cash,
                isDeductTds:formData?.isDeductTds
            }
            setLoader(true)
            dispatch(updateDepositCash(payload)).then(res => {
                setLoader(false)
                if (res.data.success) {
                    handleOpenModal('CommonPop', { header: "Success", body: res.data.message })
                } else {
                    handleOpenModal('CommonPop', { header: "Error", body: res.data.message || res?.data?.msg })
                }
            });
        } else if(modalValue?.isWinningModalCash) {
            let payload = {
                userId: modalValue.id,
                winCash: formData?.winningCash,
                isDeductTds:formData?.isDeductTds
            }
            setLoader(true)
            dispatch(updateDepositWinningCash(payload)).then(res => {
                setLoader(false)
                if (res.data.success) {
                    handleOpenModal('CommonPop', { header: "Success", body: res.data.message })
                } else {
                    handleOpenModal('CommonPop', { header: "Error", body: res.data.message || res?.data?.msg })
                }
            });
        }else {
            let payload = {
                userId: modalValue.id,
                bonus: formData?.bonus,
            }
            setLoader(true)
            dispatch(updateBonus(payload)).then(res => {
                setLoader(false)
                if (res.data.success) {
                    handleOpenModal('CommonPop', { header: "Success", body: res.data.message })
                } else {
                    handleOpenModal('CommonPop', { header: "Error", body: res.data.message || res?.data?.msg })
                }
            });
        }

    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Remove spaces from the value
        const sanitizedValue = value.replace(/\s/g, "");
    
        // Check if the value is numeric
        if (!isNaN(sanitizedValue) && sanitizedValue !== "0") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: sanitizedValue,
                type: name,
            }));
        }
    };
    

    return (
        <Box sx={style}>
            <div className={'modal_main_popup add_admin_user_popup update_user_cash'}>
                <div className={'modal_popup_title'}>
                    <h2> {modalValue?.isModalCash ? 'Add Deposit Cash' : modalValue?.isWinningModalCash ?  ' Add Winning Cash' : 'Add Bonus'}</h2>
                </div>
                <div className={'add_admin_user_popup_content_pop'}>
                    <form method={'POST'} onSubmit={(e) => handleSubmit(e)}>
                        <div className="formData">
                            <label>{modalValue?.isModalCash ? 'Deposit Cash' : modalValue?.isWinningModalCash ?  'Winning Cash'  : 'Bonus'} <span className={'validation-star'}>*</span></label>
                            <div className="emailWrap">
                                {
                                    modalValue?.isModalCash ?
                                        <>
                                            <div className={'input_length_counter'}>
                                                <input type="text"  maxLength={10}  name='cash'  value={formData?.cash } onChange={(e) => handleChange(e)}  />
                                                <span className={'game_edit_info_span'}>{formData?.cash?.length}/10</span>
                                            </div>
                                        </>
                                        :
                                        modalValue?.isWinningModalCash ?
                                            <div className={'input_length_counter'}>
                                            <input type="text" name='winningCash'  value={formData?.winningCash} maxLength={10} onChange={(e) => handleChange(e)} />
                                                <span className={'game_edit_info_span'}>{formData?.winningCash?.length}/10</span>
                                            </div>
                                            :
                                            <div className={'input_length_counter'}>
                                                 <input type="text"  name='bonus' value={formData?.bonus} maxLength={10} onChange={(e) => handleChange(e)} />
                                                <span className={'game_edit_info_span'}>{formData?.bonus?.length}/10</span>
                                            </div>
                                }

                            </div>

                            {
                                modalValue?.isModalCash ?
                                    simpleValidator.current.message("DepositCash", formData?.cash?.toString(), "required")
                                    :
                                    modalValue?.isWinningModalCash ?
                                        simpleValidator.current.message("winningCash", formData?.winningCash?.toString(), "required")
                                        :
                                    simpleValidator.current.message("bonus", formData?.bonus?.toString(), "required")
                            }
                            {
                                modalValue?.isWinningModalCash &&
                                <div className={'common_checkbox_details mt_more_margin'}>
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
                                </div>
                            }
                        </div>
                        <div className={'formData_btn'}>
                            <button className={'btn_default mr_2'} onClick={() => handleOpenModal()}>Cancel</button>
                            <FilledButton type={'submit'} value={'Submit'} className={'btn'} loading={loader} />
                        </div>
                    </form>
                </div>
            </div>
        </Box>
    )
}
export default UpdateCashAndBonus