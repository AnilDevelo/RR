import React  from "react";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../../hoc/CommonTable";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import {ActionFunction, currencyFormat} from "../../../../../utils";

const MonthlyBonusAmount = ({ handleOpenModal, rowData }) => {
    const columns =[
        {
            id:'maxMonthlyBonusLimit',
            label:'Bonus Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.maxMonthlyBonusLimit)}</TableCell>
            }
        },
        {
            id:'remainingBonusLimit',
            label:'Remaining Bonus Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.maxMonthlyBonusLimit === row?.remainingBonusLimit ? "-" :  currencyFormat(+row?.remainingBonusLimit)}</TableCell>
            }
        },
        {
            id:'depositInto',
            label: 'Bonus Type',
            type: 'custom',
            render: (row) => {
                return <TableCell >
                    {row?.depositInto === 'WinCash' ?  'Winning Cash' : row?.depositInto === 'DepositCash' ? 'Deposit Cash' : row?.depositInto === 'Bonus' && 'Bonus Cash'}
                </TableCell>
            }
        },
        // {
        //     id: 'isDeductTDS',
        //     label: 'Deduct TDS',
        //     type: 'custom',
        //     render: (row) => {
        //         return <TableCell >{row?.isDeductTds ? 'Yes' : 'No' }</TableCell>
        //     }
        // },
        ActionFunction('bonus', {
            id: 'Action',
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell >{
                    <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('AddMonthlyBonusAmount', { isEdit:true,row })}>Edit</span>}</TableCell>
            }
        })
    ]

    return(
        <Box className={'monthly-bonus-amount'}>
            {/*{loader ? <Loader /> : ""}*/}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'d_flex_between'}>
                    <h2>Monthly  Bonus Amount</h2>
                    {
                        (rowData?.length <= 0)  &&
                        <button className={'btn'} onClick={(e) => handleOpenModal('AddMonthlyBonusAmount')}> + Add Monthly Bonus Amount</button>
                    }
                </div>
                <CustomTable
                    headCells={columns}
                    rowData={rowData}
                    isAboutWebsite={true}
                />
            </Paper>
        </Box>
    )
}
export default MonthlyBonusAmount