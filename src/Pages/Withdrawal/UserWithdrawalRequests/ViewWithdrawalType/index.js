import React from "react";
import {Box} from "@mui/material";
import {currencyFormat} from "../../../../utils";

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

const ViewWithdrawalType = ({modalValue}) => {

    return(
        <Box sx={style} className={'user_popup_section h2h_details_view_popup withdrawal_details_view'}>
            <div className={'create_headToHead_modal modal_main_popup create_headToHead_modal_view add_admin_user_popup'}>
                <div className={'add_admin_user_popup_title modal_popup_title'}>
                <h2>{modalValue?.withdrawManuallyType === 'IMPS' ? 'Bank' : 'UPI'} Details</h2>
                </div>
                {
                    modalValue?.withdrawManuallyType === 'IMPS' ?
                        <div className={'headToHead_popup_details'}>
                            <div className={'formData'}>
                                <label>Bank Name :</label>
                                <div className={'information_value'}>
                                    {modalValue?.IMPSObject?.bank?.bankName || '-'}
                                </div>
                            </div>
                            <div className={'formData'}>
                                <label>Account Holder Name :</label>
                                <div className={'information_value'}>
                                    {modalValue?.IMPSObject?.accountHolderName || '-'}
                                </div>
                            </div>
                            <div className={'formData'}>
                                <label>Account Number :</label>
                                <div className={'information_value'}>
                                    {modalValue?.IMPSObject?.accountNumber || '-'}
                                </div>
                            </div>
                            <div className={'formData'}>
                                <label>IFSC Code :</label>
                                <div className={'information_value'}>
                                    {modalValue?.IMPSObject?.IFSCCode || '-'}
                                </div>
                            </div>
                        </div>
                        :    <div className={'headToHead_popup_details'}>
                            <div className={'formData'}>
                                <label>UPI Id :</label>
                                <div className={'information_value'}>
                                    {modalValue?.withdrawalUpiId}
                                </div>
                            </div>
                        </div>
                }

            </div>

        </Box>
    )
}
export default ViewWithdrawalType