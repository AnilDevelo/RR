import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import { hideActionFunc } from "../../../../../utils";
import {
    deleteGameNumberOfPlayers,
     getGameNumberOfPlayer,
    swapPositionNumberOfPlayerGames
} from "../../../../../Redux/games/action";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import TableLoader from "../../../../../hoc/CommonTable/TableLoader";
import TablePagination from "@mui/material/TablePagination";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const GameNumberOfPlayer = ({ handleOpenModal }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const gameDetails = useSelector(state => state?.gameReducer?.gameDetails)
    const [loader, setLoader] = useState(false);
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });

    useEffect(() => {
        getNumberOfPlayersList();
    }, [pagination.rowsPerPage, pagination.page, gameDetails]);

// Function to fetch the number of players list
    const getNumberOfPlayersList = () => {
        setLoader(true);
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            gameId: id
        };
        dispatch(getGameNumberOfPlayer(payload)).then(res => {
            setLoader(false);
            if (res.data.success) {
                setRowData({
                    ...rowData,
                    list: res.data.data?.docs,
                    totalDocs: res.data.data.totalDocs
                });
            }
        });
    };

// Styling function for draggable items
    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        background: isDragging ? "lightgray" : "white",
        ...draggableStyle
    });

// Styling function for the draggable list
    const getListStyle = isDraggingOver => ({
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
            gameNumberOfPlayerId: result?.draggableId,
            oldPosition: result.source.index + 1,
            newPosition: result.destination.index + 1,
            gameId: id
        };
        setRowData({
            ...rowData,
            list: items
        });
        if (hideActionFunc('game')) {
            dispatch(swapPositionNumberOfPlayerGames(payload)).then(res => {
                getNumberOfPlayersList();
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
            <Box>
                <Paper sx={{ mb: 2 }} className="outer-box game-rules-section">
                    {loader && <TableLoader/>}
                    <div className={'game_tab_overView head_to_head_gameTab'}>
                        <div className={'d_flex_between'}>
                            <h2>Number Of Player</h2>
                            {
                                (!gameDetails?.isDefaultNumberOfPlayerCreated && hideActionFunc('game') ) &&
                                <button className={'btn'} onClick={() => handleOpenModal('AddNumberOfPlayerPopup', { redirectApiProps: getNumberOfPlayersList, isEdit: false })}>+ Create Primary Number Of Players</button>
                            }
                            {
                                (hideActionFunc('game') && gameDetails?.isNoOfPlayer && gameDetails?.isDefaultNumberOfPlayerCreated) &&
                                <button className={'btn'} onClick={() => handleOpenModal('AddNumberOfPlayerPopup', { redirectApiProps: getNumberOfPlayersList, isEdit: false })}>+ Create Number Of Players</button>
                            }

                        </div>
                        <div className={'head_to_head_gameTab_table'}>
                            <div className={'header_slider_section'}>
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId="droppable">
                                        {(provided, snapshot) => (
                                            <table
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}
                                            >
                                                <thead>
                                                <th>Number Of Player</th>
                                                {
                                                    hideActionFunc('game') &&
                                                    <th>Action</th>
                                                }
                                                </thead>
                                                <tbody>
                                                {
                                                    rowData?.list?.length > 0 ?
                                                        rowData?.list?.map((row, index) => {
                                                            return (
                                                                <Draggable key={row._id} draggableId={row._id} index={index}>
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
                                                                            <td>{row.numberOfPlayer}</td>

                                                                            {  hideActionFunc('game') &&
                                                                                <td className={'role_field_id'}>
                                                                                    {
                                                                                        row?.isDeletable && !row?.isDefault &&
                                                                                        <>
                                                                                            <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('AddNumberOfPlayerPopup', { redirectApiProps: getNumberOfPlayersList, isEdit: true,row })}>Edit</span>

                                                                                            { <span className='edit_btn edit-btn-action prTab u_border' onClick={()=> handleOpenModal('DeleteCommonModal',
                                                                                                {deleteListApiHandler : deleteGameNumberOfPlayers({gameNumberOfPlayerId:row?._id}),redirectApiProps: getNumberOfPlayersList, title: 'Do you want to delete the game number of player?'})}>Delete</span>}
                                                                                        </>
                                                                                    }
                                                                                    {
                                                                                        ( row?.isActive &&  !row?.isDefault) ?
                                                                                            <span className={row?.isDeletable ? 'edit_btn edit-btn-action prTab' : 'edit_btn edit-btn-action'} onClick={() => handleOpenModal('activeDeactivateNumberOfPlayer', {  gameNumberOfPlayerId: row?._id, isActive: false, deactivate:true, redirectApiProps: getNumberOfPlayersList, })}>Deactivate</span> :
                                                                                            !row?.isDefault && <span className={row?.isDeletable ? 'edit_btn edit-btn-action prTab' : 'edit_btn edit-btn-action'} onClick={() => handleOpenModal('activeDeactivateNumberOfPlayer', { gameNumberOfPlayerId: row?._id, isActive: true,redirectApiProps: getNumberOfPlayersList, })}>Activate</span>
                                                                                    }
                                                                                    {
                                                                                        row?.isDefault && <span>Primary </span>
                                                                                    }
                                                                                </td>
                                                                            }

                                                                        </tr>
                                                                    )}
                                                                </Draggable>
                                                            )
                                                        })
                                                        :
                                                        <tr className={'table_row'}>
                                                            <td  className={'data_notFound_box'} colSpan={4}>No Data Found</td>
                                                        </tr>
                                                }

                                                {provided.placeholder}
                                                </tbody>
                                            </table>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                                <TablePagination
                                    className={"table_pagination"}
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
            </Box>

        </React.Fragment>
    );
};
export default GameNumberOfPlayer