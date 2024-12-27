import React, { useEffect, useState } from "react";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import { Box } from "@mui/material";
import PopComponent from "../../../hoc/PopContent";
import CommonModal from "../../../hoc/CommonModal";
import moment from "moment";
import TableCell from "@material-ui/core/TableCell";
import MainCommonFilter from "../../../Components/MainCommonFilter";
import { ActionFunction, currencyFormat, dotGenerator } from "../../../utils";
import { getWithdrawRequests } from "../../../Redux/user/action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserWithdrawalRequests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = React.useState(false);
  const [filterData, setFilterData] = useState({
    startDate: null,
    endDate: null,
    search: "",
    statusValue: "All Days",
    filterClose: false,
    platformName: "All Payout Method",
    statusField: "All Status",
    exportFile: false,
    csvDownload: false,
    exportFileName: "Export File",
  });
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
    totalWithdrawalsReport: {},
  });
  let Modal = PopComponent[modalDetails.modalName];
  const [dateFilter,setDateFilter] = useState(filterData);
  let prevDateFilter  = React.useRef(dateFilter);

  const columns = [
    {
      id: "",
      label: " Sr. No.",
      isDisbanding: true,
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell className={"game_icon_img"}>
            {pagination?.rowsPerPage * +pagination?.page + (i + 1)}
          </TableCell>
        );
      },
    },
    {
      id: "nickName",
      numeric: true,
      disablePadding: false,
      label: "Users Name",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            <span
              className="edit_btn"
              onClick={() => navigate(`/users-tab/${row?.userId?._id}`)}
            >
              {row?.userId?.nickName}
            </span>
          </TableCell>
        );
      },
    },
    {
      id: "userUpiId",
      twoLineText: true,
      label: "Withdrawal </br> Type",
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell>
            {/*{*/}
            {/*    row?.paymentGatWayType === "Manually" ?*/}
            {/*        row?.withdrawManuallyId?.withdrawManuallyType*/}
            {/*        : '_'*/}
            {/*}*/}
            {/* {row?.paymentGatWayType === "Manually" ? (
              <span
                className="edit_btn edit-btn-action"
                onClick={(e) => handleOpenModal("ViewWithdrawalType", row)}
              >
                {row?.withdrawManuallyId?.withdrawManuallyType}
              </span>
            ) : (
              "-"
            )} */}
            {row?.razorpayAccountId?.payoutMethod}
          </TableCell>
        );
      },
    },
    // {
    //     id: 'userUpiId',
    //     numeric: true,
    //     disablePadding: false,
    //     label: 'Bank/UPI Details',
    //     type: 'custom',
    //     render: (row, i) => {
    //         return <TableCell >
    //             {
    //                 row?.paymentGatWayType === "Manually" ?
    //                     <span className='edit_btn edit-btn-action' onClick={(e) => handleOpenModal('ViewWithdrawalType', row?.withdrawManuallyId)}>View</span> :
    //                     "-"
    //             }
    //
    //         </TableCell>
    //     }
    // },
    {
      numeric: true,
      twoLineText: true,
      label: "Withdrawal </br> amount",
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell>
            {currencyFormat(+row?.amountBeforeProccessingFee)}
          </TableCell>
        );
      },
    },
    {
      numeric: true,
      twoLineText: true,
      label: "TDS Percentage",
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell>
            {row?.tdsPercentage}%
          </TableCell>
        );
      },
    },
    {
      numeric: true,
      twoLineText: true,
      label: "TDS Amount",
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell>
            {currencyFormat(+row?.tdsAmount)}
          </TableCell>
        );
      },
    },
    // {
    //   label: "Processing </br> Fee",
    //   sortable: false,
    //   twoLineText: true,
    //   type: "custom",
    //   render: (row, i) => {
    //     return (
    //       <TableCell className={"table_icon"}>
    //         {currencyFormat(+row?.processingFee)}
    //       </TableCell>
    //     );
    //   },
    // },
    {
      label: "Net </br> Withdrawal  </br> Amount",
      sortable: false,
      twoLineText: true,
      type: "custom",
      render: (row, i) => {
        return <TableCell>{currencyFormat(+row?.amount)}</TableCell>;
      },
    },
    // {
    //     id: 'paymentType',
    //     disablePadding: false,
    //     label: 'Payment Type',
    //     isDisbanding: true,
    //     // type: 'custom',
    //     // render: (row) => {
    //     //     return <TableCell>{row?.razorpayAccountId?.payoutMethod === 'bank_account' ? 'Bank Account' : row?.razorpayAccountId?.payoutMethod === 'vpa' ? 'UPI' : ''}</TableCell>
    //     // }
    // },
    {
      id: "status",
      disablePadding: false,
      label: "Status",
      type: "custom",
      render: (row) => {
        const capitalizedStatus =
      row?.status.charAt(0).toUpperCase() + row?.status.slice(1);
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
                  : "status_field"
              }
            >
              {capitalizedStatus}
            </span>
          </TableCell>
        );
      },
    },
    {
      id: "paymentGatWayType",
      twoLineText: true,
      label: "Payment </br> Gateway </br> Type",
      type: "custom",
      render: (row, i) => {
        return <TableCell>{row?.paymentGatWayType}</TableCell>;
      },
    },
    // {
    //   id: "userUpiId",
    //   numeric: true,
    //   twoLineText: true,
    //   label: "Transaction  </br>  Details",
    //   type: "custom",
    //   render: (row, i) => {
    //     let payload = {
    //       withdrawWinCashImage: row?.withdrawWinCashImage,
    //       transactionId: row?.transactionId,
    //       adminUpiId: row?.adminUpiId,
    //     };
    //     return (
    //       <TableCell>
    //         {row?.paymentGatWayType === "Manually" &&
    //         row?.approveStatus === "approve" ? (
    //           <span
    //             className="edit_btn edit-btn-action"
    //             onClick={(e) =>
    //               handleOpenModal("ViewWithdrawApproveDetails", payload)
    //             }
    //           >
    //             View
    //           </span>
    //         ) : (
    //           "-"
    //         )}
    //       </TableCell>
    //     );
    //   },
    // },

    ActionFunction("withdrawal", {
      id: "Action",
      numeric: true,
      disablePadding: false,
      label: "Action",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell className={"role_field_id"}>
            {row?.approveStatus === "approve" ? (
              <span className={"CompletedMsg"}> Completed </span>
            ) : row?.approveStatus === "reject" ? (
              <span className={"invalid-feedback pl-4 d-block errorMsgReject"}>
                Reject
              </span>
            ) : row?.approveStatus === "refund" ? (
              <span className={"invalid-feedback pl-4 d-block errorMsgReject"}>
                Refund
              </span>
            ) : (
              <>
                <Box
                  component="span"
                  mr={1}
                  className="link_color edit_btn edit-btn-action pointer u_border"
                  onClick={() =>
                    handleOpenModal("ApprovedWithdrawalRequest", {
                      withdrawalId: row?._id,
                      isApprove: true,
                      paymentType: row?.paymentGatWayType,
                    })
                  }
                >
                  Approve
                </Box>
                <Box
                  component="span"
                  className="link_color edit_btn edit-btn-action pointer u_border prTab"
                  onClick={() =>
                    handleOpenModal("RejectedPopup", {
                      withdrawalId: row?._id,
                      isApprove: false,
                      isUserWithdraw: true,
                      isDelete: true,
                      isUser: true,
                      isRejected: false,
                    })
                  }
                >
                  Refund
                </Box>
                <Box
                  component="span"
                  className="link_color edit_btn edit-btn-action pointer prTab"
                  onClick={() =>
                    handleOpenModal("RejectedPopup", {
                      withdrawalId: row?._id,
                      isApprove: false,
                      isUserWithdraw: true,
                      isDelete: true,
                      isUser: true,
                      isRejected: true,
                    })
                  }
                >
                  Reject
                </Box>
              </>
            )}
          </TableCell>
        );
      },
    }),
    {
      id: "description",
      twoLineText: true,
      label: "Reject </br> Reason",
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {row?.rejectReason
              ? dotGenerator(
                  row?.rejectReason,
                  handleOpenModal,
                  "Withdrawal Request Reject Reason",
                  "",
                  "isWithdrawal"
                )
              : "-"}
          </TableCell>
        );
      },
    },
    {
      id: "createdAt",
      disablePadding: false,
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
      type: "custom",
      label: "Order Id",
      render: (row) => {
        return (
          <TableCell>
            {row?.orderId}
            {/*    <span className='edit_btn orderId_details' onClick={() =>*/}
            {/*    handleOpenModal("ViewRejectedComment", {*/}
            {/*        title: 'Order Id',*/}
            {/*        data: row?.orderId,*/}
            {/*    })*/}
            {/*}>...more</span>*/}
          </TableCell>
        );
      },
    },
    {
      id: "transactionId",
      numeric: true,
      type: "custom",
      label: "Transaction Id",
      render: (row) => {
        return (
          <TableCell>
            {row?.transactionId || '-'}
          </TableCell>
        );
      },
    },
  ];

  const handleOpenModal = (type, data) => {
    switch (type) {
      case "RejectedPopup": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "CommonPop": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "ApprovedWithdrawalRequest": {
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
      case "ViewWithdrawalType": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "ViewWithdrawApproveDetails": {
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
      case "DocumentOpenPopup": {
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
        getWithdrawRequestsList(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
    } else if (filterData.startDate && filterData.endDate || filterData?.statusValue === 'All Days') {
        getWithdrawRequestsList(filterData.startDate, filterData.endDate)
    }
}, [pagination.rowsPerPage, pagination.page, filterData.exportFile, filterData.csvDownload, filterData.statusField, filterData.platformName, filterData.startDate, filterData.endDate, filterData?.statusValue]);

  // get Users Api and All Filter Api
  const getWithdrawRequestsList = (startDate, endDate, search) => {
    setLoader(true);
    let payload = {
      limit: pagination?.endRange
        ? pagination?.endRange
        : pagination.rowsPerPage,
      searchText: search,
      startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
      endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
      start: +pagination?.startRange
        ? +pagination?.startRange
        : (pagination.page + 1 - 1) * pagination.rowsPerPage,
      exportFile: filterData?.exportFile,
      csvDownload: filterData?.csvDownload,
      payoutMethod:
        filterData.platformName === "All Payout Method"
          ? null
          : filterData.platformName === "Bank Transfer"
          ? "bank_account"
          : "vpa",
      status:
        filterData.statusField === "All Status" ? null : filterData.statusField,
    };
    Object?.keys(payload).forEach((ele) => {
      if (payload[ele] === "" || payload[ele] === null) {
        delete payload[ele];
      }
    });
    dispatch(getWithdrawRequests(payload)).then((res) => {
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
          list: res?.data?.data?.userWithdrawaRequest?.docs,
          totalDocs: res?.data?.data?.userWithdrawaRequest?.totalDocs,
          totalWithdrawalsReport: res?.data?.data?.totalWithdrawalsReport,
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
      getWithdrawRequestsList(filterData.startDate, filterData.endDate);
    }
  }, [filterData.startDate, filterData.endDate]);
  return (
    <>
      {/* {loader && <Loader />} */}
      <Paper sx={{ mb: 2 }} className="outer-box withdrawal_details_table">
        <div className={"d_flex justify_content_between"}>
          <div className={"withdrawal_left_section"}>
            <p>
              <span className={"bold_fontWeight"}>Withdrawal Amount:</span>{" "}
              {currencyFormat(
                rowData?.totalWithdrawalsReport?.totalamountBeforeProccessingFee
              )}
            </p>
            <p>
              <span className={"bold_fontWeight"}>Processing Fee</span>:{" "}
              {currencyFormat(
                rowData?.totalWithdrawalsReport?.totalProcessingFee
              )}
            </p>
            <p>
              <span className={"bold_fontWeight"}>Net Withdrawal Amount</span>:{" "}
              {currencyFormat(rowData?.totalWithdrawalsReport?.totalAmount)}
            </p>
          </div>
          <MainCommonFilter
            filterData={filterData}
            setFilterData={setFilterData}
            searchApiHandler={getWithdrawRequestsList}
            pagination={pagination}
            setPagination={setPagination}
            statusOption={[
              "All Status",
              "processing",
              "processed",
              "cancelled",
              "reversed",
            ]}
            plateFormOption={["All Payout Method", "Bank Transfer", "UPI"]}
            addPropsFilter={{
              isGameList: true,
              isWithdrawal: true,
              totalUser: rowData?.totalDocs,
              userPayment: rowData?.list?.length <= 0
            }}
            userProps={{
              filterData: filterData,
              setFilterData: setFilterData,
              pagination: pagination,
              setPagination: setPagination,
            }}
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
          loader={loader}
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
          redirectApiHandler={getWithdrawRequestsList}
          YesNoText={{ yes: "Yes", no: "Cancel" }}
        />
      </CommonModal>
    </>
  );
};
export default UserWithdrawalRequests;
