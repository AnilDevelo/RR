import {Box} from "@mui/material";
import React, {useState} from "react";
import {profileImages} from "../../../../utils";
import user from "../../../../assets/images/avatar.png";
import icon_plus from "../../../../assets/images/plus.svg";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import CommonModal from "../../../../hoc/CommonModal";
import PopComponent from "../../../../hoc/PopContent";

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

const ViewWithdrawApproveDetails = ({modalValue,handleOpenModal}) => {
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const handleOpenModalView = (type, data) => {
        switch (type) {
            case 'DocumentOpenPopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };
    return(
        <Box sx={style} className={'user_popup_section h2h_details_view_popup withdrawal_details_view'}>
            <p className={'custom_close_btn'} onClick={()=>handleOpenModal()}>
                <svg viewBox="0 0 24 24" x="1008" y="432" fit="" height="28" width="25"
                     preserveAspectRatio="xMidYMid meet" focusable="false">
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                        fill="#64748b" />
                </svg>
            </p>
            <div className={'create_headToHead_modal modal_main_popup create_headToHead_modal_view add_admin_user_popup'}>
                <div className={'add_admin_user_popup_title modal_popup_title'}>
                    <h2>Transaction Details</h2>
                </div>
               <div className={'withdrawal_approved_details_popup d_flex'}>
                   <div className='form_group profile new_game_section profile-image-dropdown user_profile_pic_image_withdrawal'>
                       <div className='user_profile' >
                           <div className='user_profile_pic '>
                               {profileImages(modalValue?.withdrawWinCashImage, user)}
                           </div>
                       </div>
                       <div className={'role_field_id'}>
                           <span className={'edit_btn edit-btn-action'} onClick={()=>handleOpenModalView('DocumentOpenPopup', {front: modalValue?.withdrawWinCashImage, back: ''})}>View Image</span>
                       </div>

                   </div>
                   <div className={'headToHead_popup_details'}>
                       <div className={'formData'}>
                           <label>Transaction Id :</label>
                           <div className={'information_value'}>
                               {modalValue?.transactionId || '-'}
                           </div>
                       </div>
                       <div className={'formData'}>
                           <label>Admin UPI Id :</label>
                           <div className={'information_value'}>
                               {modalValue?.adminUpiId || '-'}
                           </div>
                       </div>
                   </div>
               </div>
            </div>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModalView}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModalView} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={''} />
            </CommonModal>
        </Box>
    )
}
export default ViewWithdrawApproveDetails