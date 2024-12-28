import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import moment from "moment";
import CustomTable from "hoc/CommonTable";

const DepositTransactionsHistory = () => {
    const [loader, setLoader] = useState(false);
    const [transactionList, setTransactionList] = useState({
        list: [
            {
                id: 1,
                transactionId: "TXN001",
                userName: "John Doe",
                amount: "$500",
                depositDate: "2024-12-01",
                paymentMethod: "Bank Transfer",
                status: "Completed",
            },
            {
                id: 2,
                transactionId: "TXN002",
                userName: "Jane Smith",
                amount: "$1000",
                depositDate: "2024-12-02",
                paymentMethod: "Credit Card",
                status: "Pending",
            },
        ],
        totalDocs: 2,
    });
    const [pagination, setPagination] = useState({
        rowsPerPage: 10,
        page: 0,
    });

    const getTransactionListData = () => {
        setLoader(true);
        // Simulate data fetching delay
        setTimeout(() => {
            setLoader(false);
        }, 500);
    };

    useEffect(() => {
        getTransactionListData();
    }, [pagination.rowsPerPage, pagination.page]);

    const columns = [
        {
            id: "transactionId",
            numeric: false,
            disablePadding: false,
            label: "Transaction ID",
        },
        {
            id: "userName",
            numeric: false,
            disablePadding: false,
            label: "User Name",
        },
        {
            id: "amount",
            numeric: false,
            disablePadding: false,
            label: "Amount",
        },
        {
            id: "depositDate",
            numeric: false,
            disablePadding: false,
            label: "Deposit Date",
            render: (row) => <TableCell>{moment(row.depositDate).format("YYYY-MM-DD")}</TableCell>,
        },
        {
            id: "paymentMethod",
            numeric: false,
            disablePadding: false,
            label: "Payment Method",
        },
        {
            id: "status",
            numeric: false,
            disablePadding: false,
            label: "Status",
        },
    ];

    return (
        <Box>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className="d_flex justify_content_between">
                    <h2>Deposit Transactions ({transactionList?.list.length})</h2>
                </div>
                <CustomTable
                    headCells={columns}
                    rowData={transactionList?.list}
                    totalDocs={transactionList?.totalDocs}
                    pagination={pagination}
                    setPagination={setPagination}
                    loading={loader}
                />
            </Paper>
        </Box>
    );
};

export default DepositTransactionsHistory;
