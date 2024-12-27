import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import user from '../../../../assets/images/avatar.png';
import { jsonToFormData, profileImages } from "../../../../utils";
import FilledButton from "../../../../Components/FileButton";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { updateUserKYCList } from "../../../../Redux/user/action";
import PopComponent from "../../../../hoc/PopContent";
import CommonModal from "../../../../hoc/CommonModal";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};

const UpdateUserKYCPopup = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState({
        aadharCard: '',
        userKYCAadharCardFrontImage: '',
        userKYCAadharCardBackImage: '',
        panCard: '',
        userKYCPanCard: '',
        isPanCardUpdated: false,
        isAadharCardFrontUpdated: false,
        isAadharCardBackUpdated: false,
        userKYCId: '',
        userName: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        setFormData({
            ...formData,
            aadharCard: modalValue?.aadharCardNumber,
            userKYCAadharCardFrontImage: modalValue?.aadharCardFrontImage,
            userKYCAadharCardBackImage: modalValue?.aadharCardBackImage,
            panCard: modalValue?.panCardNumber,
            userKYCPanCard: modalValue?.panCardImage,
            userName: modalValue?.userName
        })
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                userKYCId: modalValue?._id
            }
            if (!payload?.isAadharCardUpdated) {
                delete payload?.userKYCAadharCard
            }
            if (!payload?.isPanCardUpdated) {
                delete payload?.userKYCPanCard
            }
            setLoader(true)
            dispatch(updateUserKYCList(jsonToFormData(payload))).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    redirectApiHandler()
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


    return (
        <Box sx={style}>
            <div className={'add_admin_user_popup'}>
                <div className={'add_admin_user_popup_title'}>
                    <h2>Update User KYC</h2>
                </div>
                <div className={'add_admin_user_popup_content'}>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className={'user_kyc_section'}>
                            <div className={'user_kyc_section_filed'}>
                                <label>User Name</label>
                                <div className={'user_kyc_section_input_filed'}>
                                    <input type={'text'} placeholder={'Users Name'} name={'userName'} value={formData?.userName} onChange={(e) => setFormData({ ...formData, userName: e.target.value })} />
                                </div>

                            </div>
                            <div className={'documents_fields'}>
                                <div className={'user_kyc_section_filed'}>
                                    <label>Aadhaar Card (UID)</label>
                                    <input type={'text'} name={'aadharCard'} placeholder={'Aadhaar Card (UID)'} value={formData?.aadharCard} onChange={(e) => handleChange(e)} />
                                    {simpleValidator.current.message("aadharCardNumber", formData?.aadharCard, 'required')}
                                </div>
                                <div className={'user_kyc_section_filed_document_flex'}>
                                    <div className={'user_kyc_section_filed_document'}>
                                        <label>Aadhaar Card Front Image </label>
                                        <div className={'document_details_kyc'}>
                                            <div className="u_flex u_align-center">
                                                <div className="u_file-attachment add ">
                                                    {
                                                        formData?.userKYCAadharCardFrontImage ?
                                                            profileImages(formData?.userKYCAadharCardFrontImage, user)
                                                            :
                                                            <svg width="18" height="18" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                                                                <path className="u_fill" d="M23.512 11.503l-9.708 9.523a1.682 1.682 0 00-.524 1.196 1.655 1.655 0 00.503 1.205 1.72 1.72 0 001.228.493 1.743 1.743 0 001.22-.514l9.71-9.52a5.002 5.002 0 001.508-3.572c0-1.34-.542-2.624-1.508-3.571a5.202 5.202 0 00-3.641-1.48 5.202 5.202 0 00-3.642 1.48l-9.71 9.523a8.413 8.413 0 00-1.906 2.731 8.277 8.277 0 00-.041 6.491 8.407 8.407 0 001.87 2.755 8.598 8.598 0 002.81 1.835 8.732 8.732 0 006.619-.042 8.592 8.592 0 002.785-1.87l9.71-9.52 2.427 2.38-9.71 9.523a12.033 12.033 0 01-3.898 2.554 12.221 12.221 0 01-9.197 0 12.035 12.035 0 01-3.898-2.554 11.772 11.772 0 01-2.604-3.823 11.587 11.587 0 010-9.02 11.771 11.771 0 012.604-3.822l9.712-9.521A8.673 8.673 0 0122.268 2c2.25.02 4.403.905 5.994 2.465a8.336 8.336 0 012.513 5.879 8.331 8.331 0 01-2.409 5.92l-9.708 9.526a5.157 5.157 0 01-1.67 1.095 5.238 5.238 0 01-3.943 0 5.159 5.159 0 01-1.67-1.096 5.044 5.044 0 01-1.117-1.639 4.966 4.966 0 010-3.866 5.046 5.046 0 011.117-1.638l9.71-9.523 2.427 2.38z" fill="#4E525F" />
                                                            </svg>
                                                    }
                                                    <div className="u_file-attachment-label">
                                                        <input type="file" title="" name={'userKYCAadharCardFrontImage'} accept=".png, .jpg, .jpeg" id="upload" autoComplete="off" onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                userKYCAadharCardFrontImage: e.target.files[0],
                                                                isAadharCardFrontUpdated: true
                                                            })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {simpleValidator.current.message("AadharCardFrontPhoto", formData?.userKYCAadharCardFrontImage, 'required')}
                                    </div>
                                    <div className={'user_kyc_section_filed_document'}>
                                        <label>Aadhaar Card Back Image </label>
                                        <div className={'document_details_kyc'}>
                                            <div className="u_flex u_align-center">
                                                <div className="u_file-attachment add ">
                                                    {
                                                        formData?.userKYCAadharCardBackImage ?
                                                            profileImages(formData?.userKYCAadharCardBackImage, user)
                                                            :
                                                            <svg width="18" height="18" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                                                                <path className="u_fill" d="M23.512 11.503l-9.708 9.523a1.682 1.682 0 00-.524 1.196 1.655 1.655 0 00.503 1.205 1.72 1.72 0 001.228.493 1.743 1.743 0 001.22-.514l9.71-9.52a5.002 5.002 0 001.508-3.572c0-1.34-.542-2.624-1.508-3.571a5.202 5.202 0 00-3.641-1.48 5.202 5.202 0 00-3.642 1.48l-9.71 9.523a8.413 8.413 0 00-1.906 2.731 8.277 8.277 0 00-.041 6.491 8.407 8.407 0 001.87 2.755 8.598 8.598 0 002.81 1.835 8.732 8.732 0 006.619-.042 8.592 8.592 0 002.785-1.87l9.71-9.52 2.427 2.38-9.71 9.523a12.033 12.033 0 01-3.898 2.554 12.221 12.221 0 01-9.197 0 12.035 12.035 0 01-3.898-2.554 11.772 11.772 0 01-2.604-3.823 11.587 11.587 0 010-9.02 11.771 11.771 0 012.604-3.822l9.712-9.521A8.673 8.673 0 0122.268 2c2.25.02 4.403.905 5.994 2.465a8.336 8.336 0 012.513 5.879 8.331 8.331 0 01-2.409 5.92l-9.708 9.526a5.157 5.157 0 01-1.67 1.095 5.238 5.238 0 01-3.943 0 5.159 5.159 0 01-1.67-1.096 5.044 5.044 0 01-1.117-1.639 4.966 4.966 0 010-3.866 5.046 5.046 0 011.117-1.638l9.71-9.523 2.427 2.38z" fill="#4E525F" />
                                                            </svg>
                                                    }
                                                    <div className="u_file-attachment-label">
                                                        <input type="file" title="" name={'userKYCAadharCardBackImage'} accept=".png, .jpg, .jpeg" id="upload" autoComplete="off" onChange={(e) => setFormData({
                                                            ...formData,
                                                            userKYCAadharCardBackImage: e.target.files[0],
                                                            isAadharCardBackUpdated: true
                                                        })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {simpleValidator.current.message("AadharCardBackPhoto", formData?.userKYCAadharCardBackImage, 'required')}
                                    </div>
                                </div>

                            </div>
                            <div className={'documents_fields'}>
                                <div className={'user_kyc_section_filed'}>
                                    <label>PAN Card</label>
                                    <input type={'text'} placeholder={'PAN Card'} name={'panCard'} value={formData?.panCard} onChange={(e) => handleChange(e)} />
                                    {simpleValidator.current.message("panCardNumber", formData?.panCard, 'required')}
                                </div>
                                <div className={'user_kyc_section_filed_document'}>
                                    <label>PAN Card Attachment </label>
                                    <div className={'document_details_kyc'}>
                                        <div className="u_flex u_align-center">
                                            <div className="u_file-attachment add ">
                                                {
                                                    formData?.userKYCPanCard ?
                                                        profileImages(formData?.userKYCPanCard, user)
                                                        :
                                                        <svg width="18" height="18" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                                                            <path className="u_fill" d="M23.512 11.503l-9.708 9.523a1.682 1.682 0 00-.524 1.196 1.655 1.655 0 00.503 1.205 1.72 1.72 0 001.228.493 1.743 1.743 0 001.22-.514l9.71-9.52a5.002 5.002 0 001.508-3.572c0-1.34-.542-2.624-1.508-3.571a5.202 5.202 0 00-3.641-1.48 5.202 5.202 0 00-3.642 1.48l-9.71 9.523a8.413 8.413 0 00-1.906 2.731 8.277 8.277 0 00-.041 6.491 8.407 8.407 0 001.87 2.755 8.598 8.598 0 002.81 1.835 8.732 8.732 0 006.619-.042 8.592 8.592 0 002.785-1.87l9.71-9.52 2.427 2.38-9.71 9.523a12.033 12.033 0 01-3.898 2.554 12.221 12.221 0 01-9.197 0 12.035 12.035 0 01-3.898-2.554 11.772 11.772 0 01-2.604-3.823 11.587 11.587 0 010-9.02 11.771 11.771 0 012.604-3.822l9.712-9.521A8.673 8.673 0 0122.268 2c2.25.02 4.403.905 5.994 2.465a8.336 8.336 0 012.513 5.879 8.331 8.331 0 01-2.409 5.92l-9.708 9.526a5.157 5.157 0 01-1.67 1.095 5.238 5.238 0 01-3.943 0 5.159 5.159 0 01-1.67-1.096 5.044 5.044 0 01-1.117-1.639 4.966 4.966 0 010-3.866 5.046 5.046 0 011.117-1.638l9.71-9.523 2.427 2.38z" fill="#4E525F" />
                                                        </svg>
                                                }
                                                <div className="u_file-attachment-label">
                                                    <input type="file" title="" name={'userKYCPanCard'} accept=".png, .jpg, .jpeg" id="upload" autoComplete="off" onChange={(e) => setFormData({
                                                        ...formData,
                                                        [e.target.name]: e.target.files[0],
                                                        isPanCardUpdated: true
                                                    })} />
                                                </div>

                                            </div>
                                            {simpleValidator.current.message("PanCardPhoto", formData?.userKYCPanCard, 'required')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'formData_btn'}>
                            <button className={'cancel_btn'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                            <FilledButton type={'submit'} value={'Update'} className={'submit_btn loader_css'} loading={loader} />
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
export default UpdateUserKYCPopup