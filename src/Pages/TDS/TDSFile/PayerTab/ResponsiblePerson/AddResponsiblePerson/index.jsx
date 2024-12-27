import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../../hoc/PopContent";
import { addResponsiblePerson } from "../../../../../../Redux/TDSReport/action";
import {Box} from "@mui/material";
import FilledButton from "../../../../../../Components/FileButton";
import CommonModal from "../../../../../../hoc/CommonModal";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: "30px 0",
    borderRadius: "5px",
};

const AddResponsiblePerson = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const simpleValidator = useRef(new SimpleReactValidator({
        validators: {
            email: {
                message: "The email must be a valid email address.",
                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val,/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)
                },
                required: true
            }
        }
    }));
    const [loader, setLoader] = useState(false);
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData,setFormData] = useState({
        name: '',
        designation: '',
        pan: '',
        street: '',
        area: '',
        city: '',
        state: '',
        postal_code: '',
        email: '',
        mobile: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                state: formData?.state?.toLocaleUpperCase()
            }
            setLoader(true)
            dispatch(addResponsiblePerson(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false)
                    redirectApiHandler();

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
    const changeHandler = (e) => {
        const { value, name } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(()=>{
        if(modalValue?.isEdit){
            const { row } = modalValue
            setFormData({
                ...formData,
                name: row?.name,
                designation: row?.designation,
                pan: row?.pan,
                street: row?.street,
                area: row?.area,
                city: row?.city,
                state: row?.state,
                postal_code: row?.postal_code,
                email: row?.email,
                mobile: row?.mobile,
            })
        }
    },[modalValue])
    return(
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup game-mode-config-design tds_file_section lobby_section_details'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Responsible Person' : 'Add Responsible Person'}</h2>
                </div>
                <div className={'header_slider_details header_slider_details_Ads'}>
                    <form className='form_group ' onSubmit={  (e) => handleSubmit(e)}>
                        <div className={'user_kyc_section add_responsible_person'}>
                            <div className={'formData user_kyc_section_filed'}>
                                <label>Name <span className={'validation-star'}>*</span></label>
                                <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                    <input type={'text'} placeholder={'Enter Name'}  maxLength={20} value={formData?.name} name={'name'}  onChange={(e)=>changeHandler(e)}  />
                                    <span>{formData?.name?.length}/20</span>
                                </div>
                                {simpleValidator.current.message("name", formData?.name, 'required')}
                            </div>
                            <div className={'d_flex w_100 gap_20'}>
                                <div className={'formData user_kyc_section_filed w_100 mr_margin'}>
                                    <label>Designation <span className={'validation-star'}>*</span></label>
                                    <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                        <input type={'text'} placeholder={'Enter Designation'}  maxLength={20} value={formData?.designation} name={'designation'}  onChange={(e)=>changeHandler(e)}  />
                                    </div>
                                    {simpleValidator.current.message("designation", formData?.designation, 'required')}
                                </div>
                                <div className={'formData user_kyc_section_filed w_100 ml_margin'}>
                                    <label>Pan Card Number <span className={'validation-star'}>*</span></label>
                                    <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                        <input type={'text'} placeholder={'Enter Pan Card Number'}  maxLength={10} value={formData?.pan} name={'pan'}   onChange={(e)=>changeHandler(e)} />
                                    </div>
                                    {simpleValidator.current.message("panCardNumber", formData?.pan, 'required')}
                                </div>
                            </div>
                            <div className={'d_flex w_100 gap_20'}>
                                <div className={'formData user_kyc_section_filed w_100 mr_margin'}>
                                    <label>Email <span className={'validation-star'}>*</span></label>
                                    <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                        <input type={'text'} placeholder={'Enter Email'}  value={formData?.email} name={'email'}  onChange={(e)=>changeHandler(e)} />
                                    </div>
                                    {simpleValidator.current.message("email", formData?.email, 'required|email')}
                                </div>
                                <div className={'formData user_kyc_section_filed w_100 ml_margin'}>
                                    <label>Mobile <span className={'validation-star'}>*</span></label>
                                    <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                        <input type={'text'} placeholder={'Enter Mobile No.'}  maxLength={10} value={formData?.mobile} name={'mobile'} onChange={(e)=>{
                                            const { value, name } = e.target
                                            // Check if the value is numeric
                                            if (!isNaN(value)) {
                                                setFormData((prevFormData) => ({
                                                    ...prevFormData,
                                                    mobile :  /^0/.test(value) ? value.replace(/^0/, "") : value
                                                }));
                                            }
                                        }}  />
                                    </div>
                                    {simpleValidator.current.message("mobile", formData?.mobile, 'required')}
                                </div>
                            </div>

                            <h2 className={'main_address_TDS'}>Address</h2>
                            <div className={'d_flex gap_20'}>
                                <div className={'formData user_kyc_section_filed w_100 mr_margin'}>
                                    <label>Street<span className={'validation-star'}>*</span></label>
                                    <div className={'user_kyc_section_input_filed lobby-type-description w_100'}>
                                        <input type={'text'} placeholder={'Enter Street'} className={'w_100'}  maxLength={20} value={formData?.street} name={'street'} onChange={(e)=>changeHandler(e)}  />
                                    </div>
                                    {simpleValidator.current.message("street", formData?.street, 'required')}
                                </div>
                                <div className={'formData user_kyc_section_filed w_100 ml_margin'}>
                                    <label>Area <span className={'validation-star'}>*</span></label>
                                    <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                        <input type={'text'} placeholder={'Enter Area'}   value={formData?.area} name={'area'} onChange={(e)=>changeHandler(e)}  />
                                    </div>
                                    {simpleValidator.current.message("area", formData?.area, 'required')}
                                </div>
                            </div>
                            <div className={'d_flex gap_20'}>
                                <div className={'formData user_kyc_section_filed mr_margin'}>
                                    <label>City<span className={'validation-star'}>*</span></label>
                                    <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                        <input type={'text'} placeholder={'Enter City'}  value={formData?.city} name={'city'} onChange={(e)=>changeHandler(e)}  />
                                    </div>
                                    {simpleValidator.current.message("city", formData?.city, 'required')}
                                </div>
                                <div className={'formData user_kyc_section_filed ml_margin mr_margin'}>
                                    <label>State <span className={'validation-star'}>*</span></label>
                                    <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                        <input type={'text'} placeholder={'Enter State'}  value={formData?.state} name={'state'} onChange={(e)=>changeHandler(e)}  />
                                    </div>
                                    {simpleValidator.current.message("state", formData?.state, 'required')}
                                </div>
                                <div className={'formData user_kyc_section_filed ml_margin'}>
                                    <label>Postal Code <span className={'validation-star'}>*</span></label>
                                    <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                        <input type={'text'} placeholder={'Enter Postal Code'}  value={formData?.postal_code} name={'postal_code'} onChange={(e)=>changeHandler(e)} />
                                    </div>
                                    {simpleValidator.current.message("postalCode", formData?.postal_code, 'required')}
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
export default AddResponsiblePerson