import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { getAllCountriesRestrictGeo } from "../../../../Redux/settings/action";
import UpdateUserInfo from "./UpdateUserInfo";
import UserInfo from "./UserInfo";

const UserDetails = ({ handleOpenModal,getUserProfileDetails }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userReducer.userProfile);
  const [editUser, setEditUser] = useState(false);

  useEffect(() => {
    dispatch(getAllCountriesRestrictGeo({}));
  }, []);

  const editUserDetailsHandler = () => {
    setEditUser(true);
  };

  return (
    <>
    <Box className="outer-box">
      {!editUser ? (
        <UserInfo
          userProfile={userProfile}
          editUserDetailsHandler={editUserDetailsHandler}
          handleOpenModal={handleOpenModal}
          getUserProfileDetails={getUserProfileDetails}
        />
      ) : (
        <UpdateUserInfo
          id={id}
          setEditUser={setEditUser}
          handleOpenModal={handleOpenModal}
          userProfile={userProfile}
          getUserProfileDetails={getUserProfileDetails}
        />
      )}
      </Box>
      </>
  );
};

export default UserDetails;
