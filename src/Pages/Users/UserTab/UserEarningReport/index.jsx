import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import {getUserEarningReport, getUserPlayedGamesList} from "../../../../Redux/user/action";
import TableCell from "@mui/material/TableCell";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import {currencyFormat, renderSrNo} from "../../../../utils";
import user from "../../../../assets/images/avatar.png";
import { Box } from "@mui/material";

const UserEarningReport = ({ handleOpenModal }) => {
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
        getUserEarningReportList()
    }, [pagination.rowsPerPage, pagination.page, filterData?.statusField])

    const getUserEarningReportList = () => {
        let payload = {
            userId: id,
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        }
        setLoader(true);
        dispatch(getUserEarningReport(payload)).then(res => {
            setLoader(false);
            if (res.data.success) {
                setRowData({
                    ...rowData,
                    list: res?.data?.data?.userEarning,
                    totalDocs: res?.data?.data?.totalDocs || 0
                })
            }
        })
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
            id: 'numericId',
            numeric: true,
            disablePadding: false,
            label: 'Game ID',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>
                <span
                  className="edit_btn"
                  onClick={() => navigate(`/game-tab/${row?._id}`)}
                >{`GID000${row?.gameNumericId}`}</span>
              </TableCell>
            }
        },
        {
            id: 'Icon',
            label: ' Icon',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'table_icon'}>
                    <img src={row?.gameIcon || user} alt={''} />
                </TableCell>
            }
        },
        {
            id: 'gameName',
            numeric: true,
            disablePadding: true,
            label: 'Game Name',
        },

        {
            id: 'earning',
            disablePadding: false,
            label: 'Net Credited Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'pl_3'}>{currencyFormat(+row?.earning)}</TableCell>
            }
        }
    ];

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

export default UserEarningReport