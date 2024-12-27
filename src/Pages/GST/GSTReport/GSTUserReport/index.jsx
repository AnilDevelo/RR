import { Box, Paper, TableCell } from '@mui/material';
import MainCommonFilter from 'Components/MainCommonFilter';
import PopComponent from 'hoc/PopContent';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BootstrapTooltip, clearPaginationAndFilterData, currencyFormat } from 'utils';
import info from "../../../../assets/images/info.svg";
import CustomTable from 'hoc/CommonTable';
import CommonModal from 'hoc/CommonModal';
import user from "../../../../assets/images/avatar.png";
import { getGSTConfigPercent, getGstReportList } from 'Redux/GST';
import { getNewGSTConfig } from 'Redux/revenue/action';

const GSTUserReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false)
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0, startRange: '', endRange: '' })
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
  const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
  let Modal = PopComponent[modalDetails.modalName];
  const [filterData, setFilterData] = useState({
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    statusValue: "Today",
    exportFile: false,
    csvDownload: false,
    exportFileName: 'Export File',
    gameQuarter: 'All Quarter'
  });
  const [gstConfigParentage, setGSTConfigParentage] = useState(0);
  const [dateFilter, setDateFilter] = useState(filterData);
  let prevDateFilter = React.useRef(dateFilter);


  const columns = [
    {
      id: "Icon",
      label: " Icon",
      isDisbanding: true,
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell className={"table_icon"}>
            <img src={row?.profileImage || user} alt={""} />
          </TableCell>
        );
      },
    },
    {
      id: 'fullName',
      label: ' Users Name',
    },
    {
      id: '',
      label: 'Total Deposite Amount',
      type: 'custom',
      render: (row) => {
        return <TableCell>{currencyFormat(row?.totalDepositAmount)}</TableCell>
      }
    },
    {
      id: 'totalGSTAmount',
      label: 'Total GST Amount',
      type: 'custom',
      render: (row) => {
        return <TableCell>{currencyFormat(row?.totalGSTAmount)}</TableCell>
      }
    },
    {
      id: '',
      label: 'User GST History',
      type: 'custom',
      render: (row) => {
        return <TableCell className={'pl_3'}> <span className='edit_btn' onClick={() => handleOpenModal('ViewUserGSTReport', row)}>View</span></TableCell>
      }
    },
  ]

    useEffect(() => {
      getGSTConfigHandler();
  }, []);

  const getGSTConfigHandler = () => {
    dispatch(getNewGSTConfig({})).then(res => {
          if (res.data.success) {
              setGSTConfigParentage(res?.data?.data?.platformGST)
          }
      });
  };

  useEffect(() => {
    if (filterData?.statusValue === 'Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom') {
      getGameWiseGSTReportDetails(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
    } else if ((filterData?.startDate && filterData?.endDate) || filterData?.statusValue === 'All Days') {
      getGameWiseGSTReportDetails(filterData?.startDate, filterData?.endDate,filterData.search);
    }
  }, [filterData.startDate, filterData.endDate, filterData?.statusValue,pagination.rowsPerPage, pagination.page,filterData.exportFile,filterData.csvDownload,]);

  const getGameWiseGSTReportDetails = (startDate, endDate, search) => {
    let payload = {
      limit: pagination?.endRange || pagination?.rowsPerPage,
      start: pagination?.startRange ? (+pagination?.startRange - 1) : ((pagination.page + 1) - 1) * pagination.rowsPerPage,
      startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
      endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
      searchText: search,
      exportFile: filterData?.exportFile,
      csvDownload: filterData?.csvDownload,

    };
    setLoader(true);
    dispatch(getGstReportList(payload)).then(res => {
      setLoader(false)
      if (
        pagination?.endRange?.toString() !== "" &&
        pagination?.startRange?.toString() !== ""
      ) {
        clearPaginationAndFilterData(
          pagination,
          filterData,
          setPagination,
          setFilterData
        );
      }
      if (res.data.success) {
        if (res?.data?.data?.filePath) {
          window.open(res?.data?.data?.filePath, "_blank");
        } else {
          setRowData({
            ...rowData,
            list: res?.data?.data || [],
            totalDocs: res.data?.data?.totalDocs || 0,
            finalTotal: res?.data?.data?.finalTotal
          })
        }
      }
    });
  };

  const handleOpenModal = (type, data) => {
    switch (type) {
      case 'CommonPop':
      case 'AddWithdrawalProcessingFees':
      case 'DeleteCommonModal':
      case 'ViewUserGSTReport':
      case 'ExportFilePopup': {
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
          searchApiHandler={getGameWiseGSTReportDetails}
          userSearchApiHandler={getGameWiseGSTReportDetails}
          pagination={pagination}
          setPagination={setPagination}
          addPropsFilter={{ userPayment: rowData?.list?.docs?.length <= 0, isTdsUser: false, setDateFilter, prevDateFilter }}
          isSearchTooltip={{ isWithdrawalRequest: true }}
          handleOpenModal={handleOpenModal}
          totalDocs={rowData?.totalDocs}
        />
        <div className={'tds_report_all_game tds_challan_user'}>

          <Paper sx={{ mb: 2 }} className="outer-box tds_challan_table">
            <div className={'game_tab_details_box'}>
              <h4>Total Deposit Amount</h4>
              <BootstrapTooltip title={<div className={'tooltip_details_revenue'}>
                <p>Total Deposit Amount.</p>
              </div>}>
                <img src={info} alt={''} />
              </BootstrapTooltip>
            </div>
            <p>{currencyFormat(rowData?.list?.finalDepositAmount || 0)}</p>
          </Paper>

          <Paper sx={{ mb: 2 }} className="outer-box tds_challan_table">
            <div className={'game_tab_details_box'}>
              <h4>Total GST Amount</h4>
              <BootstrapTooltip title={<div className={'tooltip_details_revenue'}>
                <p>{gstConfigParentage}% of Total Net Win Amount </p>
              </div>}>
                <img src={info} alt={''} />
              </BootstrapTooltip>
            </div>
            <p>{currencyFormat(rowData?.list?.finalGSTAmount)}</p>
          </Paper>
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

export default GSTUserReport