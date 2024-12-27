import {useEffect} from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import * as React from "react";
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

const GameDropdown = ({  name, formData, setFormData }) => {
    const classes = useStyles();
    const handleChange = (e) => {
        setFormData({ ...formData, gameType: e.target.value })
    }
    useEffect(() => {
        if (document.getElementsByClassName('notranslate')) {
            document.getElementsByClassName('notranslate')[0].innerHTML = 'Select '
        }
    }, [])

    return (
        <div className={'filter_export_details_dropDown'}>
            <FormControl className={classes.margin}>
                <Select
                    name={'gameType'}
                    value={formData?.gameType}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                    className={'filter_dropdown_list'}
                >
                    <MenuItem className={'filter_dropdown_list'} value={'Game How To Play'}>Game How To Play</MenuItem>
                    <MenuItem className={'filter_dropdown_list'} value={'MGP How To Play'}>MGP How To Play</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}
export default GameDropdown