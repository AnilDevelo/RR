import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import * as React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import { FormControl } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  margin: {
    minWidth: "100%",
    margin: "0",
  },
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 14,
    padding: "15px 26px 15px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#1976d2",
      outlineWidth: "1px",
      boxShadow: "none",
      outline: "1px solid #1976d2",
    },
  },
  svg: {
    right: "11px",
  },
}))(InputBase);

const UserTypeDropdown = ({
  options,
  name,
  formData,
  setFormData,
  placeholder,
}) => {
  const classes = useStyles();
  const handleChange = (e) => {
    const selectedOption = options.find((item) => item._id === e.target.value);
    setFormData({ ...formData, [name]: selectedOption?._id });
  };

  return (
    <div className={"filter_export_details_dropDown"}>
      <FormControl className={`${classes.margin} userType_notification`}>
        <Select
          name={name}
          value={formData[name] || ""}
          onChange={handleChange}
          input={<BootstrapInput />}
          className={"filter_dropdown_list"}
          displayEmpty
          inputProps={{ "aria-label": "Select option" }}
          renderValue={(selected) => {
            if (!selected) {
              return <p style={{ color: "gray" }}>{placeholder}</p>;
            }
            const selectedOption = options.find(
              (item) => item._id === selected
            );
            return selectedOption?.userType || "";
          }}
        >
          {options?.map((item) => (
            <MenuItem
              className={"filter_dropdown_list"}
              key={item._id}
              value={item._id}
            >
              {item.userType === "Inactive User" ? (
                <>
                  {`${item.userType} - Last ${item.inActiveTime} ${item.inActiveType}`}
                </>
              ) : (
                <>{item.userType}</>
              )}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default UserTypeDropdown;
