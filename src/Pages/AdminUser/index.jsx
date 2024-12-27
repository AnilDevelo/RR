import React, { useEffect, useState } from "react";
import Loader from "../../images/Loader";
import Paper from "@material-ui/core/Paper";
import CustomTable from "../../hoc/CommonTable";
import CommonModal from "../../hoc/CommonModal";
import TableCell from "@material-ui/core/TableCell";
import {
  deleteAdminUserList,
  getAdminUserListing,
} from "../../Redux/AdminUser/action";
import PopComponent from "../../hoc/PopContent";
import { useDispatch } from "react-redux";
import { AdminRole, helpTicketTypeArr } from "../../utils";
import { getLeaderboardGameList } from "../../Redux/Bonus/action";

const AdminUser = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [pagination, setPagination] = useState({ rowsPerPage: 5, page: 0 });
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails?.modalName];
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
  const [gameFilterData, setGameFilterData] = useState([]);

  useEffect(() => {
    dispatch(getLeaderboardGameList()).then((res) => {
      setGameFilterData(
        res.data.data?.docs?.map((item) => {
          return { value: item?._id, label: item?.gameName };
        }) || []
      );
    });
  }, []);

  let columns = [
    {
      id: "id",
      numeric: false,
      disablePadding: false,
      label: "Admin Role ID",
      type: "custom",
      render: (row, i) => {
        return <TableCell>{`ARID000${row?.numericId}`}</TableCell>;
      },
    },
    {
      id: "fullName",
      numeric: true,
      disablePadding: false,
      label: "Full Name",
    },
    {
      id: "email",
      numeric: true,
      disablePadding: false,
      label: "Email",
    },
    {
      id: "phoneNumber",
      numeric: true,
      disablePadding: false,
      label: "Phone Number",
      type: "custom",
      render: (row, i) => {
        return <TableCell>{row?.phoneNumber || "_"}</TableCell>;
      },
    },
    {
      id: "role",
      disablePadding: false,
      label: "Access Role Category",
      type: "custom",
      isDisbanding: true,
      render: (row) => {
        const { adminUserPermission } = row;

        const temp = Object.keys(adminUserPermission || {}).reduce(
          (acc, cur) => {
            return [...acc, adminUserPermission[cur].editor];
          },
          []
        );

        return (
          <TableCell>
            <ul>
              {adminUserPermission?.all?.viewer &&
              adminUserPermission?.all?.editor ? (
                <li>All Roles Viewers, All Roles Editors</li>
              ) : adminUserPermission?.all?.viewer &&
                temp?.includes(false) &&
                !temp?.includes(true) ? (
                <li>All Roles Viewers.</li>
              ) : (
                AdminRole?.filter((item) =>
                  Object?.keys(adminUserPermission || {})?.includes(item.value)
                )?.map((item) => {
                  return (
                    (adminUserPermission[item.value].viewer ||
                      adminUserPermission[item.value].editor) &&
                    item.label !== "All" && (
                      <li>
                        {item.label}{" "}
                        {adminUserPermission[item.value].viewer ? "Viewer" : ""}
                        {adminUserPermission[item.value].editor
                          ? ", " + item.label + " " + "Editor"
                          : ""}
                        {/*{*/}
                        {/*    item?.label === 'Help & Support' &&*/}
                        {/*    <ul className={'helpAndSupport-first_nested'}>*/}
                        {/*        {*/}
                        {/*            helpTicketTypeArr?.filter(item => Object?.keys(adminUserPermission || {})?.includes(item.value))?.map(item=>{*/}
                        {/*                return  <li>*/}
                        {/*                    {`Help & Support ${item?.label} Ticket`}*/}
                        {/*                    {*/}
                        {/*                        item?.label === 'Games' &&*/}
                        {/*                        <ul className={'helpAndSupport-sec_nested'}>*/}
                        {/*                            {*/}
                        {/*                                gameFilterData.filter(element => adminUserPermission?.helpAndSupportGame?.allowedGames?.includes(element?.value))?.map(item=>{*/}
                        {/*                                    return    <li>{item?.label}</li>*/}
                        {/*                                })*/}
                        {/*                            }*/}
                        {/*                        </ul>*/}
                        {/*                    }*/}
                        {/*                </li>*/}
                        {/*            })*/}
                        {/*        }*/}
                        {/*    </ul>*/}
                        {/*}*/}
                      </li>
                    )
                  );
                })
              )}
            </ul>
          </TableCell>
        );
      },
    },
    {
      id: "status",
      isDisbanding: true,
      label: "Status",
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell>{row?.isBlock ? "Deactivate" : "Activate"}</TableCell>
        );
      },
    },
    {
      id: "action",
      isDisbanding: true,
      label: "Action",
      type: "custom",
      render: (row) => {
        return (
          <TableCell className={"role_field_id"}>
            <span
              className="edit_btn edit-btn-action u_border"
              onClick={() =>
                handleOpenModal("AddAdminUserList", { isEdit: true, data: row })
              }
            >
              Edit
            </span>
            <span
              className="edit_btn edit-btn-action u_border prTab"
              onClick={() =>
                handleOpenModal("DeleteCommonModal", {
                  deleteListApiHandler: deleteAdminUserList({
                    adminUserId: row?._id,
                    adminUserRole: row?.role,
                  }),
                  title: "Do you want to delete this data?",
                })
              }
            >
              Delete
            </span>
            {!row?.isBlock ? (
              <span
                className="edit_btn edit-btn-action prTab"
                onClick={() =>
                  handleOpenModal("ActiveUserModal", {
                    adminUserId: row?._id,
                    adminUserRole: row?.role,
                    isBlock: true,
                  })
                }
              >
                Deactivate
              </span>
            ) : (
              <span
                className="edit_btn edit-btn-action prTab"
                onClick={() =>
                  handleOpenModal("ActiveUserModal", {
                    adminUserId: row?._id,
                    adminUserRole: row?.role,
                    isBlock: false,
                  })
                }
              >
                Activate
              </span>
            )}
          </TableCell>
        );
      },
    },
  ];

  const handleOpenModal = (type, data) => {
    switch (type) {
      case "AddAdminUserList": {
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
      case "ActiveUserModal": {
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
      default: {
        localStorage.setItem("closeModal", "true");
        setModalDetails({ ...modalDetails, modalIsOpen: false });
      }
    }
  };

  useEffect(() => {
    getAdminUserListData();
  }, [pagination.rowsPerPage, pagination.page]);

  const getAdminUserListData = () => {
    setLoader(true);
    let payload = {
      limit: pagination.rowsPerPage,
      start: (pagination.page + 1 - 1) * pagination.rowsPerPage,
    };
    dispatch(getAdminUserListing(payload)).then((res) => {
      setLoader(false);
      setRowData({
        ...rowData,
        list: res?.data?.data?.docs,
        totalDocs: res?.data?.data?.totalDocs,
      });
    });
  };

  return (
    <>
      {/* {loader ? <Loader /> : ""} */}
      <Paper sx={{ mb: 2 }} className="outer-box">
        <div className={"d_flex_end"}>
          <button
            className={"btn"}
            onClick={() =>
              handleOpenModal("AddAdminUserList", { isEdit: false })
            }
          >
            {" "}
            + Add Admin
          </button>
        </div>
        <CustomTable
          headCells={columns}
          rowData={rowData?.list}
          totalDocs={rowData?.totalDocs}
          pagination={pagination}
          setPagination={setPagination}
          isAdminUser={true}
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
          redirectApiHandler={getAdminUserListData}
        />
      </CommonModal>
    </>
  );
};
export default AdminUser;
