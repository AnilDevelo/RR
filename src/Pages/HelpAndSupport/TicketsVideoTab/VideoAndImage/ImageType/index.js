import { Modal, Paper, TableCell } from '@material-ui/core';
import CommonModal from 'hoc/CommonModal';
import CustomTable from 'hoc/CommonTable';
import React from 'react'
import { useState } from 'react';
import { ActionFunction, hideActionFunc } from 'utils';
import user from "../../../../../assets/images/avatar.png";
import PopComponent from 'hoc/PopContent';
import { deleteHelpDeskImage, getTicketsVideoDetails } from 'Redux/HelpAndSupport/action';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


const ImageType = ({getLogoListDetails}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
  let Modal = PopComponent[modalDetails.modalName];
  const [rowData, setRowData] = useState([])

  const columns = [
    {
        id:'',
        label: 'Ticket Image',
        type: 'custom',
        render: (row, i) => {
            return (
              <TableCell className={"game_icon_img"}>
                <img src={row?.ticketVideo || user} alt={""} />
              </TableCell>
            );
          },
    },

    ActionFunction('design', {
        id: 'action',
        label: 'Action',
        isDisbanding: true,
        type: 'custom',
        render: (row) => {
            return <TableCell className={'role_field_id'}>
                <span
          className="edit_btn edit-btn-action u_border"
          onClick={() =>
            handleOpenModal("AddHelpDeskHeaderImage", { isEdit: true, row })
          }
        >
          Edit
        </span>
        <span
          className="edit_btn edit-btn-action prTab"
          onClick={() =>
            handleOpenModal("DeleteCommonModal", {
              deleteListApiHandler: deleteHelpDeskImage({
                ticketVideoId: row?._id
              }),
              title: "Do you want to delete this data?",
            })
          }
        >
          Delete
        </span>
            </TableCell>
        }
    })
]


useEffect(() => {
  getDailySpinDivisionRowDetails()
}, [pagination?.rowsPerPage,rowData?.totalDocs]);

const getDailySpinDivisionRowDetails = () => {
  dispatch(getTicketsVideoDetails({})).then(res => {
      if (res.data.success) {
          setRowData({
              ...rowData,
              list: res?.data?.data?.docs,
          });
      }
  })
}

  const handleOpenModal = (type, data) => {
   
    switch (type) {
        case 'CommonPop': {
            setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
            break;
        }
        case 'AddHelpDeskHeaderImage': {
            setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
            break;
        }
        case 'ViewHowToPlayPopup': {
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
  const getHelpDeskData = () => {
    setLoader(true);
    dispatch(getTicketsVideoDetails({}))
        .then((res) => {
          if (res.data.success) {
            setLoader(false);
            setRowData({
              ...rowData,
              list: res?.data?.data?.docs
            });
          } 
        })
      
  };
  return (
    <div>

      <Paper sx={{ mb: 2 }} className="outer-box">
        {rowData?.list <= 0 && hideActionFunc("helpAndSupport") &&
          <div className={'d_flex_end'}>
                <button className={'btn'} onClick={(e) => handleOpenModal('AddHelpDeskHeaderImage')}>+  Add Image </button>
            </div>
        }
            
     <CustomTable
         headCells={columns}
         rowData={rowData?.list}
         totalDocs={rowData?.totalDocs}
         pagination={pagination}
         setPagination={setPagination}
         isWinnerTitle={true}
     />
     <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
         <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getHelpDeskData} />
     </CommonModal>
 </Paper>
 </div>

  )
}

export default ImageType