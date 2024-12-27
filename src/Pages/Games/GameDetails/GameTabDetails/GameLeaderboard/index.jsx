import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../../../../Components/TabPanel";
import {getGameLeaderboardRankGameConfig} from "../../../../../Redux/games/action";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import CommonModal from "../../../../../hoc/CommonModal";
import Loader from "../../../../../images/Loader";
import PopComponent from "../../../../../hoc/PopContent";
import MonthlyGameLeaderboardConfigTab from "./MonthlyGameLeaderboardConfigTab";
import LeaderboardTab from "./LeaderboardTab";
import {getFlagConfig} from "../../../../../Redux/settings/action";




const tabArray = [
    {id:0,active:true, label:'Leaderboard', component: LeaderboardTab },
    {id:1,active:true, label:'Leaderboard Config', component:MonthlyGameLeaderboardConfigTab   },
]

const GameLeaderboardTab = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [tab,setTab] =useState(tabArray)
        const [value, setValue] = useState(0);
    const [loader, setLoader] = useState(false);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [rowData, setRowData] = useState({monthlyBonusAmountConfig:[],monthlyBonusDateConfig:[],ranks:[],bonusMonthlyAllData:{}, isLeaderboardBonusOn:false});
    const settingFlag = useSelector(state => state?.settingReducer?.flagList);


    useEffect(()=>{
        dispatch(getFlagConfig({}))
    },[value])

    useEffect(()=>{
        let temp =[...tab];
        if(!settingFlag?.isGameLeaderboardBonus){
            let indexMode = temp?.findIndex(item => item?.label === 'Leaderboard');
            if(indexMode > -1 ){
                temp[indexMode].active = false;
            }
        }

        if(settingFlag?.isGameLeaderboardBonus){
            let indexMode = temp?.findIndex(item => item?.label === 'Leaderboard');
            if(indexMode > -1 ){
                temp[indexMode].active = true;
            }
        }

    },[settingFlag])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    };
    useEffect(() => {
        getGameMonthlyLeaderboard();

    }, []);

    const getGameMonthlyLeaderboard = () => {
        setLoader(true);
        dispatch(getGameLeaderboardRankGameConfig({ gameId:id })).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                monthlyBonusAmountConfig :( Object?.keys(res?.data?.data?.monthlyBonusConfig || {})?.length > 0 && res?.data?.data?.monthlyBonusConfig?.maxMonthlyBonusLimit )? [res?.data?.data?.monthlyBonusConfig] : [],
                monthlyBonusDateConfig: (Object?.keys(res?.data?.data?.monthlyBonusConfig || {})?.length > 0  && res?.data?.data?.monthlyBonusConfig?.date)? [res?.data?.data?.monthlyBonusConfig] : [],
                ranks:res?.data?.data?.ranks,
                bonusMonthlyAllData:res?.data?.data,
                isLeaderboardBonusOn: res?.data?.data?.monthlyBonusConfig?.isLeaderboardBonusOn || false
            })
        })
    };

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'AddMonthlyGameLeaderboardRank':{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddGameLeaderboardBonusReleaseDate':{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddGameLeaderboardBonusAmount':{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };
    //settingFlag?.isGameLeaderboardBonus

   return(
    <>
           {/* {loader && <Loader />} */}
       {/*<Paper sx={{ mb: 2 }} className="outer-box ">*/}
           <Box sx={{ width: '100%' }} className={'tab'}>
               <Box className={'tab_inner_section'} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                   <Tabs value={value} onChange={handleChange} className={'tab_bg_white'} scrollButtons="auto" variant="scrollable">
                       {
                           tab?.filter(item=> item?.active !== false)?.map((item, index)=>{
                               return  <Tab className={'tab_listing'}  key={item?.id} label={item?.label} {...a11yProps( index)} />
                           })
                       }
                   </Tabs>
               </Box>
               {
                   tab?.filter(item=> item?.active !== false)?.map(({id, component:Component, active},key)=>{
                       return  <TabPanel value={value} index={key} >
                           <Component rowData={rowData} isLeaderboardBonusOn={rowData?.isLeaderboardBonusOn} getGameMonthlyLeaderboard={getGameMonthlyLeaderboard} />
                       </TabPanel>
                   })
               }
               {/*<TabPanel value={value} index={0}>*/}
               {/*    <LeaderboardTab/>*/}
               {/*</TabPanel>*/}
               {/*<TabPanel value={value} index={1}>*/}
               {/*    <MonthlyGameLeaderboardConfigTab rowData={rowData} isLeaderboardBonusOn={rowData?.isLeaderboardBonusOn} getGameMonthlyLeaderboard={getGameMonthlyLeaderboard} />*/}
               {/*</TabPanel>*/}
           </Box>
       {/*</Paper>*/}
           <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
               <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getGameMonthlyLeaderboard} monthlyBonus={rowData?.bonusMonthlyAllData} />
           </CommonModal>
           </>
   )
};
export default GameLeaderboardTab