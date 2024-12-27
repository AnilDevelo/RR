import React  from "react";
import Box from "@mui/material/Box";
import { a11yProps } from "../../../utils";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../../Components/TabPanel";
import DailyWheelBonusTab from "./DailyWheelBonusTab";
import DailyWheelBonusConfigTab from "./DailyWheelBonusConfigTab";


const DailyWheelBonus = () => {
    const [value, setValue] = React.useState(0);
    // tab change fun
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return(
        <Box sx={{ width: '100%' }} className={'tab'}>
            <Box className="bg_white tab_inner_section" sx={{ borderBottom: 1, borderColor: 'divider' }} pl={3} >
                <Tabs value={value} onChange={handleChange} className={'tab_bg_white'} scrollButtons="auto" variant="scrollable">
                    <Tab className={'tab_listing'} label="Daily Spin Bonus" {...a11yProps(0)} />
                    <Tab className={'tab_listing'} label="Daily Spin Bonus Config" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
               <DailyWheelBonusTab value={value}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DailyWheelBonusConfigTab/>
            </TabPanel>
        </Box>
    )
};

export default DailyWheelBonus;