import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { a11yProps } from "../../../utils";
import Tabs from "@mui/material/Tabs";
import TabPanel from "../../../Components/TabPanel";
import ReferAndEarnTitle from "./ReferAndEarnTitle";
import ReferAndEarnSteps from "./ReferAndEarnSteps";
const ReferAndEarnDesign = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
  return (
    <Box sx={{ width: '100%' }} className={'tab'}>
            <Box className="bg_white tab_inner_section" sx={{ borderBottom: 1, borderColor: 'divider' }} pl={3} >
                <Tabs value={value} onChange={handleChange} className={'tab_bg_white'} scrollButtons="auto" variant="scrollable">
                    <Tab className={'tab_listing'} label="Refer And Earn Title" {...a11yProps(0)} />
                    <Tab className={'tab_listing'} label="Refer And Earn Steps" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0} >
                <ReferAndEarnTitle />
            </TabPanel>
            <TabPanel value={value} index={1} >
                <ReferAndEarnSteps />
            </TabPanel>
          
        </Box>
  )
}

export default ReferAndEarnDesign