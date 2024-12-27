
import React, { useEffect, useState } from "react";
import Select2 from "react-select2-wrapper";
import 'react-select2-wrapper/css/select2.css';

const CountryDropdown = ({ options, name, formData, setFormData }) => {
    const [gameMenu, setGameMenu] = useState([])
    const handleChange = (e) => {
        if (e.target.value !== '') {
            setFormData({
                ...formData,
                country: e.target.value,
                countryIsoCode: options?.filter(item => item?.label === e.target.value)?.[0]?.isoCode
            })
        }
    }
    useEffect(() => {
        let temp = []
        options?.forEach(((item => {
            temp.push({ text: item?.label, id: item?.label })
        })))
        setGameMenu(temp)
    }, [options])


    const cbOpen = () => {
        if (document.getElementsByClassName('select2-search__field')[0]) {
            document.getElementsByClassName('select2-search__field')[0].placeholder = 'Search'
        }
    }
    return (
        <Select2
            defaultValue={formData?.country}
            data={gameMenu}
            name={name}
            onOpen={cbOpen}
            options={{
                placeholder: {
                    id: '-1',
                    text: 'Select an option'
                }
            }}
            onChange={(e) => handleChange(e)}
            className={'select-7894'}
        />
    )
}
export default CountryDropdown