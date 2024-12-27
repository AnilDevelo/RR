import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../../Components/TabPanel";
import UserKYCListTab from "./UserKYCList";
import UserKYCRequest from "./UserKYCRequest";
import {getFlagConfig} from "../../../Redux/settings/action";
import {useDispatch, useSelector} from "react-redux";

const UserKYC = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState(0);
    const settingFlag = useSelector(state => state?.settingReducer?.flagList)
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
        dispatch(getFlagConfig({}))
    },[])


    return(
        <Box sx={{ width: '100%' }} className={'tab'}>
                <Box className="bg_white tab_inner_section" sx={{ borderBottom: 1, borderColor: 'divider' }} pl={3} >
                <Tabs value={value} onChange={handleChange} className={'tab_bg_white'} scrollButtons="auto" variant="scrollable">
                    <Tab className={'tab_listing'} label="User KYC List" {...a11yProps(0)} />
                        {settingFlag?.isKycUpdateRequest && <Tab className={'tab_listing'} label="Update User KYC Request" {...a11yProps(1)} />}
                </Tabs>
            </Box>
            <TabPanel value={value} index={0} >
                <UserKYCListTab/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <UserKYCRequest/>
            </TabPanel>
        </Box>
    )
}
export default UserKYC;