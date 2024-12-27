import Paper from "@mui/material/Paper";
import React, {useCallback, useEffect, useRef, useState} from "react";
import Switch from "@mui/material/Switch";
import {hideActionFunc} from "../../../../../../utils";
import FilledButton from "../../../../../../Components/FileButton";
import {createGameDummyPlayer} from "../../../../../../Redux/games/action";
import CommonModal from "../../../../../../hoc/CommonModal";
import {Box} from "@mui/material";
import PopComponent from "../../../../../../hoc/PopContent";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";

const OnlinePlayerStatus = ({ rowData, isOnlinePlayer, getDummyPlayer }) => {
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
        isOnlinePlayer : isOnlinePlayer || false,
        isDummyPlayer:false
    })

    const handleChangeLocation = (event) => {
        setFormData({
            ...formData,
            isOnlinePlayer: event.target.checked
        })
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            setLoader(true);
            let payload = {
                ...formData,
                gameId: id,
                isOnlinePlayer: formData.isOnlinePlayer === undefined ? false : formData.isOnlinePlayer
            }
            if(!payload?.isDummyPlayer){
                payload = {
                    ...payload,
                    dummyPlayerStartPoint:0
                }
            }
            dispatch(createGameDummyPlayer(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    getDummyPlayer();
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
            setFormData({
                ...formData,
                isOnlinePlayer:isOnlinePlayer
            })
    },[rowData, isOnlinePlayer])



    return(
        <Paper sx={{ mb: 2 }} className="outer-box">
            <div className={'referAndEarn_title mb_1'}>
                <h2>Online Players</h2>
            </div>
          <form onSubmit={(e)=>handleSubmit(e)}>
              <div className={'radius_location_form'}>
                  <div className={'radius-location'}>
                      <label>Online Players On/Off</label>
                      <div>
                          <Switch {...label}  checked={formData?.isOnlinePlayer}  onChange={(e)=>handleChangeLocation(e)}/>
                      </div>
                  </div>
                  {
                      hideActionFunc('game') &&
                      <div className={'formData_btn mt_1'}>
                          <FilledButton type={'submit'} value={ 'Save'} className={'btn loader_css'} loading={''} />
                      </div>
                  }
              </div>
          </form>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModalError}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModalError} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Paper>
    )
}
export default OnlinePlayerStatus