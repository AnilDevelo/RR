import React, {useCallback, useEffect, useRef, useState} from "react";
import FilledButton from "../../../../Components/FileButton";
import Box from "@material-ui/core/Box";
import SimpleReactValidator from "simple-react-validator";
import Clip from "../../../HelpAndSupport/TicketsVideoTab/AddTicketsVideo/VideoPlayer";
import PopComponent from "../../../../hoc/PopContent";
import CommonModal from "../../../../hoc/CommonModal";
import {
    createSplashScreen,
    deleteImageSplashScreen,
    uploadImageSplashScreen
} from "../../../../Redux/Master/action";
import {isValidUrl, jsonToFormData} from "../../../../utils";
import {useDispatch} from "react-redux";
import UploaderImages from "../../../../Components/UploaderImages";
import {uploadImageTicketImage} from "../../../../Redux/HelpAndSupport/action";

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
const AddSplashScreen = ({modalValue,handleOpenModal,redirectApiHandler}) => {
    const dispatch = useDispatch()
    const [videoLinkError,setVideoLinkError] = useState('')
    const [deleteScreenShort, setDeleteScreenShort] = useState([])
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const [loader, setLoader] = useState(false);
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData,setFormData]= useState({
        splashScreenVideo:'',
        type:'Image',
        screenShots: [],
        isVideoUpdated:false
    });

    const handleSubmit =  (e) => {
        e.preventDefault();
        if(formData?.type !== 'VideoLink'){
            simpleValidator.current.fields.splashScreenVideo = true
        }
        if(formData?.type !== 'Image'){
            simpleValidator.current.fields.image = true
        }
        if (simpleValidator.current.allValid()) {
            switch (formData?.type) {
                case 'VideoLink': {
                    let payloadVideo = {
                        type: formData?.type,
                        splashScreenVideo:formData?.splashScreenVideo,
                        value: ''
                    }
                    setLoader(true);
                     dispatch(createSplashScreen( payloadVideo)).then(res => {
                        if (res.data.success) {
                            setLoader(false);
                            redirectApiHandler();
                            handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                        } else {
                            setLoader(false);
                            handleOpenErrorModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                        }
                    })
                    break;
                }
                default: {
                    let payloadSlider = {
                        type: formData?.type,
                    }
                    setLoader(true)
                    deleteScreenShort?.forEach(ele=>{
                        dispatch(deleteImageSplashScreen({ image: ele?.screenshot, splashScreenId: ele?.gameId}))
                    });
                    dispatch(createSplashScreen(payloadSlider)).then(res => {
                        if (res.data.success) {
                            let temp = [];
                            if(formData?.screenShots?.length > 0){
                                formData?.screenShots?.forEach((ele) => {
                                    if(typeof ele === 'object'){
                                        temp.push(dispatch(uploadImageSplashScreen(jsonToFormData({ splashScreenVideo: ele, splashScreenId: res.data.data?._id }))))
                                    }else {
                                        if(formData?.screenShots?.filter(item=> typeof item === 'object')?.length === 0){
                                            setLoader(false);
                                            redirectApiHandler();
                                            handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                                        }
                                    }
                                });
                                // Promise.allSettled(temp).then((results) => results.forEach((result) => {
                                //     if (result?.status == "fulfilled" && result?.value?.data?.status == "success") {
                                //         setLoader(false);
                                //         redirectApiHandler();
                                //         handleOpenModal('CommonPop', { header: "Success", body: result?.value?.data?.message });  
                                //     } else {
                                //         handleOpenModal('CommonPop', { header: "Error", body: result?.value?.data?.message });
                                //     }
                                    
                                // }));
                                Promise.allSettled(temp).
                                then((results) => results.forEach((result) => {
                                    setLoader(false);
                                    redirectApiHandler();
                                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                                }));
                            }
                            // if(deleteScreenShort?.length > 0){
                            //     setLoader(false);
                            //     redirectApiHandler();
                            //     handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                            // }
                            //
                            // if(typeof formData?.screenShots?.[0] === 'string'){
                            //     setLoader(false);
                            //     redirectApiHandler();
                            //     handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                            // }
                        } else {
                            setLoader(false);
                            handleOpenErrorModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                        }
                    })
                    break;
                }
            }

        }else {
            simpleValidator.current.showMessages();
            forceUpdate();
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

    useEffect(()=>{
        if(modalValue?.isEdit){
            setFormData({
                ...formData,
                splashScreenVideo: modalValue?.row?.splashScreen?.value,
                type: modalValue?.row?.type,
                screenShots: modalValue?.row?.type === 'Image' ?  modalValue?.row?.splashScreen?.value  : []
            })
        }
    },[modalValue?.isEdit])



    return(
        <Box sx={style} className={'how_to_play_section_details video-tickets-section'}>
            <div className={'game_details_view modal_main_popup add_admin_user_popup'}>
                <div className={'modal_popup_title'}>
                    {
                        modalValue?.isEdit ?
                            <h2>Update Splash Screen</h2>
                            :
                            <h2>Add Splash Screen</h2>
                    }
                </div>
            </div>
            <div className={'add_game_details_sec add_admin_user_popup_content'}>
                <form onSubmit={ (e) => handleSubmit(e)} method="post"
                      encType="multipart/form-data">
                    {/*<div className="formData formData_field">*/}
                    {/*    <label>Tag Line </label>*/}
                    {/*    <div className="emailWrap">*/}
                    {/*        <input type="text" value={formData?.tagLine} name='tagLine' placeholder={'Enter tagLine'} onChange={(e) => setFormData({ ...formData, tagLine: e.target.value })} />*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className={'common_checkbox_details'}>
                        <div className={'game_mode_btn'}>
                            <div className={'game_mode_btn_option yes_radio_btn'}>
                                <input type={'radio'} name={'type'} checked={formData?.type === 'Image'} onChange={() => setFormData({ ...formData, type: 'Image' , splashScreenVideo: "" })} />
                                <label>Image {formData?.type === 'Image' && <span className={'validation-star'}>*</span>}</label>
                            </div>
                            <div className={'game_mode_btn_option no_radio_btn'}>
                                <input type={'radio'} name={'type'} checked={formData?.type === 'VideoLink'} onChange={() => setFormData({ ...formData, type: 'VideoLink', splashScreenVideo: ""  })} />
                                <label>Video {formData?.type === 'VideoLink' && <span className={'validation-star'}>*</span>}</label>
                            </div>
                        </div>
                    </div>

                    <div className={'game_display_form'}>
                        {
                            formData?.type === 'VideoLink' &&
                            <div className="formData formData_field header_slider_details_Ads">
                                <>
                                    <div className='user_profile'>
                                        <div className={'header_section_slider'}>
                                            <div className='user_profile_pic'>
                                                <p>Choose Video</p>
                                                <span className='add_new'>
                                                          <input type='file' title="" name='splashScreenVideo' accept=".mp4"   onChange={(e)=> {
                                                              if(e.target.files[0]?.type?.includes('video/')){
                                                                  setFormData({...formData, splashScreenVideo: e.target.files[0], isVideoUpdated:true})
                                                              }else {
                                                                  handleOpenErrorModal('CommonPop', { header: "Error", body: 'Support Only Video File' })
                                                              }

                                                          }} /> </span>
                                            </div>

                                        </div>
                                    </div>
                                    {simpleValidator.current.message("splashScreenVideo", formData?.splashScreenVideo, 'required')}
                                    {
                                        formData?.splashScreenVideo &&
                                        <div className={'video-preview'}>
                                            <Clip url={ typeof formData?.splashScreenVideo === 'string' ?  formData?.splashScreenVideo : URL.createObjectURL(formData?.splashScreenVideo)}/>
                                        </div>
                                    }

                                </>
                                {/*<div className={'common_checkbox_details'}>*/}
                                {/*    <div className={'game_mode_btn'}>*/}
                                {/*        <div className={'game_mode_btn_option yes_radio_btn'}>*/}
                                {/*            <input type={'radio'} name={'isVideoLink'} checked={formData?.isVideoLink}   onChange={() => setFormData({ ...formData, isVideoLink: true, splashScreenVideo: "" })} />*/}
                                {/*            <label>Video Link</label>*/}
                                {/*        </div>*/}
                                {/*        <div className={'game_mode_btn_option no_radio_btn'}>*/}
                                {/*            <input type={'radio'} name={'isVideoLink'} checked={!formData?.isVideoLink}  onChange={() => setFormData({ ...formData, isVideoLink: false, splashScreenVideo: "" })} />*/}
                                {/*            <label>Upload Video</label>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                {/*{*/}
                                {/*    formData?.isVideoLink  &&*/}
                                {/*    <div>*/}
                                {/*        <label>Video Link </label>*/}
                                {/*        <div className="emailWrap">*/}
                                {/*            <input type="text" name='splashScreenVideo' placeholder={'Enter Video Link'} value={formData?.splashScreenVideo} onChange={(e) => setFormData({ ...formData, splashScreenVideo: e.target.value })} />*/}
                                {/*        </div>*/}
                                {/*        {*/}
                                {/*            (formData?.isVideoLink &&  !isValidUrl(formData?.splashScreenVideo)) ?*/}
                                {/*                simpleValidator.current.message("EnterValidVideoLink", videoLinkError, 'required')*/}
                                {/*                :*/}
                                {/*                simpleValidator.current.message("videoLink", formData?.splashScreenVideo, 'required')*/}
                                {/*        }*/}
                                {/*    </div>*/}
                                {/*}*/}

                                {/*{*/}
                                {/*    !formData?.isVideoLink &&*/}
                                {/*    */}
                                {/*}*/}
                            </div>
                        }

                        {
                            formData?.type === 'Image' &&
                            <div className={'formData_field upload_img_section'}>
                                {/*<label>Image Slider</label>*/}
                                <UploaderImages
                                    setFormData={setFormData}
                                    formData={formData}
                                    modalValue={modalValue?.row}
                                    isHowToPlay={true}
                                    setDeleteScreenShort={setDeleteScreenShort}
                                    deleteScreenShort={deleteScreenShort} />
                                {simpleValidator.current.message("image", formData?.screenShots, 'required')}
                            </div>
                        }
                        <div className={'formData_btn  d_flex_end mt_2 form_common_btn add_game_btn_Top'}>
                            <button className={'btn_default'} type={'reset'}
                                    onClick={() => handleOpenModal()}>Cancel
                            </button>
                            {
                               ( !formData?.isVideoUpdated && typeof formData?.splashScreenVideo === "string" && formData?.type !== 'Image' && formData?.splashScreenVideo) ?
                                    <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'}
                                                  className={' disabled_btn_game_Splash  loader_css'} loading={loader} disabled={true} />
                                                  :
                                    <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'}
                                                  className={'btn loader_css'} loading={loader} />
                            }

                        </div>
                    </div>
                </form>

            </div>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenErrorModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenErrorModal} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Box>
    )
}
export default AddSplashScreen