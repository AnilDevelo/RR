import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import FilledButton from "../../../FileButton";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch } from "react-redux";
import CommonModal from "../../../../hoc/CommonModal";
import PopComponent from "../../../../hoc/PopContent";
import { addGenreList, editGenreList } from "../../../../Redux/games/GenreGame/action";
import GenreTypeCheckbox from "./GenreTypeCheckbox";
import DropdownList from "Components/Dropdown/DropdownList";

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
const AddGenrePopup = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState({
        genreName: '',
        all:false,
        isGameMode: false,
        isMultipleDeck:false,
        isNoOfPlayer:false,
        isEditable:false
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            setLoader(true);
            let payload = {
                ...formData
            }
            delete  payload?.all
            dispatch(addGenreList(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    redirectApiHandler();
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                } else {
                    setLoader(false)
                    handleOpenModalError('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                }
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };

    const handleOpenModalError = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };


    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            setLoader(true)
            let payload = {
                ...formData,
                genreId: modalValue?.row?._id
            }
            delete  payload?.all
            dispatch(editGenreList(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    redirectApiHandler();
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                } else {
                    setLoader(false)
                    handleOpenModalError('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                }
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }

    const handleCheckbox = (events) => {
       if(events?.target.checked){
           setFormData({
               ...formData,
               all: events?.target.checked,
               isGameMode: events?.target.checked,
               isMultipleDeck: events?.target.checked,
               isNoOfPlayer: events?.target.checked
           })
       }else{
           setFormData({
               ...formData,
               all: false,
               isGameMode: false,
               isMultipleDeck:false,
               isNoOfPlayer:false
           })
       }
    }

    useEffect(()=>{
        if(formData?.isGameMode && formData?.isMultipleDeck && formData?.isNoOfPlayer){
            setFormData({
                ...formData,
                all: true
            })
        }else {
            if(!formData?.isGameMode || !formData?.isMultipleDeck || !formData?.isNoOfPlayer){
                setFormData({
                    ...formData,
                    all: false
                })
            }
        }
    },[formData?.isGameMode , formData?.isMultipleDeck , formData?.isNoOfPlayer]);

    const handleCheckboxChange = (e) => {
        if(e.target.checked){
            setFormData({...formData,[e.target.name]:true})
        }else {
            setFormData({...formData,[e.target.name]:false})
        }
    }

    useEffect(() => {
        if (modalValue?.isEdit) {
            setFormData({
                ...formData,
                genreName: modalValue?.row?.genreName,
                isEditable: modalValue?.row?.isEditable,
                all: modalValue?.row?.isGameMode && modalValue?.row?.isMultipleDeck && modalValue?.row?.isNoOfPlayer,
                isGameMode: modalValue?.row?.isGameMode,
                isMultipleDeck: modalValue?.row?.isMultipleDeck,
                isNoOfPlayer: modalValue?.row?.isNoOfPlayer
            })
        }
    }, [modalValue]);

    return (
        <Box sx={style}>
            <div className={'add_admin_user_popup genre_section_details modal_main_popup genre_popup_details lobby_section_details'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Edit Genre' : `Add Genre`}</h2>
                </div>
                <div className={'add_admin_user_popup_content'}>
                    <form method={'POST'} onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className="formData">
                            <label>Genre Name <span className={'validation-star'}>*</span></label>
                            <div className="emailWrap lobby-type-description mt_margin">
                                <DropdownList name={'genreName'} options={['Card','Board', 'Action','Puzzle','Casual','Strategy','Simulation','Arcade','Casino','Sports','Racing','Role Playing','Adventure']} setFormData={setFormData} formData={formData}  placeholder={"Select Genre Name"}/>
                                {/*<input type="text" name='genreName' value={formData?.genreName} maxLength={20} placeholder={'Enter Genre Name'} onChange={(e) => setFormData({ ...formData, genreName: e.target.value })} />*/}
                                {/*<span>{formData?.genreName?.length}/20</span>*/}
                            </div>
                            {simpleValidator.current.message("genreName", formData?.genreName, 'required')}
                        </div>


                        {
                            // !modalValue?.isEdit &&
                            <div className={'formData checkbox_modal genre-checkbox '}>
                                <label> Genre Type </label>
                                <div className={'game_mode_btn'}>
                         {/*<GenreTypeCheckbox/>*/}
                                    <div className={'game_mode_btn_option'}>
                                        <input type={'checkbox'} name={'all'} checked={formData?.all}  onChange={(e)=>handleCheckbox(e,'All')}  />
                                        <label>All Genre Type</label>
                                    </div>
                                    <div className={'game_mode_btn_option'}>
                                        <input type={'checkbox'} name={'isGameMode'} checked={formData?.isGameMode}    onChange={(e)=> handleCheckboxChange(e)} />
                                            <label>Game Mode</label>
                                    </div>
                                    <div className={'game_mode_btn_option tab_radio'}>
                                        <input type={'checkbox'} name={'isNoOfPlayer'} checked={formData?.isNoOfPlayer}  onChange={(e)=> handleCheckboxChange(e)} />
                                        <label>Number of Players</label>
                                    </div>
                                    <div className={'game_mode_btn_option tab_radio'}>
                                        <input type={'checkbox'} name={'isMultipleDeck'} checked={formData?.isMultipleDeck} onChange={(e)=> handleCheckboxChange(e)} />
                                        <label>Number of Decks</label>
                                    </div>
                                    {/*<div className={'game_mode_btn_option tab_radio'}>*/}
                                    {/*    <input type={'checkbox'} name={'isGameMode2'}  />*/}
                                    {/*    <label>Number of Winners</label>*/}
                                    {/*</div>*/}
                                    {/*<div className={'game_mode_btn_option tab_radio'}>*/}
                                    {/*    <input type={'checkbox'} name={'isGameMode2'}  />*/}
                                    {/*    <label>Time Limit</label>*/}
                                    {/*</div>*/}
                                    {/*//Number of Winners*/}
                                    {/*//Time Limit*/}
                                </div>
                            </div>
                        }

                        {
                            !modalValue?.isEdit &&
                            <div className={'common_checkbox_details mt_1'}>
                                <label>is Editable?</label>
                                <div className={'game_mode_btn'}>
                                    <div className={'game_mode_btn_option yes_radio_btn'}>
                                        <input type={'radio'} name={'isGameMode'} checked={formData?.isEditable} onChange={(e) => setFormData({ ...formData, isEditable: true })} />
                                        <label>Yes</label>
                                    </div>
                                    <div className={'game_mode_btn_option no_radio_btn'}>
                                        <input type={'radio'} name={'isGameMode'} checked={!formData?.isEditable} onChange={(e) => setFormData({ ...formData, isEditable: false })} />
                                        <label>No</label>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className={'formData_btn'}>
                            <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                            <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'btn loader_css'} loading={loader} />
                        </div>
                    </form>
                </div>
            </div>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModalError}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModalError} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Box>
    )
};
export default AddGenrePopup;