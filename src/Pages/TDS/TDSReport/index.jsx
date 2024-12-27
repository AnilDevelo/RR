import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../../Components/TabPanel";
import TDSConfig from "./TDSConfig";
import TDSUserReport from "./TDSUserReport";
import Paper from "@mui/material/Paper";
import {currencyFormat} from "../../../utils";
import AllGameTDSReportTab from "./AllGameTDSReportTab";
import TDSFAQsTab from "./TDSFAQsTab";


const TDSModule = () => {
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
        if(localStorage.getItem('TDSConfig')){
            setValue(1);
            setTimeout(()=>{
                localStorage.removeItem('TDSConfig')
            },1000)
        }
    },[localStorage.getItem('TDSConfig')])

    return (
        <Box sx={{ width: '100%' }} className={'tab'}>
            <Box className="bg_white tab_inner_section" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} className={'tab_bg_white'} scrollButtons="auto" variant="scrollable">
                    {/* <Tab className={'tab_listing'} label="TDS Game Report" {...a11yProps(0)} /> */}
                    <Tab className={'tab_listing'} label="TDS Config" {...a11yProps(0)} />
                    <Tab className={'tab_listing'} label="TDS User Report" {...a11yProps(1)} />
                    <Tab className={'tab_listing'} label="TDS FAQs" {...a11yProps(2)} />
                </Tabs>
            </Box>
            {/* <TabPanel value={value} index={0}>
               <AllGameTDSReportTab/>
            </TabPanel> */}
            <TabPanel value={value} index={0}>
                <TDSConfig/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TDSUserReport/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TDSFAQsTab/>
            </TabPanel>

        </Box>
    )
}
export default TDSModule