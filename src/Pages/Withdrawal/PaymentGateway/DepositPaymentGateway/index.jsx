import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import PopComponent from "../../../../hoc/PopContent";
import CommonModal from "../../../../hoc/CommonModal";
import TableCell from "@mui/material/TableCell";
import {ActionFunction, hideActionFunc} from "../../../../utils";
import CustomTable from "../../../../hoc/CommonTable";
import Loader from "../../../../images/Loader";

const DepositPaymentGateway = ({getPaymentGatewayDetails, rowData,loader}) => {
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    let Modal = PopComponent[modalDetails.modalName];

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddPaymentGateWay': {
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
            label: 'Deposit Payment Gateway',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'table_icon'}>
                    {row?.depositPaymentGateway === 'PhonePay' ? 'PhonePe' : row?.depositPaymentGateway}
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
                    <span className='edit_btn edit-btn-action' onClick={(e) => handleOpenModal('AddPaymentGateWay', { isEdit: true, row })}>Edit</span>
                </TableCell>
            }
        })

    ];


    return(
        <Box className={'monthly-bonus-amount'}>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'d_flex_between'}>
                    <h2>Deposit Payment Gateway</h2>
                    {
                        (hideActionFunc('master') && rowData?.list?.length === 0) &&
                        <div className={'d_flex_end'}>
                            <button className={'btn'} onClick={(e) => handleOpenModal('AddPaymentGateWay')}> + Add Payment Gateway</button>
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
                    loading={loader}
                />
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getPaymentGatewayDetails}/>
            </CommonModal>
        </Box>
    )
}
export default DepositPaymentGateway