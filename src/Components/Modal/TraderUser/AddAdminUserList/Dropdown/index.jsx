import * as React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import { useEffect } from "react";

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

const DropDown = ({ option, name, adminRole, setAdminRole, setValue }) => {
    const classes = useStyles();
    const handleChange = (e) => {
        if (e.target.value === 'role') {
            setValue(1)
        }
        setAdminRole({ ...adminRole, adminUserRole: e.target.value })
    }
    useEffect(() => {
        if (document.getElementsByClassName('notranslate')) {
            document.getElementsByClassName('notranslate')[0].innerHTML = 'Select Role'
        }
    }, [])
    return (
        <div className={'filter_export_details_dropDown admin_role'}>
            <FormControl className={classes.margin}>
                <Select
                    name={name}
                    value={adminRole?.adminUserRole}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                    className={'filter_dropdown_list'}
                >
                    {
                        option?.map(item => {
                            return <MenuItem className={'filter_dropdown_list'} value={item}>{item}</MenuItem>
                        })
                    }
                    {
                        option?.length === 0 &&
                        <MenuItem className={'fontFamily'} value={'role'}>+ Add Role</MenuItem>
                    }
                </Select>
            </FormControl>
        </div>
    )
};
export default DropDown