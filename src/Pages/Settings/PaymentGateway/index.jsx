import React, {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import TableCell from "@mui/material/TableCell";
import {ActionFunction, hideActionFunc} from "../../../utils";
import CommonModal from "../../../hoc/CommonModal";
import PopComponent from "../../../hoc/PopContent";
import {useDispatch} from "react-redux";
import Loader from "../../../images/Loader";
import { getPaymentGateway } from "Redux/settings/action";

const PaymentGateway = () => {
    const dispatch = useDispatch();
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 })
    let Modal = PopComponent[modalDetails.modalName];

    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const columns = [
        {
            id: 'paymentGatewayType',
            label: 'Payment Gateway',
            type: 'custom',
            render: (row) => {
               return <TableCell>{row?.paymentGatewayType}</TableCell>
            }
        },
        ActionFunction('bonus', {
            id: 'Action',
            label: 'Action',
            type: 'custom',
            isDisbanding: true,
            render: (row) => {
                return <TableCell >
                    <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('AddPaymentGateway', { isEdit: true, row })}>Edit</span>
                </TableCell>
            }
        })
    ];

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddPaymentGateway' : {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };

    useEffect(() => {
        getPaymentGatewayDetails()
    }, [pagination.rowsPerPage, pagination.page]);

    const getPaymentGatewayDetails = () => {
        dispatch(getPaymentGateway({})).then(res => {
            if (res.data.success) {
                setRowData({
                    ...rowData,
                    list: Object?.keys(res.data.data?.getPaymentGateway)?.length ? [res.data.data?.getPaymentGateway] : [],
                });
            }
        })
    }

    return(
        <>

        <Paper sx={{ mb: 0 }} className="outer-box monthly-bonus-amount">
            <div className={'d_flex_between'}>
                {/*<h2>Payment Gateway</h2>*/}
                {
                   (hideActionFunc('bonus') && rowData?.list?.length <= 0)&&
                    <button className={'btn'} onClick={()=>handleOpenModal('AddPaymentGateway')}> + Add Payment Gateway</button>
                }
            </div>

            <CustomTable
                headCells={columns}
                rowData={rowData?.list}
                totalDocs={0}
                isAboutWebsite={true}
            />
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getPaymentGatewayDetails} />
            </CommonModal>
        </Paper>
            </>
    )
}
export default PaymentGateway