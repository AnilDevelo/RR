import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@material-ui/core/Box";
import Loader from "../../../images/Loader";
import CommonModal from "../../../hoc/CommonModal";
import PopComponent from "../../../hoc/PopContent";
import { useDispatch } from "react-redux";
import { deleteWebsiteHeaderList, getWebsiteHeaders, swapPositionHeaderSlider } from "../../../Redux/website/action";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import user from "../../../assets/images/avatar.png";
import {hideActionFunc} from "../../../utils";
import TableLoader from "hoc/CommonTable/TableLoader";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const HeaderSlider = () => {
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false);
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false })
    let Modal = PopComponent[modalDetails?.modalName];

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'AddHeaderSliderPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };

    useEffect(() => {
        getHeaderSliderData();
    }, []);

    const getHeaderSliderData = () => {
        setLoader(true)
        dispatch(getWebsiteHeaders({})).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                list: res.data.data.docs,
                totalDocs: res.data.data.totalDocs
            })
        })
    }

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
            headerId: result?.draggableId,
            oldPosition: result.source.index + 1,
            newPosition: result.destination.index + 1
        }
        setRowData({
            ...rowData,
            list: items
        })
       if(hideActionFunc('webSite')){
           dispatch(swapPositionHeaderSlider(payload)).then(res => {
               getHeaderSliderData();
           })
       }

    };

    return (
        <Box>
            { loader ? <TableLoader /> : "" }
            <Paper sx={{ mb: 2 }} className="outer-box">
                {
                    hideActionFunc('webSite') &&
                    <div className={'d_flex_end'}>
                        <button className={'btn'} onClick={() => handleOpenModal('AddHeaderSliderPop')}> + Add Header Slider</button>
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
                                        <th>Image List</th>
                                        <th>Position</th>
                                        {
                                            hideActionFunc('webSite') &&
                                            <th>Action</th>
                                        }

                                    </thead>
                                    <tbody>
                                        {rowData?.list.map((item, index) => (
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
                                                        <td className={'drag_and_drop_td'}><img src={item?.headerImageLocation || user} alt={'slider logo'} /> </td>
                                                        <td>{item.position}</td>
                                                        {
                                                            hideActionFunc('webSite') &&
                                                            <td className={'role_field_id'}>   <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('AddHeaderSliderPop', { isEdit: true, data: item })}>Edit</span>
                                                                <span className='edit_btn edit-btn-action prTab'
                                                                      onClick={()=> handleOpenModal('DeleteCommonModal',
                                                                          {deleteListApiHandler : deleteWebsiteHeaderList({headerId: item?.id}), title: 'Do you want to delete this data?'})}>
                                                                            Delete
                                                            </span>
                                                            </td>
                                                        }

                                                    </tr>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </tbody>
                                </table>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </Paper>

            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getHeaderSliderData} />
            </CommonModal>
        </Box>
    )
}
export default HeaderSlider