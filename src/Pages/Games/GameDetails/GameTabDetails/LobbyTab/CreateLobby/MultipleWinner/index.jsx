import MultipleWinnerDropDown from "./MultipleWinnerDropDown";
import {useEffect} from "react";

const MultipleWinner = ({formData,handleChange, gameDetails, setFormData, simpleValidator, handleOpenErrorModal,lobbyProps }) => {

    const winnerMultipleHandler = (e, index) => {
        let temp = [...formData?.pricePool];
        let total = formData?.pricePool?.reduce((acc,cur, i)=> i === index ? acc :  +acc + (+cur?.winningPrice), 0);
        let numberRegex = /^[0-9]+(\.[0-9]*)?$/;
        if ((+total + (+e.target.value || 0)) > formData.winningPrice) {
            temp[index]  = '';
            setFormData({
                ...formData,
                pricePool : temp
            })
            handleOpenErrorModal('CommonPop', { header: "Error", body: 'Please Enter multiple Winner prize Less Than OR equal Winning Prize Amount ' });
            return;
        }
        if(e.target.value ){
            temp[index] = { ...temp[index] ,rank : index + 1, winningPrice : numberRegex.test(e.target.value) ? e.target.value : ''   };
            setFormData({
                ...formData,
                pricePool : temp
            })
        }else{
            temp[index]  = ''
            setFormData({
                ...formData,
                pricePool : temp
            })
        }
    };

    useEffect(()=>{
        if(formData?.isMultiWinner && formData?.multiWinner && formData?.pricePool?.length <=0){
            setFormData({
                ...formData,
                pricePool: formData?.multiWinner && Array.from(Array(+formData?.multiWinner)).fill('')
            })
        }
    },[formData?.multiWinner]);

    return(
        <>
            <div className={'common_checkbox_details real_money_field'}>
                <label>Is Multiple Winner ?</label>
                <div className={'game_mode_btn'}>
                    <div className={'game_mode_btn_option yes_radio_btn'}>
                        <input type="radio" name='isMultiWinner' checked={formData?.isMultiWinner} className={'checkbox_field_tournament'} onChange={(e) => handleChange(e, true)} />
                        <label>Yes</label>
                    </div>
                    <div className={'game_mode_btn_option no_radio_btn'}>
                        <input type="radio" name={'isMultiWinner'} checked={!formData?.isMultiWinner} className={'checkbox_field_tournament'} onChange={(e) => handleChange(e, false)} />
                        <label>No</label>
                    </div>
                </div>
            </div>
            {
                formData?.isMultiWinner &&
                <>
                    <div className={ 'formData leaderboard_field'}>
                        <label> Multiple Winner <span className={'validation-star mll'}> *</span></label>
                        <div className="emailWrap mt_margin">
                            <MultipleWinnerDropDown name={'multiWinner'} formData={formData} setFormData={setFormData} gameDetails={gameDetails} defaultNumberOfPlayer={lobbyProps?.defaultNumberOfPlayer} placeholder={"Select Multiple Winner"}/>
                        </div>
                        {simpleValidator.current.message("multiple Winner", formData?.multiWinner, 'required')}
                    </div>
                    {
                        formData?.pricePool?.length > 0 &&
                        formData?.pricePool?.map((element,i)=>{
                            return(
                                <div className="formData leaderboard_field">
                                    <label>{`Winner ${i + 1} Prize Amount`} <span className={'validation-star mll'}> *</span></label>
                                    <div className="emailWrap">
                                        <input type="text"  className={'wrap_input_modal'} value={element?.winningPrice !== undefined ? element?.winningPrice : '' } name='leaderboardScore' placeholder={'Enter Winner Prize Amount'} onChange={(e) => winnerMultipleHandler(e, i)} />
                                    </div>
                                    {simpleValidator.current.message("winnerPrize", element?.winningPrice, 'required')}
                                </div>
                            )
                        })
                    }
                </>
            }
        </>
    )
}
export default MultipleWinner