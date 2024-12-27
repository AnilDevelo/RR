import { Snackbar } from "@material-ui/core";
import MuiAlert from "@mui/material/Alert";
import { useRef } from "react";
import { useState } from "react";

function Alert(props, ref) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const RenderToaster = (props) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={props.toggle}
      sx={{ width: "100%" }}
      onClose={() => props.handleToaster({ ...props, toggle: false})}
      message={
        <Alert severity={props.type} sx={{ width: "100%" }}>
          {props.message}
        </Alert>
      }
      autoHideDuration={1000}
      className="snackbar"
    />
  );
};

const useToaster = () => {
  const [state, setState] = useState({
    toggle: false,
    message: "",
    type: "",
  });

  const handleToaster = ({
    toggle = false,
    message = "No message",
    type = "success",
    action,
  }) => {
    setState((prev) => {
      if (!toggle) {
        state.action && state.action();
        return { toggle: toggle, message, type, action };
      } else {
        return { toggle: toggle, message, type, action };
      }
    });
  };

  return {
    handleToaster,
    DynamicToast: RenderToaster,
    props: { ...state, handleToaster },
  };
};

export default useToaster;
