import React, { useCallback, useEffect, useRef, useState } from "react";
import { jsonToFormData, profileImages } from "../../../../../../utils";
import user from "../../../../../../assets/images/avatar.png";
import icon_plus from "../../../../../../assets/images/plus.svg";
import FilledButton from "../../../../../../Components/FileButton";
import { Box } from "@mui/material";
import CommonModal from "../../../../../../hoc/CommonModal";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../../hoc/PopContent";
import { createGameModeList, updateGameModeList } from "../../../../../../Redux/games/action";
import { useParams } from "react-router-dom";
import closeIcon from "../../../../../../assets/images/close-round-icon.svg";
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

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
const AddGameMode = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [, updateState] = useState({});
    const simpleValidator = useRef(new SimpleReactValidator());
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState({ gameModeIcon: '', gameModeName: '', isIconAdded: false, isIconUpdated: false, isIconDeleted:false });
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
            delete payload?.isIconUpdated;
            setLoader(true)
            dispatch(createGameModeList(jsonToFormData(payload))).then(res => {
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
    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                gameId: id,
                gameModeId: modalValue?.row?._id
            }
            setLoader(true)
            dispatch(updateGameModeList(jsonToFormData(payload))).then(res => {
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

    useEffect(() => {
        if (modalValue?.isEdit) {
            setFormData({
                ...formData,
                gameModeIcon: modalValue?.row?.gameModeIcon,
                gameModeName: modalValue?.row?.gameModeName,
            })
        }
    }, [modalValue])
    return (
        <Box sx={style}>
            <div className={'game_mode_popup add_admin_user_popup modal_main_popup'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Edit Game Of Mode' : 'Add Game Of Mode'}</h2>
                </div>
                <div className={'add_game_details_sec add_admin_user_popup_content'}>
                    <form onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className={'d_flex'}>
                            <div className='form_group profile game-mode-icon-div'>
                                <div className='user_profile'>
                                    <div className='user_profile_pic'>
                                        {profileImages(formData?.gameModeIcon, user)}
                                        {
                                            !formData?.gameModeIcon &&
                                            <span className='addnew'>
                                            <img src={icon_plus} alt='' />
                                            <input type='file' title="" name='gameModeIcon' accept="image/*" id='' onChange={(e) => {
                                                if(e.target.files[0]?.type?.includes('image/') &&  e.target.files[0].type !== 'image/gif'){
                                                    setFormData({ ...formData, gameModeIcon: e.target.files[0], isIconAdded: true, isIconUpdated: true, isIconDeleted:false })
                                                }else {
                                                    handleOpenErrorModal('CommonPop', { header: "Error", body: 'Please Enter Only Image File' });
                                                }
                                            }} />
                                        </span>
                                        }

                                    </div>
                                    <label htmlFor='' className='profile_label'>Mode Icon</label>
                                </div>
                                {
                                    formData?.gameModeIcon &&
                                    <div className={'close-icon'} onClick={()=> setFormData({...formData,gameModeIcon:'',  isIconAdded: false, isIconUpdated: false,isIconDeleted:true})}>
                                        <CloseSharpIcon/>
                                    </div>
                                }
                                {/*{simpleValidator.current.message("image", formData?.gameModeIcon, "required")}*/}
                            </div>
                            <div className={'w_100 game_filed_details'}>
                                <div className="formData formData_field">
                                    <label>Title <span className={'validation-star'}>*</span></label>
                                    <div className="emailWrap">
                                        <input type="text" maxLength={40} name='gameModeName' placeholder={'Enter title'} value={formData?.gameModeName} onChange={(e) => setFormData({ ...formData, gameModeName: e.target.value })} />
                                    </div>
                                    {simpleValidator.current.message("gameModeName", formData?.gameModeName, "required")}
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
export default AddGameMode