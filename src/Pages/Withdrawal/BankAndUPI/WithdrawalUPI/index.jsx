import Box from "@mui/material/Box";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PopComponent from "../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import user from "../../../../assets/images/avatar.png";
import {deleteBankAndUPIList, deleteUPIList, getWithdrawalUPI} from "../../../../Redux/Master/action";
import { ActionFunction, hideActionFunc } from "../../../../utils";
import Switch from "@mui/material/Switch";

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const WithdrawalUPI = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    let Modal = PopComponent[modalDetails.modalName];

    const columns = [
        {
            id: 'Icon',
            label: ' Icon',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'table_icon'}>
                    <img src={row?.bankIcon || user} alt={''} />
                </TableCell>
            }
        },
        {
            id: 'bankName',
            label: 'UPI',
            isDisbanding: true,
        },
        {
            id: '',
            label: 'Primary UPI ',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell >
                    {row?.isPrimary ? "Primary" : "-"}
                </TableCell>
            }
        },
        // {
        //     id: 'packageName',
        //     label: 'Package Name',
        //     type: 'custom',
        //     render: (row, i) => {
        //         return <TableCell >
        //             {row?.packageName}
        //         </TableCell>
        //     }
        // },
        ActionFunction('withdrawal', {
            id: 'Action',
            disablePadding: false,
            label: 'Action',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                     {/* <span className={  'u_border' }>
                        {
                            row?.isActive ?
                                <Switch {...label} checked={row?.isActive === true} onClick={() => handleOpenModal('ActiveDeactivateUPI', { UPIId: row?._id, isActive: false })} />
                                :
                                <Switch {...label} checked={row?.isActive === true}  onClick={() => handleOpenModal('ActiveDeactivateUPI', { UPIId: row?._id, isActive: true })} />
                        }
                    </span> */}
                    <span className={row?.isDeleted && !row?.isPrimary ? 'edit_btn edit-btn-action u_border prTab' : 'edit_btn edit-btn-action prTab'} onClick={(e) => handleOpenModal('AddWithdrawalUPI', { isEdit: true, row })}>Edit</span>
                    {
                        (row?.isDeleted && !row?.isPrimary) &&
                        <span className='edit_btn edit-btn-action prTab'
                              onClick={()=> handleOpenModal('DeleteCommonModal',
                                  {deleteListApiHandler : deleteUPIList({UPIId:row?._id}), title: 'Do you want to delete this data?'})}>
                        Delete
                    </span>
                    }
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
            case 'AddWithdrawalUPI': {
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

    useEffect(() => {
        getBankAndUrlDetails();
    }, [])

    const getBankAndUrlDetails = () => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        };
        setLoader(true);
        dispatch(getWithdrawalUPI(payload)).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                list: res.data.data.docs,
                totalDocs: res.data.data.totalDocs
            })
        });
    };

    return (
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                {
                    hideActionFunc('withdrawal') &&
                    <div className={'d_flex_end'}>
                        <button className={'btn'} onClick={(e) => handleOpenModal('AddWithdrawalUPI')}> + Add Withdrawal UPI</button>
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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getBankAndUrlDetails} />
            </CommonModal>
        </Box>
    )
}
export default WithdrawalUPI