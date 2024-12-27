import React, {useCallback, useEffect, useRef, useState} from "react";
import Box from "@material-ui/core/Box";
import CommonModal from "../../../../../../hoc/CommonModal";
import PopComponent from "../../../../../../hoc/PopContent";
import VideoTab from "./VideoTab";
import TextEditorTab from "./TextEditorTab";
import ImageSliderTab from "./ImageSliderTab";
import FilledButton from "../../../../../../Components/FileButton";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import {
    addHowToPlay,
    addMGPHowToPlay,
    deleteMGPSliderImagePlay, deleteSliderImagePlay,
    uploadMGPSliderImagePlay, uploadSliderImagePlay
} from "../../../../../../Redux/games/action";
import {jsonToFormData} from "../../../../../../utils";


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

const CreateHowToPlayGame = ({ modalValue, handleOpenModal }) => {
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false })
    let Modal = PopComponent[modalDetails?.modalName];

    const { id } = useParams();
    const dispatch = useDispatch();
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [loader, setLoader] = useState(false);
    const [deleteScreenShort, setDeleteScreenShort] = useState([]);
    const [formData, setFormData] = useState({
        type: 'TextEditor',
        title: '',
        youtubeLink: '',
        value: '',
        screenShots: [],
        howToPlayVideo:'',
        isPortraitMode:false,
        gameType:'',
        isVideoUpdate:false,
        isImageUpdate:false
    });

    const checkRchEmpty = (html = formData?.value) => {
        let div = document.createElement('div');
        div.innerHTML = html;
        let isImage = div?.getElementsByTagName?.('img')?.length > 0;
        if (isImage) {
            return false;
        }
        return (div.innerText.replaceAll('\n', '').trim() === '' || div.innerText.replaceAll('\n', '').trim() === 'undefined');
    };

    useEffect(()=>{

        if(checkRchEmpty() && formData?.type === 'TextEditor' && !formData?.value?.trim() ){
            setFormData({
                ...formData,
                value: ''
            })
        }
    },[formData?.value]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData?.type !== 'TextEditor'){
            simpleValidator.current.fields.description = true
        }
        if (simpleValidator.current.allValid()) {
            switch (formData?.type) {
                case 'TextEditor': {
                    let payload = {
                        gameId: id,
                        type: formData?.type,
                        title: formData?.title.trim(),
                        value: formData?.value,
                    }
                    setLoader(true)
                    dispatch(addHowToPlay(payload)).then(res => {
                        if (res.data.success) {
                            setLoader(false);
                            modalValue.redirectApiProps();
                            handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                        } else {
                            setLoader(false);
                            handleOpenModalError('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                        }
                    })
                    break;
                }
                case 'VideoLink': {
                    let payloadVideo = {
                        gameId: id,
                        type: formData?.type,
                        title: formData?.title.trim(),
                        howToPlayVideo:formData?.howToPlayVideo,
                        value: 'Testing',
                        isVideoUpdate:formData?.isVideoUpdate,
                    }
                    if(!payloadVideo?.isVideoUpdate){
                        delete payloadVideo?.howToPlayVideo
                    }
                    setLoader(true);
                    dispatch(addHowToPlay(jsonToFormData(payloadVideo))).then(res => {
                        if (res.data.success) {
                            setLoader(false);
                            modalValue.redirectApiProps();
                            handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                        } else {
                            setLoader(false);
                            handleOpenModalError('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                        }
                    })
                    break;
                }
                default: {
                    let payloadSlider = {
                        gameId: id,
                        type: formData?.type,
                        title: formData?.title.trim(),
                        value:formData?.title,
                    }
                    setLoader(true)
                    deleteScreenShort?.forEach(ele=>{
                        dispatch(deleteSliderImagePlay({ sliderImage: ele?.screenshot, howToPlayId: ele?.gameId}))
                    });
                    dispatch(addHowToPlay(payloadSlider)).then( res => {
                        if (res.data.success) {
                            let temp = [];
                            if(formData?.screenShots?.length > 0){
                                if(formData?.isImageUpdate){
                                    formData?.screenShots?.forEach((ele) => {
                                        if(typeof ele === 'object'){
                                            temp.push(dispatch(uploadSliderImagePlay(jsonToFormData({ howToPlaySliderImage: ele, howToPlayId: res.data.data?._id, isPortraitMode:formData?.isPortraitMode, isImageUpdate:formData?.isImageUpdate }))))
                                        }
                                    });
                                }
                                if(!formData?.isImageUpdate){
                                    formData?.screenShots?.forEach((ele) => {
                                        temp.push(dispatch(uploadSliderImagePlay(jsonToFormData({ howToPlayId: res.data.data?._id, isPortraitMode:formData?.isPortraitMode, isImageUpdate:formData?.isImageUpdate }))))
                                    });
                                }

                                Promise.allSettled(temp).
                                then((results) => results.forEach((result) => {
                                    setLoader(false);
                                    modalValue.redirectApiProps();
                                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                                }));
                            }
                            if(deleteScreenShort?.length > 0){
                                setLoader(false);
                                modalValue.redirectApiProps();
                                handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                            }
                        } else {
                            setLoader(false);
                            handleOpenModalError('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                        }

                    })
                    break;
                }
            }
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
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

    return (
        <Box sx={style} className={'how_to_play_section_details modal_main_popup video-tickets-section'}>
            <div className={'game_details_view add_admin_user_popup'}>
                <div className={'modal_popup_title'}>
                    {modalValue?.isEdit ? <h2>Edit How To Play</h2> : <h2>Add How To Play</h2>}
                </div>
            </div>
            <div className={'add_game_details_sec add_admin_user_popup_content'}>
                <form onSubmit={ (e) => handleSubmit(e)} method="post" encType="multipart/form-data">
                    <div className={'game_display_form'}>
                        <div className="formData formData_field">
                            <label>Title <span className={'validation-star'}>*</span></label>
                            <div className="emailWrap">
                                <input type="text" value={formData?.title} name='title' placeholder={'Enter Title'} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            {simpleValidator.current.message("title", formData?.title, 'required')}
                        </div>
                        <div className={'common_checkbox_details'}>
                            <div className={'game_mode_btn'}>
                                <div className={'game_mode_btn_option yes_radio_btn'}>
                                    <input type={'radio'} name={'isGameMode'} checked={formData?.type === 'TextEditor'} onChange={() => setFormData({ ...formData, type: 'TextEditor' })} />
                                    <label>Text Editor {formData?.type === 'TextEditor' &&  <span className={'validation-star'}>*</span>}</label>
                                </div>
                                <div className={'game_mode_btn_option no_radio_btn'}>
                                    <input type={'radio'} name={'isGameMode'} checked={formData?.type === 'VideoLink'} onChange={() => setFormData({ ...formData, type: 'VideoLink' })} />
                                    <label>Video {formData?.type === 'VideoLink' && <span className={'validation-star'}>*</span>}</label>
                                </div>
                                <div className={'game_mode_btn_option no_radio_btn'}>
                                    <input type={'radio'} name={'isGameMode'} checked={formData?.type === 'ImageSlider'} onChange={() => setFormData({ ...formData, type: 'ImageSlider' })} />
                                    <label>Image Slider {formData?.type === 'ImageSlider' && <span className={'validation-star'}>*</span>}</label>
                                </div>
                            </div>
                        </div>
                        {
                            formData?.type === 'VideoLink' &&
                            <VideoTab formData={formData} setFormData={setFormData} handleOpenModalError={handleOpenModalError} simpleValidator={simpleValidator}  />
                        }
                        {
                            formData?.type === 'TextEditor' &&
                            <>
                                <TextEditorTab formData={formData} setFormData={setFormData} />
                                {simpleValidator.current.message("description", formData?.value, 'required')}
                            </>
                        }
                        {
                            formData?.type === 'ImageSlider' &&
                            <>
                                <ImageSliderTab formData={formData} setFormData={setFormData} modalValue={modalValue} deleteScreenShort={deleteScreenShort} setDeleteScreenShort={setDeleteScreenShort} />
                                {simpleValidator.current.message("image", formData?.screenShots, 'required')}
                            </>
                        }

                        <div className={formData?.type === 'ImageSlider' ? 'formData_btn mt_2 d_flex_end form_common_btn add_game_btn_details' : 'formData_btn mt_2 d_flex_end form_common_btn add_game_btn_Top'}>
                            <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                            <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'btn loader_css'} loading={loader} />
                        </div>
                    </div>
                </form>
            </div>
            {/*<WithoutSameOptionForm  handleOpenModalError={handleOpenModalError} modalValue={modalValue} handleOpenModal={handleOpenModal} />*/}
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModalError}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModalError} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Box>
    )
}
export default CreateHowToPlayGame