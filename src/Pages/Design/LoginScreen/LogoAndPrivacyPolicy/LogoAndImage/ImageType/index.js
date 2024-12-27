import { Modal, Paper, TableCell } from '@material-ui/core';
import CommonModal from 'hoc/CommonModal';
import CustomTable from 'hoc/CommonTable';
import React from 'react'
import { useState } from 'react';
import { ActionFunction, hideActionFunc } from 'utils';
import user from "../../../../../../assets/images/avatar.png";
import { deleteOfferList } from 'Redux/Bonus/action';
import PopComponent from 'hoc/PopContent';
import { deleteImage, getDesignLoginScreen } from 'Redux/Design/action';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';


const ImageType = ({getLogoListDetails}) => {
  const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
  let Modal = PopComponent[modalDetails.modalName];
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState()
  const [loader, setLoader] = useState(false);


  const columnsOfImages = [
    {
        id:'',
        label: 'Image',
        type: 'custom',
        isDisbanding: true,
        render: (row, i) => {
            return (
              <TableCell className={"game_icon_img"}>
                <img src={row?.companyLogoImage || user} alt={""} />
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
            handleOpenModal("AddImages", { isEdit: true, row })
          }
        >
          Edit
        </span>
        <span
          className="edit_btn edit-btn-action prTab"
          onClick={() =>
            handleOpenModal("DeleteCommonModal", {
              deleteListApiHandler: deleteImage({
                loginScreenId: row?._id
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
  getHelpDeskVideoDetails()
}, []);

const getHelpDeskVideoDetails = () => {
  dispatch(getDesignLoginScreen({})).then(res => {
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
        case 'AddImages': {
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
 
  return (
    <>
      <Paper sx={{ mb: 2 }} className="outer-box">
        {  hideActionFunc('design') && rowData?.list?.length !== 1 &&
            <div className={'d_flex_end'}>
                <button className={'btn'} onClick={(e) => handleOpenModal('AddImages')}>+  Add Image </button>
            </div>
          }
     <CustomTable
         headCells={columnsOfImages}
         rowData={rowData?.list}
         totalDocs={rowData?.totalDocs}
         pagination={pagination}
         setPagination={setPagination}
         isWinnerTitle={true}
         loading={loader}

     />
     <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
         <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getHelpDeskVideoDetails} />
     </CommonModal>
 </Paper>
 </>

  )
}

export default ImageType