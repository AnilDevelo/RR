import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Loader from "../../../../../images/Loader";
import CustomTable from "../../../../../hoc/CommonTable";
import { useDispatch } from "react-redux";
import TableCell from "@mui/material/TableCell";
import CommonModal from "../../../../../hoc/CommonModal";
import PopComponent from "../../../../../hoc/PopContent";
import { userKYCViewRequestList } from "../../../../../Redux/user/action";
import moment from "moment";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 950,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};
const ViewKYCDetailsPopup = ({ modalValue, handleOpenModal }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [rowData, setRowData] = useState({ NewList: [], OldList: [] });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [pagination, setPagination] = useState({
        rowsPerPage: 10,
        page: 0
    });
    //userKYCViewRequestList
    useEffect(() => {
        dispatch(userKYCViewRequestList({ kycUpdateRequestId: modalValue?._id })).then(res => {
            if (res.data.success) {
                setRowData({
                    ...rowData,
                    NewList: Object?.keys(res?.data?.data?.newKYCDetails || {})?.length ? [res?.data?.data?.newKYCDetails] : [],
                    OldList: Object?.keys(res?.data?.data?.oldKYCDetails || {})?.length ? [res?.data?.data?.oldKYCDetails] : [],
                })
            }
        })
    }, [])

    const handleOpenModalError = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DocumentOpenPopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };

    const columnsNewAadhar = [
        {
            id: '',
            numeric: true,
            isDisbanding: true,
            label: 'Aadhar Card Name',
            type: 'custom',
            render: (row) => {
                return <TableCell> {row?.updateKYCDetails?.aadharName}</TableCell>
            }
        },
        {
            id: 'aadharCardNumber',
            label: 'Aadhar Card Number',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{(row?.updateKYCDetails?.aadharCardNumber === null || row?.updateKYCDetails?.aadharCardNumber === '') ? '-' : row?.updateKYCDetails?.aadharCardNumber}</TableCell>
            }
        },
        {
            id: 'AadharCardPhoto',
            label: 'Aadhar Card Photo',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell>
                    {
                        (row?.updateKYCDetails?.aadharCardNumber === null || row?.updateKYCDetails?.aadharCardNumber === '') ? '-' :
                            <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModalError('DocumentOpenPopup', { front: row?.updateKYCDetails?.aadharCardFrontImage, back: row?.updateKYCDetails?.aadharCardBackImage })}>View</span>
                    }
                </TableCell>
            }
        },
        {
            id: 'dateOfBirth',
            label: 'Date Of Birth',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{moment(row?.updateKYCDetails?.dateOfBirth).format('DD/MM/YYYY')  }</TableCell>
            }
        },
        {
            id: 'isAutomaticVerify',
            label: 'Automatic verify',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{row?.isAutomaticVerify ? 'Yes' : 'No'}</TableCell>
            }
        },
    ];

    const columnsOldAadhar = [
        {
            id: '',
            numeric: true,
            isDisbanding: true,
            label: 'Aadhar Card Name',
            type: 'custom',
            render: (row) => {
                return <TableCell> {row?.aadharName}</TableCell>
            }
        },
        {
            id: 'aadharCardNumber',
            label: 'Aadhar Card Number',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{(row?.aadharCardNumber === null || row?.aadharCardNumber === '') ? '-' : row?.aadharCardNumber}</TableCell>
            }
        },
        {
            id: 'AadharCardPhoto',
            label: 'Aadhar Card Photo',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell>
                    {
                        (row?.aadharCardNumber === null || row?.aadharCardNumber === '') ? '-' :
                            <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModalError('DocumentOpenPopup', { front: row?.aadharCardFrontImage, back: row?.aadharCardBackImage })}>View</span>
                    }
                </TableCell>
            }
        },
        {
            id: 'dateOfBirth',
            label: 'Date Of Birth',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{moment(row?.dateOfBirth).format('DD/MM/YYYY')}</TableCell>
            }
        },
        {
            id: 'isAutomaticVerify',
            label: 'Automatic verify',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{row?.isAutomaticVerify ? 'Yes' : 'No'}</TableCell>
            }
        },
    ];

    const columnsPanCard = [
        {
            id: 'panCardNumber',
            label: 'Pan Card Number',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{row?.updateKYCDetails?.panCardNumber}</TableCell>
            }

        },
        {
            id: '',
            label: 'Pan Card Photo',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell>
                    {
                        (row?.updateKYCDetails?.panCardImage === null || row?.updateKYCDetails?.panCardImage === '') ? '-' :
                            <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('DocumentOpenPopup', { front: row?.updateKYCDetails?.panCardImage })}>View</span>
                    }

                </TableCell>
            }
        },
    ];

    const columnsOldPanCard = [
        {
            id: 'panCardNumber',
            label: 'Pan Card Number',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{row?.panCardNumber}</TableCell>
            }

        },
        {
            id: '',
            label: 'Pan Card Photo',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell>
                    {
                        (row?.panCardImage === null || row?.panCardImage === '') ? '-' :
                            <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModalError('DocumentOpenPopup', { front: row?.panCardImage })}>View</span>
                    }

                </TableCell>
            }
        },
    ];

    return (
        <Box sx={style} className={'kyc-details-popup'}>
            <p className={'custom_close_btn'} onClick={()=>handleOpenModal()}>
                <svg viewBox="0 0 24 24" x="1008" y="432" fit="" height="28" width="25"
                     preserveAspectRatio="xMidYMid meet" focusable="false">
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                        fill="#64748b" />
                </svg>
            </p>
            {/* {loader ? <Loader /> : ""} */}
            <h2 >New Aadhar Card Details</h2>
            <CustomTable
                headCells={modalValue?.isUpdateAadharCard ? columnsNewAadhar : columnsPanCard}
                rowData={rowData?.NewList}
                totalDocs={rowData?.totalDocs}
                pagination={pagination}
                setPagination={setPagination}
                isWinnerTitle={true}
                loading={loader}
            />
            <div className={'old-list-Aadhar-card-details'}>
                <h2>Old Aadhar Card Details</h2>
                <CustomTable
                    headCells={modalValue?.isUpdateAadharCard ? columnsOldAadhar : columnsOldPanCard}
                    rowData={rowData?.OldList}
                    totalDocs={rowData?.totalDocs}
                    pagination={pagination}
                    setPagination={setPagination}
                    isWinnerTitle={true}
                    loading={loader}
                />
            </div>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModalError}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModalError} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={''} />
            </CommonModal>
        </Box>
    )
}
export default ViewKYCDetailsPopup