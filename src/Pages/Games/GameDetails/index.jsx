import React, { useEffect, useState } from "react";
import GameDetailsHeader from "./GameDetailsHeader";
import PopComponent from "../../../hoc/PopContent";
import CommonModal from "../../../hoc/CommonModal";
import GameTabDetails from "./GameTabDetails";
import {useDispatch, useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleGameDetails } from "../../../Redux/games/action";

const GameDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];

    const handleOpenModal = (type, data) => {
        const modalValue = { ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true };
        switch (type) {
            case 'UpdateGame':
            case 'CreateLobby':
            case 'UpdateLobby':
            case 'CreateRecurringTournament':
            case 'CommonPop':
            case 'DeleteLobby':
            case 'ViewLobbyDetails':
            case 'CopyHeadToHeadPopup':
            case 'UpdateGameCurrency':
            case 'CreateGameRelease':
            case 'CountryReleasePop':
            case 'ViewHeadToHeadGame':
            case 'ViewRejectedComment':
            case 'ActiveDeactivateLobby':
            case 'AddGameMode':
            case 'DeleteCommonModal':
            case 'AddHowToPlay':
            case 'DeleteHowToPlay':
            case 'AddNumberOfDecksPopup':
            case 'AddNumberOfPlayerPopup':
            case 'AddDummyPlayer':
            case 'AddMGPHowToPlay':
            case 'ViewHowToPlayPopup':
            case 'viewPlayingScoreBoardPopup':
            case 'EditMGPHowTOPlay':
            case 'activeDeactivateNumberOfPlayer':
            case 'PokerViewPlayerRecord':
            case 'createHowToPlayGame':
            case 'editHowToPlayRules':
            case 'ViewPlayerRecord':
            case 'ExportFilePopup':
                setModalDetails(modalValue);
                break;
            default:
                setModalDetails({ ...modalDetails, modalIsOpen: false });
        }
    };

    useEffect(() => {
        dispatch(getSingleGameDetails({ gameId: id }))
    }, [id]);

    const redirectApiProps = (apiProps) => {
        return apiProps();
    };

    return (
        <div className={'game-details-section'}>
            <GameDetailsHeader handleOpenModal={handleOpenModal} />
            <GameTabDetails handleOpenModal={handleOpenModal} redirectApiProps={redirectApiProps} />
            <CommonModal className={modalDetails?.modalName === 'CreateRecurringTournament' ? 'CreateRecurringTournament' : modalDetails?.modalName === 'UpdateGame' ? 'update_game_modal_details' : modalDetails?.modalName === 'CountryReleasePop' ? 'country_availability' : ' '} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={redirectApiProps} />
            </CommonModal>
        </div>
    )
}
export default GameDetails