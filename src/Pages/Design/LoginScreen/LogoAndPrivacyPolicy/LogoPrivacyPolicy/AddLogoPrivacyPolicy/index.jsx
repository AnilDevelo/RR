import FilledButton from "../../../../../../Components/FileButton";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import Box from "@material-ui/core/Box";
import {AddLoginScreenPrivacyPolicy} from "../../../../../../Redux/Design/action";
import TextEditor from "../../../../../Master/Document/TextEditor";
import SimpleReactValidator from "simple-react-validator";


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

const AddLogoPrivacyPolicy = ({modalValue, handleOpenModal, redirectApiHandler}) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData,setFormData] = useState({privacyPolicy:''})
    const simpleValidator = useRef(new SimpleReactValidator());

    const handleSubmit = (e) => {
        e.preventDefault();

        let payload = {
            ...formData,
            isImageUpdated: false,
            privacyPolicy:formData?.privacyPolicy
        }
        if (simpleValidator.current.allValid()) {
            setLoader(true)
            dispatch(AddLoginScreenPrivacyPolicy(payload)).then((res) => {
                if (res.data.success) {
                    setLoader(false)
                    redirectApiHandler();
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                } else {
                    handleOpenModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg });
                }
            })
        }else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }

    useEffect(() => {
        if(modalValue?.isEdit){
            setFormData({
                ...formData,
                privacyPolicy: modalValue?.row?.PrivacyPolicy
            })
        }
    },[modalValue?.isEdit]);


    // const checkRchEmpty = (html = formData?.termsAndCondition) => {
    //     let div = document.createElement('div');
    //     div.innerHTML = html;
    //     let isImage = div?.getElementsByTagName?.('img')?.length > 0;
    //     if (isImage) {
    //         return false;
    //     }
    //     return (div.innerText.replaceAll('\n', '').trim() === '' || div.innerText.replaceAll('\n', '').trim() === 'undefined');
    // };
    const handleEditor = (props)=>{
        setFormData({
            ...formData,
            privacyPolicy: props
        })
    };

    return(
        <Box sx={style} className={'how_to_play_section_details  video-tickets-section'}>
            <div className={'game_details_view add_admin_user_popup modal_main_popup'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Privacy Policy' : 'Add Privacy Policy'}</h2>
                </div>
            </div>
            <div className={'add_game_details_sec add_admin_user_popup_content mt_2'}>
                <form onSubmit={ (e) => handleSubmit(e)} method="post"
                      encType="multipart/form-data">
                    <div className={'game_display_form'}>
                        <div className={'text-editor-details-section'}>
                            <TextEditor handleChange={handleEditor} value={formData?.privacyPolicy} />
                        </div>

                    </div>
                        <div className={'formData_btn form_common_btn d_flex_end add_game_btn_Top mt_2'}>
                            <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                            <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'btn loader_css'} loading={loader} />
                        </div>
                </form>
            </div>
        </Box>
    )
}
export default AddLogoPrivacyPolicy