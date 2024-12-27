import React, { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import UserKYCTab from "./UserKYC";
import UserNote from './UserNote';
import UserDetails from './UserDetails';
import UserWalletHistory from './UserWalletHistory';
import UserGameStatistics from './UserGameStatistics';
import UserGamePlayedTab from './UserGamePlayedTab';
import PaymentHistory from "./PaymentHistory";
import PopComponent from '../../../hoc/PopContent';
import CommonModal from '../../../hoc/CommonModal';
import { a11yProps } from "../../../utils";
import { getUserProfile } from "../../../Redux/user/action";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TabPanel from "../../../Components/TabPanel";
import UserEarningReport from "./UserEarningReport";


function UsersTab() {
    const { id } = useParams(); // Extracts the 'id' parameter from the URL
    const dispatch = useDispatch(); // Accesses the dispatch function from Redux
    const userProfile = useSelector(state => state.userReducer.userProfile); // Retrieves the user profile from the Redux store
    const [value, setValue] = React.useState(0); // Initializes the 'value' state variable with an initial value of 0
    // custom modal state
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false }); // Initializes the 'modalDetails' state variable with an initial object
    let Modal = PopComponent[modalDetails.modalName];

    // user profile details Api fun
    useEffect(() => {
        if(value === 0){
            getUserProfileDetails() // Calls the function to fetch user profile details when 'value' changes
        }
    }, [value]);

    const getUserProfileDetails = () => {
        dispatch(getUserProfile({ userId: id })) // Dispatches an action to fetch user profile details using the 'id'
    };

    // tab change fun
    const handleChange = (event, newValue) => {
        setValue(newValue); // Updates the 'value' state variable with the selected tab value
    };

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
            case 'ViewPlayerRecord': {
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

    return (
        <>
            
            {value === 0 ? "" :
            <Box sx={{ width: '100%' }} className={'tab user_detail_info'}>
                    <div className={'info_filed'}>
                        <span className={'info_title fontFamily'}>User ID : </span>
                        <span className={'fontFamily'}>UID000{userProfile?.numericId}</span>
                    </div>
                    <div className={'info_filed'}>
                        <span className={'info_title fontFamily'}>Name : </span>
                        <span className={'fontFamily'}>{userProfile?.fullName}</span>
                    </div>
                    {/* <div className={'info_filed'}>
                        <span className={'info_title fontFamily'}>Email : </span>
                        <span className={'fontFamily'}>{userProfile?.email}</span>
                    </div> */}
                    <div className={'info_filed'}>
                        <span className={'info_title fontFamily'}>Phone no : </span>
                        <span className={'fontFamily'}>{userProfile?.phoneNumber}</span>
                        </div>
            </Box>
                }
           
            <Box sx={{ width: '100%' }} className={'tab'}>
                <Box className="bg_white tab_inner_section" sx={{ borderBottom: 1, borderColor: 'divider' }} pl={3} >
                        <Tabs value={value} onChange={handleChange} className={'tab_bg_white'} scrollButtons="auto" variant="scrollable">
                        <Tab className={'tab_listing'} label="User Profile" {...a11yProps(0)} />
                        <Tab className={'tab_listing'} label="Wallet History" {...a11yProps(1)} />
                        <Tab className={'tab_listing'} label="Payment History" {...a11yProps(2)} />
                        <Tab className={'tab_listing'} label="Game Statistics" {...a11yProps(3)} />
                        <Tab className={'tab_listing'} label="Game History" {...a11yProps(4)} />
                        <Tab className={'tab_listing'} label="User KYC" {...a11yProps(5)} />
                        <Tab className={'tab_listing'} label="Earning Report" {...a11yProps(6)} />
                        {/*<Tab className={'tab_listing'} label="User GST" {...a11yProps(6)} />*/}
                        {/* <Tab className={'tab_listing'} label="Notes" {...a11yProps(7)} /> */}
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0} >
                    <UserDetails handleOpenModal={handleOpenModal} getUserProfileDetails={getUserProfileDetails} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <UserWalletHistory handleOpenModal={handleOpenModal} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <PaymentHistory handleOpenModal={handleOpenModal}/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <UserGameStatistics />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <UserGamePlayedTab handleOpenModal={handleOpenModal} />
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <UserKYCTab />
                </TabPanel>
                {/*<TabPanel value={value} index={6}>*/}
                {/*   <UserGST/>*/}
                {/*</TabPanel>*/}
                <TabPanel value={value} index={6}>
                   <UserEarningReport/>
                </TabPanel>
                {/* <TabPanel value={value} index={7}>
                    <UserNote />
                </TabPanel> */}
            </Box>
            {/*--------------------------------------------------------CommonModal-------------------------------------------------*/}
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </>
    );
}

export default UsersTab