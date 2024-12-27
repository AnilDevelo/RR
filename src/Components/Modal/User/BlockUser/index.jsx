import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { userBlockAction } from "../../../../Redux/user/action";
import FilledButton from "../../../FileButton";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};
const ActiveUserModal = ({
  modalValue,
  handleOpenModal,
  redirectApiHandler,
}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(userBlockAction(modalValue)).then((res) => {
      if (res.data.success) {
        redirectApiHandler();
        setLoader(false);
        handleOpenModal("CommonPop", {
          header: "Success",
          body: res?.data?.message,
        });
      } else {
        setLoader(false);
        handleOpenModal("CommonPop", {
          header: "Error",
          body: res?.data?.message || res?.data?.msg,
        });
      }
    });
  };
  return (
    <Box sx={style} className={"user_popup_section"}>
      <div className="d_flex justify_content_center ">
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className={"block-user-title"}
        >
          Do you want to {!modalValue?.isBlock ? "unblock" : "block"} this user?
        </Typography>
      </div>
      <div className="publisher_popup">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form_main">
            <Box mb={3} className={"publisher_popup_box"}>
              <Button
                className={"cancel_btn"}
                variant="outlined"
                type="reset"
                onClick={() => handleOpenModal()}
              >
                {" "}
                NO{" "}
              </Button>
              <FilledButton
                type={"submit"}
                value={"Yes"}
                className={"submit_btn loader_css"}
                loading={loader}
              />
            </Box>
          </div>
        </form>
      </div>
    </Box>
  );
};
export default ActiveUserModal;
