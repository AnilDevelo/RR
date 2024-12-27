import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
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

const SectionDropdown = ({formData, setFormData,placeholder}) => {
    const classes = useStyles();
    const handleChange = (event) => {
        setFormData({
            ...formData,
            section : event.target.value
        })
    }
    return(
        <div className={'minor_head_section section_challan'}>
            <FormControl className={classes.formControl}>
                <Select
                    name={'section'}
                    value={formData?.section}
                    onChange={handleChange}
                    className={'select-dropdown-main filter_dropdown_list'}
                    input={<BootstrapInput />}
                    displayEmpty
                    inputProps={{ "aria-label": "Select option" }}
                    renderValue={(selected) => {
                    if (selected === "") {
                        return <p style={{ color: "gray"}}>{placeholder}</p>;
                    }
                    return selected;
                    }}
                >
                    <MenuItem value={'194B'}>
                         <div className={'select_multiple_menu'}>
                             <h2>194B</h2>
                             <p>Lotteries / Puzzle / Game</p>
                         </div>
                    </MenuItem>
                    <MenuItem value={'194B-P'}>
                        <div className={'select_multiple_menu section_challan_menu_li'}>
                            <h2>194B-P</h2>
                            <p><pre>Winnings from lotteries and crossword puzzles  {'\n'}where consideration is made  in kind or cash is {'\n'}not sufficient to meet the tax liability and tax  {'\n'}has been paid before such winnings are released	</pre></p>
                        </div>
                    </MenuItem>
                    <MenuItem value={'194BA'}>
                        <div className={'select_multiple_menu section_challan_menu_li'}>
                            <h2>194BA</h2>
                            <p>Winnings from online games</p>
                        </div>
                    </MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}
export default SectionDropdown