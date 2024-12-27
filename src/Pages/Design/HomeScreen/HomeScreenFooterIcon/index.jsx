import React, { useEffect, useState } from "react";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import PopComponent from "../../../../hoc/PopContent";
import TableCell from "@material-ui/core/TableCell";
import { ActionFunction, hideActionFunc } from "../../../../utils";
import user from "../../../../assets/images/avatar.png";
import { deleteHomeScreenFooterIcon, getHomeScreenFooterIcon, swapFooterIcons} from "../../../../Redux/Design/action";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { deleteUpcomingGamesDetails, getUpcomingGamesDetails, swapPositionUpcomingGames } from "Redux/popularGames/action";
import TableLoader from "hoc/CommonTable/TableLoader";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
const HomeScreenFooterIcon = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });

  useEffect(() => {
    getHomeScreenFooterList();
  }, []);

  const getHomeScreenFooterList = () => {
    setLoader(true);
    dispatch(getHomeScreenFooterIcon({}))
      .then((res) => {
        if (res.data.success) {
          setLoader(false);
          setRowData({
            ...rowData,
            list: res?.data?.data?.docs,
            totalDocs: res?.data?.data?.totalDocs,
          });
        } else {
          setLoader(false);
        }
      })
      .catch((e) => {
        setLoader(false);
      });
  };

  const handleOpenModal = (type, data) => {
    switch (type) {
      case "DeleteCommonModal": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "CommonPop": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "AddHomeScreenFooterIconPopup": {
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
    getHomeScreenFooterList();
  }, [pagination.rowsPerPage, pagination.page]);
  // const columns = [
  //   {
  //     label: "Footer Icon",
  //     sortable: false,
  //     isDisbanding: true,
  //     type: 'custom',
  //     render: (row, i) => {
  //       return <TableCell className={'table_icon'}>
  //         <img src={row?.iconImage || user} alt={''} />
  //       </TableCell>
  //     }
  //   },
  //     {
  //       id: "iconName",
  //       numeric: true,
  //       disablePadding: false,
  //       label: "Name",
  //     },
  //   ActionFunction('master', {
  //     id: 'Action',
  //     disablePadding: false,
  //     isDisbanding: true,
  //     label: 'Action',
  //     type: 'custom',
  //     render: (row) => {
  //       return <TableCell className={'role_field_id'}>
  //         <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('AddHomeScreenFooterIconPopup', {  isEdit: true, row })}>Edit</span>
  //         <span className='edit_btn edit-btn-action prTab' onClick={() => handleOpenModal('DeleteCommonModal',
  //             { deleteListApiHandler: deleteHomeScreenFooterIcon({ homeScreenIconId: row?._id }), title: 'Do you want to delete this data?' })}>Delete</span>
  //       </TableCell>
  //     }
  //   })
  // ];
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
    homeScreenIconId: result?.draggableId,
      oldPosition: result.source.index + 1,
      newPosition: result.destination.index + 1
  }
  setRowData({
      ...rowData,
      list: items
  })
  if (hideActionFunc('Design')) {
      dispatch(swapFooterIcons(payload)).then(res => {
        getHomeScreenFooterList();
      })
  }

};
const getFooterIcons = () => {
  let payload = {
      limit: pagination.rowsPerPage,
      start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
  };
  setLoader(true);
  dispatch(getHomeScreenFooterIcon(payload)).then(res => {
      setLoader(false)
      setRowData({
          ...rowData,
          list: res?.data?.data?.docs,
          totalDocs: res?.data?.data?.totalDocs
      })
  });
};
  return (
    <>

      {/* <Box>
        {loader ? <Loader /> : ""}

        <Paper sx={{ mb: 2 }} className="outer-box">
          {
            hideActionFunc('master') &&
            <div className={'d_flex_end'}>
              <button className={'btn'} onClick={(e) => handleOpenModal('AddHomeScreenFooterIconPopup')}>  + Add Home Screen Footer Icon </button>
            </div>
          }
          <CustomTable
              headCells={columns}
              rowData={rowData?.list}
              totalDocs={rowData?.totalDocs}
              pagination={pagination}
              setPagination={setPagination}
          />
        </Paper>
        <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
          <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getHomeScreenFooterList} />
        </CommonModal>
      </Box> */}
      <Box>
           
            {loader ? <TableLoader /> : ""}
            <Paper sx={{ mb: 2 }} className="outer-box">
                {
                    hideActionFunc('popularGame') &&
                    <div className={'d_flex_end'}>
                        <button className={'btn'} onClick={() => handleOpenModal('AddHomeScreenFooterIconPopup')}>  + Add Home Screen Footer Icon </button>
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
                                    <th> Selected Icon</th>
                                    <th> Non-Selected Icon</th>
                                    <th> Title Name</th>
                                    <th>Position</th>
                                    {
                                        hideActionFunc('design') &&
                                        <th>Action</th>
                                    }
                                    </thead>
                                    <tbody>
                                    {
                                        rowData?.list ?.length > 0 ?
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
                                                        <td className={'drag_and_drop_td'}><img src={item?.selectedIconImage || user} alt={'slider logo'} /> </td>
                                                        <td className={'drag_and_drop_td'}><img src={item?.nonSelectedIconImage || user} alt={'slider logo'} /> </td>
                                                        <td>{item.iconName}</td>
                                                        <td>{item?.position}</td>
                                                        {  hideActionFunc('design') &&
                                                            <td className={'role_field_id'}>   <span className='edit_btn edit-btn-action u_border' onClick={(e) => handleOpenModal('AddHomeScreenFooterIconPopup', { isEdit: true, item })}>Edit</span>
                                                                <span className='edit_btn edit-btn-action prTab'
                                                                      onClick={() => handleOpenModal('DeleteCommonModal',
                                                                          { deleteListApiHandler: deleteHomeScreenFooterIcon({ homeScreenIconId: item?._id }), title: 'Do you want to delete this data?' })}>
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
                                                <td  className={'data_notFound_box'} colSpan={5}>No Data Found</td>
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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getFooterIcons} />
            </CommonModal>
        </Box>
    </>

  );
};
export default HomeScreenFooterIcon;
