import React,{ useEffect } from "react";
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
            width: "100%",
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


const MultipleWinnerDropDown = ({ formData, setFormData, name, gameDetails, defaultNumberOfPlayer,placeholder }) =>{
    const classes = useStyles();

    const handleChange = (event) => {
        if(event?.target.name === 'multiWinner'){
            setFormData({
                ...formData,
                [event.target.name]: +event.target.value,
                pricePool: Array.from(Array(+event.target.value)).fill('')
            })
        }else {
            setFormData({
                ...formData,
                [event.target.name]: +event.target.value,

            })
        }

    };
    let numberOfPlayer = gameDetails?.isNoOfPlayer ? formData?.noOfPlayer ? +formData?.noOfPlayer : +defaultNumberOfPlayer?.numberOfPlayer : +defaultNumberOfPlayer?.numberOfPlayer
    return(
        <div className={'filter_days_details_dropDown w_100 '}>
            <FormControl className={classes.margin}>
                <Select
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className={'select-dropdown-main filter_dropdown_list'}
                    input={<BootstrapInput />}
                    displayEmpty
                    inputProps={{ "aria-label": "Select option" }}
                    renderValue={(selected) => {
                        if (selected === "") {
                        return <p style={{ color: "gray" , fontWeight: "normal"}}>{placeholder}</p>;
                        }
                        return selected;
                    }}
                >
                    {
                        Array.from(Array(numberOfPlayer))?.map((item,i) => {
                            return <MenuItem value={i+1} className={'filter_dropdown_list'}>{i+1}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </div>

    )
}
export default MultipleWinnerDropDown