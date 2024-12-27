import Tooltip from "@mui/material/Tooltip";
import PlatformCommission from "./PlatformCommission";
import {useEffect} from "react";

const LobbyEnterFee = ({ gameDetails, formData, lobbyProps, setFormData, simpleValidator, handleChange, setLobbyProps }) => {

        const { defaultNumberOfPlayer, isReadOnlyEntryFee } = lobbyProps;
    const handleEntryFeeChange = (e) => {
        const { name, value } = e.target;
        let numberOfPlayer = gameDetails?.isNoOfPlayer ? formData?.noOfPlayer ? +formData?.noOfPlayer : +defaultNumberOfPlayer?.numberOfPlayer : +defaultNumberOfPlayer?.numberOfPlayer
        let fees = ((value * numberOfPlayer) - ((value * numberOfPlayer) * `0.${+formData?.platformCommission}`));
        let GSTAmount;
        if (formData?.isGST && formData?.isDefaultGST) {
            GSTAmount = (+value * (+formData?.GSTPercentage)) / 100;
        }

        if (formData?.isGST && !formData?.isDefaultGST) {
            GSTAmount = (+value * (+formData?.GSTPercentage)) / 100;
        }
        setFormData({
            ...formData,
            entryfee: value.replace("-",""),
            winningPrice: fees,
        });
    };

    useEffect(() => {
        if (formData?.entryfee && formData?.noOfPlayer && gameDetails?.isNoOfPlayer) {
             //GST Calculation start
            let totalFees = Number(formData?.entryfee) * Number(formData?.noOfPlayer)
            let fees = totalFees - (totalFees * Number(formData?.platformCommission) / 100)
            //GST Calculation End
            // let fees = (((+formData?.entryfee) * (+formData?.noOfPlayer)) - (((+formData?.entryfee) * (+formData?.noOfPlayer)) * `0.${+formData?.platformCommission}`));
            setFormData({ ...formData, winningPrice: fees, });
        } 
    }, [formData?.noOfPlayer])

    useEffect(() => {
        // let numberOfPlayer = gameDetails?.isNoOfPlayer ? formData?.noOfPlayer ? +formData?.noOfPlayer : +defaultNumberOfPlayer?.numberOfPlayer : +defaultNumberOfPlayer?.numberOfPlayer
        if (!formData?.isDefaultPlatformCommission && formData?.entryfee) {
            //GST Calculation start
            let totalFees = Number(formData?.entryfee) * Number(formData?.noOfPlayer)
            let fees = totalFees - (totalFees * Number(formData?.platformCommission) / 100)
            //GST Calculation End
            setFormData({
                ...formData,
                winningPrice:fees,
                // winningPrice: ((formData?.entryfee * numberOfPlayer) - ((formData?.entryfee * numberOfPlayer) * `0.${+formData?.platformCommission}`)),
            })
        }
        if (formData?.isDefaultPlatformCommission && formData?.entryfee) {
            //GST Calculation start
            let totalFees = Number(formData?.entryfee) * Number(formData?.noOfPlayer)
            let fees = totalFees - (totalFees * Number(formData?.platformCommission) / 100)
            //GST Calculation End
            setFormData({
                ...formData,
                winningPrice:fees,
                // winningPrice: ((formData?.entryfee * numberOfPlayer) - ((formData?.entryfee * numberOfPlayer) * `0.${+formData?.platformCommission}`)),
            })
        }
    }, [formData?.platformCommission,formData?.isDefaultPlatformCommission]);
    
    return(
        <>
            <div className={'formData tournament_setting_content'}>
                <h3> Settings
                </h3>
                <div className={'tournament_setting_amount'}>
                    <div className={ !isReadOnlyEntryFee ? "formData  entryFee-section" : ' formData  readOnly_field' }>
                        <div className={'entryFee-section-inner'}>
                            <label>Entry Fee <span className={'validation-star mll'}>*</span>
                            </label>
                            <div className={"emailWrap"} >
                                <input style={{marginBottom:"0px"}} onWheel={event => event.currentTarget.blur()} value={formData?.entryfee} readOnly={lobbyProps?.isReadOnlyEntryFee}  placeholder={'Enter Entry Fee'} type={'number'} name={'entryfee'} onChange={(e)=>handleEntryFeeChange(e)}  />
                            </div>
                            { simpleValidator.current.message("entryFee", formData.entryfee?.toString(), 'required|min:0|max:10|numeric')}
                        </div>
                        {
                            ( formData?.isGST && formData?.totalEntryFee) &&
                                <div className={formData?.isDefaultPlatformCommission ? "w_100 leaderboard_field readOnly_field" : 'w_100 leaderboard_field'}>
                                    <label>Entry Fee with GST</label>
                                    <div className="emailWrap">
                                        <input type="number" onWheel={event => event.currentTarget.blur()} readOnly={true} className={'wrap_input_modal'} value={formData?.totalEntryFee} name='rake' />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <PlatformCommission formData={formData} setFormData={setFormData} isReadOnlyEntryFee={isReadOnlyEntryFee} handleChange={handleChange} simpleValidator={simpleValidator} />
                <div className="formData winning_prize readOnly_field">
                    <label>Winning Prize Amount <span className={'validation-star mll'}>*</span>
                    <Tooltip
                    title={
                        <div>
                        <p>
                            Total boot amount = (Entry Fees * Number Of Player)
                        </p>
                        <p>
                            Commission = {formData?.platformCommission || 0}% of Total boot</p>
                        <p>
                            Win Amount = (Total boot - Commission)
                        </p>
                        </div>
                    }
                    id={'winAmount-toolTip'}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#1976d2" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    </Tooltip>
                    </label>
                    <div className="emailWrap">
                        <input type="text" name='winningPrice' value={(formData?.winningPrice).toFixed(2)} readOnly={true} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default LobbyEnterFee