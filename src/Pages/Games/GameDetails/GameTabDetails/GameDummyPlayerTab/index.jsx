import React, { useCallback, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Loader from "../../../../../images/Loader";
import Paper from "@mui/material/Paper";
import FilledButton from "../../../../../Components/FileButton";
import CommonModal from "../../../../../hoc/CommonModal";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getGameDummyPlayer } from "../../../../../Redux/games/action";
import TableCell from "@mui/material/TableCell";
import { ActionFunction, hideActionFunc } from "../../../../../utils";
import CustomTable from "../../../../../hoc/CommonTable";
import OnlinePlayerStatus from "./OnlinePlayerStatus";

const GameDummyPlayerTab = ({ handleOpenModal }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [rowData, setRowData] = useState({
    list: [],
    totalDocs: 0,
    isOnlinePlayer: false,
  });

  useEffect(() => {
    getDummyPlayer();
  }, []);

  const getDummyPlayer = () => {
    setLoader(true);
    dispatch(getGameDummyPlayer({ gameId: id })).then((res) => {
      if (res.data?.success) {
        setLoader(false);
        setRowData({
          list:
            Object?.keys(res?.data?.data)?.length > 0 ? [res?.data?.data] : [],
            totalDocs: res?.data?.data?.totalDocs,
            isOnlinePlayer: res?.data?.data?.isOnlinePlayer,
        });
      } else {
        setLoader(false);
      }
    });
  };

  const columns = [
    {
      id: "isDummyPlayer",
      label: "Is Dummy Player",
      type: "custom",
      render: (row) => {
        return <TableCell>{row?.isDummyPlayer ? "Yes" : "No"}</TableCell>;
      },
    },
    {
      id: "dummyPlayerStartPoint",
      label: "Dummy Player Start Point",
    },
    ActionFunction("game", {
      id: "Action",
      disablePadding: false,
      label: "Action",
      isDisbanding: true,
      type: "custom",
      render: (row) => {
        return (
          <TableCell className={"role_field_id"}>
            <span
              className="edit_btn edit-btn-action"
              onClick={() =>
                handleOpenModal("AddDummyPlayer", {
                  row,
                  isEdit: true,
                    redirectApiProps: getDummyPlayer,
                    isOnlinePlayer: rowData?.isOnlinePlayer,
                })
              }
            >
              Edit
            </span>
          </TableCell>
        );
      },
    }),
  ];

  return (
    <React.Fragment>
      <Box>
        <OnlinePlayerStatus
          getDummyPlayer={getDummyPlayer}
          rowData={rowData}
          isOnlinePlayer={rowData?.isOnlinePlayer}
        />
        {rowData?.isOnlinePlayer && (
          <Paper sx={{ mb: 2 }} className="outer-box">
            <div className={"game_tab_overView head_to_head_gameTab"}>
              <div className={"d_flex_between"}>
                <h2>Online Players</h2>
                {hideActionFunc("game") && rowData?.list?.length <= 0 && (
                  <button
                    className={"btn"}
                    onClick={() =>
                      handleOpenModal("AddDummyPlayer", {
                        redirectApiProps: getDummyPlayer,
                      })
                    }
                  >
                    + Add Online Player
                  </button>
                )}
              </div>
              <div className={"head_to_head_gameTab_table"}>
                <CustomTable
                  headCells={columns}
                  rowData={rowData?.list}
                  totalDocs={0}
                  isCurrency={true}
                  loading={loader}
                />
              </div>
            </div>
          </Paper>
        )}
      </Box>
    </React.Fragment>
  );
};
export default GameDummyPlayerTab;
