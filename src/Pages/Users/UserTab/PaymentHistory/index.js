import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import WithdrawalHistory from "./WithdrawalHistory";
import DepositHistory from "./DepositHistory";
import TabPanel from "Components/TabPanel";
import PopComponent from "hoc/PopContent";
import CommonModal from "hoc/CommonModal";

const PaymentHistory = () => {
  const [value, setValue] = useState(0);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const handleOpenModal = (type, data) => {
    switch (type) {
      case "CommonPop": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "ExportFilePopup": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "ViewInvoicePopup": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      default: {
        setModalDetails({ ...modalDetails, modalIsOpen: false });
      }
    }
  };

  return (
    <div className={"leaderboard_section_game"}>
      <Box sx={{ width: "100%" }} className={"tab"}>
        <Paper sx={{ mb: 2 }} className="outer-box">
          <Box
            className={"tab_inner_section"}
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              className={"tab_bg_white"}
              scrollButtons="auto"
              variant="scrollable"
            >
              <Tab
                className={"tab_listing tab_title"}
                label="Deposit History"
                {...a11yProps(0)}
              />
              <Tab
                className={"tab_listing tab_title"}
                label="Withdrawal History"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <DepositHistory handleOpenModal={handleOpenModal} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <WithdrawalHistory handleOpenModal={handleOpenModal}/>
          </TabPanel>
        </Paper>
      </Box>
      <CommonModal
        className={"Approved-reject-section"}
        modalIsOpen={modalDetails.modalIsOpen}
        handleOpenModal={handleOpenModal}
      >
        <Modal
          modalValue={modalDetails.modalValue}
          handleOpenModal={handleOpenModal}
          modalIsOpen={modalDetails.modalIsOpen}
          redirectApiHandler={""}
        />
      </CommonModal>
    </div>
  );
};
export default PaymentHistory;
