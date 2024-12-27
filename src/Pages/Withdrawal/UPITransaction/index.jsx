import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import { deleteGSTConfig, getGSTConfig } from "../../../Redux/revenue/action";
import TableCell from "@material-ui/core/TableCell";
import { ActionFunction, hideActionFunc } from "../../../utils";
import { Box } from "@mui/material";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import {
  deleteUserDepositRequest,
  getUPITransaction,
} from "../../../Redux/Master/action";
import user from "../../../assets/images/avatar.png";

const UPITransaction = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
  let Modal = PopComponent[modalDetails.modalName];

  useEffect(() => {
    getUPITransactionData();
  }, [pagination.rowsPerPage, pagination.page]);

  const getUPITransactionData = () => {
    setLoader(true);
    let payload = {
      limit: pagination.rowsPerPage,
      start: (pagination.page + 1 - 1) * pagination.rowsPerPage,
    };
    dispatch(getUPITransaction(payload))
      .then((res) => {
        setLoader(false);
        if (res.data.success) {
          setRowData({
            ...rowData,
            list: res.data.data?.upiQrCode,
            totalDocs: res?.data?.data?.totalDocs,
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
      case "AddUPITransaction": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "ActivateDeactivateUPITransaction": {
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
      label: "UPI QR Code",
      sortable: false,
      isDisbanding: true,
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell className={"table_icon"}>
            <img src={row?.upiQrCodeImage || user} alt={""} />
          </TableCell>
        );
      },
    },
    {
      label: "UPI Id",
      sortable: false,
      isDisbanding: true,
      type: "custom",
      render: (row, i) => {
        return <TableCell className={"table_icon"}>{row?.upiId}</TableCell>;
      },
    },
    {
      label: "Transaction Count",
      sortable: false,
      isDisbanding: true,
      type: "custom",
      render: (row, i) => {
        return <TableCell>{row?.transectionCount}</TableCell>;
      },
    },
    {
      label: "Status",
      sortable: false,
      isDisbanding: true,
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell className={"table_icon"}>
            <span className={row?.isActive ? "Approved" :"Reject"}>{row?.isActive ? "Activate" : "Deactivate"}</span>
          </TableCell>
        );
      },
    },
    ActionFunction("withdrawal", {
      id: "Action",
      disablePadding: false,
      isDisbanding: true,
      label: "Action",
      type: "custom",
      render: (row) => {
        return (
          <TableCell className={"role_field_id"}>
            {!row?.isActive && (
              <span
                className="edit_btn edit-btn-action prTab u_border"
                onClick={() =>
                  handleOpenModal("DeleteCommonModal", {
                    deleteListApiHandler: deleteUserDepositRequest({
                      upiQrCodeId: row?._id,
                    }),
                    title: "Do you want to delete this data?",
                  })
                }
              >
                Delete
              </span>
            )}

            {row?.isActive ? (
              <span
                className="edit_btn edit-btn-action prTab"
                onClick={() =>
                  handleOpenModal("ActivateDeactivateUPITransaction", row)
                }
              >
                Deactivate
              </span>
            ) : (
              <span
                className={"edit_btn edit-btn-action prTab"}
                onClick={() =>
                  handleOpenModal("ActivateDeactivateUPITransaction", row)
                }
              >
                Activate
              </span>
            )}
            {/*<span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('AddUPITransaction', {  isEdit: true, row })}>Edit</span>*/}
          </TableCell>
        );
      },
    }),
  ];

  return (
    <Box>
      {/* {loader ? <Loader /> : ""} */}

      <Paper sx={{ mb: 2 }} className="outer-box">
        {hideActionFunc("withdrawal") && (
          <div className={"d_flex_end"}>
            <button
              className={"btn"}
              onClick={(e) => handleOpenModal("AddUPITransaction")}
            >
              {" "}
              + Add UPI QR Code
            </button>
          </div>
        )}
        <CustomTable
          headCells={columns}
          rowData={rowData?.list}
          totalDocs={rowData?.totalDocs}
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
          redirectApiHandler={getUPITransactionData}
        />
      </CommonModal>
    </Box>
  );
};
export default UPITransaction;
