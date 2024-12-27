import {useDispatch} from "react-redux";
import React, {useCallback, useEffect, useRef, useState} from "react";
import SimpleReactValidator from "simple-react-validator";
import Box from "@material-ui/core/Box";
import TextEditor from "../../../../Master/Document/TextEditor";
import FilledButton from "../../../../../Components/FileButton";
import {jsonToFormData, profileImages} from "../../../../../utils";
import user from "../../../../../assets/images/avatar.png";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import CommonModal from "../../../../../hoc/CommonModal";
import PopComponent from "../../../../../hoc/PopContent";
import {createUserDeleteAccountRules} from "../../../../../Redux/Documentation/action";
import {addReferAndEarnShareList, updateReferAndEarnShare} from "../../../../../Redux/Bonus/action";


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

const AddReferAndEarnShareConfig = ({modalValue, handleOpenModal, redirectApiHandler}) => {
    const dispatch = useDispatch();
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [loader, setLoader] = React.useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [description, setDescription] = useState('')
    const [formData, setFormData] = useState({
        referAndEarnShareImage: '',
        isImageUpdated:false,
        referLink:''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            setLoader(true)
            let payload = {
                ...formData,
                description: description.trim(),
                referLink:formData.referLink.trim(),
            }
            dispatch(addReferAndEarnShareList(jsonToFormData(payload))).then((res) => {
                if (res.data.success) {
                    redirectApiHandler();
                    setLoader(false)
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                } else {
                    setLoader(false)
                    handleOpenErrorModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg });
                }
            })
        }else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }


    const handleEditor = (props)=>{
        setDescription(props)
    };

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

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            setLoader(true)
            let payload = {
                ...formData,
                description: description.trim(),
                referLink:formData.referLink.trim(),
            }
            if(!payload?.isImageUpdated){
                delete  payload?.referAndEarnShareImage
            }
            dispatch(updateReferAndEarnShare(jsonToFormData(payload))).then((res) => {
                if (res.data.success) {
                    redirectApiHandler();
                    setLoader(false)
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                } else {
                    setLoader(false)
                    handleOpenErrorModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg });
                }
            })
        }else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };

    useEffect(()=>{
        if(modalValue?.isEdit){
            setFormData({
                ...formData,
                referAndEarnShareImage: modalValue?.row?.referAndEarnShareImage,
                referLink:modalValue?.row?.referLink
            })
            setDescription(modalValue?.row?.description)
        }
    },[modalValue?.isEdit])


    return(
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup game-mode-config-design lobby_section_details transaction_id_section'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Refer & Earn Share Config' : 'Add Refer & Earn Share Config'}</h2>
                </div>
                <div className={'header_slider_details header_slider_details_Ads'}>
                    <form className='form_group ' onSubmit={modalValue?.isEdit ?   (e) => handleEditSubmit(e) :  (e) => handleSubmit(e)}>

                        {/*--------------------------------------- Game Logo [Start] ----------------------------------------- */}
                        <div className='user_profile profile-image-dropdown ads_internal'>
                            <label htmlFor='' className='profile_label'>Refer & Earn Share Image <span className={'validation-star'}>*</span></label>
                            <div className={'header_section_slider'}>
                                <div className='user_profile_pic'>
                                    {profileImages(formData?.referAndEarnShareImage, user)}
                                    <span className='add_new'>
                                        <input type='file' title="" name='gameModeDesignImage' id='' onChange={(e) => {
                                            if(e.target.files[0]?.type?.includes('image/') &&  e.target.files[0].type !== 'image/gif'){
                                                setFormData({...formData,referAndEarnShareImage:e.target.files[0], isImageUpdated:true })
                                            }else {
                                                handleOpenErrorModal('CommonPop', { header: "Error", body: 'Please add only image file' });
                                            }
                                        }} /> </span>
                                </div>
                            </div>
                            {simpleValidator.current.message("Refer & Earn Share Image", formData?.referAndEarnShareImage, "required")}
                            {
                                formData?.referAndEarnShareImage &&
                                <div className={'close-icon'} onClick={()=> setFormData({...formData,referAndEarnShareImage:'',})}>
                                    <CloseSharpIcon/>
                                </div>
                            }
                        </div>
                        {/*--------------------------------------- Game Logo [End] ----------------------------------------- */}

                        {/*<div className={'user_kyc_section'}>*/}
                        {/*    <div className={'text-editor-details-section'}>*/}
                        {/*        <label className={'fontFamily'}>Description</label>*/}
                        {/*        <div className={'mt_margin'}>*/}
                        {/*            <TextEditor handleChange={handleEditor} value={description}/>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="formData">
                            <label>Description <span className={'validation-star'}>*</span></label>
                            <div className="emailWrap text_Wrap refer_earn_share_config input_length_counter">
                                <textarea rows={4}
                                          value={description}
                                          placeholder={'Enter Description'}
                                          onChange={(e) => setDescription(e.target.value)}
                                />
                                {/*<input type="text" value={description} className={'wrap_input_modal'}  name='description' placeholder={'Enter Refer Link'} onChange={(e) => setDescription(e.target.value)} />*/}
                            </div>
                                {simpleValidator.current.message("description", description, 'required')}
                        </div>
                        <div className="formData">
                            <label>Refer Link<span className={'validation-star'}>*</span></label>
                            <div className="emailWrap input_length_counter">
                                <input type="text" value={formData?.referLink} className={'wrap_input_modal'}  name='gameName' placeholder={'Enter Refer Link'} onChange={(e) => setFormData({
                                    ...formData,
                                    referLink : e.target.value
                                })} />
                            </div>
                            {simpleValidator.current.message("referLink", formData?.referLink, 'required')}
                        </div>
                        <div className={'formData_btn'}>
                            <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                            <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'btn loader_css'} loading={loader} />
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
export default AddReferAndEarnShareConfig