import { Box, Tab, Tabs } from '@mui/material';
import TabPanel from 'Components/TabPanel';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import GSTUserReport from "./GSTUserReport";
import NewGSTConfigTab from 'Pages/Revenue/GSTRevenue/NewGSTConfigTab';

const GSTModule = () => {
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
        if(localStorage.getItem('GSTConfig')){
            setValue(1);
            setTimeout(()=>{
                localStorage.removeItem('GSTConfig')
            },1000)
        }
    },[localStorage.getItem('GSTConfig')])

    return (
        <Box sx={{ width: '100%' }} className={'tab'}>
            <Box className="bg_white tab_inner_section" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} className={'tab_bg_white'} scrollButtons="auto" variant="scrollable">
                    <Tab className={'tab_listing'} label="GST User Report" {...a11yProps(0)} />
                    <Tab className={'tab_listing'} label="GST Config" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <GSTUserReport/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <NewGSTConfigTab/>
            </TabPanel>
        </Box>
    )
}
export default GSTModule