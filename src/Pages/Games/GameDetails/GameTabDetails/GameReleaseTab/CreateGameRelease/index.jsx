import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { MultiSelect } from "react-multi-select-component";
import FilledButton from "../../../../../../Components/FileButton";
import { getAllCountriesRestrictGeo } from "../../../../../../Redux/settings/action";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from "@mui/material/TextField";
import moment from "moment";
import { createGameReleaseList, updateGameReleaseList } from "../../../../../../Redux/games/action";
import PercentageDropdown from "Components/Dropdown/PercentageDropdown";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};

const CreateGameRelease = ({ modalValue, handleOpenModal }) => {
    const dispatch = useDispatch();
    const gameDetails = useSelector(state => state?.gameReducer?.gameDetails);
    const [selected, setSelected] = useState([]);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [formData, setFormData] = useState({ isAvailableAllCountry: false, countryAvailability: [], releasePercentage: '', realeaseDate: '' });
    const [, updateState] = useState({});
    const [loader, setLoader] = useState(false);
    const forceUpdate = useCallback(() => updateState({}), []);
    const [openCale, setOpenCale] = useState(false)
    const geoData = useSelector(state => state?.settingReducer?.restrictedGeo);

    useEffect(() => {
        dispatch(getAllCountriesRestrictGeo({}));
    }, []);

    const getCountryData = () => {
        return geoData?.country?.map((item) => { return { value: item, label: item } }) || [];
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                countryAvailability: selected?.map(item => item.label),
                realeaseDate: moment(formData?.realeaseDate).format('YYYY-MM-DD'),
                gameId: gameDetails?._id,
                publisherId: gameDetails?.publisherId?._id,
            }
            if (selected?.length === geoData?.country?.length) {
                payload = {
                    ...payload,
                    isAvailableAllCountry: true,
                    countryAvailability: []
                }
            }
            setLoader(true)
            dispatch(createGameReleaseList(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    setFormData({
                        isAvailableAllCountry: false,
                        countryAvailability: [],
                        releasePercentage: '',
                        realeaseDate: ''
                    });
                    modalValue?.redirectApiProps();
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                } else {
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message || res?.data?.msg })
                }
            });
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                countryAvailability: selected?.map(item => item.label),
                realeaseDate: moment(formData?.realeaseDate).format('YYYY-MM-DD'),
                gameId: gameDetails?._id,
                publisherId: gameDetails?.publisherId?._id,
            }
            if (selected?.length === geoData?.country?.length) {
                payload = {
                    ...payload,
                    isAvailableAllCountry: true,
                    countryAvailability: []
                }
            }
            setLoader(true)
            dispatch(updateGameReleaseList(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    setFormData({
                        isAvailableAllCountry: false,
                        countryAvailability: [],
                        releasePercentage: '',
                        realeaseDate: ''
                    });
                    modalValue?.redirectApiProps();
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                } else {
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message || res?.data?.msg })
                }
            });
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }

    };

    useEffect(() => {
        if (modalValue?.isEdit) {
            setFormData({
                ...formData,
                realeaseDate: modalValue?.data?.realeaseDate,
                releasePercentage: modalValue?.data?.releasePercentage
            });
            if (modalValue?.data?.isAvailableAllCountry) {
                setSelected(getCountryData())
            } else {
                const tempArray = (modalValue?.data?.countryAvailability || []).reduce((acc, cur) => [...acc, { label: cur, value: cur }], []);

                setSelected(tempArray)
            }

        }
    }, [modalValue]);
    const handleDatePicker = (newValue) => {
        setFormData({
            ...formData,
            realeaseDate: newValue
        })
        setOpenCale(false);
    };

    return (
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup game_release_section_modal'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? `Update Game Release` : `Create Game Release`}</h2>
                </div>
                <div className={'add_admin_user_popup_content'}>
                    <form method={'POST'} onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className="formData">
                            <label>Release Stage (%) </label>
                            <div className="text_Wrap emailWrap ">
                            <PercentageDropdown name={'releasePercentage'} formData={formData} setFormData={setFormData} />
                            </div>
                            {simpleValidator.current.message("releaseStage", formData?.releasePercentage, 'required')}
                        </div>
                        <div className='country-user-details '>
                            <label>Country Availability</label>
                            <MultiSelect
                                value={selected}
                                options={getCountryData()}
                                selected={selected}
                                onChange={setSelected}
                                labelledBy={"Select"}
                                className={"select_game_release"}
                            />
                            {simpleValidator.current.message("CountryAvailability", selected, 'required')}
                        </div>
                        <div className={'Add-sdk-form-sec'}>
                            <div className={'game_release_section_date'}>
                                <label className={'date-lable'}>Release Start Date</label>
                                <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    <DatePicker
                                        name='start-date'
                                        className={'date-picker-section'}
                                        value={formData?.realeaseDate}
                                        onChange={(newValue) => handleDatePicker(newValue)}
                                        open={openCale}
                                        onClose={() => setOpenCale(false)}
                                        inputFormat="MMM dd, yyyy"
                                        minDate={new Date()}
                                        renderInput={(params) => <TextField {...params} onClick={() => setOpenCale(!openCale)} />}
                                        inputProps={{ readOnly: true }}
                                    />
                                </LocalizationProvider>
                                {simpleValidator.current.message("Release Date", formData?.realeaseDate, "required")}
                            </div>
                        </div>
                        <div className={'formData_btn'}>
                            <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                            <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'btn loader_css'} loading={loader} />
                        </div>
                    </form>
                </div>
            </div>
        </Box>
    )
}
export default CreateGameRelease;