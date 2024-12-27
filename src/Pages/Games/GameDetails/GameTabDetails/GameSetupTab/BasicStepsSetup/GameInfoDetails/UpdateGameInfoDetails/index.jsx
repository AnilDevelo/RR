import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../../../../hoc/PopContent";
import {getSingleGameDetails, updateGameInfo} from "../../../../../../../../Redux/games/action";
import {isValidUrl, jsonToFormData, profileImages} from "../../../../../../../../utils";
import user from "../../../../../../../../assets/images/avatar.png";
import icon_plus from "../../../../../../../../assets/images/plus.svg";
import FilledButton from "../../../../../../../../Components/FileButton";
import CommonModal from "../../../../../../../../hoc/CommonModal";

const UpdateGameInfoDetails =  ({ setEditGameInfo, handleOpenModal }) => {
    const dispatch = useDispatch();
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const gameDetails = useSelector(state => state?.gameReducer?.gameDetails);
    const [loader, setLoader] = useState(false);
    const [formData, setFormData] = useState({
        gameName: '',
        description: '',
        entryFeesType: 'Cash',
        isIconUpdated: false,
        gameIcon: '',
        gameServerLink: '',
        isModeWiseGameServerLink:false,
        gamePoster: "",
        isGamePosterUpdated: false,
    });
    const [gameServerLinkError,setGameServerLinkError] = useState('');

    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData?.gameServerLink && gameServerLinkError) {
            simpleValidator.current.fields.EnterValidGameServerLink = true;
        }
        if(formData?.isModeWiseGameServerLink){
            simpleValidator.current.fields.gameServerLink = true
        }
        if (simpleValidator.current.allValid()) {
            let payload = {
                gameName: formData?.gameName,
                description: formData?.description,
                gameServerLink: formData?.gameServerLink,
                isIconUpdated: formData?.isIconUpdated,
                isGamePosterUpdated: formData?.isGamePosterUpdated,
                gameIcon: formData?.gameIcon,
                gamePoster: formData?.gamePoster,
                entryFeesType: "Cash",
                gameId: gameDetails?._id,
                publisherId: gameDetails?.publisherId?._id,
                isModeWiseGameServerLink: formData?.isModeWiseGameServerLink,
            };
            if (!formData?.isIconUpdated) {
                delete payload.gameIcon;
            }
            setLoader(true);
            dispatch(updateGameInfo(jsonToFormData(payload))).then((res) => {
                if (res.data.success) {
                    setLoader(false);
                    setEditGameInfo(false);
                    dispatch(getSingleGameDetails({ gameId: gameDetails?._id }));
                    handleOpenModal("CommonPop", {header: "Success", body: res?.data?.message,});
                } else {
                    setLoader(false);
                    handleOpenErrorModal("CommonPop", {header: "Error", body: res?.data?.message || res?.data?.msg,});
                }
            });
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    useEffect(() => {
        if (gameDetails) {
            setFormData({
                ...formData,
                gameName: gameDetails?.gameName,
                description: gameDetails?.description,
                platform: gameDetails?.platform,
                orientation: gameDetails?.isOrientationPortrait ? 'Portrait' : 'Landscape',
                gameIcon: gameDetails?.gameIcon,
                iosAppId: gameDetails?.iosAppId,
                iosBundleId: gameDetails?.iosBundleId,
                iosStoreUrl: gameDetails?.iosStoreUrl,
                entryFeesType: gameDetails?.entryFeesType,
                androidPackageName: gameDetails?.androidPackageName,
                unityId: gameDetails?.unityId,
                unityPackageName: gameDetails?.unityPackageName,
                gameServerLink: gameDetails?.gameServerLink,
                gamePoster: gameDetails?.gamePoster,
                isGamePosterUpdated: gameDetails?.isGamePosterUpdated || false,
                isHighestScoreWin: gameDetails?.isHighestScoreWin ? 'Highest Score' : 'Low Score',
                isModeWiseGameServerLink: gameDetails?.isModeWiseGameServerLink || false,
            })
        }
    }, [gameDetails]);

    const handleChangeProfile = (e,name) => {
        if(e.target.files[0]?.type?.includes('image/') &&  e.target.files[0].type !== 'image/gif'){
            let img = new Image();
            img.src = window.URL.createObjectURL(e.target.files[0]);
            img.onload = () => {
                if (name === "gameLogo") {
                    
                    if (img.width === 512 && img.height === 512) {
                        setFormData({ ...formData, gameIcon: e.target.files[0], isIconUpdated: true });
                    } else {
                        handleOpenModal('CommonPop', { header: "Error", body: 'The width and height of the image should be  512 * 512 size' });
                    }
                }else if(name === "headerBackgroundImage"){
                          setFormData({ ...formData, headerBackgroundImage: e.target.files[0], isHeaderBackgroundImageUpdated: true})
                }
                else{
                    if (img.width === 430 && img.height === 400) {
                        setFormData({ ...formData, gamePoster: e.target.files[0], isGamePosterUpdated : true });
                    } else {
                        handleOpenModal('CommonPop', { header: "Error", body: 'The width and height of the image should be  430 * 400 size' });
                    }
                }
            }
        }else {
            handleOpenErrorModal('CommonPop', { header: "Error", body: 'Please Enter Only Image File' });
        }
    }

    useEffect(()=>{
        if(formData?.gameServerLink &&  !isValidUrl(formData?.gameServerLink)){
            setGameServerLinkError('')
        }else if(isValidUrl(formData?.gameServerLink)){
            setGameServerLinkError('Enter')
        }
    },[formData?.gameServerLink]);

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


    return (
        <div>
            <div className={'add_admin_user_popup'}>
                <div className={'add_admin_user_popup_content'}>
                    <form method={'POST'} className={'form_game_content_details'} onSubmit={(e) => handleSubmit(e)}>
                        <div className={'game_info_edit_form'}>
                            <div className={'game_left_side_info'}>
                                <div className="formData">
                                    <label className={'fontFamily'}>Game Title <span className={"validation-star mll"}> *</span></label>
                                    <div className="emailWrap input_length_counter">
                                        <input type="text" name='gameName' maxLength={20} value={formData?.gameName} onChange={(e) => handleChange(e)} />
                                        <span className={'game_edit_info_span'}>{formData?.gameName?.length}/20</span>
                                    </div>
                                    {simpleValidator.current.message("gameName", formData?.gameName, 'required')}
                                </div>
                                <div className="formData ">
                                    <label className={'fontFamily'}>App Description</label>
                                    <div className="emailWrap game_input_chars">
                                        <textarea rows={3} name={'description'} value={formData?.description} maxLength={100} onChange={(e) => handleChange(e)} />
                                        <span className={'game_edit_info_span'}>{formData?.description?.length}/100</span>
                                    </div>
                                </div>
                                <div className={''}>
                                    {gameDetails?.isGameModeOption == true &&
                                        <div className={'common_checkbox_details real_money_field mt_margin'}>
                                            <label>Is Upload Game Mode Wise Game Server URL ?</label>
                                            <div className={'game_mode_btn mt_0'}>
                                                <div className={'game_mode_btn_option yes_radio_btn '}>
                                                    <input type="radio" name='isModeWiseGameServerLink' checked={formData?.isModeWiseGameServerLink} className={'checkbox_field_tournament'} onChange={(e) => setFormData({
                                                        ...formData,
                                                        isModeWiseGameServerLink: true
                                                    })} />
                                                    <label>Yes</label>
                                                </div>
                                                <div className={'game_mode_btn_option no_radio_btn'}>
                                                    <input type="radio" name={'isModeWiseGameServerLink'} checked={!formData?.isModeWiseGameServerLink} className={'checkbox_field_tournament'} onChange={(e) => setFormData({
                                                        ...formData,
                                                        isModeWiseGameServerLink: false
                                                    })} />
                                                    <label>No</label>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {
                                        !formData?.isModeWiseGameServerLink &&
                                        <div className="formData field_left">
                                            <label className={'fontFamily'}>Game Server URL <span className={"validation-star mll"}> *</span></label>
                                            <div className="emailWrap">
                                                <input type="text" name='gameServerLink' value={formData?.gameServerLink} onChange={(e) => handleChange(e)} />
                                            </div>
                                            {
                                                (formData?.gameServerLink &&  !isValidUrl(formData?.gameServerLink)) ?
                                                    simpleValidator.current.message("EnterValidGameServerLink", gameServerLinkError, 'required')
                                                    :
                                                    simpleValidator.current.message("gameServerLink", formData?.gameServerLink, 'required')
                                            }

                                        </div>
                                    }
                                </div>
                            </div>
                            <div className='form_group profile new_game_section game_edit_info'>
                                <div className='user_profile'>
                                    <div className='user_profile_pic'>
                                        {profileImages(formData?.gameIcon, user)}
                                        <span className='addnew'>
                                            <img src={icon_plus} alt='' />
                                            <input type='file' title="" name='member_photo' accept="image/*" id='' onChange={(e) => handleChangeProfile(e, "gameLogo")} />
                                        </span>
                                    </div>
                                    <label htmlFor='' className='profile_label fontFamily' >Game Logo <br/><span className={'size-validation'}>(512*512 size)</span><span className={'validation-star'}>*</span></label>
                                </div>
                                {simpleValidator.current.message("gameIcon", formData?.gameIcon, 'required')}
                            </div>
                            <div className='form_group profile new_game_section game_edit_info'>
                                <div className='user_profile'>
                                    <div className='user_profile_pic'>
                                        {profileImages(formData?.gamePoster, user)}
                                        <span className='addnew'>
                                            <img src={icon_plus} alt='' />
                                            <input type='file'  title="" name='member_photo' accept="image/*" id='' onChange={(e) => handleChangeProfile(e, "gamePoster")} />
                                        </span>
                                    </div>
                                    <label htmlFor='' className='profile_label fontFamily' >Game Poster<br/><span className={'size-validation'}>(430*400 size)</span></label>
                                </div>
                                {/* {simpleValidator.current.message("gamePoster", formData?.gamePoster, 'required')} */}
                            </div>
                        </div>
                        <div className={'d_flex_end formData_btn'}>
                            <button className={'btn_default'} type={'reset'} onClick={() => setEditGameInfo(false)}>Cancel</button>
                            <FilledButton type={'submit'} value={'Update'} className={'btn loader_css'} loading={loader} />
                        </div>
                    </form>
                </div>
            </div>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenErrorModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenErrorModal} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </div>
    )
}
export default UpdateGameInfoDetails