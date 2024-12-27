import {makeStyles, withStyles} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import * as React from "react";
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

const CashbackType = ({  name, formData, setFormData, options,placeholder }) => {
    const classes = useStyles();
    const handleChange = (e) => {
        setFormData({ ...formData, cashbackType: e.target.value , cashbackBonus:''})
    }
    return(
        <div className={'filter_export_details_dropDown admin_role'}>
            <FormControl className={classes.margin}>
                <Select
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                    className={'filter_dropdown_list'}
                    displayEmpty
  inputProps={{ 'aria-label': 'Select option' }}
                            renderValue={(selected) => {
    if (selected === '') {
      return <p style={{color:"gray"}}>{ placeholder}</p>;
    }
    return selected;
  }}
                >


                    {options?.map((x, i) => {
                        return <MenuItem className={'filter_dropdown_list'} key={i} value={x}>{x}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
    )
}
export default CashbackType