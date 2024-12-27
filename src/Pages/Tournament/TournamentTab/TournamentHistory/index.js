import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import CustomTable from '../../../../hoc/CommonTable';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserPlayedGamesList } from '../../../../Redux/user/action';
import Loader from "../../../../images/Loader";
import TableCell from "@mui/material/TableCell";
import { renderSrNo } from 'utils';
import { Box } from '@mui/material';


const TournamentHistory = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 })
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [filterData, setFilterData] = useState({
        statusField: 'All Status'
    })

    useEffect(() => {
        getAllGamePlayedList()
    }, [pagination.rowsPerPage, pagination.page, filterData?.statusField])

    const getAllGamePlayedList = () => {
        let payload = {
            userId: id,
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        }
        setLoader(false);
        // dispatch(getUserPlayedGamesList(payload)).then(res => {
        //     setLoader(false);
        //     if (res.data.success) {
        //         setRowData({
        //             ...rowData,
        //             list: res?.data?.data?.docs,
        //             totalDocs: res?.data?.data?.totalDocs
        //         })
        //     }
        // })
    }

    const columns = [
        {
            id: "",
            twoLineText: true,
            label: "Sr. no.",
            type: "custom",
            render: (row, i) => renderSrNo(row, i, pagination),
          },
        {
            id: '',
            numeric: true,
            disablePadding: false,
            label: 'Tournament ID',
        },
        {
            id: '',
            numeric: true,
            disablePadding: true,
            label: 'Tournament Name',
        },
        {
            id: ' ',
            label: 'Tournament date',
            disablePadding: false,
            isDisbanding: true,
        },
        {
            id: ' ',
            label: 'Participant users',
            disablePadding: false,
            isDisbanding: true,
        },
        {
            id: ' ',
            label: 'Winner user',
            disablePadding: false,
            isDisbanding: true,
        },
        {
            id: ' ',
            label: 'Time durations',
            disablePadding: false,
            isDisbanding: true,
        },
        {
            id: ' ',
            label: 'Entry Fee',
            disablePadding: false,
            isDisbanding: true,
        },
        {
            id: ' ',
            label: 'Description',
            disablePadding: false,
            isDisbanding: true,
        },
        {
            id: ' ',
            label: 'Reported or blocked users',
            disablePadding: false,
            isDisbanding: true,
        }

    ];

    return (
        <>
        <Box>
            <Paper className="outer-box">
                    <CustomTable
                        headCells={columns}
                        rowData={rowData?.list}
                        totalDocs={rowData?.totalDocs}
                        pagination={pagination}
                        setPagination={setPagination}
                        loading={loader}
                    />
            </Paper>
            </Box>
        </>
        
    )
}
export default TournamentHistory