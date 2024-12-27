import React, {useState} from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../Components/TabPanel";
import TopGameList from "./TopGameList";
import HeaderSlider from "./HeaderSlider";
import WinnerList from "./WinnerList";
import About from "./About";
import SocialLink from "./SocialLink";
import Footer from "./Footer";
import DownloadList from "./DownloadList";

const Website = () => {
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
                    <Tab className={'tab_listing'} label=" Games" {...a11yProps(0)} />
                    <Tab className={'tab_listing'} label="Header Slider" {...a11yProps(1)} />
                    <Tab className={'tab_listing'} label="Winner" {...a11yProps(2)} />
                    <Tab className={'tab_listing'} label="About" {...a11yProps(3)} />
                    <Tab className={'tab_listing'} label="Social Media" {...a11yProps(4)} />
                    <Tab className={'tab_listing'} label="Footer" {...a11yProps(4)} />
                    <Tab className={'tab_listing'} label="Download List" {...a11yProps(5)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
             <TopGameList/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <HeaderSlider/>
            </TabPanel>
            <TabPanel value={value} index={2}>
               <WinnerList/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <About/>
            </TabPanel>
            <TabPanel value={value} index={4}>
               <SocialLink/>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <Footer/>
            </TabPanel>
            <TabPanel value={value} index={6}>
                <DownloadList/>
            </TabPanel>
        </Box>
    )
}
export default Website