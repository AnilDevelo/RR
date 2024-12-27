import FilledButton from "../../../../../../Components/FileButton";
import Box from "@mui/material/Box";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { getOptimizeStatus, getSingleGameDetails, getUniqueMgpReleases, uploadGameBuild } from "../../../../../../Redux/games/action";
import { jsonToFormData } from "../../../../../../utils";
import { useParams } from "react-router-dom";
import DropdownMode from "../../LobbyTab/CreateLobby/DropdownMode";
import CommonModal from "../../../../../../hoc/CommonModal";
import PopComponent from "../../../../../../hoc/PopContent";
import TextEditor from "../../../../../Master/Document/TextEditor";
import GameBuildDropDown from "./GameBuildDropDown";
import GameModeDropdown from "../../LobbyTab/CreateLobby/LobbyGameMode/GameModeDropdown";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 0,
    borderRadius: "5px",
};

const AddGameBuilds = ({ modalValue, handleOpenModal, redirectApiHandler,gameBuilddata }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const gameDetails = useSelector(state => state?.gameReducer?.gameDetails);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const gameBuildMPGRelease = useSelector(state => state?.gameReducer?.gameBuildMPGRelease);

    const [rowData, setRowData] = useState({});
    const [formData, setFormData] = useState({
        // releaseGuideLink: '',
        // buildScript: '',
        // buildPlugging: '',
        buildScene: '',
        buildAndroidAssets: '',
        buildIosAssets: '',
        releaseVersion: '',
        releaseNotes: '',
        // codeUrl: '',
        mgpReleaseId: '',
        isUploadGameWiseModeBuild:false,
        gameModeId: '',
        isUploadNewScene:true
    })

    useEffect(() => {
        dispatch(getSingleGameDetails({ gameId: id }))
        getOptimizeStatusHandler()
    }, [])


    const getOptimizeStatusHandler = () => {
        dispatch(getOptimizeStatus({ gameId: id, publisherId: gameDetails?.publisherId?._id })).then(res => {
            setRowData(res.data.data);
        })
    };


    useEffect(() => {
        dispatch(getUniqueMgpReleases({ gameId: id }))
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData?.isUploadGameWiseModeBuild){
            simpleValidator.current.fields.gameMode = true
        }
        if (!formData?.isUploadNewScene) {
            simpleValidator.current.hideMessages(); 
            simpleValidator.current.fields.buildScene = true;
          }
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                publisherId: gameDetails?.publisherId?._id,
                gameId: gameDetails?._id
            };
            if(!payload?.isUploadGameWiseModeBuild){
                delete payload?.gameModeId
            }
            setLoader(true)
            dispatch(uploadGameBuild(jsonToFormData(payload))).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    redirectApiHandler()
                    dispatch(getSingleGameDetails({ gameId: id }))
                    setFormData({
                        ...formData,
                        // releaseGuideLink: '',
                        // buildScript: '',
                        // buildPlugging: '',
                        buildScene: '',
                        buildAndroidAssets: '',
                        buildIosAssets: '',
                        releaseVersion: '',
                        releaseNotes: '',
                        // codeUrl: ''
                        isUploadNewScene:''
                    })
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                } else {
                    handleOpenModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                    setLoader(false);
                }
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };


    const handleFileChanges = (e) => {
        if(e.target.files[0]?.name.includes('.zip')){
            setFormData({
                ...formData,
                [e.target.name]: e.target.files[0]
            })
        }else{
            handleOpenErrorModal('CommonPop', { header: "Error", body: 'Please add Only .zip File' })
        }

    }
    useEffect(() => {
        if (document.getElementsByClassName('notranslate')) {
            document.getElementsByClassName('notranslate')[0].innerHTML = 'Select'
        }

    }, []);

    const handleUnityFileChanges = (e) => {
        if(e.target.files[0]?.name.includes('.unity')){
            setFormData({
                ...formData,
                [e.target.name]: e.target.files[0]
            })
        }else{
            handleOpenErrorModal('CommonPop', { header: "Error", body: 'Please add Only .unity File' })
        }
    }

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
    function isOnlyHtmlTags(inputString) {
        // Remove HTML tags using a regular expression
        var contentWithoutTags = inputString.replace(/<\/?[^>]+(>|$)/g, '');
        // Check if the resulting content is empty
        return contentWithoutTags.trim() === '';
    }
    
    const handleEditor = (props) => {
        let empty = false;
        //     const div = document.createElement('div');
        //     div.innerHTML = props;
        // div.querySelectorAll('p, br').forEach((node) => {
        //     if (node.innerHTML.trim() !== "" && node.innerHTML !== '<br>') {
        //         empty = false;
        //     }
        //       node.parentNode.removeChild(node);
        // });
        empty = isOnlyHtmlTags(props)
        if (empty) {
            return setFormData({ ...formData, releaseNotes: "" });
        }
            setFormData({ ...formData, releaseNotes: props });
    };

    // useEffect(() => {
    //     dispatch(getGameBuildsList({gameId: id,publisherId: gameDetails?.publisherId?._id,})).then(res => {
    //         if (res.data.success) {
    //             SetgetGameBuildsListData({
    //                 ...getGameBuildsListData,
    //                 list: res?.data?.data?.docs,
    //             });
    //         }
    //      }
    //     )
    // }, [])
    const handleChange = (e) => {
        setFormData({ ...formData, releaseVersion: e.target.value })
    }
    const handleInputValidation = (e) => {
        const inputValue = e.target.value;
        const validVersionPattern = /^(\d+(\.\d+)*)?$/;
        if (!validVersionPattern.test(inputValue)) {
            e.target.value = inputValue.replace(/[^\d.]/g, ''); // Remove non-numeric and non-dot characters
        }
        handleChange(e); // Continue with the regular handleChange function
    };
    return (
        <Box sx={style} className={'user_popup_section game_build_details'}>
            <div className={'add_admin_user_popup modal_main_popup'}>
                <div className={'modal_popup_title'}>
                    <h2>Add Game Builds</h2>
                </div>
            </div>
            {/*<div className={'game_tab_overView head_to_head_gameTab'}>*/}
            {/*    <div className={'game_tab_overView_title'}>*/}
            {/*        <h2>Manage Game Builds</h2>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={'add_admin_user_popup_content'}>
                <form className={'manage_game_builds'} onSubmit={(e) => handleSubmit(e)}>
                    <div className={''}>
                        <div className={'manage_game_builds_details_field field_tab_build01'}>
                            <div className={'manage_game_builds_details_flex'}>
                                <div className={'release_Guide_section'}>
                                    <div className="formData">
                                        <label className={'main_label'}>Release Version <span className={'validation-star'}>*</span></label>
                                        <div className="emailWrap">
                                            <input style={{marginBottom:"0px"}} type="text" maxLength={10} name='releaseVersion' placeholder={'Enter Version'} onChange={(e) => handleInputValidation(e)} />
                                        </div>
                                        {simpleValidator.current.message("releaseVersion", formData?.releaseVersion, "required")}
                                    </div>
                                </div>
                                <div className={'select_game_option_mode mb_build'}>
                                    <label className={'main_label'}>MGP Release Version <span className={'validation-star'}>*</span></label>
                                    <div className={'select_game_option'}>
                                        <DropdownMode options={gameBuildMPGRelease} formData={formData} name={'mgpReleaseId'} setFormData={setFormData} />
                                    </div>
                                    {simpleValidator.current.message("mgpReleaseVersion", formData?.mgpReleaseId, "required")}
                                </div>
                            </div>

                            <div>
                        <div className={'common_checkbox_details real_money_field mt_margin'}>
                            <label>Is Upload New Scence</label>
                            <div className={'game_mode_btn'}>
                                <div className={'game_mode_btn_option yes_radio_btn'}>
                                    <input type="radio" name='isUploadNewScene' checked={formData?.isUploadNewScene} className={'checkbox_field_tournament'} onChange={(e) => setFormData({ ...formData, isUploadNewScene: true })}/>
                                    <label>Yes</label>
                                </div>
                                <div className={'game_mode_btn_option no_radio_btn'}>
                                    <input type="radio" disabled={!gameBuilddata?.list?.length} name='isUploadNewScene' checked={!formData?.isUploadNewScene} className={'checkbox_field_tournament'} onChange={(e) => setFormData({ ...formData, isUploadNewScene: false })}/>
                                    <label>No</label>
                                </div>
                            </div>
                        </div>
                                <div className={'game_build_uploader'}>
                                    {/*<div className={'user_kyc_section_filed_document'}>*/}
                                    {/*    <label>Script (code)</label>*/}
                                    {/*    <div className={'document_details_kyc'}>*/}
                                    {/*        <div className="u_flex u_align-center">*/}
                                    {/*            <div className="u_file-attachment add ">*/}
                                    {/*                <svg width="18" height="18" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="">*/}
                                    {/*                    <path className="u_fill" d="M23.512 11.503l-9.708 9.523a1.682 1.682 0 00-.524 1.196 1.655 1.655 0 00.503 1.205 1.72 1.72 0 001.228.493 1.743 1.743 0 001.22-.514l9.71-9.52a5.002 5.002 0 001.508-3.572c0-1.34-.542-2.624-1.508-3.571a5.202 5.202 0 00-3.641-1.48 5.202 5.202 0 00-3.642 1.48l-9.71 9.523a8.413 8.413 0 00-1.906 2.731 8.277 8.277 0 00-.041 6.491 8.407 8.407 0 001.87 2.755 8.598 8.598 0 002.81 1.835 8.732 8.732 0 006.619-.042 8.592 8.592 0 002.785-1.87l9.71-9.52 2.427 2.38-9.71 9.523a12.033 12.033 0 01-3.898 2.554 12.221 12.221 0 01-9.197 0 12.035 12.035 0 01-3.898-2.554 11.772 11.772 0 01-2.604-3.823 11.587 11.587 0 010-9.02 11.771 11.771 0 012.604-3.822l9.712-9.521A8.673 8.673 0 0122.268 2c2.25.02 4.403.905 5.994 2.465a8.336 8.336 0 012.513 5.879 8.331 8.331 0 01-2.409 5.92l-9.708 9.526a5.157 5.157 0 01-1.67 1.095 5.238 5.238 0 01-3.943 0 5.159 5.159 0 01-1.67-1.096 5.044 5.044 0 01-1.117-1.639 4.966 4.966 0 010-3.866 5.046 5.046 0 011.117-1.638l9.71-9.523 2.427 2.38z" fill="#4E525F" />*/}
                                    {/*                </svg>*/}
                                    {/*                <div className="u_file-attachment-label">*/}
                                    {/*                    <input type="file" title="" name={'buildScript'} accept=".zip" id="upload" autoComplete="off" onChange={(e) => handleFileChanges(e)} />*/}
                                    {/*                </div>*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*        <p>{formData?.buildScript ? formData?.buildScript?.name : ''}</p>*/}
                                    {/*        {simpleValidator.current.message("buildScript", formData?.buildScript, "required")}*/}
                                    {/*    </div>*/}

                                    {/*</div>*/}
                                    {/*<div className={'user_kyc_section_filed_document'}>*/}
                                    {/*    <label>Plugging</label>*/}
                                    {/*    <div className={'document_details_kyc'}>*/}
                                    {/*        <div className="u_flex u_align-center">*/}
                                    {/*            <div className="u_file-attachment add ">*/}
                                    {/*                <svg width="18" height="18" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="">*/}
                                    {/*                    <path className="u_fill" d="M23.512 11.503l-9.708 9.523a1.682 1.682 0 00-.524 1.196 1.655 1.655 0 00.503 1.205 1.72 1.72 0 001.228.493 1.743 1.743 0 001.22-.514l9.71-9.52a5.002 5.002 0 001.508-3.572c0-1.34-.542-2.624-1.508-3.571a5.202 5.202 0 00-3.641-1.48 5.202 5.202 0 00-3.642 1.48l-9.71 9.523a8.413 8.413 0 00-1.906 2.731 8.277 8.277 0 00-.041 6.491 8.407 8.407 0 001.87 2.755 8.598 8.598 0 002.81 1.835 8.732 8.732 0 006.619-.042 8.592 8.592 0 002.785-1.87l9.71-9.52 2.427 2.38-9.71 9.523a12.033 12.033 0 01-3.898 2.554 12.221 12.221 0 01-9.197 0 12.035 12.035 0 01-3.898-2.554 11.772 11.772 0 01-2.604-3.823 11.587 11.587 0 010-9.02 11.771 11.771 0 012.604-3.822l9.712-9.521A8.673 8.673 0 0122.268 2c2.25.02 4.403.905 5.994 2.465a8.336 8.336 0 012.513 5.879 8.331 8.331 0 01-2.409 5.92l-9.708 9.526a5.157 5.157 0 01-1.67 1.095 5.238 5.238 0 01-3.943 0 5.159 5.159 0 01-1.67-1.096 5.044 5.044 0 01-1.117-1.639 4.966 4.966 0 010-3.866 5.046 5.046 0 011.117-1.638l9.71-9.523 2.427 2.38z" fill="#4E525F" />*/}
                                    {/*                </svg>*/}
                                    {/*                <div className="u_file-attachment-label">*/}
                                    {/*                    <input type="file" title="" name={'buildPlugging'} accept=".zip" id="upload" autoComplete="off" onChange={(e) => handleFileChanges(e)} />*/}
                                    {/*                </div>*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*        {simpleValidator.current.message("buildPlugging", formData?.buildPlugging, "required")}*/}
                                    {/*        <p>{formData?.buildPlugging ? formData?.buildPlugging?.name : ''}</p>*/}
                                    {/*    </div>*/}

                                    {/*</div>*/}
                                    <div className={'user_kyc_section_filed_document'}>
                                        <label>Scene {formData?.isUploadNewScene == true && <span className={'validation-star'}>*</span>}</label>
                                        <div className={'document_details_kyc'}>
                                            <div className="u_flex u_align-center">
                                                <div className="u_file-attachment add ">
                                                    <svg width="18" height="18" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                                                        <path className="u_fill" d="M23.512 11.503l-9.708 9.523a1.682 1.682 0 00-.524 1.196 1.655 1.655 0 00.503 1.205 1.72 1.72 0 001.228.493 1.743 1.743 0 001.22-.514l9.71-9.52a5.002 5.002 0 001.508-3.572c0-1.34-.542-2.624-1.508-3.571a5.202 5.202 0 00-3.641-1.48 5.202 5.202 0 00-3.642 1.48l-9.71 9.523a8.413 8.413 0 00-1.906 2.731 8.277 8.277 0 00-.041 6.491 8.407 8.407 0 001.87 2.755 8.598 8.598 0 002.81 1.835 8.732 8.732 0 006.619-.042 8.592 8.592 0 002.785-1.87l9.71-9.52 2.427 2.38-9.71 9.523a12.033 12.033 0 01-3.898 2.554 12.221 12.221 0 01-9.197 0 12.035 12.035 0 01-3.898-2.554 11.772 11.772 0 01-2.604-3.823 11.587 11.587 0 010-9.02 11.771 11.771 0 012.604-3.822l9.712-9.521A8.673 8.673 0 0122.268 2c2.25.02 4.403.905 5.994 2.465a8.336 8.336 0 012.513 5.879 8.331 8.331 0 01-2.409 5.92l-9.708 9.526a5.157 5.157 0 01-1.67 1.095 5.238 5.238 0 01-3.943 0 5.159 5.159 0 01-1.67-1.096 5.044 5.044 0 01-1.117-1.639 4.966 4.966 0 010-3.866 5.046 5.046 0 011.117-1.638l9.71-9.523 2.427 2.38z" fill="#4E525F" />
                                                    </svg>
                                                    {
                                                    (formData?.isUploadNewScene == true) ?
                                                    <div className="u_file-attachment-label">
                                                        <input type="file" title="" name={'buildScene'} accept=".unity" id="upload" autoComplete="off" onChange={(e) => handleUnityFileChanges(e)} />
                                                    </div>
                                                            :
                                                    <div className="u_file-attachment-label readOnly_field">
                                                        <input type="file" className={"readOnly_field"} readOnly={true} title="" name={'buildScene'} accept=".unity" id="upload" disabled autoComplete="off" onChange={(e) => handleUnityFileChanges(e)} />
                                                    </div>
                                                    }
                                                </div>
                                            </div>
                                            {formData?.isUploadNewScene === true ? (simpleValidator.current.message("buildScene", formData?.buildScene, "required")) : null}
                                            <p>{formData?.buildScene ? formData?.buildScene?.name : ''}</p>
                                        </div>

                                    </div>
                                    {
                                        (gameDetails?.platform === "Android" || gameDetails?.platform === 'Cross-Platform') &&
                                        <div className={'user_kyc_section_filed_document'}>
                                            <label>Asset Build Android <span className={'validation-star'}>*</span></label>
                                            <div className={'document_details_kyc'}>
                                                <div className="u_flex u_align-center">
                                                    <div className="u_file-attachment add ">
                                                        <svg width="18" height="18" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                                                            <path className="u_fill" d="M23.512 11.503l-9.708 9.523a1.682 1.682 0 00-.524 1.196 1.655 1.655 0 00.503 1.205 1.72 1.72 0 001.228.493 1.743 1.743 0 001.22-.514l9.71-9.52a5.002 5.002 0 001.508-3.572c0-1.34-.542-2.624-1.508-3.571a5.202 5.202 0 00-3.641-1.48 5.202 5.202 0 00-3.642 1.48l-9.71 9.523a8.413 8.413 0 00-1.906 2.731 8.277 8.277 0 00-.041 6.491 8.407 8.407 0 001.87 2.755 8.598 8.598 0 002.81 1.835 8.732 8.732 0 006.619-.042 8.592 8.592 0 002.785-1.87l9.71-9.52 2.427 2.38-9.71 9.523a12.033 12.033 0 01-3.898 2.554 12.221 12.221 0 01-9.197 0 12.035 12.035 0 01-3.898-2.554 11.772 11.772 0 01-2.604-3.823 11.587 11.587 0 010-9.02 11.771 11.771 0 012.604-3.822l9.712-9.521A8.673 8.673 0 0122.268 2c2.25.02 4.403.905 5.994 2.465a8.336 8.336 0 012.513 5.879 8.331 8.331 0 01-2.409 5.92l-9.708 9.526a5.157 5.157 0 01-1.67 1.095 5.238 5.238 0 01-3.943 0 5.159 5.159 0 01-1.67-1.096 5.044 5.044 0 01-1.117-1.639 4.966 4.966 0 010-3.866 5.046 5.046 0 011.117-1.638l9.71-9.523 2.427 2.38z" fill="#4E525F" />
                                                        </svg>
                                                        <div className="u_file-attachment-label">
                                                            <input type="file" title="" name={'buildAndroidAssets'}  id="upload" autoComplete="off" onChange={(e) => setFormData({...formData, [e.target.name]: e.target.files[0]})} />
                                                        </div>
                                                    </div>
                                                </div>
                                                {(gameDetails?.platform === "Android" || gameDetails?.platform === 'Cross-Platform') ? simpleValidator.current.message("buildAndroidAssets", formData?.buildAndroidAssets, "required") : ''}
                                                <p>{formData?.buildAndroidAssets ? formData?.buildAndroidAssets?.name : ''}</p>
                                            </div>
                                        </div>
                                    }
                                    {
                                        (gameDetails?.platform === "Ios" || gameDetails?.platform === 'Cross-Platform') &&
                                        <div className={'user_kyc_section_filed_document'}>
                                            <label>Asset Build IOS <span className={'validation-star'}>*</span></label>
                                            <div className={'document_details_kyc'}>
                                                <div className="u_flex u_align-center">
                                                    <div className="u_file-attachment add ">
                                                        <svg width="18" height="18" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                                                            <path className="u_fill" d="M23.512 11.503l-9.708 9.523a1.682 1.682 0 00-.524 1.196 1.655 1.655 0 00.503 1.205 1.72 1.72 0 001.228.493 1.743 1.743 0 001.22-.514l9.71-9.52a5.002 5.002 0 001.508-3.572c0-1.34-.542-2.624-1.508-3.571a5.202 5.202 0 00-3.641-1.48 5.202 5.202 0 00-3.642 1.48l-9.71 9.523a8.413 8.413 0 00-1.906 2.731 8.277 8.277 0 00-.041 6.491 8.407 8.407 0 001.87 2.755 8.598 8.598 0 002.81 1.835 8.732 8.732 0 006.619-.042 8.592 8.592 0 002.785-1.87l9.71-9.52 2.427 2.38-9.71 9.523a12.033 12.033 0 01-3.898 2.554 12.221 12.221 0 01-9.197 0 12.035 12.035 0 01-3.898-2.554 11.772 11.772 0 01-2.604-3.823 11.587 11.587 0 010-9.02 11.771 11.771 0 012.604-3.822l9.712-9.521A8.673 8.673 0 0122.268 2c2.25.02 4.403.905 5.994 2.465a8.336 8.336 0 012.513 5.879 8.331 8.331 0 01-2.409 5.92l-9.708 9.526a5.157 5.157 0 01-1.67 1.095 5.238 5.238 0 01-3.943 0 5.159 5.159 0 01-1.67-1.096 5.044 5.044 0 01-1.117-1.639 4.966 4.966 0 010-3.866 5.046 5.046 0 011.117-1.638l9.71-9.523 2.427 2.38z" fill="#4E525F" />
                                                        </svg>
                                                        <div className="u_file-attachment-label">
                                                            <input type="file" title=""  name={'buildIosAssets'} id="upload" autoComplete="off" onChange={(e) => setFormData({...formData, [e.target.name]: e.target.files[0]})} />
                                                        </div>
                                                    </div>
                                                </div>
                                                {(gameDetails?.platform === "Ios" || gameDetails?.platform === 'Cross-Platform') ? simpleValidator.current.message("buildIosAssets", formData?.buildIosAssets, "required") : ''}
                                                <p>{formData?.buildIosAssets ? formData?.buildIosAssets?.name : ''}</p>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            {gameDetails?.isGameModeOption == true &&
                                <div className={'common_checkbox_details real_money_field mt_margin'}>
                                    <label>is Upload Game Wise Mode Build ?</label>
                                    <div className={'game_mode_btn'}>
                                        <div className={'game_mode_btn_option yes_radio_btn'}>
                                            <input type="radio" name='isUploadGameWiseModeBuild' checked={formData?.isUploadGameWiseModeBuild} className={'checkbox_field_tournament'} onChange={(e) => setFormData({ ...formData, isUploadGameWiseModeBuild: true })} />
                                            <label>Yes</label>
                                        </div>
                                        <div className={'game_mode_btn_option no_radio_btn'}>
                                            <input type="radio" name={'isUploadGameWiseModeBuild'} checked={!formData?.isUploadGameWiseModeBuild} className={'checkbox_field_tournament'} onChange={(e) => setFormData({ ...formData, isUploadGameWiseModeBuild: false })} />
                                            <label>No</label>
                                        </div>
                                    </div>
                                </div>
                            }
                        { formData?.isUploadGameWiseModeBuild &&
                            <div className={'formData checkbox_modal real_money_field'}>
                                <label>Mode Of Game <span className={'validation-star mll'}> *</span></label>
                                <div className={'select_game_option_mode'}>
                                    <div className={'select_game_option'}>
                                        <GameModeDropdown formData={formData} setFormData={setFormData} name={'gameModeId'} options={gameDetails?.gameModes || []}/>
                                        {simpleValidator.current.message("gameMode", formData?.gameModeId, 'required')}
                                    </div>
                                </div>
                            </div>
                        }
                        </div>
                        <div className={'manage_game_builds_details_field field_tab_build02'}>
                            <div className={'text-editor-details-section'}>
                                <label className={'main_label'}>Release Notes <span className={'validation-star'} style={{color:"red"}}>*</span>  </label>
                              <div className={'mt_margin'}>
                                    <TextEditor handleChange={handleEditor} name={'releaseNotes'} value={formData?.releaseNotes} classNameProps={'release_note_details'}/>
                              </div>
                              {simpleValidator.current.message("releaseNotes", formData?.releaseNotes, "required")}
                            </div>

                            {/*<div className={'manage_builds_link_flex'}>*/}
                            {/*    <div className={'release_Guide_section release_guide_link'}>*/}
                            {/*        <div className="formData">*/}
                            {/*            <label className={'main_label'}>Release Guide Link</label>*/}
                            {/*            <div className="emailWrap">*/}
                            {/*                <input type="text" name='releaseGuideLink' placeholder={'Enter Guide Link'} value={formData.releaseGuideLink} onChange={(e) => setFormData({ ...formData, releaseGuideLink: e.target.value })} />*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div className={'release_Guide_section release_code_url'}>*/}
                            {/*        <div className="formData">*/}
                            {/*            <label className={'main_label'}> Code URL</label>*/}
                            {/*            <div className="emailWrap">*/}
                            {/*                <input type="text" name='codeUrl' placeholder={'Enter Code URL'} onChange={(e) => setFormData({ ...formData, codeUrl: e.target.value })} />*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    <div className={'formData_btn d_flex_end mt_2'}>
                        <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                        <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'btn loader_css'} loading={loader} />
                    </div>
                    {/*{*/}
                    {/*    rowData?.gameInfoStatus ?*/}
                    {/*      */}
                    {/*        :*/}
                    {/*        <div className={'formData_btn'}>*/}
                    {/*            <button className={'submit_btn disabledBtn'} type={'button'} disabled={true}>Submit</button>*/}
                    {/*        </div>*/}
                    {/*}*/}

                </form>
            </div>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenErrorModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenErrorModal} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Box>
    )
}
export default AddGameBuilds