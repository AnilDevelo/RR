import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../../hoc/CommonTable";
import moment from "moment";
import TableCell from "@mui/material/TableCell";
import MainCommonFilter from "../../../../../Components/MainCommonFilter";
import {
  clearPaginationAndFilterData,
  currencyFormat,
  renderSrNo,
} from "../../../../../utils";
import { userPWithdrawlHistoryList, userPaymentHistoryList } from "../../../../../Redux/user/action";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../../../../images/Loader";
import Box from "@mui/material/Box";

const WithdrawalHistory = ({ handleOpenModal }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });

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
  const [pagination, setPagination] = useState({
    rowsPerPage: 10,
    page: 0,
    startRange: "",
    endRange: "",
  });
  const [dateFilter, setDateFilter] = useState(filterData);
  let prevDateFilter = React.useRef(dateFilter);

  useEffect(() => {
    if (
      filterData?.statusValue === "Custom" &&
      filterData.startDate === null &&
      filterData.endDate === null &&
      prevDateFilter?.current?.statusValue !== "Custom"
    ) {
      getUserReportedListData(
        prevDateFilter?.current?.startDate,
        prevDateFilter?.current?.endDate
      );
    } else if (
      (filterData.startDate && filterData.endDate) ||
      filterData?.statusValue === "All Days"
    ) {
      getUserReportedListData(filterData.startDate, filterData.endDate);
    }
  }, [
    pagination.rowsPerPage,
    pagination.page,
    filterData.exportFile,
    filterData.csvDownload,
    filterData.startDate,
    filterData.endDate,
    filterData?.statusValue,
  ]);

  //get Api details code
  const getUserReportedListData = (startDate, endDate, search) => {
    setLoader(true);
    let payload = {
      limit: pagination?.endRange
        ? pagination?.endRange
        : pagination.rowsPerPage,
      start: +pagination?.startRange
        ? +pagination?.startRange
        : (pagination.page + 1 - 1) * pagination.rowsPerPage,
      searchText: search,
      startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
      endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
      exportFile: filterData?.exportFile,
      csvDownload: filterData?.csvDownload,
      userId: id,
    };
    dispatch(userPWithdrawlHistoryList(payload)).then((res) => {
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
      if (res?.data?.data?.filePath && res.data.success) {
        window.open(res?.data?.data?.filePath, "_blank");
      }
      if (res.data.success) {
        setRowData({
          ...rowData,
          list: res.data.data?.docs,
          totalDocs: res.data.data.totalDocs,
        });
      }
    });
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
      id: "date",
      numeric: true,
      disablePadding: true,
      label: "Date & Time",
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
      id: "orderId",
      numeric: true,
      disablePadding: false,
      label: "Order Id",
    },
    {
      id: "previousWinCash",
      disablePadding: false,
      label: "Previous Winning Amount",
      type: "custom",
      render: (row) => {
        return <TableCell> {currencyFormat(+row?.previousWinCash)} </TableCell>;
      },
    },
    {
      numeric: true,
      label: "Amount",
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell>
            {row?.paymentType === "Withdrawals"
              ? currencyFormat(+row?.amountBeforeProccessingFee)
              : "-"}
          </TableCell>
        );
      },
    },
    // {
    //   id: "tdsPercentage",
    //   disablePadding: false,
    //   label: "TDS Percentage",
    //   type: "custom",
    //   render: (row) => {
    //     return (
    //       <TableCell>
    //         {row?.tdsPercentage ? `${row?.tdsPercentage}%` : "-"}
    //       </TableCell>
    //     );
    //   },
    // },
    // {
    //   id: "tdsAmount",
    //   disablePadding: false,
    //   label: "TDS Amount",
    //   type: "custom",
    //   render: (row) => {
    //     return (
    //       <TableCell>
    //         {row?.tdsAmount ? currencyFormat(+row?.tdsAmount) : "-"}
    //       </TableCell>
    //     );
    //   },
    // },
    // {
    //   id: "previousWinCash",
    //   disablePadding: false,
    //   label: "Previous Winning Amount",
    //   type: "custom",
    //   render: (row) => {
    //     return <TableCell> {currencyFormat(+row?.previousWinCash)} </TableCell>;
    //   },
    // },
    {
      id: "amount",
      disablePadding: false,
      label: "Net Amount",
      type: "custom",
      render: (row) => {
        return <TableCell>{currencyFormat(+row?.amount)}</TableCell>;
      },
    },
    // {
    //     id: 'processingFee',
    //     numeric: false,
    //     disablePadding: false,
    //     label: 'Withdrawal Processing Fee',
    //     type: 'custom',
    //     render: (row) => {
    //         return <TableCell className={'pl_3'} >{row?.paymentType === 'Withdrawals' ?  currencyFormat(+row?.processingFee) : "-"}</TableCell>
    //     }
    // },
    {
      id: "currentWinCash",
      disablePadding: false,
      label: "Current Win Cash",
      type: "custom",
      render: (row) => {
        return <TableCell>{currencyFormat(+row?.currentWinCash)}</TableCell>;
      },
    },

    {
      id: "paymentType",
      disablePadding: false,
      label: "Payment Type",
      type: "custom",
      render: (row) => {
        return <TableCell>{row?.paymentType}</TableCell>;
      },
    },
    {
      id: "status",
      disablePadding: false,
      label: "Status",
      type: "custom",
      render: (row) => {
        const capitalizedStatus = row?.status
          ? row.status.charAt(0).toUpperCase() + row.status.slice(1)
          : "";
        return (
          <TableCell>
            <span
              className={
                row?.status === "processed"
                  ? "green_filed"
                  : row?.status === "processing"
                  ? "yellow_field"
                  : row?.status === "reversed"
                  ? "red_filed"
                  : "red_filed"
              }
            >
              {capitalizedStatus}
            </span>
          </TableCell>
        );
      },
    },
  ];

  return (
    <div className={"mt_2"}>
      {" "}
      <MainCommonFilter
        filterData={filterData}
        setFilterData={setFilterData}
        addPropsFilter={{
          userPayment: rowData?.list?.length <= 0,
          isTransactions: true,
        }}
        searchApiHandler={getUserReportedListData}
        pagination={pagination}
        setPagination={setPagination}
        handleOpenModal={handleOpenModal}
        totalDocs={rowData?.totalDocs}
      />
      <CustomTable
        headCells={columns}
        rowData={rowData?.list}
        totalDocs={rowData?.totalDocs}
        pagination={pagination}
        setPagination={setPagination}
        loading={loader}
      />
    </div>
  );
};
export default WithdrawalHistory;
