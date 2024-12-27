import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import { ActionFunction, hideActionFunc } from "../../../utils";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import { useDispatch } from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import TableCell from "@material-ui/core/TableCell";
import {
  getReasonReport,
  deleteReasonReport,
} from "../../../Redux/Avatar/action";

const ReportReason = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];

  useEffect(() => {
    getReportReason();
  }, [pagination.rowsPerPage, pagination.page]);

  const getReportReason = () => {
    let payload = {
      limit: pagination.rowsPerPage,
      start: (pagination.page + 1 - 1) * pagination.rowsPerPage,
    };
    setLoader(true);
    dispatch(getReasonReport(payload)).then((res) => {
      setLoader(false);
      setRowData({
        ...rowData,
        list: res?.data?.data?.docs,
        totalDocs: res?.data?.data?.totalDocs,
      });
    });
  };

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
      case "CommonPop": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "AddReportReason": {
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
      id: "reportReason",
      numeric: true,
      disablePadding: false,
      label: "Report Reason",
    },
    ActionFunction("master", {
      id: "Action",
      disablePadding: false,
      isDisbanding: true,
      label: "Action",
      type: "custom",
      render: (row) => {
        return (
          <TableCell className={"role_field_id"}>
            <span
              className="edit_btn edit-btn-action u_border"
              onClick={() =>
                handleOpenModal("AddReportReason", { isEdit: true, row })
              }
            >
              Edit
            </span>
            <span
              className="edit_btn edit-btn-action prTab"
              onClick={() =>
                handleOpenModal("DeleteCommonModal", {
                  deleteListApiHandler: deleteReasonReport({
                    reportReasonId: row?._id,
                  }),
                  title: "Do you want to delete this data?",
                })
              }
            >
              Delete
            </span>
          </TableCell>
        );
      },
    }),
  ];

  return (
    <Box>
      {/* {loader ? <Loader /> : ""} */}

      <Paper sx={{ mb: 2 }} className="outer-box">
        {hideActionFunc("master") && (
          <div className={"d_flex_end"}>
            <button
              className={"btn"}
              onClick={(e) => handleOpenModal("AddReportReason")}
            >
              {" "}
              + Add Report Reason
            </button>
          </div>
        )}
        <CustomTable
          headCells={columns}
          rowData={rowData?.list}
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
          redirectApiHandler={getReportReason}
        />
      </CommonModal>
    </Box>
  );
};
export default ReportReason;
