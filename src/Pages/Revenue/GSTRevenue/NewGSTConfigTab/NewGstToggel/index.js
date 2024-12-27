import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import PopComponent from "hoc/PopContent";
import { addNewGSTConfig } from "Redux/revenue/action";
import { hideActionFunc } from "utils";
import FilledButton from "Components/FileButton";
import CommonModal from "hoc/CommonModal";

const NewGSTToggel = ({ rowData, isGSTNew, getGameMonthlyLeaderboard }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const forceUpdate = useCallback(() => updateState({}), []);
    let Modal = PopComponent[modalDetails.modalName];
    const [formData,setFormData] = useState({
        isGSTNew : isGSTNew || false,
    })

    const handleChangeLocation = (event) => {
        setFormData({
            ...formData,
            isGSTNew: event.target.checked
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            setLoader(true);
            let payload = {
                ...formData,
                gameId: id
            }
            dispatch(addNewGSTConfig(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    getGameMonthlyLeaderboard();
                    handleOpenModalError('CommonPop', { header: "Success", body: res?.data?.message })
                } else {
                    setLoader(false)
                    handleOpenModalError('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                }
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };

    const handleOpenModalError = (type, data) => {
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
        let payload = {
            isGSTNew:  rowData?.bonusMonthlyAllData?.monthlyBonusConfig?.isGSTNew
        }
        if(Object.keys(payload || {})?.length > 0){
            setFormData({
                ...formData,
                isGSTNew: isGSTNew
            })
        }
    },[rowData, isGSTNew])


//className={'game_leaderboard_monthly_details'}
    return(
        <div className={'w_100'}>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'referAndEarn_title mb_1'}>
                    <h2>New GST Config</h2>
                </div>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className={'radius_location_form'}>
                        <div className={'radius-location'}>
                            <label>New GST On/Off</label>
                            <div>
                                <Switch {...label}  checked={formData?.isGSTNew}  onChange={(e)=>handleChangeLocation(e)}/>
                            </div>
                        </div>
                        {
                            hideActionFunc('game') &&
                            <div className={'formData_btn mt_1'}>
                                <FilledButton type={'submit'} value={ 'Save'} className={'btn loader_css'} loading={loader} />
                            </div>
                        }
                    </div>
                </form>
                <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModalError}>
                    <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModalError} modalIsOpen={modalDetails.modalIsOpen} />
                </CommonModal>
            </Paper>
        </div>
    )
}
export default NewGSTToggel