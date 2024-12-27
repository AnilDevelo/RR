import React,{ useState } from "react";
import Box from "@mui/material/Box";
import {a11yProps} from "../../../utils";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../../Components/TabPanel";
import ReportedUsers from "./ReportedUsers";
import ReportConfig from "./ReportConfig";


const ReportedUser = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
        <Box sx={{ width: '100%' }} className={'tab'}>
            <Box className="bg_white tab_inner_section" sx={{ borderBottom: 1, borderColor: 'divider' }} pl={3} >
                <Tabs value={value} onChange={handleChange} className={'tab_bg_white'} scrollButtons="auto" variant="scrollable">
                    <Tab className={'tab_listing'} label="Reported Users" {...a11yProps(0)} />
                    <Tab className={'tab_listing'} label="Report Type" {...a11yProps(1)} />

                </Tabs>
            </Box>
            {/*<TabPanel value={value} index={0} >*/}
            {/*    <Offer/>*/}
            {/*</TabPanel>*/}
            <TabPanel value={value} index={0}>
                <ReportedUsers/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ReportConfig/>
            </TabPanel>
        </Box>
    )
}
export default ReportedUser