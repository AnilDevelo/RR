import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import user from "../../../../assets/images/avatar.png";
import {
  clearPaginationAndFilterData,
  currencyFormat,
  formatDate,
} from "../../../../utils";
import { getGameWiseTdsReportList } from "../../../../Redux/TDSReport/action";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MainCommonFilter from "../../../../Components/MainCommonFilter";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import PopComponent from "../../../../hoc/PopContent";
import moment from "moment";

const AllGameTDSReportTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [pagination, setPagination] = useState({
    rowsPerPage: 10,
    page: 0,
    startRange: "",
    endRange: "",
  });
  const [rowData, setRowData] = useState({
    list: [],
    totalDocs: 0,
    finalTotal: {},
  });
  const [filterData, setFilterData] = useState({
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    statusValue: "Today",
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
            <img src={row?.gameIcon || user} alt={""} />
          </TableCell>
        );
      },
    },
    {
      id: "gameName",
      label: " Game Name",
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            <span
              className="edit_btn edit-btn-action"
              onClick={() =>
                navigate(`/game-user-tds-report/${row?._id}`, { state: row })
              }
            >
              {row?.gameName}
            </span>
          </TableCell>
        );
      },
    },
    {
      id: "totalCreditedAmount",
      label: "Total Winning Amount",
      type: "custom",
      render: (row) => {
        return (
          <TableCell>{currencyFormat(+row?.totalWininigAmount)}</TableCell>
        );
      },
    },
    {
      id: "totalCreditedAmount",
      label: "Total Net Winning Amount",
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
      id: "totalTDSAmount",
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
        getGameWiseTDSReportDetails(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
    } else if((filterData?.startDate && filterData?.endDate) || filterData?.statusValue === 'All Days'){
       getGameWiseTDSReportDetails(filterData.startDate, filterData.endDate);
   }
}, [pagination.rowsPerPage, pagination.page, filterData.exportFile, filterData.csvDownload, filterData.startDate, filterData.endDate, filterData?.statusValue]);

  const getGameWiseTDSReportDetails = (startDate, endDate, search) => {
    let payload = {
      limit: pagination?.endRange || pagination?.rowsPerPage,
      start:
        +pagination?.startRange ||
        (pagination.page + 1 - 1) * pagination.rowsPerPage,
      exportFile: filterData?.exportFile,
      csvDownload: filterData?.csvDownload,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      searchText: search,
    };
    setLoader(true);
    dispatch(getGameWiseTdsReportList(payload)).then((res) => {
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
          list: res?.data?.data?.docs,
          totalDocs: res?.data?.data?.totalDocs,
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
    }
  }, [filterData.startDate, filterData.endDate]);

  const handleOpenModal = (type, data) => {
    switch (type) {
      case "CommonPop":
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
    <Box>
      <div className={"tds_report_all_game"}>
        <Paper sx={{ mb: 2 }} className="outer-box">
          <h4>Total Winning Amount</h4>
          <p>{currencyFormat(rowData?.finalTotal?.finalWinningAmount || 0)}</p>
        </Paper>
        <Paper sx={{ mb: 2 }} className="outer-box">
          <h4>Net Winning Amount</h4>
          <p>
            {currencyFormat(rowData?.finalTotal?.finalNetWinningdAmount || 0)}
          </p>
        </Paper>
        <Paper sx={{ mb: 2 }} className="outer-box ">
          <h4>TDS Amount</h4>
          <p>{currencyFormat(rowData?.finalTotal?.finalTDSAmount || 0)}</p>
        </Paper>
        <Paper sx={{ mb: 2 }} className="outer-box">
          <h4>Net Credited Amount</h4>
          <p>{currencyFormat(rowData?.finalTotal?.finalCreditedAmount || 0)}</p>
        </Paper>
      </div>
      <Paper sx={{ mb: 2 }} className="outer-box">
        <div className={"d_flex_between"}>
          <h2>TDS Game</h2>
          <MainCommonFilter
            filterData={filterData}
            setFilterData={setFilterData}
            searchApiHandler={getGameWiseTDSReportDetails}
            addPropsFilter={{ userPayment: rowData?.list?.length <= 0 }}
            pagination={pagination}
            setPagination={setPagination}
            isSearchTooltip={{ isAllGame: true }}
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
          loading={loader}
        />
      </Paper>
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
    </Box>
  );
};
export default AllGameTDSReportTab;
