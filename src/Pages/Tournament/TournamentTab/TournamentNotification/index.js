import React,{ useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Notification from "./Notification";
import TabPanel from "Components/TabPanel";
import { a11yProps } from "utils";


const TournamentNotification = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
        <Box sx={{ width: '100%' }} className={'tab'}>
            <Box className="bg_white tab_inner_section" sx={{ borderBottom: 1, borderColor: 'divider' }} pl={3} >
                <Tabs value={value} onChange={handleChange} className={'tab_bg_white'} scrollButtons="auto" variant="scrollable">
                    <Tab className={'tab_listing'} label="Notification" {...a11yProps(0)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Notification/>
            </TabPanel>
           
        </Box>
    )
}
export default TournamentNotification