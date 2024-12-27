import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../../hoc/PopContent";
import { Box } from "@mui/material";
import FilledButton from "../../../../../../Components/FileButton";
import CommonModal from "../../../../../../hoc/CommonModal";
import {
    createGameNumberOfPlayers, getSingleGameDetails,
    updateGameModeList,
    updateGameNumberOfPlayers
} from "../../../../../../Redux/games/action";

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

const AddNumberOfPlayerPopup = ({ modalValue, handleOpenModal }) => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [, updateState] = useState({});
    const gameDetails = useSelector(state => state?.gameReducer?.gameDetails)
    const simpleValidator = useRef(new SimpleReactValidator());
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState({ numberOfPlayer: '', isDefault:false });
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
                gameId: id,
                isDefault: !gameDetails?.isDefaultNumberOfPlayerCreated
            }
            setLoader(true)
            dispatch(createGameNumberOfPlayers(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    modalValue.redirectApiProps();
                    dispatch(getSingleGameDetails({ gameId: id }))
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
    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                isDefault: !gameDetails?.isDefaultNumberOfPlayerCreated,
                gameNumberOfPlayerId: modalValue?.row?._id
            }
            setLoader(true)
            dispatch(updateGameNumberOfPlayers(payload)).then(res=>{
                if(res.data.success){
                    setLoader(false)
                    modalValue.redirectApiProps();
                    dispatch(getSingleGameDetails({ gameId: id }))
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                }else{
                    setLoader(false)
                    handleOpenErrorModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg });
                }
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }

    useEffect(() => {
        if (modalValue?.isEdit) {
            setFormData({
                ...formData,
                numberOfPlayer: modalValue?.row?.numberOfPlayer,
                isDefault: modalValue?.row?.isDefault
            })
        }
    }, [modalValue]);


    return (
        <Box sx={style}>
            <div className={'modal_main_popup add_admin_user_popup number-Of-decks'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Edit Number Of Players' : 'Add Number Of Players'}</h2>
                </div>
                <div className={'add_game_details_sec add_admin_user_popup_content'}>
                    <form onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className={'game_display_form winner_content_form social_media_section'}>
                            <div className={'game_flex'}>
                                <div className="formData formData_field">
                                    <label>Enter Number Of Players <span className={'validation-star'}>*</span></label>
                                    <div className="emailWrap lobby-type-description">
                                    <input
                                        type="text"
                                        maxLength={10}
                                        onWheel={(e) => e.currentTarget.blur()}
                                        name="numberOfPlayer"
                                        placeholder="Enter player Number"
                                        value={formData?.numberOfPlayer}
                                        onChange={(e) => {
                                            const { value } = e.target;
                                            const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                            const integerValue = parseInt(numericValue, 10); // Parse the numeric value as an integer
                                            if (integerValue !== 0) {
                                                setFormData((prevFormData) => ({
                                                    ...prevFormData,
                                                    numberOfPlayer: numericValue
                                                }));
                                            }
                                        }}
                                        />
                                    </div>
                                    {simpleValidator.current.message("numberOfPlayer", formData?.numberOfPlayer?.toString(), "required|min:0|max:10")}
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
export default AddNumberOfPlayerPopup