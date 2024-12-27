import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import {
  ActionFunction,
  currencyFormat,
  dotGenerator,
  hideActionFunc,
} from "../../../../utils";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import { useDispatch } from "react-redux";
import PopComponent from "../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import moment from "moment";
import { deleteNotificationType, getNotificationUserTypeList } from "../../../../Redux/Master/action";
import user from "../../../../assets/images/avatar.png";
import { getLeaderboardGameList } from "../../../../Redux/Bonus/action";

const UserTypeNotification = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
  const [gameFilterData, setGameFilterData] = useState([]);
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
  let Modal = PopComponent[modalDetails.modalName];

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
      case "AddUserTypeNotification": {
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
      case "DeleteCommonModal": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "countryDisplayPopup": {
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
      id: "userType",
      label: "User Type",
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {row?.userType === "Inactive User"
              ? `${row?.userType} - Last ${row?.inActiveTime} ${row?.inActiveType} `
              : row?.userType}
          </TableCell>
        );
      },
    },
    {
      id: "minAddCash",
      label: "Minimum Add Cash",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {row?.minAddCash && currencyFormat(+row?.minAddCash) || '-'}
          </TableCell>
        );
      },
    },
    {
      id: "minWalletCash",
      label: "Minimum Wallet Cash",
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {row?.minWalletCash && currencyFormat(+row?.minWalletCash) || '-'}
          </TableCell>
        );
      },
    },
    {
      id: "maxEntryFees",
      label: "Maximum Entry Fees",
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {row?.maxEntryFees && currencyFormat(+row?.maxEntryFees) || '-'}
          </TableCell>
        );
      },
    },
    {
      id: "cashbackBonus",
      label: "Game Name",
      type: "custom",
      render: (row) => {
        let temp = gameFilterData
        ?.filter((item) => row?.gameIds?.includes(item?.value))
        .reduce((acc, cur) => [...acc, cur.label], []);
        return (
          <TableCell>
            {row?.gameIds?.length > 0 ? (
              <span
                className={"edit_btn edit-btn-action"}
                onClick={() =>
                  handleOpenModal("countryDisplayPopup", {
                    countryList: temp,
                    title: "Leaderboard Game",
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
      id: "minRank",
      label: "Minimum Rank",
      type: "custom",
      render: (row) => {
        return (
          <TableCell>{row?.minRank || '-'}</TableCell>
        );
      },
    },
    // {
    //     id: 'minDepositAmount',
    //     label: 'Inactive User Type',
    //     type: 'custom',
    //     render: (row) => {
    //         return <TableCell >{currencyFormat(row?.minDepositAmount || 0.00)}</TableCell>
    //     }
    // },
    ActionFunction('marketing', {
        id: 'action',
        label: 'Action',
        isDisbanding: true,
        type: 'custom',
        render: (row) => {
            return <TableCell className={'role_field_id'}>
                {/* <span className='edit_btn edit-btn-action u_border' onClick={(e) => handleOpenModal('AddUserTypeNotification', { isEdit: true, row })}>Edit</span> */}
                <span className='edit_btn edit-btn-action'
                      onClick={() => handleOpenModal('DeleteCommonModal',
                          { deleteListApiHandler: deleteNotificationType({ NotificationTypeId : row?._id }), title: 'Do you want to delete this notification type?' })}
                >Delete</span>
            </TableCell>
        }
    })
  ];

  useEffect(() => {
    dispatch(getLeaderboardGameList()).then((res) => {
      setGameFilterData(
        res.data.data?.map((item) => {
          return { value: item?._id, label: item?.gameName };
        }) || []
      );
    });
  }, []);

  useEffect(() => {
    getUserNotificationUserTypeDetails();
  }, [pagination.rowsPerPage, pagination.page]);

  const getUserNotificationUserTypeDetails = () => {
    let payload = {
      limit: pagination.rowsPerPage,
      start: (pagination.page + 1 - 1) * pagination.rowsPerPage,
    };
    setLoader(true);
    dispatch(getNotificationUserTypeList(payload)).then((res) => {
      if (res.data.success) {
        setLoader(false);
        setRowData({
          ...rowData,
          list: res?.data?.data,
          totalDocs: res?.data?.data?.totalDocs || 0,
        });
      }
    });
  };

  return (
    <>
      <Box>
        {/* {loader ? <Loader /> : ""} */}
        <Paper sx={{ mb: 2 }} className="outer-box">
          {hideActionFunc("marketing") && (
            <div className={"d_flex_end"}>
              <button
                className={"btn"}
                onClick={(e) => handleOpenModal("AddUserTypeNotification")}
              >
                + Add User Notification Type{" "}
              </button>
            </div>
          )}

          <CustomTable
            headCells={columns}
            rowData={rowData?.list}
            totalDocs={rowData?.totalDocs}
            pagination={pagination}
            setPagination={setPagination}
            isWinnerTitle={true}
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
            redirectApiHandler={getUserNotificationUserTypeDetails}
          />
        </CommonModal>
      </Box>
    </>
  );
};
export default UserTypeNotification;
