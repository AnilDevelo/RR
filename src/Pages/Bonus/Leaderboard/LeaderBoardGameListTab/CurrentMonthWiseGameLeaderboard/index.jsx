import React, {useEffect, useState} from "react";
import TableCell from "@mui/material/TableCell";
import user from "../../../../../assets/images/avatar.png";
import CustomTable from "../../../../../hoc/CommonTable";
import Loader from "../../../../../images/Loader";
import {useDispatch} from "react-redux";
import moment from "moment";
import {getLeaderboardList} from "../../../../../Redux/Bonus/action";

const CurrentMonthWiseGameLeaderboard = ({setGameId, gameId}) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
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
            label: ' Users Profile',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'game_icon_img'}>
                    <img src={row?.userId?.profileImage || user} alt={''} />
                </TableCell>
            }
        },
        {
            id: 'fullName',
            label: 'Users Name',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{row?.userId?.fullName}</TableCell>
            }
        },
        {
            id: 'rank',
            label: 'Rank',
        },
        {
            id: 'phoneNumber',
            label: 'Phone Number',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{row?.userId?.phoneNumber}</TableCell>
            }
        },
        {
            id: 'score',
            label: 'Score',
        }
    ];

    useEffect(() => {
        getLeaderboardDetailsList();
    }, [gameId, pagination.rowsPerPage, pagination.page]);

    const getLeaderboardDetailsList = () => {
        if (gameId) {
            let payload = {
                gameId: gameId,
                limit: pagination.rowsPerPage,
                start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
                startDate: `${ moment().format("YYYY")}-${moment().format("MM")}-1`,
                endDate: `${ moment().format("YYYY")}-${moment().format("MM")}-${moment().endOf('month').format('DD')}`
            }
            setLoader(true)
            dispatch(getLeaderboardList(payload)).then(res => {
                setLoader(false)
                if (res.data.success) {
                    setRowData({
                        ...rowData,
                        list: res?.data?.data?.docs,
                        totalDocs: res?.data?.data?.totalDocs
                    })
                } else {
                    setRowData({
                        ...rowData,
                        list: [],
                        totalDocs: 0
                    })
                }
            })
        }
    };
    return(
        <div className={'mt_15'}>
            {/* {loader ? <Loader /> : ""} */}
            <CustomTable
                headCells={columns}
                rowData={rowData?.list}
                totalDocs={rowData?.totalDocs}
                pagination={pagination}
                setPagination={setPagination}
                loading={loader}
            />
        </div>
    )
}
export default CurrentMonthWiseGameLeaderboard