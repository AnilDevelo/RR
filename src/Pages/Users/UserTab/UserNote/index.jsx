import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import Loader from "../../../../images/Loader";
import TableCell from "@mui/material/TableCell";
import PopComponent from "../../../../hoc/PopContent";
import CommonModal from "../../../../hoc/CommonModal";
import SimpleReactValidator from "simple-react-validator";
import MainCommonFilter from "../../../../Components/MainCommonFilter";
import {
  createUsersNote,
  deleteUsersNote,
  getUsersNote,
  updateUsersNote,
} from "../../../../Redux/user/action";
import { ActionFunction, dotGenerator, hideActionFunc } from "../../../../utils";
import { createFlagConfig } from "../../../../Redux/settings/action";
import TableLoader from "hoc/CommonTable/TableLoader";

const UserNote = () => {
  const [filterData, setFilterData] = useState({
    search: "",
    filterClose: false,
  });
  const dispatch = useDispatch();
  const { id } = useParams();
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);
  const simpleValidator = useRef(new SimpleReactValidator());
  const [loader, setLoader] = useState(false);
  const noteList = useSelector((state) => state.userReducer.noteList);
  const [isEdit, setIsEdit] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails?.modalName];
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
  const [editId, setEditId] = useState({ editId: "" });
  const [formData, setFormData] = useState({ note: "" });

  useEffect(() => {
    getNoteList();
  }, []);

  const getNoteList = (startDate, endDate, search) => {
    let payload = {
      userId: id,
      searchText: search,
      start: (pagination.page + 1 - 1) * pagination.rowsPerPage,
      limit: pagination.rowsPerPage,
    };
    setLoader(true);
    dispatch(getUsersNote(payload))
      .then((res) => {
        setLoader(false);
      })
      .catch((e) => {
        setLoader(false);
      });
  };

  const editNoteDataHandler = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      let payload = {
        ...formData,
        noteId: editId.editId,
      };
      dispatch(updateUsersNote(payload)).then((res) => {
        if (res.data.statusCode === 200) {
          getNoteList();
          setFormData({
            ...formData,
            note: "",
          });
          setIsEdit(false);
          handleOpenModal("CommonPop", {
            header: "Success",
            body: res.data.message,
          });
          simpleValidator.current.hideMessages();
          setFormData({
            note: "",
          });
        } else {
          handleOpenModal("CommonPop", {
            header: "Error",
            body: res.data.message || res?.data?.msg,
          });
        }
      });
    } else {
      simpleValidator.current.showMessages();
      forceUpdate();
    }
  };

  const addNoteHandler = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      let payload = {
        ...formData,
        userId: id,
      };
      dispatch(createUsersNote(payload)).then((res) => {
        if (res.data.statusCode === 200) {
          getNoteList();
          setFormData({
            ...formData,
            note: "",
          });
          handleOpenModal("CommonPop", {
            header: "Success",
            body: res.data.message,
          });
          simpleValidator.current.hideMessages();
          setFormData({
            note: "",
          });
        } else {
          handleOpenModal("CommonPop", {
            header: "Error",
            body: res.data.message || res?.data?.msg,
          });
        }
      });
    } else {
      simpleValidator.current.showMessages();
      forceUpdate();
    }
  };

  const closeAvatarHandler = () => {
    setIsEdit(false);
    setFormData({
      ...formData,
      note: "",
    });
  };

  const columns = [
    {
      id: "",
      numeric: true,
      disablePadding: true,
      label: "Note",
      type: "custom",
      render: (row) => {
        return <TableCell>{dotGenerator(row?.note, handleOpenModal, 'User Note')}</TableCell>;
      },
    },
    {
      id: "adminName",
      numeric: true,
      disablePadding: false,
      label: "Admin Name",
      type: "custom",
      render: (row) => {
        return <TableCell>{row?.adminId?.fullName}</TableCell>;
      },
    },
    // {
    //     id: 'userName',
    //     numeric: true,
    //     disablePadding: false,
    //     label: 'Users Name',
    //     isDisbanding: true,
    //     type: "custom",
    //     render: (row) => {
    //         return <TableCell >{row?.userId?.fullName}</TableCell>
    //     }
    // },
    {
      id: "createdAt",
      numeric: true,
      disablePadding: false,
      label: "Created At",
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {moment(row?.createdAt).format("MMM DD YYYY, hh:mm A")}
          </TableCell>
        );
      },
    },
    ActionFunction("user", {
      id: "action",
      disablePadding: false,
      isDisbanding: true,
      label: "Action",
      type: "custom",
      render: (row) => {
        return (
          <TableCell className={"role_field_id"}>
            <span
              className="edit_btn edit-btn-action u_border"
              onClick={() => editAvatarHandler(row)}
            >
              {" "}
              Edit{" "}
            </span>
            <span
              className="edit_btn edit-btn-action prTab"
              onClick={() => handleDeleteFun(row)}
            >
              {" "}
              Delete{" "}
            </span>
          </TableCell>
        );
      },
    }),
  ];

  const handleDeleteFun = (row) => {
    setIsEdit(false);
    setFormData({
      ...formData,
      note: "",
    });
    handleOpenModal("DeleteCommonModal", {
      deleteListApiHandler: deleteUsersNote({ noteId: row?._id }),
      title: "Do you want to delete this data?",
    });
  };

  const editAvatarHandler = (row) => {
    setEditId({
      ...editId,
      editId: row.id,
    });
    setFormData({
      ...formData,
      note: row?.note,
    });
    setIsEdit(true);
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
      case "DeleteCommonModal": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case 'ViewRejectedComment' :{
        setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
        break;
    }
      default: {
        setModalDetails({ ...modalDetails, modalIsOpen: false });
      }
    }
  };

  return (
    <>
      {loader && <TableLoader />}
      {hideActionFunc("user") && (
        <Box className="outer-box bg_white box_shadow radius_8">
          <form
            onSubmit={isEdit ? editNoteDataHandler : addNoteHandler}
            className={"avatar-section-data"}
          >
            <Box className={"avatar-container avatar_container_details"}>
              <div className={"avatar-modal"}>
                <Box className={"avatar-name-data"}>
                  <label className={"fontFamily"}>
                    {" "}
                    Note <span className={"validation-star"}>*</span>{" "}
                  </label>
                  <input
  size="small"
  className="fontFamily"
  id="outlined-basic"
  placeholder="Enter Note"
  name="note"
  value={formData.note}
  onChange={(e) => {
    const { value } = e.target;
    const sanitizedValue = value.replace(/[/\-*+.!@#$%^&*()]/g, "");
    setFormData({ ...formData, note: sanitizedValue });
  }}
/>
                </Box>
                {/* {simpleValidator.current.message(
                  "note",
                  formData?.note,
                  "required"
                )} */}
              </div>
              <Box>
                <Box>
                  {" "}
                  <label className={"fontFamily"}>Action</label>{" "}
                </Box>
                {isEdit ? (
                  <div className={"edit_avatar_btn"}>
                    <Button
                      variant="contained"
                      type={"submit"}
                      sx={{ marginRight: "10px" }}
                    >
                      {" "}
                      <EditIcon />{" "}
                    </Button>
                    <Button
                      variant="contained"
                      type={"reset"}
                      onClick={() => closeAvatarHandler()}
                    >
                      {" "}
                      <CloseIcon />{" "}
                    </Button>
                  </div>
                ) : (
                  <Button variant="contained" type="submit" style={{marginTop:"0"}}>
                    <AddIcon />
                  </Button>
                )}
              </Box>
            </Box>
            <p className="avatar-container avatar_container_details">
            {simpleValidator.current.message(
                  "note",
                  formData?.note,
                  "required|min:2"
                )}
            </p>
          </form>
        </Box>
      )}

      <Box>
        <Paper sx={{ mb: 2 }} className="outer-box">
        {loader && <TableLoader/>}
          <MainCommonFilter
            filterData={filterData}
            setFilterData={setFilterData}
            searchApiHandler={getNoteList}
            pagination={pagination}
            setPagination={setPagination}
            addPropsFilter={{ isAvatar: true }}
          />
          <CustomTable
            headCells={columns}
            rowData={noteList?.list}
            totalDocs={noteList?.totalDocs}
            pagination={pagination}
            setPagination={setPagination}
            loading={loader}
          />
        </Paper>
      </Box>
      <CommonModal
        className={"Approved-reject-section"}
        modalIsOpen={modalDetails.modalIsOpen}
        handleOpenModal={handleOpenModal}
      >
        <Modal
          modalValue={modalDetails.modalValue}
          handleOpenModal={handleOpenModal}
          modalIsOpen={modalDetails.modalIsOpen}
          redirectApiHandler={getNoteList}
        />
      </CommonModal>
    </>
  );
};
export default UserNote;
