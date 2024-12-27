import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import { Avatars } from 'images/Avatars';
import Cookies from 'universal-cookie';
import GameIcon from "../../images/Game";
import SDKIcon from "../../images/SDKIcon";
import AnalyticsIcon from "../../images/AnalyticsIcon";
import UserIcon from "../../images/UserIcon";
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Logo from "../../assets/images/logo.png";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton';
import {agentDetails, hideActionFunc, userDetails} from "../../utils";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import {useDispatch, useSelector} from "react-redux";
import {getFlagConfig} from "../../Redux/settings/action";
import {getPermissionsKey} from "../../Redux/AdminUser/action";


function LeftContent() {
    const dispatch =  useDispatch()
    const cookies = new Cookies();
    const settingFlag = useSelector(state => state?.settingReducer?.flagList)
    const navigate = useNavigate();
    const [, updateState] = React.useState({});
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [permotions,setPermotions] = useState({})

    const [menusList, setMenuList] = useState([
        // Admin Users menu
        {
            icon: <UserIcon />,
            label: "Admin Users",
            src: "admin-users",
            value: 'admin',
            hasMoreMenu: false,
        },
        // Users menu with expandable submenus
        {
            icon: <UserIcon />,
            label: "Users",
            hasMoreMenu: true,
            isExpanded: false,
            id: 'userId',
            value: 'user',
            expandArray: [
                {
                    icon: '',
                    label: "All Users",
                    src: "Users",
                },
                {
                    icon: '',
                    label: "Inactive Users",
                    src: "inactive-users",
                },
                {
                    icon: '',
                    label: "Users Blocked",
                    src: "block-user",
                },
                {
                    icon: '',
                    label: "Users Reported",
                    src: "user-reported",
                },
                {
                    icon: '',
                    label: "Users KYC",
                    src: "user-kyc",
                },

                {
                    icon : '',
                    label: settingFlag?.isMobileNumberUpdateRequest ?  'Users Mobile Number Request' : "Users Mobile Number Request",
                    src:'user/update-mobile-number'
                },
                // {
                //     icon: '',
                //     label: "Users Withdrawal Requests",
                //     src: "user-withdrawal-requests",
                // },
            ]
        },
         // Withdrawal menu with expandable submenus
         {
            icon: <AccountBalanceIcon />,
            label: "Deposit ",
            hasMoreMenu: true,
            isExpanded: false,
            id: 'Deposit ',
            value: 'Deposit ',
            expandArray: [
                {
                    icon: '',
                    label: "Deposit  Request",
                    src: "user-deposit-requests",
                },
                {
                    icon: '',
                    label: "Payment Gateway",
                    src: "deposit-transactions-history",
                },
            ]
        },
        // Withdrawal menu with expandable submenus
        {
            icon: <AccountBalanceIcon />,
            label: "Withdrawal",
            hasMoreMenu: true,
            isExpanded: false,
            id: 'withdrawal',
            value: 'withdrawal',
            expandArray: [
                {
                    icon: '',
                    label: "Bank and UPI",
                    src: "bank-and-upi",
                },
                {
                    icon: '',
                    label: "Withdrawal Request",
                    src: "user-withdrawal-requests",
                },
                {
                    icon: '',
                    label: "Withdrawal Processing Fee",
                    src: "withdrawalProcessingFee",
                },
                {
                    icon: '',
                    label: "Add UPI QR Code",
                    src: "upi-qr-code",
                },
                {
                    icon: '',
                    label: "User Deposit Manually",
                    src: "user-deposit-request",
                },
                // {
                //     icon: '',
                //     label: "Withdrawal Manually",
                //     src: "withdrawal-manually",
                // },
                {
                    icon: '',
                    label: "Payment Gateway",
                    src: "payment-gateway",
                },
            ]
        },
        {
            icon:<AnalyticsIcon />,
            label: "Daily Summary",
            hasMoreMenu: true,
            isExpanded: false,
            id: 'analytics',
            value: 'analytics',
            expandArray: [
                {
                    icon: '',
                    label: "Daily Report",
                    src: "daily-report",
                },
            ]
        },
    ]);

    const { role: userRole, email } = userDetails();
    
    useEffect(()=>{
        dispatch(getFlagConfig({}))
    },[menusList])

   

    // useEffect(()=>{
    //     if(JSON.parse(localStorage.getItem('userdata'))?.role === 'AdminUser'){
    //         let temp = [...menusList]
    //         setMenuList([ {
    //             icon: <UserIcon />,
    //             label: "Sub Admin Users",
    //             src: "sub-adminUser",
    //             value: 'subAdminUser',
    //             hasMoreMenu: false,
    //         }, ...temp])
    //     }
    // },[])

    const handleClicked = (e) => {
        navigate(`/${e}`)
    };

    const ToggleMenu = (Id) => {
        menusList.filter(item => item.id === Id)[0].isExpanded = !menusList.filter(item => item.id === Id)[0].isExpanded;
        forceUpdate();
    };

    const handleSidebar = (menu) => {

        if(!settingFlag?.isGameLeaderboardBonus && !settingFlag?.isMobileNumberUpdateRequest){
            return  menu?.expandArray?.filter(item=>( !item?.label?.includes('Users Mobile Number Request') && !item?.label?.includes('Leaderboard')))?.map((list, i) => {
                return  list && <Collapse in={menu?.isExpanded} timeout="auto" unmountOnExit key={i} className={((window.location.pathname.includes('/users-tab') && list?.label === 'All Users') || (window.location.pathname.includes('/game-tab') && list?.label === 'All Games')) ? 'inner_list_details activeClass' : 'inner_list_details'}>
                    <List component="div" disablePadding onClick={() => handleClicked(list?.src)} >
                        <ListItemButton className='list_item' selected={list?.src === window.location.pathname.replace('/', '')} >
                            {
                                list?.icon && <ListItemIcon>
                                    {list?.icon}
                                </ListItemIcon>
                            }
                            <ListItemText primary={list?.label} className="menu_label fontFamily" />
                        </ListItemButton>
                    </List>
                </Collapse>
            })
        }
        if(!settingFlag?.isGameLeaderboardBonus){
            return  menu?.expandArray?.filter(item=> item?.label !== "Leaderboard")?.map((list, i) => {
                //settingFlag?.isMobileNumberUpdateRequest
                return  list && <Collapse in={menu?.isExpanded} timeout="auto" unmountOnExit key={i} className={((window.location.pathname.includes('/users-tab') && list?.label === 'All Users') || (window.location.pathname.includes('/game-tab') && list?.label === 'All Games')) ? 'inner_list_details activeClass' : 'inner_list_details'}>
                    <List component="div" disablePadding onClick={() => handleClicked(list?.src)} >
                        <ListItemButton className='list_item' selected={list?.src === window.location.pathname.replace('/', '')} >
                            {
                                list?.icon && <ListItemIcon>
                                    {list?.icon}
                                </ListItemIcon>
                            }
                            <ListItemText primary={list?.label} className="menu_label fontFamily" />
                        </ListItemButton>
                    </List>
                </Collapse>
            })
        }
        if(!settingFlag?.isMobileNumberUpdateRequest){
            return  menu?.expandArray?.filter(item=> item?.label !== 'Users Mobile Number Request')?.map((list, i) => {
                //settingFlag?.isMobileNumberUpdateRequest
                return  list && <Collapse in={menu?.isExpanded} timeout="auto" unmountOnExit key={i} className={((window.location.pathname.includes('/users-tab') && list?.label === 'All Users') || (window.location.pathname.includes('/game-tab') && list?.label === 'All Games')) ? 'inner_list_details activeClass' : 'inner_list_details'}>
                    <List component="div" disablePadding onClick={() => handleClicked(list?.src)} >
                        <ListItemButton className='list_item' selected={list?.src === window.location.pathname.replace('/', '')} >
                            {
                                list?.icon && <ListItemIcon>
                                    {list?.icon}
                                </ListItemIcon>
                            }
                            <ListItemText primary={list?.label} className="menu_label fontFamily" />
                        </ListItemButton>
                    </List>
                </Collapse>
            })
        }


        if(settingFlag?.isGameLeaderboardBonus && settingFlag?.isMobileNumberUpdateRequest){
            return  menu?.expandArray?.map((list, i) => {
                //settingFlag?.isMobileNumberUpdateRequest
                return  list && <Collapse in={menu?.isExpanded} timeout="auto" unmountOnExit key={i} className={((window.location.pathname.includes('/users-tab') && list?.label === 'All Users') || (window.location.pathname.includes('/game-tab') && list?.label === 'All Games')) ? 'inner_list_details activeClass' : 'inner_list_details'}>
                    <List component="div" disablePadding onClick={() => handleClicked(list?.src)} >
                        <ListItemButton className='list_item' selected={list?.src === window.location.pathname.replace('/', '')} >
                            {
                                list?.icon && <ListItemIcon>
                                    {list?.icon}
                                </ListItemIcon>
                            }
                            <ListItemText primary={list?.label} className="menu_label fontFamily" />
                        </ListItemButton>
                    </List>
                </Collapse>
            })
        }
    }
    useEffect(()=>{
        dispatch(getPermissionsKey()).then(res=>{
            setPermotions(res.data.data.agentData)
        })
    },[])
    return (
        <div className='gp_left-bar'>
        <div className='side_logo_box'>

            <Link className='side_logo' to="/dashboard">
                {/*<SideLogo />*/}
                <img src={Logo} alt={"Logo"} className={"Logo"} />
            </Link>
        </div>
            <List sx={{ width: '100%', maxWidth: 360, padding: '0' }} component="nav" aria-labelledby="nested-list-subheader" className={"tab_sidebar_details"}>
                {
                    menusList?.map((menu, i) => {
                        //let agentDataDetails = JSON.parse(localStorage.getItem('agentData')) ||
                        //let agentDataDetails = cookies.get('agentData');
                        let agentDataDetails =  agentDetails();
                        let payload = {
                            permission: {
                                ...agentDataDetails.permission,
                                subAdminUser:{
                                    editor: JSON.parse(localStorage.getItem('userdata'))?.role === 'AdminUser' ,
                                    viewer: JSON.parse(localStorage.getItem('userdata'))?.role === 'AdminUser'
                                }
                            }
                        }
                        let AgentCondition = agentDataDetails !== 'null' && (payload && menu.value === (Object?.keys(payload?.permission || {})[Object?.keys(payload?.permission || {})?.indexOf(menu.value)]));
                        let agentValueViewer = (Object?.keys(payload?.permission || {})?.length > 0 && payload?.permission[(Object?.keys(payload?.permission || {})[Object?.keys(payload?.permission || {})?.indexOf(menu.value)])]?.viewer);
                        let agentValueEditor = (Object?.keys(payload?.permission || {})?.length > 0 && payload?.permission[(Object?.keys(payload?.permission || {})[Object?.keys(payload?.permission || {})?.indexOf(menu.value)])]?.editor);
                        let agentValue = (agentValueViewer ||  agentValueEditor)
                        return (
                            <React.Fragment key={i}>
                                                                {/* Check if user has permission to view the menu */}

                                                                {(((userRole) === 'Admin') || (AgentCondition && agentValue)) && (
                                        <>
                                            <ListItemButton sx={{ padding: "5px 15px" }} selected={menu?.src === window.location.pathname.replace('/', '')} className='list_item fontFamily' onClick={() => menu.hasMoreMenu ? ToggleMenu(menu?.id) : handleClicked(menu?.src)}>
                                                <ListItemIcon style={{ minWidth: "20px" }} className={'icon-left-side fontFamily'}>
                                                    {menu?.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={menu?.label} className="menu_label fontFamily" />
                                                {menu?.hasMoreMenu ? menu?.isExpanded ? <ExpandLess /> : <ExpandMore /> : ''}
                                            </ListItemButton>

                                            {menu?.expandArray &&
                                                handleSidebar(menu)
                                            }
                                        </>
                                    )}
                            </React.Fragment>
                        )
                    })
                }
            </List>
        </div>
    )
}

export default LeftContent