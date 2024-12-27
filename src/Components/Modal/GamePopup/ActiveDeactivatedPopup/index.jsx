import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getGameLobbyList,
    getGameReleaseList,
    getHeadToHeadsGameList,
    updateGameStatusActiveDeactivated
} from "../../../../Redux/games/action";
import { Box, Button } from "@mui/material";
import FilledButton from "../../../FileButton";
import { getAllCountriesRestrictGeo } from "../../../../Redux/settings/action";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};
const ActiveDeactivatedPopup = ({ modalValue, handleOpenModal, redirectApiHandler, filterData }) => {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('')
    const allCountry = useSelector(state => state?.settingReducer?.restrictedGeo?.country);
    const [formData, setFormData] = useState({
        headToHeadCount: 0,

    });
    const [formDataRelease, setFormDataRelease] = useState({
        gameReleaseStage: 0,
        countryAvailability: 0
    })
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoader(true);
        delete modalValue?.isActivePop;
        delete modalValue?.data;
        dispatch(updateGameStatusActiveDeactivated(modalValue)).then(res => {
            if (res.data.success) {
                redirectApiHandler(filterData.startDate, filterData.endDate);
                setLoader(false);
                handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
            } else {
                setLoader(false)
                handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message || res?.data?.msg });
            }
        });
        // if (modalValue?.isActivePop && formDataRelease?.gameReleaseStage > 0) {
        //     delete modalValue?.isActivePop;
        //     delete modalValue?.data;
        //     dispatch(updateGameStatusActiveDeactivated(modalValue)).then(res => {
        //         if (res.data.success) {
        //             redirectApiHandler(filterData.startDate, filterData.endDate);
        //             setLoader(false);
        //             handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
        //         } else {
        //             setLoader(false)
        //             handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message || res?.data?.msg });
        //         }
        //     });
        // }
        // else {
        //     setLoader(false);
        //     setErrorMsg('Please Enter Game Release Stage ')
        // }
    };

    // useEffect(() => {
    //     getGameRelease();
    //     dispatch(getAllCountriesRestrictGeo({}))
    //     dispatch(getGameLobbyList({})).then(res => {
    //         setFormData({
    //             ...formData,
    //             headToHeadCount: res?.data?.data?.totalDocs || 0
    //         })
    //     })
    // }, [modalValue])
    // const getGameRelease = () => {
    //     dispatch(getGameReleaseList({ gameId: modalValue?.data?._id, publisherId: modalValue?.data?.publisherId?._id })).then(res => {
    //         if (res.data?.success) {
    //             setFormDataRelease({
    //                 ...formDataRelease,
    //                 gameReleaseStage: res?.data?.data?.releasePercentage || 0,
    //                 countryAvailability: res?.data?.data?.isAvailableAllCountry ? allCountry?.length : res.data.data?.countryAvailability?.length
    //             })
    //         }
    //     })
    // };

    return (
        <>
            <Box sx={style} className={'user_popup_section'}>
                <div className='d_flex justify_content_center'>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className={"block-user-title"}>
                        Do you want to  {modalValue?.isActive ? 'activate' : 'deactivate'} the game?
                    </Typography>
                </div>
                <div className='publisher_popup'>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className='form_main'>
                            <Box mb={3} className={"publisher_popup_box"}>
                                <Button className={'cancel_btn'} variant="outlined" type='reset' onClick={() => handleOpenModal()}> No </Button>
                                <FilledButton type={'submit'} value={'Yes'} className={'submit_btn loader_css'} loading={loader} />
                            </Box>
                        </div>
                    </form>
                </div>
            </Box>
        {/*<Box sx={style} className={'user_popup_section game_approve_tab game_active_list_details_pop'}>*/}
        {/*    <div className={'create_headToHead_modal modal_main_popup add_admin_user_popup'}>*/}
        {/*        <div className={'modal_popup_title'}>*/}
        {/*            <h2>Active Game</h2>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*    /!*<div className={'headToHead_popup_details'}>*!/*/}
        {/*    /!*    <div className={'formData'}>*!/*/}
        {/*    /!*        <label>BATTLE :</label>*!/*/}
        {/*    /!*        <div className={'information_value'}>*!/*/}
        {/*    /!*            {formData?.headToHeadCount}*!/*/}
        {/*    /!*        </div>*!/*/}
        {/*    /!*    </div>*!/*/}
        {/*    /!*    <div className={'formData'}>*!/*/}
        {/*    /!*        <label>Game Release Stage :</label>*!/*/}
        {/*    /!*        <div className={'information_value'}>*!/*/}
        {/*    /!*            {formDataRelease?.gameReleaseStage}%*!/*/}
        {/*    /!*        </div>*!/*/}
        {/*    /!*    </div>*!/*/}
        {/*    /!*    <div className={'formData'}>*!/*/}
        {/*    /!*        <label>Game Release Country Availability :</label>*!/*/}
        {/*    /!*        <div className={'information_value'}>*!/*/}
        {/*    /!*            {formDataRelease?.countryAvailability} / {allCountry?.length}*!/*/}
        {/*    /!*        </div>*!/*/}
        {/*    /!*    </div>*!/*/}
        {/*    /!*</div>*!/*/}
        {/*    <div className={'errorMsg'}>*/}
        {/*        {errorMsg}*/}
        {/*    </div>*/}
        {/*    <div className='publisher_popup'>*/}
        {/*        <form onSubmit={(e) => handleSubmit(e)}>*/}
        {/*            <div className='form_main'>*/}
        {/*                <Box mb={3} className={"publisher_popup_box"}>*/}
        {/*                    <Button className={'cancel_btn'} variant="outlined" type='reset' onClick={() => navigate(`/game-tab/${modalValue?.data?._id}`, { state: { isRedirectTab: true } })}> Edit </Button>*/}
        {/*                    <Button className={'cancel_btn'} variant="outlined" type='reset' onClick={() => handleOpenModal()}> Cancel </Button>*/}
        {/*                    <FilledButton type={'submit'} value={'Active'} className={'submit_btn loader_css'} loading={loader} />*/}
        {/*                </Box>*/}
        {/*            </div>*/}
        {/*        </form>*/}
        {/*    </div>*/}

        {/*</Box>*/}
            </>
    )
}
export default ActiveDeactivatedPopup