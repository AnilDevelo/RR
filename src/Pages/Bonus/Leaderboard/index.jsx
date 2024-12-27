import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../../Components/TabPanel";
import LeaderBoardGameListTab from "./LeaderBoardGameListTab";

const Leaderboard = () => {
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

    return (
        <Box sx={{ width: '100%' }} className={'tab'}>
            {/*<Box className="bg_white tab_inner_section" sx={{ borderBottom: 1, borderColor: 'divider' }}>*/}
            {/*    <Tabs value={value} onChange={handleChange} className={'tab_bg_white'} scrollButtons="auto" variant="scrollable">*/}
            {/*        <Tab className={'tab_listing'} label="Leaderboard Game List" {...a11yProps(0)} />*/}
            {/*        /!*<Tab className={'tab_listing tab_title'} label="Leaderboard Monthly Config " {...a11yProps(1)} />*!/*/}
            {/*        /!*<Tab className={'tab_listing tab_title'} label="Leaderboard Rank Config" {...a11yProps(2)} />*!/*/}
            {/*    </Tabs>*/}
            {/*</Box>*/}
            {/*<TabPanel value={value} index={0}>*/}
            {/*    <LeaderBoardGameListTab />*/}
            {/*</TabPanel>*/}
            {/*<TabPanel value={value} index={1}>*/}
            {/*    <LeaderBoardBonusTab />*/}
            {/*</TabPanel>*/}
            {/*<TabPanel value={value} index={2}>*/}
            {/*    <LeaderBoardRankConfig/>*/}
            {/*</TabPanel>*/}
            {/*<TabPanel value={value} index={2}>*/}
            {/*    <MonthlyReferAndEarnLeaderboardList/>*/}
            {/*</TabPanel>*/}
            <LeaderBoardGameListTab />
        </Box>
    )
};
export default Leaderboard;