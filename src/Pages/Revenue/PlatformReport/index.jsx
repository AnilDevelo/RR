import React, {useEffect, useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../../Components/TabPanel";
import Box from "@material-ui/core/Box";
import PlatformReportTab from "./PlatformReportTab";
import PlatformDistributionReportTab from "./PlatformDistributionReportTab";
import PlatformEarningReport from "./PlatformEarningReport";
import DepositAndWithdrawalReport from "./WithdrowalAndDeposit"

const MGPWallet = () => {
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
    return(
        <Box sx={{ width: '100%' }} className={'tab'}>
            <Box className={'tab_inner_section'} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} className={'tab_bg_white'} scrollButtons="auto" variant="scrollable">
                    {/* <Tab className={'tab_listing'} label="Platform Report" {...a11yProps(0)} /> */}
                    <Tab className={'tab_listing'} label="Platform Distribution Report" {...a11yProps(0)} />
                    <Tab className={'tab_listing'} label="Platform Earning Report" {...a11yProps(1)} />
                    <Tab className={'tab_listing'} label="Withdrawal and Deposit" {...a11yProps(2)} />
                </Tabs>
            </Box>
            {/* <TabPanel value={value} index={0}>
                <PlatformReportTab/>
            </TabPanel> */}
            <TabPanel value={value} index={0}>
                <PlatformDistributionReportTab/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PlatformEarningReport/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <DepositAndWithdrawalReport/>
            </TabPanel>
        </Box>
    )
}
export default MGPWallet