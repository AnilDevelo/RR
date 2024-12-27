import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
export default function DropDownGameTag({ options, formData, setFormData, }) {
    const classes = useStyles();

    const handleChange = (event) => {
        setFormData({
            ...formData,
            gameTag: event.target.value
        })
    };

    return (
        <div className={'filter_days_details_dropDown'}>
            <FormControl className={classes.margin}>
                <Select
                    name={'mode'}
                    value={formData?.gameTag}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                >
                    {
                        options?.map(item => {
                            return <MenuItem value={item}>{item}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>

        </div>
    );
}
