import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../../Components/TabPanel";
import PayerTab from "./PayerTab";
import PayeeTab from "./PayeeTab";
import ChallanTab from "./ChallanTab";
import PrepareTDSReturnTab from "./SandboxTDSFilling/PrepareTDSReturnTab";
import EFileTDSReturnTab from "./SandboxTDSFilling/EFileTDSReturnTab";
import SandboxTDSForm16A from "./SandboxTDSFilling/SandboxTDSForm16A";
import UserWiseForm16ADistribution from "./SandboxTDSFilling/UserWiseForm16ADistribution";



const TDSFile = () => {
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


    return (
        <Box sx={{ width: '100%' }} className={'tab'}>
            <Box className="bg_white tab_inner_section" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} className={'tab_bg_white'} scrollButtons="auto" variant="scrollable">
                    <Tab className={'tab_listing'} label="Payer" {...a11yProps(0)} />
                    <Tab className={'tab_listing'} label="Payee" {...a11yProps(1)} />
                    <Tab className={'tab_listing'} label="Challan" {...a11yProps(2)} />
                    <Tab className={'tab_listing'} label="Sandbox Prepare TDS Return" {...a11yProps(3)} />
                    <Tab className={'tab_listing'} label="Sandbox E-File TDS Return" {...a11yProps(4)} />
                    <Tab className={'tab_listing'} label="Sandbox TDS Form 16A" {...a11yProps(5)} />
                    <Tab className={'tab_listing'} label="Distribution User Wise Form 16A" {...a11yProps(6)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <PayerTab/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PayeeTab/>
            </TabPanel>
            <TabPanel value={value} index={2}>
               <ChallanTab/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <PrepareTDSReturnTab/>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <EFileTDSReturnTab/>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <SandboxTDSForm16A/>
            </TabPanel>
            <TabPanel value={value} index={6}>
               <UserWiseForm16ADistribution/>
            </TabPanel>
        </Box>
    )
}
export default TDSFile