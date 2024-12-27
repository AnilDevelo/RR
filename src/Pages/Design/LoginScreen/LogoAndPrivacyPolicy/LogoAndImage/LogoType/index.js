import { Modal, Paper, TableCell } from '@material-ui/core'
import user from "../../../../../../assets/images/avatar.png";
import {ActionFunction, hideActionFunc} from "../../../../../../utils";
import PopComponent from "../../../../../../hoc/PopContent";
import React from 'react'
import { useState } from 'react';
import CommonModal from 'hoc/CommonModal';
import CustomTable from 'hoc/CommonTable';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getDesignLoginScreen } from 'Redux/Design/action';

const LogoType = ({getLogoListDetails}) => {
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const dispatch = useDispatch();
    const [rowData, setRowData] = useState()
    const [loader, setLoader] = useState(false);
  let Modal = PopComponent[modalDetails.modalName];
  const columns = [
    {
        id:'',
        label: 'Logo',
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
                <span className='edit_btn edit-btn-action' onClick={(e) => handleOpenModal('AddLogo', { isEdit: true, row })}>Edit</span>
                
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
      case 'AddLogo': {
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
    <Paper sx={{ mb: 2 }} className="outer-box">
           {
                  ( hideActionFunc('bonus') && rowData?.list?.length <= 0) &&
                   <div className={'d_flex_end'}>
                       <button className={'btn'} onClick={(e) => handleOpenModal('AddLogo')}>+  Add Logo </button>
                   </div>
               }
            <CustomTable
                headCells={columns}
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
  )
}

export default LogoType