import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import TableCell from "@mui/material/TableCell";
import user from "../../../../../assets/images/avatar.png";
import Loader from "../../../../../images/Loader";
import CustomTable from "../../../../../hoc/CommonTable";
import DatePreviousMonthFilter
    from "../../MonthlyReferAndEarnLeaderboardList/PreviousMonthLeaderBoard/DatePreviousMonthFilter";
import moment, {isMoment} from "moment";
import {getViewGameLeaderboardList} from "../../../../../Redux/Bonus/action";

const MonthlyGameWiseLeaderboard = ({setGameId, gameId}) => {
    const dispatch = useDispatch();
    const date = new Date();
    const [loader, setLoader] = useState(false);
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [value, setValue] =useState(new Date(date.getFullYear(), date.getMonth() - 1, 1));
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
        },
        {
            id: 'score',
            label: 'Prize',
        },
    ];

    useEffect(() => {
        getLeaderboardDetailsList();
    }, [pagination.rowsPerPage, pagination.page]);

    const getLeaderboardDetailsList = () => {
        if (gameId) {
            let payload = {
                 gameId: gameId,
                year:moment(value)?.format("YYYY"),
                month: moment(value)?.format("MM"),
                // startDate: moment()?.format('YYYY-MM-DD')
                limit: pagination.rowsPerPage,
                start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            }
            setLoader(true)
            dispatch(getViewGameLeaderboardList(payload)).then(res => {
                setLoader(false)
                if (res.data.success) {
                    setRowData({
                        ...rowData,
                        list: res?.data?.data?.docs,
                        totalDocs: res?.data?.data?.totalDocs || 0
                    })
                }
            })
        }
    };
    return(
        <div className={'mt_15'}>
            {/* {loader ? <Loader /> : ""} */}
            <div className={'date-previous-month-filter'}>
                <DatePreviousMonthFilter value={value} setValue={setValue} />
            </div>
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
export default MonthlyGameWiseLeaderboard