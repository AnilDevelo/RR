import React, {useEffect, useState} from "react";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import {ActionFunction, hideActionFunc} from "../../../../utils";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import Box from "@mui/material/Box";
import {useDispatch} from "react-redux";
import PopComponent from "../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import { getReferAndEarnTitleInReferAndEarn } from "Redux/Design/action";

const ReferAndEarnTitle = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false)
  const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
  let Modal = PopComponent[modalDetails.modalName];
  
  useEffect(() => {
    getReferAndEarnTitle();
  }, []);
  
  const columns = [
    {
        id: 'title',
        label: 'Title',
    },
    ActionFunction('helpAndSupport',{
        id: 'Action',
        disablePadding: false,
        label: 'Action',
        isDisbanding: true,
        type: 'custom',
        render: (row) => {
            return <TableCell className={'role_field_id'}>
                <span className='edit_btn edit-btn-action ' onClick={(e) => handleOpenModal('TitleEditPopUp', { isEdit: true, row })}>Edit</span>
               
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
            case 'TitleEditPopUp': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };

    const getReferAndEarnTitle = () => {
        setLoader(true);
        dispatch(getReferAndEarnTitleInReferAndEarn({})).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                list: Object?.keys(res?.data?.data || {})?.length > 0 ? [res?.data?.data] : [],
            })
        });
    };

  return (
    <Box>
    {/* {loader ? <Loader /> : ""} */}
    <Paper sx={{ mb: 2 }} className="outer-box">
        <div className={'game_tab_overView head_to_head_gameTab'}>
                <div className={'d_flex_brtween'}>
                    <h2>Refer And Earn Title</h2>
                    {
                       ( hideActionFunc('helpAndSupport') && rowData?.list?.length <= 0) &&
                        <div className={''}>
                            <button className={'btn'} onClick={(e) => handleOpenModal('TitleEditPopUp')}> + Add Refer And Earn Title</button>
                        </div>
                    }

                </div>
            <CustomTable
                headCells={columns}
                rowData={rowData?.list}
                totalDocs={rowData?.totalDocs}
                      isWinnerTitle={true}
                      loading={loader}
            />
        </div>
    </Paper>

    <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
        <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getReferAndEarnTitle} />
    </CommonModal>
</Box>
  )
}

export default ReferAndEarnTitle