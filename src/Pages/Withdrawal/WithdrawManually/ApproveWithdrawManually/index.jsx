import React, {useCallback, useRef, useState} from "react";
import {Box} from "@mui/material";
import {jsonToFormData, profileImages} from "../../../../utils";
import user from "../../../../assets/images/avatar.png";
import icon_plus from "../../../../assets/images/plus.svg";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import FilledButton from "../../../../Components/FileButton";
import CommonModal from "../../../../hoc/CommonModal";
import {useDispatch} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../hoc/PopContent";
import {createAvatarData} from "../../../../Redux/Avatar/action";
import Typography from "@mui/material/Typography";
import {ApproveWithdrawalManuallyRequest} from "../../../../Redux/Master/action";

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

const  ApproveWithdrawManually = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData, setFormData] = useState({ transactionId: '', withdrawWinCashImage: '',adminUpiId:''});

    const changeHandler = (e) => {
        const { value, name } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                transactionId: formData?.transactionId,
                adminUpiId: formData?.adminUpiId,
                withdrawWinCashImage: formData?.withdrawWinCashImage,
                withdrawalRequestId:modalValue?._id,
                isApproved:true
            }
            setLoader(true)
            dispatch(ApproveWithdrawalManuallyRequest(jsonToFormData(payload))).then((res) => {
                if (res.data.statusCode === 200 && res.data.success) {
                    setLoader(false);
                    redirectApiHandler()
                    handleOpenModal('CommonPop', { header: "Success", body: res.data.message })
                } else {
                    setLoader(false)
                    handleOpenModal('CommonPop', { header: "Error", body: res.data.message || res?.data?.msg })
                }
            });
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };

    const handleIconChange = (e) => {
        if(e.target.files[0]?.type?.includes('image/') &&  e.target.files[0].type !== 'image/gif'){
            setFormData({ ...formData, withdrawWinCashImage: e.target.files[0]})
        }else {
            handleOpenErrorModal('CommonPop', { header: "Error", body: 'Please add only image file' });
        }
    }
    return(
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup add_avatar_section lobby_section_details'}>
                <div className={'modal_popup_title'}>
                    <h2> Do you want to approve the Withdraw Manually ?</h2>
                </div>
                <div className={'add_admin_user_popup_content mt_15'}>
                    <form onSubmit={ (e) => handleSubmit(e)}>
                        <div className={'level_popup_form_field '}>
                            <div className='form_group profile new_game_section profile-image-dropdown'>
                                <div className='user_profile'>
                                    <div className='user_profile_pic'>
                                        {profileImages(formData?.withdrawWinCashImage, user)}
                                        {
                                            !formData?.withdrawWinCashImage &&
                                            <span className='addnew'>
                                            <img src={icon_plus} alt='' />
                                            <input type='file' title="" name='labelIcon' id='' onChange={(e) => handleIconChange(e)} />
                                        </span>
                                        }

                                    </div>
                                    <label htmlFor='' className='profile_label'>Withdraw Image <span className={'validation-star'}>*</span></label>
                                </div>
                                {simpleValidator.current.message("WithdrawImage", formData?.withdrawWinCashImage, 'required')}
                                {
                                    formData?.withdrawWinCashImage &&
                                    <div className={'close-icon'} onClick={()=> setFormData({...formData,withdrawWinCashImage:'',})}>
                                        <CloseSharpIcon/>
                                    </div>
                                }
                            </div>
                            <div className={'level_popup_form_field_left'}>
                                <div className={'user_kyc_section'}>
                                    <div className={'user_kyc_section_filed'}>
                                        <label>Transaction Id <span className={'validation-star'}>*</span></label>
                                        <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                            <input type={'text'} placeholder={'Enter Name'} maxLength={50} value={formData?.transactionId} name={'transactionId'} onChange={(e) => changeHandler(e)} />
                                            <span>{formData?.transactionId?.length}/50</span>
                                        </div>
                                        {simpleValidator.current.message("transactionId", formData?.transactionId, 'required')}
                                    </div>
                                </div>
                                <div className={'user_kyc_section'}>
                                    <div className={'user_kyc_section_filed'}>
                                        <label>Admin UPI Id <span className={'validation-star'}>*</span></label>
                                        <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                            <input type={'text'} placeholder={'Enter Name'} maxLength={50} value={formData?.adminUpiId} name={'adminUpiId'} onChange={(e) => changeHandler(e)} />
                                            <span>{formData?.adminUpiId?.length}/50</span>
                                        </div>
                                        {simpleValidator.current.message("adminUpiId", formData?.adminUpiId, 'required')}
                                    </div>
                                </div>
                            </div>
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
export default ApproveWithdrawManually;