import {Box} from "@mui/material";
import FilledButton from "../../../../Components/FileButton";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {MultiSelect} from "react-multi-select-component";
import {useDispatch} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import {getGameForPopularGamesList, updatePopularGame} from "../../../../Redux/popularGames/action";

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

const CreateCustomizeGameList = ({modalValue,handleOpenModal,redirectApiHandler}) => {
    const dispatch = useDispatch();
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [formData, setFormData] = useState([]);
    const [category, setCategory] = useState([]);
    const handleChangeDropDown = (value) => {
        if(value?.length <= 15) {
            setFormData(value);
        }else{
            handleOpenModal('CommonPop', { header: "Error", body: 'Select Maximum 15th games' });
        }
    };


    useEffect(()=>{
        dispatch(getGameForPopularGamesList({isDefault:true})).then(res=>{
            if(res.data.success){
                let tempArray = []
                res.data.data?.forEach(ele => {
                    tempArray.push({
                        label: ele.gameName,
                        value: ele?._id,
                    }); 
                });
                setCategory(tempArray)
            }
        });
    },[modalValue]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                isDefault:modalValue?.isDefaultGameList || false,
                popularGames: formData?.map(item=> item?.value)
            };

            // if(modalValue?.popularGame?.length > 0){
            //     payload = {
            //         ...payload,
            //         popularGames: [...modalValue?.popularGame?.map(item=> item?._id), ...payload.popularGames],
            //     };
            // }
            setLoader(true);
            dispatch(updatePopularGame(payload)).then(res=>{
                if (res.data.success) {
                    setLoader(false);
                    redirectApiHandler();
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                } else {
                    setLoader(false);
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message || res?.data?.msg });
                }
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };

    return (
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup'}>
                <div className={'modal_popup_title'}>
                    <h2>{`Customize Games`}</h2>
                </div>
                <div className={'add_admin_user_popup_content_pop'}>
                    <form method={'POST'} onSubmit={(e) => handleSubmit(e)}>
                        <label>Game List <span className={'validation-star'}>*</span></label>
                     <div className={'mt_margin'}>
                         <MultiSelect
                             options={category}
                             value={formData}
                             onChange={handleChangeDropDown}
                             labelledBy="Select"
                             hasSelectAll={false}
                             className={'inner_popular_game_dropdown all_game_dropdown_details'}
                         />
                     </div>
                        {simpleValidator.current.message("game", formData, "required")}
                        <div className={'formData_btn'}>
                            <button className={'btn_default'} onClick={() => handleOpenModal()}>Cancel</button>
                            <FilledButton type={'submit'} value={"Submit"} className={'loader_css btn'} loading={loader} />
                        </div>
                    </form>
                </div>
            </div>
        </Box>
    );
};
export default CreateCustomizeGameList;