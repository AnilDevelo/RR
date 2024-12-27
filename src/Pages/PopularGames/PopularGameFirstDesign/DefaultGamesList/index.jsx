import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {swapPositionDefaultGames} from "../../../../Redux/popularGames/action";
import {hideActionFunc} from "../../../../utils";
import {useDispatch} from "react-redux";
import user from "../../../../assets/images/avatar.png";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    background: isDragging ? "lightgray" : "white",
    ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "white" : "white",
});

const DefaultGamesList = ({ formData, setFormData, handleOpenModal, getPopularGamesList }) => {

    const dispatch = useDispatch();
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const items = reorder(
            formData?.popularGame,
            result.source.index,
            result.destination.index
        );
        let payload = {
            popularGameId: result?.draggableId,
            oldPosition: result.source.index + 1,
            newPosition: result.destination.index + 1,
        };
        setFormData({
            ...formData,
            popularGame: items
        })

        if (hideActionFunc("popularGame")) {
            dispatch(swapPositionDefaultGames(payload)).then((res) => {
                getPopularGamesList();
            });
        }
    };

    return(
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
                            <th> Game Logo</th>
                            <th>Game Poster</th>
                            <th> Game Name</th>
                            <th>Total Played Counter</th>
                            </thead>
                            <tbody>
                            {formData?.popularGame?.length > 0 ? (
                                formData?.popularGame.map((item, index) => {
                                    return (
                                        <Draggable
                                            key={item._id}
                                            draggableId={item.gameId}
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
                                                        />{" "}
                                                    </td>
                                                    <td className={"drag_and_drop_td"}>
                                                        <img
                                                            src={item?.gamePoster || user}
                                                            alt={"slider logo"}
                                                        />{" "}
                                                    </td>
                                                    <td>{item.gameName}</td>
                                                    <td>{item.totalPlayedCounter}</td>
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
        </div>
    )
}
export default DefaultGamesList