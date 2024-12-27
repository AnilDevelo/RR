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

const DropdownReleaseDate = ({  name, formData, setFormData, isDailyBonus, bonusTypeIndex, expireAtValue }) => {
        const classes = useStyles();
        const handleChange = (e) => {
            if(isDailyBonus){
                let temp = [...formData?.bonusType];
                temp[bonusTypeIndex] = {...temp[bonusTypeIndex], expireAt: e.target.value};
                setFormData({
                    ...formData,
                    bonusType: temp
                })
            }else{
                setFormData({ ...formData, startDate: e.target.value })
            }

        }

        useEffect(() => {
            if(!isDailyBonus){
                if (document.getElementsByClassName('notranslate')) {
                    document.getElementsByClassName('notranslate')[0].innerHTML = 'Select Date'
                }
            }

        }, [])

    // useEffect(()=>{
    //     if(isDailyBonus){
    //         let temp = [...formData.bonusType];
    //         temp[bonusTypeIndex] = {...temp[bonusTypeIndex], expireAt: 24};
    //         setFormData({
    //             ...formData,
    //             bonusType: temp
    //         })
    //     }
    // },[isDailyBonus])

        return (
            <div className={'filter_export_details_dropDown admin_role'}>
                {
                    isDailyBonus ?
                        <FormControl className={classes.margin}>
                            <Select
                                name={name}
                                value={`${expireAtValue}`}
                                onChange={handleChange}
                                input={<BootstrapInput />}
                                className={'filter_dropdown_list'}
                            >
                                {Array.from(Array(24)).map((x, i) => {
                                    return <MenuItem className={'filter_dropdown_list'} value={`${i + 1}`}>{i + 1} hours</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        :
                        <FormControl className={classes.margin}>
                            <Select
                                name={name}
                                value={formData?.startDate}
                                onChange={handleChange}
                                input={<BootstrapInput />}
                                className={'filter_dropdown_list'}
                            >


                                {Array.from(Array(28)).map((x, i) => {
                                    return <MenuItem className={'filter_dropdown_list'} value={i + 1}>{i + 1}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                }

            </div>
        )
}
export default DropdownReleaseDate