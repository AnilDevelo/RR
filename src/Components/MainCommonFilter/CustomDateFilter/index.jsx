import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";

const CustomDateFilter = ({ filterData, setFilterData,addPropsFilter }) => {
    const [openCale, setOpenCale] = useState({
        endDate: false,
        startDate: false
    });

    const handleDatePicker = (newValue, type) => {
        if (type === 'startDate') {
            setFilterData({
                ...filterData,
                [type]: moment(newValue).format('YYYY-MM-DD'),
                statusValue: "Custom",
                endDate: null
            });
        } else {
            setFilterData({ ...filterData, endDate: moment(newValue).format('YYYY-MM-DD') });
        }
        setOpenCale({ ...openCale, [type]: false });
    };

    return (
        <div className={'custom_date_filter'}>
            <div className={'start-date-picker'}>
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DatePicker
                        name='start-date'
                        value={filterData?.startDate}
                        onChange={(newValue) => handleDatePicker(newValue, 'startDate')}
                        open={openCale.startDate}
                        onClose={() => setOpenCale({ ...openCale, startDate: false })}
                        renderInput={(params) => {
                            return <TextField {...params} onClick={() => setOpenCale({ ...openCale, startDate: !openCale?.startDate}) } />
                        }}
                        inputFormat="MMM dd, yyyy"
                        inputProps={{ readOnly: true ,placeholder: "Select Start Date"}}
                        //maxDate={new Date()}
                        maxDate={ addPropsFilter?.isTDSChallan ? moment().date(Number(moment().format('DD')) - 1)  : new Date()}

                    />
                </LocalizationProvider>
            </div>
            {
                !addPropsFilter?.inActiveUsers &&(
                    <>
                        <div className={'date-to'}>TO</div>
                        <div className={'end-date-picker'}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} >
                                <DatePicker
                                    name='end-date'
                                    value={filterData.endDate}
                                    onChange={(newValue) => handleDatePicker(newValue, 'endDate')}
                                    open={openCale.endDate}
                                    onClose={() => setOpenCale({ ...openCale, endDate: false })}
                                    inputFormat="MMM dd, yyyy"
                                    minDate={filterData?.startDate}
                                    renderInput={({ inputProps, ...restParams }) => {
                                        return <TextField
                                            {...restParams}
                                            onClick={() => setOpenCale({ ...openCale, endDate: !openCale?.endDate })}
                                            inputProps={{
                                                ...inputProps,
                                                placeholder: "Select End Date",
                                            }}
                                        />
                                    }}
                                    inputProps={{ readOnly: true }}
                                    maxDate={ addPropsFilter?.isTDSChallan ? moment().date(Number(moment().format('DD')) - 1)  : new Date()}
                                />
                            </LocalizationProvider>
                        </div>
                    </>
                )
            }
            {/* <div className={'date-to'}>TO</div>
            <div className={'end-date-picker'}>
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DatePicker
                        name='end-date'
                        value={filterData.endDate}
                        onChange={(newValue) => handleDatePicker(newValue, 'endDate')}
                        open={openCale.endDate}
                        onClose={() => setOpenCale({ ...openCale, endDate: false })}
                        inputFormat="MM dd, yyyy"
                        minDate={filterData?.startDate}
                        renderInput={(params) => <TextField {...params} onClick={() => setOpenCale({ ...openCale, endDate: !openCale?.endDate })} />}
                        inputProps={{ readOnly: true ,placeholder: "Select End Date"}}
                        maxDate={new Date()}
                    />
                </LocalizationProvider>
            </div> */}
            {/*{*/}
            {/*    (filterData?.startDate &&  filterData.endDate) &&*/}
            {/*    <div>*/}
            {/*        <button>Clear Filter</button>*/}
            {/*    </div>*/}
            {/*}*/}

        </div>
    )
}
export default CustomDateFilter