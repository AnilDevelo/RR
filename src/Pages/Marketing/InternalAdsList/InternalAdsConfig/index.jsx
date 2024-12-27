import React, {useState} from "react";
import Box from "@mui/material/Box";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import FilledButton from "../../../../Components/FileButton";
import {createInternalAdsConfig} from "../../../../Redux/Master/action";
import {useDispatch} from "react-redux";
import {hideActionFunc} from "../../../../utils";

const InternalAdsConfig = ({setFormData, formData, redirectApiHandler, handleOpenModal}) => {
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false);

    const label = { inputProps: { 'aria-label': 'Switch demo' }};
    const handleSubmit = (e) => {
        e.preventDefault();
        let payload = {
            isInternalAdsConfig:formData?.isInternalAdsOn
        }
        setLoader(true)
        dispatch(createInternalAdsConfig(payload)).then(res => {
            if (res.data.success) {
                setLoader(false)
                redirectApiHandler()
                handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
            } else {
                setLoader(false)
                handleOpenModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
            }
        })
    }

    return(
        <Box>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'referAndEarn_title'}>
                    <h2>Promotion Ads Config</h2>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={'radius_location_form'}>
                        <div className={'radius-location'}>
                            <label>Promotion Ads On/Off</label>
                            <div>
                                <Switch {...label} checked={formData?.isInternalAdsOn} onChange={(e)=> setFormData({...formData, isInternalAdsOn: e.target.checked})}   />
                            </div>
                        </div>

                    </div>
                    {
                        hideActionFunc('marketing') &&
                        <div className={'formData_btn mt_15'}>
                            <FilledButton type={'submit'} value={ 'Save'} className={'btn mt_1 loader_css'} loading={loader} />
                        </div>
                    }

                </form>
            </Paper>

        </Box>
    )
}
export default InternalAdsConfig