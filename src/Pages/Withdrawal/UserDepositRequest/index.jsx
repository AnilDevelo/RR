import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import { getUserDepositRequest } from "../../../Redux/Master/action";
import TableCell from "@material-ui/core/TableCell";
import {ActionFunction, currencyFormat, dotGenerator} from "../../../utils";
import {Box} from "@mui/material";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import {useNavigate} from "react-router-dom";
import MainCommonFilter from "../../../Components/MainCommonFilter";

const UserDepositRequest = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    let Modal = PopComponent[modalDetails.modalName];
    const [filterData, setFilterData] = useState({ search: "", filterClose: false, statusField: 'All Status', });
    

    
    useEffect(() => {
        if (filterData.statusField) {
            getUserDepositRequestData()
    }
    getUserDepositRequestData("","",filterData?.search)
}, [pagination.rowsPerPage, pagination.page, filterData.statusField])
    
    const getUserDepositRequestData = (startDate, endDate, search) => {
    setLoader(true);
        const { rowsPerPage, page, startRange, endRange } = pagination;
        const activeStatus = filterData?.statusField == "Approved" ? "Approve" : filterData?.statusField == "Rejected" ? "Reject" : filterData?.statusField
    let payload = {
        limit: endRange || rowsPerPage,
        start: startRange || page * rowsPerPage,
        searchText: search,
        status: activeStatus !== 'All Status' ? activeStatus : '',
    };
    dispatch(getUserDepositRequest(payload))
        .then((res) => {
            setLoader(false);
            if (res.data.success) {
                setRowData({
                    ...rowData,
                    list: res.data.data?.docs,
                    totalDocs: res?.data?.data?.totalDocs,
                });
            }
        })
        .catch((e) => {
            setLoader(false);
        });
};


    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'DeleteCommonModal': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ApproveUserDepositRequest' : {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'RejectUserDepositRequest' : {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DocumentOpenPopup' : {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewRejectedComment' : {
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
            label: "Sr. No.",
            sortable: false,
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{+pagination?.rowsPerPage * (+pagination?.page) + i+1}</TableCell>
            }
        },
        {
            label: "Amount",
            sortable: false,
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell >
                    {currencyFormat(+row?.amount)}
                </TableCell>
            }
        },
        {
            label: "Transaction Id",
            sortable: false,
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'table_icon'}>
                    {row?.transactionId }
                </TableCell>
            }
        },
        {
            label: "Sender Name",
            sortable: false,
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'table_icon'}>
                    <span className='edit_btn'
                          onClick={() => navigate(`/users-tab/${row?.userId?._id}`)}>  {row?.userId?.fullName}</span>
                </TableCell>
            }
        },
        {
            label: "status",
            sortable: false,
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                let statusClass = '';
                switch (row?.status) {
                    case 'Approve':
                        statusClass = 'Approved';
                        break;
                    case 'Reject':
                        statusClass = 'Reject';
                        break;
                    case 'Pending':
                        statusClass = 'yellow';
                        break;
                    default:
                        break;
                }
                return <TableCell><span className={statusClass}>
                   {row?.status === 'Approve' ? 'Approved' : row?.status === 'Reject' ? 'Rejected' : row?.status }</span>
                </TableCell>
            }
        },
        {
            id: 'rejectReason',
            label: 'Rejected Reason',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell >{ row?.rejectReason && dotGenerator(row?.rejectReason, handleOpenModal, 'Rejected Reason' ) || "-" }</TableCell>
            }
        },
        {
            label: "Image",
            sortable: false,
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'table_icon'}>
                    <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('DocumentOpenPopup', { front: row?.addDepositCash, back: '' })}>View</span>
                </TableCell>
            }
        },
        ActionFunction('withdrawal', {
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    {
                        row?.status === 'Pending' ?
                            <>
                                <span className='edit_btn edit-btn-action u_border prTab' onClick={() => handleOpenModal('ApproveUserDepositRequest', { userDepositRequestId: row?._id, isApprove: true, amount:row?.amount })}>Approve</span>
                                <span className='edit_btn edit-btn-action  prTab' onClick={() => handleOpenModal('RejectUserDepositRequest', { userDepositRequestId: row?._id, isApprove: false, amount:row?.amount })}>Reject</span>
                            </>
                            : '_'
                    }
                </TableCell>
            }
        })
    ];

    return (
        <Box>
            {/* {loader ? <Loader /> : ""} */}

            <Paper sx={{ mb: 2 }} className="outer-box">
                <MainCommonFilter
                    filterData={filterData}
                    setFilterData={setFilterData}
                    searchApiHandler={getUserDepositRequestData}
                    pagination={pagination}
                    setPagination={setPagination}
                    statusOption={['All Status', 'Approved', 'Pending', 'Rejected']}
                    addPropsFilter={{ withdrawManually: true, isGameList:true }}
                    isSearchTooltip={{ idUserDepositRequest:true }}
                />
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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getUserDepositRequestData} />
            </CommonModal>
        </Box>
    );
}
export default UserDepositRequest