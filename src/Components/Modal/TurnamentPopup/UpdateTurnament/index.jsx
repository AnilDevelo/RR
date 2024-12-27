import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import FilledButton from "../../../FileButton";
import SelectDropdown from "../../../SelectDropdown";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../hoc/PopContent";
import user from "../../../../assets/images/avatar.png";
import icon_plus from "../../../../assets/images/plus.svg";
import ScreenLockPortraitIcon from "@mui/icons-material/ScreenLockPortrait";
import ScreenLockLandscapeIcon from "@mui/icons-material/ScreenLockLandscape";
import {getSingleGameDetails, updateGame} from "../../../../Redux/games/action";
import CommonModal from "../../../../hoc/CommonModal";
import Tooltip from "@mui/material/Tooltip";
import PhonelinkIcon from "@mui/icons-material/Phonelink";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import {jsonToFormData, profileImages} from "../../../../utils";
import { getTournamentGamelist, UpdateTournament } from "Redux/Tournament/action";
import CommonDropdown from "Components/Dropdown/CommonDropdown";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};

const UpdateTurnament = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [filterStage, setFilterStage] = useState({ android: false, ios: false, crossPlatform: false });
    const [filterOrientation, setFilterOrientation] = useState({ portrait: false, landscape: false, orientationField: "",platform: "" });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData, setFormData] = useState({
        tournamentName: "", game: "", gameSubmode: "", description: "", isOrientationPortrait: "", tournamentIcon: "", gameGenreKey: {},
        gameId: "", gameModeId: "", isGameModeOption:"",subMode : ""
    });
    const [gameList, setgameList] = useState([])

    // Fetch Game list
     useEffect(() => {
       getgameList();
     }, []);
   
     const getgameList = () => {
       dispatch(getTournamentGamelist()).then((res) => {
         setgameList(res?.data?.data || []);
       }).catch((error) => {
         console.error(error);
       });
     };

      // check Game Modes
  const CheckGameMode = gameList?.find((game) => game?.gameName == formData?.game)?.gameModes;

    const stageCheckboxFilter = (e) => {
        const { checked, value, name } = e.target;
        setFilterStage({ ...filterStage, [e.target.name]: checked });
        setFormData({
            ...formData,
            platform: name
        })
        if (name === 'Android' && checked) {
            setFilterStage({ ...filterStage, android: true, ios: false, crossPlatform: false, platform: 'Android' })
        }
        if (name === 'Ios' && checked) {
            setFilterStage({ ...filterStage, android: false, ios: true, crossPlatform: false , platform: 'Ios' })
        }
        if (name === 'Cross-Platform' && checked) {
            setFilterStage({ ...filterStage, android: false, ios: false, crossPlatform: true, platform: 'Cross-Platform' })
        }
    };

    const orientationCheckboxFilter = (e) => {
        const { checked, value, name } = e.target;
        setFilterOrientation({ ...filterOrientation, [e.target.name]: checked });
        if (name === 'portrait' && checked) {
            setFilterOrientation({ ...filterOrientation, portrait: true, landscape: false, orientationField: e.target.name })
        }
        if (name === 'landscape' && checked) {
            setFilterOrientation({ ...filterOrientation, portrait: false, landscape: true, orientationField: e.target.name })
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                isOrientationPortrait: filterOrientation?.orientationField === "portrait",
                isTournamentIconUpdated: typeof formData?.tournamentIcon !== "string",
                tournamentId : modalValue?.row?._id,
                gameId: modalValue?.row?.gameId?._id,
                isGameModeOption: modalValue?.row?.isGameModeOption,
                gameModeId: formData?.gameModeId === "" ? modalValue?.row?.gameModeId?._id : formData?.gameModeId,
                platform: filterStage?.platform
            }
            if(formData?.gameSubmode !== "Deals"){
                delete payload.subMode;
             }
            if (typeof payload?.tournamentIcon === "string") {
                delete payload.tournamentIcon
            }
            setLoader(true)
            dispatch(UpdateTournament(jsonToFormData(payload))).then(res => {
                redirectApiHandler();
                if (res.data.success) {
                    setLoader(false)
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
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

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
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



    useEffect(() => {
        if (modalValue?.isEdit) {
            const { row } = modalValue;
            setFormData({
                ...formData,
                tournamentName: row?.tournamentName,
                game: row?.gameId?.gameName,
                gameSubmode: row?.gameModeId?.gameModeName,
                description: row?.description,
                tournamentIcon:row?.tournamentIcon,
                subMode: row?.subMode
            });
            if (row?.platform === 'Android') {
                setFilterStage({ ...filterStage, android: true, ios: false, crossPlatform: false, platform: 'Android' });
            } else if (row?.platform === 'Ios') {
                setFilterStage({ ...filterStage, android: false, ios: true, crossPlatform: false, platform: 'Ios' });
            } else {
                setFilterStage({ ...filterStage, android: false, ios: false, crossPlatform: true, platform: 'Cross-Platform' });
            }
            if (row?.isOrientationPortrait) {
                setFilterOrientation({ portrait: true, landscape: false, orientationField: "portrait" })
            } else {
                setFilterOrientation({ portrait: false, landscape: true, orientationField: "landscape" })
            }
        }
    }, [modalValue]);

    const gameLogoHandler = (e,name) => {
        if(e.target.files[0]?.type?.includes('image/') &&  e.target.files[0].type !== 'image/gif'){
        let img = new Image();
        img.src = window.URL.createObjectURL(e.target.files[0]);
        img.onload = () => {
            if (name === "gameLogo") {
                if (img.width === 512 && img.height === 512) {
                    setFormData({ ...formData, tournamentIcon: e.target.files[0] });
                } else {
                    handleOpenModalError('CommonPop', { header: "Error", body: 'The width and height of the image should be  512 * 512 size' });
                }
            }else {
                if (img.width === 430 && img.height === 400) {
                    setFormData({ ...formData, gamePoster: e.target.files[0], isGamePosterUpdated: true });
                } else {
                    handleOpenModalError('CommonPop', { header: "Error", body: 'The width and height of the image should be  430 * 400 size' });
                }
            }
        }
        }else {
            handleOpenModalError('CommonPop', { header: "Error", body: 'Please add only image file' });
        }
    }
    return (
        <Box sx={style} className={'update_game_modal'}>
            <div className={'modal_main_popup add_game_details add_game_popup'}>
                <div className={'modal_popup_title'}>
                    <h2>Update Tournament information</h2>
                </div>
                <div className={'add_game_popup_content'}>
                    <div className={'add_game_popup_content_form'}>
                        <form className={'popup_form'} method={'POST'} onSubmit={(e) => handleSubmit(e)}>
                            <div>
                                <div className={'add_game_section_content_form'}>
                                    <div className="formData">
                                        <label>Enter Tournament Name <span className={'validation-star'}>*</span></label>
                                        <div className="emailWrap input_length_counter">
                                            <input type="text" value={formData?.tournamentName} className={'wrap_input_modal'} maxLength={20} name='tournamentName' placeholder={'Tournament Name'} onChange={(e) => handleChange(e)} />
                                            <span>{formData?.tournamentName?.length}/20</span>
                                        </div>
                                        {simpleValidator.current.message("game name", formData?.tournamentName, 'required')}
                                    </div>
                                    <div className='form_group profile new_game_section profile-image-dropdown'>
                                        <div className='user_profile'>
                                            <div className='user_profile_pic'>
                                                {profileImages(formData?.tournamentIcon, user)}
                                                {
                                                    !formData?.tournamentIcon &&
                                                    <span className='addnew'>
                                                    <img src={icon_plus} alt='' />
                                                     <input type='file' name='member_photo' id='' onChange={(e) => gameLogoHandler(e, "gameLogo")} />
                                                </span>
                                                }

                                            </div>
                                            <label htmlFor='' className='profile_label'>Tournament Logo <span className={'validation-star'}>*</span></label><br/>
                                            <span className={'size-validation'}>(512*512 size)</span>
                                    {simpleValidator.current.message(" tournament logo", formData?.tournamentIcon, 'required')}
                                        </div>
                                        {
                                            formData?.tournamentIcon &&
                                            <div className={'close-icon'} onClick={()=> setFormData({...formData,tournamentIcon:'',})}>
                                                <CloseSharpIcon/>
                                            </div>
                                        }

                                    </div>

                                </div>
                                <div className={'select_game_platform_value game_mode game_mode_main_section'}>
                                    <div className={'select_label tab01 mt_1'}>
                                        <label>Game <span className={'validation-star'}>*</span></label>
                                        <SelectDropdown name={'game'} options={gameList} formData={formData} setFormData={setFormData} handleOpenModal={handleOpenModal} />
                                        {simpleValidator.current.message("selectGenre", formData.game, 'required')}
                                    </div>
                                    <div className={'select_label tab01 mt_1'}>
                                        <label>Game Mode</label>
                                        <SelectDropdown name={'gameSubmode'} options={CheckGameMode} formData={formData} setFormData={setFormData} handleOpenModal={handleOpenModal} />
                                        {simpleValidator.current.message("gameSubmode", formData.gameSubmode, 'required')}
                                    </div>
                                    {formData?.gameSubmode === "Deals" && 
                                        (<div className={"select_label tab01 mt_1 "}>
                                        <label>
                                            Sub Mode <span className={"validation-star"}>*</span>
                                            </label>
                                            <CommonDropdown
                                            options={["All Game Mode", "2 Deals", "3 Deals", "6 Deals"]} name={'subMode'} formData={formData} setFormData={setFormData} placeholder={"Select Sub Mode"}
                                            />
                                            {simpleValidator.current.message("submode",formData?.subMode,"required")}
                                            </div>
                                            )
                                        }
                                    <div className={'popup_form_checkbox select_label tab02 mt_05'}>
                                        <div className="formData">
                                            <label>Platform</label>
                                            <div className={'platform_field'}>
                                                {
                                                    modalValue?.platform === 'Ios' ?
                                                        <Tooltip title="Android Platform">
                                                            <div className={filterStage.android ? 'checkboxWrap activePlatformIcon' : "checkboxWrap"}>
                                                                <AndroidIcon />
                                                                <input type="checkbox" name='Android' checked={filterStage.android} className={'disabled_checkBox'} />
                                                            </div>
                                                        </Tooltip>
                                                        :
                                                        <Tooltip title="Android Platform">
                                                            <div className={filterStage.android ? 'checkboxWrap activePlatformIcon' : "checkboxWrap "}>
                                                                <AndroidIcon />
                                                                <input type="checkbox" name='Android' checked={filterStage.android} onChange={(e) => stageCheckboxFilter(e)} />
                                                            </div>
                                                        </Tooltip>
                                                }
                                                {
                                                    modalValue?.platform === 'Android' ?
                                                        <Tooltip title="iOS Platform">
                                                            <div className={filterStage.ios ? 'checkboxWrap activePlatformIcon' : "checkboxWrap"}>
                                                                <AppleIcon />
                                                                <input type="checkbox" name='Ios' checked={filterStage.ios} className={'disabled_checkBox'} />
                                                            </div>
                                                        </Tooltip>
                                                        :
                                                        <Tooltip title="iOS Platform">
                                                            <div className={filterStage.ios ? 'checkboxWrap activePlatformIcon' : "checkboxWrap"}>
                                                                <AppleIcon />
                                                                <input type="checkbox" name='Ios' checked={filterStage.ios} onChange={(e) => stageCheckboxFilter(e)} />
                                                            </div>
                                                        </Tooltip>
                                                }

                                                <Tooltip title="Cross-Platform">
                                                    <div className={filterStage.crossPlatform ? 'checkboxWrap activePlatformIcon' : "checkboxWrap"}>
                                                        <PhonelinkIcon />
                                                        <input type="checkbox" name='Cross-Platform' checked={filterStage.crossPlatform} onChange={(e) => stageCheckboxFilter(e)} />
                                                    </div>
                                                </Tooltip>
                                            </div>
                                            {simpleValidator.current.message("Platform", filterStage.platform, 'required')}
                                        </div>
                                        <div className="formData orientation_filed">
                                            <label>Orientation</label>
                                            <div className={'platform_field'}>
                                                <Tooltip title="Portrait Orientation">
                                                    <div className={filterOrientation.portrait ? 'checkboxWrap activePlatformIcon' : "checkboxWrap"}>
                                                        <ScreenLockPortraitIcon />
                                                        <input type="checkbox" name='portrait' checked={filterOrientation.portrait} onChange={(e) => orientationCheckboxFilter(e)} />
                                                    </div>
                                                </Tooltip>
                                                <Tooltip title="Landscape Orientation">
                                                    <div className={filterOrientation.landscape ? 'checkboxWrap activePlatformIcon' : "checkboxWrap"}>
                                                        <ScreenLockLandscapeIcon />
                                                        <input type="checkbox" name='landscape' checked={filterOrientation.landscape} onChange={(e) => orientationCheckboxFilter(e)} />
                                                    </div>
                                                </Tooltip>
                                            </div>
                                            {simpleValidator.current.message("Orientation", filterOrientation.orientationField, 'required')}
                                        </div>
                                    </div>
                                </div>
                                {/*--------------------------------------------End Number of Player ----------------------------------------------------------------*/}
                                <div className="formData mt_15 game_input_chars">
                                    <label>Enter Tournament Description (100 Chars) </label>
                                    <div className="text_Wrap mt_margin">
                                        <textarea name='description' rows={3} value={formData?.description} maxLength={100} onChange={(e) => handleChange(e)} />
                                        <span>{formData?.description?.length}/100</span>
                                    </div>
                                </div>
                            </div>
                            <div className={'formData_btn'}>
                                <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                                <FilledButton type={'submit'} value={'Update'} className={'btn loader_css'} loading={loader} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModalError}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModalError} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Box>
    )
}
export default UpdateTurnament