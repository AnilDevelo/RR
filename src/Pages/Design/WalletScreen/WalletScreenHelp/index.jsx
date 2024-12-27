import React, { useEffect, useState } from "react";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import PopComponent from "../../../../hoc/PopContent";
import TableCell from "@material-ui/core/TableCell";
import { ActionFunction, hideActionFunc } from "../../../../utils";
import user from "../../../../assets/images/avatar.png";
import {deleteWalletHelpScreen, getWalletHelpScreen} from "../../../../Redux/Design/action";

const WalletScreenHelp = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
  const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
  let Modal = PopComponent[modalDetails.modalName];
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });

  useEffect(() => {
    getWalletHelpScreenList();
  }, []);

  const getWalletHelpScreenList = () => {
    setLoader(true);
    dispatch(getWalletHelpScreen({}))
        .then((res) => {
          if (res.data.success) {
            setLoader(false);
            setRowData({
              ...rowData,
              list: res?.data?.data?.docs,
              totalDocs: res.data?.data?.totalDocs
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
      case 'AddWalletScreenIconPopUp':{
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
          <img src={row?.walletHelpScreenIconImage || user} alt={''} />
        </TableCell>
      }
    },
    {
      id: "walletHelpScreenIconTitle",
      numeric: true,
      disablePadding: false,
      label: "Title",
    },
    ActionFunction('master', {
      id: 'Action',
      disablePadding: false,
      isDisbanding: true,
      label: 'Action',
      type: 'custom',
      render: (row) => {
        return <TableCell className={'role_field_id'}>
          <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('AddWalletScreenIconPopUp', {  isEdit: true, row })}>Edit</span>
          <span className='edit_btn edit-btn-action prTab' onClick={() => handleOpenModal('DeleteCommonModal',
              { deleteListApiHandler: deleteWalletHelpScreen({ walletHelpScreenIconId: row?._id }), title: 'Do you want to delete this data?' })}>Delete</span>
        </TableCell>
      }
    })
  ];

  return (
      <Box>
        {/* {loader ? <Loader /> : ""} */}

        <Paper sx={{ mb: 2 }} className="outer-box">
          {
            hideActionFunc('master') && rowData?.list?.length !== 4 &&
            <div className={'d_flex_end'}>
              <button className={'btn'} onClick={(e) => handleOpenModal('AddWalletScreenIconPopUp')}>  + Add Wallet Screen Help Icon </button>
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
          <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getWalletHelpScreenList} />
        </CommonModal>
      </Box>
  );
};
export default WalletScreenHelp;
