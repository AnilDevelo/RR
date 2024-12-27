import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { userDetailGameStatistics } from '../../../../Redux/user/action';
import CustomTable from '../../../../hoc/CommonTable';
import Loader from "../../../../images/Loader";
import TableCell from "@mui/material/TableCell";
import moment from "moment";
import { renderSrNo } from 'utils';
import { Box } from '@mui/material';


const UserGameStatistics = () => {
    const dispatch = useDispatch();
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [loader, setLoader] = useState(false)
    const { id } = useParams();
    const columns = [
        {
            id: "",
            twoLineText: true,
            label: "Sr. no.",
            type: "custom",
            render: (row, i) => renderSrNo(row, i, pagination),
          },
        {
            id: 'gameName',
            numeric: true,
            disablePadding: false,
            label: 'Game Name',

        },
        {
            id: 'headToHead',
            numeric: true,
            disablePadding: false,
            label: 'BATTLE  (One Vs One)',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'pl_4'}>{row?.headToHead}</TableCell>
            }
        },
        {
            id: 'contest',
            numeric: true,
            disablePadding: false,
            // twoLineText: true,
            label: 'CONTEST (One Vs Many)',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'pl_4'}>{row?.contest}</TableCell>
            }
        },
        // {
        //     id: 'totalRefund',
        //     numeric: true,
        //     disablePadding: false,
        //     label: 'Total Refund',
        //     type: 'custom',
        //     render: (row) => {
        //         return <TableCell className={'pl_3'}>{row?.totalRefund}</TableCell>
        //     }
        // },
        {
            id: 'totalLoss',
            numeric: true,
            disablePadding: false,
            label: 'Total Loss',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'pl_3'}>{row?.totalLoss}</TableCell>
            }
        },
        {
            id: 'totalWin',
            disablePadding: false,
            label: 'Total Win',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'pl_3'}>{row?.totalWin}</TableCell>
            }
        },
        {
            id: 'totalTie',
            disablePadding: false,
            label: 'Total Tie ',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'pl_3'}>{row?.totalTie}</TableCell>
            }
        },
        {
            id: 'totalPlayed',
            numeric: true,
            disablePadding: false,
            label: 'Total Played ',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'pl_3'}>{row?.totalPlayed}</TableCell>
            }
        },
    ];

    useEffect(() => {
        getGameStatisticList();
    }, [pagination.rowsPerPage, pagination.page]);

    const getGameStatisticList = () => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            userId: id
        };
        setLoader(true);
        dispatch(userDetailGameStatistics(payload)).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                list: res?.data?.data?.docs,
                totalDocs: res?.data?.data?.totalDocs || 0
            })
        })
    };

    return (
        <>
            <Box>
            {/* {
                loader &&
                <Loader />
            } */}
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
export default UserGameStatistics