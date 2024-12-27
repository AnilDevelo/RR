import React, {useEffect, useState} from "react";
import MonthlyBonusAmount from "../../../../../../Bonus/Leaderboard/LeaderBoardRankConfig/MonthlyBonusAmount";
import BonusReleaseDate from "../../../../../../Bonus/Leaderboard/LeaderBoardRankConfig/BonusReleaseDate";
import Paper from "@material-ui/core/Paper";
import {ActionFunction, currencyFormat, hideActionFunc} from "../../../../../../../utils";
import CommonModal from "../../../../../../../hoc/CommonModal";
import CustomTable from "../../../../../../../hoc/CommonTable";
import Loader from "../../../../../../../images/Loader";
import Box from "@material-ui/core/Box";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import TableCell from "@mui/material/TableCell";
import {deleteGameLeaderboardRank, getGameLeaderboardRankGameConfig} from "../../../../../../../Redux/games/action";
import PopComponent from "../../../../../../../hoc/PopContent";
import moment from "moment";
import GameLeaderboardBonusAmount from "./GameLeaderboardBonusAmount";
import GameLeaderboardBonusReleaseDate from "./GameLeaderboardBonusReleaseDate";

const MonthlyGameLeaderboardRankTab = ({ handleOpenModal, rowData }) => {


    const columns = [
        {
            id: '',
            label: 'Date & Time',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment(row?.createdAt).format('MMM DD YYYY, hh:mm A')}</TableCell>
            }
        },
        {
            id: 'rankTitle',
            label: 'Rank Title',
        },
        {
            id: '',
            label: 'Rank Range',
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.startRank} TO {row?.endRank}</TableCell>
            }
        },
        {
            id: 'bonus',
            label: 'Bonus',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.bonus)}</TableCell>
            }

        },
        ActionFunction('bonus', {
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action u_border' onClick={(e) => handleOpenModal('AddMonthlyGameLeaderboardRank', { isEdit: true, row })}>Edit</span>
                    <span className='edit_btn edit-btn-action prTab'
                          onClick={()=> handleOpenModal('DeleteCommonModal', {deleteListApiHandler :  deleteGameLeaderboardRank({leaderboardRankId: row?._id})
                              , title: 'Do you want to delete this data?'})}
                    >Delete</span>
                </TableCell>
            }
        })
    ];


    return (
        <>

            {/*<Box className={'game_leaderboard_config game_leaderboard_monthly_details'}>*/}
            <Box className={'game_leaderboard_config '}>
                <div className={'monthly-refer-earn-details-table'}>
                    <GameLeaderboardBonusAmount handleOpenModal={handleOpenModal} rowData={rowData?.monthlyBonusAmountConfig}  />
                    <GameLeaderboardBonusReleaseDate handleOpenModal={handleOpenModal} rowData={rowData?.monthlyBonusDateConfig}/>
                </div>
                <Paper sx={{ mb: 2 }} className="outer-box">
                    <div className={'d_flex_between'}>
                        <h2>Leaderboard Rank</h2>
                        {
                            hideActionFunc('game') &&
                            <button className={'btn'} onClick={(e) => handleOpenModal('AddMonthlyGameLeaderboardRank')}> + Add Leaderboard Rank</button>
                        }

                    </div>
                    <CustomTable
                        headCells={columns}
                        rowData={rowData?.ranks}
                        totalDocs={0}
                        isAboutWebsite={true}
                    />
                </Paper>

            </Box>
        </>
    )
}
export default MonthlyGameLeaderboardRankTab