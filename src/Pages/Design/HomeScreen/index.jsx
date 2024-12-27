import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { a11yProps } from "../../../utils";
import Tabs from "@mui/material/Tabs";
import TabPanel from "../../../Components/TabPanel";
import HomeScreenLogo from "./HomeScreenLogo";
import HomeScreenFooterIcon from "./HomeScreenFooterIcon";



const HomeScreen = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%' }} className={'tab'}>
            <Box className="bg_white tab_inner_section" sx={{ borderBottom: 1, borderColor: 'divider' }} pl={3} >
                <Tabs value={value} onChange={handleChange} className={'tab_bg_white'} scrollButtons="auto" variant="scrollable">
                    <Tab className={'tab_listing'} label="Home Screen Logo" {...a11yProps(0)} />
                    <Tab className={'tab_listing'} label="Home Screen Footer Icon" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0} >
                <HomeScreenLogo />
            </TabPanel>
            <TabPanel value={value} index={1} >
                <HomeScreenFooterIcon />
            </TabPanel>
          
        </Box>
       
    )
}
export default HomeScreen