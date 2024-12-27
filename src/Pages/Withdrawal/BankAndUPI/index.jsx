import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { a11yProps } from "../../../utils";
import TabPanel from "../../../Components/TabPanel";
import BankWithdrawal from "./BankWithdrawal";
import WithdrawalUPI from "./WithdrawalUPI";

const BankAndUPI = () => {
    const [value, setValue] = useState(0);
    // tab change fun
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }} className={'tab'}>
            <Box className="bg_white tab_inner_section" sx={{ borderBottom: 1, borderColor: 'divider' }} pl={3} >
                <Tabs value={value} onChange={handleChange} className={'tab_bg_white'} scrollButtons="auto" variant="scrollable">
                    <Tab className={'tab_listing'} label="Bank" {...a11yProps(0)} />
                    <Tab className={'tab_listing'} label="UPI" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0} >
                <BankWithdrawal />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <WithdrawalUPI />
            </TabPanel>

        </Box>
    );
}
export default BankAndUPI