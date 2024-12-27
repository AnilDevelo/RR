import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../hoc/PopContent";
import {addGameModeDesignList, addUPITransaction, updateGameModeDesignList} from "../../../../Redux/Master/action";
import {jsonToFormData, profileImages} from "../../../../utils";
import {Box} from "@mui/material";
import user from "../../../../assets/images/avatar.png";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import FilledButton from "../../../../Components/FileButton";
import CommonModal from "../../../../hoc/CommonModal";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};
const AddUPITransaction = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator({
        validators: {
            Upivalidation: {
                message: "Enter Valid UPI Id",
                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val,/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+$/)
                },
                required: true
            }
        }
    }));
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData, setFormData] = useState({
        upiQrCodeImage: '',
        upiId:''
    });

    const changeHandler = (e) => {
        const { value, name } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData
            }
            setLoader(true);
            dispatch(addUPITransaction(jsonToFormData(payload))).then(res => {
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

    useEffect(()=>{
        if(modalValue?.isEdit){
            setFormData({
                ...formData,
                designName:modalValue?.row?.designName,
                gameModeDesignImage: modalValue?.row?.designNameImage
            })
        }
    },[modalValue?.isEdit])


    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                gameModeDesignId: modalValue?.row?._id
            }
            if(!payload?.isGameModeDesignUpdated){
                delete payload?.gameModeDesignImage
            }
            // setLoader(true);
            // dispatch(updateGameModeDesignList(jsonToFormData(payload))).then(res => {
            //     if (res.data.success) {
            //         setLoader(false)
            //         redirectApiHandler()
            //         handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
            //     } else {
            //         setLoader(false)
            //         handleOpenErrorModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
            //     }
            // })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }


    return(
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup game-mode-config-design lobby_section_details transaction_id_section'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update UPI QR Code' : 'Add UPI QR Code'}</h2>
                </div>
                <div className={'header_slider_details header_slider_details_Ads'}>
                    <form className='form_group ' onSubmit={modalValue?.isEdit ?   (e) => handleEditSubmit(e) :  (e) => handleSubmit(e)}>

                        {/*--------------------------------------- Game Logo [Start] ----------------------------------------- */}
                        <div className='user_profile profile-image-dropdown ads_internal'>
                            <label htmlFor='' className='profile_label'>QR Code <span className={'validation-star'}>*</span></label>
                            <div className={'header_section_slider'}>
                                <div className='user_profile_pic'>
                                    {profileImages(formData?.upiQrCodeImage, user)}
                                    <span className='add_new'>
                                        <input type='file' title="" name='gameModeDesignImage' id='' onChange={(e) => {
                                            if(e.target.files[0]?.type?.includes('image/') &&  e.target.files[0].type !== 'image/gif'){
                                                setFormData({...formData,upiQrCodeImage:e.target.files[0] })
                                            }else {
                                                handleOpenErrorModal('CommonPop', { header: "Error", body: 'Please add only image file' });
                                            }
                                        }} /> </span>
                                </div>
                            </div>
                            {simpleValidator.current.message("QR Code", formData?.upiQrCodeImage, "required")}
                            {
                                formData?.upiQrCodeImage &&
                                <div className={'close-icon'} onClick={()=> setFormData({...formData,upiQrCodeImage:'',})}>
                                    <CloseSharpIcon/>
                                </div>
                            }
                        </div>
                        {/*--------------------------------------- Game Logo [End] ----------------------------------------- */}

                        <div className={'user_kyc_section'}>
                            <div className={'formData user_kyc_section_filed'}>
                                <label>UPI Id <span className={'validation-star'}>*</span></label>
                                <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                    <input style={{paddingRight:"20px"}}type={'text'} placeholder={'Enter UPI Id'} maxLength={20} value={formData?.upiId} name={'upiId'} onChange={(e) => changeHandler(e)} />
                                </div>

                                {simpleValidator.current.message("UPI Id", formData?.upiId, 'required|Upivalidation')}
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
export default AddUPITransaction