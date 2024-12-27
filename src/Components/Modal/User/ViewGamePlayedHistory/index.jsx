import Box from "@material-ui/core/Box";
import CustomTable from "../../../../hoc/CommonTable";
import React, { useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import { useDispatch } from "react-redux";
import { viewUserPlayedDetailsGames} from "../../../../Redux/user/action";
import { useParams } from "react-router-dom";
import { currencyFormat } from "../../../../utils";
import Loader from "../../../../images/Loader";
import moment from "moment";
import TableLoader from "hoc/CommonTable/TableLoader";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    boxShadow: 24,
    width: 1000,
    padding: '32px 0',
    borderRadius: "5px",
};
const ViewGamePlayedHistory = ({ modalValue, handleOpenModal }) => {
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
            label: 'Date',
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment(row?.createdAt).format('MMM DD YYYY, hh:mm A')}</TableCell>
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
            disablePadding: false,
            label: 'Lobby Entry fees',
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
            label: 'Win Status',
        },
        {
            id: 'winAmount',
            numeric: true,
            disablePadding: false,
            label: 'Winning Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.winAmount)} </TableCell>
            }
        },
        {
            id: '',
            numeric: true,
            disablePadding: false,
            label: 'TDS Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat( +row?.tdsAmount)} </TableCell>
            }
        },
        {
            id: '',
            numeric: true,
            disablePadding: false,
            label: 'Net Credited Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat( +row?.netCreditedAmount)} </TableCell>
            }
        },
    ]);

    useEffect(()=>{
        if(modalValue?.gameName === 'Poker'){
            setColumns([
                {
                    id: 'date',
                    numeric: true,
                    disablePadding: true,
                    label: 'Date',
                    type: 'custom',
                    render: (row) => {
                        return <TableCell >{moment(row?.createdAt).format('MMM DD YYYY, hh:mm A')}</TableCell>
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
                    disablePadding: false,
                    label: 'Player Spend',
                    type: 'custom',
                    render: (row) => {
                        return <TableCell className={'text_center'}>{currencyFormat(+row?.entryFee || 0.00)}</TableCell>
                    }
                },
                {
                    id: 'entryfee',
                    numeric: true,
                    disablePadding: false,
                    label: 'Small/Big Blinds',
                    type: 'custom',
                    render: (row) => {
                        return <TableCell className={'text_center'}>{+row?.minEntryFee || 0}/{+row?.maxEntryFee || 0}</TableCell>
                    }
                },
                {
                    id: 'entryfee',
                    numeric: true,
                    disablePadding: false,
                    label: 'Lobby Entry fees',
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
                    disablePadding: false,
                    label: 'Win Status',
                },
                {
                    id: 'winAmount',
                    numeric: true,
                    disablePadding: false,
                    label: 'Winning Amount',
                    type: 'custom',
                    render: (row) => {
                        return <TableCell >{currencyFormat(+row?.winAmount)} </TableCell>
                    }
                },
                {
                    id: '',
                    numeric: true,
                    disablePadding: false,
                    label: 'TDS Amount',
                    type: 'custom',
                    render: (row) => {
                        return <TableCell >{currencyFormat( +row?.tdsAmount)} </TableCell>
                    }
                },
                {
                    id: '',
                    numeric: true,
                    disablePadding: false,
                    label: 'Net Credited Amount',
                    type: 'custom',
                    render: (row) => {
                        return <TableCell >{currencyFormat( +row?.netCreditedAmount)} </TableCell>
                    }
                },
            ])
        }else if(modalValue?.gameName?.includes('Rummy')){
            setColumns([
                {
                    id: 'date',
                    numeric: true,
                    disablePadding: true,
                    label: 'Date',
                    type: 'custom',
                    render: (row) => {
                        return <TableCell >{moment(row?.createdAt).format('MMM DD YYYY, hh:mm A')}</TableCell>
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
                    disablePadding: false,
                    label: 'Lobby Entry fees',
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
                    disablePadding: false,
                    label: 'Leaderboard Point',
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
                    label: 'Win Status',
                },
                {
                    id: 'winAmount',
                    numeric: true,
                    disablePadding: false,
                    label: 'Winning Amount',
                    type: 'custom',
                    render: (row) => {
                        return <TableCell >{currencyFormat(+row?.winAmount)} </TableCell>
                    }
                },
                {
                    id: '',
                    numeric: true,
                    disablePadding: false,
                    label: 'TDS Amount',
                    type: 'custom',
                    render: (row) => {
                        return <TableCell >{currencyFormat( +row?.tdsAmount)} </TableCell>
                    }
                },
                {
                    id: '',
                    numeric: true,
                    disablePadding: false,
                    label: 'Net Credited Amount',
                    type: 'custom',
                    render: (row) => {
                        return <TableCell >{currencyFormat( +row?.netCreditedAmount)} </TableCell>
                    }
                },
            ])
        }
    },[modalValue])


    useEffect(() => {
        getUserPlayedDetailsHandler()
    }, [pagination.rowsPerPage, pagination.page]);

    // get Users Api and All Filter Api
    const getUserPlayedDetailsHandler = () => {
        setLoader(true)
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            gameId: modalValue?.id,
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
        <Box sx={style} >
            {loader ? <TableLoader /> : ""}
            <p className={'custom_close_btn'} onClick={()=>handleOpenModal()}>
                <svg viewBox="0 0 24 24" x="1008" y="432" fit="" height="28" width="25"
                     preserveAspectRatio="xMidYMid meet" focusable="false">
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                        fill="#64748b" />
                </svg>
            </p>
            <div className={'OverView_pagination'}>
            <CustomTable
                headCells={columns}
                rowData={rowData?.list}
                totalDocs={rowData?.totalDocs}
                pagination={pagination}
                setPagination={setPagination}
            />
            </div>
        </Box>
    )
}
export default ViewGamePlayedHistory