import Paper from "@mui/material/Paper";
import CustomTable from "../../../../../hoc/CommonTable";
import Box from "@mui/material/Box";
import React from "react";
import TableCell from "@mui/material/TableCell";
import {ActionFunction} from "../../../../../utils";

const BonusReleaseDate = ({handleOpenModal,rowData}) => {

    const columns =[
        {
            id:'bonusReleaseDate',
            label:'Release Date',
            type: 'custom',
            render: (row) => {
                return <TableCell >
                    { row?.bonusReleaseDate ? ` ${row?.bonusReleaseDate}` : ''}
                    {/*{ row?.bonusReleaseDate ? ` ${moment().format('MMM')} ${row?.bonusReleaseDate} ${moment().format('YYYY')}` : ''}*/}
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
                    <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('AddBonusReleaseDate', { isEdit:true,row })}>Edit</span>}</TableCell>
            }
        })
    ];

    return(
        <Box className={'monthly-bonus-release-date'}>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'referAndEarn_title'}>
                    <h2>Monthly  Bonus Release Date</h2>
                    <div className={'admin_user_list'}>
                        {
                            (rowData?.length <= 0)  &&
                            <button className={'add_game_btn'} onClick={(e) => handleOpenModal('AddBonusReleaseLeaderboardDate')}> + Add Monthly Release Date</button>
                        }
                    </div>
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
export default BonusReleaseDate