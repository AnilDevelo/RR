import React, { useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import Box from "@material-ui/core/Box";
import CustomTable from "../../../../hoc/CommonTable";
import { useDispatch } from "react-redux";
import PopComponent from "../../../../hoc/PopContent";
import { viewUserReportedList } from "../../../../Redux/user/action";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import {
  clearPaginationAndFilterData,
  currencyFormat,
  dotGenerator,
  renderSrNo,
} from "../../../../utils";
import CommonModal from "../../../../hoc/CommonModal";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import moment from "moment";
import {
  getMGPWalletsHistory,
  getTransactionTypePlatformReport,
} from "Redux/revenue/action";
import AnalyticsFilter from "Pages/Analytics/AnalyticFilter";
import MainCommonFilter from "Components/MainCommonFilter";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
  width: "70%",
};
const WithdrawalTransactionHistory = ({
  modalValue,
  handleOpenModal,
  setSwitchTab,
}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState({
    startDate: null,
    endDate: null,
    statusValue: "All Days",
    exportFile: false,
    csvDownload: false,
    exportFileName: "Export File",
    statusField: "Withdrawal",
  });
  const [pagination, setPagination] = useState({
    rowsPerPage: 10,
    page: 0,
  });

  const columns = [
    {
      id: "",
      label: "Sr. No.",
      isDisbanding: true,
      type: "custom",
      render: (row, i) => renderSrNo(row, i, pagination),
    },
    {
      id: "id",
      numeric: false,
      disablePadding: false,
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
    {
      id: "nickName",
      numeric: true,
      disablePadding: false,
      label: "Users Name",
      type: "custom",
      render: (row, i) => {
        return <TableCell>{row?.userId?.nickName}</TableCell>;
      },
    },
    {
      id: "",
      label: " Date & Time",
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
    },
    {
      id: "amount",
      label: "Amount",
      type: "custom",
      render: (row) => {
        return <TableCell>{currencyFormat(+row?.amount)}</TableCell>;
      },
    },
    {
      id: "depositeInto",
      label: "Wallet Type",
      type: "custom",
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
    if (
      (filterData?.startDate && filterData?.endDate) ||
      filterData?.statusValue === "All Days"
    ) {
      getMGPWalletsHistoryDetails(filterData.startDate, filterData.endDate);
    }
  }, [
    pagination.rowsPerPage,
    pagination.page,
    filterData.exportFile,
    filterData.csvDownload,
    filterData.startDate,
    filterData.endDate,
    filterData?.statusField,
  ]);

  const getMGPWalletsHistoryDetails = (startDate, endDate) => {
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
          window.open(
            `${process.env.REACT_APP_END_POINT}${res?.data?.data?.filePath}`,
            "_blank"
          );
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
  const handleOpenModalExport = (type, data) => {
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

  return (
    <>
      <div className={"tds-all-user-section"}>
        <Paper sx={{ mb: 2 }} className="outer-box">
          <div className={"tds-main-section"}>
            <button
              className={"tds-back-btn"}
              //onClick={() => navigate(-1)}
              onClick={() => setSwitchTab(0)}
            >
              {" "}
              <KeyboardArrowLeftIcon /> Back
            </button>
            <div className={"totalMGPWallets"}>
              <h2>Total Withdrawal : </h2>
              <p
                className={
                  rowData?.TotalWallet?.totalTransactionTypeWise?.toString()?.includes(
                    "-"
                  )
                    ? "amount loss_color"
                    : ""
                }
              >
                {currencyFormat(rowData?.TotalWallet?.totalTransactionTypeWise || 0)}
              </p>
            </div>
          </div>
        </Paper>
      </div>

      <Paper sx={{ mb: 2 }} className="outer-box platform_section">
        {/* <div className={"totalMGPWallets"}>
          <h3>Total Withdrawal :</h3>
          <p
            className={
              rowData?.TotalWallet?.TotalMgpWallet?.toString()?.includes("-")
                ? "amount loss_color"
                : ""
            }
          >
            {currencyFormat(rowData?.TotalWallet?.TotalMgpWallet)}
          </p>
        </div> */}
        <div className={"OverView_pagination"}>
          <MainCommonFilter
            filterData={filterData}
            setFilterData={setFilterData}
            addPropsFilter={{
              isPlatform: true,
              userPayment: rowData?.list?.length <= 0,
            }}
            totalDocs={rowData?.totalDocs}
            handleOpenModal={handleOpenModalExport}
            setPagination={setPagination}
            pagination={pagination}
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
      </Paper>
      <CommonModal
        className={"Approved-reject-section"}
        modalIsOpen={modalDetails.modalIsOpen}
        handleOpenModal={handleOpenModal}
      >
        <Modal
          modalValue={modalDetails.modalValue}
          handleOpenModal={handleOpenModalExport}
          modalIsOpen={modalDetails.modalIsOpen}
        />
      </CommonModal>
    </>
  );
};
export default WithdrawalTransactionHistory;
