import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../../Components/TabPanel";
import ReferAndEarnTab from "./ReferAndEarnTab";
import ReferAndEarnMonthlyTab from "./ReferAndEarnMonthlyTab";
import ReferAndEarnConfig from "./ReferAndEarnTab/ReferAndEarnConfig";
import ReferAndEarnMonthlyConfig from "./ReferAndEarnMonthlyConfig";
import {getFlagConfig} from "../../../Redux/settings/action";
import {useDispatch, useSelector} from "react-redux";
import MonthlyReferAndEarnLeaderboardList from "../Leaderboard/MonthlyReferAndEarnLeaderboardList";
import ReferAndEarnShareConfig from "./ReferAndEarnShareConfig";

const ReferAndEarn = () => {
    const dispatch = useDispatch()
    const settingFlag = useSelector(state => state?.settingReducer?.flagList)
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

    useEffect(()=>{
        dispatch(getFlagConfig({}))
    },[])

    return (
        <Box sx={{ width: '100%' }} className={'tab'}>
            <Box className={'tab_inner_section'} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} className={'tab_bg_white'} scrollButtons="auto" variant="scrollable">
                    <Tab className={'tab_listing'} label="Refer & Earn" {...a11yProps(0)} />
                    <Tab className={'tab_listing'} label="Refer & Earn Config" {...a11yProps(1)} />
                    <Tab className={'tab_listing'} label="Refer & Earn Share Config" {...a11yProps(2)} />
                    { settingFlag?.isMonthlyReferAndEarnBonus && <Tab className={'tab_listing'} label=" Monthly Refer & Earn Bonus Config" {...a11yProps(3)} />}
                    {settingFlag?.isMonthlyReferAndEarnBonus && <Tab className={'tab_listing'} label=" Monthly Refer & Earn Point Config" {...a11yProps(4)} />}
                    {settingFlag?.isMonthlyReferAndEarnBonus && <Tab className={'tab_listing'} label=" Monthly Refer & Earn Leaderboard List" {...a11yProps(5)} />}
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ReferAndEarnTab />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ReferAndEarnConfig/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ReferAndEarnShareConfig/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <ReferAndEarnMonthlyTab />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <ReferAndEarnMonthlyConfig/>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <MonthlyReferAndEarnLeaderboardList/>
            </TabPanel>
        </Box>
    )
}
export default ReferAndEarn