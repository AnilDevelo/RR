import {useDispatch} from "react-redux";
import React, {useCallback, useEffect, useRef, useState} from "react";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../../hoc/PopContent";
import {addGenreList, editGenreList} from "../../../../../../Redux/games/GenreGame/action";
import {Box} from "@mui/material";
import FilledButton from "../../../../../../Components/FileButton";
import CommonModal from "../../../../../../hoc/CommonModal";
import {createGameDummyPlayer} from "../../../../../../Redux/games/action";
import {useParams} from "react-router-dom";


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
const AddDummyPlayer = ({ modalValue, handleOpenModal }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState({
        isDummyPlayer:false,
        dummyPlayerStartPoint:''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
    if(!formData?.isDummyPlayer){
        simpleValidator.current.fields.dummyPlayerStartPoint = true
    }
        if (simpleValidator.current.allValid()) {
            setLoader(true);
            let payload = {
                ...formData,
                gameId: id,
                isOnlinePlayer: modalValue?.isOnlinePlayer
            }
            if(!payload?.isDummyPlayer){
                payload = {
                    ...payload,
                    dummyPlayerStartPoint:0
                }
            }
            dispatch(createGameDummyPlayer(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false)
                     modalValue.redirectApiProps();
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

    useEffect(() => {
        if (modalValue?.isEdit) {
            setFormData({
                ...formData,
                isDummyPlayer: modalValue?.row?.isDummyPlayer,
                dummyPlayerStartPoint: modalValue?.row?.dummyPlayerStartPoint > 0 ? modalValue?.row?.dummyPlayerStartPoint : '' ,
            })
        }
    }, [modalValue]);

    return (
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup genre_popup_details'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Online Player' : `Add Online Player`}</h2>
                </div>
                <div className={'add_admin_user_popup_content'}>
                    <form method={'POST'} onSubmit={ (e) => handleSubmit(e)}>
                        <div className={'common_checkbox_details'}>
                            <label>Is Dummy Player?</label>
                            <div className={'game_mode_btn'}>
                                <div className={'game_mode_btn_option yes_radio_btn'}>
                                    <input type={'radio'} name={'isDummyPlayer'} checked={formData?.isDummyPlayer} onChange={(e) => setFormData({ ...formData, isDummyPlayer: true })} />
                                    <label>Yes</label>
                                </div>
                                <div className={'game_mode_btn_option no_radio_btn'}>
                                    <input type={'radio'} name={'isDummyPlayer'} checked={!formData?.isDummyPlayer} onChange={(e) => setFormData({ ...formData, isDummyPlayer: false })} />
                                    <label>No</label>
                                </div>
                            </div>
                        </div>
                        {/*<div className={'formData checkbox_modal '}>*/}
                        {/*    <label>Is Dummy Player?</label>*/}
                        {/*    <div className={'game_mode_btn'}>*/}
                        {/*        <div className={'game_mode_btn_option'}>*/}
                        {/*            <input type={'radio'} name={'isDummyPlayer'} checked={formData?.isDummyPlayer} onChange={(e) => setFormData({ ...formData, isDummyPlayer: true })} />*/}
                        {/*            <label>Yes</label>*/}
                        {/*        </div>*/}
                        {/*        <div className={'game_mode_btn_option tab_radio'}>*/}
                        {/*            <input type={'radio'} name={'isDummyPlayer'} checked={!formData?.isDummyPlayer} onChange={(e) => setFormData({ ...formData, isDummyPlayer: false })} />*/}
                        {/*            <label>No</label>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {
                            formData?.isDummyPlayer &&
                            <div className="formData mt_15  ">
                                <label>Start Point  <span className={'validation-star'}>*</span></label>
                                <div className="emailWrap">
                                    <input type="number" onWheel={(e)=> e?.currentTarget?.blur()} name='dummyPlayerStartPoint' value={formData?.dummyPlayerStartPoint} placeholder={'Enter Start Point'} onChange={(e) => setFormData({ ...formData, dummyPlayerStartPoint: e.target.value })} />
                                </div>
                                {simpleValidator.current.message("dummyPlayerStartPoint", formData?.dummyPlayerStartPoint?.toString(), 'required|min:1|max:10|numeric')}
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
}
export default AddDummyPlayer