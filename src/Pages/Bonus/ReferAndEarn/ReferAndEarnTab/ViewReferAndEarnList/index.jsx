import Box from "@material-ui/core/Box";
import CustomTable from "../../../../../hoc/CommonTable";
import React, { useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import { useDispatch } from "react-redux";
import Loader from "../../../../../images/Loader";
import { currencyFormat } from "../../../../../utils";
import moment from "moment";
import {getReferAndEarnListingView} from "../../../../../Redux/Bonus/action";
import { useNavigate } from "react-router-dom";

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
const ViewReferAndEarnList = ({ modalValue, handleOpenModal }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [pagination, setPagination] = useState({
        rowsPerPage: 10,
        page: 0
    });

    useEffect(() => {
        getReferAndEarnView()
    }, [modalValue]);

    const getReferAndEarnView = () => {
        setLoader(true);
        let payload = {
            ...modalValue,
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        };
        dispatch(getReferAndEarnListingView(payload)).then(res => {
            setLoader(false)
            if (res.data.success) {
                setRowData({
                    ...rowData,
                    list: res.data.data?.docs,
                    totalDocs: res.data.data.totalDocs || 0
                })
            } else {
                setRowData([])
            }
        })
    }

    const columns = [
        {
            id: 'createdAt',
            label: 'Date & Time',
            twoLineText: true,
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment(row?.createdAt).format('MMM DD YYYY, hh:mm A')}</TableCell>
            }
        },
        {
            id: 'ReferralUserId',
            label: 'Referral UserId',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell><span onClick={() => navigate(`/users-tab/${row?.userId?._id}`)} className='edit_btn'>{`UID000${row?.userId?.numericId}`}</span></TableCell>
            }
        },
        {
            id: '',
            numeric: true,
            disablePadding: false,
            label: 'Referral Username',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell> {row?.userId?.nickName}</TableCell>
            }
        },
        {
            id: 'refUserBonus',
            label: 'Referral Bonus',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.refUserBonus)}</TableCell>
            }
        },
    ];
    return (
        <Box sx={style} >
            {/* {loader ? <Loader /> : ""} */}
            <p className={'custom_close_btn'} onClick={()=>handleOpenModal()}>
                <svg viewBox="0 0 24 24" x="1008" y="432" fit="" height="28" width="25"
                     preserveAspectRatio="xMidYMid meet" focusable="false">
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                        fill="#64748b" />
                </svg>
            </p>
            <CustomTable
                headCells={columns}
                rowData={rowData?.list}
                totalDocs={rowData?.totalDocs}
                pagination={pagination}
                setPagination={setPagination}
                loading={loader}
            />
        </Box>
    )
}
export default ViewReferAndEarnList