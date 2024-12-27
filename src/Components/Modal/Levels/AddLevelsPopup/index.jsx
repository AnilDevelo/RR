import React, {useCallback, useEffect, useRef, useState} from "react";
import { Box } from "@mui/material";
import FilledButton from "../../../FileButton";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch } from "react-redux";
import {addLevelsList, updateLevelsList} from "../../../../Redux/Master/action";
import CommonModal from "../../../../hoc/CommonModal";
import PopComponent from "../../../../hoc/PopContent";
import user from "../../../../assets/images/avatar.png";
import icon_plus from "../../../../assets/images/plus.svg";
import {jsonToFormData, profileImages} from "../../../../utils";
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
const AddLevelsPopup = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData,setFormData] = useState({
        levelName:'',
        winAmountCounter:'',
        levelIcon:'',
        isLevelIconUpdated:false
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData
            }
            setLoader(true)
            dispatch(addLevelsList(jsonToFormData(payload))).then(res=>{
                if (res.data.success) {
                    setLoader(false)
                    redirectApiHandler()
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                } else {
                    setLoader(false)
                    handleOpenErrorModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                }
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }
    const changeHandler = (e) => {
        const {value,name} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    };

    useEffect(()=>{
        if(modalValue?.isEdit){
            setFormData({
                ...formData,
                levelIcon: modalValue?.row?.levelIcon,
                levelName:modalValue?.row?.levelName,
                winAmountCounter:modalValue?.row?.winAmountCounter
            })
        }
    },[modalValue?.isEdit]);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                levelId: modalValue?.row?._id
            }
            setLoader(true)
            dispatch(updateLevelsList(jsonToFormData(payload))).then(res=>{
                if (res.data.success) {
                    setLoader(false)
                    redirectApiHandler()
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                } else {
                    setLoader(false)
                    handleOpenModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                }
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };

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
    return (
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update  Level' : 'Add New Level'}</h2>
                </div>
                <div className={'add_admin_user_popup_content'}>
                    <form onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                      <div className={'level_popup_form_field'}>
                          <div className='form_group profile new_game_section'>
                              <div className='user_profile'>
                                  <div className='user_profile_pic'>
                                      { profileImages(formData?.levelIcon,user)}
                                      <span className='addnew'>
                                                    <img src={icon_plus} alt='' />
                                                    <input type='file' name='levelIcon' id=''  onChange={(e)=>setFormData({...formData,levelIcon:e.target.files[0],isLevelIconUpdated:true})} />
                                                </span>
                                  </div>
                                  <label htmlFor='' className='profile_label'>Level Logo <span className={'validation-star'}>*</span></label>
                              </div>
                              {simpleValidator.current.message("levelIcon", formData?.levelIcon, 'required')}
                          </div>
                         <div className={'level_popup_form_field_left'}>
                             <div className={'user_kyc_section'}>
                                 <div className={'user_kyc_section_filed'}>
                                     <label>Level Name <span className={'validation-star'}>*</span></label>
                                     <div className={'user_kyc_section_input_filed'}>
                                         <input type={'text'} value={formData?.levelName} name={'levelName'} onChange={(e)=>changeHandler(e)} />
                                     </div>
                                     {simpleValidator.current.message("levelName", formData?.levelName, 'required')}
                                 </div>
                             </div>
                             <div className={'user_kyc_section'}>
                                 <div className={'user_kyc_section_filed'}>
                                     <label>Win Amount Counter <span className={'validation-star'}>*</span></label>
                                     <div className={'user_kyc_section_input_filed'}>
                                         <input type={'number'} onWheel={(e)=>e.currentTarget.blur()} value={formData?.winAmountCounter} name={'winAmountCounter'} onChange={(e)=>changeHandler(e)} />
                                     </div>
                                     {simpleValidator.current.message("winAmountCounter", formData?.winAmountCounter, 'required')}
                                 </div>
                             </div>
                         </div>
                      </div>
                        <div className={'formData_btn'}>
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
export default AddLevelsPopup