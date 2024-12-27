import React from "react";
import Select2 from "react-select2-wrapper";
import 'react-select2-wrapper/css/select2.css';

const StateFilterDropdown = ({option,name,filterData,setFilterData}) => {
    const handleChange = (e) => {
        if(e.target.value){
            setFilterData({
                ...filterData,
                [e.target.name]: e.target.value
            });
        }
    }

    const cbOpen = () => {
        if(document.getElementsByClassName('select2-search__field')[0]) {
            document.getElementsByClassName('select2-search__field')[0].placeholder = 'Search'
        }
    }

    return(
        <Select2
            defaultValue={filterData?.state}
            data={option?.reduce((acc,cur)=> (cur !== 'Dadra and Nagar Haveli and Daman and Diu' && cur !== 'Andaman and Nicobar Islands') ? [...acc,  {text:cur,id:cur}] : acc ,[])}
            name={name}
            onOpen={cbOpen}
            options={{
                placeholder: {
                    id: '-1',
                    text: 'All States'
                }
            }}
            onChange={handleChange}
            className={'select-7894'}
        />
    )
}
export default StateFilterDropdown