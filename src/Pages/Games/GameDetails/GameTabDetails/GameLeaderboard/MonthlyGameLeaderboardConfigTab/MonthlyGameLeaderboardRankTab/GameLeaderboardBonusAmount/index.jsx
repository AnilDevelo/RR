import React from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import CustomTable from "../../../../../../../../hoc/CommonTable";
import {ActionFunction, currencyFormat, hideActionFunc} from "../../../../../../../../utils";
import TableCell from "@material-ui/core/TableCell";

const GameLeaderboardBonusAmount = ({handleOpenModal,rowData}) => {
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
                    <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('AddGameLeaderboardBonusAmount', { isEdit:true,row })}>Edit</span>}</TableCell>
            }
        })
    ]

    return(
        <Box className={'monthly-bonus-amount'}>
        <Paper sx={{ mb: 2 }} className="outer-box">
            <div className={'referAndEarn_title d_flex justify_content_between align_items_center'}>
                <h2>Leaderboard Bonus Amount</h2>
                <div className={'admin_user_list'}>
                    {
                        (rowData?.length <= 0)  && hideActionFunc("game") &&
                        <button className={'add_game_btn btn'} onClick={(e) => handleOpenModal('AddGameLeaderboardBonusAmount')}> + Add Monthly Bonus Amount</button>
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
export default GameLeaderboardBonusAmount