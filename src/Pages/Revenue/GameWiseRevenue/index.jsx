import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import PopComponent from "../../../hoc/PopContent";
import { useDispatch } from "react-redux";
import MainCommonFilter from "../../../Components/MainCommonFilter";
import moment from "moment";
import { revenueGameWise } from "../../../Redux/revenue/action";
import TableCell from "@mui/material/TableCell";
import { currencyFormat, renderSrNo } from "../../../utils";
import user from "../../../assets/images/avatar.png";

const GameWiseRevenue = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
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
  let Modal = PopComponent[modalDetails.modalName];
  const [filterData, setFilterData] = useState({
    startDate: null,
    endDate: null,
    statusValue: "All Days",
    exportFile: false,
    csvDownload: false,
    search: "",
    filterClose: false,
    exportFileName: "Export File",
  });
  const [dateFilter,setDateFilter] = useState(filterData);
  let prevDateFilter  = React.useRef(dateFilter);

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

  const columns = [
    {
      id: "",
      twoLineText: true,
      label: "Sr. no.",
      type: "custom",
      render: (row, i) => renderSrNo(row, i, pagination),
    },
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
      label: "Game",
    },
    {
      id: "totalusers",
      label: "Downloads",
    },
    {
      id: "gameEarned",
      label: "Revenue Generated",
      type: "custom",
      render: (row) => {
        return <TableCell>{currencyFormat(+row?.gameEarned)}</TableCell>;
      },
    },
  ];

  useEffect(() => {
    if (
      filterData?.statusValue !== "Custom" ||
      (filterData.startDate && filterData.endDate)
    ) {
      getGameWiseRevenueDetails(
        filterData.startDate,
        filterData.endDate,
        filterData.search
      );
    }
  }, [
    pagination.rowsPerPage,
    pagination.page,
    filterData.startDate,
    filterData.endDate,
    filterData.exportFile,
    filterData.csvDownload,
  ]);

  const getGameWiseRevenueDetails = (startDate, endDate, search) => {
    let payload = {
      limit: pagination?.endRange
        ? pagination?.endRange
        : pagination.rowsPerPage,
      start: +pagination?.startRange
        ? +pagination?.startRange
        : (pagination.page + 1 - 1) * pagination.rowsPerPage,
      startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
      endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
      exportFile: filterData?.exportFile,
      csvDownload: filterData?.csvDownload,
      searchText: search,
    };
    Object?.keys(payload).forEach((ele) => {
      if (payload[ele] === "" || payload[ele] === null) {
        delete payload[ele];
      }
    });
    setLoader(true);
    dispatch(revenueGameWise(payload)).then((res) => {
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
      setLoader(false);
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
          list: res.data.data?.gameWiseRevenue,
          totalDocs: res.data.data.totaldocs || 0,
          finalTotal: res?.data?.data?.finalTotal,
        });
      }
    });
  };

  useEffect(() => {
    if(filterData?.statusValue ==='Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom'  ){
        getGameWiseRevenueDetails(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
    } else if (filterData.startDate && filterData.endDate || filterData?.statusValue === 'All Days') {
        getGameWiseRevenueDetails(filterData.startDate, filterData.endDate)
    }
  }, [pagination.rowsPerPage, pagination.page, filterData.startDate, filterData.endDate, filterData.exportFile, filterData.csvDownload, filterData?.statusValue]);
  
  return (
    <Box>
      <div className={"tds_report_all_game"}>
        <Paper sx={{ mb: 2 }} className="outer-box">
                    <h4>Total Games</h4>
                    <p>{rowData?.finalTotal?.totalGames || 0}</p>
        </Paper>
        <Paper sx={{ mb: 2 }} className="outer-box ">
                    <h4>Total Games Download</h4>
                    <p>{rowData?.finalTotal?.totalusers || 0}</p>
        </Paper>
        <Paper sx={{ mb: 2 }} className="outer-box">
          <h4>Total Game Revenue</h4>
          <p>{currencyFormat(rowData?.finalTotal?.totalcommission || 0)}</p>
        </Paper>
      </div>
      <Paper sx={{ mb: 2 }} className="outer-box">
        {/*addPropsFilter={{ revenueGame: true }}*/}
        <div className={"d_flex_between"}>
          <h2>Games ({rowData?.finalTotal?.totalGames})</h2>
          <MainCommonFilter
            filterData={filterData}
            setFilterData={setFilterData}
            searchApiHandler={getGameWiseRevenueDetails}
            pagination={pagination}
            setPagination={setPagination}
            isSearchTooltip={{ isAllGame: true }}
            totalDocs={rowData?.totalDocs}
            handleOpenModal={handleOpenModal}
            addPropsFilter={{
                userPayment: rowData?.list?.length <= 0,
              }}
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
        />
      </CommonModal>
    </Box>
  );
};
export default GameWiseRevenue;
