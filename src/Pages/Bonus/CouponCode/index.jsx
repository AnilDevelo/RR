import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import Loader from "../../../images/Loader";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import TableCell from "@mui/material/TableCell";
import moment from "moment";
import { ActionFunction, currencyFormat, dotGenerator, hideActionFunc } from "../../../utils";
import {deleteCouponCode, getCouponCodeList} from "../../../Redux/Bonus/action";

const CouponCode = () => {
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
            case 'AddCouponCode': {
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
            id: 'couponCodeName',
            label: "Title"
        },
        {
            id: 'couponCodeDescription',
            label: 'Description',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.couponCodeDescription ? dotGenerator(row?.couponCodeDescription, handleOpenModal, 'Coupon Description') : ''}</TableCell>
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
            id: 'expireDate',
            label: 'Expire Date',
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment(row?.expireDate).format('MMM DD YYYY')}</TableCell>
            }
        },
        {
            id: 'cashBack',
            label: 'Cashback',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.cashBack)} </TableCell>
            }
        },
        {
            id: 'minDepositAmount',
            label: 'Deposit Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.isCashbackInPercentage ? `${row?.minDepositAmount} %` : currencyFormat(+row?.minDepositAmount)} </TableCell>
            }
        },
        {
            id: 'isRepeatedCoupon',
            label: 'Repeated Coupon',
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.isRepeatedCoupon ? "YES" : "NO"} </TableCell>
            }
        },

        ActionFunction('bonus', {
            id: 'action',
            label: 'Action',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action u_border' onClick={(e) => handleOpenModal('AddCouponCode', { isEdit: true, row })}>Edit</span>
                    <span className='edit_btn edit-btn-action prTab'
                        onClick={() => handleOpenModal('DeleteCommonModal',
                            { deleteListApiHandler: deleteCouponCode({ couponCodeId: row?._id }), title: 'Do you want to delete the coupon?' })}
                    >Delete</span>
                </TableCell>
            }
        })
    ];

    useEffect(() => {
        getCouponCodeListDetails()
    }, [pagination.rowsPerPage, pagination.page]);

    const getCouponCodeListDetails = () => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        };
        setLoader(true);
        dispatch(getCouponCodeList(payload)).then(res => {
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
                    hideActionFunc('bonus') &&
                    <div className={'admin_user_list d_flex_end'}>
                        <button className={'add_game_btn font-bold btn'} onClick={(e) => handleOpenModal('AddCouponCode')}>+  Add Coupon Code</button>
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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getCouponCodeListDetails} />
            </CommonModal>
        </Box>
    )
}
export default CouponCode