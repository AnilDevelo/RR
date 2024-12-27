import React, {useCallback, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import PopComponent from "../../../../../../hoc/PopContent";
import SimpleReactValidator from "simple-react-validator";
import {addSandboxEFileTDSReturn, addSandboxPrepareTDSReturn} from "../../../../../../Redux/TDSReport/action";
import {Box} from "@mui/material";
import CommonDropdown from "../../../../../../Components/Dropdown/CommonDropdown";
import {financeYear} from "../../../../../../utils";
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

const AddEFileTDSReturn = ({modalValue, handleOpenModal, redirectApiHandler}) => {
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData,setFormData] = useState({
        tan:'',
        form:'26Q',
        financial_year:'',
        quarter:'',
    });
    const simpleValidator = useRef(new SimpleReactValidator({
        validators: {
            tan: {
                message: "Please Enter Valid Tan Number.",
                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val,/^[A-Z]{4}[0-9]{5}[A-Z]{1}/)
                },
                required: true
            }
        }
    }))

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                tan:formData?.tan,
                form:formData?.form,
                financial_year:`FY ${formData?.financial_year}`,
                quarter: formData?.quarter.charAt(0) +  formData?.quarter.charAt(formData?.quarter?.length - 1)
            }

            setLoader(true)
            dispatch(addSandboxEFileTDSReturn(payload)).then(res => {
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
    }

    const changeHandler = (e) => {
        const { value, name } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

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

    return(
        <Box sx={style}>
            <Box className={'add_admin_user_popup modal_main_popup game-mode-config-design tds_file_section sandbox_tds_popup lobby_section_details'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update Sandbox E-File TDS Return' : 'Add E-File Prepare TDS Return'}</h2>
                </div>
                <div className={'header_slider_details header_slider_details_Ads'}>
                    <form className='form_group ' onSubmit={  (e) => handleSubmit(e)}>
                        <div className={'user_kyc_section'}>
                            <div className={'formData user_kyc_section_filed w_100 mr_margin'}>
                                <label>Tan Number <span className={'validation-star'}>*</span></label>
                                <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                    <input type={'text'} placeholder={'Enter Tan Number'}  maxLength={10} value={formData?.tan} name={'tan'}  onChange={(e)=>changeHandler(e)}  />
                                </div>
                                {simpleValidator.current.message("tan", formData?.tan, 'required|tan')}
                            </div>
                            <div className={'d_flex w_100 gap_20'}>
                                <div className={'formData user_kyc_section_filed w_100 mr_margin'}>
                                    <label>Form <span className={'validation-star'}>*</span></label>
                                    <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                        <CommonDropdown options={['26Q']} name={'form'} setFormData={setFormData} formData={formData} />
                                    </div>
                                    {simpleValidator.current.message("form", formData?.form, 'required')}
                                </div>
                                <div className={'formData user_kyc_section_filed w_100 ml_margin'}>
                                    <label>Financial Year <span className={'validation-star'}>*</span></label>
                                    <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                        <CommonDropdown options={financeYear()} name={'financial_year'} setFormData={setFormData} formData={formData} placeholder={'Select Financial Year'}/>
                                    </div>
                                    {simpleValidator.current.message("financial_year", formData?.financial_year, 'required')}
                                </div>
                            </div>
                            <div className={'d_flex w_100'}>
                                <div className={'formData user_kyc_section_filed w_100 mr_margin'}>
                                    <label>Quarter<span className={'validation-star'}>*</span></label>
                                    <div className={'user_kyc_section_input_filed lobby-type-description'}>
                                        <CommonDropdown options={['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4']} name={'quarter'} setFormData={setFormData} formData={formData} placeholder={'Select Quarter'}/>
                                    </div>
                                    {simpleValidator.current.message("quarter", formData?.quarter, 'required')}
                                </div>
                            </div>
                        </div>
                        <div className={'formData_btn'}>
                            <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                            <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'btn loader_css'} loading={loader} />
                        </div>
                    </form>
                </div>
            </Box>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenErrorModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenErrorModal} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Box>
    )
}
export default AddEFileTDSReturn