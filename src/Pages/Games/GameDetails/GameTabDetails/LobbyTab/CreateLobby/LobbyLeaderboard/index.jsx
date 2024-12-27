import React from "react";

const LobbyLeaderboard = ({formData, setFormData, handleChange, simpleValidator, gameMode}) => {

    const leaderboardScoreHandler = (e, index) => {
        const inputValue = e.target.value;
        const sanitizedValue = inputValue
          .replace(/^0+/g, '') // Remove leading zeros
          .replace(/[^0-9.]/g, ''); // Remove non-numeric characters except for decimal point '.'
        let temp = [...formData?.leaderboardScores];
        temp[index] = sanitizedValue;
        setFormData({
          ...formData,
          leaderboardScores: temp
        });
      };
      

    return(
        <>
            <div className={'common_checkbox_details real_money_field mt_margin'}>
                <label>Is Leaderboard Score ? <span className={'validation-star mll'}>*</span></label>
                <div className={'game_mode_btn'}>
                    <div className={'game_mode_btn_option yes_radio_btn'}>
                        <input type="radio" name='isLeaderboardScoreOn' checked={formData?.isLeaderboardScoreOn} className={'checkbox_field_tournament'} onChange={(e) => handleChange(e, true, 'leaderboard')} />
                        <label>Yes</label>
                    </div>
                    <div className={'game_mode_btn_option no_radio_btn'}>
                        <input type="radio" name={'isLeaderboardScoreOn'} checked={!formData?.isLeaderboardScoreOn} className={'checkbox_field_tournament'} onChange={(e) => handleChange(e, false, 'leaderboard')} />
                        <label>No</label>
                    </div>
                </div>
            </div>
            {

                (formData?.isLeaderboardScoreOn &&  gameMode === 'Points')?
                    <div className="formData leaderboard_field">
                        <label>Leaderboard Value <span className={'validation-star mll'}>*</span></label>
                        <div className="emailWrap">
                            <input type="text"  className={'wrap_input_modal'} value={ formData?.leaderboardPoints} name='leaderboardPoints' placeholder={'Enter leader board Value'}  onChange={(e)=>handleChange(e)} />
                        </div>
                        {simpleValidator.current.message("leaderboardPoints", formData?.leaderboardPoints?.toString(), 'required')}
                    </div>
                    :
                    formData?.isLeaderboardScoreOn && formData?.leaderboardScores?.map((element,i)=>{
                    return(
                        <div className="formData leaderboard_field">
                            <label>{`${i + 1} Rank Leaderboard Multiplication Score (ex. 1, 2, 3, 4, 5)`} <span className={'validation-star mll'}>*</span></label>
                            <div className="emailWrap">
                                <input type="text" onWheel={event => event.currentTarget.blur()} className={'wrap_input_modal'} value={element} name='leaderboardScore' placeholder={'Enter leader board Rank score'} onChange={(e) => leaderboardScoreHandler(e, i)} />
                            </div>
                            {simpleValidator.current.message("leaderboardScore", element?.toString(), 'required|min:0|max:10')}
                        </div>
                    )
                })
            }
        </>
    )
}
export default LobbyLeaderboard