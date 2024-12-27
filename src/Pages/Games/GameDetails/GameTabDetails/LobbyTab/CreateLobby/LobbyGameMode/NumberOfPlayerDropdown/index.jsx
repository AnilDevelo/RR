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

const NumberOfPlayerDropdown = ({options, name, formData, setFormData, isLobbyBattle}) => {
    const classes = useStyles();
    const handleChange = (event) => {
        if(event.target.name === 'noOfPlayer'){
            setFormData({
                ...formData,
                [event.target.name]: event.target.value,
                leaderboardScores: Array.from(Array(+event.target.value)).fill('')
            });
            localStorage.setItem('noOfPlayer', event.target.value)
        }else {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value,
            });
        }

    };
    return(
        <div className={'filter_days_details_dropDown'}>
            <FormControl className={classes.margin}>
                <Select
                    name={name}
                    value={formData[name]}
                    className={'select-dropdown-main filter_dropdown_list'}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                    disabled={isLobbyBattle}
                >
                    {
                        options?.map(item => {
                            return <MenuItem value={item} className={'filter_dropdown_list'}>{item}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </div>
    )
}
export default NumberOfPlayerDropdown