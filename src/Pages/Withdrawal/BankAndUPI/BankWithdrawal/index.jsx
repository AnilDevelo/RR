
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PopComponent from "../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import user from "../../../../assets/images/avatar.png";
import { deleteBankList, getBankList} from "../../../../Redux/Master/action";
import Box from "@mui/material/Box";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import { ActionFunction, hideActionFunc } from "../../../../utils";

const BankWithdrawal = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    let Modal = PopComponent[modalDetails.modalName];

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddBankAndUpi': {
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
            label: 'Bank Name',
            isDisbanding: true,
        },
        {
            id: '',
            label: 'Primary Bank ',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell >
                    {row?.isPrimary ? "Primary" : "-"}
                </TableCell>
            }
        },
        ActionFunction('withdrawal', {
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className={row?.isDeleted && !row?.isPrimary ? 'edit_btn edit-btn-action u_border' : 'edit_btn edit-btn-action'} onClick={(e) => handleOpenModal('AddBankAndUpi', { isEdit: true, row })}>Edit</span>
                    {
                        (row?.isDeleted && !row?.isPrimary) &&
                        <span className='edit_btn edit-btn-action prTab'
                              onClick={()=> handleOpenModal('DeleteCommonModal',
                                  {deleteListApiHandler : deleteBankList({bankId:row?._id}), title: 'Do you want to delete this data?'})}>
                        Delete
                    </span>
                    }

                </TableCell>
            }
        })
    ];

    useEffect(() => {
        getBankAndUrlDetails();
    }, [pagination.rowsPerPage,pagination.page]);

    const getBankAndUrlDetails = () => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        };
        setLoader(true);
        dispatch(getBankList(payload)).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                list: res?.data?.data?.docs,
                totalDocs: res?.data?.data?.totalDocs
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
                        <button className={'btn'} onClick={(e) => handleOpenModal('AddBankAndUpi')}> + Add Withdrawal Bank</button>
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
    );
}
export default BankWithdrawal