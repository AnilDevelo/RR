import Box from "@mui/material/Box";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import MainCommonFilter from "../../../../Components/MainCommonFilter";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import PopComponent from "../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import { ActionFunction, dotGenerator } from "../../../../utils";
import moment from "moment";
import { getUserKYCListRequest } from "../../../../Redux/user/action";

const UserKYCRequest = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0, startRange: '' , endRange: '' })
    let Modal = PopComponent[modalDetails.modalName];
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [filterData, setFilterData] = useState({
        startDate: null,
        endDate: null,
        statusField: 'Pending',
        exportFile: false,
        csvDownload: false,
        search: "",
        filterClose: false,
        statusValue: "All Days",
        exportFileName: 'Export File'
    });
    const [dateFilter,setDateFilter] = useState(filterData);
    let prevDateFilter = React.useRef(dateFilter);
    
    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewKYCDetailsPopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ApproveUserKYCRequest': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'RejectUserKYCRequest': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewRejectedComment': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };

    const columns = [
        {
            id: 'id',
            numeric: false,
            disablePadding: false,
            label: 'Sr. no.',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{+pagination.rowsPerPage * ((+pagination.page + 1) - 1) + i+1}</TableCell>
            }
        },
        {
            id: '',
            numeric: false,
            isDisbanding: true,
            label: 'Users ID',
            type: 'custom',
            render: (row, i) => {
                return <TableCell><span className='edit_btn' onClick={() => navigate(`/users-tab/${row?.userId._id}`)}>{`UID000${row?.userId?.numericId || 1}`}</span></TableCell>
            }
        },
        {
            id: 'createdAt',
            numeric: true,
            disablePadding: false,
            label: 'Date',
            type: "custom",
            render: (row) => {
                return <TableCell >{moment(row?.createdAt).format("MMM DD YYYY, hh:mm A")}</TableCell>
            }
        },
        {
            id: 'nickName',
            numeric: true,
            isDisbanding: true,
            label: 'Users Name',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{row?.userId?.nickName}</TableCell>
            }
        },
        {
            id: 'isUpdateAadharCard',
            label: 'KYC Type',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{row?.isUpdateAadharCard ? 'Aadhar Card' : 'Pan Card'}</TableCell>
            }
        },
        {
            id: 'rejectReason',
            label: 'KYC Reject Reason',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.rejectReason ? dotGenerator(row?.rejectReason, handleOpenModal, 'Reject KYC Request Reason') : '-'}</TableCell>
            }
        },
        {
            id: 'status',
            isDisbanding: true,
            label: 'KYC History',
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={(row?.status === 'Reject' || row?.status === 'Approve') ? '' :'edit_btn edit-btn-action u_border_details'} onClick={(e) => (row?.status === 'Reject' || row?.status === 'Approve') ? '' : handleOpenModal('ViewKYCDetailsPopup', row)}>
                    {(row?.status === 'Reject' || row?.status === 'Approve') ? <span className={'kyc-dashed-type'}>-</span> : 'View'}
                </TableCell>
            }
        },
        {
            id: 'status',
            label: 'Status',
        },
        ActionFunction('user', {
            id: 'Action',
            label: 'Action',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {

                return <TableCell className={'role_field_id'}>
                    {
                        (row?.status === 'Pending') ?
                            <>
                                <span className='edit_btn edit-btn-action u_border prTab' onClick={() => handleOpenModal('ApproveUserKYCRequest', { kycUpdateRequestId: row?._id, isApprove: true })}> Approve</span>
                                <span className='edit_btn edit-btn-action prTab ' onClick={() => handleOpenModal('RejectUserKYCRequest', { kycUpdateRequestId: row?._id, isApprove: false })}>Reject</span>

                            </>
                            : "-"
                    }
                </TableCell>
            }
        })
    ];

    useEffect(() => {
        if(filterData?.statusValue ==='Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom'  ){
            getUserKYCListRequestDetails(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
        }
        else if (filterData.startDate && filterData.endDate || filterData?.statusValue === 'All Days') {
            getUserKYCListRequestDetails(filterData.startDate, filterData.endDate)
        }
        // getUserKYCListRequestDetails()
    }, [pagination.rowsPerPage, pagination.page, filterData?.statusField, filterData.exportFile, filterData.csvDownload, filterData.startDate, filterData.endDate, filterData?.statusValue]);

    const getUserKYCListRequestDetails = (startDate, endDate, search) => {
        let payload = {
            limit: pagination?.endRange ?  pagination?.endRange : pagination.rowsPerPage  ,
            start: +pagination?.startRange ? +pagination?.startRange : ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            searchText: search,
            status: filterData?.statusField !== 'All Status' ? filterData?.statusField : '',
            startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
            endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
            exportFile: filterData?.exportFile,
            csvDownload: filterData?.csvDownload
        }
        Object?.keys(payload).forEach(ele => {
            if (payload[ele] === '' || payload[ele] === null) { delete payload[ele] }
        });
        setLoader(true);
        dispatch(getUserKYCListRequest(payload)).then(res => {
            setLoader(false)
            if(pagination?.endRange?.toString() !== '' && pagination?.startRange?.toString() !== '' ){
                setPagination({
                    ...pagination,
                    startRange:'',
                    endRange: '',
                    rowsPerPage: 10,
                    page:0
                })
                setFilterData({
                    ...filterData,
                    csvDownload: false,
                    exportFile: false,
                    exportFileName: 'Export File'
                })
            }
            if (res.data?.success) {
                if (res?.data?.data?.filePath) {
                    setFilterData({
                        ...filterData,
                        csvDownload: false,
                        exportFile: false
                    })
                    window.open(res?.data?.data?.filePath,"_blank");
                }else {
                    setRowData({ ...rowData, list: res?.data?.data?.docs, totalDocs: res?.data?.data?.totalDocs })
                }

            } else {
                setRowData({ ...rowData, list: [], totalDocs: 0 })
            }
        });
    };
    useEffect(() => {
        if (filterData.startDate && filterData.endDate && filterData?.statusValue === 'Custom') {
            setPagination({
                ...pagination,
                page: 0
            })
            getUserKYCListRequestDetails(filterData.startDate, filterData.endDate)
        }
    }, [filterData.startDate, filterData.endDate]);
    return (
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <MainCommonFilter
                    filterData={filterData}
                    setFilterData={setFilterData}
                    searchApiHandler={getUserKYCListRequestDetails}
                    pagination={pagination}
                    setPagination={setPagination}
                    statusOption={['All Status', 'Approve', 'Pending', 'Reject']}
                    addPropsFilter={{ isKYCList: true, isGameList: true, userPayment: rowData?.list?.length <= 0 }}
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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getUserKYCListRequestDetails} />
            </CommonModal>
        </Box>
    )
}
export default UserKYCRequest