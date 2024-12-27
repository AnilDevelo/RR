import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 508,
  bgColor: "background.paper",
  boxShadow: 24,
  p: 5,
};
const CustomPopup = ({ modalValue, handleOpenModal }) => {
  const navigate = useNavigate();
  const closeModalPop = () => {
    handleOpenModal();
    if (modalValue?.modalCloseHandle) {
      modalValue?.modalCloseHandle();
    }
  };

  const handleNumberOfPlayer = () => {
    if(modalValue?.isNumber){
      handleOpenModal();
      modalValue?.setFormData({...modalValue?.formData, isNoOfPlayer:true})
    }else {
      handleOpenModal();
      modalValue?.setFormData({...modalValue?.formData, isNoOfPlayer:false})
    }
  }
  return (
    <div className={"common-modal"}>
      <Box sx={style} className={"common-modal-inner"}>
        <h2>{modalValue?.header}</h2>
        <p>{modalValue?.body || modalValue?.body?.msg}</p>
        {
          modalValue?.isUpdateGame ?
              <Button style={{ width: "100%" }} variant="contained" color="primary" type="submit" onClick={() => handleNumberOfPlayer()}>{" "}YES{" "}</Button>
              :
          modalValue?.auth ? (
          <Button style={{ width: "100%" }} variant="contained" color="primary" type="submit" onClick={() => navigate(modalValue?.redirect)}>{" "}OK{" "}</Button>) : (
          <Button style={{ width: "100%" }} variant="contained" color="primary" type="submit" onClick={() => closeModalPop()}>{" "}OK{" "}</Button>
        )}
      </Box>
    </div>
  );
};
export default CustomPopup;
