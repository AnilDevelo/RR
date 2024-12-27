import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import FilledButton from "../../../FileButton";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { webSiteWinnerTitle } from "../../../../Redux/website/action";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 486,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};
const AddWinnerTitlePopup = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState({ title: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            setLoader(true)
            dispatch(webSiteWinnerTitle(formData)).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    redirectApiHandler()
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                } else {
                    setLoader(false)
                    handleOpenModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                }
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }

    useEffect(() => {
        if (modalValue?.isEdit) {
            setFormData({ ...formData, title: modalValue?.row?.title })
        }
    }, [modalValue]);



    return (
        <Box sx={style}>
            <div className={'add_admin_user_popup'}>
                <div className={'add_admin_user_popup_title'}>
                    <h2>{modalValue?.isEdit ? "Update Winner Title" : ' Add Winner Title'}</h2>
                </div>
                <div className={'add_admin_user_popup_content'}>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className={'user_kyc_section'}>
                            <div className={'user_kyc_section_filed'}>
                                <label>Title <span className={'validation-star'}>*</span></label>
                                <div className={'user_kyc_section_input_filed'}>
                                    <input type={'text'} placeholder={'Enter Title'} value={formData?.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                                </div>
                                {simpleValidator.current.message("title", formData?.title, 'required')}
                            </div>
                        </div>
                        <div className={'d_flex_end mt_1'}>
                                <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                                <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'btn loader_css'} loading={loader} />
                            </div>
                    </form>
                </div>
            </div>
        </Box>
    )
}
export default AddWinnerTitlePopup