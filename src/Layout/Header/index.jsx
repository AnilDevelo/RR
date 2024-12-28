import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import profile_pic from "../../assets/images/profile_pic.png";
import down_arrow from "../../assets/images/Down_arrow.svg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Notification from "./Notification";
import { getCompanyLogo } from "../../Redux/CompanyLogo/action";
import { getUnreadNotificationCount } from "../../Redux/Header/action";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { userDetails } from "utils";


function Header(props) {
  const { title, isGameHeader } = props;
  const dispatch = useDispatch();
  const ref = useRef();
  const [notificationCount, setNotificationCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const {role:userRole, email} = userDetails();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        openNotification &&
        ref.current &&
        !ref.current.contains(e.target) &&
        e.target.id !== "notificationIcon"
      ) {
        setOpenNotification(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [openNotification]);

  useEffect(() => {
    getNotificationCountFunc();
  }, [title]);

  const getNotificationCountFunc = () => {
    dispatch(getUnreadNotificationCount({})).then((res) => {
      if (res?.data?.success) {
        setNotificationCount(res?.data?.data);
      }
    });
  };

  return (
    <>
      <Box
        className={
          isGameHeader ? "inner-header game-header-inner" : "inner-header"
        }
      >
        <div className="main_header">
          <h4 className="main_header_title">{title}</h4>
          <div className={"right_side_profile"}>
            <div className="header_profile">
              <div className="profile">
                <span className="profile_name">
                {userRole === 'AdminUser' ? 'Admin User' : userRole === 'SubAdminUser' ? "Sub Admin User" : 'Super Admin'}

                                <p>{email}</p>
                </span>

                <span className="profile_pic">
                  <img
                    id="profileIcon"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    src={profile_pic}
                    alt="profile_pic"
                  />
                </span>
              </div>
              <div className="drop_down">
                <div className="cursor_pointer">
                  <img
                    id="profileIcon"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    src={down_arrow}
                    alt="down_arrow"
                  />
                </div>
                {isMenuOpen && (
                  <ul className="list_unstyled drop_down_list" ref={ref}>
                    <li>
                      <Link to="/change-password" onClick={() => setIsMenuOpen(!isMenuOpen)}> Change Password </Link>
                    </li>
                  </ul>
                )}
              </div>
              {/*notofiactiob icon */}
              {/* <div
                className="notification_block"
                id="notificationIcon"
                onClick={() => setOpenNotification(true)}
              >
                <NotificationsIcon />
                {
                  +notificationCount > 0 &&
                  <span>{notificationCount}</span>
                }
              </div>
              {openNotification && (
                <div>
                  {" "}
                  <Notification
                    setOpenNotification={setOpenNotification}
                    getNotificationCountFunc={getNotificationCountFunc}
                  />{" "}
                </div>
              )} */}
            </div>
            <Button className="hamburger" onClick={props.MenuToggle}>
              <MenuIcon />
            </Button>
          </div>
        </div>
      </Box>
    </>
  );
}

export default Header;
