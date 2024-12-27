import React, {useState} from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../../../Components/TabPanel";
import CurrentMonthLeaderboard from "./CurrentMonthLeaderboard";
import PreviousMonthLeaderBoard from "./PreviousMonthLeaderBoard";
import Paper from "@mui/material/Paper";

const MonthlyReferAndEarnLeaderboardList = () => {
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
    return(
        <Paper sx={{ mb: 2 }} className="outer-box">
        <Box sx={{ width: '100%' }} className={'setting_tab_section user_details_tab'}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} className={'bg_white_tab'} scrollButtons="auto" variant="scrollable">
                    <Tab className={'tab_listing tab_title'} label="Current Month" {...a11yProps(0)} />
                    <Tab className={'tab_listing tab_title'} label="Previous Month" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
               <CurrentMonthLeaderboard/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PreviousMonthLeaderBoard/>
            </TabPanel>
        </Box>
        </Paper>
    )
}
export default MonthlyReferAndEarnLeaderboardList