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

const DropdownRollOUT = ({  name, formData, setFormData }) => {
    const classes = useStyles();
    const handleChange = (e) => {
        setFormData({ ...formData, rolloutPercentage: e.target.value })
    }
    useEffect(() => {
        if (document.getElementsByClassName('notranslate')) {
            document.getElementsByClassName('notranslate')[0].innerHTML = 'Select'
        }
    }, [])

    return (
        <div className={'filter_export_details_dropDown admin_role'}>
            <FormControl className={classes.margin}>
                <Select
                    name={'rolloutPercentage'}
                    value={formData?.rolloutPercentage}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                    className={'filter_dropdown_list'}
                >
                    <MenuItem className={'filter_dropdown_list'} value={5}>5%</MenuItem>
                    <MenuItem className={'filter_dropdown_list'} value={10}>10%</MenuItem>
                    <MenuItem className={'filter_dropdown_list'} value={20}>20%</MenuItem>
                    <MenuItem className={'filter_dropdown_list'} value={30}>30%</MenuItem>
                    <MenuItem className={'filter_dropdown_list'} value={40}>40%</MenuItem>
                    <MenuItem className={'filter_dropdown_list'} value={50}>50%</MenuItem>
                    <MenuItem className={'filter_dropdown_list'} value={60}>60%</MenuItem>
                    <MenuItem className={'filter_dropdown_list'} value={70}>70%</MenuItem>
                    <MenuItem className={'filter_dropdown_list'} value={80}>80%</MenuItem>
                    <MenuItem className={'filter_dropdown_list'} value={90}>90%</MenuItem>
                    <MenuItem className={'filter_dropdown_list'} value={100}>100%</MenuItem>



                </Select>
            </FormControl>
        </div>
    )
}
export default DropdownRollOUT