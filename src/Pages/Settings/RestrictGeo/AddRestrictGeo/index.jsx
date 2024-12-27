import React, {useCallback, useEffect, useRef, useState} from "react";
import {
    createRestrictGeo,
    getAllStateRestrictGeo,
    getCountriesRestrictGeo,
    updateRestrictGeo
} from "../../../../Redux/settings/action";
import Box from "@material-ui/core/Box";
import FilledButton from "../../../../Components/FileButton";
import {useDispatch} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import {MultiSelect} from "react-multi-select-component";

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


const AddRestrictGeo = ({modalValue,handleOpenModal,redirectApiHandler}) => {
    const dispatch = useDispatch();
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [formData, setFormData] = useState([]);
    const [state, setState] = useState([] );

    useEffect(()=>{
        dispatch(getAllStateRestrictGeo({isoCode: 'IN'})).then(res => {
            setState(res.data.data?.map((item) => { return { value: item?.name, label: item?.name } }) || [] )
        })
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                country: "India",
                gameType: 'All Games',
                states: formData?.map(item => item?.value)
            }
            dispatch(createRestrictGeo(payload)).then((res) => {
                if (res.data.success) {
                    redirectApiHandler()
                    setLoader(false)
                    handleOpenModal('CommonPop', { header: "Success", body: res.data.message })
                } else {
                    setLoader(false)
                    handleOpenModal('CommonPop', { header: "Error", body: res.data.message || res?.data?.msg })
                }
            });
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }

    const handleChangeDropDown = (value) => {
        setFormData(value)
    };
    useEffect(() => {
        if(modalValue?.isEdit){
          setFormData(modalValue?.row?.states?.reduce((acc,cur)=>[...acc,{value: cur, label: cur}],[]) || [])
        }
    },[modalValue?.isEdit])

    // const handleEditSubmit = (e) => {
    //     e.preventDefault();
    //     if (simpleValidator.current.allValid()) {
    //         let payload = {
    //             ...formData,
    //             states: formData?.states?.map(item => item?.value),
    //             restrictGeoId: isEdit?.List?._id
    //         }
    
    //         delete payload?.countryIsoCode;
    //         dispatch(updateRestrictGeo(payload)).then((res) => {
    //             if (res.data.success) {
    //                 setFormData({
    //                     ...formData,
    //                     country: "",
    //                     gameType: 'All Games',
    //                     states: [],
    //                     countryIsoCode: ''
    //                 })
    //                 redirectApiHandler();
    //                 setIsEdit({ ...isEdit, isEditStatus: false, List: [] });
    //                 setLoader(false)
    //                 handleOpenModal('CommonPop', { header: "Success", body: res.data.message })
    //             } else {
    //                 setLoader(false)
    //                 handleOpenModal('CommonPop', { header: "Error", body: res.data.message || res?.data?.msg })
    //             }
    //         });
    //     } else {
    //         simpleValidator.current.showMessages();
    //         forceUpdate();
    //     }
    // };
    return(
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? "Update Restrict Geo" :` Add Restrict Geo`}</h2>
                </div>
                <div className={'add_admin_user_popup_content_pop'}>
                    <form method={'POST'} onSubmit={(e) => handleSubmit(e)}>
                        <label>Select State <span className={'validation-star'}>*</span></label>
                        <div className={'mt_margin'}>
                            <MultiSelect
                                options={state}
                                value={formData}
                                onChange={(e)=>handleChangeDropDown(e)}
                                labelledBy="Select"
                                hasSelectAll={false}
                                className={'inner_popular_game_dropdown all_game_dropdown_details'}
                            />
                        </div>
                        {simpleValidator.current.message("state", formData, "required")}
                        <div className={'formData_btn'}>
                            <button className={'btn_default'} onClick={() => handleOpenModal()}>Cancel</button>
                            <FilledButton type={'submit'} value={"Submit"} className={'loader_css btn'} loading={loader} />
                        </div>
                    </form>
                </div>
            </div>
        </Box>
    )
}
export default AddRestrictGeo