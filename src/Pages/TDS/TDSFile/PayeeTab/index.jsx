import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import moment from "moment";
import {getTdsChallanList, getTDSConfig, getTDSUserWiseReportList} from "../../../../Redux/TDSReport/action";
import Loader from "../../../../images/Loader";
import MainCommonFilter from "../../../../Components/MainCommonFilter";
import Paper from "@mui/material/Paper";
import {currencyFormat} from "../../../../utils";
import CustomTable from "../../../../hoc/CommonTable";
import TableCell from "@mui/material/TableCell";
import PopComponent from "../../../../hoc/PopContent";
import CommonModal from "../../../../hoc/CommonModal";
import Box from "@mui/material/Box";

const PayeeTab = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [filterData, setFilterData] = useState({
        startDate: null,
        endDate: null,
        statusValue: "All Days",
        exportFile: false,
        csvDownload: false,
        exportFileName: 'Export File',
        gameQuarter: 'All Quarter'
    });
    const [rowDataTotal, setRowDataTotal] = useState({});
    const [tdsConfigParentage,setTDSConfigParentage] = useState(0);
    const [dateFilter,setDateFilter] = useState(filterData);
    let prevDateFilter  = React.useRef(dateFilter);

    useEffect(() => {
        if(filterData?.statusValue ==='Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom'  ){
            getGameWiseTDSReportDetails(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
        } else if((filterData?.startDate && filterData?.endDate) || filterData?.statusValue === 'All Days'){
            getGameWiseTDSReportDetails(filterData?.startDate, filterData?.endDate);
        }
    }, [filterData.startDate, filterData.endDate, filterData?.statusValue]);

    useEffect(() => {
        getTDSConfigHandler();
    }, []);

    const getTDSConfigHandler = () => {
        dispatch(getTDSConfig({})).then(res => {
            if (res.data.success) {
                setTDSConfigParentage(res.data.data?.tdsPercentage)
            }
        });
    };

    useEffect(()=>{
        if(filterData?.statusValue ==='Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom'  ){
            getTDSReportDetails(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
        }  if (filterData.startDate && filterData.endDate || filterData?.statusValue === 'All Days') {
            getTDSReportDetails(filterData.startDate, filterData.endDate);
        }
    },[filterData.startDate, filterData.endDate, pagination.rowsPerPage, pagination.page, filterData?.exportFile, filterData?.csvDownload,filterData?.statusValue])

    const getGameWiseTDSReportDetails = (startDate, endDate) => {
        let payload = {
            startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
            endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
        };
        setLoader(true);
        dispatch(getTdsChallanList(payload)).then(res => {
            setLoader(false)
            setRowDataTotal(res?.data?.data?.totalTDSChallan?.[0])
        });
    };

    const getTDSReportDetails = (startDate, endDate) => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
            endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
        };
        if(payload?.exportFile){
            delete payload?.limit
            delete payload?.start
        }
        dispatch(getTDSUserWiseReportList(payload)).then(res => {
            if (res?.data?.data?.filePath) {
                setFilterData({
                    ...filterData,
                    csvDownload: false,
                    exportFile: false
                })
                window.open(res?.data?.data?.filePath,"_blank");
            }else {
                setRowData({
                    ...rowData,
                    list: res?.data?.data?.docs,
                    totalDocs: res?.data?.data?.totalDocs || 0
                })
            }

        });
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
            label: ' Users Name',
        },
        {
            id: 'panCardName',
            label: ' Pan Card Name',
        },
        {
            id: 'panCardNumber',
            label: ' Pan Card Number',
        },
        {
            id: 'totalWininigAmount',
            label: 'Winning Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.totalWininigAmount)}</TableCell>
            }
        },
        {
            id: 'totalEntryFee',
            label: 'Entry Fees Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.totalEntryFee)}</TableCell>
            }
        },
        {
            id: 'totalNetWininigAmount',
            label: 'Net Win Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.totalNetWininigAmount)}</TableCell>
            }
        },
        {
            id: 'totalTDSAmount',
            label: 'TDS Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.totalTDSAmount)}</TableCell>
            }
        },
        {
            id: 'totalCreditedAmount',
            label: 'Credited Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.totalCreditedAmount)}</TableCell>
            }
        },
        // {
        //     id: 'totalPlayedgame',
        //     label: 'Total Played Game',
        //     type: 'custom',
        //     render: (row) => {
        //         return <TableCell  className={'pl_3'} >{row?.totalPlayedgame}</TableCell>
        //     }
        // },
        {
            id: '',
            label: 'User TDS History',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'pl_3'}> <span className='edit_btn' onClick={()=> handleOpenModal('ViewUserTDSReport', row)}>View</span></TableCell>
            }
        },

    ];

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewUserTDSReport' : {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };

    return(
        <>
            {/* {loader ? <Loader /> : ""} */}
            <div className={'outer-box'}>
                <MainCommonFilter
                    filterData={filterData}
                    setFilterData={setFilterData}
                    searchApiHandler={''}
                    pagination={''}
                    setPagination={''}
                    addPropsFilter={{ userPayment: rowData?.list?.length <= 0, isTDSChallan : true }}

                />
                <div className={'tds_report_all_game tds_challan_user'}>
                    <Paper sx={{ mb: 2 }} className="outer-box tds_challan_table left_margin_challan">
                        <h4>Total Winning Amount</h4>
                        <p>{currencyFormat(rowDataTotal?.totalWiningAmount || 0)}</p>
                    </Paper>
                    <Paper sx={{ mb: 2 }} className="outer-box tds_challan_table">
                        <h4>Total Entry Fee</h4>
                        <p>{currencyFormat(rowDataTotal?.totalEntryFee || 0)}</p>
                    </Paper>
                    <Paper sx={{ mb: 2 }} className="outer-box tds_challan_table">
                        <h4>Total Net Win Amount</h4>
                        <p>{currencyFormat(rowDataTotal?.totalNetWinAmount || 0)}</p>
                    </Paper>
                    <Paper sx={{ mb: 2 }} className="outer-box tds_challan_table">
                        <h4>Total TDS Amount</h4>
                        <p>{currencyFormat(rowDataTotal?.totalTDSAmount || 0)}</p>
                    </Paper>
                    <Paper sx={{ mb: 2 }} className="outer-box tds_challan_table right_margin_challan">
                        <h4>Net Credited Amount</h4>
                        <p>{currencyFormat(rowDataTotal?.totalCreditedAmount || 0)}</p>
                    </Paper>
                </div>

                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list}
                    totalDocs={rowData?.totalDocs}
                    pagination={pagination}
                    setPagination={setPagination}
                    loading={loader}
                />
                <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                    <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={''} />
                </CommonModal>
            </div>

        </>
    )
}
export default PayeeTab