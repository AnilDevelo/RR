import React, {useEffect, useState} from "react";
import CustomTable from "../../../../../hoc/CommonTable";
import Box from "@mui/material/Box";
import { getTDSUserWiseViewGameReportList } from "../../../../../Redux/TDSReport/action";
import TableCell from "@mui/material/TableCell";
import {currencyFormat} from "../../../../../utils";
import {useDispatch} from "react-redux";
import user from "../../../../../assets/images/avatar.png";
import Loader from "../../../../../images/Loader";
import moment from "moment";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: '32px 0',
    borderRadius: "5px",
};

const ViewUserTDSReport = ({ modalValue, handleOpenModal }) => {
    const dispatch = useDispatch();
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [loader, setLoader] = useState(false);

    const columns = [
        
        {
            id: 'withdrawalAmount',
            label: 'Withdrawal Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.withdrawalAmount)}</TableCell>
            }
        },
        {
            id: 'taxableNetWinnings',
            label: 'Taxable Net winnings',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.taxableNetWinnings)}</TableCell>
            }
        },
        {
            id: 'tdsPercentage',
            label: 'TDS Percentage',
            type: 'custom',
            render: (row) => {
                return <TableCell >{+row?.tdsPercentage}%</TableCell>
            }
        },
        {
            id: 'totalTDSAmount',
            label: 'TDS Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.tdsAmount)}</TableCell>
            }
        },
        {
            id: 'creditedAmount',
            label: 'Credited Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.creditedAmount)}</TableCell>
            }
        },
        {
            id: "status",
            disablePadding: false,
            label: "Status",
            type: "custom",
            render: (row) => {
              return (
                <TableCell>
                  <span
                    className={
                      row?.status === "processed"
                        ? "green_filed"
                        : row?.status === "processing"
                        ? "yellow_field"
                        : row?.status === "reversed"
                        ? "red_filed"
                        : "status_field"
                    }
                  >
                    {row?.status}
                  </span>
                </TableCell>
              );
            },
          },
          {
            id: 'createdAt',
            label: 'Create Date & Time ',
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment(row?.createdAt).format('MMM DD YYYY, hh:mm A')}</TableCell>
            }
        },
    ];

    useEffect(() => {
        getTDSUserWiseViewGameReportDetails();
    }, [pagination.rowsPerPage, pagination.page]);

    const getTDSUserWiseViewGameReportDetails = () => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            userId: modalValue?.userId
        };
        setLoader(true)
        dispatch(getTDSUserWiseViewGameReportList(payload)).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                list: res?.data?.data?.docs,
                totalDocs: res?.data?.data?.totalDocs || 0
            })
        });
    };

    return(
        <Box sx={style}>
            <p className={'custom_close_btn'} onClick={()=>handleOpenModal()}>
                <svg viewBox="0 0 24 24" x="1008" y="432" fit="" height="28" width="25"
                     preserveAspectRatio="xMidYMid meet" focusable="false">
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                        fill="#64748b" />
                </svg>
            </p>
            {/* {loader ? <Loader /> : ""} */}
            <div className={'OverView_pagination'}>
            <CustomTable
                headCells={columns}
                rowData={rowData?.list}
                totalDocs={rowData?.totalDocs}
                pagination={pagination}
                    setPagination={setPagination}
                    loading={loader}
            />
            </div>
        </Box>
    )
}
export default ViewUserTDSReport