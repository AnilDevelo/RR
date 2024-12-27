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
const MonthWiseDropDown = ({ option, name, filterData, setFilterData, prevDateFilter, setDateFilter }) => {
    const classes = useStyles();

    const handleChange = (event) => {
        const { name, value } = event.target;
        const selectedMonth = value;
        let date
        const currentYear = moment().format('YYYY');
        if (selectedMonth === "All Months") {
            date = { ...date, startDate: null, endDate: null };
        }
        else if (selectedMonth === 'Custom') {
            date = { ...date, startDate: null, endDate: null };
        }
        else {
            let start = moment(`${currentYear}-${selectedMonth}-01`).format('YYYY-MM-DD')
            let end = moment(start).endOf('month').format('YYYY-MM-DD')
            date = {
                ...date,
                startDate: start,
                endDate: end
            }
        }
        setDateFilter(preValue => {
            prevDateFilter.current = preValue;
            return {
                statusValue: value,
                ...date
            }
        })

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
export default MonthWiseDropDown;
