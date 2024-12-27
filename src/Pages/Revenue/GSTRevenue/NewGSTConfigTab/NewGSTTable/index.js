import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TableCell from "@material-ui/core/TableCell";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import { getNewGSTConfig } from "Redux/revenue/action";
import CommonModal from "hoc/CommonModal";
import PopComponent from "hoc/PopContent";
import { ActionFunction, hideActionFunc } from "utils";
import CustomTable from "hoc/CommonTable";


const NewGSTTable = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
  let Modal = PopComponent[modalDetails.modalName];

  useEffect(() => {
    getGSTConfigData();
  }, []);

  const getGSTConfigData = () => {
    setLoader(true);
    dispatch(getNewGSTConfig({}))
      .then((res) => {
        setLoader(false);
        if (res.data.success) {
          setRowData({
            ...rowData,
            list:
              Object.keys(res.data.data || {}).length > 0
                ? [res.data.data]
                : [],
            totalDocs: 0,
          });
        }
      })
      .catch((e) => {
        setLoader(false);
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
      case "AddNewGSTConfig": {
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
      label: "New GST (%)",
      sortable: false,
      isDisbanding: true,
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell className={"table_icon"}>
            {row?.platformGST ?? 0}%
          </TableCell>
        );
      },
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
              className="edit_btn edit-btn-action"
              onClick={() =>
                handleOpenModal("AddNewGSTConfig", { isEdit: true, row })
              }
            >
              Edit
            </span>
            {/* <span
              className="edit_btn edit-btn-action prTab"
              onClick={() =>
                handleOpenModal("DeleteCommonModal", {
                  deleteListApiHandler: deleteGSTConfig({
                    gstConfigId: row?._id,
                  }),
                  title: "Do you want to delete this data?",
                })
              }
            >
              Delete
            </span> */}
          </TableCell>
        );
      },
    }),
  ];

  return (
    <Box>
      {/* {loader ? <Loader /> : ""} */}

      <Paper sx={{ mb: 2 }} className="outer-box">
        {hideActionFunc("master") && rowData?.list?.length === 0 && (
          <div className={"d_flex_end"}>
            <button
              className={"btn"}
              onClick={(e) => handleOpenModal("AddNewGSTConfig")}
            >
              {" "}
              + Add GST Config
            </button>
          </div>
        )}
        <CustomTable
          headCells={columns}
          rowData={rowData?.list}
          isAboutWebsite={true}
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
          redirectApiHandler={getGSTConfigData}
        />
      </CommonModal>
    </Box>
  );
};
export default NewGSTTable;
