import * as React from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import moment from "moment";
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
const DayWiseDropDown = ({ option, name, filterData, setFilterData }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    const { name, value } = event.target;

    let date = { endDate: moment().format("YYYY-MM-DD") };
    switch (value) {
      case 'Today':{
        date = {
          ...date,
          startDate: moment().format("YYYY-MM-DD"),
        };
        break;
      }
      case "Last 3 Days": {
        date = {
          ...date,
          startDate: moment().subtract(3, "days").format("YYYY-MM-DD"),
        };
        break;
      }
      case "Last 30 Days": {
        date = {
          ...date,
          startDate: moment().subtract(29, "days").format("YYYY-MM-DD"),
        };
        break;
      }
      case "Last 14 Days": {
        date = {
          ...date,
          startDate: moment().subtract(13, "days").format("YYYY-MM-DD"),
        };
        break;
      }
      case "Custom": {
        date = { ...date, startDate: null, endDate: null };
        break;
      }
      case "All Days": {
        date = { ...date, startDate: null, endDate: null };
        break;
      }
      default: {
        date = {
          ...date,
          startDate: moment().subtract(6, "days").format("YYYY-MM-DD"),
        };
      }
    }

    // setDateFilter(preValue =>{
    //   prevDateFilter.current = preValue;
    //   return {
    //     statusValue:value,
    //     ...date
    //   }
    // })

    setFilterData({
      ...filterData,
      ...date,
      [name]: value,
    });
  };

  return (
    <div className={"filter_days_details_dropDown"}>
      <FormControl className={classes.margin}>
        <Select
          name={name}
          value={filterData?.statusValue}
          onChange={handleChange}
          input={<BootstrapInput />}
          className={"filter_dropdown_list"}
        >
          {option?.map((item) => {
            return (
              <MenuItem value={item} className={"filter_dropdown_list"}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};
export default DayWiseDropDown;
