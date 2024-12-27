import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import {a11yProps, ActionFunction, currencyFormat, hideActionFunc} from "../../../utils";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import {useDispatch} from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import {
    deleteWithdrawalProcessingFees,
    getWithdrawalProcessingFees
} from "../../../Redux/Master/action";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../../Components/TabPanel";
import WithdrawalProcessingFeesTab from "./WithdrawalProcessingFeesTab";
import WithdrawalProcessingFeesReportTab from "./WithdrawalProcessingFeesReportTab";


const WithdrawalProcessingFees = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
   return(
       <>
           <Box sx={{ width: '100%' }} className={'tab'}>
               <Box className="bg_white tab_inner_section" sx={{ borderBottom: 1, borderColor: 'divider' }} pl={3} >
                   <Tabs value={value} onChange={handleChange} className={'tab_bg_white'} scrollButtons="auto" variant="scrollable">
                       <Tab className={'tab_listing'} label="Withdrawal Processing Fee" {...a11yProps(0)} />
                       <Tab className={'tab_listing'} label="Withdrawal Processing Fee Report" {...a11yProps(1)} />
                   </Tabs>
               </Box>
               <TabPanel value={value} index={0} >
                  <WithdrawalProcessingFeesTab/>
               </TabPanel>
               <TabPanel value={value} index={1}>
                   <WithdrawalProcessingFeesReportTab/>
               </TabPanel>
           </Box>
       </>
   )
}
export default WithdrawalProcessingFees