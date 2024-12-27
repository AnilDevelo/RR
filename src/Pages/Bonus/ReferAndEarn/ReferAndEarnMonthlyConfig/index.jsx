import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import { useDispatch } from "react-redux";
import PopComponent from "../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import {
  ActionFunction,
  currencyFormat,
  hideActionFunc,
} from "../../../../utils";
import MainCommonFilter from "../../../../Components/MainCommonFilter";
import {
  deleteReferAndEarnPointsConfig,
  getReferAndEarnPointsConfig,
} from "../../../../Redux/Bonus/action";

const ReferAndEarnMonthlyConfig = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
  let Modal = PopComponent[modalDetails.modalName];
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
  const [filterData, setFilterData] = useState({
    startDate: null,
    endDate: null,
    categoryType: "All Category Type",
  });

  const columns = [
    {
      id: "categoryType",
      label: "Point category Type",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {row?.categoryType === "Basic"
              ? "Refer & Earn Basic"
              : row?.categoryType === "TargetBase"
              ? "Refer & Earn Target Base"
              : row?.categoryType === "AddCash"
              ? "Add Cash"
              : row?.categoryType === "AddCashByReferral" &&
                "Add Cash by Referral"}
          </TableCell>
        );
      },
    },
    {
      id: "points",
      label: "Points",
      isDisbanding: true,
    },
    {
      id: "noOfRefer",
      label: "Number Of Refer",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        return <TableCell>{row?.noOfRefer ? row?.noOfRefer : "-"}</TableCell>;
      },
    },
    {
      id: "minimumAddCash",
      label: "Cash Minimum Amount",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {row?.minimumAddCash ? currencyFormat(+row?.minimumAddCash) : "-"}
          </TableCell>
        );
      },
    },
    {
      id: "daysLimit",
      label: "Is Days Limit",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {row?.isDaysLimit ? `Yes` : row?.isDaysLimit === false ? "No" : "-"}
          </TableCell>
        );
      },
    },
    {
      id: "daysLimit",
      label: "Days Limit",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {row?.daysLimit ? `${row?.daysLimit} Days` : "-"}
          </TableCell>
        );
      },
    },
    ActionFunction("bonus", {
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
              onClick={(e) =>
                handleOpenModal("AddMonthlyReferAndEarnConfigPopup", {
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
                  deleteListApiHandler: deleteReferAndEarnPointsConfig({
                    pointsConfigId: row?._id,
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
      case "AddMonthlyReferAndEarnConfigPopup": {
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
    getReferAndEarnPointList();
  }, [filterData?.categoryType, pagination.rowsPerPage, pagination.page]);

  const getReferAndEarnPointList = () => {
    let payload = {
      limit: pagination?.endRange
        ? pagination?.endRange
        : pagination.rowsPerPage,
      start: pagination?.startRange
        ? +pagination?.startRange - 1
        : (pagination.page + 1 - 1) * pagination.rowsPerPage,
      categoryType: "",
    };
    
    if (filterData && filterData.categoryType !== "All Category Type") {
      switch (filterData.categoryType) {
        case "Refer & Earn Basic":
          payload.categoryType = "Basic";
          break;
        case "Refer & Earn Target Base":
          payload.categoryType = "TargetBase";
          break;
        case "Add Cash":
          payload.categoryType = "AddCash";
          break;
        case "Add Cash by Referral":
          payload.categoryType = "AddCashByReferral";
          break;
        default:
          // Handle unknown categoryType value if necessary
          break;
      }
    }
    Object?.keys(payload).forEach((ele) => {
      if (payload[ele] === "" || payload[ele] === null) {
        delete payload[ele];
      }
    });
    dispatch(getReferAndEarnPointsConfig(payload)).then((res) => {
      setLoader(false);
      setRowData({
        ...rowData,
        list: res.data.data?.docs,
        totalDocs: res.data.data.totalDocs,
      });
    });
  };
  useEffect(() => {
    setPagination({
      rowsPerPage: 10,
      page: 0,
      startRange: "",
      endRange: "",
    })
 }, [filterData?.categoryType])
  return (
    <Box>
      {/* {loader ? <Loader /> : ""} */}
      <Paper sx={{ mb: 2 }} className="outer-box">
        <div className={"d_flex_between"}>
          {/* <h2>Monthly Refer & Earn Point Config</h2> */}
          {hideActionFunc("bonus") && (
            <button
              className={"btn mb_1"}
              onClick={(e) =>
                handleOpenModal("AddMonthlyReferAndEarnConfigPopup")
              }
            >
              {" "}
              + Add Monthly Refer & Earn Point Config
            </button>
          )}

          <MainCommonFilter
            filterData={filterData}
            setFilterData={setFilterData}
            pagination={pagination}
            setPagination={setPagination}
            addPropsFilter={{ isReferAndEarn: true }}
          />
        </div>
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
          redirectApiHandler={getReferAndEarnPointList}
        />
      </CommonModal>
    </Box>
  );
};
export default ReferAndEarnMonthlyConfig;
