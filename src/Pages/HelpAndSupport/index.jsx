import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../Components/TabPanel";
import AllTicketsList from "./AllTickets";
import Ticket from "./Ticket";
import EmailModule from "./EmailModule";
import CustomerCareTab from "./CustomerCareTab";
import TicketsVideoTab from "./TicketsVideoTab";
import WhatsAppSupportTab from "./WhatsAppSupportTab";
import FAQQuestionTab from "./FAQQuestionTab";

const HelpAndSupport = () => {
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
                    <Tab className={'tab_listing'} label=" All Tickets" {...a11yProps(0)} />
                    <Tab className={'tab_listing'} label="Ticket Type" {...a11yProps(1)} />
                    <Tab className={'tab_listing'} label="Email" {...a11yProps(2)} />
                    <Tab className={'tab_listing'} label="Customer Care" {...a11yProps(3)} />
                    <Tab className={'tab_listing'} label="Help Desk Header Image/Video" {...a11yProps(4)} />
                    <Tab className={'tab_listing'} label="WhatsApp Support" {...a11yProps(5)} />
                    <Tab className={'tab_listing'} label="FAQs" {...a11yProps(6)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <AllTicketsList />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Ticket />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <EmailModule />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <CustomerCareTab />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <TicketsVideoTab/>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <WhatsAppSupportTab/>
            </TabPanel>
            <TabPanel value={value} index={6}>
                <FAQQuestionTab/>
            </TabPanel>
        </Box>
    )
}
export default HelpAndSupport