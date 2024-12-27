import {useDispatch} from "react-redux";
import React, {useCallback, useEffect, useRef, useState} from "react";
import SimpleReactValidator from "simple-react-validator";
import Box from "@material-ui/core/Box";
import FilledButton from "../../../../../Components/FileButton";
import {addHelpAndSupportEmail} from "../../../../../Redux/HelpAndSupport/action";
import GameStatusDropDown from "../../../../../Components/MainCommonFilter/GameStatusDropDown";
import {getDailySpinDivisionConfigList} from "../../../../../Redux/Bonus/action";

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
const AddDailyWheelBonusConfig = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState({ rows: '' });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            setLoader(true)
            dispatch(getDailySpinDivisionConfigList(formData)).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    redirectApiHandler()
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
            setFormData({ ...formData, rows: modalValue?.row?.rows })
        }
    }, [modalValue]);
    return(
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup daily_bonus_spin_dropdown'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? "Update Daily Spin Division Config" : ' Add Daily Spin Division Config'}</h2>
                </div>
                <div className={'add_admin_user_popup_content'}>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className={'user_kyc_section'}>
                            <div className={'user_kyc_section_filed'}>
                                <label>Daily Spin Division <span className={'validation-star'}>*</span></label>
                                <GameStatusDropDown option={['6', '8']} name={'rows'} filterData={formData} setFilterData={setFormData} placeholder={"Select Daily Spin Division"} />
                                {simpleValidator.current.message("dailySpinDivision", formData?.rows, 'required')}
                            </div>
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
export default AddDailyWheelBonusConfig