import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import PopComponent from "../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import { ActionFunction } from "../../../../utils";
import moment from "moment";
import { getUserKYCList } from "../../../../Redux/user/action";
import Box from "@mui/material/Box";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import MainCommonFilter from "../../../../Components/MainCommonFilter";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";

const UserKYCListTab = () => {
  const navigate = useNavigate();
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
  let Modal = PopComponent[modalDetails.modalName];
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
  const [dateFilter, setDateFilter] = useState(filterData);
  let prevDateFilter = React.useRef(dateFilter);

  const handleOpenModal = (type, data) => {
    switch (type) {
      case "ApprovedKYCPopup": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "RejectedKYCPopup": {
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
      case "UpdateUserKYCPopup": {
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
      id: "id",
      numeric: false,
      disablePadding: false,
      label: "Sr. no.",
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell>
            {+pagination.rowsPerPage * (+pagination.page + 1 - 1) + i + 1}
          </TableCell>
        );
      },
    },
    {
      id: "numericId",
      numeric: false,
      disablePadding: false,
      label: "Users ID",
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell>
            <span
              className="edit_btn"
              onClick={() => navigate(`/users-tab/${row?._id}`)}
            >{`UID000${row?.numericId || 1}`}</span>
          </TableCell>
        );
      },
    },
    {
      id: "nickName",
      numeric: true,
      disablePadding: false,
      label: "Users Name",
    },
    {
      id: "panCardNumber",
      label: "Pan Card Number",
      isDisbanding: true,
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell>
            {row?.panCardImage === null || row?.panCardImage === ""
              ? "-"
              : row?.panCardNumber}
          </TableCell>
        );
      },
    },
    {
      id: "",
      label: "Pan Card Photo",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {row?.panCardImage !== null ? (
              <span
                className="edit_btn edit-btn-action u_border"
                onClick={() =>
                  handleOpenModal("DocumentOpenPopup", {
                    front: row?.panCardImage,
                  })
                }
              >
                View
              </span>
            ) : (
              "-"
            )}
          </TableCell>
        );
      },
    },
    {
      id: "aadharCardNumber",
      label: "Aadhaar Card Number",
      isDisbanding: true,
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell>
            {row?.aadharCardNumber === null || row?.aadharCardNumber === ""
              ? "-"
              : row?.aadharCardNumber}
          </TableCell>
        );
      },
    },
    {
      id: "AadharCardPhoto",
      label: "Aadhaar Card Photo",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {row?.aadharCardFrontImage === null ? (
              "-"
            ) : (
              <span
                className="edit_btn edit-btn-action u_border"
                onClick={() =>
                  handleOpenModal("DocumentOpenPopup", {
                    front: row?.aadharCardFrontImage,
                    back: row?.aadharCardBackImage,
                  })
                }
              >
                View
              </span>
            )}
          </TableCell>
        );
      },
    },
    {
      id: "aadharCardstatus",
      label: "Aadhaar Card Status",
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            <span
              className={
                row?.aadharCardstatus === "Approve"
                  ? "green_filed"
                  : row?.aadharCardstatus === "Pending"
                  ? "yellow_field"
                  : row?.aadharCardstatus === "Reject"
                  ? "red_filed"
                  : "status_field"
              }
            >
              {row?.aadharCardstatus === "Approve"
                ? "Verified"
                : row?.aadharCardstatus || "-"}
            </span>
          </TableCell>
        );
      },
    },
    {
      id: "panCardStatus",
      label: "Pan Card Status",
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            <span
              className={
                row?.panCardStatus === "Verify"
                  ? "green_filed"
                  : row?.panCardStatus === "Pending"
                  ? "yellow_field"
                  : row?.panCardStatus === "Reject"
                  ? "red_filed"
                  : "status_field"
              }
            >
              {row?.panCardStatus === "Verify" && "Verified" || "-"}
            </span>
          </TableCell>
        );
      },
    },
    ActionFunction("user", {
      id: "Action",
      label: "Action",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell className={"role_field_id"}>
            {/*<span className='edit_btn edit-btn-action  u_border' onClick={() => handleOpenModal('UpdateUserKYCPopup',row)}>Edit</span>*/}
            {row?.aadharCardstatus === "Reject" ? (
              <span
                className="edit_btn edit-btn-action prTab"
                onClick={() =>
                  handleOpenModal("ApprovedKYCPopup", {
                    userKYCAadharCardId: row?._id,
                    isApprove: true,
                  })
                }
              >
                Approve
              </span>
            ) : row?.aadharCardNumber && row?.aadharCardstatus === "Pending" ? (
              <>
                <span
                  className="edit_btn edit-btn-action u_border prTab"
                  onClick={() =>
                    handleOpenModal("ApprovedKYCPopup", {
                      userKYCAadharCardId: row?._id,
                      isApprove: true,
                    })
                  }
                >
                  Aadhaar Card Approve
                </span>
                <span
                  className="edit_btn edit-btn-action prTab "
                  onClick={() =>
                    handleOpenModal("RejectedKYCPopup", {
                      userKYCAadharCardId: row?._id,
                      isApprove: false,
                    })
                  }
                >
                  Aadhaar Card Reject
                </span>
              </>
            ) : (row?.aadharCardstatus === "Verify" &&
                row?.panCardStatus !== "Verify") ||
              row?.aadharCardstatus === "Approve" ? (
              "-"
            ) : (
              "-"
            )}
          </TableCell>
        );
      },
    }),
  ];

  useEffect(() => {
    if (
      filterData?.statusValue === "Custom" &&
      filterData.startDate === null &&
      filterData.endDate === null &&
      prevDateFilter?.current?.statusValue !== "Custom"
    ) {
      getUserKYCListDetails(
        prevDateFilter?.current?.startDate,
        prevDateFilter?.current?.endDate
      );
    } else if (
      (filterData.startDate && filterData.endDate) ||
      filterData?.statusValue === "All Days"
    ) {
      getUserKYCListDetails(filterData.startDate, filterData.endDate);
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

  const getUserKYCListDetails = (startDate, endDate, search) => {
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
    };
    setLoader(true);
    Object?.keys(payload).forEach((ele) => {
      if (payload[ele] === "" || payload[ele] === null) {
        delete payload[ele];
      }
    });
    dispatch(getUserKYCList(payload)).then((res) => {
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
        if (res.data?.success) {
          setRowData({
            ...rowData,
            list: res?.data?.data?.docs,
            totalDocs: res?.data?.data?.totalDocs,
          });
        } else {
          setRowData({
            ...rowData,
            list: [],
            totalDocs: 0,
          });
        }
      }
    });
  };

  useEffect(() => {
    if (filterData.startDate && filterData.endDate) {
      setPagination({
        ...pagination,
        page: 0,
      });
      getUserKYCListDetails(filterData.startDate, filterData.endDate);
    }
  }, [filterData.startDate, filterData.endDate]);

  return (
    <Box>
      {/* {loader ? <Loader /> : ""} */}
      <Paper sx={{ mb: 2 }} className="outer-box">
        <MainCommonFilter
          filterData={filterData}
          setFilterData={setFilterData}
          addPropsFilter={{ userPayment: rowData?.list?.length <= 0 }}
          searchApiHandler={getUserKYCListDetails}
          pagination={pagination}
          setPagination={setPagination}
          isSearchTooltip={{ isWithdrawalRequest: true }}
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
          redirectApiHandler={getUserKYCListDetails}
        />
      </CommonModal>
    </Box>
  );
};
export default UserKYCListTab;
