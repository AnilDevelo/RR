import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import PopComponent from "../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import moment from "moment";
import {getUserBlockList} from "../../../Redux/user/action";
import Box from "@mui/material/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import MainCommonFilter from "../../../Components/MainCommonFilter";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import {getGameHistoryList, refundGameHistory} from "../../../Redux/games/action";
import {currencyFormat} from "../../../utils";
import {deleteMgpReleases} from "../../../Redux/MGPRelease/action";
import TableLoader from "hoc/CommonTable/TableLoader";

const GameHistory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 })
    let Modal = PopComponent[modalDetails.modalName];
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [filterData, setFilterData] = useState({
        startDate: null,
        endDate: null,
        statusValue: "All Days",
        exportFile: false,
        csvDownload: false,
        search: "",
        filterClose: false,
        exportFileName: 'Export File',
        multi: [{value: 'Entry Fees', label: 'Entry Fees'}]
    });

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewGameHistoryPopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal' : {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewDeductedEntryFee' : {
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
            id: 'createdAt',
            label: 'Date',
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment(row?.createdAt).format('MMM DD YYYY, hh:mm A')}</TableCell>
            }
        },
        {
            id: '',
            label: 'Users Name',
            type: 'custom',
            render: (row, i) => {
                return <TableCell><span className='edit_btn'
                                        onClick={() => navigate(`/users-tab/${row.userId?._id}`,)}>{row?.userId?.nickName ? row?.userId?.nickName : ''}
                </span></TableCell>
            }

        },
        {
            id: 'title',
            label: 'Title',
        },
        {
            id: '',
            label: 'Game Name',
            type: 'custom',
            render: (row, i) => {
                return <TableCell><span className='edit_btn'
                                        onClick={() => navigate(`/game-tab/${row.gameId?._id}`,)}>{row?.gameId?.gameName ? row?.gameId?.gameName : ''}
                </span></TableCell>
            }

        },
        {
            id: 'amount',
            label: 'Amount',
            type: 'custom',
            render: (row) => {
                let temp = [];
                temp.push(row)
                return <TableCell > { row?.status === 'Entry Fees' ? <span className='edit_btn edit-btn-action prTab' onClick={() => handleOpenModal('ViewDeductedEntryFee', temp)}> {currencyFormat(+row?.amount)} </span> : currencyFormat(+row?.amount)} </TableCell>
            }

        },
        {
            id: 'gameStatus',
            label: 'Game Status',
        },
        {
            id: 'status',
            label: 'Status',

        },

        {
            id: 'Action',
            label: 'Action',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                let temp = [];
                temp.push(row)
                return <TableCell className={'role_field_id'}>
                    {row?.gameStatus === 'Pending' && <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('DeleteCommonModal',
                        { deleteListApiHandler: refundGameHistory({ transactionId: row?._id}), title: 'Do you want to refund?' })}>Refund</span>}
                    <span className='edit_btn edit-btn-action prTab' onClick={() => handleOpenModal('ViewGameHistoryPopup', temp)}> View </span>
                </TableCell>
            }
        },
        {
            id: 'tableId',
            label: 'Table Id',
        },
    ];

    useEffect(() => {
        if (filterData?.statusValue !== 'Custom') {
            getGameHistoryListDetails(filterData.startDate, filterData.endDate,filterData.search)
        }
    }, [pagination.rowsPerPage, pagination.page, filterData.exportFile, filterData.csvDownload, filterData.startDate, filterData.endDate, filterData?.multi]);

    // get Users Api and All Filter Api
    const getGameHistoryListDetails = (startDate, endDate, search) => {
        let payload = {
            limit: pagination.rowsPerPage,
            searchText: search,
            startDate:
                startDate ? moment(startDate).format("YYYY-MM-DD") : null,
            endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            exportFile: filterData?.exportFile,
            csvDownload: filterData?.csvDownload,
            statusArray : filterData?.multi?.length > 0 ? filterData?.multi.reduce((acc,cur)=> [...acc, cur?.label],[]) : ''
        }
        Object?.keys(payload).forEach(ele => {
            if (payload[ele] === '' || payload[ele] === null) { delete payload[ele] }
        });
        setLoader(true)
        dispatch(getGameHistoryList(payload)).then(res => {
            setLoader(false)
            if (res?.data?.data?.filePath) {
                setFilterData({
                    ...filterData,
                    csvDownload: false,
                    exportFile: false
                })
                window.open(res?.data?.data?.filePath,"_blank");
            }
            if (res.data?.success) {
                setRowData({
                    ...rowData,
                    list: res?.data?.data?.docs,
                    totalDocs: res?.data?.data?.totalDocs
                })
            } else {
                setRowData({
                    ...rowData,
                    list: [],
                    totalDocs: 0
                })
            }
        })
    };

    useEffect(() => {
        if (filterData.startDate && filterData.endDate && filterData?.statusValue === 'Custom') {
            setPagination({
                ...pagination,
                page: 0
            })
            getGameHistoryListDetails(filterData.startDate, filterData.endDate)
        }

    }, [filterData.startDate, filterData.endDate]);

    return (
        <Box>
            {loader ? <TableLoader /> : ""}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <MainCommonFilter
                    filterData={filterData}
                    setFilterData={setFilterData}
                    addPropsFilter={{userPayment: rowData?.list?.length <= 0, isGameHistory:true}}
                    searchApiHandler={getGameHistoryListDetails}
                    pagination={pagination}
                    setPagination={setPagination}
                    isSearchTooltip={{ isWithdrawalRequest:true }}

                />
                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list}
                    totalDocs={rowData?.totalDocs}
                    pagination={pagination}
                    setPagination={setPagination}
                />
            </Paper>
            {/*--------------------------------------------------------Common Popup-------------------------------------------------*/}
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getGameHistoryListDetails} />
            </CommonModal>
        </Box>
    )
}
export default GameHistory