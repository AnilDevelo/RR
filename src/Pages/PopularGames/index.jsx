import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { a11yProps } from "../../utils";
import TabPanel from "../../Components/TabPanel";
import UpcomingGames from "./UpcomingGames";
import PopularGamesFirst from "./PopularGameFirstDesign";
import LivegameList from "./LiveGames/index";

const PopularGames = () => {
  const [value, setValue] = React.useState(0);
  // tab change fun
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }} className={"tab"}>
      <Box className="bg_white tab_inner_section" sx={{ borderBottom: 1, borderColor: "divider" }} pl={3}>
        <Tabs value={value} onChange={handleChange} className={"tab_bg_white"} scrollButtons="auto" variant="scrollable">
          <Tab className={"tab_listing"} label="Popular Games First"{...a11yProps(0)}/>
          {/* <Tab className={'tab_listing'} label="Popular Games Second" {...a11yProps(1)} /> */}
          <Tab className={"tab_listing"} label="Upcoming Games"{...a11yProps(1)}/>
          <Tab className={"tab_listing"} label="Live Games" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PopularGamesFirst />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UpcomingGames />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <LivegameList />
      </TabPanel>
    </Box>
  );
};
export default PopularGames;
