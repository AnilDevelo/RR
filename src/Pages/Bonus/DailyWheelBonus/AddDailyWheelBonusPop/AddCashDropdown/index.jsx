//AddCashDropdown

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

const AddCashDropdown = ({formData, setFormData, name,bonusTypeIndex, isDailyBonus, cashPercentage}) => {
    const classes = useStyles();

    const handleChange = (event) => {
        let temp = [...formData.bonusType];

        if(isDailyBonus){
            temp[bonusTypeIndex] = {...temp[bonusTypeIndex], value: +event.target.value};
            setFormData({
                ...formData,
                bonusType: temp
            })
        }else {
            setFormData({
                ...formData,
                [event.target.name]: +event.target.value
            })
        }

    };


    return(
        <div className={'filter_days_details_dropDown gst-dropdown_width'}>
            <FormControl className={classes.margin}>
                <Select
                    name={name}
                    value={formData['bonusType'][bonusTypeIndex].value}
                    onChange={handleChange}
                    className={'select-dropdown-main filter_dropdown_list'}
                    input={<BootstrapInput />}
                >
                    {
                        Array.from(Array(100))?.map((item,i) => {
                            return <MenuItem value={i + 1} className={'filter_dropdown_list'}>{i + 1}%</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </div>
    )
}
export default AddCashDropdown