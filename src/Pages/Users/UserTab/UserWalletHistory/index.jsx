import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import CustomTable from '../../../../hoc/CommonTable';
import { userDetailTransactions } from '../../../../Redux/user/action';
import TableCell from "@mui/material/TableCell";
import moment from "moment";
import Loader from "../../../../images/Loader";
import MainCommonFilter from "../../../../Components/MainCommonFilter";
import { currencyFormat, renderSrNo } from "../../../../utils";
import { Box } from '@mui/material';


const UserTransition = ({ handleOpenModal }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loader, setLoader] = useState(false)
    const [filterData, setFilterData] = useState({
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
        statusValue: "Today",
        exportFile: false,
        csvDownload: false,
        search: "",
        exportFileName: 'Export File'
    })
    const [pagination, setPagination] = useState({
        rowsPerPage: 10,
        page: 0, startRange: '' , endRange: ''
    })
    const [userTransactions, setUserTransactions] = useState({
        limit: 5,
        totalDocs: 0,
        list: []
    })
    const [dateFilter,setDateFilter] = useState(filterData);
    let prevDateFilter = React.useRef(dateFilter);
    
    const columns = [
        {
            id: "",
            twoLineText: true,
            label: "Sr. no.",
            type: "custom",
            render: (row, i) => renderSrNo(row, i, pagination),
          },
        {
            id: 'date',
            numeric: true,
            twoLineText: true,
            disablePadding: true,
            label: 'Date & Time',
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment(row?.createdAt).format('MMM DD YYYY, hh:mm A')}</TableCell>
            }
        },
        {
            id: 'title',
            numeric: true,
            disablePadding: false,
            label: 'Title',
        },
        {
            id: 'totalPreviousCash',
            label: 'Previous Amount',
            type: 'custom',
            render: (row) => {
                let temp = row?.previousBonus + row?.previousCash + row?.previousWinCash
                return <TableCell>{currencyFormat(temp)} </TableCell>
            }
        },
        {
            id: 'amount',
            disablePadding: false,
            label: 'Amount',
            type: 'custom',
            render: (row) => {
                let amountStyle = row?.transactionType === 'credited' ? 'Credited' : 'debited'
                return <TableCell className={(amountStyle)  === 'Credited' ? 'successFiled' : 'errorFiled'} > {currencyFormat(+row?.amount, amountStyle)}</TableCell>
            }
        },
        {
            id: 'totalCurrentWinCash',
            disablePadding: false,
            label: 'Current Amount',
            type: 'custom',
            render: (row) => {
                let temp = row?.currentBonus + row?.currentCash + row?.currentWinCash;
                return <TableCell>{currencyFormat(temp)}</TableCell>
            }
        },
        {
            id: 'description',
            numeric: true,
            disablePadding: false,
            label: 'Credited/Debited',
            type: 'custom',
            render: (row) => {
                return <TableCell >{ row?.description ?
                    <ul className={'wallet_history_ul'}>
                        {
                            row?.description?.split(' ')?.reduce((acc,cur)=>{
                                return [...acc, +cur ? `${+Number(cur).toFixed(2)}` : cur ]
                            },[]).join().replaceAll(',', ' ')?.split('and')?.map(item=>{
                                return <li>{item}</li>
                            })
                        }
                    </ul>

                    : ''}</TableCell>
            }
        },
        {
            id: 'status',
            disablePadding: false,
            label: 'Status',
            type: 'custom',
            render: (row) => {
                return <TableCell ><span className={'status_field'}>{row?.status}</span></TableCell>
            }
        },
        {
            id: '',
            disablePadding: false,
            label: 'Table Id',
            type: 'custom',
            render: (row) => {
                return <TableCell ><span className={'status_field'}>{row?.tableId ? row?.tableId : "-"}</span></TableCell>
            }
        },
        {
            id: 'gameName',
            numeric: true,
            disablePadding: false,
            label: 'Game Name',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{row?.gameName ? row?.gameName : '-'}</TableCell>
            }
        },
        {
            id: 'Action',
            label: 'Action',
            disablePadding: false,
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                let temp = [];
                temp.push(row)
                return <TableCell ><span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('ViewTransitionHistory', temp)}> View </span></TableCell>
            }
        }
    ];

    useEffect(() => {
        if(filterData?.statusValue ==='Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom'  ){
            getTransitionList(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
        }
        else if (filterData.startDate && filterData.endDate || filterData?.statusValue === 'All Days') {
            getTransitionList(filterData.startDate, filterData.endDate)
        }
    }, [pagination.rowsPerPage, pagination.page, filterData.exportFile, filterData.csvDownload, filterData.statusValue]);

    useEffect(() => {
        if (filterData.startDate && filterData.endDate && filterData?.statusValue === 'Custom') {
            setPagination({
                ...pagination,
                page: 0
            })
             getTransitionList(filterData.startDate, filterData.endDate)
        }
    }, [filterData.startDate, filterData.endDate]);

    useEffect(() => {
        if (filterData?.statusValue === 'Custom') {
            getTransitionList(filterData.startDate, filterData.endDate)
        }
    }, [filterData.statusValue]);

    const getTransitionList = (startDate, endDate, search) => {
        let payload = {
            limit: pagination?.endRange ?  pagination?.endRange : pagination.rowsPerPage  ,
            start: +pagination?.startRange ? +pagination?.startRange :   ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            searchText: search,
            startDate:
                startDate ? moment(startDate).format("YYYY-MM-DD") : null,
            endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
            exportFile: filterData?.exportFile,
            csvDownload: filterData?.csvDownload,
            userId: id
        }
        setLoader(true)
        dispatch(userDetailTransactions(payload)).then(res => {
            if (res.data.success) {
                setLoader(false)
                if(pagination?.endRange?.toString() !== '' && pagination?.startRange?.toString() !== '' ){
                    setPagination({
                        ...pagination,
                        startRange:'',
                        endRange: '',
                        rowsPerPage: 10,
                        page:0
                    })
                    setFilterData({
                        ...filterData,
                        csvDownload: false,
                        exportFile: false,
                        exportFileName: 'Export File'
                    })
                }
                if (res?.data?.data?.filePath) {
                    setFilterData({ ...filterData, csvDownload: false, exportFile: false })
                    window.open(res?.data?.data?.filePath,"_blank");
                } else {
                    let payload = res.data.data
                    setUserTransactions({
                        ...userTransactions,
                        totalDocs: payload.totalDocs,
                        list: payload.docs
                    })
                }

            }
        })
    }

    useEffect(() => {
        setPagination({
          rowsPerPage: 10,
          page: 0,
          startRange: "",
          endRange: "",
        })
      }, [filterData?.statusValue])
    
    return (
        <>
          <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper className="outer-box">
                <MainCommonFilter
                    filterData={filterData}
                    addPropsFilter={{userTransactions: userTransactions?.list?.length,  isTransactions: true ,userPayment: userTransactions?.list?.length <= 0,}}
                    setFilterData={setFilterData}
                    searchApiHandler={getTransitionList}
                    pagination={pagination}
                    setPagination={setPagination}
                    handleOpenModal={handleOpenModal}
                    totalDocs={userTransactions?.totalDocs}
                />
                <CustomTable
                    headCells={columns}
                    rowData={userTransactions?.list}
                    totalDocs={userTransactions?.totalDocs}
                    pagination={pagination}
                    setPagination={setPagination}
                    loading={loader}
                />
                </Paper>
            </Box>
        </>
    )
}


export default UserTransition