import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import TableCell from "@mui/material/TableCell";
import moment from "moment";
import { analyticsDailyReport } from "../../../Redux/AnalyticsReport/action";
import AnalyticsFilter from "../AnalyticFilter";

const DailyReport = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  const [rowData, setRowData] = useState({
    list: [],
    totalDocs: 0,
    totalDownloads: 0,
  });
  let Modal = PopComponent[modalDetails.modalName];
  const [pagination, setPagination] = useState({
    rowsPerPage: 10,
    page: 0,
    startRange: "",
    endRange: "",
  });
  const [filterData, setFilterData] = useState({
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    statusValue: "Today",
    exportFile: false,
    csvDownload: false,
    exportFileName: "Export File",
    gameId: "",
    gameName: "All Game",
  });
  const [dateFilter,setDateFilter] = useState(filterData);
  let prevDateFilter  = React.useRef(dateFilter);

  const columns = [
    {
      id: "",
      twoLineText: true,
      label: "Sr. no.",
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell>
            {+pagination?.rowsPerPage * (+pagination?.page + 1 - 1) + i + 1}
          </TableCell>
        );
      },
    },
    {
      id: "date",
      label: "Date",
      twoLineText: true,
    },
    {
      id: "dailyInstalls",
      label: "Daily Downloads",
    },
    {
      id: "dailyUninstalls",
      label: "Uninstall No.",
    },
    {
      id: "dailyActiveUser",
      label: "Daily Active Users",
    },
    {
      id: "dailyDepositCash",
      label: "Daily Deposit Cash",
    },
    {
      id: "dailyWithdrawalCash",
      label: "Daily Withdraw Cash",
    },
  ];

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
      case "AddBot": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "DeleteCommonModal": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "ViewRejectedComment": {
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

  useEffect(() => {
    if(filterData?.statusValue ==='Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom'  ){
        getDailyReportList(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
    } else if (filterData.startDate && filterData.endDate || filterData?.statusValue === 'All Days' ) {
        getDailyReportList(filterData.startDate, filterData.endDate)
    }
}, [ filterData.startDate, filterData.endDate, filterData.exportFile, filterData.csvDownload, filterData?.statusValue])

  const getDailyReportList = (startDate, endDate) => {
    const { exportFile, csvDownload } = filterData;
    let payload = {
      startDate: startDate,
      endDate: endDate,
      exportFile,
      csvDownload,
    };
    setLoader(true);
    dispatch(analyticsDailyReport(payload)).then((res) => {
      setLoader(false);
      if (res?.data?.data?.filePath) {
        setFilterData({
          ...filterData,
          exportFileName: "Export File",
          csvDownload: false,
          exportFile: false,
        });
        window.open(res?.data?.data?.filePath,"_blank");
      } else {
        setRowData({
          ...rowData,
          list: res?.data?.data?.responseData,
          totalDownloads: res?.data?.data?.totals.totalInstalls,
        });
      }
    });
  };

  const displayedRows = useMemo(() => {
    // Calculate the index range of rows to display based on pagination
    const startIndex = pagination.page * pagination.rowsPerPage;
    const endIndex = startIndex + pagination.rowsPerPage;
    return rowData?.list?.slice(startIndex, endIndex);
  }, [rowData, pagination.page, pagination.rowsPerPage]);
   
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
        <div className={"d_flex justify_content_between daily_report_section"}>
          <div className={""}>
            <h2>
              Total Downloads : {rowData?.totalDownloads}{" "}
              <span>{`(${moment().format("DD.MM.YYYY, hh:mm A")})`}</span>
            </h2>
          </div>
          <AnalyticsFilter
            filterData={filterData}
            isGSTHistory={true}
            setFilterData={setFilterData}
            isDailyReport={true}
            addPropsFilter={{
              isPlatform: true,
              userPayment: displayedRows?.length <= 0,
            }}
            handleOpenModal={handleOpenModal}
            totalDocs={rowData?.list?.length}
          />
        </div>
        <CustomTable
          headCells={columns}
          rowData={displayedRows}
          totalDocs={rowData?.list?.length}
          loading={loader}
          pagination={pagination}
          setPagination={setPagination}
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
          redirectApiHandler={getDailyReportList}
        />
      </CommonModal>
    </Box>
  );
};
export default DailyReport;
