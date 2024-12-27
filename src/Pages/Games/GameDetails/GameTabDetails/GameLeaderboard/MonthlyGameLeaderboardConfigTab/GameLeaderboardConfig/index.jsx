import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../../../hoc/PopContent";
import {addGameMonthlyLeaderboardConfig} from "../../../../../../../Redux/games/action";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import {hideActionFunc} from "../../../../../../../utils";
import FilledButton from "../../../../../../../Components/FileButton";
import CommonModal from "../../../../../../../hoc/CommonModal";

const GameLeaderboardConfig = ({ rowData, isLeaderboardBonusOn, getGameMonthlyLeaderboard }) => {
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
        isLeaderboardBonusOn : isLeaderboardBonusOn || false,
    })

    const handleChangeLocation = (event) => {
        setFormData({
            ...formData,
            isLeaderboardBonusOn: event.target.checked
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
            dispatch(addGameMonthlyLeaderboardConfig(payload)).then(res => {
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
            isLeaderboardBonusOn:  rowData?.bonusMonthlyAllData?.monthlyBonusConfig?.isLeaderboardBonusOn
        }
        if(Object.keys(payload || {})?.length > 0){
            setFormData({
                ...formData,
                isLeaderboardBonusOn: isLeaderboardBonusOn
            })
        }
    },[rowData, isLeaderboardBonusOn])


//className={'game_leaderboard_monthly_details'}
    return(
        <div className={isLeaderboardBonusOn ? 'monthly-bonus-amount' : 'w_100'}>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'referAndEarn_title mb_1'}>
                    <h2>Leaderboard Config</h2>
                </div>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className={'radius_location_form'}>
                        <div className={'radius-location'}>
                            <label>Leaderboard On/Off</label>
                            <div>
                                <Switch {...label}  checked={formData?.isLeaderboardBonusOn}  onChange={(e)=>handleChangeLocation(e)}/>
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
export default GameLeaderboardConfig