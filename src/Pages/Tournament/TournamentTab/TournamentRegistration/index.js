import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PopComponent from "../../../../hoc/PopContent";
import {
  ActionFunction,
  hideActionFunc,
} from "../../../../utils";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import { deleteTournamentList, getTournamentList } from "Redux/Tournament/action";
import { useParams } from "react-router-dom";
import moment from "moment";

const TournamentRegistration = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
  let Modal = PopComponent[modalDetails.modalName];
  const { id } = useParams();
  useEffect(() => {
      getTournamentsListDetails();
  }, [pagination.rowsPerPage,pagination.page])

  const handleOpenModal = (type, data) => {
    const modalValue = data;
    const modalName = type;
    const modalIsOpen = true;

    switch (type) {
      case "CommonPop":
      case "AddRegistration":
      case "DeleteCommonModal":
      case "ViewRejectedComment":
        setModalDetails({
          ...modalDetails,
          modalValue,
          modalName,
          modalIsOpen,
        });
        break;
      default:
        setModalDetails({ ...modalDetails, modalIsOpen: false });
    }
  };

  const columns = [
    {
      id: "registrationStartDate",
      label: "Registration Start Date",
      twoLineText: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {moment(row?.registrationStartDate).format("MMM DD YYYY, hh:mm A")}
          </TableCell>
        );
      },
    },
    {
      id: "tournamentStartDate",
      label: "Tournament Start Date",
      twoLineText: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {moment(row?.tournamentStartDate).format("MMM DD YYYY, hh:mm A")}
          </TableCell>
        );
      },
    },
    {
      id: "tournamentEndDate",
      label: "Tournament End Date",
      twoLineText: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {moment(row?.tournamentEndDate).format("MMM DD YYYY, hh:mm A")}
          </TableCell>
        );
      },
    },
    {
      id: "waitingTime",
      isDisbanding: true,
      label: "Waiting time",
      twoLineText: true,
    },
    {
      id: "minimumPlayers",
      label: "Minimum Players",
    },
    {
      id: "maximumPlayers",
      label: "Maximum Players",
    },
    {
      id: "gameTableSeatSize",
      label: "Game table seat size",
    },
    {
      id: "timeLimitForEachRound",
      label: "Time limit for each round",
    },
    {
      id: "entryFee",
      label: "Entry Fee",
    },
    rowData?.list[0]?.tournamentId?.gameModeId?.gameModeName === 'Points' && (
    {
      id: "pointValue",
      label: "Point Value",
    }),
   
    ActionFunction("tournament", {
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
                handleOpenModal("AddRegistration", {
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
                  deleteListApiHandler: deleteTournamentList({
                    tournamentRegistrationId : row?._id,
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

  const getTournamentsListDetails = () => {
      let payload = {
          limit: pagination.rowsPerPage,
          start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
          tournamentId : id
      };
      setLoader(true);
      dispatch(getTournamentList(payload)).then(res => {
          setLoader(false)
          setRowData({
              ...rowData,
              list: res?.data?.data?.docs,
              totalDocs: res?.data?.data?.totalDocs
          })
      });
  };
  return (
    <Box>
      <Paper sx={{ mb: 2 }} className="outer-box">
        {(hideActionFunc("Tournament") && rowData?.list?.length === 0) && (
          <div className={"d_flex_end"}>
            <button
              className={"btn"}
              onClick={(e) =>
                handleOpenModal("AddRegistration")
              }
            >
              + Create Registration
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
          isWinnerTitle={true}
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
          redirectApiHandler={getTournamentsListDetails}
        />
      </CommonModal>
    </Box>
  );
};
export default TournamentRegistration;
