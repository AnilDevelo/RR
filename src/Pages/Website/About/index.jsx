import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import PopComponent from "../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import { useDispatch } from "react-redux";
import {
  deleteWebsiteAboutList,
  getWebsiteAboutList,
} from "../../../Redux/website/action";
import { ActionFunction, dotGenerator, hideActionFunc } from "../../../utils";

const About = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails?.modalName];

  let columns = [
    {
      id: "title",
      isDisbanding: true,
      label: "Title Name",
    },
    {
      id: "description",
      label: "Description",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {dotGenerator(
              new DOMParser().parseFromString(row?.description, "text/html")
                .documentElement.textContent,
              handleOpenModal,
              "About Description"
            )}
          </TableCell>
        );
      },
    },
    ActionFunction("webSite", {
      id: "action",
      label: "Action",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell className={"role_field_id"}>
            <span
              className="edit_btn edit-btn-action u_border"
              onClick={() =>
                handleOpenModal("AddAboutPopup", { isEdit: true, row })
              }
            >
              Edit
            </span>
            <span
              className="edit_btn edit-btn-action prTab"
              onClick={() =>
                handleOpenModal("DeleteCommonModal", {
                  deleteListApiHandler: deleteWebsiteAboutList({
                    aboutId: row?._id,
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

  const handleOpenModal = (type, data) => {
    switch (type) {
      case "AddAboutPopup": {
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
      default: {
        setModalDetails({ ...modalDetails, modalIsOpen: false });
      }
    }
  };

  useEffect(() => {
    getWebsiteAbout();
  }, []);

  const getWebsiteAbout = () => {
    setLoader(true);
    dispatch(getWebsiteAboutList({})).then((res) => {
      setLoader(false);
      if (res.data.success) {
        if (Object?.keys(res.data.data || {})?.length > 0) {
          let temp = [];
          temp.push(res.data?.data);
          setRowData(temp || []);
        } else {
          setRowData([]);
        }
      }
    });
  };

  return (
    <Box>
      {/* {loader ? <Loader /> : ""} */}
      <Paper sx={{ mb: 2 }} className="outer-box">
        {hideActionFunc("webSite") && rowData?.length === 0 && (
          <div className={"d_flex_end"}>
            <button
              className={"btn"}
              onClick={() => handleOpenModal("AddAboutPopup")}
            >
              + Add About
            </button>
          </div>
        )}

        <CustomTable
          headCells={columns}
          rowData={rowData}
          totalDocs={0}
          pagination={pagination}
          setPagination={setPagination}
          dragUpdater={""}
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
          redirectApiHandler={getWebsiteAbout}
        />
      </CommonModal>
    </Box>
  );
};
export default About;
