import { Box, TableCell } from '@mui/material';
import CustomTable from 'hoc/CommonTable';
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { currencyFormat } from 'utils';
import user from "../../../../../assets/images/avatar.png";
import { useEffect } from 'react';
import { getGSTUserWiseViewGameReportList } from 'Redux/GST';
import moment from 'moment';
import { Navigate, useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: '32px 0',
    borderRadius: "5px",
};

const ViewUserGSTReport = ({ modalValue, handleOpenModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [loader, setLoader] = useState(false);

    const columns = [
        {
            id: '',
            label: 'User Name',
            type: 'custom',
            render: (row) => {
                return <TableCell ><span className="edit_btn" onClick={() => navigate(`/users-tab/${row.userId._id}`)}>{row?.userId?.fullName}</span></TableCell>
            }
        },
        {
            id: 'depositAmount',
            label: 'Deposit Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.depositAmount)}</TableCell>
            }
        },
        {
            id: '',
            label: 'GST Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.platformGSTAmount)}</TableCell>
            }
        },
    ];

    useEffect(() => {
        getGSTUserWiseViewGameReportDetails();
    }, [pagination.rowsPerPage, pagination.page]);

    const getGSTUserWiseViewGameReportDetails = () => {
        let payload = {
            limit: pagination?.endRange || pagination?.rowsPerPage,
            start: pagination?.startRange ? (+pagination?.startRange - 1) : ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            userId: modalValue?.userId,
            startDate: moment().format("YYYY-MM-DD"),
        };
        setLoader(true)
        dispatch(getGSTUserWiseViewGameReportList(payload)).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                list: res?.data?.data?.docs,
                totalDocs: res?.data?.data?.totalDocs || 0
            })
        });
    };


    return (
        <>
            <Box sx={style}>
                <p className={'custom_close_btn'} onClick={() => handleOpenModal()}>
                    <svg viewBox="0 0 24 24" x="1008" y="432" fit="" height="28" width="25"
                        preserveAspectRatio="xMidYMid meet" focusable="false">
                        <path
                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                            fill="#64748b" />
                    </svg>
                </p>
                <div className={'OverView_pagination'}>
                    <CustomTable
                        headCells={columns}
                        rowData={rowData?.list}
                        totalDocs={rowData?.totalDocs}
                        pagination={pagination}
                        setPagination={setPagination}
                        loading={loader}
                    />
                </div>
            </Box>
        </>
    )
}

export default ViewUserGSTReport