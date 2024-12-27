import React, { useEffect, useState } from "react";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import PopComponent from "../../../../hoc/PopContent";
import moment from "moment";
import {getUserReportedList} from "../../../../Redux/user/action";
import TableCell from "@mui/material/TableCell";
import MainCommonFilter from "../../../../Components/MainCommonFilter";
import { clearPaginationAndFilterData, currencyFormat, dotGenerator, renderSrNo } from "../../../../utils";
import { useNavigate } from "react-router-dom";

const ReportedUsers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0, startRange: '' , endRange: ''})
    let Modal = PopComponent[modalDetails.modalName];
    const [filterData, setFilterData] = useState({
        startDate:  moment().format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
        statusValue: "Today",
        exportFile: false,
        csvDownload: false,
        search: "",
        filterClose: false,
        exportFileName: 'Export File'
    });
    const [dateFilter,setDateFilter] = useState(filterData);
    let prevDateFilter  = React.useRef(dateFilter);


    useEffect(() => {
        if(filterData?.statusValue ==='Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom'  ){
            getUserReportedListData(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
        }
        else if (filterData.startDate && filterData.endDate || filterData?.statusValue === 'All Days') {
            getUserReportedListData(filterData.startDate, filterData.endDate)
        }
    }, [pagination.rowsPerPage, pagination.page, filterData.exportFile, filterData.csvDownload, filterData.startDate, filterData.endDate, filterData?.statusValue]);

    //get Api details code
    const getUserReportedListData = (startDate, endDate, search) => {
        setLoader(true)
        let payload = {
            limit: pagination?.endRange ?  pagination?.endRange : pagination.rowsPerPage  ,
            start:  pagination?.startRange ? (+pagination?.startRange -1) : ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            searchText: search,
            startDate:
                startDate ? moment(startDate).format("YYYY-MM-DD") : null,
            endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
            exportFile: filterData?.exportFile,
            csvDownload: filterData?.csvDownload
        }
        Object?.keys(payload).forEach(ele => {
            if (payload[ele] === '' || payload[ele] === null) { delete payload[ele] }
        });
        dispatch(getUserReportedList(payload)).then(res => {
            setLoader(false)
            if(pagination?.endRange?.toString() !== '' && pagination?.startRange?.toString() !== '' ){
                clearPaginationAndFilterData(pagination,filterData, setPagination, setFilterData);
            }
            if (res?.data?.data?.filePath && res.data.success) {
                window.open(res?.data?.data?.filePath,"_blank");
            }
            if (res.data.success) {
                setRowData({
                    ...rowData,
                    list: res.data.data?.docs,
                    totalDocs: res.data.data.totalDocs
                });
            }
        })
    };

    useEffect(() => {
        if (filterData.startDate && filterData.endDate && filterData?.statusValue === 'Custom') {
            setPagination({
                ...pagination,
                page: 0
            })
            getUserReportedListData(filterData.startDate, filterData.endDate)
        }
    }, [filterData.startDate, filterData.endDate]);

    // table columns
    let columns = [
        {
            id: 'id',
            numeric: false,
            disablePadding: false,
            label: 'Sr. no.',
            type: 'custom',
            render: (row, i) => renderSrNo(row,i,pagination)
        },
        {
            id: 'numericId',
            numeric: false,
            disablePadding: false,
            label: 'Reported Users ID',
            type: 'custom',
            render: (row, i) => {
                return <TableCell><span className='edit_btn' onClick={() => navigate(`/users-tab/${row._id}`)}>{`UID000${row?.numericId}`}</span></TableCell>
            }
        },
        {
            id: 'nickName',
            label: 'Reported Users Name',

        },
        {
            id: 'mobile',
            label: 'Reported Phone Number',
        },
        {
            id: 'deviceType',
            label: 'Device Type',
        },
        {
            id: 'descripton',
            numeric: false,
            disablePadding: false,
            label: 'Description',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{row?.isReportReasonSelected ? dotGenerator(row?.reportReason, handleOpenModal, 'Description') : dotGenerator(row?.descripton, handleOpenModal, 'Description') }</TableCell>
            }
        },
        // {
        //     id: 'bonus',
        //     label: 'Bonus',
        //     type: 'custom',
        //     render: (row) => {
        //         return <TableCell >{currencyFormat(+row?.bonus)}</TableCell>
        //     }
        // },
        // {
        //     id: 'winCash',
        //     label: 'Win Cash',
        //     type: 'custom',
        //     render: (row) => {
        //         return <TableCell >{currencyFormat(+row?.winCash)}</TableCell>
        //     }
        // },
        // {
        //     id: 'depositsCash',
        //     label: ' Cash',
        //     type: 'custom',
        //     render: (row) => {
        //         return <TableCell >{currencyFormat(+row?.cash)}</TableCell>
        //     }
        // },
        {
            id: '',
            label: 'Action',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell >
                    <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('ViewReportedUserList', row?._id)}>View</span>
                </TableCell>
            }
        },
    ];

    // custom PopUp function
    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'BlockUser':
            case 'CommonPop':
            case 'ViewReportedUserList':
            case 'ExportFilePopup':
            case 'ViewRejectedComment':{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };

    return (
        <Box>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <MainCommonFilter
                    filterData={filterData}
                    setFilterData={setFilterData}
                    addPropsFilter={{userPayment: rowData?.list?.length <= 0, setDateFilter, prevDateFilter }}
                    searchApiHandler={getUserReportedListData}
                    pagination={pagination}
                    setPagination={setPagination}
                    isSearchTooltip={{ isWithdrawalRequest:true }}
                    handleOpenModal={handleOpenModal}
                    totalDocs={rowData?.totalDocs}
                />
                {/*------------------ CustomTable ---------------------*/}
                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list}
                    totalDocs={rowData?.list?.length}
                    pagination={pagination}
                    setPagination={setPagination}
                    loading={loader}
                />
            </Paper>
            {/*--------------------------------------------------------Common Popup-------------------------------------------------*/}
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Box>
    )
}
export default ReportedUsers