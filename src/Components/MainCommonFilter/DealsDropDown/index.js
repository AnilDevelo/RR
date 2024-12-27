import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import * as React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  margin: {
    minWidth: 170,
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

const DealsDropDown = ({
 Dealsoption,
  name,
  filterData,
  setFilterData,
  isPlatform,
  placeholder
}) => {
  const classes = useStyles();
  const handleChange = (e) => {
    if (isPlatform) {
      setFilterData({
        ...filterData,
        [e.target.name]: e.target.value,
        monthFilter: null,
      });
    } else {
      setFilterData({
        ...filterData,
        [e.target.name]: e.target.value,
      });
    }
  };
  
  return (
    <div className={"filter_days_details_dropDown"}>
      <FormControl className={classes.margin}>
        <Select
          name={name}
          value={filterData?.[name]}
          onChange={handleChange}
          input={<BootstrapInput />}
          className={"filter_dropdown_list"}
          displayEmpty
          inputProps={{ 'aria-label': 'Select option' }}
          renderValue={(selected) => {
          if (selected === '') {
          return <p style={{color:"gray"}}>{ placeholder}</p>;
          }
          return selected;
          }}
        >
          {Dealsoption?.map((item) => {
            return (
              <MenuItem
                className={"main-filter-dropdown filter_dropdown_list"}
                value={item}
              >
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default DealsDropDown;
