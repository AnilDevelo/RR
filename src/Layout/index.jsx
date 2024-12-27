import React, { Suspense, useState } from 'react';
import CommonModal from "../hoc/CommonModal";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Header from "./Header";
import CustomPopup from "../Components/Modal/CustomPopup";
import { isAuthenticated } from "../utils";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "../images/LogoutIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function Layout({ children, title }) {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const errorData = useSelector(state => state.errorReducer);
    const dispatch = useDispatch();

    const MenuToggle = () => {
        setShow(!show)
    };

    const handleOpenModal = () => {
        dispatch({ type: 'UPDATE_ERROR_MODAL', payload: { open: !errorData.open, data: {} } })
    };
    // Log out the user by removing cookies and local storage data
    const LogOut = () => {
        Cookies.remove('token',{path:'/'});
        Cookies.remove('agentDetails', { path: '/' });
        Cookies.remove('userDetails', { path: '/' });
        Cookies.remove('agentData', { path: '/' });
        Cookies.remove('userdata', { path: '/' });
        localStorage.removeItem('agentData');
        localStorage.removeItem('userdata');
        navigate('/')
    };
    return (
        <div>
            <div className={`dashboard_wrapper ${show ? 'active' : ''}`}>
                {
                    isAuthenticated() && (
                        <div className="left_side_wrapper ">
                            <div className={'left_side_inner_sec'}>
                                <Sidebar />
                            </div>
                            <div>
                                <ListItemButton sx={{ padding: "5px 15px" }} className='list_item logout_btn' onClick={() => LogOut()}>
                                    <ListItemIcon style={{ minWidth: "20px" }}>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" className="menu_label" />
                                </ListItemButton>
                            </div>

                        </div>
                    )
                }

                <div className='right_side_wrapper'>
                    {(isAuthenticated() && title !== 'Game Details') && (<Header MenuToggle={MenuToggle} title={title} />)}
                    <Suspense fallback={""}>
                    <div className={'right_side_layout_details'}>
                            {children}
                            </div>
                        </Suspense>
                </div>
            </div>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={errorData.open} handleOpenModal={() => handleOpenModal()}>
                <CustomPopup modalValue={errorData.data} handleOpenModal={() => handleOpenModal()} modalIsOpen={errorData.open} />
            </CommonModal>
        </div>
    )
}

export default Layout