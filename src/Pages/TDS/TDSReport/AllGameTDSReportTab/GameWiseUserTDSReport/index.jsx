import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import user from "../../../../../assets/images/avatar.png";
import {
  clearPaginationAndFilterData,
  currencyFormat,
} from "../../../../../utils";
import { getGameWiseUserTDSReportList } from "../../../../../Redux/TDSReport/action";
import Paper from "@mui/material/Paper";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MainCommonFilter from "../../../../../Components/MainCommonFilter";
import CustomTable from "../../../../../hoc/CommonTable";
import moment from "moment";
import PopComponent from "../../../../../hoc/PopContent";
import CommonModal from "../../../../../hoc/CommonModal";

const GameWiseUserTDSReport = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [rowData, setRowData] = useState({
    list: [],
    totalDocs: 0,
    finalTotal: {},
  });
  const [pagination, setPagination] = useState({
    rowsPerPage: 10,
    page: 0,
    startRange: "",
    endRange: "",
  });
  const [filterData, setFilterData] = useState({
    startDate: null,
    endDate: null,
    statusValue: "All Days",
    exportFile: false,
    csvDownload: false,
    exportFileName: "Export File",
    gameQuarter: "All Quarter",
  });
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];
  const [dateFilter,setDateFilter] = useState(filterData);
  let prevDateFilter  = React.useRef(dateFilter);

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
      id: "nickName",
      label: "User Name",
      type: "custom",
      render: (row) => {
        let payload = {
          ...row,
          gameId: id,
        };
        return (
          <TableCell>
            <span
              className="edit_btn edit-btn-action"
              onClick={() =>
                navigate(`/tds-user-report/${row?.userId}`, { state: payload })
              }
            >
              {row?.nickName}
            </span>
          </TableCell>
        );
      },
    },
    {
      id: "totalWininigAmount",
      label: "Total Winning Amount",
      type: "custom",
      render: (row) => {
        return (
          <TableCell>{currencyFormat(+row?.totalWininigAmount)}</TableCell>
        );
      },
    },
    {
      id: "totalNetWinAmount",
      label: "Net Win Amount",
      type: "custom",
      render: (row) => {
        return <TableCell>{currencyFormat(+row?.totalNetWinAmount)}</TableCell>;
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
      label: "Net Credited Amount",
      type: "custom",
      render: (row) => {
        return (
          <TableCell>{currencyFormat(+row?.totalCreditedAmount)}</TableCell>
        );
      },
    },
  ];

  useEffect(() => {
    if(filterData?.statusValue ==='Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom'  ){
      getGameWiseUserTDSReportDetails(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
    } else if (filterData.startDate && filterData.endDate || filterData?.statusValue === 'All Days') {
      getGameWiseUserTDSReportDetails(filterData.startDate, filterData.endDate);
    }
  }, [pagination.rowsPerPage, pagination.page, filterData.exportFile, filterData.csvDownload, filterData.startDate, filterData.endDate, filterData?.statusValue]);

  const getGameWiseUserTDSReportDetails = (startDate, endDate, search) => {
    let payload = {
      limit: pagination?.endRange
        ? pagination?.endRange
        : pagination.rowsPerPage,
      start: +pagination?.startRange
        ? +pagination?.startRange
        : (pagination.page + 1 - 1) * pagination.rowsPerPage,
      gameId: id,
      exportFile: filterData?.exportFile,
      csvDownload: filterData?.csvDownload,
      startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
      endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
      searchText: search,
    };
    Object?.keys(payload).forEach((ele) => {
      if (payload[ele] === "" || payload[ele] === null) {
        delete payload[ele];
      }
    });
    setLoader(true);
    dispatch(getGameWiseUserTDSReportList(payload)).then((res) => {
      setLoader(false);
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
      if (res?.data?.data?.filePath) {
        window.open(res?.data?.data?.filePath,"_blank");
      } else {
        setRowData({
          ...rowData,
          list: res?.data?.data?.gameTdsReport || [],
          totalDocs: res.data?.data?.totalDocs,
          finalTotal: res?.data?.data?.finalTotal,
        });
      }
    });
  };

  useEffect(() => {
    if (
      filterData.startDate &&
      filterData.endDate &&
      filterData?.statusValue === "Custom"
    ) {
      setPagination({
        ...pagination,
        page: 0,
      });
      getGameWiseUserTDSReportDetails(filterData.startDate, filterData.endDate);
    }
  }, [filterData.startDate, filterData.endDate]);

  const handleOpenModal = (type, data) => {
    switch (type) {
      case "CommonPop": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "ExportFilePopup": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      default: {
        setModalDetails({ ...modalDetails, modalIsOpen: false });
      }
    }
  };

  return (
    <>
      <div className={"tds-all-user-section"}>
        <Paper sx={{ mb: 2 }} className="outer-box">
          <div className={"tds-main-section"}>
            <button className={"tds-back-btn"} onClick={() => navigate(-1)}>
              {" "}
              <KeyboardArrowLeftIcon /> Back
            </button>
            <h2>{state?.gameName} Game </h2>
          </div>
        </Paper>
      </div>

      <div className={"tds_report_all_game"}>
        <Paper sx={{ mb: 2 }} className="outer-box">
          <h4>Total Winning Amount</h4>
          <p>{currencyFormat(rowData?.finalTotal?.finalUserWininigAmount)}</p>
        </Paper>
        <Paper sx={{ mb: 2 }} className="outer-box ">
          <h4>TDS Amount</h4>
          <p>{currencyFormat(rowData?.finalTotal?.finalUserTDSAmount)}</p>
        </Paper>
        <Paper sx={{ mb: 2 }} className="outer-box">
          <h4>Net Credited Amount</h4>
          <p>{currencyFormat(rowData?.finalTotal?.finalUserCreditedAmount)}</p>
        </Paper>
      </div>

      <Paper sx={{ mb: 2 }} className="outer-box">
        <div className={"admin_user_list winner_section"}>
          <h2>
            {state?.gameName} Game ({rowData?.totalDocs}) User
          </h2>
          <MainCommonFilter
            filterData={filterData}
            setFilterData={setFilterData}
            searchApiHandler={getGameWiseUserTDSReportDetails}
            pagination={pagination}
            setPagination={setPagination}
            addPropsFilter={{ userPayment: rowData?.list?.length <= 0 }}
            isSearchTooltip={{ isWithdrawalRequest: true }}
            handleOpenModal={handleOpenModal}
            totalDocs={rowData?.totalDocs}
          />
        </div>
        <CustomTable
          headCells={columns}
          rowData={rowData?.list}
          totalDocs={rowData?.totalDocs}
          pagination={pagination}
          setPagination={setPagination}
          dragUpdater={""}
          loading={loader}
        />
        <CommonModal
          className={"Approved-reject-section"}
          modalIsOpen={modalDetails.modalIsOpen}
          handleOpenModal={handleOpenModal}
        >
          <Modal
            modalValue={modalDetails.modalValue}
            handleOpenModal={handleOpenModal}
            modalIsOpen={modalDetails.modalIsOpen}
            redirectApiHandler={""}
          />
        </CommonModal>
      </Paper>
    </>
  );
};
export default GameWiseUserTDSReport;
