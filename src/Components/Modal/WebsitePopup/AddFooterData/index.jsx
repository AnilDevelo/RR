import React, { useCallback, useEffect, useRef, useState } from "react";
import FilledButton from "../../../FileButton";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { createWebSiteFooterTitle, updateWebSiteFooterTitle } from "../../../../Redux/website/action";

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
const AddFooterData = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState({ title: '', link: '' });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            setLoader(true)
            dispatch(createWebSiteFooterTitle(formData)).then(res => {
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
            setFormData({
                ...formData,
                title: modalValue?.row?.title,
                link: modalValue?.row?.link
            })
        }
    }, [modalValue]);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            setLoader(true)
            let payload = {
                ...formData,
                footerId: modalValue?.row?._id
            }
            dispatch(updateWebSiteFooterTitle(payload)).then(res => {
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
    };

    return (
        <Box sx={style}>
            <div className={'add_admin_user_popup'}>
                <div className={'add_admin_user_popup_title'}>
                    <h2>{modalValue?.isEdit ? "Update Footer" : ' Add Footer'}</h2>
                </div>
                <div className={'add_admin_user_popup_content'}>
                    <form onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className={'user_kyc_section'}>
                            <div className={'user_kyc_section_filed'}>
                                <label>Title <span className={'validation-star'}>*</span></label>
                                <div className={'user_kyc_section_input_filed'}>
                                    <input type={'text'} value={formData?.title} placeholder={'Enter Title'} name={'title'} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                                </div>
                                {simpleValidator.current.message("title", formData?.title, 'required')}
                            </div>
                        </div>
                        <div className={'user_kyc_section'}>
                            <div className={'user_kyc_section_filed'}>
                                <label>Link <span className={'validation-star'}>*</span></label>
                                <div className={'user_kyc_section_input_filed'}>
                                    <input type={'text'} value={formData?.link} placeholder={'Enter Footer Link'} name={'link'} onChange={(e) => setFormData({ ...formData, link: e.target.value })} />
                                </div>
                                {simpleValidator.current.message("title", formData?.link, 'required')}
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
export default AddFooterData