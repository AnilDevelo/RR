import React from "react";
import { Box } from "@mui/material";

const NoteSDK = ({ modalValue }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 1,
    border: "0",
    boxShadow: 24,
    p: 3,
  };
  return (
    <Box sx={style} className={"release_Note"}>
      <h5>Release Note</h5>
      <div className={"close_btn_note"} />
      <p dangerouslySetInnerHTML={{ __html: modalValue }} />
    </Box>
  );
};

export default NoteSDK;
