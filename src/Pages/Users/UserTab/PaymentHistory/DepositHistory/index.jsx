import React, { useEffect, useState } from "react";
import CustomTable from "../../../../../hoc/CommonTable";
import moment from "moment";
import TableCell from "@mui/material/TableCell";
import MainCommonFilter from "../../../../../Components/MainCommonFilter";
import {
  ActionFunction,
  clearPaginationAndFilterData,
  currencyFormat,
  renderSrNo,
} from "../../../../../utils";
import { userDepositeHistoryList} from "../../../../../Redux/user/action";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const DepositHistory = ({ handleOpenModal }) => {
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
    dispatch(userDepositeHistoryList(payload)).then((res) => {
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
        window.open(res?.data?.data?.filePath,"_blank");
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
      isDisbanding: true,
      render: (row, i) => renderSrNo(row, i, pagination),
    },
    {
      id: "date",
      numeric: true,
      disablePadding: true,
      label: "Date & Time",
      twoLineText: true,
      type: "custom",
      isDisbanding: true,
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
      isDisbanding: true,
      label: "Order Id",
    },
    {
      id: "",
      disablePadding: false,
      label: "Previous Deposit Amount",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        return <TableCell> {currencyFormat(+row?.previousCash)} </TableCell>;
      },
    },
    {
      id: "amount",
      disablePadding: false,
      isDisbanding: true,
      label: "Amount",
      type: "custom",
      render: (row) => {
        return <TableCell>{currencyFormat(+row?.amount)}</TableCell>;
      },
    },
    {
      id: "",
      disablePadding: false,
      isDisbanding: true,
      label: "GST",
      type: "custom",
      render: (row) => {
        const gstAmount = row?.newGSTAmount !== undefined ? currencyFormat(+row.newGSTAmount) : "-";
        return <TableCell>{gstAmount}</TableCell>;
      },
    },
    {
      id: "",
      disablePadding: false,
      label: "Net Credited Amount",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        const netCreditedAmount = row?.netCreditedAmount !== undefined ? currencyFormat(+row?.netCreditedAmount) : "-";
        return <TableCell>{netCreditedAmount}</TableCell>;
      },
    },
    {
      id: "currentWinCash",
      disablePadding: false,
      label: "Current Deposit Cash",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        return <TableCell>{currencyFormat(+row?.currentCash)}</TableCell>;
      },
    },

    {
      id: "paymentType",
      disablePadding: false,
      label: "Payment Type",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        return <TableCell>{row?.paymentType}</TableCell>;
      },
    },
    {
      id: "status",
      disablePadding: false,
      isDisbanding: true,
      label: "Status",
      type: "custom",
      render: (row) => {
        const capitalizedStatus = row?.status ? row.status.charAt(0).toUpperCase() + row.status.slice(1) : '';
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
    ActionFunction('user', {
      id: 'action',
      label: 'Invoice',
      isDisbanding: true,
      type: 'custom',
      render: (row) => {
        return <TableCell className={'role_field_id'}>
          {row.depositInvoice ? 
            <>
            <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('ViewInvoicePopup', row )}>View</span>
            <span className='edit_btn edit-btn-action prTab'><a href={row?.depositInvoice} className={'edit_btn edit-btn-action'} target={'_blank'} rel="noreferrer" >Download</a></span>
            </>
            : "_"
          }
          </TableCell>
      }

  })
  ];

  return (
    <div className={'mt_2'}>
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
export default DepositHistory;
