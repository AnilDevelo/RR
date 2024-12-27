import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getGameNumberOfDeck, getPlayerRecordList, getSingleGameDetails} from "../../../../../Redux/games/action";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {clearPaginationAndFilterData, currencyFormat, hideActionFunc} from "../../../../../utils";
import CustomTable from "../../../../../hoc/CommonTable";
import moment from "moment";
import MainCommonFilter from "../../../../../Components/MainCommonFilter";

const PlayerRecord = ({ handleOpenModal }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loader, setLoader] = useState(false);
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const gameDetails = useSelector(state => state?.gameReducer?.gameDetails)
    const [filterData, setFilterData] = useState({
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
        statusValue: "Today",
        exportFile: false,
        csvDownload: false,
        search: "",
        filterClose: false,
        exportFileName: 'Export File',
        statusField:"All Game Mode",
        platformName:"All Number Of Player"
    });
    const [dateFilter,setDateFilter] = useState(filterData);
    let prevDateFilter  = React.useRef(dateFilter);

    useEffect(()=>{
        dispatch(getSingleGameDetails({ gameId: id }))
    },[]);

    useEffect(() => {
        if(filterData?.statusValue ==='Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom'  ){
            getPlayerRecordListHandler(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
        } else if (filterData.startDate && filterData.endDate || filterData?.statusValue === 'All Days') {
            getPlayerRecordListHandler(filterData.startDate, filterData.endDate,filterData.search)
        }
    }, [pagination.rowsPerPage, pagination.page,filterData.startDate, filterData.endDate, filterData?.statusField, filterData?.platformName, filterData?.exportFile, filterData?.csvDownload, filterData?.statusValue]);

    const getPlayerRecordListHandler = (startDate, endDate, search) => {
        setLoader(true)
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            gameId: id,
            searchText: search,
            startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
            endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
            noOfPlayer: filterData?.platformName === 'All Number Of Player' ? "" : filterData?.platformName,
            exportFile: filterData?.exportFile,
            csvDownload: filterData?.csvDownload,
            gameModeId:filterData?.statusField === 'All Game Mode' ? "" : gameDetails?.gameModes?.filter(item=> item?.gameModeName === filterData?.statusField)?.[0]?._id,
        }
        Object?.keys(payload).forEach(ele => {
            if (payload[ele] === '' || payload[ele] === null) { delete payload[ele] }
        });
        dispatch(getPlayerRecordList(payload)).then(res => {
            if(pagination?.endRange?.toString() !== '' && pagination?.startRange?.toString() !== '' ){
                clearPaginationAndFilterData(pagination,filterData, setPagination, setFilterData);
            }
            setLoader(false)
            if (res?.data?.data?.filePath) {
                window.open(res?.data?.data?.filePath,"_blank");
            }else{
                setRowData({
                    ...rowData,
                    list: res.data.data?.docs,
                    totalDocs: res.data.data.totalDocs
                })
            }
        })
    };

    const columns = [
        {
            id: 'numberOfDeck',
            label: 'Lobby ID',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{row?.tournamentId?._id}</TableCell>
            }
        },
        {
            id: 'tableId',
            label: 'Table ID',
        },
        {
            id: '',
            label: 'Game </br> Mode',
            twoLineText: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{row?.gameModeId?.gameModeName ?? "-"}</TableCell>
            }
        },
        {
            id: '',
            label: 'Player',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{row?.tournamentId?.noOfPlayer}</TableCell>
            }
        },
        {
            id: '',
            label: 'Entry Fee',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{currencyFormat(row?.tournamentId?.entryfee)}</TableCell>
            }
        },
        // {
        //     id: 'winStatus',
        //     label: 'Status',
        // },
        {
            id: '',
            twoLineText: true,
            label: 'Winning </br> Amount',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{currencyFormat(row?.tdsId?.wininigAmount)}</TableCell>
            }
        },
        {
            id: '',
            label: 'TDS </br> Amount',
            twoLineText: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{currencyFormat(row?.tdsId?.tdsAmount)}</TableCell>
            }
        },
        {
            id: '',
            label: 'Net Credited </br> Amount',
            twoLineText: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{currencyFormat(row?.tdsId?.creditedAmount)}</TableCell>
            }
        },
        {
            id: '',
            label: 'Date & Time',
            twoLineText: true,
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment(row?.createdAt).format('MMM DD YYYY, hh:mm A')}</TableCell>
            }
        },
        {
            id: '',
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell >
                {   gameDetails?.gameName === 'Poker' ?
                    <span className='edit_btn edit-btn-action' onClick={()=>handleOpenModal('PokerViewPlayerRecord', {id: row?.tableId})}> View </span>
                    :
                    <span className='edit_btn edit-btn-action' onClick={()=>handleOpenModal('ViewPlayerRecord', {id: row?.tableId})}> View </span>
                }
            </TableCell>            }
        },
    ];

    useEffect(() => {
        if (filterData.startDate && filterData.endDate && filterData?.statusValue === 'Custom') {
            setPagination({
                ...pagination,
                page: 0
            })
            getPlayerRecordListHandler(filterData.startDate, filterData.endDate)
        }
    }, [filterData.startDate, filterData.endDate]);

    useEffect(() => {
        setPagination({
          rowsPerPage: 10,
          page: 0,
          startRange: "",
          endRange: "",
        })
      }, [filterData?.statusValue,filterData?.platformName])
    
    return (
        <React.Fragment>
            <Box>
                <Paper sx={{ mb: 2 }} className="outer-box">
                    <MainCommonFilter
                        filterData={filterData}
                        setFilterData={setFilterData}
                        searchApiHandler={getPlayerRecordListHandler}
                        pagination={pagination}
                        setPagination={setPagination}
                        addPropsFilter={{ isCreateLobby:true, isGameList:true, userPayment: rowData?.list?.length <= 0, isPending:true, isPlayerRecord:true,isGameModeOption: gameDetails?.isGameModeOption  }}
                        plateFormOption={['All Number Of Player',...gameDetails?.numberOfPlayer?.map(item=> item?.numberOfPlayer)]}
                        //isSearchTooltip={{ isLobbyTab: true }}
                        statusOption={['All Game Mode', ...gameDetails?.gameModes?.map(item=> item?.gameModeName)]}
                        isSearchTooltip={{ isGamePlayerRecord: true }}
                        handleOpenModal={handleOpenModal}
                        totalDocs={rowData?.totalDocs}
                        EnableDeals={false}
                    />
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

        </React.Fragment>
    );
}
export default PlayerRecord