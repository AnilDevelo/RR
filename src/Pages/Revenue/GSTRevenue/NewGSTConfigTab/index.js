import CommonModal from "hoc/CommonModal";
import PopComponent from "hoc/PopContent";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import { getNewGSTConfig } from "Redux/revenue/action";
import NewGSTTable from "./NewGSTTable";
import NewGSTToggel from "./NewGstToggel";

const NewGSTConfigTab =  () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [rowData, setRowData] = useState({ isGSTNew:false});

    useEffect(() => {
        getGameMonthlyLeaderboard();

    }, []);

    const getGameMonthlyLeaderboard = () => {
        setLoader(true);
        dispatch(getNewGSTConfig()).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                isGSTNew: res?.data?.data?.isGSTNew || false
            })
        })
    };

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'AddMonthlyGameLeaderboardRank':{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddGameLeaderboardBonusReleaseDate':{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddGameLeaderboardBonusAmount':{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };
    return(
        <div>
            <div className={'game_leaderboard_config'}>
                <div>
                    <NewGSTToggel rowData={rowData} getGameMonthlyLeaderboard={getGameMonthlyLeaderboard} isGSTNew={rowData?.isGSTNew}/>
                    {rowData?.isGSTNew && <NewGSTTable/>}
                </div>
            </div>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getGameMonthlyLeaderboard} monthlyBonus={rowData?.bonusMonthlyAllData} />
            </CommonModal>
        </div>
    )
}
export default NewGSTConfigTab