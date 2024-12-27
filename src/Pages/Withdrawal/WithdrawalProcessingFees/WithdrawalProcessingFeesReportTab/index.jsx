import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import PopComponent from "../../../../hoc/PopContent";
import moment from "moment";
import {getAllUserDetailsList} from "../../../../Redux/user/action";
import TableCell from "@mui/material/TableCell";
import {ActionFunction, currencyFormat} from "../../../../utils";
import Box from "@mui/material/Box";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import MainCommonFilter from "../../../../Components/MainCommonFilter";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import {getWithdrawalProcessingFeesReport} from "../../../../Redux/Master/action";

const WithdrawalProcessingFeesReportTab = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 , startRange: '' , endRange: ''})
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [filterData, setFilterData] = useState({
        startDate: null,
        endDate: null,
        statusValue: "All Days",
        exportFile: false,
        csvDownload: false,
        search: "",
        filterClose: false,
        exportFileName: 'Export File'
    });
    const [modalDetails, setModalDetails] = useState({
        modalValue: "",
        modalName: "",
        modalIsOpen: false,
    });
    let Modal = PopComponent[modalDetails.modalName];
    const [dateFilter,setDateFilter] = useState(filterData);
    let prevDateFilter  = React.useRef(dateFilter);

    useEffect(() => {
        if(filterData?.statusValue ==='Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom'  ){
            getWithdrawalProcessingFeesReportList(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
        } else if (filterData.startDate && filterData.endDate || filterData?.statusValue === 'All Days') {
            getWithdrawalProcessingFeesReportList(filterData.startDate, filterData.endDate)
        }
    }, [pagination.rowsPerPage, pagination.page, filterData.exportFile, filterData.csvDownload, filterData.startDate, filterData.endDate, filterData?.statusValue]);


    const getWithdrawalProcessingFeesReportList = (startDate, endDate, search) => {
        setLoader(true)
        let payload = {
            limit: pagination?.endRange ?  pagination?.endRange : pagination.rowsPerPage  ,
            start: +pagination?.startRange ? +pagination?.startRange :   ((pagination.page + 1) - 1) * pagination.rowsPerPage,
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
        dispatch(getWithdrawalProcessingFeesReport(payload)).then(res => {
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
            if (res?.data?.data?.filePath) {
                setFilterData({
                    ...filterData,
                    csvDownload: false,
                    exportFile: false
                })
                window.open(res?.data?.data?.filePath,"_blank");
            }else{
                setRowData({
                    ...rowData,
                    list: res?.data?.data?.docs,
                    totalDocs: res?.data?.data?.totalDocs
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
            getWithdrawalProcessingFeesReportList(filterData.startDate, filterData.endDate)
        }

    }, [filterData.startDate, filterData.endDate]);


    let columns = [

        {
            id: 'id',
            numeric: false,
            disablePadding: false,
            label: 'Users ID',
            type: 'custom',
            render: (row, i) => {
                return <TableCell><span className='edit_btn'
                                        onClick={() => navigate(`/users-tab/${row.userId}`)}>{`UID000${row?.userNumericId}`}</span></TableCell>
            }
        },
        {
            id: 'nickName',
            numeric: false,
            disablePadding: false,
            label: 'Users Name'
        },
        {
            id: 'processingFee',
            numeric: false,
            disablePadding: false,
            label: 'Processing Fee',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'pl_3'} >{currencyFormat(+row?.processingFee)}</TableCell>
            }
        },
        {
            id: 'withdrawalAmount',
            numeric: false,
            disablePadding: false,
            label: 'Withdrawal Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'pl_3'} >{currencyFormat(+row?.withdrawalAmount)}</TableCell>
            }
        },
        {
            id: 'creditedWithdrawalAmount',
            numeric: false,
            disablePadding: false,
            label: 'Credited Withdrawal Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'pl_3'} >{currencyFormat(+row?.creditedWithdrawalAmount)}</TableCell>
            }
        },
    ];

    const handleOpenModal = (type, data) => {
        switch (type) {
            case "CommonPop": {
                setModalDetails({...modalDetails, modalValue: data, modalName: type, modalIsOpen: true,});
                break;
            }
            case 'ExportFilePopup':{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };
    return (
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <MainCommonFilter
                    filterData={filterData}
                    setFilterData={setFilterData}
                    searchApiHandler={getWithdrawalProcessingFeesReportList}
                    pagination={pagination}
                    setPagination={setPagination}
                    addPropsFilter={{userPayment: rowData?.list?.length <= 0}}
                    isSearchTooltip={{ isWithdrawalRequest: true }}
                    handleOpenModal={handleOpenModal}
                    totalDocs={rowData?.totalDocs}
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
            <CommonModal className={"Approved-reject-section"} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={''}/>
            </CommonModal>
        </Box>
    )
}
export default WithdrawalProcessingFeesReportTab