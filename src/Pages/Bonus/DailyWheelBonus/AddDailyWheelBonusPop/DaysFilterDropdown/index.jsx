import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import * as React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import {useEffect} from "react";


const useStyles = makeStyles((theme) => ({
    margin: {
        minWidth: "100%",
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
const DaysFilterDropdown = ({ option, name, formData, setFormData, isEdit }) => {
    const classes = useStyles();
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event?.target?.value
        });
    }
    useEffect(() => {
        if (document.getElementsByClassName('notranslate')) {
            document.getElementsByClassName('notranslate')[0].innerHTML = 'Select Day'
        }
    }, []);

    return (
        <div className={'filter_export_details_dropDown'}>
            <FormControl className={classes.margin}>
                <Select
                    name={'day'}
                    value={formData?.day}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                    disabled={isEdit}
                    className={isEdit ? 'Disabled_select filter_dropdown_list' : 'filter_dropdown_list'}
                >
                    {
                        isEdit ?
                            [{label:'Day 1 - Sunday', value:1}, {label: 'Day 2 - Monday', value: 2} , {label: 'Day 3 - Tuesday', value: 3} ,
                                {label: 'Day 4 - wednesday', value: 4}, {label: 'Day 5 - Thursday', value: 5}, {label: 'Day 6 - Friday', value: 6}, {label: 'Day 7 - Saturday', value: 7}]?.map(item => {
                                return <MenuItem value={item?.value} className={'daily-bonus-list filter_dropdown_list'}>{`${item?.label}`}</MenuItem>
                            })
                            :
                            option?.map(item => {
                                return <MenuItem value={item?.value} className={'daily-bonus-list filter_dropdown_list'}>{`${item?.label}`}</MenuItem>
                            })
                    }
                </Select>
            </FormControl>
        </div>
    )
}
export default DaysFilterDropdown