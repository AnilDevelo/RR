import * as React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
    margin: {
        minWidth: 130,
        margin: '5px 0'
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
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: 18,
        color: 'white',
        padding: '6px 26px 6px 0px',
        fontWeight: '600',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#1976d2',
            outlineWidth: '1px',
            boxShadow: 'none',
            outline: 'none'
        },
    },
    svg: {
        right: '11px'
    }
}))(InputBase);

const GameDropdown = ({ option, name, setFormData, formData, gameDetails }) => {
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        if (gameDetails) {
            setAge(gameDetails?._id);
        }
    }, [gameDetails]);

    return (
        <div>
            <FormControl className={classes.margin}>
                <Select
                    name={name}
                    value={age}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                    className={'filter_dropdown_list'}
                >
                    {
                        option?.map(item => {
                            return <MenuItem value={item?.id} className={'filter_dropdown_list'}>{item?.gameName}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>

        </div>
    )
};
export default GameDropdown