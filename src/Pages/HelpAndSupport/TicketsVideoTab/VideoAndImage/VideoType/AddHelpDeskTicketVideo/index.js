import React, {useCallback, useEffect, useRef, useState} from "react";
import {Box} from "@mui/material";
import FilledButton from "../../../../../../Components/FileButton";
import CommonModal from "../../../../../../hoc/CommonModal";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../../hoc/PopContent";
import {isValidUrl, jsonToFormData, profileImages} from "../../../../../../utils";
import Clip from "./VideoPlayer";
import {
    addTicketsVideoDetails,
    createHelpDeskHeader,
    deleteImageTicketsDetails,
    getTicketsVideoDetails,
    updateHelpDeskHeader,
    UpdateTicketsVideoDetails,
    uploadImageTicketImage
} from "../../../../../../Redux/HelpAndSupport/action";
import {useDispatch} from "react-redux";
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

const AddHelpDeskTicketVideo = ({modalValue, handleOpenModal,redirectApiHandler }) => {
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
        isVideoUpdated:false,
        type: "video"
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
                    isVideoLink: false,
                    type: formData?.type,
                    ticketVideo: formData?.ticketVideo
                }
                deleteScreenShort?.forEach(ele=>{
                    dispatch(deleteImageTicketsDetails({ image: ele?.screenshot, ticketVideoId: ele?.gameId}))
                });
                dispatch(createHelpDeskHeader(jsonToFormData(payload))).then(res => {
                    redirectApiHandler()
                    if (res.data.success) {
                        setLoader(false);
                                handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                    } else {
                        setLoader(false)
                        handleOpenModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                    }
                })
            }else{
                let payload = {
                    ticketVideo: formData?.ticketVideo,
                    isImage:formData?.isImage,
                    isVideoLink: false,
                    type: formData?.type
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
                let payload = {
                    isImage:true,
                    isVideoLink: false,
                    type: formData?.type,
                    ticketVideo: formData?.ticketVideo,
                    ticketVideoId : modalValue?.row?._id,
                    isImageUpdated : formData?.isVideoUpdated
                }
                // deleteScreenShort?.forEach(ele=>{
                //     dispatch(deleteImageTicketsDetails({ image: ele?.screenshot, ticketVideoId: ele?.gameId}))
                // });
            dispatch(UpdateTicketsVideoDetails(payload)).then(res => {
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
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                    setLoader(false);
                    redirectApiHandler();
                    } else {
                        setLoader(false)
                        handleOpenModalError('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                    }
                })
           

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
                    <h2>{modalValue?.isEdit ? 'Update Help Desk Header Video' : 'Add Help Desk Header Video'}</h2>
                </div>
                <div className={'header_slider_details header_slider_details_Ads'}>
                    <form className='form_group ' onSubmit={ modalValue?.isEdit ?  (e) => handleEditSubmit(e)  : (e) => handleSubmit(e)}>
                       
                            <>

                               
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
                               
                            </>
                        


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
                           
                        </div>
                    </form>
                </div>
            </div>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModalError}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModalError} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getTicketsVideoDetails}/>
            </CommonModal>
        </Box>
    )
}
export default AddHelpDeskTicketVideo