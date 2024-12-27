import React, {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import Box from "@mui/material/Box";
import {useDispatch} from "react-redux";
import PopComponent from "../../../../hoc/PopContent";
import CommonModal from "../../../../hoc/CommonModal";
import {ActionFunction, hideActionFunc} from "../../../../utils";
import TableCell from "@mui/material/TableCell";
import {getPaymentGatewaySettings} from "../../../../Redux/Master/action";
import TableLoader from "hoc/CommonTable/TableLoader";

const WithdrawalPaymentGateway = ({getPaymentGatewayDetails, rowData}) => {

    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    let Modal = PopComponent[modalDetails.modalName];

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddWithdrawalPaymentGateway': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };

    const columns = [
        {
            id: '',
            label: 'Withdrawal Payment Gateway',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'table_icon'}>
                    {row?.withdrawalPaymentGateway}
                </TableCell>
            }
        },
        ActionFunction('master', {
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action' onClick={(e) => handleOpenModal('AddWithdrawalPaymentGateway', { isEdit: true, row })}>Edit</span>
                </TableCell>
            }
        })

    ];

    return(
        <Box className={'monthly-bonus-amount'}>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'d_flex_between'}>
                    <h2>Withdrawal Payment Gateway</h2>
                    {
                        (hideActionFunc('master') && rowData?.list?.length === 0) &&
                        <div className={'d_flex_end'}>
                            <button className={'btn'} onClick={(e) => handleOpenModal('AddWithdrawalPaymentGateway')}> + Add Payment Gateway</button>
                        </div>
                    }
                </div>


                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list}
                    totalDocs={0}
                    pagination={pagination}
                    setPagination={setPagination}
                    isWinnerTitle={true}
                />
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getPaymentGatewayDetails}/>
            </CommonModal>
        </Box>
    )
}
export default WithdrawalPaymentGateway