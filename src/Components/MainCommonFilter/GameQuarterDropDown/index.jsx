import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import * as React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    margin: {
        minWidth: 170,
        margin: '0'
    },
}));

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 14,
        padding: '15px 26px 15px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#1976d2',
            outlineWidth: '1px',
            boxShadow: 'none',
            outline: '1px solid #1976d2'
        },
    },
    svg: {
        right: '11px'
    }
}))(InputBase);
const GameQuarterDropDown = ({ option, name, filterData, setFilterData }) => {
    const classes = useStyles();

    function getQuarterRange(quarter) {
        const start = moment().quarter(quarter).startOf('quarter');
        const end = moment().quarter(quarter).endOf('quarter');
        return { start, end };
    }


    const handleChange = (event) => {
        const { name, value } = event.target

        let date = { endDate: moment().format('YYYY-MM-DD') };
        switch (value) {
            case "Quarter 1": {
                date = {
                    ...date, startDate: getQuarterRange(1)?.start?.format('YYYY-MM-DD'),
                    endDate: getQuarterRange(1)?.end?.format('YYYY-MM-DD')
                }
                break;
            }
            case "Quarter 2": {
                date = {
                    ...date, startDate: getQuarterRange(2)?.start?.format('YYYY-MM-DD'),
                    endDate: getQuarterRange(2)?.end?.format('YYYY-MM-DD')
                }
                break;
            }
            case "Quarter 3": {
                date = {
                    ...date, startDate: getQuarterRange(3)?.start?.format('YYYY-MM-DD'),
                    endDate: getQuarterRange(3)?.end?.format('YYYY-MM-DD')
                }
                break;
            }
            case 'Quarter 4': {
                date = {
                    ...date, startDate: getQuarterRange(4)?.start?.format('YYYY-MM-DD'),
                    endDate: getQuarterRange(4)?.end?.format('YYYY-MM-DD')
                }
                break;
            }
            case 'Financial Year': {
                let today = moment();
                if ((today?.month() + 1) <= 3) {
                } else {
                    date = {
                        ...date, startDate: `${today?.year()}-04-01`,
                        endDate: `${(today?.year() + 1)}-03-31`
                    }
                }

                break;
            }
            default: {
                date = { ...date, startDate: null, endDate: null }
            }
        }
        setFilterData({
            ...filterData,
            ...date,
            [name]: value
        });
    }

    return (
        <div className={'filter_days_details_dropDown'}>
            <FormControl className={classes.margin}>
                <Select
                    name={name}
                    value={filterData?.[name]}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                    className={'filter_dropdown_list'}

                >
                    {
                        option?.map(item => {
                            return <MenuItem className={'main-filter-dropdown filter_dropdown_list'} value={item}>{item}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </div>
    );
}
export default GameQuarterDropDown