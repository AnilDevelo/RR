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

const OfferTypeDropdown = ({ options, name, formData, setFormData,placeholder }) => {
    const classes = useStyles();
    const handleChange = (e) => {
        setFormData({ ...formData, offerId: e.target.value })
    }


    return(
        <div className={'filter_export_details_dropDown'}>
            <FormControl className={classes.margin}>
                <Select
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                    className={'filter_dropdown_list'}
                    displayEmpty  // This prop will display an empty MenuItem as the placeholder
                >
                 <MenuItem value="" disabled>
            {placeholder}  {/* The placeholder text will be displayed here */}
          </MenuItem>

                    {options?.map((item, i) => {
                        return <MenuItem className={'filter_dropdown_list'} key={i} value={item?._id}>{item?.offerName}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
    )
}
export default OfferTypeDropdown