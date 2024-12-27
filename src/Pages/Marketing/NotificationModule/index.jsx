import React,{ useState } from "react";
import Box from "@mui/material/Box";
import {a11yProps} from "../../../utils";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../../Components/TabPanel";
import UserTypeNotification from "./UserTypeNotification";
import AllTypeNotification from "./AllTypeNotification";


const NotificationModule = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
        <Box sx={{ width: '100%' }} className={'tab'}>
            <Box className="bg_white tab_inner_section" sx={{ borderBottom: 1, borderColor: 'divider' }} pl={3} >
                <Tabs value={value} onChange={handleChange} className={'tab_bg_white'} scrollButtons="auto" variant="scrollable">
                    {/*<Tab className={'tab_listing'} label="Offer" {...a11yProps(0)} />*/}
                    <Tab className={'tab_listing'} label="Notification" {...a11yProps(0)} />
                    <Tab className={'tab_listing'} label="User Notification Type" {...a11yProps(1)} />

                </Tabs>
            </Box>
            {/*<TabPanel value={value} index={0} >*/}
            {/*    <Offer/>*/}
            {/*</TabPanel>*/}
            <TabPanel value={value} index={0}>
                <AllTypeNotification/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <UserTypeNotification/>
            </TabPanel>
        </Box>
    )
}
export default NotificationModule