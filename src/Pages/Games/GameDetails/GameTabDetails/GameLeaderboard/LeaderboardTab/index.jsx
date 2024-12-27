import React, {useState} from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../../../../../Components/TabPanel";
import CurrentMonthLeaderboard from "./CurrentMonthLeaderboard";
import PreviousMonthLeaderboard from "./PreviousMonthLeaderboard";
import Paper from "@mui/material/Paper";

const LeaderboardTab = () => {
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
        <div  className={'leaderboard_section_game'}>
        <Box sx={{ width: '100%' }} className={'tab'}>
            {/*<div className={'game_leaderboard_monthly_details'}>*/}

            {/*</div>*/}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <Box className={'tab_inner_section'} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} className={'tab_bg_white'} scrollButtons="auto" variant="scrollable">
                        <Tab className={'tab_listing tab_title'} label="Current Month" {...a11yProps(0)} />
                        <Tab className={'tab_listing tab_title'} label="Previous Month" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <CurrentMonthLeaderboard />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <PreviousMonthLeaderboard/>
                </TabPanel>
            </Paper>

            </Box>
            </div>
    )
}
export default LeaderboardTab