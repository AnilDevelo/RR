import React from "react";
import {useSelector} from "react-redux";
import {Box} from "@mui/material";
import {currencyFormat} from "../../../../../../utils";

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
const ViewLobbyDetails = ({ modalValue, handleOpenModal }) => {
    const gameDetails = useSelector(state => state?.gameReducer?.gameDetails)

    return (
        <Box sx={style} className={'user_popup_section h2h_details_view_popup'}>
            <p className={'custom_close_btn'} onClick={()=>handleOpenModal()}>
                <svg viewBox="0 0 24 24" x="1008" y="432" fit="" height="28" width="25"
                     preserveAspectRatio="xMidYMid meet" focusable="false">
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                        fill="#64748b" />
                </svg>
            </p>
            <div className={'create_headToHead_modal modal_main_popup create_headToHead_modal_view add_admin_user_popup'}>
                <div className={'add_admin_user_popup_title modal_popup_title'}>
                    <h2>Lobby Details</h2>
                </div>
            </div>
            <div className={'headToHead_popup_details'}>
                <div className={'formData'}>
                    <label>Entry Fee :</label>
                    <div className={'information_value'}>
                        {currencyFormat(modalValue?.data?.entryfee)}
                    </div>
                </div>
                <div className={'formData'}>
                    <label>Lobby Type :</label>
                    <div className={'information_value'}>
                        {gameDetails?.lobbyType?.filter(item => item?._id === modalValue?.data?.lobbyType?._id)[0]?.lobbyType || '-'}
                    </div>
                </div>
                <div className={'formData'}>
                    <label>Type Of Games :</label>
                    <div className={'information_value'}>
                        {gameDetails?.gameModes?.filter(item => item?._id === modalValue?.data?.gameModeId)?.[0]?.gameModeName || '-'}
                    </div>
                </div>
                <div className={'formData'}>
                    <label>Use Bot :</label>
                    <div className={'information_value'}>
                        {modalValue?.data?.isUseBot ? 'YES' : 'NO'}
                    </div>
                </div>
                <div className={'formData'}>
                    <label>Number Of Player:</label>
                    <div className={'information_value'}>
                        {modalValue?.data?.noOfPlayer}
                    </div>
                </div>
                <div className={'formData'}>
                    <label>Is Leaderboard Multiplication Score :</label>
                    <div className={'information_value'}>
                        {modalValue?.data?.isLeaderboardScoreOn ? "YES" : "NO"}
                    </div>
                </div>
                <div className={'formData'}>
                    <label>Is Multi Winner :</label>
                    <div className={'information_value'}>
                        {modalValue?.data?.isMultiWinner ? "YES" : "NO"}
                    </div>
                </div>
                {/*<div className={'formData'}>*/}
                {/*    <label>Is GST :</label>*/}
                {/*    <div className={'information_value'}>*/}
                {/*        {modalValue?.data?.isGST ? "YES" : "NO"}*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <div className={'headToHead_popup_winning_price'}>
                <div className={'headToHead_popup_winning_price_left'}>
                    <label>Total Prize Pool</label>
                    <h2>{currencyFormat(+modalValue?.data?.winningPrice)}</h2>
                </div>
                <div className={'headToHead_popup_winning_price_right'}>
                    <label>Players</label>
                    <h2> {modalValue?.data?.noOfPlayer}</h2>
                </div>
            </div>
        </Box>
    )
}
export default ViewLobbyDetails