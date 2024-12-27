import TableCell from "@mui/material/TableCell";
import {ActionFunction, hideActionFunc} from "../../../../../../../../utils";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../../../../../hoc/CommonTable";
import React from "react";

const GameLeaderboardBonusReleaseDate = ({handleOpenModal,rowData}) => {
    const columns =[
        {
            id:'bonusReleaseDate',
            label:'Release Date',
            type: 'custom',
            render: (row) => {
                return <TableCell >
                    { row?.date ? ` ${row?.date}` : ''}
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
                    <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('AddGameLeaderboardBonusReleaseDate', { isEdit:true,row })}>Edit</span>}</TableCell>
            }
        })
    ]
    return(
        <Box className={'monthly-bonus-release-date '}>
            {/*{loader ? <Loader /> : ""}*/}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'d_flex_between'}>
                    <h2>Leaderboard  Bonus Release Date</h2>
                    {
                        (rowData?.length <= 0 && hideActionFunc('game'))  &&
                        <button className={'btn'} onClick={(e) => handleOpenModal('AddGameLeaderboardBonusReleaseDate')}>  + Add Leaderboard Release Date</button>
                    }
                </div>
                <CustomTable
                    headCells={columns}
                    rowData={rowData || []}
                    isAboutWebsite={true}
                />
            </Paper>
        </Box>
    )
}
export default GameLeaderboardBonusReleaseDate