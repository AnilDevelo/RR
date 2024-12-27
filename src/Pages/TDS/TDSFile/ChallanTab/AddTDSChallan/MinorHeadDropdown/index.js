import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

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
            width: "100%"
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 14,
        padding: '15px 26px 15px 12px',
        textTransform: 'capitalize',
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

const MinorHeadDropdown = ({formData, setFormData,placeholder}) => {
    const classes = useStyles();
    const handleChange = (event) => {
        setFormData({
            ...formData,
            minor_head : event.target.value
        })
    }
    return(
        <div className={'minor_head_section Minor'}>
            <FormControl className={classes.formControl}>
                <Select
                    name={'lobbyType'}
                    value={formData?.minor_head}
                    onChange={handleChange}
                    className={'select-dropdown-main filter_dropdown_list'}
                    input={<BootstrapInput />}
                    displayEmpty
                    inputProps={{ "aria-label": "Select option" }}
                    renderValue={(selected) => {
                    if (selected === "") {
                        return <p style={{ color: "gray" }}>{placeholder}</p>;
                    }
                    return selected;
                    }}
                >
                    <MenuItem value={'(200) TDS Payable by Tax Payer'}>
                        <div className={'select_multiple_menu'}>
                            <h2>(200) TDS Payable by Tax Payer</h2>
                        </div>
                    </MenuItem>
                    <MenuItem value={'(400) TDS Regular Assessment \n (Raised by I.T. Dept.)'}>
                        <div className={'select_multiple_menu'}>
                            <h2>(400) TDS Regular Assessment (Raised by I.T. Dept.)</h2>
                        </div>
                    </MenuItem>
                    <MenuItem value={'(100) Advance Tax'}>
                        <div className={'select_multiple_menu'}>
                            <h2>(100) Advance Tax</h2>
                        </div>
                    </MenuItem>

                </Select>
            </FormControl>
        </div>
    )
}
export default MinorHeadDropdown