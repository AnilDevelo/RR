import React, { useEffect, useState } from "react";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import { useDispatch } from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import { getTicketsVideoDetails } from "../../../Redux/HelpAndSupport/action";
import { ActionFunction, dotGenerator, hideActionFunc } from "../../../utils";
import TableCell from "@mui/material/TableCell";
import { getSplashScreenList } from "../../../Redux/Master/action";
import TagLineTable from "./TagLineTable";
import SplashScreenImage from "./SplashScreenImage";

const SplashScreen = () => {
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];

  useEffect(() => {
    getSplashScreenVideo();
  }, []);

  const getSplashScreenVideo = () => {
    setLoader(true);
    dispatch(getSplashScreenList({})).then((res) => {
      setLoader(false);
      if (res?.data?.success) {
        setRowData({
          ...rowData,
          list:
            Object?.keys(res.data.data || {})?.length > 0
              ? [res.data.data]
              : [],
          totalDocs: 0,
        });
      }
    });
  };

  const columns = [
    {
      id: "splashScreenVideo",
      label: "video / Image",
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {" "}
            <span
              className="edit_btn edit-btn-action"
              onClick={() => handleOpenModal("ViewHowToPlayPopup", row)}
            >
              View
            </span>
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
                handleOpenModal("AddSplashScreen", { isEdit: true, row })
              }
            >
              Edit
            </span>
          </TableCell>
        );
      },
    }),
  ];

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
      case "AddSplashScreen": {
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
      case "ViewHowToPlayPopup": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "AddTagLineSplashScreen": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case 'ViewRejectedComment': {
        setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
        break;
    }
      default: {
        setModalDetails({ ...modalDetails, modalIsOpen: false });
      }
    }
  };
  

  return (
    <React.Fragment>
      {/* {loader ? <Loader /> : ""} */}
      <Paper sx={{ mb: 2 }} className="outer-box">
        <div className={"d_flex_between"}>
          <h2>Splash Screen Video/Images</h2>
          <div className={"d_flex"}>
            {hideActionFunc("master") && !rowData?.list?.[0]?.tagLine && (
              <div className={"admin_user_list mr_1"}>
                <button
                  className={"btn"}
                  onClick={(e) => handleOpenModal("AddTagLineSplashScreen")}
                >
                  {" "}
                  + Add Tag Line
                </button>
              </div>
            )}

            {hideActionFunc("master") &&
              !rowData?.list?.[0]?.splashScreen?.value && (
                <div className={"admin_user_list left-side"}>
                  <button
                    className={"btn"}
                    onClick={(e) => handleOpenModal("AddSplashScreen")}
                  >
                    {" "}
                    + Add Splash Screen
                  </button>
                </div>
              )}
          </div>
        </div>
        {rowData?.list?.[0]?.splashScreen?.value && (
          <CustomTable
            headCells={columns}
            rowData={rowData?.list}
            totalDocs={rowData?.totalDocs}
            pagination={pagination}
            setPagination={setPagination}
            isWinnerTitle={true}
            loading={loader}
          />
        )}
      </Paper>
      {rowData?.list?.[0]?.tagLine !== "" && rowData?.list?.[0]?.tagLine && (
        <TagLineTable rowData={rowData} handleOpenModal={handleOpenModal} />
      )}
      {rowData?.list?.[0]?.type === "Image" ? <SplashScreenImage/> : ""}
      {/* <SplashScreenImage /> */}
      <CommonModal
        className={"Approved-reject-section"}
        modalIsOpen={modalDetails.modalIsOpen}
        handleOpenModal={handleOpenModal}
      >
        <Modal
          modalValue={modalDetails.modalValue}
          handleOpenModal={handleOpenModal}
          modalIsOpen={modalDetails.modalIsOpen}
          redirectApiHandler={getSplashScreenVideo}
        />
      </CommonModal>
    </React.Fragment>
  );
};
export default SplashScreen;
