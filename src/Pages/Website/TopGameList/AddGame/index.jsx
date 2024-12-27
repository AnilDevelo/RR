import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import user from "../../../../assets/images/avatar.png";
import FilledButton from "../../../../Components/FileButton";
import SimpleReactValidator from "simple-react-validator";
import { Editor } from "react-draft-wysiwyg";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import UploaderImages from "../UploaderImages";
import draftToHtml from "draftjs-to-html";
import { useDispatch } from "react-redux";
import { addTopWebsiteGame, deleteScreenshots, updateScreenshots, updateTopWebsiteGame } from "../../../../Redux/website/action";
import { jsonToFormData } from "../../../../utils";
import htmlToDraft from "html-to-draftjs";
import CommonModal from "../../../../hoc/CommonModal";
import PopComponent from "../../../../hoc/PopContent";
import icon_plus from "../../../../assets/images/plus.svg";
import TextEditor from "Pages/Master/Document/TextEditor";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 950,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};

const AddGame = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const featuresRef = useRef();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [formValues, setFormValues] = useState([""]);
    const [deleteScreenShort,setDeleteScreenShort] = useState([]);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails?.modalName];
    const [formData, setFormData] = useState({webSiteGameIcon: '', screenShots: [], gameName: '', description: '', isGameIcon: false, isGameScreenShort: false});

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        setFormData({
            ...formData,
            description: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        });
    };

    const handleChange = (e, index) => {
        let temp = [...formValues];
        temp[index] = e.target.value;
        setFormValues(temp);
    };
    const addFormFields = (type, index) => {
        if (type === 'add') {
          // let divEle =  document.getElementById('upload_img_section_id');
          //   divEle.style.position = "absolute";
          //   divEle.style.top = `${divEle.offsetTop + 67}px`;
           setFormValues([...formValues, ""])
        } else {
            let temp = [...formValues];
            temp.splice(index, 1);
            setFormValues(temp)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                webSiteGameIcon: formData?.webSiteGameIcon,
                gameName: formData?.gameName,
                description: formData?.description,
                features: formValues
            }
            setLoader(true)
            dispatch(addTopWebsiteGame(jsonToFormData(payload))).then(res => {
                if (res.data.success) {
                    setLoader(false);
                    formData?.screenShots?.forEach(ele => {
                        dispatch(updateScreenshots(jsonToFormData({ newInsertedScrenshots: ele , gameId:res.data.data?._id})))
                    })
                    redirectApiHandler();
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                } else {
                    setLoader(false);
                    handleOpenModalError('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                }
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };

    useEffect(() => {
        if (modalValue?.isEdit) {
            setFormData({
                ...formData,
                gameName: modalValue?.data?.gameName,
                screenShots: modalValue?.data?.screenShots,
                webSiteGameIcon: modalValue?.data?.gameIcon,
            });
             setFormValues(modalValue?.data?.features);
            const contentBlock = htmlToDraft(modalValue?.data?.description);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                setEditorState(editorState);
                setFormData({
                    ...formData,
                    gameName: modalValue?.data?.gameName,
                    screenShots: modalValue?.data?.screenShots,
                    webSiteGameIcon: modalValue?.data?.gameIcon,
                    description: draftToHtml(convertToRaw(editorState.getCurrentContent()))
                });
            }
        }
    }, [modalValue]);

    

    const handleEditSubmit = (e) => {
        e.preventDefault();
        let payload = {
            gameId: modalValue?.data?._id,
            webSiteGameIcon: formData?.webSiteGameIcon,
            gameName: formData?.gameName,
            description: formData?.description,
            features:formValues,
            isGameIconUpdated: typeof formData?.webSiteGameIcon !== "string"
        }
        setLoader(true);
        if(!payload?.isGameIconUpdated){
            delete payload.webSiteGameIcon
        }
        dispatch(updateTopWebsiteGame(jsonToFormData(payload))).then(res => {
            if (res.data.success) {
                setLoader(false);
                if(formData?.screenShots?.length > 0 ){
                    formData?.screenShots?.forEach(ele => {
                        if(ele !== undefined) {
                            dispatch(updateScreenshots(jsonToFormData({ newInsertedScrenshots: ele , gameId:res.data.data?._id}))).then(res=>{
                                redirectApiHandler();
                            })
                        }
                    })
                }
                if(deleteScreenShort?.length > 0){
                    deleteScreenShort?.forEach((item)=>{
                        return  dispatch(deleteScreenshots(item)).then(res=>{
                            redirectApiHandler();
                        })
                    })
                }
                redirectApiHandler()
                handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
            } else {
                setLoader(false);
                handleOpenModalError('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
            }
        })
    }

    const handleOpenModalError = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };
    const handleEditor = (props)=>{
        setFormData({
            ...formData,
            description: props
        })
    };
    return (
        <Box sx={style} className={'add-game-section'}>
            <div className={'game_details_view modal_main_popup'}>
                <div className={'modal_popup_title'}>
                    {
                        modalValue?.isEdit ?
                            <h2>Edit Game</h2>
                            :
                            <h2>Add Game</h2>
                    }
                </div>
            </div>
            <div className={'add_game_details_sec add_admin_user_popup_content'}>
                <form className={'game-form-details'} onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)} method="post" encType="multipart/form-data">
                    <div className={'game_display_form'}>
                        {/* <div className='user_profile'>
                            <label htmlFor='' className='profile_label'>Game Icon <span className={'validation-star'}>*</span></label>
                            <div className={'header_section_slider'}>
                                <div className='user_profile_pic'>
                                    {
                                        modalValue?.isEdit ?
                                            <img src={typeof formData?.webSiteGameIcon === 'string' ? formData?.webSiteGameIcon : typeof formData?.webSiteGameIcon !== 'string' ? URL.createObjectURL(formData?.webSiteGameIcon) : user} alt='' />
                                            :
                                            <img src={formData?.webSiteGameIcon ? URL.createObjectURL(formData?.webSiteGameIcon) : user} alt='' />
                                    }

                                    <span className='add_new'>
                                        <input type='file' name='webSiteGameIcon' id='' onChange={(e) => setFormData({ ...formData, webSiteGameIcon: e.target.files[0], isGameIconUpdated: true })} /> </span>
                                </div>
                            </div>
                            {simpleValidator.current.message("gameIcon", formData?.webSiteGameIcon, 'required')}
                        </div> */}
                        <div className='form_group profile new_game_section'>
                                        <div className='user_profile'>
                                            <label htmlFor='' className='profile_label'>Game Icon <span className={'validation-star'}>*</span></label>
                                            <div className='user_profile_pic'>
                                                <img src={typeof formData?.webSiteGameIcon === 'string' ? formData?.webSiteGameIcon : typeof formData?.webSiteGameIcon !== 'string' ? URL.createObjectURL(formData?.webSiteGameIcon) : user} alt='' />
                                                <span className='addnew'>
                                                    <img src={icon_plus} alt='' />
                                                     <input type='file' name='member_photo' id='' onChange={(e) => setFormData({ ...formData, webSiteGameIcon: e.target.files[0], isGameIconUpdated: true })} />
                                                </span>
                                            </div>
                                        </div>
                            {simpleValidator.current.message("webSiteGameIcon", formData?.webSiteGameIcon, 'required')}
                                    </div>

                        <div className={'game_flex'}>
                            <div className="formData formData_field">
                                <label>Game Name <span className={'validation-star'}>*</span></label>
                                <div className="emailWrap">
                                    <input type="text" name='gameName' value={formData?.gameName} onChange={(e) => setFormData({ ...formData, gameName: e.target.value })} />
                                </div>
                                {simpleValidator.current.message("fullName", formData?.gameName, 'required')}
                            </div>

                            <div className={'Add-sdk-form-sec formData_field'}>
                                <div className={'Add-sdk-input-sce'}>
                                    <label>Description <span className={'validation-star'}>*</span></label>
                                </div>
                                <div className={'game_display_form'}>
                        <div className={'text-editor-details-section'}>
                            <TextEditor handleChange={handleEditor} value={formData?.description} />
                        </div>

                    </div>
                                {simpleValidator.current.message("description", formData?.description, 'required')}
                            </div>
                            <div className="form_group features_details edit_form_group formData_field" ref={featuresRef}>
                                <label htmlFor="">Features <span className={'validation-star'}>*</span></label>
                                {formValues.map((element, index) => {
                                    return (
                                        <div className='text_add position_relative d_flex w_100'>
                                            <input type="text" onChange={(e) => handleChange(e, index)} name="education" value={element} id=""
                                                className={formValues?.length > 1 ? 'form_control input-field-feature' : "form_control input-field-featureValue"} />
                                            {
                                                formValues?.length - 1 === index ? (
                                                    <>
                                                        {
                                                            formValues.length !== 1 &&
                                                            <span className='cursor_pointer remove_field' onClick={() => addFormFields('remove', index)}>-</span>
                                                        }
                                                        <span className='cursor_pointer add_field' onClick={() => addFormFields('add')}>+</span>
                                                    </>
                                                ) : (
                                                    formValues.length !== 1 &&
                                                    <span className='cursor_pointer remove_field' onClick={() => addFormFields('remove', index)}>-</span>
                                                )
                                            }
                                        </div>
                                    )
                                })
                                }
                            </div>
                            {simpleValidator.current.message("Features", formValues, 'required')}

                            <div className={'formData_field upload_img_section'} id={'upload_img_section_id'}>
                                <label>Game Image Upload</label>
                                <UploaderImages setFormData={setFormData} formData={formData} modalValue={modalValue?.data} setDeleteScreenShort={setDeleteScreenShort} deleteScreenShort={deleteScreenShort} />
                            </div>

                            <div className={'d_flex_end mt_1'}>
                                <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                                <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'btn loader_css'} loading={loader} />
                            </div>
                        </div>
                    </div>
                </form>

            </div>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModalError}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModalError} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Box>

    )
}
export default AddGame