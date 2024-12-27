import { Box, Tab, Tabs } from '@mui/material';
import TabPanel from 'Components/TabPanel';
import PopComponent from 'hoc/PopContent';
import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CommonModal from 'hoc/CommonModal';
import TournamentRules from './TournamentRules';
import { a11yProps } from 'utils';
import TermsAndConditions from './TermsAndConditions';
import RefundRules from './RefundRules';
import TimeBonusRules from './TimeBonusRules';
import LeaderboardRules from './LeaderboardRules';


const TournamentDocuments = () => {
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
                        <Tab className={'tab_listing'} label="Tournament Rules" {...a11yProps(0)} />
                        <Tab className={'tab_listing'} label="Terms and conditions" {...a11yProps(1)} />
                        <Tab className={'tab_listing'} label="Refund Rules" {...a11yProps(2)} />
                        <Tab className={'tab_listing'} label="Time Bonus Rules" {...a11yProps(3)} />
                        <Tab className={'tab_listing'} label="Leaderboard Rules" {...a11yProps(4)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0} >
                    <TournamentRules handleOpenModal={handleOpenModal} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TermsAndConditions handleOpenModal={handleOpenModal} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <RefundRules handleOpenModal={handleOpenModal}/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <TimeBonusRules handleOpenModal={handleOpenModal}/>
              </TabPanel>
              <TabPanel value={value} index={4}>
                    <LeaderboardRules handleOpenModal={handleOpenModal}/>
                </TabPanel>
            </Box>
            {/*--------------------------------------------------------CommonModal-------------------------------------------------*/}
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
    </>
  )
}

export default TournamentDocuments
