import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import PopComponent from "../../../../hoc/PopContent";
import TableCell from "@material-ui/core/TableCell";
import { ActionFunction, dotGenerator, hideActionFunc } from "../../../../utils";
import {
  deletedReportedConfig,
  getReportedConfig,
} from "../../../../Redux/user/action";

function ReferAndEarnSteps() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  const [rowData, setRowData] = useState({});
  let Modal = PopComponent[modalDetails.modalName];
  useEffect(() => {
    getRepotedConfig();
  }, [pagination.rowsPerPage, pagination.page]);

  function getRepotedConfig(startDate, endDate, search) {
    let payload = {
      start: (pagination.page + 1 - 1) * pagination.rowsPerPage,
      limit: pagination.rowsPerPage,
      searchText: search,
    };
    setLoader(true);
    dispatch(getReportedConfig(payload)).then((res) => {
      if (res.data.success) {
        setRowData(res?.data?.data || []);
        setLoader(false);
      }
    });
  }

  function handleOpenModal(type, data) {
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
      case "AddConfig": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case 'ViewRejectedComment' : {
        setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
        break;
    }
      default: {
        setModalDetails({ ...modalDetails, modalIsOpen: false });
      }
    }
  }

  const columns = [
    {
      id: "description",
      numeric: true,
      disablePadding: false,
      label: "Description",
      type: "custom",
      render: (row) => {
        return <TableCell >{row?.description ? dotGenerator(row?.description, handleOpenModal, 'Description') : ''}</TableCell>
    }
    },
    ActionFunction("user", {
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
              onClick={() => handleOpenModal("AddConfig", { isEdit: true, row })}
            >
              Edit
            </span>
            <span
              className="edit_btn edit-btn-action prTab"
              onClick={() => handleOpenModal("DeleteCommonModal", {
                deleteListApiHandler: deletedReportedConfig({
                  reportConfigId: row?._id,
                }),
                title: "Do you want to delete this data?",
              })}
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
      <Paper sx={{ mb: 2 }} className="outer-box">
        {hideActionFunc('user') && (
          <div className={"d_flex_end"}>
            <button
              className={"btn font-bold"}
              onClick={(e) => handleOpenModal("AddConfig")}
            >
              + Add Report Type
            </button>
          </div>
        )}
        <CustomTable
          headCells={columns}
          rowData={rowData}
          totalDocs={rowData?.length}
          pagination={pagination}
          setPagination={setPagination}
          loading={loader}
          // isWinnerTitle={true} 
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
          redirectApiHandler={getRepotedConfig} />
      </CommonModal>
    </Box>
  );
}
export default ReferAndEarnSteps;
