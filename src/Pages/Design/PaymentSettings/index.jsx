import React, { useEffect, useState } from "react";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import PopComponent from "../../../hoc/PopContent";
import TableCell from "@material-ui/core/TableCell";
import { ActionFunction, hideActionFunc } from "../../../utils";
import user from "../../../assets/images/avatar.png";
import {deletePaymentSettingsData, getPaymentSettingsData} from "../../../Redux/Design/action";

const PaymentSettings = () => {

  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
  const getAllAvatar = useSelector((state) => state.footerReducer.getAllAvatar);

  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];
  useEffect(() => {
    getAllPaymentSettingsData();
  }, [pagination.rowsPerPage, pagination.page]);

  const getAllPaymentSettingsData = (startDate, endDate, search) => {
    let payload = {
      start: (pagination.page + 1 - 1) * pagination.rowsPerPage,
      limit: pagination.rowsPerPage,
      searchText: search,
    };
    setLoader(true);
    dispatch(getPaymentSettingsData(payload))
      .then((res) => {
        if (res.data.statusCode === 200 && res.data.success) {
          setLoader(false);
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
      case "AddPaymentSettingPopUp": {
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
      label: "Payment Type Icon",
      sortable: false,
      isDisbanding: true,
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell className={"game_icon_img"}>
            <img src={row?.paymentModeIcon || user} alt={""} />
          </TableCell>
        );
      },
    },
    {
      id: "paymentModeTitle",
      numeric: true,
      disablePadding: false,
      label: "Title Name",
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
                handleOpenModal("AddPaymentSettingPopUp", { isEdit: true, row })
              }
            >
              Edit
            </span>
            <span
              className="edit_btn edit-btn-action prTab"
              onClick={() =>
                handleOpenModal("DeleteCommonModal", {
                  deleteListApiHandler: deletePaymentSettingsData({
                    paymentModeIconId: row?._id
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
        {hideActionFunc("master") && getAllAvatar?.list?.length !== 2 && (
          <div className={"d_flex_end"}>
            <button
              className={"btn"}
              onClick={(e) => handleOpenModal("AddPaymentSettingPopUp")}
            >
              {" "}
              + Add Payment Settings
            </button>
          </div>
        )}
        <CustomTable
          headCells={columns}
          rowData={getAllAvatar?.list}
          totalDocs={getAllAvatar?.totalDocs}
          pagination={pagination}
          setPagination={setPagination}
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
          redirectApiHandler={getAllPaymentSettingsData}
        />
      </CommonModal>
    </Box>
  );
};
export default PaymentSettings;
