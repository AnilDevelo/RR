import React, {useCallback, useEffect, useRef, useState} from "react";
import {Box} from "@mui/material";
import FilledButton from "../../../../Components/FileButton";
import CommonModal from "../../../../hoc/CommonModal";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../hoc/PopContent";
import {isValidUrl, jsonToFormData, profileImages} from "../../../../utils";
import Clip from "./VideoPlayer";
import {
    addTicketsVideoDetails,
    deleteImageTicketsDetails,
    uploadImageTicketImage
} from "../../../../Redux/HelpAndSupport/action";
import {useDispatch} from "react-redux";
import user from "../../../../assets/images/avatar.png";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import UploaderImages from "../../../../Components/UploaderImages";
import {deleteImageSplashScreen, uploadImageSplashScreen} from "../../../../Redux/Master/action";
import ReactPlayer from "react-player";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};

const AddTicketsVideo = ({modalValue, handleOpenModal,redirectApiHandler }) => {
    const dispatch = useDispatch();
    const videoRef = useRef();
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const [deleteScreenShort, setDeleteScreenShort] = useState([])
    const forceUpdate = useCallback(() => updateState({}), []);
    const [loader, setLoader] = useState(false);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false })
    let Modal = PopComponent[modalDetails?.modalName];
    const [formData, setFormData] = useState({
        ticketVideo : '',
        isImage:true,
        screenShots: [],
        isVideoUpdated:false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData?.isImage){
            simpleValidator.current.fields.ticketImage = true
        }
        if (simpleValidator.current.allValid()) {
            setLoader(true)
            if(formData?.isImage){
                let payload = {
                    isImage:true,
                    isVideoLink: false
                }
                deleteScreenShort?.forEach(ele=>{
                    dispatch(deleteImageTicketsDetails({ image: ele?.screenshot, ticketVideoId: ele?.gameId}))
                });
                dispatch(addTicketsVideoDetails(payload)).then(res => {
                    if (res.data.success) {
                        let temp = [];
                        setLoader(false);
                        if(formData?.screenShots?.length > 0){
                            formData?.screenShots?.forEach((ele) => {
                                if(typeof ele === 'object'){
                                    temp.push(dispatch(uploadImageTicketImage(jsonToFormData({ ticketVideo: ele, ticketVideoId: res.data.data?._id }))))
                                }
                            });
                            Promise.allSettled(temp).
                            then((results) => results.forEach((result) => {
                                setLoader(false);
                                redirectApiHandler();
                                handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                            }));
                        }
                        if(deleteScreenShort?.length > 0){
                            setLoader(false);
                            redirectApiHandler();
                            handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                        }
                        // redirectApiHandler();
                        // handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                    } else {
                        setLoader(false)
                        handleOpenModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                    }
                })
            }else{
                let payload = {
                    ticketVideo: formData?.ticketVideo,
                    isImage:formData?.isImage,
                    isVideoLink: false
                }
                dispatch(addTicketsVideoDetails(payload)).then(res => {
                    if (res.data.success) {
                        setLoader(false)
                        redirectApiHandler()
                        handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                    } else {
                        setLoader(false)
                        handleOpenModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                    }
                })
            }

        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }

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

    useEffect(()=>{
        if(modalValue?.isEdit){
            setFormData({
                ...formData,
                ticketVideo: modalValue?.row?.isImage ?  modalValue?.row?.ticketVideoImage  : modalValue?.row?.ticketVideo,
                isImage:  modalValue?.row?.isImage,
                screenShots: modalValue?.row?.isImage ?  modalValue?.row?.ticketVideoImage  : []
            })
        }
    },[modalValue?.isEdit])

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        if(!formData?.isImage){
            simpleValidator.current.fields.ticketImage = true
        }


        if (simpleValidator.current.allValid()) {
            setLoader(true)
            if(formData?.isImage){
                let payload = {
                    isImage:true,
                    isVideoLink: false
                }
                deleteScreenShort?.forEach(ele=>{
                    dispatch(deleteImageTicketsDetails({ image: ele?.screenshot, ticketVideoId: ele?.gameId}))
                });
                dispatch(addTicketsVideoDetails(payload)).then(res => {
                    if (res.data.success) {
                        let temp = [];
                        if(formData?.screenShots?.length > 0){
                            formData?.screenShots?.forEach((ele) => {
                                if(typeof ele === 'object'){
                                    temp.push(dispatch(uploadImageTicketImage(jsonToFormData({ ticketVideo: ele, ticketVideoId: res.data.data?._id }))))
                                }else {
                                    if(formData?.screenShots?.filter(item=> typeof item === 'object')?.length === 0){
                                        setLoader(false);
                                        redirectApiHandler();
                                        handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                                    }

                                }
                            });
                            Promise.allSettled(temp).
                            then((results) => results.forEach((result) => {
                                setLoader(false);
                                redirectApiHandler();
                                handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                            }));
                        }

                        // if(deleteScreenShort?.length > 0 ){
                        //     setLoader(false);
                        //     redirectApiHandler();
                        //     handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                        // }
                        // if(formData?.screenShots?.length === 0){
                        //     setLoader(false);
                        //     redirectApiHandler();
                        //     handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                        // }

                    } else {
                        setLoader(false)
                        handleOpenModalError('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                    }
                })
            }else{
                let payload = {
                    ticketVideo: formData?.ticketVideo,
                    isImage:formData?.isImage,
                    isVideoLink: true
                }
                dispatch(addTicketsVideoDetails(payload)).then(res => {
                    if (res.data.success) {
                        setLoader(false)
                        redirectApiHandler()
                        handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                    } else {
                        setLoader(false)
                        handleOpenModalError('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                    }
                })
            }

        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }

    useEffect(() => {
        if(videoRef?.current){
            videoRef?.current?.load();
            videoRef?.current.play();
        }

    }, [formData?.ticketVideo]);

    function youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length === 11)? match[7] : false;
    }

    return(
        <Box sx={style} className={'how_to_play_section_details  video-tickets-section'}>
            <div className={'add_admin_user_popup modal_main_popup'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Help Desk Header Image/Video' : 'Add Help Desk Header Image/Video'}</h2>
                </div>
                <div className={'header_slider_details header_slider_details_Ads'}>
                    <form className='form_group ' onSubmit={ modalValue?.isEdit ?  (e) => handleEditSubmit(e)  : (e) => handleSubmit(e)}>

                        <div className={'common_checkbox_details'}>
                            <div className={'game_mode_btn'}>
                                <div className={'game_mode_btn_option yes_radio_btn'}>
                                    <input type={'radio'} name={'isImage'} checked={formData?.isImage} onChange={() => setFormData({ ...formData, isImage: true , ticketVideo: "" })} />
                                    <label>Image {formData?.isImage && <span className={'validation-star'}>*</span>}</label>
                                </div>
                                <div className={'game_mode_btn_option no_radio_btn'}>
                                    <input type={'radio'} name={'isImage'} checked={!formData?.isImage} onChange={() => setFormData({ ...formData, isImage: false, ticketVideo: ""  })} />
                                    <label>Video {!formData?.isImage && <span className={'validation-star'}>*</span>}</label>
                                </div>
                            </div>
                        </div>

                        {/*--------------------------------------- Game Logo [Start] ----------------------------------------- */}
                        {
                            formData?.isImage &&
                            <div className={'formData_field upload_img_section'}>
                                {/*<label>Image Slider</label>*/}
                                <UploaderImages
                                    setFormData={setFormData}
                                    formData={formData}
                                    modalValue={modalValue?.row}
                                    isHowToPlay={true}
                                    setDeleteScreenShort={setDeleteScreenShort}
                                    deleteScreenShort={deleteScreenShort} />
                                {         simpleValidator.current.message("ticketImage", formData?.screenShots, 'required')}
                            </div>
                        }

                        {
                            !formData?.isImage &&
                            <>
                                {/*<div className={'common_checkbox_details'}>*/}
                                {/*    <div className={'game_mode_btn'}>*/}
                                {/*        <div className={'game_mode_btn_option yes_radio_btn'}>*/}
                                {/*            <input type={'radio'} name={'isGameMode'} checked={formData?.isVideoLink} onChange={() => setFormData({ ...formData, isVideoLink: true, ticketVideo: '' })} />*/}
                                {/*            <label>Video Link</label>*/}
                                {/*        </div>*/}
                                {/*        <div className={'game_mode_btn_option no_radio_btn'}>*/}
                                {/*            <input type={'radio'} name={'isGameMode'} checked={!formData?.isVideoLink} onChange={() => setFormData({ ...formData, isVideoLink: false, ticketVideo: '' })} />*/}
                                {/*            <label>Video Upload</label>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                {/*{*/}
                                {/*    (formData?.isVideoLink)  &&*/}
                                {/*    <div className="formData formData_field header_slider_details_Ads_videoTicket">*/}
                                {/*        <div className="emailWrap">*/}
                                {/*            <input type="text" name='howToPlayVideo' placeholder={'Enter Video Link'} value={formData?.ticketVideo} onChange={(e) => setFormData({ ...formData, ticketVideo: e.target.value })} />*/}
                                {/*        </div>*/}
                                {/*        {*/}
                                {/*            (formData?.isVideoLink &&  !isValidUrl(formData?.ticketVideo)) ?*/}
                                {/*                simpleValidator.current.message("EnterValidVideoLink", videoLinkError, 'required')*/}
                                {/*                :*/}
                                {/*                simpleValidator.current.message("ticketVideo", formData?.ticketVideo, 'required')*/}
                                {/*        }*/}
                                {/*        {*/}
                                {/*            ( formData?.isVideoLink && formData?.ticketVideo) &&*/}
                                {/*            <div className={'video-preview'}>*/}
                                {/*                <Clip url={ typeof formData?.ticketVideo === 'string' ?  formData?.ticketVideo : URL.createObjectURL(formData?.ticketVideo)}/>*/}
                                {/*            </div>*/}
                                {/*        }*/}
                                {/*    </div>*/}
                                {/*}*/}
                                {
                                    !formData?.isImage &&
                                    <div className='user_profile'>
                                        <div className={'header_section_slider'}>
                                            <div className='user_profile_pic'>
                                                <p>Choose Video</p>
                                                <span className='add_new'>
                                            <input type='file' name='ticketVideo' accept=".mp4"   onChange={(e)=> {
                                            if(e.target.files[0]?.type?.includes('video/')){
                                                setFormData({...formData, ticketVideo: e.target.files[0], isVideoUpdated:true})
                                            }else {
                                                handleOpenModalError('CommonPop', { header: "Error", body: 'Support Only Video File' })
                                            }
                                        }} /> </span>
                                            </div>
                                        </div>
                                        {  simpleValidator.current.message("ticketVideo", formData?.ticketVideo, 'required')}

                                    </div>
                                }

                                {
                                    ( !formData?.isImage && formData?.ticketVideo) &&
                                    <div className={'video-preview'}>
                                        {
                                            youtube_parser(typeof formData?.ticketVideo === 'string' ?  formData?.ticketVideo : URL.createObjectURL(formData?.ticketVideo)) ?
                                                <ReactPlayer url={ typeof formData?.ticketVideo === 'string' ?  formData?.ticketVideo : URL.createObjectURL(formData?.ticketVideo)}  width="100%" height="100%" />
                                                :
                                                <video ref={videoRef} width="100%" height="240" controls muted>
                                                    <source src={ typeof formData?.ticketVideo === 'string' ?  formData?.ticketVideo : URL.createObjectURL(formData?.ticketVideo)} />
                                                </video>
                                        }
                                    </div>
                                }
                            </>
                        }


                        {/*--------------------------------------- Game Logo [End] ----------------------------------------- */}
                        <div className={'formData_btn'}>
                            <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                            {
                                (  !formData?.isVideoUpdated && typeof formData?.ticketVideo === "string" && formData?.type !== 'Image' && formData?.ticketVideo) ?
                                    <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'}
                                                  className={' disabled_btn_game_Splash  loader_css'} loading={loader} disabled={true} />
                                    :
                                    <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'}
                                                  className={'btn loader_css'} loading={loader} />
                            }
                            {/*<FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'btn loader_css'} loading={loader} />*/}
                        </div>
                    </form>
                </div>
            </div>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModalError}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModalError} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Box>
    )
}
export default AddTicketsVideo