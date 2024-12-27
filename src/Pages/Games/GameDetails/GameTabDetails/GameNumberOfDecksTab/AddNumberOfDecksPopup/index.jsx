import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../../hoc/PopContent";
import { createGameModeList, createGameNumberOfDeck, updateGameModeList } from "../../../../../../Redux/games/action";
import { Box } from "@mui/material";
import FilledButton from "../../../../../../Components/FileButton";
import CommonModal from "../../../../../../hoc/CommonModal";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};
const AddNumberOfDecksPopup = ({ modalValue, handleOpenModal }) => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [, updateState] = useState({});
    const simpleValidator = useRef(new SimpleReactValidator());
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState({ numberOfDeck: '', isJoker: false });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];

    const handleOpenErrorModal = (type, data) => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                gameId: id
            }
            setLoader(true)
            dispatch(createGameNumberOfDeck(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    modalValue.redirectApiProps();
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                } else {
                    setLoader(false)
                    handleOpenErrorModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg });
                }
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }

    return (
        <Box sx={style} className={'number-of-deck-popup'}>
            <div className={' modal_main_popup add_admin_user_popup number-Of-decks'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Edit Game Decks' : 'Add Game Decks'}</h2>
                </div>
                <div className={'add_game_details_sec add_admin_user_popup_content'}>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className={'game_display_form winner_content_form social_media_section'}>
                            <div className={'game_flex'}>
                                <div className="formData formData_field">
                                    <label>Number Of Decks <span className={'validation-star'}>*</span></label>
                                    <div className="emailWrap">
                                        <input type="number" placeholder={'Enter number of decks'} onWheel={(e) => e.currentTarget.blur()} name='numberOfDeck' value={formData?.numberOfDeck >= 0 && formData?.numberOfDeck } onChange={(e) => setFormData({ ...formData, numberOfDeck: e.target.value })} />
                                    </div>
                                    {simpleValidator.current.message("NumberOfDecks", formData?.numberOfDeck?.toString(), "required|min:0|max:2")}
                                </div>

                            </div>
                        </div>
                        <div className={'common_checkbox_details'}>
                            <label>Is Game Mode ? <span className={'validation-star'}>*</span></label>
                            <div className={'game_mode_btn'}>
                                <div className={'game_mode_btn_option yes_radio_btn'}>
                                    <input type={'radio'} name={'isJoker'} checked={formData?.isJoker} onChange={(e) => setFormData({ ...formData, isJoker: true })} />
                                    <label>Joker Cards</label>
                                </div>
                                <div className={'game_mode_btn_option no_radio_btn'}>
                                    <input type={'radio'} name={'isJoker'} checked={!formData?.isJoker} onChange={(e) => setFormData({ ...formData, isJoker: false })} />
                                    <label>Without Joker Cards</label>
                                </div>
                            </div>
                        </div>
                        <div className={'formData_btn form_common_btn'}>
                            <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                            <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'btn loader_css'} loading={loader} />
                        </div>
                    </form>
                </div>

            </div>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenErrorModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenErrorModal} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Box>
    )
}
export default AddNumberOfDecksPopup