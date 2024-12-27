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
import {gameNumberOfPlayer, getSingleGameDetails, updateGame} from "../../../../Redux/games/action";
import CommonModal from "../../../../hoc/CommonModal";
import Tooltip from "@mui/material/Tooltip";
import PhonelinkIcon from "@mui/icons-material/Phonelink";
import { getGenreNames } from "../../../../Redux/games/GenreGame/action";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import {profileImages} from "../../../../utils";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};

const UpdateGame = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const genreNamesList = useSelector(state => state?.gameReducer?.genreNamesList)
    const [loader, setLoader] = useState(false)
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [filterStage, setFilterStage] = useState({ android: false, ios: false, crossPlatform: false });
    const [filterOrientation, setFilterOrientation] = useState({ portrait: false, landscape: false, orientationField: "" });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData, setFormData] = useState({
        gameName: '', genre: '', description: '', platform: '',
        isOrientationPortrait: '',
        // format: '',
        // engine: '',
        gameIcon: '', gameDesignDocLink: '', youtubeVideoLink: '', isGameModeOption: false, gameTag: 'New Game', isNoOfPlayer: false, isMultipleDeck: false,
        gameGenreKey: {},
        gamePoster: '',
        isGamePosterUpdated: false
    });
    const gameDetails = useSelector(state => state?.gameReducer?.gameDetails)

    useEffect(() => {
        dispatch(getGenreNames({ genreStatus: 'Active' }));
    }, [])

    const stageCheckboxFilter = (e) => {
        const { checked, value, name } = e.target;
        setFilterStage({ ...filterStage, [e.target.name]: checked });
        setFormData({
            ...formData,
            platform: name
        })
        if (name === 'Android' && checked) {
            setFilterStage({ ...filterStage, android: true, ios: false, crossPlatform: false })
        }
        if (name === 'Ios' && checked) {
            setFilterStage({ ...filterStage, android: false, ios: true, crossPlatform: false })
        }
        if (name === 'Cross-Platform' && checked) {
            setFilterStage({ ...filterStage, android: false, ios: false, crossPlatform: true })
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
                // format: formData?.format === 'Live Multiplayer (Sync)' ? 'Sync' : 'Async',
                isOrientationPortrait: filterOrientation?.orientationField === "portrait",
                isIconUpdated: typeof formData?.gameIcon !== "string",
                gameId: gameDetails?._id,
                publisherId: gameDetails?.publisherId?._id,
                description: formData?.description.trim(),
            }
            if (typeof payload?.gameIcon === "string") {
                delete payload.gameIcon
            }
            if(!payload?.isGamePosterUpdated && payload?.gamePoster){
                delete  payload?.gamePoster
            }
            if(payload?.gamePoster === ''){
                payload = {
                    ...payload,
                    isGamePosterRemove:true
                }
            }else {
                payload = {
                    ...payload,
                    isGamePosterRemove:false
                }
            }
            setLoader(true)
            dispatch(updateGame(payload)).then(res => {
                if (res.data.success) {
                    if (!modalValue?.isGameHeader) {
                        redirectApiHandler();
                    }
                    if(modalValue?.isGameHeader){
                        dispatch(getSingleGameDetails({ gameId: gameDetails?._id }));
                    }
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
        if (Object?.keys(gameDetails)?.length > 0) {
            setFormData({
                ...formData,
                gameName: gameDetails?.gameName,
                youtubeVideoLink: gameDetails?.youtubeVideoLink,
                gameDesignDocLink: gameDetails?.gameDesignDocLink,
                description: gameDetails?.description,
                platform: gameDetails?.platform,
                // format: gameDetails?.format === 'Sync' ? 'Live Multiplayer (Sync)' : 'Score Submission (Async)',
                // engine: gameDetails?.engine,
                isMultipleDeck: gameDetails?.isMultipleDeck || false,
                genre: gameDetails?.genre,
                gameIcon: gameDetails?.gameIcon,
                gamePoster: gameDetails?.gamePoster,
                gameTag: gameDetails?.gameTag,
                isNoOfPlayer: gameDetails?.isNoOfPlayer,
                isGameModeOption: gameDetails?.isGameModeOption,
                 gameGenreKey: genreNamesList?.filter(item=>item?.genreName === gameDetails?.genre)?.reduce((acc,cur)=> {return {...cur}},{})
            });
            if (gameDetails?.platform === 'Android') {
                setFilterStage({ ...filterStage, android: true, ios: false, crossPlatform: false })
            } else if (gameDetails?.platform === 'Ios') {
                setFilterStage({ ...filterStage, android: false, ios: true, crossPlatform: false })
            } else {
                setFilterStage({ ...filterStage, android: false, ios: false, crossPlatform: true })
            }
            if (gameDetails?.isOrientationPortrait) {
                setFilterOrientation({ portrait: true, landscape: false, orientationField: "portrait" })
            } else {
                setFilterOrientation({ portrait: false, landscape: true, orientationField: "landscape" })
            }
        }
    }, [gameDetails,genreNamesList]);

    const numberOfPlayerHandler = (e, text) => {
        if(text === 'isNoOfPlayerTrue'){
            handleOpenModalError('CommonPop', { header: "Error", body: 'Are you sure want to "ON" number of player ?', setFormData:setFormData, formData:formData, isUpdateGame:true, isNumber:true })
        }
        if(text === 'isNoOfPlayerFalse'){
            handleOpenModalError('CommonPop', { header: "Error", body: 'Are you sure want to "OFF" number of player ?', setFormData:setFormData, formData:formData, isUpdateGame:true, isNumber:false })
        }
    }

    const gameLogoHandler = (e,name) => {
        if(e.target.files[0]?.type?.includes('image/') &&  e.target.files[0].type !== 'image/gif'){
        let img = new Image();
        img.src = window.URL.createObjectURL(e.target.files[0]);
        img.onload = () => {
            if (name === "gameLogo") {
                if (img.width === 512 && img.height === 512) {
                    setFormData({ ...formData, gameIcon: e.target.files[0] });
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
                    <h2>Update Game information</h2>
                </div>
                <div className={'add_game_popup_content'}>
                    <div className={'add_game_popup_content_form'}>
                        <form className={'popup_form'} method={'POST'} onSubmit={(e) => handleSubmit(e)}>
                            <div>
                                <div className={'add_game_section_content_form'}>
                                    <div className="formData">
                                        <label>Enter Game Name <span className={'validation-star'}>*</span></label>
                                        <div className="emailWrap input_length_counter">
                                            <input type="text" value={formData?.gameName} className={'wrap_input_modal'} maxLength={20} name='gameName' placeholder={'Game Name'} onChange={(e) => handleChange(e)} />
                                            <span>{formData?.gameName?.length}/20</span>
                                        </div>
                                        {simpleValidator.current.message("game name", formData?.gameName, 'required')}
                                    </div>
                                    <div className='form_group profile new_game_section profile-image-dropdown'>
                                        <div className='user_profile'>
                                            <div className='user_profile_pic'>
                                                {profileImages(formData?.gamePoster, user)}
                                                {
                                                    !formData?.gamePoster &&
                                                    <span className='addnew'>
                                                    <img src={icon_plus} alt='' />
                                                     <input type='file' name='member_photo' id='' onChange={(e) => gameLogoHandler(e, "gamePoster")} />
                                                </span>
                                                }

                                            </div>
                                            <label htmlFor='' className='profile_label'>Game Poster <span className={'size-validation'}>(430*400 size)</span></label>
                                        </div>
                                        {
                                            formData?.gamePoster &&
                                            <div className={'close-icon'} onClick={()=> setFormData({...formData,gamePoster:'',})}>
                                                <CloseSharpIcon/>
                                            </div>
                                        }
                                    </div>

                                    <div className='form_group profile new_game_section profile-image-dropdown'>
                                        <div className='user_profile'>
                                            <div className='user_profile_pic'>
                                                {profileImages(formData?.gameIcon, user)}
                                                {
                                                    !formData?.gameIcon &&
                                                    <span className='addnew'>
                                                    <img src={icon_plus} alt='' />
                                                     <input type='file' name='member_photo' id='' onChange={(e) => gameLogoHandler(e, "gameLogo")} />
                                                </span>
                                                }

                                            </div>
                                            <label htmlFor='' className='profile_label'>Game Logo <span className={'size-validation'}>(512*512 size)</span> <span className={'validation-star'}>*</span></label>
                                            {simpleValidator.current.message("gameIcon", formData?.gameIcon, 'required')}
                                        </div>
                                        {
                                            formData?.gameIcon &&
                                            <div className={'close-icon'} onClick={()=> setFormData({...formData,gameIcon:'',})}>
                                                <CloseSharpIcon/>
                                            </div>
                                        }

                                    </div>

                                </div>


                                {/*<div className={'select_game_platform_value mt_15'}>*/}

                                {/*    <div className={'select_label tab01'}>*/}
                                {/*        <label>Engine *</label>*/}
                                {/*        <SelectDropdown name={'engine'} options={['Unity']} formData={formData} setFormData={setFormData} handleOpenModal={handleOpenModal} />*/}
                                {/*        {simpleValidator.current.message("selectEngine", formData.engine, 'required')}*/}
                                {/*    </div>*/}
                                {/*    <div className={'select_label tab02'}>*/}
                                {/*        <label>Format *</label>*/}
                                {/*        <SelectDropdown name={'format'} isFormat={true} formData={formData} setFormData={setFormData} handleOpenModal={handleOpenModal} />*/}
                                {/*        {simpleValidator.current.message("selectFormat", formData.format, 'required')}*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className={'select_game_platform_value game_mode game_mode_main_section'}>
                                    <div className={'select_label tab01 mt_1'}>
                                        <label>Genre <span className={'validation-star'}>*</span></label>
                                        <SelectDropdown name={'genre'} options={genreNamesList} formData={formData} setFormData={setFormData} handleOpenModal={handleOpenModal} />
                                        {simpleValidator.current.message("selectGenre", formData.genre, 'required')}
                                    </div>

                                    <div className={'popup_form_checkbox select_label tab02'}>
                                        <div className="formData">
                                            <label>Platform <span className={'validation-star'}>*</span></label>
                                            <div className={'platform_field'}>
                                                {
                                                    gameDetails?.platform === 'Ios' ?
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
                                                    gameDetails?.platform === 'Android' ?
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
                                            {simpleValidator.current.message("Platform", formData.platform, 'required')}
                                        </div>
                                        <div className="formData orientation_filed">
                                            <label>Orientation <span className={'validation-star'}>*</span></label>
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
                                {/*-------------------------------------------- Number of Player ----------------------------------------------------------------*/}
                                {
                                    Object?.keys(formData?.gameGenreKey)?.length > 0 &&
                                    <div className={'select_game_platform_value game_mode game_mode_main_section'}>
                                        {
                                            (formData?.gameGenreKey?.isGameMode || formData?.gameGenreKey?.genreName === 'Card') &&
                                            <div className={'common_checkbox_details'}>
                                                <label>Is Game Mode ? <span className={'validation-star'}>*</span></label>
                                                <div className={'game_mode_btn'}>
                                                    <div className={'game_mode_btn_option yes_radio_btn'}>
                                                        <input type={'radio'} name={'isGameMode'} checked={formData?.isGameModeOption} onChange={(e) => setFormData({ ...formData, isGameModeOption: true })} />
                                                        <label>Yes</label>
                                                    </div>
                                                    <div className={'game_mode_btn_option no_radio_btn'}>
                                                        <input type={'radio'} name={'isGameMode'} checked={!formData?.isGameModeOption} onChange={(e) => setFormData({ ...formData, isGameModeOption: false })} />
                                                        <label>No</label>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        { (formData?.gameGenreKey?.isNoOfPlayer || formData?.gameGenreKey?.genreName === 'Card') &&
                                        <div className={'common_checkbox_details'}>
                                            <label>Is Number Of Player ? <span className={'validation-star'}>*</span></label>
                                            <div className={'game_mode_btn'}>
                                                <div className={'game_mode_btn_option yes_radio_btn'}>
                                                    <input type={'radio'} name={'isNoOfPlayer'} checked={formData?.isNoOfPlayer} onChange={(e) => setFormData({ ...formData, isNoOfPlayer: true })} />
                                                    <label>Yes</label>
                                                </div>
                                                <div className={'game_mode_btn_option no_radio_btn'}>
                                                    <input type={'radio'} name={'isNoOfPlayer'} checked={!formData?.isNoOfPlayer} onChange={(e) => setFormData({ ...formData, isNoOfPlayer: false })} />
                                                    <label>No</label>
                                                </div>
                                            </div>
                                        </div>
                                        }
                                        {
                                            ( formData?.gameGenreKey?.isMultipleDeck || formData?.gameGenreKey?.genreName === 'Card' || formData?.gameGenreKey?.genreName === 'Card Game') &&
                                            <div className={'common_checkbox_details'}>
                                                <label>Is Multiple Number Of Deck?<span className={'validation-star'}>*</span></label>
                                                <div className={'game_mode_btn'}>
                                                    <div className={'game_mode_btn_option yes_radio_btn'}>
                                                        <input type={'radio'} name={'isMultipleDeck'} checked={formData?.isMultipleDeck} onChange={(e) => setFormData({ ...formData, isMultipleDeck: true })} />
                                                        <label>Yes</label>
                                                    </div>
                                                    <div className={'game_mode_btn_option tab_radio no_radio_btn'}>
                                                        <input type={'radio'} name={'isMultipleDeck'} checked={!formData?.isMultipleDeck} onChange={(e) => setFormData({ ...formData, isMultipleDeck: false })} />
                                                        <label>No</label>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                }

                                {/*--------------------------------------------End Number of Player ----------------------------------------------------------------*/}
                                <div className="formData mt_15 game_input_chars">
                                    <label>Enter Game Description (100 Chars) </label>
                                    <div className="text_Wrap mt_margin">
                                        <textarea name='description' rows={3} value={formData?.description} maxLength={100} onChange={(e) => handleChange(e)} />
                                        <span>{formData?.description?.length}/100</span>
                                    </div>
                                </div>

                                {/*<div className={'design_document'}>*/}
                                {/*    <div className={'design_document_title'}>*/}
                                {/*        <div className={'sub_title_content'}>*/}
                                {/*            <h4>How to Play Youtube Video Link</h4>*/}
                                {/*            <input type={'text'} name={'youtubeVideoLink'} value={formData?.youtubeVideoLink} placeholder={'Share with us the Youtube Video Link.'} onChange={(e) => handleChange(e)} />*/}
                                {/*        </div>*/}
                                {/*    </div>*/}

                                {/*</div>*/}
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
export default UpdateGame