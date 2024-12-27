import { Box,Paper, TableCell } from '@mui/material'
import MainCommonFilter from 'Components/MainCommonFilter'
import CustomTable from 'hoc/CommonTable'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { clearPaginationAndFilterData, currencyFormat, formatDate } from 'utils'
import { useNavigate } from 'react-router-dom'
import moment from "moment";
import CommonModal from 'hoc/CommonModal'
import { useDispatch } from 'react-redux'
import PopComponent from 'hoc/PopContent'
import { getGameWiseGstReportList } from 'Redux/GST'

const GstFiling = () => {
    const dispatch = useDispatch();
    const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
    const currentYear = moment().format('YYYY');


    const [loader, setLoader] = useState(false)
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0, startRange: '', endRange: '' })
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0, finalTotal: {} });
    const [filterData, setFilterData] = useState({
        startDate:  moment(`${currentYear}-${currentMonth}-01`).format('YYYY-MM-DD'),
        endDate:  moment(moment(`${currentYear}-${currentMonth}-01`).format('YYYY-MM-DD')).endOf('month').format('YYYY-MM-DD'),
        exportFile: false,
        csvDownload: false,
        statusValue: currentMonth,
        exportFileName: 'Export File',
        gameQuarter: 'All Quarter'
    });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [dateFilter, setDateFilter] = useState(filterData);
    let prevDateFilter = React.useRef(dateFilter);

    const getGameWiseGSTReportDetails = (startDate, endDate, search) => {
        let payload = {
            limit: pagination?.endRange || pagination?.rowsPerPage,
            start: pagination?.startRange ? (+pagination?.startRange - 1) : ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            exportFile: filterData?.exportFile,
            csvDownload: filterData?.csvDownload,
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
            searchText: search,
        };
        setLoader(true);
        dispatch(getGameWiseGstReportList(payload)).then(res => {
            setLoader(false)
            if (res?.data?.data?.filePath) {
                clearPaginationAndFilterData(pagination, filterData, setPagination, setFilterData);
                window.open(res?.data?.data?.filePath, '_blank');
            } else {
                setRowData({
                    ...rowData,
                    list: res?.data?.data,
                    totalDocs: res?.data?.data?.totalDocs,
                    finalTotal: res?.data?.data?.finalTotal
                })
            }

        });
    };

    useEffect(() => {
        if (filterData?.statusValue === 'Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom') {
            getGameWiseGSTReportDetails(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
        } else if ((filterData?.startDate && filterData?.endDate) || filterData?.statusValue === 'All Months') {
            getGameWiseGSTReportDetails(filterData.startDate, filterData.endDate);
        }
    }, [pagination.rowsPerPage, pagination.page, filterData.exportFile, filterData.csvDownload, filterData.startDate, filterData.endDate, filterData?.statusValue]);

    useEffect(() => {
        if (filterData.startDate && filterData.endDate && filterData?.statusValue === 'Custom') {
            setPagination({
                ...pagination,
                page: 0
            })
        }

    }, [filterData.startDate, filterData.endDate]);

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop':
            case 'ExportFilePopup': {
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
            type: "custom",
            render: (row, i) => {
              return (
                <TableCell className={"table_icon"}>
                  {+pagination?.rowsPerPage * +pagination?.page + (i + 1)}
                </TableCell>
              );
            },
          },
          {
            label: "Month",
            sortable: false,
            isDisbanding: true,
            type: "custom",
              render: (row, i) => {
              return (
                <TableCell className={"table_icon"}>
                  {moment(
                    moment(`${moment(row?.year).format("YYYY")}-${row?.month}-01`)
                  ).format("MMMM ")}
                </TableCell>
              );
            },
          },
          {
            label: "Year",
            sortable: false,
            isDisbanding: true,
            type: "custom",
            render: (row, i) => {
              return <TableCell className={"table_icon"}>{row?.year}</TableCell>;
            },
          },
        {
            id: 'totalGSTAmount',
            label: 'Total GST Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.totalGSTAmount)}</TableCell>
            }
        },
        {
            id: 'totalDeposit',
            label: 'Total Deposit Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.totalDepositAmount)}</TableCell>
            }
        },
    ];

    return (
        <Box>
            <div className={'gst_report'}>
                <Paper sx={{ mb: 2 }} className="outer-box">
                    <h4>Total Deposit Amount</h4>
                    <p>{currencyFormat(rowData?.list?.finalDepositAmount || 0)}</p>
                </Paper>
                <Paper sx={{ mb: 2 }} className="outer-box">
                    <h4>Total GST Amount</h4>
                    <p>{currencyFormat(rowData?.list?.finalGSTAmount || 0)}</p>
                </Paper>
            </div>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'d_flex_between'}>
                    <h2>GST Report</h2>
                    <MainCommonFilter
                        filterData={filterData}
                        setFilterData={setFilterData}
                        searchApiHandler={getGameWiseGSTReportDetails}
                        addPropsFilter={{ userPayment: rowData?.list?.docs?.length <= 0, setDateFilter, prevDateFilter, isFilterMonth:true}}
                        pagination={pagination}
                        setPagination={setPagination}
                        isSearchTooltip={{ isAllGame: true }}
                        handleOpenModal={handleOpenModal}
                        totalDocs={rowData?.totalDocs}
                    />
                </div>
                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list?.docs}
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

export default GstFiling  