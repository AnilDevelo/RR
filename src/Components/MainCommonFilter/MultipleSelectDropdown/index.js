import React, {useEffect} from "react";
import Select2 from "react-select2-wrapper";
import {MultiSelect} from "react-multi-select-component";

const MultipleSelectDropdown = ({options, name, filterData, setFilterData}) => {
    useEffect(()=>{
        if(filterData?.multi?.length === options?.length){
            let textId = document?.getElementsByClassName('dropdown-heading-value')[0].getElementsByTagName('span');
            textId[0].innerHTML = 'All status are selected.'
        }
    },[filterData?.multi])
    return(
        <>
            <div className={'game_history_filter_details'}>
                <MultiSelect
                    options={(options?.reduce((acc,cur)=>[...acc,{value: cur, label: cur}],[]) || [])}
                    value={filterData?.multi}
                    onChange={(value)=>  {
                        if(value?.length <= 0){
                            setFilterData({...filterData, multi:[{value: 'Entry Fees', label: 'Entry Fees'}, ...value?.filter(item=> item?.label !== 'Entry Fees')]})
                        }else {
                            setFilterData({...filterData, multi:value})
                        }
                    }}
                    labelledBy="Select"
                    hasSelectAll={false}
                    className={'inner_popular_game_dropdown all_game_dropdown_details'}
                />
            </div>
        </>
    )
}
export default MultipleSelectDropdown