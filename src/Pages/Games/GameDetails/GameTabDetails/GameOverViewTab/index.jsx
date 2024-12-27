import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Loader from "../../../../../images/Loader";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGameOverViewDetails} from "../../../../../Redux/games/action";
import {currencyFormat} from "../../../../../utils";
import TableLoader from "hoc/CommonTable/TableLoader";

const GameOverViewTab = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const gameDetails = useSelector(state => state?.gameReducer?.gameDetails);
    const [rowData, setRowData] = useState({})
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (gameDetails?.publisherId?._id) {
            setLoader(true)
            dispatch(getGameOverViewDetails({ gameId: id, publisherId: gameDetails?.publisherId?._id })).then(res => {
                setRowData(res.data.data)
                setLoader(false)
            })
        }
    }, [gameDetails]);

    return (
        <React.Fragment>
            <Box>
            {/* {loader && <TableLoader />} */}
                <Paper sx={{ mb: 2 }} className="outer-box">
                    <div className={'game_tab_overView'}>
                        <div className={'game_tab_overView_title'}>
                            <h2 className={'fontFamily'}>Analytics Overview</h2>
                            <p className={'fontFamily'}>To activate your analytics for this game, please submit your game build to the app stores</p>
                        </div>
                        <div className={'game_tab_overView_content'}>
                            <div className={'game_tab_details'}>
                                <h3>Daily Active User (DAU)</h3>
                                <p>{rowData?.DailyActiveUsers || 0}</p>
                            </div>
                            <div className={'game_tab_details'}>
                                <h3>Installs</h3>
                                <p>{rowData?.installCount || 0}</p>
                            </div>
                            <div className={'game_tab_details'}>
                                <h3>Monthly Active User (MAU) </h3>
                                <p>{rowData?.MonthlyActiveUsers || 0}</p>
                            </div>
                            <div className={'game_tab_details'}>
                                <h3>Revenue (Total Earnings)</h3>
                                <p>{currencyFormat(rowData?.revenue || 0)}</p>
                            </div>
                        </div>
                    </div>
                </Paper>
            </Box>
        </React.Fragment>
    )
}
export default GameOverViewTab