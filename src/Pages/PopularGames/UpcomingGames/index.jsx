import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import user from "../../../assets/images/avatar.png";
import { ActionFunction, dotGenerator, hideActionFunc } from "../../../utils";
import Box from "@mui/material/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import {
    deleteUpcomingGamesDetails,
    getUpcomingGamesDetails,
    swapPositionUpcomingGames
} from "../../../Redux/popularGames/action";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {deleteWebsiteHeaderList, swapPositionHeaderSlider} from "../../../Redux/website/action";
import TableLoader from "hoc/CommonTable/TableLoader";


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const UpcomingGames = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    let Modal = PopComponent[modalDetails.modalName];

    const columns = [
        {
            id: 'upcomingGameIcon',
            label: ' Icon',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'game_icon_img'}>
                    <img src={row?.upcomingGameIcon || user} alt={''} />
                </TableCell>
            }
        },
        {
            id: 'upcomingGameName',
            label: 'Game Name',
        },
        ActionFunction('popularGame', {
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action u_border' onClick={(e) => handleOpenModal('AddUpcomingGamesPopup', { isEdit: true, row })}>Edit</span>
                    <span className='edit_btn edit-btn-action prTab'
                        onClick={() => handleOpenModal('DeleteCommonModal',
                            { deleteListApiHandler: deleteUpcomingGamesDetails({ upcomingGameId: row?._id }), title: 'Do you want to delete this data?' })}>
                        Delete
                    </span>
                </TableCell>
            }
        })
    ];

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddUpcomingGamesPopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewRejectedComment': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };

    useEffect(() => {
        getUpcomingGames();
    }, [pagination.rowsPerPage, pagination.page]);

    const getUpcomingGames = () => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        };
        setLoader(true);
        dispatch(getUpcomingGamesDetails(payload)).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                list: res?.data?.data?.docs,
                totalDocs: res?.data?.data?.totalDocs
            })
        });
    };

    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        background: isDragging ? "lightgray" : "white",
        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
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
            upcomingGameId: result?.draggableId,
            oldPosition: result.source.index + 1,
            newPosition: result.destination.index + 1
        }
        setRowData({
            ...rowData,
            list: items
        })
        if (hideActionFunc('popularGame')) {
            dispatch(swapPositionUpcomingGames(payload)).then(res => {
                getUpcomingGames();
            })
        }

    };

    return (
        <Box>
            {/*{loader ? <Loader /> : ""}*/}
            {/*<Paper sx={{ mb: 2 }} className="outerbox">*/}
            {/*    {*/}
            {/*        hideActionFunc('master') &&*/}
            {/*        <div className={'admin_user_list'}>*/}
            {/*            <button className={'add_game_btn font-bold'} onClick={(e) => handleOpenModal('AddUpcomingGamesPopup')}> + Add Upcoming Game</button>*/}
            {/*        </div>*/}
            {/*    }*/}

            {/*    <CustomTable*/}
            {/*        headCells={columns}*/}
            {/*        rowData={rowData?.list}*/}
            {/*        totalDocs={rowData?.totalDocs}*/}
            {/*        pagination={pagination}*/}
            {/*        setPagination={setPagination}*/}
            {/*    />*/}
            {/*</Paper>*/}
            {/*<CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>*/}
            {/*    <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getUpcomingGames} />*/}
            {/*</CommonModal>*/}
            {loader ? <TableLoader /> : ""}
            <Paper sx={{ mb: 2 }} className="outer-box">
                {
                    hideActionFunc('popularGame') &&
                    <div className={'d_flex_end'}>
                        <button className={'btn'} onClick={() => handleOpenModal('AddUpcomingGamesPopup')}> + Create Upcoming Game</button>
                    </div>
                }

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
                                    <th> Game Icon</th>
                                    <th> Game Name</th>
                                        <th>Position</th>
                                    {
                                        hideActionFunc('popularGame') &&
                                        <th>Action</th>
                                    }
                                    </thead>
                                    <tbody>
                                    {
                                        rowData?.list?.length > 0 ?
                                        rowData?.list.map((item, index) => {
                                        return (
                                            <Draggable key={item.id} draggableId={item.id} index={index}>
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
                                                        <td className={'drag_and_drop_td'}><img src={item?.upcomingGameIcon || user} alt={'slider logo'} /> </td>
                                                        <td>{ dotGenerator(item.upcomingGameName, handleOpenModal, 'Game Name Description')}</td>
                                                        <td>{item?.position}</td>
                                                        {  hideActionFunc('popularGame') &&
                                                            <td className={'role_field_id'}>   <span className='edit_btn edit-btn-action u_border' onClick={(e) => handleOpenModal('AddUpcomingGamesPopup', { isEdit: true, item })}>Edit</span>
                                                                <span className='edit_btn edit-btn-action prTab'
                                                                      onClick={() => handleOpenModal('DeleteCommonModal',
                                                                          { deleteListApiHandler: deleteUpcomingGamesDetails({ upcomingGameId: item?._id }), title: 'Do you want to delete this data?' })}>
                                                                    Delete
                                                                </span>
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
                </div>
            </Paper>

            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getUpcomingGames} />
            </CommonModal>
        </Box>
    )
}
export default UpcomingGames