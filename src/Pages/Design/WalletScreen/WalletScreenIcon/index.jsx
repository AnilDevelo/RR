import React, { useEffect, useState } from "react";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import PopComponent from "../../../../hoc/PopContent";
import TableCell from "@material-ui/core/TableCell";
import { ActionFunction, dotGenerator, hideActionFunc } from "../../../../utils";
import user from "../../../../assets/images/avatar.png";

import {deleteWalletScreen, getWalletScreenImage} from "../../../../Redux/Design/action";

const WalletScreenIcon = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
  const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
  let Modal = PopComponent[modalDetails.modalName];
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });

  useEffect(() => {
    getWalletScreenList();
  }, []);

  const getWalletScreenList = () => {
    setLoader(true);
    dispatch(getWalletScreenImage({}))
        .then((res) => {
          if (res.data.success) {
            setLoader(false);
            setRowData({
              ...rowData,
              list: res?.data?.data?.docs,
              totalDocs: res?.data?.data?.totalDocs
          
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
      case 'DeleteCommonModal': {
        setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
        break;
      }
      case 'CommonPop': {
        setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
        break;
      }
      case 'AddWalletIconPopUp':{
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

  const columns = [
    {
      label: "Wallet Icon",
      sortable: false,
      isDisbanding: true,
      type: 'custom',
      render: (row, i) => {
        return <TableCell className={'table_icon'}>
          <img src={row?.walletIconImage || user} alt={''} />
        </TableCell>
      }
    },
    {
      numeric: true,
      disablePadding: false,
      label: "Title",
      type: 'custom',
      render: (row, i) => {
        return <TableCell >{dotGenerator(row?.walletIconTitle, handleOpenModal, 'Title')}</TableCell>
        
      }
    },
    {
      numeric: true,
      disablePadding: false,
      label: "Tooltip",
      type: 'custom',
      render: (row, i) => { return <TableCell >{dotGenerator(row?.walletIconTooltipInfo, handleOpenModal, 'Tooltip')}</TableCell>
      }
    },
    ActionFunction('master', {
      id: 'Action',
      disablePadding: false,
      isDisbanding: true,
      label: 'Action',
      type: 'custom',
      render: (row) => {
        return <TableCell className={'role_field_id'}>
          <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('AddWalletIconPopUp', {  isEdit: true, row })}>Edit</span>
          <span className='edit_btn edit-btn-action prTab' onClick={() => handleOpenModal('DeleteCommonModal',
              { deleteListApiHandler: deleteWalletScreen({ walletIconId: row?._id }), title: 'Do you want to delete this data?' })}>Delete</span>
        </TableCell>
      }
    })
  ];

  return (
      <Box>
        {/* {loader ? <Loader /> : ""} */}

        <Paper sx={{ mb: 2 }} className="outer-box">
          {
            hideActionFunc('master') && rowData?.list?.length !== 3 &&
            <div className={'d_flex_end'}>
              <button className={'btn'} onClick={(e) => handleOpenModal('AddWalletIconPopUp')}>  + Add Wallet Screen Icon </button>
            </div>
          }
          <CustomTable
              headCells={columns}
              rowData={rowData?.list}
              totalDocs={rowData?.totalDocs}
              pagination={pagination}
          setPagination={setPagination}
          loading={loader}
          />
        </Paper>
        <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
          <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getWalletScreenList} />
        </CommonModal>
      </Box>
  );
};
export default WalletScreenIcon;
