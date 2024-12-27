import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import {ActionFunction, currencyFormat, dotGenerator, hideActionFunc} from "../../../utils";
import moment from "moment";
import Box from "@mui/material/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import {deleteOfferList, getOfferList} from "../../../Redux/Bonus/action";

const Offer = () => {
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
            case 'AddOffer': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewRejectedComment': {
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
    const columns = [
        {
            id: 'offerName',
            label: "Title",
            type: 'custom',
            render: (row) => {
                return <TableCell >{dotGenerator(row?.offerName, handleOpenModal, 'Offer Title')}</TableCell>
            }
        },
        {
            id: 'offerDescription',
            label: 'Description',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell >{dotGenerator(row?.offerDescription, handleOpenModal, 'Offer Description')}</TableCell>
            }
        },
        {
            id: 'startDate',
            label: 'Start Date',
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment(row?.startDate).format('MMM DD YYYY')}</TableCell>
            }
        },
        {
            id: 'endDate',
            label: 'End Date',
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment(row?.endDate).format('MMM DD YYYY')}</TableCell>
            }
        },
        {
            id: 'cashbackType',
            label: 'Cashback Type',
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.cashbackType === 'FixAmount' ? 'Fix Amount' : row?.cashbackType === 'Upto' ? 'Upto Amount' :  'Percentage'}</TableCell>
            }
        },
        {
            id: 'cashbackBonus',
            label: 'Cashback Bonus',
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.cashbackType === "Percentage" ?`${row?.cashbackBonus}%` : row?.cashbackBonus}</TableCell>
            }
        },
        {
            id: 'depositInto',
            label: 'Bonus Type',
            type: 'custom',
            render: (row) => {
                return <TableCell >
                    {row?.depositInto === 'WinCash' ?  'Winning Cash' : row?.depositInto === 'DepositCash' ? 'Deposit Cash' : row?.depositInto === 'Bonus' && 'Bonus Cash'}
                </TableCell>
            }
        },
        {
            id: 'minDepositAmount',
            label: 'Deposit Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(row?.minDepositAmount || 0.00)}</TableCell>
            }
        },
        // {
        //     id: "isDeductTDS",
        //     label: "Deduct TDS",
        //     type: "custom",
        //     render: (row) => {
        //       return <TableCell>{row?.isDeductTds ? "Yes" : "No"}</TableCell>;
        //     },
        //   },
        ActionFunction('marketing', {
            id: 'action',
            label: 'Action',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action u_border' onClick={(e) => handleOpenModal('AddOffer', { isEdit: true, row })}>Edit</span>
                    <span className='edit_btn edit-btn-action prTab'
                          onClick={() => handleOpenModal('DeleteCommonModal',
                              { deleteListApiHandler: deleteOfferList({ offerId: row?._id }), title: 'Do you want to delete the Offer?' })}
                    >Delete</span>
                </TableCell>
            }
        })
    ];

    useEffect(() => {
        getOfferListDetails()
    }, [pagination.rowsPerPage, pagination.page]);

    const getOfferListDetails = () => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        };
        setLoader(true);
        dispatch(getOfferList(payload)).then(res => {
            if (res.data.success) {
                setLoader(false);
                setRowData({
                    ...rowData,
                    list: res?.data?.data?.docs,
                    totalDocs: res?.data?.data?.totalDocs
                });
            }
        })
    }
    return (
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                {
                    hideActionFunc('marketing') &&
                    <div className={'d_flex_end'}>
                        <button className={'btn'} onClick={(e) => handleOpenModal('AddOffer')}>+  Add Offer </button>
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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getOfferListDetails} />
            </CommonModal>
        </Box>
    )
}
export default Offer