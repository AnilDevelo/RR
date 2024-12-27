import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import { currencyFormat } from "../../../../../utils";
import moment from "moment";
import Loader from "../../../../../images/Loader";
import Paper from "@mui/material/Paper";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import CustomTable from "../../../../../hoc/CommonTable";
import { getParticularUserTDSReportList } from "../../../../../Redux/TDSReport/action";
import MainCommonFilter from "../../../../../Components/MainCommonFilter";
import PopComponent from "hoc/PopContent";
import CommonModal from "hoc/CommonModal";

const ParticularUserWiseTDSReport = () => {
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
      id: "",
      label: "Date",
      twoLineText: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {moment(row?.createdAt).format("MMM DD YYYY, hh:mm A")}
          </TableCell>
        );
      },
    },
    {
      id: "tournamentLobbyType",
      label: "Game Mode",
      type: "custom",
      render: (row) => {
        return (
          <TableCell>{row?.playedGameId?.gameModeId?.gameModeName}</TableCell>
        );
      },
    },
    {
      id: "entryFee",
      label: "Entry Fees",
      type: "custom",
      render: (row) => {
        return <TableCell>{currencyFormat(+row?.entryFee)}</TableCell>;
      },
    },
    {
      id: "totalCreditedAmount",
      label: "Rank",
      type: "custom",
      render: (row) => {
        return <TableCell>{row?.playedGameId?.rank}</TableCell>;
      },
    },
    {
      id: "totalCreditedAmount",
      label: "Score",
      type: "custom",
      render: (row) => {
        return <TableCell>{row?.playedGameId?.score?.toFixed(2)}</TableCell>;
      },
    },
    {
      id: "totalCreditedAmount",
      label: "Battle Status",
      type: "custom",
      render: (row) => {
        //winStatus
        return <TableCell>{row?.playedGameId?.winStatus}</TableCell>;
      },
    },

    {
      id: "wininigAmount",
      label: "Total Winning Amount",
      type: "custom",
      render: (row) => {
        return <TableCell>{currencyFormat(+row?.wininigAmount)}</TableCell>;
      },
    },
    {
      id: "netWinAmount",
      label: "Net Win Amount",
      type: "custom",
      render: (row) => {
        return <TableCell>{currencyFormat(+row?.netWinAmount)}</TableCell>;
      },
    },
    {
      id: "creditedAmount",
      label: "Net Credited Amount",
      type: "custom",
      render: (row) => {
        return <TableCell>{currencyFormat(+row?.creditedAmount)}</TableCell>;
      },
    },
    {
      id: "tdsAmount",
      label: "TDS Amount",
      type: "custom",
      render: (row) => {
        return <TableCell>{currencyFormat(+row?.tdsAmount)}</TableCell>;
      },
    },
  ];

  useEffect(() => {
    if(filterData?.statusValue ==='Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom'  ){
        getParticularTDSReportDetails(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
    } else if (filterData.startDate && filterData.endDate || filterData?.statusValue === 'All Days') {
        getParticularTDSReportDetails(filterData.startDate, filterData.endDate)
    }
}, [pagination.rowsPerPage, pagination.page, filterData.exportFile, filterData.csvDownload, filterData.startDate, filterData.endDate, filterData?.statusValue]);

  const getParticularTDSReportDetails = (startDate, endDate) => {
    let payload = {
      limit: pagination?.endRange
        ? pagination?.endRange
        : pagination.rowsPerPage,
      start: +pagination?.startRange
        ? +pagination?.startRange
        : (pagination.page + 1 - 1) * pagination.rowsPerPage,
      userId: id,
      exportFile: filterData?.exportFile,
      csvDownload: filterData?.csvDownload,
      startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
      endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
    };
    Object?.keys(payload).forEach((ele) => {
      if (payload[ele] === "" || payload[ele] === null) {
        delete payload[ele];
      }
    });
    setLoader(true);
    dispatch(getParticularUserTDSReportList(payload)).then((res) => {
      setLoader(false);
      if (
        pagination?.endRange?.toString() !== "" &&
        pagination?.startRange?.toString() !== ""
      ) {
        setPagination({
          ...pagination,
          startRange: "",
          endRange: "",
          rowsPerPage: 10,
          page: 0,
        });
        setFilterData({
          ...filterData,
          csvDownload: false,
          exportFile: false,
          exportFileName: "Export File",
        });
      }
      if (res?.data?.data?.filePath) {
        setFilterData({
          ...filterData,
          csvDownload: false,
          exportFile: false,
        });
        window.open(res?.data?.data?.filePath,"_blank");
      } else {
        setRowData({
          ...rowData,
          list: res?.data?.data?.docs || [],
          totalDocs: res.data?.data?.totalDocs || 0,
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
      getParticularTDSReportDetails(filterData.startDate, filterData.endDate);
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
      {/* {loader ? <Loader /> : ""} */}

      <div className={"tds-all-user-section"}>
        <Paper sx={{ mb: 2 }} className="outer-box">
          <div className={"tds-main-section"}>
            <button className={"tds-back-btn"} onClick={() => navigate(-1)}>
              {" "}
              <KeyboardArrowLeftIcon /> Back
            </button>
            <h2>{`${state?.gameName} Game > ${state?.userName}`} </h2>
          </div>
        </Paper>
      </div>

      <div className={"tds_report_all_game"}>
        <Paper sx={{ mb: 2 }} className="outer-box">
          <h4>Total Winning Amount</h4>
          <p>{currencyFormat(rowData?.finalTotal?.finalWinningAmount)}</p>
        </Paper>
        <Paper sx={{ mb: 2 }} className="outer-box ">
          <h4>TDS Amount</h4>
          <p>{currencyFormat(rowData?.finalTotal?.finalTDSAmount)}</p>
        </Paper>
        <Paper sx={{ mb: 2 }} className="outer-box">
          <h4>Net Credited Amount</h4>
          <p>{currencyFormat(rowData?.finalTotal?.finalCreditedAmount)}</p>
        </Paper>
      </div>

      <Paper sx={{ mb: 2 }} className="outer-box">
        <div className={"admin_user_list winner_section"}>
          <h2>{state?.userName}</h2>
          {/*<DateRangPicker/>*/}

          <MainCommonFilter
            filterData={filterData}
            setFilterData={setFilterData}
            addPropsFilter={{
              tdsUser: true,
              userPayment: rowData?.list?.length <= 0,
            }}
            searchApiHandler={getParticularTDSReportDetails}
            pagination={pagination}
            setPagination={setPagination}
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
export default ParticularUserWiseTDSReport;
