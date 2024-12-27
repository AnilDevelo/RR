import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import {BootstrapTooltip, clearPaginationAndFilterData, currencyFormat} from "../../../../utils";
import {getTdsChallanList, getTDSConfig, getTDSUserWiseReportList} from "../../../../Redux/TDSReport/action";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import PopComponent from "../../../../hoc/PopContent";
import MainCommonFilter from "../../../../Components/MainCommonFilter";
import moment from "moment";
import info from "../../../../assets/images/info.svg";

const TDSUserReport = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0, startRange: '' , endRange: ''})
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [filterData, setFilterData] = useState({
        startDate:  moment().format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
        statusValue: "Today",
        exportFile: false,
        csvDownload: false,
        exportFileName: 'Export File',
        gameQuarter: 'All Quarter'
    });
    const [rowDataTotal,setRowDataTotal] = useState({});
    const [tdsConfigParentage,setTDSConfigParentage] = useState(0);
    const [dateFilter,setDateFilter] = useState(filterData);
    let prevDateFilter  = React.useRef(dateFilter);

    const columns = [
        {
          id: "id",
          numeric: false,
          disablePadding: false,
          label: "Users ID",
          type: "custom",
          render: (row, i) => {
            return (
              <TableCell>
                <span
                  className="edit_btn"
                  onClick={() => navigate(`/users-tab/${row.userId}`)}
                >{`UID000${row?.userNumericId}`}</span>
              </TableCell>
            );
          },
        },
        {
          id: "nickName",
          label: " Users Name",
        },
        {
          id: "panCardName",
          label: " Pan Card Name",
        },
        {
            id: "panCardNumber",
            label: " Pan Card Number",
          },
        {
          label: "WithDrawal Amount",
          id: "withdrawalAmount",
          type: "custom",
          render: (row) => {
            return <TableCell>{currencyFormat(+row?.withdrawalAmount)}</TableCell>;
          },
        },
        {
          label: "taxable Net winnings",
          id: "taxableNetWinnings",
          type: "custom",
          render: (row) => {
            return <TableCell>{currencyFormat(+row?.taxableNetWinnings)}</TableCell>;
          },
        },
       
        {
          id: "totalTDSAmount",
          label: "TDS Amount",
          type: "custom",
          render: (row) => {
            return <TableCell>{currencyFormat(+row?.totalTDSAmount)}</TableCell>;
          },
        },
        {
          id: "totalCreditedAmount",
          label: "Credited Amount",
          type: "custom",
          render: (row) => {
            return (
              <TableCell>{currencyFormat(+row?.totalCreditedAmount)}</TableCell>
            );
          },
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
          id: "",
          label: "User TDS History",
          isDisbanding: true,
          type: "custom",
          render: (row) => {
              return (<TableCell className={"pl_3"}><span className="edit_btn" onClick={() => handleOpenModal("ViewUserTDSReport", row)}>
                  View
                </span>
              </TableCell>
            );
          },
        },
      ];

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

    useEffect(() => {
        if(filterData?.statusValue ==='Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom'  ){
            getGameWiseTDSReportDetails(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
        } else if((filterData?.startDate && filterData?.endDate) || filterData?.statusValue === 'All Days'){
            getGameWiseTDSReportDetails(filterData?.startDate, filterData?.endDate);
        }
    }, [filterData.startDate, filterData.endDate, filterData?.statusValue]);

    const getGameWiseTDSReportDetails = (startDate, endDate, search) => {
        let payload = {
            startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
            endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
            searchText: search
        };
        setLoader(true);
        dispatch(getTdsChallanList(payload)).then(res => {
            setLoader(false)
            setRowDataTotal(res?.data?.data?.totalTDSChallan?.[0])
        });
    };

    useEffect(() => {
        if(filterData?.statusValue ==='Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom'  ){
            getTDSReportDetails(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
        }  if (filterData.startDate && filterData.endDate || filterData?.statusValue === 'All Days') {
            getTDSReportDetails(filterData.startDate, filterData.endDate);
        }
    }, [pagination.rowsPerPage, pagination.page, filterData.exportFile, filterData.csvDownload, filterData.startDate, filterData.endDate, filterData?.statusValue]);


    const getTDSReportDetails = (startDate, endDate, search) => {
        let payload = {
            limit: pagination?.endRange ?  pagination?.endRange : pagination.rowsPerPage  ,
            start:  pagination?.startRange ? (+pagination?.startRange -1) : ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            exportFile: filterData?.exportFile,
            csvDownload: filterData?.csvDownload,
            startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
            endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
            searchText: search
        };
        const filteredPayload = Object.fromEntries(Object.entries(payload).filter(([_, value]) => value !== '' && value !== null))
        setLoader(true);
        dispatch(getTDSUserWiseReportList(filteredPayload)).then(res => {
            setLoader(false)
            if (res?.data?.data?.filePath) {
                clearPaginationAndFilterData(pagination,filterData, setPagination, setFilterData);
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

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop':
            case 'AddWithdrawalProcessingFees':
            case 'DeleteCommonModal':
            case 'ViewUserTDSReport' :
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
            <Paper sx={{ mb: 2 }} className="outer-box">
                <MainCommonFilter
                    filterData={filterData}
                    setFilterData={setFilterData}
                    searchApiHandler={getTDSReportDetails}
                    userSearchApiHandler={getGameWiseTDSReportDetails}
                    pagination={pagination}
                    setPagination={setPagination}
                    addPropsFilter={{userPayment: rowData?.list?.length <= 0, isTdsUser:false, setDateFilter, prevDateFilter }}
                    isSearchTooltip={{ isWithdrawalRequest:true}}
                    handleOpenModal={handleOpenModal}
                    totalDocs={rowData?.totalDocs}
                />
                <div className={'tds_report_all_game tds_challan_user'}>
                    <Paper sx={{ mb: 2 }} className="outer-box tds_challan_table left_margin_challan">
                        <div className={'game_tab_details_box'}>
                            <h4>Total Withdrawal Amount</h4>
                            <BootstrapTooltip  title={<div className={'tooltip_details_revenue'}>
                                <p>Game total withdrawal amount.</p>
                            </div>}>
                                <img src={info} alt={''} />
                            </BootstrapTooltip>
                        </div>
                        <p>{currencyFormat(rowDataTotal?.withdrawalAmount || 0)}</p>
                    </Paper>
                    <Paper sx={{ mb: 2 }} className="outer-box tds_challan_table">
                        <div className={'game_tab_details_box'}>
                            <h4>Total taxable net winnings</h4>
                            <BootstrapTooltip  title={<div className={'tooltip_details_revenue'}>
                                <p>Total Taxable Net Winning Amount.</p>
                            </div>}>
                                <img src={info} alt={''} />
                            </BootstrapTooltip>
                        </div>
                        <p>{currencyFormat(rowDataTotal?.taxableNetWinnings || 0)}</p>
                    </Paper>
                    <Paper sx={{ mb: 2 }} className="outer-box tds_challan_table">
                        <div className={'game_tab_details_box'}>
                            <h4>Total TDS Amount</h4>
                            <BootstrapTooltip  title={<div className={'tooltip_details_revenue'}>
                                <p>{tdsConfigParentage}% of Total Net Win Amount </p>
                            </div>}>
                                <img src={info} alt={''} />
                            </BootstrapTooltip>
                        </div>
                        <p>{currencyFormat(rowDataTotal?.totalTDSAmount || 0)}</p>
                    </Paper>
                    <Paper sx={{ mb: 2 }} className="outer-box tds_challan_table right_margin_challan">
                        <div className={'game_tab_details_box'}>
                            <h4>Net Credited Amount</h4>
                            <BootstrapTooltip  title={<div className={'tooltip_details_revenue'}>
                                <p>Net Credited Amount = Total Winning Amount - Total TDS Amount</p>
                            </div>}>
                                <img src={info} alt={''} />
                            </BootstrapTooltip>
                        </div>
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
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={''} />
            </CommonModal>
        </Box>
    )
}
export default TDSUserReport