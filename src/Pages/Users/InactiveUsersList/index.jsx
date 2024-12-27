import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import moment from "moment";
import {
  getAllUserDetailsList,
  getInactiveUserList,
} from "../../../Redux/user/action";
import TableCell from "@mui/material/TableCell";
import {
  ActionFunction,
  clearPaginationAndFilterData,
  currencyFormat,
  renderSrNo,
} from "../../../utils";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MainCommonFilter from "../../../Components/MainCommonFilter";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";

const InactiveUsersList = () => {
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
  const [filterData, setFilterData] = useState({
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    statusValue: "Today",
    exportFile: false,
    csvDownload: false,
    search: "",
    filterClose: false,
    exportFileName: "Export File",
    platformName: "All Users",
    state: "All States",
  });
  const [rowData, setRowData] = useState({
    list: [],
    totalDocs: 0,
    getAllState: [],
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
      getInactiveUserListData(
        prevDateFilter?.current?.startDate,
        prevDateFilter?.current?.endDate
      );
    } else if (
      (filterData.startDate && filterData.endDate) ||
      filterData?.statusValue === "All Days"
    ) {
      getInactiveUserListData(
        filterData.startDate,
        filterData.endDate,
        filterData.search
      );
    }
  }, [
    pagination.rowsPerPage,
    pagination.page,
    filterData.exportFile,
    filterData.csvDownload,
    filterData.startDate,
    filterData.endDate,
    filterData?.platformName,
    filterData?.state,
    filterData?.statusValue,
  ]);

  // get Users Api and All Filter Api
  const getInactiveUserListData = (startDate, endDate, search) => {
    setLoader(true);
    const { platformName, state, exportFile, csvDownload } = filterData;
    const { rowsPerPage, page, startRange, endRange } = pagination;
    let payload = {
      limit: endRange || rowsPerPage,
      start: startRange || page * rowsPerPage,
      // searchText: search ? search : state === 'All States' ? '' : state,
      searchText: search,
      state: state === "All States" ? "" : state,
      startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
      endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
      isBlock:
        platformName !== "All Users"
          ? platformName === "Blocked Users Accounts"
          : "",
      exportFile,
      csvDownload,
    };
    const filteredPayload = Object.fromEntries(
      Object.entries(payload).filter(
        ([_, value]) => value !== "" && value !== null
      )
    );
    dispatch(getInactiveUserList(filteredPayload)).then((res) => {
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
        const getAllState = res?.data?.data?.getAllState;
        // const updatedGetAllState = getAllState.map(state => state === "Puducherry" ? "Pondicherry" : state);
        getAllState.unshift("All States");
        setRowData({
          ...rowData,
          list: res?.data?.data?.docs,
          totalDocs: res?.data?.data?.totalDocs,
          getAllState: getAllState,
        });
      }
    });
  };

  useEffect(() => {
    const { startDate, statusValue } = filterData;
    if (startDate && statusValue === "Custom") {
      setPagination({ ...pagination, page: 0 });
    }
  }, [filterData]);

  // table columns
  let columns = [
    {
      id: "",
      twoLineText: true,
      label: "Sr. no.",
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
              onClick={() => navigate(`/users-tab/${row.id}`)}
            >{`UID000${row?.numericId}`}</span>
          </TableCell>
        );
      },
    },

    {
      id: "fullName",
      numeric: true,
      disablePadding: false,
      label: "Full Name",
    },

    {
      id: "nickName",
      numeric: true,
      disablePadding: false,
      label: "Users Name",
    },
    {
      id: "phoneNumber",
      numeric: true,
      disablePadding: false,
      label: "Phone Number",
    },
    {
      id: "",
      twoLineText: true,
      label: "State <br/>  Name",
      type: "custom",
      render: (row, i) => {
        return <TableCell>{row?.state ?? "-"}</TableCell>;
      },
    },
    {
      id: "country",
      disablePadding: false,
      label: "Country",
    },
    {
      id: "",
      twoLineText: true,
      label: "Version <br/> Number",
      type: "custom",
      render: (row, i) => {
        return <TableCell>{row?.version ?? "-"}</TableCell>;
      },
    },
    {
      id: "deviceType",
      twoLineText: true,
      label: "Device <br/> Type",
    },
    {
      id: "deviceId",
      disablePadding: false,
      label: "Device Id",
      type: "custom",
      render: (row, i) => {
        return <TableCell>{row?.deviceId ? row?.deviceId : "-"}</TableCell>;
      },
    },
    {
      id: "ipAddress",
      disablePadding: false,
      label: "IP Address",
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell className={"user_location_ul"}>
            {row?.ipAddress ? row?.ipAddress : "-"}
          </TableCell>
        );
      },
    },

    {
      id: "cash",
      numeric: true,
      disablePadding: false,
      label: "Deposit",
      type: "custom",
      render: (row) => {
        return <TableCell>{currencyFormat(+row?.cash)}</TableCell>;
      },
    },
    {
      id: "winCash",
      numeric: true,
      disablePadding: false,
      label: "Winning",
      type: "custom",
      render: (row) => {
        return <TableCell>{currencyFormat(+row?.winCash)}</TableCell>;
      },
    },

    {
      id: "bonus",
      numeric: true,
      disablePadding: false,
      label: "Bonus",
      type: "custom",
      render: (row) => {
        return <TableCell>{currencyFormat(+row?.bonus)}</TableCell>;
      },
    },

    {
      id: "totalCash",
      numeric: true,
      // twoLineText: true,
      disablePadding: true,
      label: "Total Balance",
      type: "custom",
      render: (row) => {
        return <TableCell>{currencyFormat(+row?.totalCash)} </TableCell>;
      },
    },
    {
      id: "totalDeposits",
      numeric: true,
      disablePadding: true,
      label: "Total Deposits",
      type: "custom",
      render: (row) => {
        return <TableCell>{currencyFormat(+row?.totalDeposits)}</TableCell>;
      },
    },
    {
      id: "totalWithdrawals",
      numeric: true,
      disablePadding: true,
      label: "Total Withdrawals ",
      type: "custom",
      render: (row) => {
        return <TableCell>{currencyFormat(+row?.totalWithdrawals)}</TableCell>;
      },
    },
    ActionFunction("user", {
      id: "Action",
      isDisbanding: true,
      label: "Action",
      type: "custom",
      render: (row) => {
        return (
          <TableCell className={"role_field_id"}>
            {row?.isBlock ? (
              <span
                className="edit_btn edit-btn-action"
                onClick={() =>
                  handleOpenModal("BlockUser", {
                    userId: row.id,
                    isBlock: !row?.isBlock,
                  })
                }
              >
                Unblock User Account
              </span>
            ) : (
              <span
                className="edit_btn edit-btn-action"
                onClick={() =>
                  handleOpenModal("BlockUser", {
                    userId: row.id,
                    isBlock: !row?.isBlock,
                  })
                }
              >
                {" "}
                Block User Account
              </span>
            )}
            {/*<span className='edit_btn edit-btn-action prTab' onClick={() => handleOpenModal('DeleteCommonModal',*/}
            {/*   { deleteListApiHandler: deleteUserData({userId: row.id }), title: 'Do you want to delete this data?' })}>Delete</span>*/}
          </TableCell>
        );
      },
    }),
    {
      id: "createdAt",
      label: "Create Date & Time",
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
      id: "lastActivateAt",
      label: "Last login Date & Time",
      twoLineText: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {moment(row?.lastActivateAt).format("MMM DD YYYY, hh:mm A")}
          </TableCell>
        );
      },
    },
  ];

  // custom PopUp function
  const handleOpenModal = (type, data) => {
    switch (type) {
      case "DeleteCommonModal": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "BlockUser": {
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

  const userRedirectApi = () => {
    getInactiveUserListData(filterData.startDate, filterData.endDate);
  };

  useEffect(() => {
    setPagination({
      rowsPerPage: 10,
      page: 0,
      startRange: "",
      endRange: "",
    });
  }, [filterData?.statusValue, filterData?.state, filterData?.platformName]);
  return (
    <Box>
      <Paper sx={{ mb: 2 }} className="outer-box">
        <div className={"d_flex justify_content_between"}>
          <h2>
            Inactive Users ({rowData?.list == 0 ? 0 : rowData?.totalDocs})
          </h2>
          <div className={"d_flex"}>
            <MainCommonFilter
              filterData={filterData}
              setFilterData={setFilterData}
              searchApiHandler={getInactiveUserListData}
              pagination={pagination}
              setPagination={setPagination}
              plateFormOption={[
                "All Users",
                "Blocked Users Accounts",
                "Unblocked Users Accounts",
              ]}
              addPropsFilter={{
                isGameList: true,
                isPending: true,
                isAllUser: true,
                userStateOption: rowData?.getAllState,
                userPayment: rowData?.list?.length <= 0,
                inActiveUsers: true,
              }}
              isSearchTooltip={{ isAllUser: true }}
              handleOpenModal={handleOpenModal}
              totalDocs={rowData?.totalDocs}
            />
          </div>
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
          redirectApiHandler={userRedirectApi}
        />
      </CommonModal>
    </Box>
  );
};
export default InactiveUsersList;
