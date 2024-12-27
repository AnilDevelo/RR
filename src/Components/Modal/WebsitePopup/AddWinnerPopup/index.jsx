import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { Editor } from "react-draft-wysiwyg";
import user from "../../../../assets/images/profile.svg";
import icon_plus from "../../../../assets/images/plus.svg";
import FilledButton from "../../../FileButton";
import { useDispatch } from "react-redux";
import { createWinnerList, updateWinnerList } from "../../../../Redux/website/action";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import { jsonToFormData, profileImages } from "../../../../utils";
import SimpleReactValidator from "simple-react-validator";
import htmlToDraft from "html-to-draftjs";
import PopComponent from "../../../../hoc/PopContent";
import CommonModal from "../../../../hoc/CommonModal";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import TextEditor from "Pages/Master/Document/TextEditor";

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
const AddWinnerPopup = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState({
        webSiteWinnerPhoto: '',
        name: '',
        state: '',
        description: '',
        winAmount: '',
        isWinnerPhotoUpdated: false
    });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
            }
            delete payload?.isWinnerPhotoUpdated;
            setLoader(true)
            dispatch(createWinnerList(jsonToFormData(payload))).then(res => {
                if (res.data.success) {
                    redirectApiHandler();
                    setLoader(false)
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                } else {
                    setLoader(false)
                    handleOpenErrorModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                }
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
        setFormData({
            ...formData,
            description: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        })
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            webSiteWinnerPhoto: e.target.files[0],
            isWinnerPhotoUpdated: true
        })
    }
    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                winnerId: modalValue?.row?._id
            }
            if (!payload?.isWinnerPhotoUpdated) {
                delete payload?.webSiteWinnerPhoto
            }
            setLoader(true)
            dispatch(updateWinnerList(jsonToFormData(payload))).then(res => {
                if (res.data.success) {
                    redirectApiHandler();
                    setLoader(false)
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                } else {
                    setLoader(false)
                    handleOpenErrorModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                }
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }
    useEffect(() => {
        if (modalValue?.isEditWinner) {
            const { row } = modalValue;

            setFormData({
                ...formData,
                webSiteWinnerPhoto: row?.photo,
                name: row?.name,
                state: row?.state,
                city: row?.city,
                winAmount: row?.winAmount,
                description: row?.description
            });
            const contentBlock = htmlToDraft(row?.description);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                setEditorState(editorState)
            }
        }
    }, [modalValue])

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
    const handleEditor = (props)=>{
        setFormData({
            ...formData,
            description: props
        })
    };
    return (
        <Box sx={style}>
            <div className={'add_admin_user_popup'}>
                <div className={'add_admin_user_popup_title'}>
                    <h2>{modalValue?.isEditWinner ? "Update Winner" : "Add Winner"} </h2>
                </div>
                <div className={'add_game_details_sec add_admin_user_popup_content'}>
                    <form onSubmit={modalValue?.isEditWinner ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className={'game_display_form winner_content_form '}>
                            <div className='user_profile'>
                                <div className='form_group profile profile-image-dropdown'>
                                    <div className='user_profile'>
                                        <div className='user_profile_pic'>
                                            {profileImages(formData?.webSiteWinnerPhoto, user)}
                                            {
                                                !formData?.webSiteWinnerPhoto &&
                                                <span className='addnew'>
                                                <img src={icon_plus} alt='' />
                                                <input type='file' name='member_photo' id='' onChange={(e) => handleImageChange(e)} />
                                            </span>
                                            }

                                        </div>
                                        <label htmlFor='' className='profile_label'>Winner image <span className={'validation-star'}>*</span> </label>
                                    </div>
                                    {simpleValidator.current.message("winner image", formData?.webSiteWinnerPhoto, "required")}
                                    {
                                        formData?.webSiteWinnerPhoto &&
                                        <div className={'close-icon'} onClick={()=> setFormData({...formData,webSiteWinnerPhoto:'',})}>
                                            <CloseSharpIcon/>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className={'game_flex ml_2'}>
                                <div className={'add_winner_details_form'}>
                                    <div className="formData formData_field formData_fieldTab01">
                                        <label>Win Name <span className={'validation-star'}>*</span></label>
                                        <div className="emailWrap">
                                            <input type="text" name='name' placeholder={'Enter Win Name'} value={formData?.name} onChange={(e) => handleChange(e)} />
                                        </div>
                                        {simpleValidator.current.message("name", formData?.name, "required")}
                                    </div>
                                    <div className="formData formData_field formData_fieldTab02">
                                        <label>Win Amount <span className={'validation-star'}>*</span></label>
                                        <div className="emailWrap">
                                            <input type="number" name='winAmount' placeholder={'Enter Win Amount'} value={formData?.winAmount} onWheel={event => event.currentTarget.blur()} onChange={(e) => handleChange(e)} />
                                        </div>
                                        {simpleValidator.current.message("win amount", formData?.winAmount, "required")}
                                    </div>
                                </div>
                                <div className={'add_winner_details_form'}>
                                    <div className="formData formData_field formData_fieldTab01">
                                        <label>City <span className={'validation-star'}>*</span></label>
                                        <div className="emailWrap">
                                            <input type="text" name='city' placeholder={'Enter City'} value={formData?.city} onChange={(e) => handleChange(e)} />
                                        </div>
                                        {simpleValidator.current.message("city", formData?.city, "required")}
                                    </div>
                                    <div className="formData formData_field formData_fieldTab02">
                                        <label>State <span className={'validation-star'}>*</span></label>
                                        <div className="emailWrap">
                                            <input type="text" name='state' placeholder={'Enter State'} value={formData?.state} onChange={(e) => handleChange(e)} />
                                        </div>
                                        {simpleValidator.current.message("state", formData?.state, "required")}
                                    </div>
                                </div>
                                <div className={'Add-sdk-form-sec formData_field'}>
                                    <div className={'Add-sdk-input-sce'}>
                                        <label>Winner Description <span className={'validation-star'}>*</span></label>
                                       
                                        <div className={'game_display_form'}>
                        <div className={'text-editor-details-section'}>
                            <TextEditor handleChange={handleEditor} value={formData?.description} />
                        </div>

                    </div>
                                    </div>
                                    {simpleValidator.current.message("description", formData?.description, "required")}
                                </div>
                                <div className={'d_flex_end mt_1'}>
                                <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                                <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'btn loader_css'} loading={loader} />
                            </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenErrorModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenErrorModal} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Box>
    )
}
export default AddWinnerPopup