import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { a11yProps } from "../../../utils";
import Tabs from "@mui/material/Tabs";
import TabPanel from "../../../Components/TabPanel";
import LegalPolicy from "./LegalPolicy";
import PrivacyPolicyPolicy from "./PrivacyPolicy";
import TermsAndConditionsPolicy from "./TermsAndConditionsPolicy";
import FairPlayPolicy from "./FairPlayPolicy";
import ReferAndEarnRules from "./ReferAndEarnRules";
import RefundPolicy from "./RefundPolicy";
import DeleteUserPolicy from "./DeleteUserPolicy";
import WalletRules from "./WalletRules";
import WithdrawalTermAndCondition from "./WithdrawalTermAndCondition";
import GSTRules from "./GSTRules";

const Document = () => {
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
            label="Privacy Policy"
            {...a11yProps(0)}
          />
          <Tab
            className={"tab_listing"}
            label="Terms & Conditions"
            {...a11yProps(1)}
          />
          <Tab
            className={"tab_listing"}
            label="Legal Policy"
            {...a11yProps(2)}
          />
          <Tab
            className={"tab_listing"}
            label="Fair Play Policy"
            {...a11yProps(3)}
          />
          {/* <Tab
            className={"tab_listing"}
            label="Leaderboard Rules"
            {...a11yProps(4)}
          /> */}
          <Tab
            className={"tab_listing"}
            label="Refer & Earn Rules"
            {...a11yProps(4)}
          />
          <Tab
            className={"tab_listing"}
            label="Refund Policy"
            {...a11yProps(5)}
          />
          <Tab
            className={"tab_listing"}
            label="Delete User Account Policy"
            {...a11yProps(6)}
          />
          <Tab
            className={"tab_listing"}
            label="Wallet Rules"
            {...a11yProps(7)}
          />
          <Tab
            className={"tab_listing"}
            label="Withdrawal Terms & Conditions"
            {...a11yProps(8)}
          />
          <Tab
            className={"tab_listing"}
            label="GST Rules"
            {...a11yProps(9)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PrivacyPolicyPolicy />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TermsAndConditionsPolicy />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <LegalPolicy />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <FairPlayPolicy />
      </TabPanel>
      {/* <TabPanel value={value} index={4}>
        <LeaderboardRules />
      </TabPanel> */}
      <TabPanel value={value} index={4}>
        <ReferAndEarnRules />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <RefundPolicy />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <DeleteUserPolicy />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <WalletRules />
      </TabPanel>
      <TabPanel value={value} index={8}>
        <WithdrawalTermAndCondition />
      </TabPanel>
      <TabPanel value={value} index={9}>
        <GSTRules />
      </TabPanel>
    </Box>
  );
};
export default Document;
