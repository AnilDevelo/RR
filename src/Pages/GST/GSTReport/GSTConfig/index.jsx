import React, { useEffect, useState } from 'react'
import { Box, Paper, TableCell } from '@mui/material'
import CustomTable from "../../../../hoc/CommonTable";
import { useDispatch } from "react-redux";
import { ActionFunction, hideActionFunc } from "../../../../utils";
import PopComponent from "../../../../hoc/PopContent";
import CommonModal from "../../../../hoc/CommonModal";
import { getGSTConfigPercent } from 'Redux/GST';

const GSTConfig = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false)
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
  const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false })
  let Modal = PopComponent[modalDetails?.modalName];

  const columns = [
    {
      id: 'gstPercentage',
      label: 'GST Percentage',
    },
    ActionFunction('gstReport', {
      id: 'Action',
      disablePadding: false,
      label: 'Action',
      isDisbanding: true,
      type: 'custom',
      render: (row) => {
        return <TableCell className={'role_field_id'}>
          <span className='edit_btn edit-btn-action' onClick={(e) => handleOpenModal('AddGSTConfigPopup', { isEdit: true, row })}>Edit</span>
        </TableCell>
      }
    })
  ]

  const getGSTConfigHandler = () => {
    console.log('entered');
    setLoader(true);
    dispatch(getGSTConfigPercent({})).then(res => {
        setLoader(false);
        if (res.data.success) {
            setRowData({
                ...rowData,
                list: Object?.keys(res.data.data)?.length ? [res.data.data] : [],
                totalDocs: 0
            })
        }
    });
  };

  useEffect(() => {
    getGSTConfigHandler();
  }, [])

  const handleOpenModal = (type, data) => {
    switch (type) {
      case 'CommonPop':
      case 'AddGSTConfigPopup': {
        setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
        break;
      }
      default: {
        setModalDetails({ ...modalDetails, modalIsOpen: false });
      }
    }
  };


  return (
    <Box>
      <Paper sx={{ mb: 2 }} className="outer-box">
        <div className={'d_flex_between'}>
          <h2>GST Config</h2>
          {
            (hideActionFunc('gstReport') && rowData?.list?.length <= 0) &&
            <button className={'btn'} onClick={() => handleOpenModal('AddGSTConfigPopup')}>+  Add GST Config </button>
          }
        </div>
        <CustomTable
          headCells={columns}
          rowData={rowData?.list}
          isWinnerTitle={true}
          loading={loader}
        />
      </Paper>
      <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
        <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getGSTConfigHandler} />
      </CommonModal>
    </Box>
  )
}

export default GSTConfig