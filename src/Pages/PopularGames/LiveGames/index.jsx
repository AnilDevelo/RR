import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import { useDispatch } from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import user from "../../../assets/images/avatar.png";
import { getLiveGamesList ,deleteLivegame, swapPositionLiveGame} from "../../../Redux/popularGames/action";
import { ActionFunction, hideActionFunc } from "../../../utils";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import TableLoader from "hoc/CommonTable/TableLoader";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
const LivegameList = () => {
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
      case "CreateCustomizeLiveGameList": {
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

  useEffect(() => {
    getLivegame();
  }, [pagination.rowsPerPage, pagination.page]);

  const getLivegame = () => {
    let payload = {
      limit: pagination.rowsPerPage,
      start: (pagination.page + 1 - 1) * pagination.rowsPerPage,
    };
    setLoader(true);
    dispatch(getLiveGamesList(payload)).then((res) => {
      setLoader(false);
      setRowData({
        ...rowData,
        list: res?.data?.data,
        totalDocs: res?.data?.data?.totalDocs,
      });
    });
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    background: isDragging ? "lightgray" : "white",
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "white" : "white",
  });

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
      liveGameId: result?.draggableId,
      oldPosition: result.source.index + 1,
      newPosition: result.destination.index + 1,
    };
    setRowData({
      ...rowData,
      list: items,
    });
    if (hideActionFunc("popularGame")) {
      dispatch(swapPositionLiveGame(payload)).then((res) => {
        getLivegame();
      });
    }
  };
  return (
    <Box>
      {loader ? <TableLoader /> : ""}
      <Paper sx={{ mb: 2 }} className="outer-box">
        {hideActionFunc("popularGame") && (
          <div className={"d_flex_end"}>
            <button
              className={"btn"}
              onClick={() => handleOpenModal("CreateCustomizeLiveGameList")}
            >
              + Add Live Game
            </button>
          </div>
        )}

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
                    <th> Game Icon</th>
                    <th> Game Name</th>
                    <th>Position</th>
                    <th>Total Played Counter</th>
                    {hideActionFunc("popularGame") && <th>Action</th>}
                  </thead>
                  <tbody>
                    {rowData?.list?.length > 0 ? (
                      rowData?.list.map((item, index) => {
                        return (
                          <Draggable
                            key={item._id}
                            draggableId={item._id}
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
                                <td className={"drag_and_drop_td"}>
                                  <img
                                    src={item?.gameIcon || user}
                                    alt={"slider logo"}
                                  />
                                </td>
                                <td>{item?.gameName}</td>
                                <td>{item?.position}</td>
                                <td>{item?.totalPlayedCounter}</td>
                                {hideActionFunc("popularGame") && (
                                  <td className={"role_field_id"}>
                                    <span
                                      className="edit_btn edit-btn-action"
                                      onClick={() =>
                                        handleOpenModal("DeleteCommonModal", {
                                          deleteListApiHandler: deleteLivegame({
                                            liveGameId: item?._id,
                                          }),
                                          title:
                                            "Do you want to delete this data?",
                                        })
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
                        <td className={"data_notFound_box"} colSpan={5}>
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
        </div>
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
          redirectApiHandler={getLivegame}
          rowData={rowData}
        />
      </CommonModal>
    </Box>
  );
};
export default LivegameList;
