import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getOptimizeStatus, getSingleGameDetails} from "../../../../../Redux/games/action";
import Box from "@mui/material/Box";
import TableLoader from "../../../../../hoc/CommonTable/TableLoader";
import BasicStepsSetup from "./BasicStepsSetup";
import CustomizeConfigSetup from "./CustomizeConfigSetup";
import GameInfoDetails from "./BasicStepsSetup/GameInfoDetails";

const GameSetupTab = ({ setValue, handleOpenModal, tabChangeArray }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [rowData, setRowData] = useState()
    const [loader, setLoader] = useState(false);
    const gameDetails = useSelector(state => state?.gameReducer?.gameDetails);
    const [steps, setSteps] = useState({
        basicStep: { gameInfo: false },
        customizePlay: { tournament: false },
        setupModal: false
    });

    useEffect(() => {
        dispatch(getSingleGameDetails({ gameId: id }))
        getGameSetupHandler();
    }, []);

    const getGameSetupHandler = () => {
        setLoader(true)
        dispatch(getOptimizeStatus({ gameId: id, publisherId: gameDetails?.publisherId?._id })).then(res => {
            setRowData(res.data.data);
            setLoader(false);
        });
    };

    return(
        <Box className={loader ?  'optimize_tab_section game-rules-section outer-box' : 'optimize_tab_section'}>
            {loader && <TableLoader/>}
            {
                !steps.setupModal ?
                    <div className={'optimize_tab'}>
                        <BasicStepsSetup setSteps={setSteps} steps={steps} handleOpenModal={handleOpenModal} rowData={rowData} setValue={setValue} gameDetails={gameDetails} tabChangeArray={tabChangeArray} />
                        <CustomizeConfigSetup setValue={setValue} rowData={rowData} gameDetails={gameDetails} tabChangeArray={tabChangeArray}  />
                    </div>
                    : steps?.setupModal && steps.basicStep.gameInfo ?
                    <GameInfoDetails setSteps={setSteps} steps={steps} handleOpenModal={handleOpenModal} getOptimizeStatusHandler={getOptimizeStatus} />
                    :
                    ''
            }
        </Box>
    )
}
export default GameSetupTab