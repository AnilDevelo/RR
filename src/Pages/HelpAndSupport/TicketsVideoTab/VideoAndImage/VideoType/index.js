import React from 'react'
import { Modal, Paper, TableCell } from '@material-ui/core';
import CustomTable from 'hoc/CommonTable';
import CommonModal from 'hoc/CommonModal';
import { useState } from 'react';
import { ActionFunction, hideActionFunc } from 'utils';
import PopComponent from 'hoc/PopContent';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTicketsVideoDetails } from 'Redux/HelpAndSupport/action';



const VideoType = () => {
  const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
  let Modal = PopComponent[modalDetails.modalName];
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState()


  const columnsOfImages = [

    {
      id: 'ticketVideo',
      label: 'video',
      type: 'custom',
      isDisbanding: true,
      render: (row) => {
          return <TableCell className={'role_field_id'}>
              {
                  
                      <span className={'edit_btn edit-btn-action'} onClick={()=> handleOpenModal('ViewVideoImage', row)}>View</span>
                     
              }
          </TableCell>
      }
  },
    ActionFunction('design', {
        id: 'action',
        label: 'Action',
        isDisbanding: true,
        type: 'custom',
        render: (row) => {
            return <TableCell className={'role_field_id'}>
                <span
          className="edit_btn edit-btn-action"
          onClick={() =>
            handleOpenModal("AddHelpDeskTicketVideo", { isEdit: true, row })
          }
        >
          Edit
        </span>
        
            </TableCell>
        }
    })
]

const handleOpenModal = (type, data) => {
  switch (type) {
      case 'CommonPop': {
          setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
          break;
      }
      case 'AddHelpDeskTicketVideo': {
          setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
          break;
      }
      case 'ViewVideoImage': {
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
  getHelpDeskVideoDetails()
}, []);

const getHelpDeskVideoDetails = () => {
  dispatch(getTicketsVideoDetails({})).then(res => {
      if (res.data.success) {
          setRowData({
              ...rowData,
              list: res?.data?.data?.docs,
          });
      }
  })
}

  return (
    <div>

    <Paper sx={{ mb: 2 }} className="outer-box">
    {
                  ( hideActionFunc('bonus') && rowData?.list?.length <= 0) &&
            <div className={'d_flex_end'}>
                <button className={'btn'} onClick={(e) => handleOpenModal('AddHelpDeskTicketVideo')}>+  Add Video </button>
            </div>
    }
     <CustomTable
         headCells={columnsOfImages}
         rowData={rowData?.list}
         totalDocs={rowData?.totalDocs}
         pagination={pagination}
         setPagination={setPagination}
         isWinnerTitle={true}
     />
     <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
         <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getHelpDeskVideoDetails} />
     </CommonModal>
 </Paper>
 </div>
  )
}

export default VideoType