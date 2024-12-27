import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import {useDispatch} from "react-redux";
import React, {useCallback, useEffect, useRef, useState} from "react";
import PopComponent from "../../../hoc/PopContent";
import SimpleReactValidator from "simple-react-validator";
import Box from "@material-ui/core/Box";
import {jsonToFormData, profileImages} from "../../../utils";
import FilledButton from "../../../Components/FileButton";
import CommonModal from "../../../hoc/CommonModal";
import icon_plus from "../../../assets/images/plus.svg";
import user from "../../../assets/images/avatar.png";
import {addCompanyLogoList} from "../../../Redux/CompanyLogo/action";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 650,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};

const AddCompanyLogo = ({modalValue, handleOpenModal, redirectApiHandler,}) => {
    const dispatch = useDispatch();
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const [loader, setLoader] = useState(false);
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({modalValue: "", modalName: "", modalIsOpen: false,});
    let Modal = PopComponent[modalDetails.modalName];
    const [formData, setFormData] = useState({
        companyLogo: "",
        isImageUpdated: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                companyIcon: formData?.companyLogo,
                // isImageUpdated: formData?.isImageUpdated,
            };
            // if (!payload.isImageUpdated) {
            //     delete payload.companyLogo;
            // }
            setLoader(true);
            dispatch(addCompanyLogoList(jsonToFormData(payload))).then(
                (res) => {
                    if (res.data.success) {
                        setLoader(false);
                        redirectApiHandler();
                        handleOpenModal("CommonPop", {header: "Success", body: res.data.message,});
                    } else {
                        setLoader(false);

                        handleOpenModal("CommonPop", {header: "Info", body: res.data.message || res.data.msg,});
                    }
                }
            );
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };

    const handleOpenErrorModal = (type, data) => {
        switch (type) {
            case "CommonPop": {
                setModalDetails({...modalDetails, modalValue: data, modalName: type, modalIsOpen: true,});
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };

    useEffect(() => {
        if (modalValue?.isEdit) {
            setFormData({
                ...formData,
                companyLogo: modalValue?.row?.companyIcon
            })
        }
    }, [modalValue]);

    const handleImageChange = (e) => {

        if(e.target.files[0]?.type?.includes('image/') && !e.target.files[0]?.type?.includes('image/gif')){
            setFormData({...formData, companyLogo: e.target.files[0], isImageUpdated: true,})
        }else {
            setFormData({...formData, companyLogo: '', isImageUpdated: false})
            handleOpenErrorModal('CommonPop', { header: "Error", body: 'Please add only image file' });
        }
    }



    return (
        <Box sx={style} className={"how_to_play_section_details video-tickets-section company_logo"}>
            <div className={"game_details_view modal_main_popup add_admin_user_popup"}>
                <div className={"modal_popup_title"}>
                    {modalValue?.isEdit ? (<h2>Edit Company Logo</h2>) : (<h2>Add Company Logo</h2>)}
                </div>
            </div>
            <div className={"add_game_details_sec add_admin_user_popup_content"}>
                <form onSubmit={(e) => handleSubmit(e)} method="post" encType="multipart/form-data">
                    <div className={"game_display_form"}>
                        <div className="form_group profile new_game_section profile-image-dropdown">
                            <div className="user_profile">
                                <div className="user_profile_pic">
                                    {profileImages(formData?.companyLogo, user)}
                                    {!formData?.companyLogo && (
                                        <span className="addnew">
                                        <img src={icon_plus} alt="" />
                                        <input type="file" accept=".jpg, .jpeg, .png" name="labelIcon" id="" onChange={(e) => handleImageChange(e)}/>
                                      </span>
                                    )}
                                </div>
                            </div>
                            {simpleValidator.current.message("companyLogo", formData?.companyLogo, "required")}
                            {formData?.companyLogo && (
                                <div className={"close-icon"} onClick={() => setFormData({ ...formData, companyLogo: "",  })}>
                                    <CloseSharpIcon />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={"formData_btn  d_flex_end mt_2 form_common_btn add_game_btn_Top"}>
                        <button className={"btn_default"} type={"reset"} onClick={() => handleOpenModal()}>Cancel</button>
                        {
                            (  !formData?.isImageUpdated && formData?.companyLogo) ?
                                <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'}
                                              className={' disabled_btn_game_Splash  loader_css'} loading={loader} disabled={true} />
                                :
                                <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'}
                                              className={'btn loader_css'} loading={loader} />
                        }
                        {/*<FilledButton type={"submit"} value={modalValue?.isEdit ? "Update" : "Save"} className={"btn loader_css"} loading={loader}/>*/}
                    </div>
                </form>
            </div>
            <CommonModal className={"Approved-reject-section"} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenErrorModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenErrorModal} modalIsOpen={modalDetails.modalIsOpen}/>
            </CommonModal>
        </Box>
    );
}
export default AddCompanyLogo