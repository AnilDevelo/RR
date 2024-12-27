import React, {useState} from "react";
import {useSelector} from "react-redux";
import Box from "@mui/material/Box";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DisplayGameInfoDetails from "./DisplayGameInfoDetails";
import UpdateGameInfoDetails from "./UpdateGameInfoDetails";
import GameModeWiseGameSeverLink from "./GameModeWiseGameSeverLink";

const GameInfoDetails = ({ setSteps, steps, handleOpenModal, getOptimizeStatusHandler }) => {
    const gameDetails = useSelector(state => state?.gameReducer?.gameDetails);
    const [editUser, setEditUser] = useState(false);

    const handleBack = () => {
        setSteps({
            ...steps,
            setupModal: false,
            basicStep: { ...steps.basicStep, gameInfo: false }

        })
        getOptimizeStatusHandler()
    }
    const editUserDetailsHandler = () => {
        setEditUser(true);
    };

    return (
        <React.Fragment>
            <Box className={'game_information_box'}>
                <div className={'back_arrow'} onClick={() => handleBack()}>
                    <ArrowBackIosIcon />
                    <span className={'filter_dropdown_list'}>Back</span>
                </div>
                <Box className="outer-box bg_white box_shadow radius_8">
                    {
                        !editUser ?
                            <>
                            <DisplayGameInfoDetails gameProfile={gameDetails} editUserDetailsHandler={editUserDetailsHandler} handleOpenModal={handleOpenModal} />
                            </>
                            :
                            <div className={'edit_game_info_section'}>
                                <UpdateGameInfoDetails setEditGameInfo={setEditUser} handleOpenModal={handleOpenModal} />
                            </div>
                    }
                </Box>
                {
                    (!editUser && gameDetails?.isModeWiseGameServerLink )&&
                    <GameModeWiseGameSeverLink/>
                }

            </Box>
        </React.Fragment>
    )
}
export default GameInfoDetails