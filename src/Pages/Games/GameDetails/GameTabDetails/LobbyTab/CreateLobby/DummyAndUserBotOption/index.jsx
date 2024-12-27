const DummyAndUserBotOption = ({ formData, setFormData, handleChange, simpleValidator, gameModeName }) => {

    return(
        <>
            <div className={'d_flex_start'}>
                {/* <div className={'w_100 mr_1'}>
                    <div className={'common_checkbox_details real_money_field '}>
                        <label>Is Dummy Player?</label>
                        <div className={'game_mode_btn'}>
                            <div className={'game_mode_btn_option yes_radio_btn'}>
                                <input type={'radio'} name={'isDummyPlayer'} checked={formData?.isDummyPlayer} onChange={(e) => setFormData({ ...formData, isDummyPlayer: true })} />
                                <label>Yes</label>
                            </div>
                            <div className={'game_mode_btn_option no_radio_btn'}>
                                <input type={'radio'} name={'isDummyPlayer'} checked={!formData?.isDummyPlayer} onChange={(e) => setFormData({ ...formData, isDummyPlayer: false, dummyPlayerStartPoint:'' })} />
                                <label>No</label>
                            </div>
                        </div>
                    </div>
                    {
                        formData?.isDummyPlayer &&
                        <div className="formData mt_15  ">
                            <label>Dummy Player Start Point <span className={'validation-star mll'}> *</span></label>
                            <div className="emailWrap">
                                <input type="number"  onWheel={(e)=> e?.currentTarget?.blur()} name='dummyPlayerStartPoint' value={formData?.dummyPlayerStartPoint } placeholder={'Enter Dummy Player Start Point'} onChange={(e) => {
                                    const { value, name } = e.target;

                                    setFormData({ ...formData, dummyPlayerStartPoint: /^0/.test(value) ? value.replace(/^0/, "") : value?.replace(/[^\w ]/g, '') })
                                }} />
                            </div>
                            {simpleValidator.current.message("dummyPlayerStartPoint", formData?.dummyPlayerStartPoint?.toString(), 'required|min:1|max:10|numeric')}
                        </div>
                    }
                </div>
                <div className={'common_checkbox_details real_money_field'}>
                    <label>Use Bot  </label>
                    <div className={'game_mode_btn'}>
                        <div className={'game_mode_btn_option yes_radio_btn'}>
                            <input type="radio" name='isUseBot' checked={formData?.isUseBot} className={'checkbox_field_tournament'} onChange={(e) => handleChange(e, true)}  />
                            <label>Yes</label>
                        </div>
                        <div className={'game_mode_btn_option no_radio_btn'}>
                            <input type="radio" name={'isUseBot'} checked={!formData?.isUseBot} className={'checkbox_field_tournament'} onChange={(e) => handleChange(e, false)}  />
                            <label>No</label>
                        </div>
                    </div>
                </div> */}
                {
                   ( gameModeName === '101 Pool'|| gameModeName === '201 Pool' || gameModeName === 'Pool Rummy' ) &&
                   <div className={'common_checkbox_details real_money_field'}>
                       <label>Auto Split</label>
                       <div className={'game_mode_btn'}>
                           <div className={'game_mode_btn_option yes_radio_btn'}>
                               <input type="radio" name='isAutoSplit' checked={formData?.isAutoSplit} className={'checkbox_field_tournament'} onChange={(e) => handleChange(e, true)}  />
                               <label>Yes</label>
                           </div>
                           <div className={'game_mode_btn_option no_radio_btn'}>
                               <input type="radio" name={'isAutoSplit'} checked={!formData?.isAutoSplit} className={'checkbox_field_tournament'} onChange={(e) => handleChange(e, false)}  />
                               <label>No</label>
                           </div>
                       </div>
                   </div>
                }
            </div>
        </>
    )
}
export default DummyAndUserBotOption