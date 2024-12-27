import React, { useEffect, useState } from "react";
import CustomTable from "../../../../../../hoc/CommonTable";
import Paper from "@mui/material/Paper";
import moment from "moment";
import {
  deleteGameTournament,
  getGameLobbyList,
  getGameTournamentLobby,
} from "../../../../../../Redux/games/action";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import {
  currencyFormat,
  dotGenerator,
  ActionFunction,
} from "../../../../../../utils";

const RecurringTournament = ({ handleOpenModal }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
  const [loader, setLoader] = useState(false);
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
  const [filterData, setFilterData] = useState({
    startDate: null,
    endDate: null,
    statusValue: "All Days",
    exportFile: false,
    csvDownload: false,
    search: "",
    filterClose: false,
    exportFileName: "Export File",
    statusField: "All Game Mode",
    platformName: "All Number Of Player",
  });

  const columns = [
    {
      id: "id",
      label: "Tournament Icon",
      type: "custom",
      render: (row, i) => {
        return <TableCell className={"game_icon_img"}>{row?.tournamentIconImage ? <img src={row?.tournamentIconImage} alt=""></img> : "-" }</TableCell>;
      },
    }, 
    {
      id: "id",
      label: "Tournament ID",
      type: "custom",
      render: (row, i) => {
        return <TableCell>{`TH00000${row?.numericId}`}</TableCell>;
      },
    },
    {
      id: "tournamentName",
      label: "Tournament Name",
    },
    {
      id: "noOfPlayer",
      label: "Number Of </br> Player ",
      twoLineText: true,
    },
    {
      id: "entryfee",
      label: "Entry Fee",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell className={"text_center"}>
            {currencyFormat(+row?.entryfee)}
          </TableCell>
        );
      },
    },
    {
      id: "winningPrice",
      label: "Winning </br> Amount",
      twoLineText: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell className={"text_center"}>
            {currencyFormat(+row?.winningPrice)}
          </TableCell>
        );
      },
    },
    {
      id: "maxPlayer",
      label: "Total Player",
    },
    {
      id: "multiWinner",
      label: "Total Winner",
    },
    {
      id: "",
      label: "Tournament Rules",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {dotGenerator(row?.tournamentRules, handleOpenModal, "Tournament Rules", "isGamePlay")}
          </TableCell>
        );
      },
    },
    {
      id: "tournamentJoinStartDate",
      label: "Tournament Join </br> StartDate",
      twoLineText: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {moment(row?.tournamentJoinStartDate).format("MMM DD YYYY")}
          </TableCell>
        );
      },
    },
    {
      id: "tournamentPlayStartDate",
      label: "tournament Play </br> StartDate",
      twoLineText: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            {moment(row?.tournamentPlayStartDate).format("MMM DD YYYY")}
          </TableCell>
        );
      },
    },
    {
      id: "Action",
      label: "Action",
      type: "custom",
      render: (row) => {
        return (
          <TableCell className={"role_field_id"}>
      <span className={"edit_btn edit-btn-action u_border"}
           onClick={(e) => handleOpenModal("CreateRecurringTournament", {redirectApiProps: getTournamentList,isEdit: true, row})}>Edit</span>
            <span className="edit_btn edit-btn-action prTab" onClick={() => handleOpenModal("DeleteCommonModal", {deleteListApiHandler: deleteGameTournament({tournamentId: row?._id,}),  redirectApiProps: getTournamentList, title: "Do you want to delete this data?",})}>Delete</span>
          </TableCell>
        );
      },
    },
  ];

  useEffect(() => {
    if ((filterData.startDate && filterData.endDate) || filterData?.statusValue) {
      getTournamentList(filterData.startDate, filterData.endDate,filterData.search);
     }
  }, [pagination.rowsPerPage, pagination.page, filterData.exportFile, filterData.csvDownload, filterData?.statusValue, filterData.startDate, filterData.endDate, filterData?.platformName, filterData?.statusField,]);

  const getTournamentList = (startDate, endDate, search) => {
    setLoader(true);
    let payload = {
      limit: pagination.rowsPerPage,
      searchText: search,
      startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
      endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
      start: (pagination.page + 1 - 1) * pagination.rowsPerPage,
      exportFile: filterData?.exportFile,
      csvDownload: filterData?.csvDownload,
      gameId: id,
    };
    dispatch(getGameTournamentLobby(payload)).then((res) => {
      if (res.data.success) {
        setLoader(false);
      } else {
        setLoader(false)
      }
      setLoader(false);
      if (res?.data?.data?.filePath) {
        setFilterData({
          ...filterData,
          csvDownload: false,
          exportFile: false,
        });
        window.open(res?.data?.data?.filePath,"_blank");
      } else {
        setRowData({
          ...rowData,
          list: res?.data?.data?.docs,
          totalDocs: res?.data?.data?.totalDocs,
        });
      }
    });
  };
  return (
    <>
      <Paper sx={{ mb: 2 }} className="outer-box">
        <div className={"game_tab_overView head_to_head_gameTab"}>
          <div className={"game_tab_overView_title d_flex justify_content_between"}>
            <h2>Tournament</h2>
            <button className={"btn"} onClick={() => handleOpenModal("CreateRecurringTournament", {redirectApiProps: getTournamentList, isEdit: false,})}>Add Tournament</button>
          </div>
          <div className={"head_to_head_gameTab_table"}>
            <CustomTable
              headCells={columns}
              rowData={rowData?.list}
              totalDocs={rowData?.totalDocs || 0}
              pagination={pagination}
              setPagination={setPagination}
            />
          </div>
        </div>
      </Paper>
    </>
  );
};
export default RecurringTournament;
