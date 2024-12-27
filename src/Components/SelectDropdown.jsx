import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
    margin: {
        minWidth: '100%',
        margin: '0'
    },
}));
const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
            width: "100%"
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 14,
        padding: '15px 26px 15px 12px',
        textTransform: 'capitalize',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#1976d2',
            outlineWidth: '1px',
            boxShadow: 'none',
            outline: '1px solid #1976d2'
        },
    },
    svg: {
        right: '11px'
    }
}))(InputBase);

export default function ControlledOpenSelect({ name, options, formData, setFormData, handleOpenModal,placeholder }) {
    const classes = useStyles();
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    };
    const handleChangeGenre = (event) => {
        let generKey = options?.filter(item=>item?.genreName === event?.target?.value)?.reduce((acc,cur)=> {return {...cur}},{});
       setFormData({ ...formData, genre: event?.target?.value, gameGenreKey: generKey});
    }

    const handleChangeGame = (event) => {
        let generKey = options?.filter(item => item?.gameName === event?.target?.value)?.reduce((acc, cur) => { return { ...cur } }, {});
       setFormData({ ...formData, game: generKey?.gameName , gameId:generKey?._id ,gameGenreKey: generKey?.gameName});
    }

    const handleChangeSubMode = (event) => {
        let gameSubmodeKey = options?.filter(item => item?.gameModeName === event?.target?.value)?.reduce((acc, cur) => { return { ...cur } }, {});
       setFormData({ ...formData, gameModeId:gameSubmodeKey?._id, isGameModeOption:gameSubmodeKey?._id ? true : false,gameSubmode: gameSubmodeKey?.gameModeName});
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                {
                    name === 'genre' &&
                    <Select
                        name={name}
                        value={formData[name]}
                        onChange={handleChangeGenre}
                        className={'select-dropdown-main filter_dropdown_list'}
                        input={<BootstrapInput />}
                        displayEmpty
                        inputProps={{ "aria-label": "Select option" }}
                        renderValue={(selected) => {
                        if (selected === "") {
                            return <p style={{ color: "gray" }}>{placeholder}</p>;
                        }
                        return selected;
                        }}
                    >
                        {
                                options?.map((menu, i) => {
                                return <MenuItem className={'filter_dropdown_list'} key={i} value={menu?.genreName} >{menu?.genreName}</MenuItem>
                            })
                        }
                        {/*<MenuItem value={''}> <li onClick={() => handleOpenModal('AddGenrePopup')} className={'add_genre_active'}>+ Add Genre</li></MenuItem>*/}
                    </Select>
                }
                {
                    name === 'game' &&
                    <Select
                        name={name}
                        value={formData?.game}
                        onChange={handleChangeGame}
                        className={'select-dropdown-main filter_dropdown_list'}
                        input={<BootstrapInput />}
                        displayEmpty
                        inputProps={{ "aria-label": "Select option" }}
                        renderValue={(selected) => {
                        if (selected === "") {
                            return <p style={{ color: "gray" }}>{placeholder}</p>;
                        }
                        return selected;
                        }}
                    >
                        {
                                options?.map((menu, i) => {
                                return <MenuItem className={'filter_dropdown_list'} key={i} value={menu?.gameName} >{menu?.gameName}</MenuItem>
                            })
                        }
                    </Select>
                }
                {
                    name === 'gameSubmode' &&
                    <Select
                        name={name}
                        value={formData?.gameSubmode}
                        onChange={handleChangeSubMode}
                        className={'select-dropdown-main filter_dropdown_list'}
                        input={<BootstrapInput />}
                        displayEmpty
                        inputProps={{ "aria-label": "Select option" }}
                        renderValue={(selected) => {
                        if (selected === "") {
                            return <p style={{ color: "gray" }}>{placeholder}</p>;
                        }
                        return selected;
                        }}
                    >
                        {
                                options?.map((menu, i) => {
                                return <MenuItem className={'filter_dropdown_list'} key={i} value={menu?.gameModeName} >{menu?.gameModeName}</MenuItem>
                            })
                        }
                    </Select>
                }
                {
                    name === 'engine' &&
                    <Select
                        name={name}
                        value={formData?.engine}
                        onChange={handleChange}
                        className={'select-dropdown-main filter_dropdown_list'}
                        input={<BootstrapInput />}
                        displayEmpty
                        inputProps={{ "aria-label": "Select option" }}
                        renderValue={(selected) => {
                        if (selected === "") {
                            return <p style={{ color: "gray" }}>{placeholder}</p>;
                        }
                        return selected;
                        }}
                    >
                        {
                            options?.map(menu => {
                                return <MenuItem className={'filter_dropdown_list'} value={menu}>{menu}</MenuItem>
                            })
                        }
                    </Select>
                }
                {
                    name === 'format' &&
                    <Select
                        name={name}
                        value={formData?.format}
                        onChange={handleChange}
                        className={'select-dropdown-main filter_dropdown_list'}
                        input={<BootstrapInput />}
                    >
                        <MenuItem value="Live Multiplayer (Sync)">
                            <div className={'select_multiple_menu'}>
                                <h2>Live Multiplayer (Sync)</h2>
                                <p>These are Sync games, there only syncs the score <br /> between competitors or is a turn based game.</p>
                            </div>
                        </MenuItem>
                        <MenuItem value={'Score Submission (Async)'}>
                            <div className={'select_multiple_menu'}>
                                <h2>Score Submission (Async)</h2>
                                <p>These are Async games, where there is a real <br /> time interaction between the competitors.</p>
                            </div>
                        </MenuItem>
                    </Select>
                }
            </FormControl>
        </div>
    );
}