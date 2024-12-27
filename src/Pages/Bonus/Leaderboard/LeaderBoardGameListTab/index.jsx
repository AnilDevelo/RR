import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import user from "../../../../assets/images/avatar.png";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../../../Components/TabPanel";
import CurrentMonthWiseGameLeaderboard from "./CurrentMonthWiseGameLeaderboard";
import MonthlyGameWiseLeaderboard from "./MonthlyGameWiseLeaderboard";
import LeaderBoardGameListDropdown from './LeaderBoardGameListDropdown'
import {getLeaderboardGameList} from "../../../../Redux/Bonus/action";

const LeaderBoardGameListTab = () => {
    const dispatch = useDispatch();
    const [gameFilterData, setGameFilterData] = useState([])
    const [gameId, setGameId] = useState('');
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    };

    useEffect(() => {
        dispatch(getLeaderboardGameList()).then(res => {
            setGameFilterData(res.data.data)
        })
    }, []);

    return (
        <Box>
            <div className={'leader_board_game_list_filter'}>
                <LeaderBoardGameListDropdown options={gameFilterData} name={'gameId'}
                                             setFormData={setGameId} formData={gameId} />

            </div>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <Box sx={{ width: '100%' }} className={'setting_tab_section user_details_tab'}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} className={'bg_white_tab'} scrollButtons="auto" variant="scrollable">
                            <Tab className={'tab_listing tab_title'} label="Current Month" {...a11yProps(0)} />
                            <Tab className={'tab_listing tab_title'} label="Previous Month" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                       <CurrentMonthWiseGameLeaderboard setGameId={setGameId} gameId={gameId}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <MonthlyGameWiseLeaderboard setGameId={setGameId} gameId={gameId}/>
                    </TabPanel>
                </Box>
            </Paper>
        </Box>
    )
}
export default LeaderBoardGameListTab