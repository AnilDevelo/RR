import React, {useEffect} from "react";
import Tooltip from "@mui/material/Tooltip";
import PlatformCommission from "../LobbyEnterFee/PlatformCommission";

const RummyEntryFee = ({ gameDetails, formData, lobbyProps, setFormData, simpleValidator, handleChange, setLobbyProps }) => {
    const { defaultNumberOfPlayer, isReadOnlyEntryFee, totalEntryFee } = lobbyProps;

    const handleChangePointValue = (e) => {
        const { name, value } = e.target;

        // Calculate entry fee based on the point value
        let entryFee = (+value * 80);

        // Determine the number of players based on game details and form data
        const numberOfPlayer = formData?.noOfPlayer || defaultNumberOfPlayer?.numberOfPlayer;

        // Calculate fees after deducting commission
        let fees = (entryFee * numberOfPlayer) - ((entryFee * numberOfPlayer) * (0.01 * +formData?.platformCommission));

        let GSTAmount;
        if (formData?.isGST) {
            // Calculate GST amount based on the selected GST percentage
            GSTAmount = (+value * (+formData?.GSTPercentage)) / 100;
        }

        let numberRegex = /^[0-9]*\.?[0-9]*$/;

        setFormData((prevFormData) => ({
            ...prevFormData,
            pointValue: numberRegex.test(value) ? value : '',
            entryfee: entryFee,
            winningPrice: fees,
        }));

        setLobbyProps((prevLobbyProps) => ({
            ...prevLobbyProps,
            totalEntryFee: (+entryFee + GSTAmount),
        }));
    };

    // useEffect(() => {
    //     if (formData?.entryfee && formData?.noOfPlayer && gameDetails?.isNoOfPlayer && gameMode !== 'Points') {
    //         let fees = ((formData?.entryfee * formData?.noOfPlayer) - ((formData?.entryfee * formData?.noOfPlayer) * `0.${+formData?.platformCommission}`));
    //         setFormData({
    //             ...formData,
    //             winningPrice: fees,
    //         });
    //     }
    // }, [formData?.noOfPlayer])
    //
    // useEffect(() => {
    //     if (formData?.isGST && formData?.entryfee) {
    //         let GSTAmount;
    //         if (formData?.isGST && formData?.isDefaultGST) {
    //             GSTAmount = Math.round((+formData?.entryfee * (+formData?.GSTPercentage)) / 100);
    //         }
    //         if (formData?.isGST && !formData?.isDefaultGST) {
    //             GSTAmount = Math.round((+formData?.entryfee * (+formData?.GSTPercentage)) / 100);
    //         }
    //         setFormData({
    //             ...formData,
    //             totalEntryFee: (+formData?.entryfee + GSTAmount)
    //         });
    //     }
    // }, [formData?.isGST, formData?.GSTPercentage]);
    //
    // useEffect(() => {
    //     let numberOfPlayer = gameDetails?.isNoOfPlayer ? formData?.noOfPlayer ? +formData?.noOfPlayer : +defaultNumberOfPlayer?.numberOfPlayer : +defaultNumberOfPlayer?.numberOfPlayer
    //     if (!formData?.isDefaultPlatformCommission && formData?.entryfee) {
    //         setFormData({
    //             ...formData,
    //             winningPrice: ((formData?.entryfee * numberOfPlayer) - ((formData?.entryfee * numberOfPlayer) * `0.${+formData?.platformCommission}`)),
    //         })
    //     }
    //     if (formData?.isDefaultPlatformCommission && formData?.entryfee) {
    //         setFormData({
    //             ...formData,
    //             winningPrice: ((formData?.entryfee * numberOfPlayer) - ((formData?.entryfee * numberOfPlayer) * `0.${+formData?.platformCommission}`)),
    //         })
    //     }
    // }, [formData?.platformCommission]);

    return(
        <div className={'formData tournament_setting_content'}>
            <h3> Settings
                {/*<Tooltip title={`[Entry Fee x ${gameDetails?.isNoOfPlayer ? formData?.noOfPlayer  ? ` ${formData?.noOfPlayer} ${+formData?.noOfPlayer > 1 ? "Players" : 'Player'}` :` ${+defaultNumberOfPlayer?.numberOfPlayer || 0} ${+defaultNumberOfPlayer?.numberOfPlayer > 1 ? "Players" : 'Player'}` : ` ${+defaultNumberOfPlayer?.numberOfPlayer || 0} ${+defaultNumberOfPlayer?.numberOfPlayer > 1 ? "Players" : 'Player'}` } ] - [${100 - (+formData?.platformCommission || 0)}% commission]`}>*/}
                {/*    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#1976d2" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false">*/}
                {/*        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>*/}
                {/*</Tooltip>*/}
            </h3>
            <PlatformCommission formData={formData} setFormData={setFormData} isReadOnlyEntryFee={isReadOnlyEntryFee} handleChange={handleChange} simpleValidator={simpleValidator} />
            {gameDetails?.gstConfigNew?.isGSTNew && 
                    <div className="formData winning_prize readOnly_field" style={{display:"flex",justifyContent:"space-between"}}>
                    <label>GST Percentage :</label>
                    <div className="emailWrap" style={{width: "80%"}}>
                        <input type="text" name='platformGST' value={`${gameDetails?.gstConfigNew?.platformGST}%`} readOnly={true} />
                    </div>
                </div>
                }
            <div className={'tournament_setting_amount'}>
                <div className={!isReadOnlyEntryFee ? "formData  entryFee-section w_100" : ' formData entryFee-section readOnly_field w_100'}>
                    <div className={'entryFee-section-inner'}>
                        <label> Points Value <span className={'validation-star'}>*</span></label>
                        <div className={"emailWrap"}>
                            <input value={formData?.pointValue} readOnly={isReadOnlyEntryFee} placeholder={'Enter Leaderboard Points'} type={'text'} name={'pointValue'} onChange={(e) => handleChangePointValue(e)} />
                        </div>
                        {simpleValidator.current.message("pointValue", formData.pointValue?.toString(), 'required')}
                    </div>

                    <div className={'entryFee-section-inner dialed-class w_100'}>
                        <label> Minimum Entry Fee
                            <Tooltip title={<>[Points Value * 80]</>} id={'winAmount-toolTip'} placement={'bottom-start'} >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#1976d2" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                            </Tooltip>
                        </label>
                        <div className={"emailWrap readOnly_field"}>
                            <input onWheel={event => event.currentTarget.blur()} value={formData?.entryfee || 0} readOnly={true} placeholder={'Enter Entry Fee'} name={'entryfee'} />
                        </div>
                    </div>

                    {/* {
                        (formData?.isGST && totalEntryFee) ?
                            <div className={formData?.isDefaultPlatformCommission ? "formData leaderboard_field winning_prize readOnly_field w_100" : 'w_100 formData winning_prize leaderboard_field'}>
                                <label>Entry Fee with GST
                                    <Tooltip title={<> <p>The formula for entry fees with GST is, </p> <p> GST= {formData?.GSTPercentage || 0}% GST of Entry fee </p> <p>Total Entry Fee= Entry Fee + GST  </p></>} id={'winAmount-toolTip'} placement={'bottom-start'} >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#1976d2" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                                    </Tooltip>
                                </label>
                                <div className="emailWrap">
                                    <input type="number" onWheel={event => event.currentTarget.blur()} readOnly={true} className={'wrap_input_modal'} value={formData?.totalEntryFee} name='rake' />
                                </div>
                            </div>
                            : ''
                    } */}

                    {/*{*/}
                    {/*   ( formData?.isGST && formData?.totalEntryFee) ? <span className={'marker-entryFee'}>{`Total Entry Fees with  ${formData?.GSTPercentage}% GST are ₹${formData?.totalEntryFee}`}</span> : ''*/}
                    {/*}*/}

                </div>
            </div>
        </div>
    )
}
export default RummyEntryFee