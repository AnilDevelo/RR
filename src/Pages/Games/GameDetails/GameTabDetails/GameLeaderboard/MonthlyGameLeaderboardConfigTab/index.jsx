import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import PopComponent from "../../../../../../hoc/PopContent";
import { getGameLeaderboardRankGameConfig} from "../../../../../../Redux/games/action";
import CommonModal from "../../../../../../hoc/CommonModal";
import MonthlyGameLeaderboardRankTab from "./MonthlyGameLeaderboardRankTab";
import GameLeaderboardConfig from "./GameLeaderboardConfig";
import GameLeaderboardRules from "./GameLeaderboardRules";

const MonthlyGameLeaderboardConfigTab =  () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [rowData, setRowData] = useState({monthlyBonusAmountConfig:[],monthlyBonusDateConfig:[],ranks:[],bonusMonthlyAllData:{}, isLeaderboardBonusOn:false});

    useEffect(() => {
        getGameMonthlyLeaderboard();

    }, []);

    const getGameMonthlyLeaderboard = () => {
        setLoader(true);
        dispatch(getGameLeaderboardRankGameConfig({ gameId: id })).then(res => {
            // console.log("add karvu", res?.data?.data?.monthlyBonusConfig?.maxMonthlyBonusLimit >=0);
            setLoader(false)
            setRowData({
                ...rowData,
                monthlyBonusAmountConfig :( Object?.keys(res?.data?.data?.monthlyBonusConfig || {})?.length > 0 && res?.data?.data?.monthlyBonusConfig?.maxMonthlyBonusLimit )? [res?.data?.data?.monthlyBonusConfig] : [],
                monthlyBonusDateConfig: (Object?.keys(res?.data?.data?.monthlyBonusConfig || {})?.length > 0  && res?.data?.data?.monthlyBonusConfig?.date)? [res?.data?.data?.monthlyBonusConfig] : [],
                ranks:res?.data?.data?.ranks,
                bonusMonthlyAllData:res?.data?.data,
                isLeaderboardBonusOn: res?.data?.data?.monthlyBonusConfig?.isLeaderboardBonusOn || false
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
                <div className={rowData?.isLeaderboardBonusOn ?'monthly-refer-earn-details-table monthly_leaderboard_game' : 'monthly-refer-earn-details-table' }>
                    <GameLeaderboardConfig rowData={rowData} getGameMonthlyLeaderboard={getGameMonthlyLeaderboard} isLeaderboardBonusOn={rowData?.isLeaderboardBonusOn}/>
                    {rowData?.isLeaderboardBonusOn && <GameLeaderboardRules/>}
                </div>
            </div>
            {
                rowData?.isLeaderboardBonusOn &&
                <MonthlyGameLeaderboardRankTab handleOpenModal={handleOpenModal} rowData={rowData}/>
            }

            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getGameMonthlyLeaderboard} monthlyBonus={rowData?.bonusMonthlyAllData} />
            </CommonModal>
        </div>
    )
}
export default MonthlyGameLeaderboardConfigTab