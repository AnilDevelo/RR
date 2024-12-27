import PlatformCommission from "../LobbyEnterFee/PlatformCommission";
import Tooltip from "@mui/material/Tooltip";
import React from "react";

const PokerEntryFee = ({ gameDetails, formData, lobbyProps, setFormData, simpleValidator, handleChange, setLobbyProps }) => {
    const { defaultNumberOfPlayer, isReadOnlyEntryFee } = lobbyProps;


    return(
        <div className={'formData tournament_setting_content game_poker_section_details'}>
            <h3> Settings</h3>
            <PlatformCommission formData={formData} setFormData={setFormData} isReadOnlyEntryFee={isReadOnlyEntryFee} handleChange={handleChange} simpleValidator={simpleValidator} />
             {/* New GST Flow Start */}
            {gameDetails?.gstConfigNew?.isGSTNew && 
                    <div className="formData winning_prize readOnly_field" style={{display:"flex",justifyContent:"space-between"}}>
                    <label>GST Percentage :</label>
                    <div className="emailWrap" style={{width: "80%"}}>
                        <input type="text" name='platformGST' value={`${gameDetails?.gstConfigNew?.platformGST}%`} readOnly={true} />
                    </div>
                </div>
            }
             {/* New GST Flow End */}
            <div className={'tournament_setting_amount'}>
                <div className={"formData  entryFee-section w_100"  }>
                    <div className={'entryFee-section-inner'}>
                        <label> Small Blinds <span className={'validation-star'}> *</span></label>
                        <div className={!isReadOnlyEntryFee ? "formData  entryFee-section" : ' formData  readOnly_field' }>
                            <input  placeholder={'Enter Small Blinds'} type={'text'} readOnly={isReadOnlyEntryFee} value={formData?.minEntryFee} name={'minEntryFee'}  onChange={(e)=>{
                                const { name, value } = e.target;
                                let numberRegex = /^[0-9]*\.?[0-9]*$/;
                                setFormData({
                                    ...formData,
                                    minEntryFee: numberRegex.test(value) ? value : ''
                                })
                            }}  />
                        </div>
                        {simpleValidator.current.message("minEntryFee", formData.minEntryFee?.toString(), 'required')}
                    </div>

                    <div className={'entryFee-section-inner dialed-class w_100'}>
                        <label> Big Blinds<span className={'validation-star'}> *</span></label>
                        <div className={!isReadOnlyEntryFee ? "formData  entryFee-section" : ' formData  readOnly_field' }>
                            <input  placeholder={'Enter Big Blinds'} value={formData?.maxEntryFee} readOnly={isReadOnlyEntryFee} type={'text'} name={'maxEntryFee'} onChange={(e)=>{
                                const { name, value } = e.target;
                                let numberRegex = /^[0-9]*\.?[0-9]*$/;
                                setFormData({
                                    ...formData,
                                    maxEntryFee: numberRegex.test(value) ? value : '',
                                    stakesAmount: numberRegex.test(value) ? +e.target.value * 10 : '' ,
                                    entryfee: numberRegex.test(value) ? +e.target.value * 10 : '',
                                    winningPrice:numberRegex.test(value) ? +e.target.value * 10 : '',
                                });

                                if(!lobbyProps?.lobbyTypeString?.includes('PRACTICE')){
                                    setLobbyProps({
                                        ...lobbyProps,
                                        maxEntryFeeError: +value < +formData?.minEntryFee
                                    })
                                }else {
                                    setLobbyProps({
                                        ...lobbyProps,
                                        maxEntryFeeError: false
                                    })
                                }
                            }}/>
                        </div>
                        { simpleValidator.current.message("maxEntryFee", formData.maxEntryFee?.toString(), 'required')}
                        {(lobbyProps?.maxEntryFeeError && formData?.maxEntryFee) ? <p className={'srv-validation-message'}>Please enter max entry fee greater than min entry fee</p> : ''}
                    </div>
                    <div className={"formData leaderboard_field winning_prize readOnly_field w_100" }>
                        <label> Entry Fee
                            <Tooltip title={<>[Big Blinds Fee * 10]</> } id={'winAmount-toolTip'} placement={'bottom-start'}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#1976d2" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                            </Tooltip>
                        </label>
                        <div className="emailWrap" style={{marginTop:"1rem"}}>
                            <input type="text" value={formData?.stakesAmount} placeholder={'Enter Entry Fee'} readOnly={true} className={'wrap_input_modal'}  name='entryfee' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokerEntryFee