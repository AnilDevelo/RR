import PercentageDropdown from "Components/Dropdown/PercentageDropdown"

const PlatformGST = ({gameDetails,formData,setFormData,simpleValidator,handleChangeCheckbox}) => {
    return(
        <>
           {!gameDetails?.lobbyType?.filter(item => item?._id === formData?.lobbyType)?.[0]?.lobbyType?.toLocaleLowerCase()?.includes('PRACTICE'.split(' ')[0]?.toLowerCase()) &&
  <div className={'common_checkbox_details real_money_field'}>
    <label>Is GST ?</label>
    <div className={'game_mode_btn'}>
      <div className={'game_mode_btn_option yes_radio_btn'}>
        <input type="radio" name='isGST' checked={formData?.isGST} className={'checkbox_field_tournament'} onChange={(e) => handleChangeCheckbox(e, true)} />
        <label>Yes</label>
      </div>
      <div className={'game_mode_btn_option no_radio_btn'}>
        <input type="radio" name={'isGST'} checked={!formData?.isGST} className={'checkbox_field_tournament'} onChange={(e) => handleChangeCheckbox(e, false)} />
        <label>No</label>
      </div>
    </div>
  </div>
}

{formData?.isGST &&
  <div className={'platform-gst-details'}>
    <div className={'common_checkbox_details real_money_field'}>
      <label>Platform GST (%)</label>
      <div className={'game_mode_btn'}>
        <div className={'game_mode_btn_option yes_radio_btn'}>
          <input type="radio" name='isDefaultGST' checked={formData?.isDefaultGST} className={'checkbox_field_tournament'} onChange={(e) => handleChangeCheckbox(e, true)} />
          <label>Default GST</label>
        </div>
        <div className={'game_mode_btn_option no_radio_btn'}>
          <input type="radio" name={'isDefaultGST'} checked={!formData?.isDefaultGST} className={'checkbox_field_tournament'} onChange={(e) => handleChangeCheckbox(e, false)} />
          <label>Customize GST</label>
        </div>
      </div>
    </div>
    {formData?.isDefaultGST ?
      <div className={formData?.isDefaultGST ? "formData leaderboard_field readOnly_field" : 'formData leaderboard_field'}>
        <div className="emailWrap">
          <input type="number" onWheel={event => event.currentTarget.blur()} readOnly={formData?.isDefaultGST} className={'wrap_input_modal'} value={formData?.GSTPercentage} name='GSTPercentage' placeholder={'Enter Platform GST(%)'} onChange={(e) => setFormData({ ...formData, GSTPercentage: e.target.value })} />
        </div>
        {simpleValidator.current.message("PlatformGST", formData?.GSTPercentage, 'required')}
      </div>
      :
      <PercentageDropdown name={'GSTPercentage'} formData={formData} setFormData={setFormData} isDisabled={formData?.GSTPercentage}/>
    }
  </div>
}

        </>
    )
}
export default PlatformGST