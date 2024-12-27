import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountriesRestrictGeo } from "../../../../../../Redux/settings/action";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};
const CountryReleasePop = ({ modalValue }) => {
    const dispatch = useDispatch()
    const country = useSelector(state => state?.settingReducer?.restrictedGeo?.country);
    useEffect(() => {
        dispatch(getAllCountriesRestrictGeo({}))
    }, []);

    return (
        <Box sx={style}>
            <Box className={'create_headToHead_modal add_admin_user_popup modal_main_popup'}>
                <div className={'modal_popup_title mt_1'}>
                    <h2>Country Availability</h2>
                </div>
                <div className={'country_availability_details'}>
                    {
                        modalValue?.isAvailableAllCountry ?
                            country?.map((item, i) => {
                                return (
                                    <div className={'country_availability_details_info'}>
                                        {`${i + 1}) ${item}`}
                                    </div>
                                )
                            })
                            :
                            modalValue?.countryAvailability?.map((item, i) => {
                                return (
                                    <div className={'country_availability_details_info'}>
                                        {`${i + 1}) ${item}`}
                                    </div>
                                )
                            })

                    }


                </div>
            </Box>
        </Box>
    )
}
export default CountryReleasePop