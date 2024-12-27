import TableCell from "@mui/material/TableCell";
import {ActionFunction, currencyFormat} from "../../../../../utils";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../../hoc/CommonTable";
import React from "react";

const MonthlyBonusAmount = ({handleOpenModal,rowData}) => {
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
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'referAndEarn_title'}>
                    <h2>Monthly  Bonus Amount</h2>
                    <div className={'admin_user_list'}>
                        {
                            (rowData?.length <= 0)  &&
                            <button className={'add_game_btn'} onClick={(e) => handleOpenModal('AddLeaderboardMonthlyBonusAmount')}> + Add Monthly Bonus Amount</button>
                        }

                    </div>
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