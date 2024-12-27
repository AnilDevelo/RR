import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { a11yProps } from "../../../utils";
import TabPanel from "../../../Components/TabPanel";
import LogoAndPrivacyPolicy from "./LogoAndPrivacyPolicy";
import FooterIcon from "./FooterIcon";

const LoginScreen = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }} className={"tab"}>
      <Box
        className="bg_white tab_inner_section"
        sx={{ borderBottom: 1, borderColor: "divider" }}
        pl={3}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          className={"tab_bg_white"}
          scrollButtons="auto"
          variant="scrollable"
        >
          <Tab
            className={"tab_listing"}
            label="Logo and Privacy Policy"
            {...a11yProps(0)}
          />
          <Tab
            className={"tab_listing"}
            label="Footer Icon"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <LogoAndPrivacyPolicy />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FooterIcon />
      </TabPanel>
    </Box>
  );
};

export default LoginScreen;
