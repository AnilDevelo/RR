import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PopComponent from "../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import moment from "moment";
import { currencyFormat } from "../../../../utils";
import {
  getMGPWalletsHistory,
  getTransactionTypePlatformReport,
} from "../../../../Redux/revenue/action";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import AnalyticsFilter from "../../../Analytics/AnalyticFilter";
import TableLoader from "hoc/CommonTable/TableLoader";

const PlatformReportTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0, startRange: '' , endRange: '' });
  const [rowData, setRowData] = useState({
    list: [],
    totalDocs: 0,
    finalTotal: {},
    TotalWallet: {},
  });
  const [transactionType, setTransactionType] = useState([]);
  let Modal = PopComponent[modalDetails.modalName];
  const [filterData, setFilterData] = useState({
    //startDate: moment().subtract(6, "days").format("YYYY-MM-DD"),
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    statusValue: "Today",
    exportFile: false,
    csvDownload: false,
    exportFileName: "Export File",
    statusField: "All Transaction Type",
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
      label: "Sr. No.",
      isDisbanding: true,
      twoLineText:true,
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell>
            {pagination?.rowsPerPage * +pagination?.page + (i + 1)}
          </TableCell>
        );
      },
    },
    {
      id: "id",
      numeric: false,
      disablePadding: false,
      twoLineText:true,
      label: "Users ID",
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell>
            <span
              className="edit_btn"
              onClick={() => navigate(`/users-tab/${row.userId?._id}`)}
            >{`UID000${row?.userId?.numericId}`}</span>
          </TableCell>
        );
      },
    },
    // {
    //     id: 'nickName',
    //     numeric: true,
    //     disablePadding: false,
    //     label: 'Full Name',
    //     type: 'custom',
    //     render: (row, i) => {
    //         return <TableCell>{row?.userId?.fullName}</TableCell>
    //     }
    // },
    {
      id: "nickName",
      numeric: true,
      disablePadding: false,
      twoLineText:true,
      label: "Users Name",
      type: "custom",
      render: (row, i) => {
        return <TableCell>{row?.userId?.nickName}</TableCell>;
      },
    },
    {
      id: "",
      label: " Date & Time",
      twoLineText: true,
      isDisbanding: true,
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
      id: "transactionType",
      label: "Transaction Type",
      twoLineText:true,
    },
    {
      id: "amount",
      label: "Amount",
      twoLineText:true,
      type: "custom",
      render: (row) => {
        return <TableCell>{currencyFormat(+row?.amount)}</TableCell>;
      },
    },
    {
      id: "depositeInto",
      label: "Wallet Type",
      type: "custom",
      twoLineText:true,
      render: (row) => {
        return (
          <TableCell>
            {
              row?.walletTypeDescription
              // (row?.transactionType === 'Add Cash' || row?.transactionType === 'Withdrawal') ?
              //     row?.depositeInto === 'WinCash' ? `  ${row?.paymentType} in User's Winning Wallet` :
              //         row?.depositeInto === 'DepositCash' ? `  ${row?.paymentType} in User's Winning Wallet`
              //             : row?.depositeInto === 'Bonus' && `  ${row?.paymentType} in User's Winning Wallet`
              //     : row?.depositeInto === 'WinCash' ? `${row?.paymentType === 'Debited' ? "Credited in User's Winning Wallet" : "Debited in User's Winning Wallet" }` :
              //     row?.depositeInto === 'DepositCash' ? `${row?.paymentType === 'Debited' ? "Credited in User's Deposit Wallet" : "Debited in User's Deposit Wallet" }` :
              //         row?.depositeInto === 'Bonus' && `${row?.paymentType === 'Debited' ? "Credited in User's Bonus Wallet" : "Debited in User's Bonus Wallet" }`
            }
          </TableCell>
        );
      },
    },
    {
      id: "paymentType",
      label: "Status",
      twoLineText:true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {
              row?.walletStatusDescription
              // (row?.transactionType === 'Add Cash' || row?.transactionType === 'Withdrawal') ?
              // `${row?.paymentType} from MGP Platform Wallet`
              // : row?.paymentType === "Debited" ? 'Debited from MGP Platform Wallet' : 'Credited to MGP Platform Wallet'
            }
          </TableCell>
        );
        // return <TableCell >{row?.paymentType === "Debited" ? 'Debited from MGP Platform Wallet' : 'Credited to MGP Platform Wallet'}</TableCell>
      },
    },
  ];

  useEffect(() => {
    if(filterData?.statusValue ==='Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom'  ){
        getMGPWalletsHistoryDetails(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
    } else if (filterData?.startDate && filterData?.endDate || filterData?.statusValue === 'All Days') {
        getMGPWalletsHistoryDetails(filterData.startDate, filterData.endDate)
    }
}, [pagination.rowsPerPage, pagination.page, filterData.exportFile, filterData.csvDownload, filterData.startDate, filterData.endDate, filterData?.statusField, filterData?.statusValue ]);

  const getMGPWalletsHistoryDetails = (startDate, endDate) => {
    let payload = {
      limit: pagination?.endRange ?  pagination?.endRange : pagination.rowsPerPage  ,
      start: +pagination?.startRange ? +pagination?.startRange :   ((pagination.page + 1) - 1) * pagination.rowsPerPage,
      startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
      endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
      exportFile: filterData?.exportFile,
      csvDownload: filterData?.csvDownload,
      searchText:
        filterData?.statusField === "All Transaction Type"
          ? ""
          : filterData?.statusField,
    };
    Object?.keys(payload).forEach((ele) => {
      if (payload[ele] === "" || payload[ele] === null) {
        delete payload[ele];
      }
    });
    setLoader(true);
    dispatch(getMGPWalletsHistory(payload)).then((res) => {
      setLoader(false);
      if(pagination?.endRange?.toString() !== '' && pagination?.startRange?.toString() !== '' ){
        setPagination({
            ...pagination,
            startRange:'',
            endRange: '',
            rowsPerPage: 10,
            page:0
        })
        setFilterData({
            ...filterData,
            csvDownload: false,
            exportFile: false,
            exportFileName: 'Export File'
        })
    }
      if (res.data.success) {
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
            list: res.data.data?.docs,
            totalDocs: res.data.data.totalDocs || 0,
            TotalWallet: {
              totalBonus: res?.data?.data?.totalBonus,
              totalWinCash: res?.data?.data?.totalWinCash,
              totalDepositCash: res?.data?.data?.totalDepositCash,
              TotalMgpWallet: res?.data?.data?.TotalMgpWallet,
              totalTransactionTypeWise:
                res?.data?.data?.totalTransactionTypeWise,
            },
          });
        }
      }
    });
  };

  useEffect(() => {
    setLoader(true);
    dispatch(getTransactionTypePlatformReport()).then((res) => {
      setTransactionType(["All Transaction Type", ...res?.data?.data]);
    });
  }, []);

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
      getMGPWalletsHistoryDetails(filterData.startDate, filterData.endDate);
    }
  }, [filterData.startDate, filterData.endDate]);

  useEffect(() => {
    setPagination({
      rowsPerPage: 10,
      page: 0,
      startRange: "",
      endRange: "",
    })
  }, [filterData?.statusField, filterData?.statusValue])
  return (
    <Box>
      {/* {loader ? <Loader /> : ""} */}
      <Paper sx={{ mb: 2 }} className="outer-box platform_section">
        <div className={"totalMGPWallets"}>
          <h3>Platform Wallet: </h3>{" "}
          <p
            className={
              rowData?.TotalWallet?.TotalMgpWallet?.toString()?.includes("-")
                ? "amount loss_color"
                : ""
            }
          >
            {currencyFormat(rowData?.TotalWallet?.TotalMgpWallet)}
          </p>
        </div>
      </Paper>

      <Paper sx={{ mb: 2 }} className="outer-box platform_section">
        <div
          className={
            filterData?.statusField !== "All Transaction Type"
              ? "d_flex justify_content_between"
              : ""
          }
        >
          {filterData?.statusField !== "All Transaction Type" && (
            <p style={{ fontWeight: 700}}>
              {" "}
              {!filterData?.statusField?.includes("Total") ? "Total " : ""}
              {filterData?.statusField} :{" "}
              <span
                className={
                  rowData?.TotalWallet?.totalTransactionTypeWise?.toString()?.includes("-") ? "loss_color": "amount"}
              >
                {currencyFormat(
                  rowData?.TotalWallet?.totalTransactionTypeWise || 0
                )}
              </span>
            </p>
          )}

          <AnalyticsFilter
            filterData={filterData}
            setFilterData={setFilterData}
            addPropsFilter={{
              isPlatform: true,
              userPayment: rowData?.list?.length <= 0,
            }}
            statusOption={transactionType}
            totalDocs={rowData?.totalDocs}
            handleOpenModal={handleOpenModal}
            setPagination={setPagination}
            pagination={pagination}
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
export default PlatformReportTab;
