import { Box, Tab, Tabs } from '@mui/material';
import TabPanel from 'Components/TabPanel';
import PopComponent from 'hoc/PopContent';
import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import TournamentRegistration from './TournamentRegistration';
import CommonModal from 'hoc/CommonModal';
import { a11yProps } from "../../../utils";
import TournamentHistory from './TournamentHistory';
import TournamentNotification from './TournamentNotification';
import TournamentLeaderboard from './TournamentLeaderboard';
import Notification from './TournamentNotification/Notification';


const TournamentTab = () => {
    const { id } = useParams(); // Extracts the 'id' parameter from the URL
    const [value, setValue] = React.useState(0); // Initializes the 'value' state variable with an initial value of 0
    // custom modal state
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false }); // Initializes the 'modalDetails' state variable with an initial object
    let Modal = PopComponent[modalDetails.modalName];


        // custom PopUp function
        const handleOpenModal = (type, data) => {
            // Sets the 'modalDetails' state based on the provided 'type' and 'data'
            switch (type) {
                case 'CommonPop': {
                    setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                    break;
                }
                case 'ViewTransitionHistory': {
                    setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                    break;
                }
                case 'ViewGamePlayedHistory': {
                    setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                    break;
                }
                case 'UpdateCashAndBonus': {
                    setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                    break;
                }
                case 'AddCoinPopup': {
                    setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
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
                default: {
                    setModalDetails({ ...modalDetails, modalIsOpen: false })
                }
            }
    };
    
        // tab change fun
        const handleChange = (event, newValue) => {
            setValue(newValue); // Updates the 'value' state variable with the selected tab value
        };
  return (
    <>
          <Box sx={{ width: '100%' }} className={'tab'}>
                <Box className="bg_white tab_inner_section" sx={{ borderBottom: 1, borderColor: 'divider' }} pl={3} >
                        <Tabs value={value} onChange={handleChange} className={'tab_bg_white'} scrollButtons="auto" variant="scrollable">
                        <Tab className={'tab_listing'} label="Registration" {...a11yProps(0)} />
                        <Tab className={'tab_listing'} label=" Leaderboard" {...a11yProps(1)} />
                        <Tab className={'tab_listing'} label="Notification" {...a11yProps(2)} />
                      <Tab className={'tab_listing'} label="History" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0} >
                    <TournamentRegistration handleOpenModal={handleOpenModal} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TournamentLeaderboard handleOpenModal={handleOpenModal} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Notification handleOpenModal={handleOpenModal}/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <TournamentHistory handleOpenModal={handleOpenModal}/>
              </TabPanel>
            </Box>
            {/*--------------------------------------------------------CommonModal-------------------------------------------------*/}
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
    </>
  )
}

export default TournamentTab
