import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteGameModeList,
  getGameModeList,
  swapPositionGameModes,
} from "../../../../../Redux/games/action";
import { hideActionFunc } from "../../../../../utils";
import GameModeConfig from "./GameModeConfig";
import TableLoader from "../../../../../hoc/CommonTable/TableLoader";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TablePagination from "@mui/material/TablePagination";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const GameModeTab = ({ handleOpenModal }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });

  useEffect(() => {
    getGameModeListHandler();
  }, [pagination.rowsPerPage, pagination.page]);

  const getGameModeListHandler = () => {
    setLoader(true);
    let payload = {
      limit: pagination.rowsPerPage,
      start: (pagination.page + 1 - 1) * pagination.rowsPerPage,
      gameId: id,
    };
    dispatch(getGameModeList(payload)).then((res) => {
      setLoader(false);
      if (res.data.success) {
        setRowData({
          ...rowData,
          list: res?.data?.data?.docs,
          totalDocs: res?.data?.data?.totalDocs,
        });
      }
    });
  };

  // Styling function for draggable items
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    background: isDragging ? "lightgray" : "white",
    ...draggableStyle,
  });

  // Styling function for the draggable list
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "white" : "white",
  });

  // Function called when dragging ends
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      rowData?.list,
      result.source.index,
      result.destination.index
    );
    let payload = {
      gameModeId: result?.draggableId,
      oldPosition: result.source.index + 1,
      newPosition: result.destination.index + 1,
    };
    setRowData({
      ...rowData,
      list: items,
    });
    if (hideActionFunc("game")) {
      dispatch(swapPositionGameModes(payload)).then((res) => {
        getGameModeListHandler();
      });
    }
  };

  // Event handler for changing the page
  const handleChangePage = (event, newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  // Event handler for changing the number of rows per page
  const handleChangeRowsPerPage = (event) => {
    setPagination({
      ...pagination,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  return (
    <React.Fragment>
      <GameModeConfig />
      <Paper sx={{ mb: 2 }} className="outer-box game-rules-section">
        {loader && <TableLoader />}
        <div className={"game_tab_overView head_to_head_gameTab"}>
          <div className={"d_flex_between"}>
            <h2>Game Mode</h2>
            {hideActionFunc("game") && (
              <button
                className={"btn"}
                onClick={() =>
                  handleOpenModal("AddGameMode", {
                    redirectApiProps: getGameModeListHandler,
                    isEdit: false,
                  })
                }
              >
                + Add Game Mode
              </button>
            )}
          </div>
          <div className={"head_to_head_gameTab_table"}>
            <div className={"header_slider_section"}>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <table
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      <thead>
                        <th>ID</th>
                        <th>Icon</th>
                        <th>Title</th>
                        {hideActionFunc("game") && <th>Action</th>}
                      </thead>
                      <tbody>
                        {rowData?.list?.length > 0 ? (
                          rowData?.list?.map((row, index) => {
                            return (
                              <Draggable
                                key={row._id}
                                draggableId={row._id}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <tr
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                      snapshot.isDragging,
                                      provided.draggableProps.style
                                    )}
                                  >
                                    <td>{`GMID000${row?.numericId}`}</td>
                                    <td className={"game_icon_img"}>
                                      {row?.gameModeIcon ? (
                                        <img src={row?.gameModeIcon} alt={""} />
                                      ) : (
                                        "-"
                                      )}
                                    </td>
                                    <td>{row?.gameModeName}</td>
                                    {hideActionFunc("game") && (
                                      <td className={"role_field_id"}>
                                        <span
                                          className="edit_btn edit-btn-action u_border"
                                          onClick={() =>
                                            handleOpenModal("AddGameMode", {
                                              redirectApiProps:
                                                getGameModeListHandler,
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
                                            handleOpenModal(
                                              "DeleteCommonModal",
                                              {
                                                deleteListApiHandler:
                                                  deleteGameModeList({
                                                    gameModeId: row?._id,
                                                    gameId: id,
                                                  }),
                                                title:
                                                  "Do you want to delete the game mode?",
                                                redirectApiProps:
                                                  getGameModeListHandler,
                                              }
                                            )
                                          }
                                        >
                                          Delete
                                        </span>
                                      </td>
                                    )}
                                  </tr>
                                )}
                              </Draggable>
                            );
                          })
                        ) : (
                          <tr className={"table_row"}>
                            <td className={"data_notFound_box"} colSpan={4}>
                              No Data Found
                            </td>
                          </tr>
                        )}

                        {provided.placeholder}
                      </tbody>
                    </table>
                  )}
                </Droppable>
              </DragDropContext>
              <TablePagination
                component="div"
                count={rowData?.totalDocs || 0}
                page={pagination?.page}
                onPageChange={handleChangePage}
                rowsPerPage={pagination?.rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </div>
        </div>
      </Paper>
    </React.Fragment>
  );
};
export default GameModeTab;
