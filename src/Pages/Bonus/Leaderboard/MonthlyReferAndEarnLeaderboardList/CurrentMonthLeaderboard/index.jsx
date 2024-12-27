import Box from "@material-ui/core/Box";
import React, {useEffect, useState} from "react";
import CustomTable from "../../../../../hoc/CommonTable";
import {useDispatch} from "react-redux";
import TableCell from "@mui/material/TableCell";
import user from "../../../../../assets/images/avatar.png";
import moment from "moment";
import {getCurrentReferAndEarnLeaderboard} from "../../../../../Redux/Bonus/action";
import {useNavigate} from "react-router-dom";


const CurrentMonthLeaderboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });



    const columns = [
        {
            id: '',
            label: ' Sr. No.',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'game_icon_img'}>
                    {pagination?.rowsPerPage * (+pagination?.page) + (i+1)}
                </TableCell>
            }
        },
        {
            id: '',
            label: 'User Profile',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'game_icon_img'}>
                    <img src={row?.userProfile || user} alt={''} />
                </TableCell>
            }
        },
        {
            id: 'nickName',
            numeric: false,
            disablePadding: false,
            label: 'User Name',
            type: 'custom',
            render: (row, i) => {
                return <TableCell><span className='edit_btn' onClick={() => navigate(`/users-tab/${row?._id}`)}>{row?.nickName}</span></TableCell>
            }
        },
        
        // {
        //     id: 'fullName',
        //     label: 'User Name',
        //     isDisbanding: true,
        //     type: 'custom',
        //     render: (row, i) => {
        //         return <TableCell>{row?.userId?.fullName}</TableCell>
        //     }
        // },
        {
            id: 'rank',
            label: 'Rank',
        },
        {
            id: 'points',
            numeric: true,
            disablePadding: false,
            label: 'Points',
        },
        // {
        //     id: 'points',
        //     numeric: true,
        //     disablePadding: false,
        //     label: 'Prize',
        // },
    ];

    useEffect(() => {
        getCurrentMonthReferAndEarnLeaderboard();
    }, [pagination.rowsPerPage, pagination.page]);

    const getCurrentMonthReferAndEarnLeaderboard = () => {
        let payload = {
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            limit: pagination.rowsPerPage,
            startDate: `${ moment().format("YYYY")}-${moment().format("MM")}-01`,
            endDate: `${ moment().format("YYYY")}-${moment().format("MM")}-${moment().endOf('month').format('DD')}`
        }
        setLoader(true);
        dispatch(getCurrentReferAndEarnLeaderboard(payload)).then(res => {
            setLoader(false);
            if (res.data.success) {
                setRowData({
                    ...rowData,
                    list: res?.data?.data,
                    totalDocs: res?.data?.data?.totalDocs
                });
            }
        });
    };

    return(
        <Box className={'mt_3'}>
            <CustomTable
                headCells={columns}
                rowData={rowData?.list}
                totalDocs={rowData?.totalDocs || 0}
                pagination={pagination}
                setPagination={setPagination}
                loading={loader}
                isWinnerTitle={true}
            />
        </Box>
    )
}
export default CurrentMonthLeaderboard