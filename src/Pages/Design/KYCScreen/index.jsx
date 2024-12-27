import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { a11yProps } from "../../../utils";
import Tabs from "@mui/material/Tabs";
import TabPanel from "../../../Components/TabPanel";
import KYCScreenHeaderIconTab from "./KYCScreenHeaderIconTab";
import KYCScreenIconTab from "./KYCScreenIconTab";



const KYCScreen = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%' }} className={'tab'}>
            <Box className="bg_white tab_inner_section" sx={{ borderBottom: 1, borderColor: 'divider' }} pl={3} >
                <Tabs value={value} onChange={handleChange} className={'tab_bg_white'} scrollButtons="auto" variant="scrollable">
                    <Tab className={'tab_listing'} label="KYC Screen Header" {...a11yProps(0)} />
                    <Tab className={'tab_listing'} label="KYC Screen Icon" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0} >
            <KYCScreenHeaderIconTab/>
            </TabPanel>
            <TabPanel value={value} index={1} >
                <KYCScreenIconTab/>
            </TabPanel>
          
        </Box>
       
    )
}
export default KYCScreen