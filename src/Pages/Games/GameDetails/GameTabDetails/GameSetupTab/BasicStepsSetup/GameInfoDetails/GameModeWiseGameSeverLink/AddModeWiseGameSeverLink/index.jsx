import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../../../../../hoc/PopContent";
import {
    addGameServerLinkModeWise,
    getOptimizeStatus,
    getSingleGameDetails,
    getUniqueMgpReleases, updateGameServerLinkModeWise, uploadGameBuild
} from "../../../../../../../../../Redux/games/action";
import {jsonToFormData} from "../../../../../../../../../utils";
import Box from "@mui/material/Box";
import GameModeDropdown from "../../../../../LobbyTab/CreateLobby/LobbyGameMode/GameModeDropdown";
import FilledButton from "../../../../../../../../../Components/FileButton";
import CommonModal from "../../../../../../../../../hoc/CommonModal";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};


const AddModeWiseGameSeverLink = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const gameDetails = useSelector(state => state?.gameReducer?.gameDetails);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData, setFormData] = useState({
        gameServerLink:'',
        gameModeId:''
    });

    useEffect(() => {
        dispatch(getSingleGameDetails({ gameId: id }))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                gameId: id
            };
            setLoader(true)
            dispatch(addGameServerLinkModeWise(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    redirectApiHandler();
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                } else {
                    handleOpenModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                    setLoader(false);
                }
            });
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };

    const handleOpenErrorModal = (type, data) => {
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
        if(modalValue?.isEdit){
            setFormData({
                ...formData,
                gameModeId: modalValue?.row?.gameModeId?._id,
                gameServerLink: modalValue?.row?.gameServerLink
            })
        }
    },[modalValue]);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                gameId: id,
                gameServerLinkModeWiseId: modalValue?.row?._id
            };
            setLoader(true)
            dispatch(updateGameServerLinkModeWise(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false);
                    redirectApiHandler();
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                } else {
                    handleOpenModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                    setLoader(false);
                }
            });
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }

    return (
        <Box sx={style} className={'user_popup_section '}>
            <div className={'add_admin_user_popup modal_main_popup'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Mode Wise Game Server URL' : 'Add Mode Wise Game Server URL'}</h2>
                </div>
            </div>
            <div className={'add_admin_user_popup_content'}>
                <form className={'manage_game_builds mt_0'} onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                    <div className={'formData checkbox_modal real_money_field'}>
                        <label>Mode Of Game <span className={'validation-star mll'}> *</span></label>
                        <div className={'select_game_option_mode'}>
                            <div className={'select_game_option'}>
                                <GameModeDropdown formData={formData} setFormData={setFormData} name={'gameModeId'} options={gameDetails?.gameModes || []} placeholder={"Select  mode of game"}/>
                                {simpleValidator.current.message("gameMode", formData?.gameModeId, 'required')}
                            </div>
                        </div>
                    </div>
                    <div className={'formData manage_game_builds_details_field'}>
                        <div className={'manage_game_builds_details_flex'}>
                            <div className={'release_Guide_section mr_0'}>
                                <div className="formData">
                                    <label className={'main_label'}>Game Server URL <span className={'validation-star'}>*</span></label>
                                    <div className="emailWrap">
                                        <input type="text" name='gameServerLink' value={formData?.gameServerLink} placeholder={'Enter Game Server URL'} onChange={(e) => setFormData({ ...formData, gameServerLink: e.target.value })} />
                                    </div>
                                    {simpleValidator.current.message("gameServerLink", formData?.gameServerLink, "required")}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'formData_btn d_flex_end mt_2'}>
                        <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                        <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'btn loader_css'} loading={loader} />
                    </div>
                </form>
            </div>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenErrorModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenErrorModal} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Box>
    )
}
export default AddModeWiseGameSeverLink