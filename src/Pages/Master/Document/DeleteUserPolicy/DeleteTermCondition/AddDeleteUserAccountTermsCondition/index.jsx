import FilledButton from "../../../../../../Components/FileButton";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {
    createUserDeleteAccountRules,
} from "../../../../../../Redux/Documentation/action";
import SimpleReactValidator from "simple-react-validator";
import {useDispatch} from "react-redux";
import Box from "@material-ui/core/Box";
import TextEditor from "../../../TextEditor";



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

const AddDeleteUserAccountTermsCondition = ({modalValue, handleOpenModal, redirectApiHandler}) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = React.useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState({
        termsAndCondition:''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            setLoader(true)
            dispatch(createUserDeleteAccountRules(formData)).then((res) => {
                if (res.data.success) {
                    redirectApiHandler();
                    setLoader(false)
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

    useEffect(()=>{
        if(modalValue?.isEdit){
            setFormData({
                ...formData,
                termsAndCondition: modalValue?.row?.termsAndCondition
            })
        }
    },[modalValue?.isEdit]);

    const handleEditor = (props)=>{
        setFormData({
            ...formData,
            termsAndCondition: props
        })
    };

    return(
        <Box sx={style} className={'how_to_play_section_details  video-tickets-section'}>
            <div className={'game_details_view add_admin_user_popup modal_main_popup'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Terms & Conditions Policy' : 'Add Terms & Conditions Policy'}</h2>
                </div>
            </div>
        <div className={'add_game_details_sec add_admin_user_popup_content mt_2'}>
            <form onSubmit={ (e) => handleSubmit(e)} method="post"
                  encType="multipart/form-data">
                <div className={'game_display_form'}>
                    <div className={'text-editor-details-section'}>
                        <label className={'fontFamily'}>Description</label>
                        <div className={'mt_margin'}>
                            <TextEditor handleChange={handleEditor} value={formData?.termsAndCondition}/>
                        </div>
                    </div>

                    <div className={'formData_btn form_common_btn d_flex_end add_game_btn_Top mt_2'}>
                        <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                        <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'btn loader_css'} loading={loader} />
                    </div>
                </div>
            </form>
        </div>
        </Box>
    )
}
export default AddDeleteUserAccountTermsCondition