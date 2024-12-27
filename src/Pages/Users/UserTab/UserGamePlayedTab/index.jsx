import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import CustomTable from '../../../../hoc/CommonTable';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserPlayedGamesList } from '../../../../Redux/user/action';
import Loader from "../../../../images/Loader";
import TableCell from "@mui/material/TableCell";
import ViewGamePlayedHistory from './ViewGamePlayedHistory';
import { renderSrNo } from 'utils';
import { Box } from '@mui/material';


const UserGamePlayedTab = ({ handleOpenModal }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 })
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [filterData, setFilterData] = useState({
        statusField: 'All Status'
    })
    const [viewGameWiseDetails,setViewGameWiseDetails] = useState({
        id:'',
        gameName:'',
        view:false
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
        setLoader(true);
        dispatch(getUserPlayedGamesList(payload)).then(res => {
            setLoader(false);
            if (res.data.success) {
                setRowData({
                    ...rowData,
                    list: res?.data?.data?.docs,
                    totalDocs: res?.data?.data?.totalDocs
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
                //   className="edit_btn"
                //   onClick={() => navigate(`/game-tab/${row?.gameId}`)}
                >{`GID000${row?.numericId}`}</span>
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
            id: 'Action',
            label: 'Game History',
            disablePadding: false,
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell ><span className='edit_btn edit-btn-action' onClick={() => setViewGameWiseDetails( {...viewGameWiseDetails, id: row?._id, gameName:row?.gameName, view: true})}> View History </span></TableCell>
            }
        }
    ];

    return (
        <>
        <Box>
            <Paper className="outer-box">
                {
                    !viewGameWiseDetails?.view &&
                    <CustomTable
                        headCells={columns}
                        rowData={rowData?.list}
                        totalDocs={rowData?.totalDocs}
                        pagination={pagination}
                        setPagination={setPagination}
                        loading={loader}
                    />
                }
                {
                    viewGameWiseDetails?.view &&
                        <ViewGamePlayedHistory setViewGameWiseDetails={setViewGameWiseDetails} viewGameWiseDetails={viewGameWiseDetails} handleOpenModal={handleOpenModal} />
                }
            </Paper>
            </Box>
        </>
        
    )
}
export default UserGamePlayedTab