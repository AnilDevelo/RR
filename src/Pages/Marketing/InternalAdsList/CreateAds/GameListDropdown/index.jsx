import Select2 from "react-select2-wrapper";
import React, {useEffect, useState} from "react";
import 'react-select2-wrapper/css/select2.css';

const GameListDropdown = ({name, formData, options, setFormData}) => {
    const [gameMenu, setGameMenu] = useState([])
    const handleChange = (e) => {
        if (e.target.value !== '') {
            setFormData({
                ...formData,
                gameId: e.target.value,
            })
        }
    }

    useEffect(() => {
        let temp = []
        options?.forEach(((item => {
            temp.push({ text: item?.gameName, id: item?._id })
        })))
        setGameMenu(temp)
    }, [options])

    const cbOpen = () => {
        if (document.getElementsByClassName('select2-search__field')[0]) {
            document.getElementsByClassName('select2-search__field')[0].placeholder = 'Search'
        }
    }

    return(
        <>
            <Select2
                name={name}
                data={gameMenu}
                onOpen={cbOpen}
                defaultValue={formData[name]}
                options={{
                    placeholder: 'Select Game',
                }}
                onChange={(e) => handleChange(e)}
                className={'select-7894'}
            />
        </>
    )
}
export default GameListDropdown