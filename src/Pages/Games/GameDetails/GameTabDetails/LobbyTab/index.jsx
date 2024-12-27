import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import {
  ActionFunction,
  clearPaginationAndFilterData,
  currencyFormat,
  dotGenerator,
  findMatchingNames,
  hideActionFunc,
} from "../../../../../utils";
import Switch from "@mui/material/Switch";
import {
  getGameLobbyList,
  getOptimizeStatus,
  getSingleGameDetails,
} from "../../../../../Redux/games/action";
import moment from "moment";
import Paper from "@mui/material/Paper";
import MainCommonFilter from "../../../../../Components/MainCommonFilter";
import CustomTable from "../../../../../hoc/CommonTable";
import { Mode } from "@mui/icons-material";

const LobbyTab = ({ handleOpenModal }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const gameDetails = useSelector((state) => state?.gameReducer?.gameDetails);
  const [loader, setLoader] = useState(false);
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
    subMode:"All Game Mode"
  });
  const [pagination, setPagination] = useState({
    rowsPerPage: 10,
    page: 0,
    startRange: "",
    endRange: "",
  });
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
  const [gameSetupKey, setGameSetupKey] = useState({});
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [columns, setColumns] = useState([]);
  const [dateFilter, setDateFilter] = useState(filterData);
  let prevDateFilter = React.useRef(dateFilter);

  useEffect(() => {
    const isPointsGameMode = gameDetails?.gameModes?.some(
      (v) => v?.gameModeName === "Points"
    );
    const isPokerGame = gameDetails?.gameName === "Poker" || gameDetails?.gameName === "Blackjack";
    const isDealGameMode = gameDetails?.gameModes?.some(
      (v) => v?.gameModeName === "Deals"
    );
    const isPoolGameMode = gameDetails?.gameModes?.some((v) =>
      v?.gameModeName.includes("pool")
    );
    switch (true) {
      case isPointsGameMode: {
        setColumns([
          {
            id: "numericId",
            label: "Lobby ID",
            type: "custom",
            render: (row, i) => {
              return (
                <TableCell>
                  <span
                    className="edit_btn"
                    onClick={() =>
                      handleOpenModal("ViewLobbyDetails", {
                        redirectApiProps: getLobbyList,
                        data: row,
                        isEdit: true,
                      })
                    }
                  >{`TH00000${row?.numericId}`}</span>
                </TableCell>
              );
            },
          },
          {
            id: "lobbyType",
            isDisbanding: true,
            label: "Lobby Type",
            type: "custom",
            render: (row) => {
              return (
                <TableCell>
                 {row?.lobbyType?.lobbyType}
                </TableCell>
              );
            },
          },
          gameDetails?.isGameModeOption &&
          rowData?.list?.filter((item) => item?.gameModeId)?.length > 0
            ? {
                id: "gameModeOptions",
                isDisbanding: true,
                label: "Mode",
                type: "custom",
                render: (row, i) => {
                  return (
                    <TableCell>
                      {row?.gameModeId?.gameModeName}
                    </TableCell>
                  );
                },
              }
            : {
                id: "action",
                type: "hide",
            },
            gameDetails?.isGameModeOption &&
            findMatchingNames(rowData?.list, gameDetails?.gameModes)?.includes(
              "Deals"
            )
              ? {
                  id: "subMode",
                  label: "Deals Mode </br> Type",
                  twoLineText: true,
                }
              : {
                  id: "action",
                  type: "hide",
                },
          {
            id: "noOfPlayer",
            label: "Players",
            twoLineText: true,
          },
          gameDetails?.isGameModeOption && findMatchingNames(rowData?.list, gameDetails?.gameModes)?.includes("Points") ?
          {
            id: "pointValue",
            label: "Point Value",
            isDisbanding: true,
            type: "custom",
              render: (row) => {
                const pointValue = parseFloat(row?.pointValue);
              return (
                <TableCell className={"text_center"}>
                  {currencyFormat(pointValue)}
                </TableCell>
              );
            },
            }
            : {
              id: "action",
              type: "hide",
            },
            gameDetails?.isGameModeOption && findMatchingNames(rowData?.list, gameDetails?.gameModes)?.includes("101 Pool") || findMatchingNames(rowData?.list, gameDetails?.gameModes)?.includes("201 Pool")?
          {
            id: "",
            label: "Auto Split",
            isDisbanding: true,
            type: "custom",
              render: (row) => {
              return (
                <TableCell>
                  <spap>{row?.isAutoSplit ? "Yes" : "No"}</spap>
                </TableCell>
              );
            },
            }
            : {
              id: "action",
              type: "hide",
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
            label: "Winning Prize",
            twoLineText: true,
            type: "custom",
            render: (row) => {
              return (
                <TableCell className={"text_center"}>
                  {row?.gameModeId?.gameModeName === "Points"
                    ? "-"
                    : currencyFormat(+row?.winningPrice)}
                </TableCell>
              );
            },
          },
          rowData?.list?.filter((item) => item?.isLeaderboardScoreOn)?.length >
          0
            ? {
                id: "leaderboardScore",
                label: "Score",
                twoLineText: true,
                type: "custom",
                render: (row) => {
                  return (
                    <TableCell className={"text_center"}>
                      {row?.isLeaderboardScoreOn ? "YES" : "NO"}
                    </TableCell>
                  );
                },
              }
            : {
                id: "action",
                type: "hide",
              },
          rowData?.list?.filter((item) => item.isUseBot)?.length > 0
            ? {
                id: "isUseBot",
                label: "Use Bot",
                isDisbanding: true,
                type: "custom",
                render: (row) => {
                  return <TableCell>{row?.isUseBot ? "YES" : "NO"}</TableCell>;
                },
              }
            : {
                id: "action",
                type: "hide",
              },
          rowData?.list?.filter((item) => item.isAutoSplit)?.length > 0
            ? {
                id: "isAutoSplit",
                label: "Auto Split",
                isDisbanding: true,
                type: "custom",
                render: (row) => {
                  return (
                    <TableCell>{row?.isAutoSplit ? "YES" : "NO"}</TableCell>
                  );
                },
              }
            : {
                id: "action",
                type: "hide",
              },
          // {
          //     id: 'isGST',
          //     label: 'Is GST',
          //     isDisbanding: true,
          //     type: 'custom',
          //     render: (row) => {
          //         return <TableCell className={'text_center'}>{row?.isGST ? "YES" : "NO"}</TableCell>
          //     }
          // },
          // {
          //     id: 'GSTPercentage',
          //     label: 'GST Percentage',
          //     isDisbanding: true,
          //     type: 'custom',
          //     render: (row) => {
          //         return <TableCell className={'text_center'}>{(row?.isGST && row?.GSTPercentage) ? `${row?.GSTPercentage}%` : "NO"}</TableCell>
          //     }
          // },

          rowData?.list?.filter((item) => item?.isMultiWinner)?.length > 0
            ? {
                id: "winningPrice",
                label: "Multi Winner",
                twoLineText: true,
                type: "custom",
                render: (row) => {
                  return (
                    <TableCell className={"text_center"}>
                      {gameDetails?.gameModes?.filter(
                        (item) => item?._id === row?.gameModeId
                      )?.[0]?.gameModeName === "Points"
                        ? "-"
                        : row?.isMultiWinner
                        ? "YES"
                        : "NO"}
                    </TableCell>
                  );
                },
              }
            : {
                id: "action",
                type: "hide",
              },
          rowData?.list?.filter((item) => item?.isMultiWinner)?.length > 0
            ? {
                id: "winningPrice",
                label: "Multiple Winner </br> Prize ",
                twoLineText: true,
                type: "custom",
                render: (row) => {
                  return (
                    <TableCell>
                      {gameDetails?.gameModes?.filter(
                        (item) => item?._id === row?.gameModeId
                      )?.[0]?.gameModeName === "Points"
                        ? "-"
                        : row?.isMultiWinner
                          ? row?.pricePool?.map((item, index) => {
                            return (
                              <li>
                                <span className={"division_size"}>
                                  Winner Rank {item?.rank} Prize
                                </span>{" "}
                                -{" "}
                                <span>
                                  {currencyFormat(parseFloat(item?.winningPrice) || 0)}
                                </span>
                              </li>
                            );
                          })
                        : "NO"}
                    </TableCell>
                  );
                },
              }
            : {
                id: "action",
                type: "hide",
              },
          {
            id: "tournamentName",
            isDisbanding: true,
            label: "Name",
            type: "custom",
            render: (row) => {
              return (
                <TableCell>
                  {row?.tournamentName
                    ? dotGenerator(
                        row?.tournamentName,
                        handleOpenModal,
                        "Lobby Name"
                      )
                    : ""}
                </TableCell>
              );
            }
          },
          {
            id: "description",
            isDisbanding: true,
            label: "Description",
            twoLineText: true,
            type: "custom",
            render: (row) => {
              return (
                <TableCell>
                  {row?.description
                    ? dotGenerator(
                        row?.description,
                        handleOpenModal,
                        "Lobby Description"
                      )
                    : "-"}
                </TableCell>
              );
            },
          },
          hideActionFunc("game")
            ? {
                id: "",
                label: "Enable / </br> Disable",
                twoLineText: true,
                type: "custom",
                render: (row) => {
                  return (
                    <TableCell>
                      {row?.isActive ? (
                        <Switch
                          {...label}
                          checked={row?.isActive === true}
                          onClick={() =>
                            handleOpenModal("ActiveDeactivateLobby", {
                              redirectApiProps: lobbyRedirectApi,
                              headToHeadId: row?._id,
                              isActive: false,
                            })
                          }
                        />
                      ) : (
                        <Switch
                          {...label}
                          checked={row?.isActive === true}
                          onClick={() =>
                            handleOpenModal("ActiveDeactivateLobby", {
                              redirectApiProps: lobbyRedirectApi,
                              headToHeadId: row?._id,
                              isActive: true,
                            })
                          }
                        />
                      )}
                    </TableCell>
                  );
                },
              }
            : {
                id: "action",
                type: "hide",
              },

          ActionFunction("game", {
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
                      handleOpenModal("UpdateLobby", {
                        redirectApiProps: lobbyRedirectApi,
                        data: row,
                        isEdit: true,
                      })
                    }
                  >
                    Edit
                  </span>
                  <span
                    className="edit_btn edit-btn-action prTab"
                    onClick={() =>
                      handleOpenModal("DeleteLobby", {
                        redirectApiProps: lobbyRedirectApi,
                        id: row?._id,
                      })
                    }
                  >
                    Delete
                  </span>
                  {/*<span className='edit_btn edit-btn-action u_border  prTab' onClick={() => handleOpenModal('CopyHeadToHeadPopup', { redirectApiProps: headToHeadRedirectApi, data: row })}>Copy</span>*/}
                  {/*{*/}
                  {/*    row?.isActive ?*/}
                  {/*        <span className='edit_btn edit-btn-action  prTab' onClick={()=>handleOpenModal('ActivateDeactivatePopup',{redirectApiProps: headToHeadRedirectApi, headToHeadId:row?._id,isActive:false})}>Deactivate</span>*/}
                  {/*        :*/}
                  {/*        <span className='edit_btn edit-btn-action prTab' onClick={()=>handleOpenModal('ActivateDeactivatePopup',{redirectApiProps: headToHeadRedirectApi, headToHeadId:row?._id,isActive:true})}>Activate</span>*/}
                  {/*}*/}
                </TableCell>
              );
            },
          }),
        ]);
        break;
      }
      case isPokerGame: {
        setColumns([
          {
            id: "numericId",
            label: "Lobby ID",
            type: "custom",
            render: (row, i) => {
              return (
                <TableCell>
                  <span
                    className="edit_btn"
                    onClick={() =>
                      handleOpenModal("ViewLobbyDetails", {
                        redirectApiProps: getLobbyList,
                        data: row,
                        isEdit: true,
                      })
                    }
                  >{`TH00000${row?.numericId}`}</span>
                </TableCell>
              );
            },
          },
          {
            id: "lobbyType",
            isDisbanding: true,
            label: "Lobby Type",
            type: "custom",
            render: (row) => {
              return (
                <TableCell>
                  {row?.lobbyType?.lobbyType}
                </TableCell>
              );
            },
          },
          gameDetails?.isGameModeOption &&
          rowData?.list?.filter((item) => item?.gameModeId)?.length > 0
            ? {
                id: "gameModeOptions",
                isDisbanding: true,
                label: "Mode",
                type: "custom",
                render: (row, i) => {
                  return (
                    <TableCell>
                      {row?.gameModeId?.gameModeName || "-"}
                    </TableCell>
                  );
                },
              }
            : {
                id: "action",
                type: "hide",
              },
          {
            id: "noOfPlayer",
            label: "Players",
            twoLineText: true,
          },
          {
            id: "",
            label: "Small/Big Blinds",
            isDisbanding: true,
            type: "custom",
            render: (row) => {
              return (
                <TableCell className={"text_center"}>
                  {+row?.minEntryFee || 0}/{+row?.maxEntryFee || 0}
                </TableCell>
              );
            },
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
          rowData?.list?.filter((item) => item?.isLeaderboardScoreOn)?.length >
          0
            ? {
                id: "leaderboardScore",
                label: "Score",
                twoLineText: true,
                type: "custom",
                render: (row) => {
                  return (
                    <TableCell className={"text_center"}>
                      {row?.isLeaderboardScoreOn ? "YES" : "NO"}
                    </TableCell>
                  );
                },
              }
            : {
                id: "action",
                type: "hide",
              },

          rowData?.list?.filter((item) => item.isUseBot)?.length > 0
            ? {
                id: "isUseBot",
                label: "Use Bot",
                isDisbanding: true,
                type: "custom",
                render: (row) => {
                  return <TableCell>{row?.isUseBot ? "YES" : "NO"}</TableCell>;
                },
              }
            : {
                id: "action",
                type: "hide",
              },
              {
                id: "tournamentName",
                isDisbanding: true,
                label: "Name",
                type: "custom",
                render: (row) => {
                  return (
                    <TableCell>
                      {row?.tournamentName
                        ? dotGenerator(
                            row?.tournamentName,
                            handleOpenModal,
                            "Lobby Name"
                          )
                        : ""}
                    </TableCell>
                  );
                }
              },
          {
            id: "description",
            isDisbanding: true,
            label: "Description",
            twoLineText: true,
            type: "custom",
            render: (row) => {
              return (
                <TableCell>
                  {row?.description
                    ? dotGenerator(
                        row?.description,
                        handleOpenModal,
                        "Lobby Description"
                      )
                    : "-"}
                </TableCell>
              );
            },
          },
          // {
          //     id: 'isGST',
          //     label: 'Is GST',
          //     isDisbanding: true,
          //     type: 'custom',
          //     render: (row) => {
          //         return <TableCell className={'text_center'}>{row?.isGST ? "YES" : "NO"}</TableCell>
          //     }
          // },
          // {
          //     id: 'GSTPercentage',
          //     label: 'GST Percentage',
          //     isDisbanding: true,
          //     type: 'custom',
          //     render: (row) => {
          //         return <TableCell className={'text_center'}>{(row?.isGST && row?.GSTPercentage) ? `${row?.GSTPercentage}%` : "NO"}</TableCell>
          //     }
          // },
          hideActionFunc("game")
            ? {
                id: "",
                label: "Enable / </br> Disable",
                twoLineText: true,
                type: "custom",
                render: (row) => {
                  return (
                    <TableCell>
                      {row?.isActive ? (
                        <Switch
                          {...label}
                          checked={row?.isActive === true}
                          onClick={() =>
                            handleOpenModal("ActiveDeactivateLobby", {
                              redirectApiProps: lobbyRedirectApi,
                              headToHeadId: row?._id,
                              isActive: false,
                            })
                          }
                        />
                      ) : (
                        <Switch
                          {...label}
                          checked={row?.isActive === true}
                          onClick={() =>
                            handleOpenModal("ActiveDeactivateLobby", {
                              redirectApiProps: lobbyRedirectApi,
                              headToHeadId: row?._id,
                              isActive: true,
                            })
                          }
                        />
                      )}
                    </TableCell>
                  );
                },
              }
            : {
                id: "action",
                type: "hide",
              },

          ActionFunction("game", {
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
                      handleOpenModal("UpdateLobby", {
                        redirectApiProps: lobbyRedirectApi,
                        data: row,
                        isEdit: true,
                      })
                    }
                  >
                    Edit
                  </span>
                  <span
                    className="edit_btn edit-btn-action prTab"
                    onClick={() =>
                      handleOpenModal("DeleteLobby", {
                        redirectApiProps: lobbyRedirectApi,
                        id: row?._id,
                      })
                    }
                  >
                    Delete
                  </span>
                  {/*<span className='edit_btn edit-btn-action u_border  prTab' onClick={() => handleOpenModal('CopyHeadToHeadPopup', { redirectApiProps: headToHeadRedirectApi, data: row })}>Copy</span>*/}
                  {/*{*/}
                  {/*    row?.isActive ?*/}
                  {/*        <span className='edit_btn edit-btn-action  prTab' onClick={()=>handleOpenModal('ActivateDeactivatePopup',{redirectApiProps: headToHeadRedirectApi, headToHeadId:row?._id,isActive:false})}>Deactivate</span>*/}
                  {/*        :*/}
                  {/*        <span className='edit_btn edit-btn-action prTab' onClick={()=>handleOpenModal('ActivateDeactivatePopup',{redirectApiProps: headToHeadRedirectApi, headToHeadId:row?._id,isActive:true})}>Activate</span>*/}
                  {/*}*/}
                </TableCell>
              );
            },
          }),
        ]);
        break;
      }
      default: {
        setColumns([
          {
            id: "numericId",
            label: "Lobby ID",
            type: "custom",
            render: (row, i) => {
              return (
                <TableCell>
                  <span
                    className="edit_btn"
                    onClick={() =>
                      handleOpenModal("ViewLobbyDetails", {
                        redirectApiProps: getLobbyList,
                        data: row,
                        isEdit: true,
                      })
                    }
                  >{`TH00000${row?.numericId}`}</span>
                </TableCell>
              );
            },
          },
          {
            id: "lobbyType",
            isDisbanding: true,
            label: "Lobby Type",
            type: "custom",
            render: (row) => {
              return (
                <TableCell>
                  {row?.lobbyType?.lobbyType}
                </TableCell>
              );
            },
          },
          gameDetails?.isGameModeOption &&
          rowData?.list?.filter((item) => item?.gameModeId)?.length > 0
            ? {
                id: "gameModeOptions",
                isDisbanding: true,
                label: "Mode",
                type: "custom",
                render: (row, i) => {
                  return (
                    <TableCell>
                      {row?.gameModeId?.gameModeName || "-"}
                    </TableCell>
                  );
                },
              }
            : {
                id: "action",
                type: "hide",
              },
          {
            id: "noOfPlayer",
            label: "Players",
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
            label: "Win Prize",
            twoLineText: true,
            type: "custom",
            render: (row) => {
              return (
                <TableCell className={"text_center"}>
                  {gameDetails?.gameModes?.filter(
                    (item) => item?._id === row?.gameModeId
                  )?.[0]?.gameModeName === "Points"
                    ? "-"
                    : currencyFormat(+row?.winningPrice)}
                </TableCell>
              );
            },
          },
          rowData?.list?.filter((item) => item?.isLeaderboardScoreOn)?.length >
          0
            ? {
                id: "leaderboardScore",
                label: "Score",
                twoLineText: true,
                type: "custom",
                render: (row) => {
                  return (
                    <TableCell className={"text_center"}>
                      {row?.isLeaderboardScoreOn ? "YES" : "NO"}
                    </TableCell>
                  );
                },
              }
            : {
                id: "action",
                type: "hide",
              },
          rowData?.list?.filter((item) => item.isUseBot)?.length > 0
            ? {
                id: "isUseBot",
                label: "Use Bot",
                isDisbanding: true,
                type: "custom",
                render: (row) => {
                  return <TableCell>{row?.isUseBot ? "YES" : "NO"}</TableCell>;
                },
              }
            : {
                id: "action",
                type: "hide",
              },

          // {
          //     id: 'isGST',
          //     label: 'Is GST',
          //     isDisbanding: true,
          //     type: 'custom',
          //     render: (row) => {
          //         return <TableCell className={'text_center'}>{row?.isGST ? "YES" : "NO"}</TableCell>
          //     }
          // },
          // {
          //     id: 'GSTPercentage',
          //     label: 'GST Percentage',
          //     isDisbanding: true,
          //     type: 'custom',
          //     render: (row) => {
          //         return <TableCell className={'text_center'}>{(row?.isGST && row?.GSTPercentage) ? `${row?.GSTPercentage}%` : "NO"}</TableCell>
          //     }
          // },
          rowData?.list?.filter((item) => item?.isMultiWinner)?.length > 0
            ? {
                id: "winningPrice",
                label: "Multi Winner",
                twoLineText: true,
                type: "custom",
                render: (row) => {
                  return (
                    <TableCell className={"text_center"}>
                      {gameDetails?.gameModes?.filter(
                        (item) => item?._id === row?.gameModeId
                      )?.[0]?.gameModeName === "Points"
                        ? "-"
                        : row?.isMultiWinner
                        ? "YES"
                        : "NO"}
                    </TableCell>
                  );
                },
              }
            : {
                id: "action",
                type: "hide",
              },
          rowData?.list?.filter((item) => item?.isMultiWinner)?.length > 0
            ? {
                id: "winningPrice",
                label: "Multiple Winner </br> Prize ",
                twoLineText: true,
                type: "custom",
                render: (row) => {
                  return (
                    <TableCell>
                      {gameDetails?.gameModes?.filter((item) => item?._id === row?.gameModeId)?.[0]?.gameModeName === "Points" ? "-" : row?.isMultiWinner
                        ? row?.pricePool?.map((item, index) => {
                            return (
                              <li>
                                <span className={"division_size"}> Winner Rank {item?.rank} Prize</span>-
                                <span>{currencyFormat(parseFloat(item?.winningPrice) || 0)}</span>
                              </li>
                            );
                          })
                        : "NO"}
                    </TableCell>
                  );
                },
              }
            : {
                id: "action",
                type: "hide",
              },
              {
                id: "tournamentName",
                isDisbanding: true,
                label: "Name",
                type: "custom",
                render: (row) => {
                  return (
                    <TableCell>
                      {row?.tournamentName
                        ? dotGenerator(
                            row?.tournamentName,
                            handleOpenModal,
                            "Lobby Name"
                          )
                        : ""}
                    </TableCell>
                  );
                }
              },
          {
            id: "description",
            isDisbanding: true,
            label: "Description",
            twoLineText: true,
            type: "custom",
            render: (row) => {
              return (
                <TableCell>
                  {row?.description
                    ? dotGenerator(
                        row?.description,
                        handleOpenModal,
                        "Lobby Description"
                      )
                    : "-"}
                </TableCell>
              );
            },
          },
          hideActionFunc("game")
            ? {
                id: "",
                label: "Enable / </br> Disable",
                twoLineText: true,
                type: "custom",
                render: (row) => {
                  return (
                    <TableCell>
                      {row?.isActive ? (
                        <Switch
                          {...label}
                          checked={row?.isActive === true}
                          onClick={() =>
                            handleOpenModal("ActiveDeactivateLobby", {
                              redirectApiProps: lobbyRedirectApi,
                              headToHeadId: row?._id,
                              isActive: false,
                            })
                          }
                        />
                      ) : (
                        <Switch
                          {...label}
                          checked={row?.isActive === true}
                          onClick={() =>
                            handleOpenModal("ActiveDeactivateLobby", {
                              redirectApiProps: lobbyRedirectApi,
                              headToHeadId: row?._id,
                              isActive: true,
                            })
                          }
                        />
                      )}
                    </TableCell>
                  );
                },
              }
            : {
                id: "action",
                type: "hide",
              },

          ActionFunction("game", {
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
                      handleOpenModal("UpdateLobby", {
                        redirectApiProps: lobbyRedirectApi,
                        data: row,
                        isEdit: true,
                      })
                    }
                  >
                    Edit
                  </span>
                  <span
                    className="edit_btn edit-btn-action prTab"
                    onClick={() =>
                      handleOpenModal("DeleteLobby", {
                        redirectApiProps: lobbyRedirectApi,
                        id: row?._id,
                      })
                    }
                  >
                    Delete
                  </span>
                  {/*<span className='edit_btn edit-btn-action u_border  prTab' onClick={() => handleOpenModal('CopyHeadToHeadPopup', { redirectApiProps: headToHeadRedirectApi, data: row })}>Copy</span>*/}
                  {/*{*/}
                  {/*    row?.isActive ?*/}
                  {/*        <span className='edit_btn edit-btn-action  prTab' onClick={()=>handleOpenModal('ActivateDeactivatePopup',{redirectApiProps: headToHeadRedirectApi, headToHeadId:row?._id,isActive:false})}>Deactivate</span>*/}
                  {/*        :*/}
                  {/*        <span className='edit_btn edit-btn-action prTab' onClick={()=>handleOpenModal('ActivateDeactivatePopup',{redirectApiProps: headToHeadRedirectApi, headToHeadId:row?._id,isActive:true})}>Activate</span>*/}
                  {/*}*/}
                </TableCell>
              );
            },
          }),
        ]);
      }
    }
  }, [rowData]);

  useEffect(() => {
    dispatch(getSingleGameDetails({ gameId: id }));
  }, []);

  const lobbyRedirectApi = () => {
    getLobbyList(filterData.startDate, filterData.endDate);
  };

  useEffect(() => {
    if (
      filterData?.statusValue === "Custom" &&
      filterData.startDate === null &&
      filterData.endDate === null &&
      prevDateFilter?.current?.statusValue !== "Custom"
    ) {
      getLobbyList(
        prevDateFilter?.current?.startDate,
        prevDateFilter?.current?.endDate,
        prevDateFilter?.current?.search
      );
    }else if (
      (filterData.startDate && filterData.endDate) ||
      filterData?.statusValue
    ) {
      getLobbyList(filterData.startDate, filterData.endDate, filterData.search);
    }
  }, [
    pagination.rowsPerPage,
    pagination.page,
    filterData.exportFile,
    filterData.csvDownload,
    filterData?.statusValue,
    filterData.startDate,
    filterData.endDate,
    filterData?.platformName,
    filterData?.statusField,
    filterData?.subMode,
  ]);

  const getLobbyList = (startDate, endDate, search) => {
    setLoader(true);
    let payload = {
      limit: pagination?.endRange
        ? pagination?.endRange
        : pagination.rowsPerPage,
      start: pagination?.startRange
        ? +pagination?.startRange - 1
        : (pagination.page + 1 - 1) * pagination.rowsPerPage,
      searchText: search,
      startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
      endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
      // isGameModeOption:gameDetails?.isGameModeOption,
      gameModeId:
        filterData?.statusField === "All Game Mode" ? ""
          : gameDetails?.gameModes?.filter((item) => item?.gameModeName === filterData?.statusField)?.[0]?._id,
      noOfPlayer:
        filterData?.platformName === "All Number Of Player"
          ? ""
          : filterData?.platformName,
      exportFile: filterData?.exportFile,
      csvDownload: filterData?.csvDownload,
      gameId: id,
      subMode: filterData?.subMode == "All Game Mode" ? "" : filterData?.subMode,
    };
    if(filterData?.statusField !== "Deals") {
      delete payload.subMode
  }
    dispatch(getGameLobbyList(payload)).then((res) => {
      setLoader(false);
      if (res?.data?.data?.filePath) {
        clearPaginationAndFilterData(
          pagination,
          filterData,
          setPagination,
          setFilterData
        );
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

  useEffect(() => {
    if (
      filterData.startDate &&
      filterData.endDate &&
      filterData?.statusValue === "Custom"
    ) {
      setPagination({
        ...pagination,
        page: 0,
      });
      getLobbyList(filterData.startDate, filterData.endDate);
    }
  }, [filterData.startDate, filterData.endDate]);

  useEffect(() => {
    dispatch(
      getOptimizeStatus({
        gameId: id,
        publisherId: gameDetails?.publisherId?._id,
      })
    ).then((res) => {
      setGameSetupKey(res.data.data);
      setLoader(false);
    });
  }, []);

  useEffect(() => {
    setPagination({
      rowsPerPage: 10,
      page: 0,
      startRange: "",
      endRange: "",
    })
  }, [filterData?.statusValue,filterData?.subMode,filterData?.statusField,filterData?.platformName])
  return (
    <React.Fragment>
      <Paper sx={{ mb: 2 }} className="outer-box">
        <div className={"game_tab_overView head_to_head_gameTab "}>
          {hideActionFunc("game") && (
            <div className={"d_flex_end mb_05"}>
              <button
                className={"btn"}
                onClick={() =>
                  !gameDetails?.isDefaultNumberOfPlayerCreated
                    ? handleOpenModal("CommonPop", {
                        header: "Error",
                        body: "Please create one default number of player",
                      })
                    : !gameSetupKey?.isGameConfigCreated
                    ? handleOpenModal("CommonPop", {
                        header: "Error",
                        body: "setup the game config then create Lobby.",
                      })
                    : handleOpenModal("CreateLobby", {
                        redirectApiProps: lobbyRedirectApi,
                        isEdit: false,
                      })
                }
              >
                + Create Lobby
              </button>
            </div>
          )}
          <div className={"head_to_head_gameTab_table"}>
            <MainCommonFilter
              filterData={filterData}
              setFilterData={setFilterData}
              searchApiHandler={getLobbyList}
              pagination={pagination}
              setPagination={setPagination}
              addPropsFilter={{
                isCreateLobby: true,
                isGameList: true,
                userPayment: rowData?.list?.length <= 0,
                isGameModeOption: gameDetails?.isGameModeOption,
                isPending: true,
              }}
              statusOption={[
                "All Game Mode",
                ...gameDetails?.gameModes?.map((item) => item?.gameModeName),
              ]}
              plateFormOption={[
                "All Number Of Player",
                ...gameDetails?.numberOfPlayer?.map(
                  (item) => item?.numberOfPlayer
                ),
              ]}
              isSearchTooltip={{ isLobbyTab: true }}
              totalDocs={rowData?.totalDocs}
              handleOpenModal={handleOpenModal}
              Dealsoption={["All Game Mode", "2 deal", "3 deal", "6 deal"]}
              EnableDeals={true}
            />
            <CustomTable
              headCells={columns}
              rowData={rowData?.list}
              totalDocs={rowData?.totalDocs}
              pagination={pagination}
              setPagination={setPagination}
              loading={loader}
            />
          </div>
        </div>
      </Paper>
    </React.Fragment>
  );
};
export default LobbyTab;
