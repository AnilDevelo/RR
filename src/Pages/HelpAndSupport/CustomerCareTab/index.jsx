import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import PopComponent from "../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import {
    deleteCustomerCare,
    getCustomerCare,
} from "../../../Redux/HelpAndSupport/action";
import Box from "@mui/material/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import {ActionFunction, hideActionFunc} from "../../../utils";

const CustomerCareTab = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    let Modal = PopComponent[modalDetails.modalName];

    const columns = [
        {
            id: 'phoneNumber',
            label: 'Customer Care Number',
        }, {
            label: 'day Availability',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>{row?.isAllDay ? 'All day Availability' : 'Monday - Friday'}</TableCell>
            }
        },
        {
            id: '',
            label: 'Time Availability',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>{row?.startTime + ' - ' + row?.endTime}</TableCell>
            }
        },
        ActionFunction( 'helpAndSupport',{
            id: 'Action',
            disablePadding: false,
            label: 'Action',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action u_border' onClick={(e) => handleOpenModal('AddCustomerCare', { isEdit: true, row })}>Edit</span>
                    <span className='edit_btn edit-btn-action prTab'
                        onClick={() => handleOpenModal('DeleteCommonModal', { deleteListApiHandler: deleteCustomerCare({ customerCareId: row?._id }), title: 'Do you want to delete this data?' })}>
                        Delete
                    </span>
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
            case 'AddCustomerCare': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };

    useEffect(() => {
        getCustomerCareDetailsList();
    }, [pagination.rowsPerPage, pagination.page]);

    const getCustomerCareDetailsList = () => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        };
        setLoader(true);
        dispatch(getCustomerCare(payload)).then(res => {
            setLoader(false);
            if (res.data.success) {
                setRowData({
                    ...rowData,
                    list: res.data.data,
                    totalDocs: 0
                })
            }
        });
    };

    return (
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                {
                    (hideActionFunc('helpAndSupport') && rowData?.list?.length <= 0) &&
                    <div className={'d_flex_end'}>
                        <button className={'btn'} onClick={(e) => handleOpenModal('AddCustomerCare')}> + Add Customer Care</button>
                    </div>
                }
                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list}
                    totalDocs={rowData?.totalDocs}
                    pagination={pagination}
                    setPagination={setPagination}
                    isWinnerTitle={true}
                    loading={loader}
                />
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getCustomerCareDetailsList} />
            </CommonModal>
        </Box>
    )
}
export default CustomerCareTab