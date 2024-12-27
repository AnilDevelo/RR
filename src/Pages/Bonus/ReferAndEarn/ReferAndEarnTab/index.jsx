import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PopComponent from "../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import { currencyFormat } from "../../../../utils";
import Box from "@mui/material/Box";
import Loader from "../../../../images/Loader";
import ReferAndEarnConfig from "./ReferAndEarnConfig";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import moment from "moment";
import {getReferAndEarnListingDetails} from "../../../../Redux/Bonus/action";
import { useNavigate } from "react-router-dom";

const ReferAndEarnTab = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 })
    let Modal = PopComponent[modalDetails.modalName];
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });

    const columns = [
        {
            id: 'numericId',
            label: 'Users Id',
            type: 'custom',
            render: (row, i) => {
                return(
                <TableCell>
                <span
                  className="edit_btn"
                  onClick={() => navigate(`/users-tab/${row?.userId}`)}
                >{`UID000${row?.numericId}`}</span>
                    </TableCell>
                    )
            }
        },
        {
            id: 'nickName',
            label: 'User Name',
        },
        {
            id: 'referralCounter',
            label: 'Referral Counter',
        },
        {
            id: 'totalBonus',
            label: 'Total Referral Bonus',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.totalBonus)}</TableCell>
            }
        },
        {
            id: 'date',
            label: 'Date & Time',
            twoLineText: true,
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment(row?.date).format('MMM DD YYYY, hh:mm A')}</TableCell>
            }
        },
        // {
        //     id: '',
        //     label: 'Status',
        //     isDisbanding:true,
        //     type: 'custom',
        //     render: (row) => {
        //         return <TableCell> {row?.isActive ? "Activate" : "Deactivate"}</TableCell>
        //     }
        // },
        {
            id: '',
            label: 'Referral List',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell> <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('ViewReferAndEarnList', { referUserId: row?.userId })}>View</span></TableCell>
            }
        },
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
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };
    useEffect(() => {
        getReferAndEarnList()
    }, [pagination.rowsPerPage, pagination.page]);

    const getReferAndEarnList = () => {
        setLoader(true);
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        };
        dispatch(getReferAndEarnListingDetails(payload)).then(res => {
            setLoader(false)
            if (res.data.success) {
                setRowData({
                    ...rowData,
                    list: res.data.data?.docs,
                    totalDocs: (res.data.data.totalDocs || 0)
                });
            } else {
                setRowData({ list: [], totalDocs: 0 })
            }
        })
    }

    return (
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            {/*<ReferAndEarnConfig />*/}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <h2>Refer & Earn List</h2>
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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getReferAndEarnList} />
            </CommonModal>
        </Box>
    )
}
export default ReferAndEarnTab