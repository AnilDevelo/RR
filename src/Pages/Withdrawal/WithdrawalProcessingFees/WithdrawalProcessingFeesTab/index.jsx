import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import PopComponent from "../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import {
  ActionFunction,
  currencyFormat,
  hideActionFunc,
} from "../../../../utils";
import {
  deleteWithdrawalProcessingFees,
  getWithdrawalProcessingFees,
} from "../../../../Redux/Master/action";
import Box from "@mui/material/Box";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";

const WithdrawalProcessingFeesTab = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 , startRange: '' , endRange: ''});
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
  const [filterData, setFilterData] = useState({
    startDate: null,
    endDate: null,
    statusValue: "All Days",
    exportFile: false,
    csvDownload: false,
    search: "",
    filterClose: false,
    exportFileName: 'Export File'
});
  let Modal = PopComponent[modalDetails.modalName];

  const columns = [
    {
      id: "id",
      numeric: false,
      disablePadding: false,
      label: "Users ID",
      type: "custom",
      render: (row, i) => {
        return <TableCell>{`WPFID000${row?.numericId}`}</TableCell>;
      },
    },
    {
      id: "start",
      label: "Start Amount",
      type: "custom",
      render: (row) => {
        return <TableCell>{currencyFormat(+row?.start)}</TableCell>;
      },
    },
    {
      id: "percentage",
      label: "Withdrawal Processing Fee Percentage (%) ",
      type: "custom",
      render: (row, i) => {
        return <TableCell>{row?.percentage}%</TableCell>;
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
            <span
              className={"edit_btn edit-btn-action u_border"}
              onClick={(e) =>
                handleOpenModal("AddWithdrawalProcessingFees", {
                  isEdit: true,
                  row,
                })
              }
            >
              Edit
            </span>
            <span
              className="edit_btn edit-btn-action prTab"
              onClick={() =>
                handleOpenModal("DeleteCommonModal", {
                  deleteListApiHandler: deleteWithdrawalProcessingFees({
                    processingId: row?._id,
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

  useEffect(() => {
    getWithdrawalProcessingFeesDetails();
  }, []);

  const getWithdrawalProcessingFeesDetails = () => {
    let payload = {
      limit: pagination?.endRange ?  pagination?.endRange : pagination.rowsPerPage  ,
      start: +pagination?.startRange ? +pagination?.startRange :   ((pagination.page + 1) - 1) * pagination.rowsPerPage,
    };
    setLoader(true);
    dispatch(getWithdrawalProcessingFees(payload)).then((res) => {
      setLoader(false);
      if(pagination?.endRange?.toString() !== '' && pagination?.startRange?.toString() !== '' ){
        setPagination({
            ...pagination,
            startRange:'',
            endRange: '',
            rowsPerPage: 10,
            page:0
        })
        setFilterData({
            ...filterData,
            csvDownload: false,
            exportFile: false,
            exportFileName: 'Export File'
        })
    }
      setRowData({
        ...rowData,
        list: res?.data?.data?.docs,
        totalDocs: res?.data?.data?.totalDocs || 0,
      });
    });
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
      case "AddWithdrawalProcessingFees": {
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

  return (
    <Box>
      {/* {loader ? <Loader /> : ""} */}
      <Paper sx={{ mb: 2 }} className="outer-box">
        {hideActionFunc("withdrawal") && (
          <div className={"d_flex_end"}>
            <button
              className={"btn"}
              onClick={(e) => handleOpenModal("AddWithdrawalProcessingFees")}
            >
              {" "}
              + Add Withdrawal Processing Fee
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
          redirectApiHandler={getWithdrawalProcessingFeesDetails}
        />
      </CommonModal>
    </Box>
  );
};
export default WithdrawalProcessingFeesTab;
