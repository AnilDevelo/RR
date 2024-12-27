import React, { useEffect, useRef, useState } from "react";
import {
  addMarkAllAsReadNotification,
  deleteAllNotification,
  getNotifications,
  singleMarkAsReadNotification,
} from "../../../Redux/Header/action";
import { useDispatch } from "react-redux";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useNavigate } from "react-router-dom";
import { hideActionFunc, hideActionFuncNotification } from "../../../utils";
import CommonModal from "../../../hoc/CommonModal";
import Box from "@mui/material/Box";
import PopComponent from "../../../hoc/PopContent";
import user from "../../../assets/images/avatar.png";

const Notification = ({ setOpenNotification, getNotificationCountFunc }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
  const [pagination, setPagination] = useState({
    rowsPerPage: 10,
    page: 0,
    totalPages: 0,
  });
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];

  useEffect(() => {
    getNotificationList(pagination.rowsPerPage, pagination.page);
  }, []);

  const getNotificationList = (rowsPerPage, page) => {
    let payload = {
      limit: rowsPerPage,
      start: (page + 1 - 1) * rowsPerPage,
    };
    getNotificationCountFunc();
    setLoader(true);
    dispatch(getNotifications(payload)).then((res) => {
      setLoader(false);
      if (res.data.success) {
        setRowData({
          ...rowData,
          list: res.data.data.docs,
          totalDocs: res?.data?.data?.totalDocs,
          totalPages: res.data.data?.totalPages,
        });
      }
    });
  };

  const markAllAsReadFunc = () => {
    dispatch(addMarkAllAsReadNotification({})).then((res) => {
      if (res.data.success) {
        getNotificationList();
        getNotificationCountFunc();
      }
    });
  };

  const deleteAllNotificationFunc = () => {
    dispatch(deleteAllNotification({})).then((res) => {
      if (res.data.success) {
        getNotificationList();
        getNotificationCountFunc();
      }
    });
  };

  const redirectPageNotification = (item) => {
    switch (item?.notificationCategory) {
      case "New Ticket": {
        if (hideActionFuncNotification("helpAndSupport")) {
          let payload = {
            adminNotificationId: item?._id,
          };
          dispatch(singleMarkAsReadNotification(payload)).then((res) => {
            if (res.data.success) {
              getNotificationList();
            }
          });
          setOpenNotification(false);
          getNotificationCountFunc();
          navigate("/help-and-support");
          window.location.reload();
        } else {
          handleOpenModal("CommonPop", {
            header: "Error",
            body: "You don't have permission to access this module.",
          });
        }
        break;
      }
      case "New KYC": {
        if (hideActionFuncNotification("user")) {
          let payload = {
            adminNotificationId: item?._id,
          };
          dispatch(singleMarkAsReadNotification(payload)).then((res) => {
            if (res.data.success) {
              getNotificationList();
            }
          });
          setOpenNotification(false);
          getNotificationCountFunc();
          navigate("/user-kyc");
          window.location.reload();
        } else {
          handleOpenModal("CommonPop", {
            header: "Error",
            body: "You don't have permission to access this module.",
          });
        }
        break;
      }
      case "Update KYC": {
        if (hideActionFuncNotification("user")) {
          let payload = {
            adminNotificationId: item?._id,
          };
          dispatch(singleMarkAsReadNotification(payload)).then((res) => {
            if (res.data.success) {
              getNotificationList();
            }
          });
          setOpenNotification(false);
          getNotificationCountFunc();
          navigate("/user-kyc");
          window.location.reload();
        } else {
          handleOpenModal("CommonPop", {
            header: "Error",
            body: "You don't have permission to access this module.",
          });
        }
        break;
      }
      case "Block User": {
        if (hideActionFuncNotification("user")) {
          let payload = {
            adminNotificationId: item?._id,
          };
          dispatch(singleMarkAsReadNotification(payload)).then((res) => {
            if (res.data.success) {
              getNotificationList();
            }
          });
          setOpenNotification(false);
          getNotificationCountFunc();
          navigate("/block-user");
          window.location.reload();
        } else {
          handleOpenModal("CommonPop", {
            header: "Error",
            body: "You don't have permission to access this module.",
          });
        }
        break;
      }
      case "New Manually Desposit Cash Request": {
        if (hideActionFuncNotification("withdrawal")) {
          let payload = {
            adminNotificationId: item?._id,
          };
          dispatch(singleMarkAsReadNotification(payload)).then((res) => {
            if (res.data.success) {
              getNotificationList();
            }
          });
          setOpenNotification(false);
          getNotificationCountFunc();
          navigate("/user-deposit-request");
          window.location.reload();
        } else {
          handleOpenModal("CommonPop", {
            header: "Error",
            body: "You don't have permission to access this module.",
          });
        }
        break;
      }
      case "New Manually Withdrawal Request": {
        if (hideActionFuncNotification("withdrawal")) {
          let payload = {
            adminNotificationId: item?._id,
          };
          dispatch(singleMarkAsReadNotification(payload)).then((res) => {
            if (res.data.success) {
              getNotificationList();
            }
          });
          setOpenNotification(false);
          getNotificationCountFunc();
          navigate("/user-withdrawal-requests");
          window.location.reload();
        } else {
          handleOpenModal("CommonPop", {
            header: "Error",
            body: "You don't have permission to access this module.",
          });
        }
        break;
      }
      default: {
        if (hideActionFuncNotification("user")) {
          let payload = {
            adminNotificationId: item?._id,
          };
          dispatch(singleMarkAsReadNotification(payload)).then((res) => {
            if (res.data.success) {
              getNotificationList();
            }
          });
          setOpenNotification(false);
          getNotificationCountFunc();
          navigate("/user-reported");
          window.location.reload();
        } else {
          handleOpenModal("CommonPop", {
            header: "Error",
            body: "You don't have permission to access this module.",
          });
        }
        break;
      }
    }
  };

  const notificationPagination = () => {
    if (ref?.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      if (
        scrollTop + clientHeight === scrollHeight &&
        rowData?.totalDocs !== 0 &&
        rowData?.totalPages !== pagination?.page + 1
      ) {
        setPagination({ ...pagination, page: Number(pagination?.page) + 1 });
        ref.current.scrollTop = scrollHeight / 1;
        let payload = {
          limit: pagination?.rowsPerPage,
          start: (pagination?.page + 1 + 1 - 1) * pagination?.rowsPerPage,
        };
        dispatch(getNotifications(payload)).then((res) => {
          setLoader(false);
          if (res.data.success) {
            setRowData({
              ...rowData,
              list: [...rowData?.list, ...res.data.data.docs],
              totalDocs: res?.data?.data?.totalDocs,
            });
          }
        });
      }
    }
  };

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
      default: {
        setModalDetails({ ...modalDetails, modalIsOpen: false });
      }
    }
  };
  return (
    <div className={"notifications-popup dropdown-menu"}>
      <div className="topnav-dropdown-header">
        <span className="notification-title">Notifications</span>
        <p
          className={"custom_close_btn"}
          onClick={() => setOpenNotification(false)}
        >
          <svg
            viewBox="0 0 24 24"
            x="1008"
            y="432"
            fit=""
            height="28"
            width="25"
            preserveAspectRatio="xMidYMid meet"
            focusable="false"
          >
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
              fill="#64748b"
            />
          </svg>
        </p>
      </div>
      {loader ? (
        <div className={"notification_loader noti-content"}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <div
            className="noti-content"
            ref={ref}
            onScroll={notificationPagination}
          >
            <ul className="notification-list">
              {rowData?.list?.length > 0 ? (
                rowData?.list?.map((item, i) => {
                  return (
                    <li
                      className="notification-message active"
                      onClick={() => redirectPageNotification(item)}
                    >
                      <a href="#">
                        <div className="media d-flex">
                          <div>
                          <span className="avatar flex-shrink-0">
                            <img
                              alt=""
                              src={item?.userId?.profileImage || user}
                            />
                            {!item?.isRead && (
                              <div className={"unread_dots_red"} />
                            )}
                            </span>
                            </div>
                          <div className="media-body flex-grow-1">
                            <p className="noti-details">
                              <span className="noti-title">
                                {item?.notificationTitle}{" "}
                              </span>{" "}
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                {moment(item?.createdAt).format("DD MMMM YYYY")}
                                <span className={"dots_white"} />{" "}
                                {moment(item?.createdAt).format("hh:mm A")}{" "}
                              </span>
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                  );
                })
              ) : (
                <div className={"no_notification_text"}>No notification</div>
              )}
            </ul>
          </div>
        </>
      )}
      <div className="topnav-dropdown-footer">
        <button
          className={
            rowData?.list?.length <= 0
              ? "btn_notification disabled_notification mr_1"
              : "delete_all btn_notification"
          }
          disabled={rowData?.list?.length <= 0}
          onClick={() => deleteAllNotificationFunc()}
        >
          Delete All
        </button>
        <button
          className={
            rowData?.list?.length <= 0 ||
            rowData?.list?.filter((acc, cur) => !acc?.isRead)?.length <= 0
              ? "btn_notification disabled_notification"
              : "mark_all_as_read btn_notification"
          }
          disabled={
            rowData?.list?.length <= 0 ||
            rowData?.list?.filter((acc, cur) => !acc?.isRead)?.length <= 0
          }
          onClick={() => markAllAsReadFunc()}
        >
          Mark all as read
        </button>
      </div>

      <CommonModal
        className={"Approved-reject-section"}
        modalIsOpen={modalDetails.modalIsOpen}
        handleOpenModal={handleOpenModal}
      >
        <Modal
          modalValue={modalDetails.modalValue}
          handleOpenModal={handleOpenModal}
          modalIsOpen={modalDetails.modalIsOpen}
          redirectApiHandler={""}
        />
      </CommonModal>
    </div>
  );
};
export default Notification;
