import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
const LobbyTypeDropdown = ({ options, formData, setFormData }) => {
    const classes = useStyles();
    const handleChange = (event) => {
        setFormData({ ...formData, type: event.target.value })
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <Select
                    name={'type'}
                    value={formData?.type}
                    onChange={handleChange}
                    className={'filter_dropdown_list'}
                    input={<BootstrapInput />}
                >
                    <MenuItem value={'BATTLE (One Vs One)'} className={'filter_dropdown_list'}>
                        BATTLE (One Vs One)
                    </MenuItem>
                    <MenuItem value={'CONTEST (One vs Many)'} className={'filter_dropdown_list'}>
                        CONTEST (One vs Many)
                    </MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
export default LobbyTypeDropdown