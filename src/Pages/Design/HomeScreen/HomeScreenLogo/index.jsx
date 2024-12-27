import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import PopComponent from "../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import { ActionFunction, hideActionFunc } from "../../../../utils";
import CommonModal from "../../../../hoc/CommonModal";
import user from "../../../../assets/images/avatar.png";
import { Box } from "@mui/material";
import Loader from "../../../../images/Loader";
import {
  deleteHomeScreenLogo,
  getHomeScreenLogo,
} from "../../../../Redux/Design/action";

const HomeScreenLogo = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });

  useEffect(() => {
    getHomeScreenLogoList();
  }, []);

  const getHomeScreenLogoList = () => {
    setLoader(true);
    dispatch(getHomeScreenLogo({}))
      .then((res) => {
        if (res.data.success) {
          setLoader(false);
          setRowData({
            ...rowData,
            list:
              Object?.keys(res?.data?.data || {})?.length > 0
                ? [res?.data?.data]
                : [],
          });
        } else {
          setLoader(false);
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
      case "AddHomeScreenLogo": {
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
      label: "Footer Icon",
      sortable: false,
      isDisbanding: true,
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell className={"table_icon"}>
            <img src={row?.footerLogoImage || user} alt={""} />
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
              className="edit_btn edit-btn-action u_border"
              onClick={() =>
                handleOpenModal("AddHomeScreenLogo", { isEdit: true, row })
              }
            >
              Edit
            </span>
            <span
              className="edit_btn edit-btn-action prTab"
              onClick={() =>
                handleOpenModal("DeleteCommonModal", {
                  deleteListApiHandler: deleteHomeScreenLogo({
                    homeScreenFooterLogoId: row?._id,
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
        {hideActionFunc("master") && rowData?.list?.length === 0 && (
          <div className={"d_flex_end"}>
            <button
              className={"btn"}
              onClick={(e) => handleOpenModal("AddHomeScreenLogo")}
            >
              {" "}
              + Add Home Screen Logo{" "}
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
          redirectApiHandler={getHomeScreenLogoList}
        />
      </CommonModal>
    </Box>
  );
};
export default HomeScreenLogo;
