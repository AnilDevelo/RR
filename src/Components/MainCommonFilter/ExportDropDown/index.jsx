import * as React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
    margin: {
        minWidth: 150,
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

const ExportDropDown = ({ option, name, filterData, setFilterData }) => {
    const classes = useStyles();
    const handleChange = (event) => {
        switch (event.target.value) {
            case 'CSV File': {
                setFilterData({ ...filterData, csvDownload: true, exportFile: true, [event.target.name]: event.target.value })
                break;
            }
            case 'Excel File': {
                setFilterData({ ...filterData, csvDownload: false, exportFile: true, [event.target.name]: event.target.value });
                break;
            }
            default: {
                setFilterData({ ...filterData, csvDownload: false, exportFile: false, [event.target.name]: event.target.value })
            }
        }
    };

    return (
        <div className={'filter_export_details_dropDown'}>
            <FormControl className={classes.margin}>
                <Select
                    name={name}
                    value={filterData?.exportFileName}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                    className={'filter_dropdown_list'}
                >
                    {
                        option?.map(item => {
                            return <MenuItem value={item} className={'filter_dropdown_list'}>{item}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </div>
    )
};
export default ExportDropDown