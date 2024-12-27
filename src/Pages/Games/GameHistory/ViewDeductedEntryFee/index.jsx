import React, {useState} from "react";
import TableCell from "@mui/material/TableCell";
import {currencyFormat} from "../../../../utils";
import Box from "@material-ui/core/Box";
import CustomTable from "../../../../hoc/CommonTable";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 975,
    bgcolor: 'white',
    boxShadow: 24,
    padding: '32px 0',
    borderRadius: "5px",
};

const ViewDeductedEntryFee = ({ modalValue, handleOpenModal }) => {
    const [pagination, setPagination] = useState({
        rowsPerPage: 10,
        page: 0
    });

    const columns = [
        {
            id: 'amount',
            numeric: true,
            disablePadding: false,
            label: 'Amount',
            type: 'custom',

            render: (row) => {
                return <TableCell >{currencyFormat(+row?.amount)}</TableCell>
            }
        },
        {
            id: 'decudtedWinFees',
            numeric: true,
            disablePadding: false,
            label: 'Deducted Win Fees',
            type: 'custom',

            render: (row) => {
                return <TableCell >{currencyFormat(+row?.extraField?.decudtedWinFees)}</TableCell>
            }
        },
        {
            id: 'deductedBonus',
            numeric: true,
            disablePadding: true,
            label: 'Deducted Bonus',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.extraField?.deductedBonus)}</TableCell>
            }
        },
        {
            id: 'deductedCashFees',
            numeric: true,
            disablePadding: false,
            label: 'Deducted Cash Fees',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.extraField?.deductedCashFees)}</TableCell>
            }
        },
    ];

    return (
        <Box sx={style} >
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
                    rowData={modalValue}
                    totalDocs={modalValue?.length}
                    pagination={pagination}
                    setPagination={setPagination}
                    isSystemTotal={true}
                />
            </div>
        </Box>
    )
}
export default ViewDeductedEntryFee