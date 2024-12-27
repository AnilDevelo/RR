import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import PopComponent from "../../../../../../hoc/PopContent";
import {createGamePlayingTracking, getGamePlayingTracking} from "../../../../../../Redux/games/action";
import Box from "@mui/material/Box";
import Loader from "../../../../../../images/Loader";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import FilledButton from "../../../../../../Components/FileButton";
import CommonModal from "../../../../../../hoc/CommonModal";
import axios from 'axios'
import {hideActionFunc} from "../../../../../../utils";
import SimpleReactValidator from "simple-react-validator";
let CryptoJS = require("crypto-js");



const PlayingTrackingConfig = ({ handleOpenModal, setIsTracking,gameDetails }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const [formData,setFormData]=useState({
        isPlayingTracking:false,
        noOfLastTrakingDays:''
    });


    const handleErrorOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewReferAndEarnList': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddReferAndEarnList': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ActivateDeactivateEarnPopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };

    useEffect(() => {
        getRadiusLocationList();
    }, []);

    const getRadiusLocationList = () => {
        dispatch(getGamePlayingTracking({gameId:id})).then(res => {
            setLoader(false)
            if (res?.data?.success) {
                setFormData({
                    ...formData,
                    isPlayingTracking: res?.data?.data?.isPlayingTracking,
                    noOfLastTrakingDays:  res?.data?.data?.noOfLastTrakingDays > 0 ?  res?.data?.data?.noOfLastTrakingDays : '',
                })
                setIsTracking(res?.data?.data?.isPlayingTracking)
            }
        })
    };

    const handleChangeLocation = (event) => {
        setFormData({
            ...formData,
            isPlayingTracking: event.target.checked
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData?.isPlayingTracking ){
            simpleValidator.current.fields.noOfLastTrakingDays = true
        }
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                noOfLastTrakingDays: formData?.noOfLastTrakingDays?.toString(),
                gameId:id
            }
            setLoader(true)
            dispatch(createGamePlayingTracking(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false);
                    getRadiusLocationList();
                    handleOpenModal('CommonPop', {header: "Success", body: res?.data?.message});
                } else {
                    setLoader(false)
                    handleErrorOpenModal('CommonPop', {header: "Error", body: res?.data?.message || res?.data?.msg});
                }
            });

            let payloadNew = {
                gameId:id,
                isPlayingTracking: formData?.isPlayingTracking,
                noOfLastTrakingDays:formData?.noOfLastTrakingDays?.toString()
            }
            let gameServerURL = gameDetails?.gameServerLink;
            axios.post(`${gameServerURL}/playingTrackingFlage`, payloadNew, {headers : {'authorization': CryptoJS.AES.encrypt(id, process.env.REACT_APP_CALL_BREAK_TOKEN_KEY).toString()} })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }

    }


    return (
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'referAndEarn_title'}>
                    <h2>Playing Tracking Config</h2>
                </div>
                <form onSubmit={(e)=>handleSubmit(e)} className={'tracking_players_form'}>
                    <div className={'radius_location_form'}>
                        <div className={'radius-location'}>
                            <label>Playing Tracking On/Off</label>
                            <div>
                                <Switch {...label}  checked={formData?.isPlayingTracking}  onChange={handleChangeLocation}/>
                            </div>
                        </div>
                        {
                            formData?.isPlayingTracking &&
                            <div className={'tracking-days-game'}>
                                <div className={'formData'}>
                                    <label>Last tracking Days <span className={'validation-star'}>*</span></label>
                                    <div className={'emailWrap'}>
                                        <input type={'number'} onWheel={(e)=> e.currentTarget.blur()} value={ formData?.noOfLastTrakingDays }  placeholder={'Enter Last Tracking Days'} name='noOfLastTrakingDays' onChange={(e) =>    setFormData({
                                            ...formData,
                                            noOfLastTrakingDays: e?.target?.value
                                        })} />
                                    </div>
                                    {simpleValidator.current.message("noOfLastTrakingDays", formData?.noOfLastTrakingDays?.toString(), 'required|numeric|min:1|max:3')}
                                </div>
                            </div>
                        }
                    </div>
                    {
                        hideActionFunc('game') &&
                        <div className={'formData_btn mt_15'}>
                            <FilledButton type={'submit'} value={ 'Save'} className={'btn loader_css mt_2'} loading={''} />
                        </div>
                    }

                </form>
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleErrorOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleErrorOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getRadiusLocationList} />
            </CommonModal>
        </Box>
    )
}
export default PlayingTrackingConfig