import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PopComponent from "../../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import Loader from "../../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../../hoc/CommonTable";
import CommonModal from "../../../../../hoc/CommonModal";
import { ActionFunction, currencyFormat } from "../../../../../utils";
import {getReferAndEarn} from "../../../../../Redux/Bonus/action";

const ReferAndEarnConfig = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 })
    let Modal = PopComponent[modalDetails.modalName];
    const [rowData, setRowData] = useState({});

    const columns = [
        {
            id: '',
            label: 'Referral  Bonus For Opponent',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.refUserBonus)}</TableCell>
            }
        },
        {
            id: '',
            label: 'Users Bonus',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.userBonus)}</TableCell>
            }
        },
        ActionFunction('bonus', {
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action' onClick={(e) => handleOpenModal('AddReferAndEarnList', { isEdit: true, row })}>Edit</span>
                    {/*<span className='edit_btn edit-btn-action u_border prTab'*/}
                    {/*      onClick={()=> handleOpenModal('DeleteCommonModal', {deleteListApiHandler : deleteReferAndEarnList({referAndEarnId: row?._id}), title: 'Do you want to delete this data?'})}*/}
                    {/*>Delete</span>*/}
                    {/*{*/}
                    {/*    row?.isActive ?*/}
                    {/*        <span className='edit_btn edit-btn-action prTab' onClick={()=>handleOpenModal('ActivateDeactivateEarnPopup', {referAndEarnId:row?._id,isActive:false})}>Deactivate</span>*/}
                    {/*        :*/}
                    {/*        <span className='edit_btn edit-btn-action prTab' onClick={()=>handleOpenModal('ActivateDeactivateEarnPopup', {referAndEarnId:row?._id,isActive:true})}>Activate</span>*/}
                    {/*}*/}

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
            case 'ViewReferAndEarnList': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddReferAndEarnList': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ActivateDeactivateEarnPopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };

    useEffect(() => {
        getReferAndEarnList();
    }, []);

    const getReferAndEarnList = () => {
        setLoader(true);
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        };
        dispatch(getReferAndEarn(payload)).then(res => {
            setLoader(false)
            if (res.data.success) {
                if (Object?.keys(res.data.data || {})?.length > 0) {
                    let temp = [];
                    temp.push(res.data?.data);
                    setRowData(temp || [])
                } else {
                    setRowData([])
                }
            } else {
                setRowData([])
            }
        })
    };

    return (
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'d_flex_between'}>
                    <h2>Refer & Earn Config</h2>
                    {
                         rowData?.length === 0 &&
                         <button className={'btn'} onClick={(e) => handleOpenModal('AddReferAndEarnList')}> + Add Refer & Earn Config</button>
                    }
                </div>
                <CustomTable
                    headCells={columns}
                    rowData={rowData}
                    totalDocs={0}
                    pagination={pagination}
                    setPagination={setPagination}
                    isAboutWebsite={true}
                    loading={loader}
                />
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getReferAndEarnList} />
            </CommonModal>
        </Box>
    )
}
export default ReferAndEarnConfig