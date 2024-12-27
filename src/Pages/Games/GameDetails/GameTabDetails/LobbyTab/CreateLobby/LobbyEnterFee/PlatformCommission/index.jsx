import PlatformCommissionDropdown from "Components/Dropdown/PlatformCommissionDropdown";

const PlatformCommission = ({formData, isReadOnlyEntryFee, handleChange, simpleValidator, setFormData}) => {
    return(
        <div className={'platform-gst-details'}>
            <div className={'common_checkbox_details real_money_field'}>
                <label>Platform Commission (%) <span className={'validation-star mll'}>*</span></label>
                <div className={'game_mode_btn'}>
                    <div className={'game_mode_btn_option yes_radio_btn'}>
                        <input type="radio" name='isDefaultPlatformCommission' checked={formData?.isDefaultPlatformCommission} disabled={isReadOnlyEntryFee}  className={'checkbox_field_tournament'} onChange={(e) => handleChange(e, true, 'isDefault')}  />
                        <label>Default Commission </label>
                    </div>
                    <div className={'game_mode_btn_option no_radio_btn'}>
                        <input type="radio" name={'isDefaultPlatformCommission'} checked={!formData?.isDefaultPlatformCommission} disabled={isReadOnlyEntryFee} className={'checkbox_field_tournament'} onChange={(e) => handleChange(e, false)}  />
                        <label>Customize Commission</label>
                    </div>
                </div>
            </div>
            <div className={formData?.isDefaultPlatformCommission ? "formData leaderboard_field readOnly_field" : 'formData leaderboard_field'}>
                <PlatformCommissionDropdown name={'platformCommission'} formData={formData} setFormData={setFormData} isDisabled={formData?.isDefaultPlatformCommission}/>
                {simpleValidator.current.message("platformCommission", formData?.platformCommission, 'required')}
            </div>
        </div>
    )
}
export default PlatformCommission