import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import TableCell from "@mui/material/TableCell";
import { useDispatch } from "react-redux";
import { getSingleUserKYC } from "../../../../Redux/user/action";
import { useParams } from "react-router-dom";
import PopComponent from "../../../../hoc/PopContent";
import CommonModal from "../../../../hoc/CommonModal";
import { renderSrNo } from "utils";

const UserKYCTab = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [loader, setLoader] = useState(false);
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    let columns = [
        {
            id: 'panCardNumber',
            label: 'Pan Card Number',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{(row?.panCardImage === null || row?.panCardImage === '') ? '-' : row?.panCardNumber}</TableCell>
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
                            <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('DocumentOpenPopup', { front: row?.panCardImage })}>View</span>
                    }

                </TableCell>
            }
        },
        {
            id: 'aadharCardNumber',
            label: 'Aadhaar Card Number',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{(row?.aadharCardNumber === null || row?.aadharCardNumber === '') ? '-' : row?.aadharCardNumber}</TableCell>
            }
        },
        {
            id: 'AadharCardPhoto',
            label: 'Aadhaar Card Photo',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell>
                    {
                        (row?.aadharCardNumber === null || row?.aadharCardNumber === '') ? '-' :
                            <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('DocumentOpenPopup', { front: row?.aadharCardFrontImage, back: row?.aadharCardBackImage })}>View</span>
                    }
                </TableCell>
            }
        },
        {
            id: 'status',
            label: 'Status',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                const statusText = row?.status === "Approve" ? "Approved" : row?.status === "reject" ? "Rejected" : row?.status === "pending" ? "Pending" : "_";
                return <TableCell>{<span className={row?.status == "Approve" ? "Approved" : "Reject"}>{statusText}</span>}</TableCell>
            }
        },
        // ActionFunction('user',{
        //     id: 'Action',
        //     label: 'Action',
        //     type: 'custom',
        //     render: (row) => {
        //         return <TableCell><span className='edit_btn edit-btn-action ' onClick={() => handleOpenModal('UpdateUserKYCPopup',row)}>Edit</span></TableCell>
        //     }
        // })
    ];

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'ApprovedKYCPopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'RejectedKYCPopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'UpdateUserKYCPopup': {
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

    useEffect(() => {
        getUserKYCListDetails()
    }, []);

    const getUserKYCListDetails = () => {
        let payload = {
            userId: id
        }
        setLoader(true);
        dispatch(getSingleUserKYC(payload)).then(res => {
            setLoader(false)
            if (res.data?.success) {
                setRowData({
                    ...rowData,
                    list: [res.data.data],
                    totalDocs: 0
                })
            } else {
                setRowData({
                    ...rowData,
                    list: [],
                    totalDocs: 0
                })
            }
        });
    };

    return (
        <>
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list}
                    totalDocs={0}
                    pagination={pagination}
                    setPagination={setPagination}
                    isWinnerTitle={true}
                    loading={loader}
                />
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getUserKYCListDetails} />
            </CommonModal>
            </Box>
        </>
    )
}
export default UserKYCTab