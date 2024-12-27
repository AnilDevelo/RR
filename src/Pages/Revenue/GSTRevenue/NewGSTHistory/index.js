import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import {BootstrapTooltip, clearPaginationAndFilterData, currencyFormat} from "../../../../utils";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import PopComponent from "../../../../hoc/PopContent";
import MainCommonFilter from "../../../../Components/MainCommonFilter";
import moment from "moment";
import info from "../../../../assets/images/info.svg";
import { getNewGSTHistory, getNewGSTHistoryTotalRevenue } from "Redux/revenue/action";

const NewGSTHistory = () => {
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
        search: "",
        csvDownload: false,
        exportFileName: 'Export File',
        gameQuarter: 'All Quarter'
    });
    const [rowDataTotal,setRowDataTotal] = useState({});
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
                  onClick={() => navigate(`/users-tab/${row?.userId?._id}`)}
                >{`UID000${row?.userId?.numericId}`}</span>
              </TableCell>
            );
          },
        },
        {
          id: "",
           label: " Users Name",
            type: "custom",
            render: (row) => {
            return <TableCell>{row?.userId?.nickName}</TableCell>;
          },
        },
        {
          id: "gameName",
          label: "Game Name",
        },
        {
            id: "",
            label: "Entry Fees",
            isDisbanding: true,
            type: "custom",
            render: (row) => {
            return <TableCell>{currencyFormat(+row?.entryFee)}</TableCell>;
          },
          },
        {
          label: "GST",
          id: "gst",
          type: "custom",
          isDisbanding: true,
          render: (row) => {
            return <TableCell>{currencyFormat(+row?.platformGSTAmount)}</TableCell>;
          },
        },
      ];


    const getGameWiseNewGSTReportDetails = (startDate, endDate, search) => {
        let payload = {
            startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
            endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
            searchText: search
        };
        setLoader(true);
        dispatch(getNewGSTHistoryTotalRevenue(payload)).then(res => {
            setLoader(false)
            setRowDataTotal(res?.data?.data[0])
        });
    };

    useEffect(() => {
        if(filterData?.statusValue ==='Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom'  ){
            getNewGSTReportDetails(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
            getGameWiseNewGSTReportDetails()
        }  if (filterData.startDate && filterData.endDate || filterData?.statusValue === 'All Days') {
            getNewGSTReportDetails(filterData.startDate, filterData.endDate, filterData.search);
            getGameWiseNewGSTReportDetails()
        }
    }, [pagination.rowsPerPage, pagination.page, filterData.exportFile, filterData.csvDownload, filterData.startDate, filterData.endDate, filterData?.statusValue]);


    const getNewGSTReportDetails = (startDate, endDate, search) => {
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
        dispatch(getNewGSTHistory(filteredPayload)).then(res => {
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

    useEffect(() => {
        setPagination({
          rowsPerPage: 10,
          page: 0,
          startRange: "",
          endRange: "",
        })
      }, [filterData?.statusValue])
    return (
        <Box>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <MainCommonFilter
                    filterData={filterData}
                    setFilterData={setFilterData}
                    searchApiHandler={getNewGSTReportDetails}
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
                            <h4>Entry Fees</h4>
                            <BootstrapTooltip  title={<div className={'tooltip_details_revenue'}>
                                <p>Game total Entry Fees amount.</p>
                            </div>}>
                                <img src={info} alt={''} />
                            </BootstrapTooltip>
                        </div>
                        <p>{currencyFormat(rowDataTotal?.totalEntryFee || 0)}</p>
                    </Paper>
                    <Paper sx={{ mb: 2 }} className="outer-box tds_challan_table">
                        <div className={'game_tab_details_box'}>
                            <h4>GST</h4>
                            <BootstrapTooltip  title={<div className={'tooltip_details_revenue'}>
                                <p>Total GST Amount.</p>
                            </div>}>
                                <img src={info} alt={''} />
                            </BootstrapTooltip>
                        </div>
                        <p>{currencyFormat(rowDataTotal?.platformGSTAmount || 0)}</p>
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
export default NewGSTHistory