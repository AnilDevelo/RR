import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {a11yProps} from "../../../utils";
import TabPanel from "../../../Components/TabPanel";
import GameWiseGSTTab from "./GameWiseGSTTab";
import GSTConfigTab from "./GSTConfigTab";
import NewGSTConfigTab from "./NewGSTConfigTab";
import NewGSTHistory from "./NewGSTHistory";
import NewMonthlyGSTHistory from "./NewMonthlyGSTHistory";


const GSTRevenue = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return(
        <>
            <Box sx={{ width: '100%' }} className={'tab'}>
                <Box className="bg_white tab_inner_section" sx={{ borderBottom: 1, borderColor: 'divider' }} pl={3} >
                    <Tabs value={value} onChange={handleChange} className={'tab_bg_white'} scrollButtons="auto" variant="scrollable">
                        {/* <Tab className={'tab_listing'} label="Monthly GST History" {...a11yProps(0)} />
                        <Tab className={'tab_listing'} label="GST Config" {...a11yProps(1)} /> */}
                        <Tab className={'tab_listing'} label="Monthly GST History" {...a11yProps(0)} />
                        {/* <Tab className={'tab_listing'} label="GST Config" {...a11yProps(1)} /> */}
                        <Tab className={'tab_listing'} label="GST History" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                {/* <TabPanel value={value} index={0} >
                  <GameWiseGSTTab/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <GSTConfigTab/>
                </TabPanel> */}
                <TabPanel value={value} index={0}>
                    <NewMonthlyGSTHistory/>
                </TabPanel>
                {/* <TabPanel value={value} index={1}>
                    <NewGSTConfigTab/>
                </TabPanel> */}
                <TabPanel value={value} index={1}>
                    <NewGSTHistory/>
                </TabPanel>
            </Box>
        </>
    )
}
export default GSTRevenue