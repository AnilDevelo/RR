import React, {useEffect, useState} from "react";
import Box from "@material-ui/core/Box";
import CustomTable from "../../../../../hoc/CommonTable";
import DatePreviousMonthFilter from "./DatePreviousMonthFilter";
import {useDispatch} from "react-redux";
import moment from "moment";
import {getPreviousReferAndEarnLeaderboard} from "../../../../../Redux/Bonus/action";
import TableCell from "@mui/material/TableCell";
import user from "../../../../../assets/images/avatar.png";
import {useNavigate} from "react-router-dom";

const PreviousMonthLeaderBoard = ()=>{
    const dispatch = useDispatch()
    const date = new Date();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
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
            id: 'rank',
            label: 'Rank',
        },
        {
            id: 'id',
            numeric: false,
            disablePadding: false,
            label: 'Users ID',
            type: 'custom',
            render: (row, i) => {
                return <TableCell><span className='edit_btn'
                                        onClick={() => navigate(`/users-tab/${row.id}`)}>{`UID000${row?.numericId}`}</span></TableCell>
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
            id: 'fullName',
            label: 'User Name',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{row?.userId?.fullName}</TableCell>
            }
        },
        {
            id: 'points',
            numeric: true,
            disablePadding: false,
            label: 'Points',
        },
        {
            id: 'prize',
            numeric: true,
            disablePadding: false,
            label: 'Prize',
        },
    ];

    useEffect(() => {
        getPreviousMonthReferAndEarnLeaderboard();
    }, [value]);

    const getPreviousMonthReferAndEarnLeaderboard = () => {
        let payload = {
            // start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            // limit: pagination.rowsPerPage,
            year:moment(value)?.format("YYYY"),
            month: moment(value)?.format("MM")
        }
        setLoader(true);
        dispatch(getPreviousReferAndEarnLeaderboard(payload)).then(res => {
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
        <Box className={'mt_15'}>
           <div className={'date-previous-month-filter'}>
               <DatePreviousMonthFilter value={value} setValue={setValue} />
           </div>
            <CustomTable
                headCells={columns}
                rowData={rowData?.list}
                totalDocs={rowData?.totalDocs || 0}
                pagination={pagination}
                setPagination={setPagination}
                loading={loader}
            />
        </Box>
    )
}
export default PreviousMonthLeaderBoard