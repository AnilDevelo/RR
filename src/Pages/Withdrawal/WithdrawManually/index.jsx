import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import PopComponent from "../../../hoc/PopContent";
import {getUserDepositRequest, getWithdrawalManuallyRequest} from "../../../Redux/Master/action";
import TableCell from "@material-ui/core/TableCell";
import {ActionFunction, currencyFormat, dotGenerator} from "../../../utils";
import {Box} from "@mui/material";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import MainCommonFilter from "../../../Components/MainCommonFilter";

    const WithdrawalManuallyRequest = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    let Modal = PopComponent[modalDetails.modalName];
        const [filterData, setFilterData] = useState({
            search: "",
            filterClose: false,
            statusField: 'All Status',
        });

    useEffect(() => {
        getWithdrawalManuallyRequestData();
    }, [pagination.rowsPerPage, pagination.page, filterData.statusField]);

    const getWithdrawalManuallyRequestData = (search) => {
        setLoader(true);
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            searchText: search,
            approveStatus: filterData?.statusField !== 'All Status' ? filterData?.statusField : '',
        }
        dispatch(getWithdrawalManuallyRequest(payload))
            .then((res) => {
                setLoader(false);
                if (res.data.success) {
                    setRowData({
                        ...rowData,
                        list: res.data.data?.docs,
                        totalDocs: res?.data?.data?.totalDocs
                    })
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
            case 'ApproveWithdrawManually' : {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'RejectWithdrawManually' : {
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
            id:'userName',
            label: "Users Name",
            sortable: false,
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell><span className='edit_btn'
                                        onClick={() => navigate(`/users-tab/${row.userId}`)}>{row?.userName}</span></TableCell>
            }
        },

        {
            label: "Withdrawal UPI Id",
            sortable: false,
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'table_icon'}>
                    {row?.withdrawalUpiId }
                </TableCell>
            }
        },
        {
            label: "Previous amount",
            sortable: false,
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell >
                    {currencyFormat(+row?.amountBeforeProcessingFee)}
                </TableCell>
            }
        },
        {
            label: "Processing Fee",
            sortable: false,
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'table_icon'}>
                    {currencyFormat(+row?.processingFee)}
                </TableCell>
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
            label: "Image",
            sortable: false,
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'table_icon'}>
                    {
                        row?.withdrawWinCashImage &&
                        <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('DocumentOpenPopup', { front: row?.withdrawWinCashImage, back: '' })}>View</span>
                    }

                </TableCell>
            }
        },
        {
            label: "status",
            sortable: false,
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell><span className={row?.approveStatus === 'reject' ? 'req_rejected' : ''}>
                   {row?.approveStatus === 'approve' ? 'Approved' : row?.approveStatus === 'reject' ? 'Rejected' : row?.approveStatus }</span>
                </TableCell>
            }
        },
        {
            id: 'description',
            numeric: true,
            disablePadding: false,
            label: 'Reject Reason',
            type: 'custom',
            isDisbanding: true,
            render: (row) => {
                return <TableCell >{row?.rejectReason ? dotGenerator(row?.rejectReason, handleOpenModal, 'Withdrawal Request Reject Reason') : ''}</TableCell>
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
                        row?.approveStatus === 'pending' ?
                            <>
                                <span className='edit_btn edit-btn-action u_border prTab' onClick={() => handleOpenModal('ApproveWithdrawManually', row)}>Approve</span>
                                <span className='edit_btn edit-btn-action  prTab' onClick={() => handleOpenModal('RejectWithdrawManually', { withdrawalRequestId: row?._id, isApproved: false })}>Reject</span>
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
                    searchApiHandler={getWithdrawalManuallyRequestData}
                    pagination={pagination}
                    setPagination={setPagination}
                    statusOption={['All Status', 'Approve', 'Pending', 'Reject']}
                    addPropsFilter={{ withdrawManually: true, isGameList:true }}
                    isSearchTooltip={{ isWithdrawalRequest:true }}
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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getWithdrawalManuallyRequestData} />
            </CommonModal>
        </Box>
    );
}
export default WithdrawalManuallyRequest