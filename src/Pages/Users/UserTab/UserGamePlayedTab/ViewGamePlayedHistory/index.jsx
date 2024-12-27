import Box from "@material-ui/core/Box";
import CustomTable from "../../../../../hoc/CommonTable";
import React, { useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import { useDispatch } from "react-redux";
import { viewUserPlayedDetailsGames} from "../../../../../Redux/user/action";
import {useNavigate, useParams} from "react-router-dom";
import { currencyFormat } from "../../../../../utils";
import moment from "moment";
import Paper from "@mui/material/Paper";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Tooltip from "@mui/material/Tooltip";
import FormControl from "@mui/material/FormControl";

const ViewGamePlayedHistory = ({ viewGameWiseDetails, setViewGameWiseDetails ,handleOpenModal}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams()
    const [loader, setLoader] = useState(false)
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [pagination, setPagination] = useState({
        rowsPerPage: 10,
        page: 0
    });
    const [columns,setColumns] = useState([
        {
            id: 'date',
            numeric: true,
            disablePadding: true,
            label: 'Date & Time',
            twoLineText: true,
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment(row?.createdAt).format('MMM DD YYYY, hh:mm A')}</TableCell>
            }
        },
        {
            id: 'numberOfDeck',
            label: 'Lobby ID',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{row?.lobbyId}</TableCell>
            }
        },
        {
            id: '',
            numeric: true,
            disablePadding: false,
            twoLineText:true,
            label: 'Game Mode',
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.gameModeId?.gameModeName}</TableCell>
            }
        },
        {
            id: 'tableId',
            numeric: true,
            disablePadding: false,
            label: 'Table ID',
        },
        {
            id: 'noOfPlayer',
            numeric: true,
            disablePadding: false,
            label: 'Players',
        },
        {
            id: 'entryfee',
            twoLineText: true,
            label: 'Lobby </br> Entry fees',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'text_center'}>{currencyFormat(+row?.entryFee || 0.00 )}</TableCell>
            }
        },
        {
            id: 'rank',
            numeric: true,
            disablePadding: false,
            label: 'Rank',
        },
        {
            id: 'score',
            numeric: true,
            disablePadding: false,
            label: 'Score',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'text_center'}>{row?.score?.toFixed(2)}</TableCell>
            }
        },
        {
            id: 'winStatus',
            numeric: true,
            disablePadding: false,
            label: 'Status',
        },
        {
            id: '',
            numeric: true,
            twoLineText: true,
            label: 'Winning </br> Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.winAmount)} </TableCell>
            }
        },
        {
            id: '',
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell ><span className='edit_btn edit-btn-action' onClick={()=>handleOpenModal('ViewPlayerRecord', {id: row?.tableId})}> View </span></TableCell>
            }
        },
        // {
        //     id: '',
        //     numeric: true,
        //     twoLineText: true,
        //     label: 'TDS </br> Amount',
        //     type: 'custom',
        //     render: (row) => {
        //         return <TableCell >{currencyFormat( +row?.tdsAmount)} </TableCell>
        //     }
        // },
        // {
        //     id: '',
        //     numeric: true,
        //     twoLineText: true,
        //     label: 'Net Credited </br> Amount',
        //     type: 'custom',
        //     render: (row) => {
        //         return <TableCell >{currencyFormat( +row?.netCreditedAmount)} </TableCell>
        //     }
        // },
    ]);

    useEffect(()=>{
        if(viewGameWiseDetails?.gameName === 'Poker'){
            setColumns([
                {
                    id: 'date',
                    numeric: true,
                    disablePadding: true,
                    label: 'Date & Time',
                    twoLineText: true,
                    type: 'custom',
                    render: (row) => {
                        return <TableCell >{moment(row?.createdAt).format('MMM DD YYYY, hh:mm A')}</TableCell>
                    }
                },
                {
                    id: 'numberOfDeck',
                    label: 'Lobby ID',
                    type: 'custom',
                    render: (row, i) => {
                        return <TableCell>{row?.lobbyId}</TableCell>
                    }
                },
                {
                    id: '',
                    numeric: true,
                    disablePadding: false,
                    label: 'Game Mode',
                    type: 'custom',
                    render: (row) => {
                        return <TableCell >{row?.gameModeId?.gameModeName}</TableCell>
                    }
                },
                {
                    id: 'tableId',
                    numeric: true,
                    disablePadding: false,
                    label: 'Table ID',
                },
                {
                    id: 'noOfPlayer',
                    numeric: true,
                    disablePadding: false,
                    label: 'Players',
                },
                {
                    id: 'entryfee',
                    numeric: true,
                    twoLineText: true,
                    label: 'Player </br> Spend',
                    type: 'custom',
                    render: (row) => {
                        return <TableCell className={'text_center'}>{currencyFormat(+row?.entryFee || 0.00)}</TableCell>
                    }
                },
                {
                    id: 'entryfee',
                    numeric: true,
                    twoLineText: true,
                    label: 'Small/Big </br> Blinds',
                    type: 'custom',
                    render: (row) => {
                        return <TableCell className={'text_center'}>{+row?.minEntryFee || 0}/{+row?.maxEntryFee || 0}</TableCell>
                    }
                },
                {
                    id: 'entryfee',
                    numeric: true,
                    twoLineText: true,
                    label: 'Lobby </br> Entry fees',
                    type: 'custom',
                    render: (row) => {
                        return <TableCell className={'text_center'}>{currencyFormat(+row?.tournamentEntryFee || 0.00)}</TableCell>
                    }
                },
                {
                    id: 'rank',
                    numeric: true,
                    disablePadding: false,
                    label: 'Rank',
                },
                {
                    id: 'winStatus',
                    numeric: true,
                    twoLineText: true,
                    label: 'Status',
                },
                {
                    id: 'winAmount',
                    numeric: true,
                    twoLineText: true,
                    label: 'Winning </br> Amount',
                    type: 'custom',
                    render: (row) => {
                        return <TableCell >{currencyFormat(+row?.winAmount)} </TableCell>
                    }
                },
                {
                    id: '',
                    label: 'Action',
                    type: 'custom',
                    render: (row) => {
                        return <TableCell ><span className='edit_btn edit-btn-action' onClick={()=>handleOpenModal('ViewPlayerRecord', {id: row?.tableId})}> View </span></TableCell>
                    }
                },
                // {
                //     id: '',
                //     numeric: true,
                //     twoLineText: true,
                //     label: 'TDS </br> Amount',
                //     type: 'custom',
                //     render: (row) => {
                //         return <TableCell >{currencyFormat( +row?.tdsAmount)} </TableCell>
                //     }
                // },
                // {
                //     id: '',
                //     numeric: true,
                //     twoLineText: true,
                //     label: 'Net Credited </br> Amount',
                //     type: 'custom',
                //     render: (row) => {
                //         return <TableCell >{currencyFormat( +row?.netCreditedAmount)} </TableCell>
                //     }
                // },
            ])
        }else if(viewGameWiseDetails?.gameName?.includes('Rummy')){
            setColumns([
                {
                    id: 'date',
                    numeric: true,
                    disablePadding: true,
                    label: 'Date & Time',
                    twoLineText: true,
                    type: 'custom',
                    render: (row) => {
                        return <TableCell >{moment(row?.createdAt).format('MMM DD YYYY, hh:mm A')}</TableCell>
                    }
                },
                {
                    id: 'numberOfDeck',
                    label: 'Lobby ID',
                    type: 'custom',
                    render: (row, i) => {
                        return <TableCell>{row?.lobbyId}</TableCell>
                    }
                },
                {
                    id: '',
                    numeric: true,
                    disablePadding: false,
                    label: 'Game Mode',
                    type: 'custom',
                    render: (row) => {
                        return <TableCell >{row?.gameModeId?.gameModeName}</TableCell>
                    }
                },
                {
                    id: 'tableId',
                    numeric: true,
                    disablePadding: false,
                    label: 'Table ID',
                },
                {
                    id: 'noOfPlayer',
                    numeric: true,
                    disablePadding: false,
                    label: 'Players',
                },
                {
                    id: 'entryfee',
                    numeric: true,
                    twoLineText: true,
                    label: 'Lobby </br> Entry fees',
                    type: 'custom',
                    render: (row) => {
                        return <TableCell className={'text_center'}>{currencyFormat(+row?.entryFee || 0.00)}</TableCell>
                    }
                },
                {
                    id: 'rank',
                    numeric: true,
                    disablePadding: false,
                    label: 'Rank',
                },
                {
                    id: 'leaderboardPoints',
                    numeric: true,
                    twoLineText: true,
                    label: 'Leaderboard </br> Point',
                },
                {
                    id: 'score',
                    numeric: true,
                    disablePadding: false,
                    label: 'Score',
                    type: 'custom',
                    render: (row) => {
                        return <TableCell className={'text_center'}>{row?.score?.toFixed(2)}</TableCell>
                    }
                },
                {
                    id: 'winStatus',
                    numeric: true,
                    twoLineText: true,
                    label: 'Status',
                },
                {
                    id: 'winAmount',
                    numeric: true,
                    twoLineText: true,
                    label: 'Winning </br> Amount',
                    type: 'custom',
                    render: (row) => {
                        
                        return <TableCell >{currencyFormat(+row?.winAmount)} </TableCell>
                    }
                },
                {
                    id: '',
                    label: 'Action',
                    type: 'custom',
                    render: (row) => {
                        return <TableCell ><span className='edit_btn edit-btn-action' onClick={()=>handleOpenModal('ViewPlayerRecord', {id: row?.tableId})}> View </span></TableCell>
                    }
                },
                // {
                //     id: '',
                //     numeric: true,
                //     twoLineText: true,
                //     label: 'TDS </br> Amount',
                //     type: 'custom',
                //     render: (row) => {
                //         return <TableCell >{currencyFormat( +row?.tdsAmount)} </TableCell>
                //     }
                // },
                // {
                //     id: '',
                //     numeric: true,
                //     twoLineText: true,
                //     label: 'Net Credited </br> Amount',
                //     type: 'custom',
                //     render: (row) => {
                //         return <TableCell >{currencyFormat( +row?.netCreditedAmount)} </TableCell>
                //     }
                // },
            ])
        }
    },[viewGameWiseDetails])

    useEffect(() => {
        getUserPlayedDetailsHandler()
    }, [pagination.rowsPerPage, pagination.page]);

    // get Users Api and All Filter Api
    const getUserPlayedDetailsHandler = () => {
        setLoader(true)
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            gameId: viewGameWiseDetails?.id,
            userId: id
        }
        dispatch(viewUserPlayedDetailsGames(payload)).then(res => {
            setLoader(false)
            if (res.data?.success) {
                setRowData({
                    ...rowData,
                    list: res.data.data?.docs,
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
    };

    return (
        <div className={'view_game_user_history'}>
            <div className={"tds-all-user-section"}>
                <div className={"tds-main-section"}>
                    <Tooltip title={'Back'}>
                    <button className={"tds-back-btn view-back-btn"} onClick={() => setViewGameWiseDetails({...viewGameWiseDetails, view:false})}>
                        {" "}
                        <KeyboardArrowLeftIcon />
                    </button>
                    </Tooltip>
                    <h2>{viewGameWiseDetails?.gameName} Game History</h2>
                </div>
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
export default ViewGamePlayedHistory