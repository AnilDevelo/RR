import React from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
    margin: {
        minWidth: '100%',
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
        fontWeight: '500',
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


const TimeDropdown = ({formData, setFormData, name, isDisabled,placeholder}) => {
    const classes = useStyles();

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value + 1
        })
    };
    // const selectedValue = formData[name] !== undefined && formData[name] !== null ? `${formData[name]}%` : '0%';
    return(
        <div className={'filter_days_details_dropDown gst-dropdown_width'}>
            <FormControl className={classes.margin}>
                <Select
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className={'select-dropdown-main filter_dropdown_list'}
                    input={<BootstrapInput />}
                    disabled={isDisabled}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Select option' }}
                    renderValue={(selected) => {
                        if (selected === '') {
                        return <p style={{color:"gray"}}>{placeholder}</p>;
                        }
                        return selected;
                    }}
                >
                    {
                        Array.from(Array(60))?.map((item,i) => {
                            return <MenuItem value={i} className={'filter_dropdown_list'}>{i + 1}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </div>
    );
}
export default TimeDropdown