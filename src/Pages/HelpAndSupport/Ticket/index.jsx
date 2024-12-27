import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import { useDispatch } from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import { deleteHelpTicketType, getHelpTicketType } from "../../../Redux/HelpAndSupport/action";
import {ActionFunction, hideActionFunc} from "../../../utils";

const Ticket = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    let Modal = PopComponent[modalDetails.modalName];


    const columns = [
        {
            id: 'numericId',
            label: 'ID',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{`TCT000${row?.numericId}`}</TableCell>
            }
        },
        {
            id: 'ticketType',
            label: 'Ticket Type',
        },
        ActionFunction( 'helpAndSupport',{
            id: 'Action',
            disablePadding: false,
            label: 'Action',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action u_border' onClick={(e) => handleOpenModal('AddTicketTypePop', { isEdit: true, row })}>Edit</span>
                    <span className='edit_btn edit-btn-action prTab'
                        onClick={() => handleOpenModal('DeleteCommonModal',
                            { deleteListApiHandler: deleteHelpTicketType({ ticketId: row?._id }), title: 'Do you want to delete this data?' })}>
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
            case 'AddTicketTypePop': {
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
        getHelpTicketTypeHandler();
    }, [pagination.rowsPerPage, pagination.page]);

    const getHelpTicketTypeHandler = () => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        };
        setLoader(true);
        dispatch(getHelpTicketType(payload)).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                list: res?.data?.data?.docs,
                totalDocs: res?.data?.data?.totalDocs
            })
        });
    };

    return (
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                {
                    hideActionFunc('helpAndSupport') &&
                    <div className={'d_flex_end'}>
                        <button className={'btn'} onClick={(e) => handleOpenModal('AddTicketTypePop')}> + Add Ticket Type</button>
                    </div>
                }

                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list}
                    totalDocs={rowData?.totalDocs}
                    pagination={pagination}
                    setPagination={setPagination}
                    loading={loader}
                />
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getHelpTicketTypeHandler} />
            </CommonModal>
        </Box>
    )
}
export default Ticket;