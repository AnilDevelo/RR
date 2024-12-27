import React, {useCallback, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import PopComponent from "../../../../../../hoc/PopContent";
import SimpleReactValidator from "simple-react-validator";
import {
    uploadSandboxEFileTDSReturnTXTFile,
    uploadSandboxPrepareTDSReturnExcelFile
} from "../../../../../../Redux/TDSReport/action";
import {jsonToFormData} from "../../../../../../utils";
import Box from "@mui/material/Box";
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
    padding: "32px 32px",
    borderRadius: "5px",
};

const UploadTxtFileTDSReturn = ({modalValue, handleOpenModal, redirectApiHandler}) => {
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [formData,setFormData] = useState({
        eFileTDSReturnId: modalValue?._id,
        eFileTDSReturnTXTFile:'',
    });
    const simpleValidator = useRef(new SimpleReactValidator({
        validators: {
            tan: {
                message: "Please Enter Valid Tan Number.",
                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val,/^[A-Z]{4}[0-9]{5}[A-Z]{1}/)
                },
                required: true
            },
            eFileTDSReturnTXTFile: {
                message: "Please enter valid .txt File.",
                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val,/\.(txt)$/i) || val.type === 'text/plain'
                },
                required: true
            },
        }
    }))

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData
            }
            setLoader(true)
            dispatch(uploadSandboxEFileTDSReturnTXTFile(jsonToFormData(payload))).then(res => {
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
    const handleChange = (e) => {
        setFormData({
            ...formData,
            eFileTDSReturnTXTFile : e.target.files[0]
        })
    }

    return(
        <Box sx={style} className={'modal_main_popup sandbox_upload_file_details'}>
            <div className={'modal_popup_title'}>
                <h2>Upload TXT File</h2>
            </div>
            <form className={'manage_game_builds'} onSubmit={(e) => handleSubmit(e)}>
                <div className={'user_kyc_section_filed_document'}>
                    <label>Upload TXT File <span className={'validation-star'}>*</span></label>
                    <div className={'document_details_kyc mt_margin'}>
                        <div className="u_flex u_align-center">
                            <div className="u_file-attachment add ">
                                <svg width="18" height="18" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                                    <path className="u_fill" d="M23.512 11.503l-9.708 9.523a1.682 1.682 0 00-.524 1.196 1.655 1.655 0 00.503 1.205 1.72 1.72 0 001.228.493 1.743 1.743 0 001.22-.514l9.71-9.52a5.002 5.002 0 001.508-3.572c0-1.34-.542-2.624-1.508-3.571a5.202 5.202 0 00-3.641-1.48 5.202 5.202 0 00-3.642 1.48l-9.71 9.523a8.413 8.413 0 00-1.906 2.731 8.277 8.277 0 00-.041 6.491 8.407 8.407 0 001.87 2.755 8.598 8.598 0 002.81 1.835 8.732 8.732 0 006.619-.042 8.592 8.592 0 002.785-1.87l9.71-9.52 2.427 2.38-9.71 9.523a12.033 12.033 0 01-3.898 2.554 12.221 12.221 0 01-9.197 0 12.035 12.035 0 01-3.898-2.554 11.772 11.772 0 01-2.604-3.823 11.587 11.587 0 010-9.02 11.771 11.771 0 012.604-3.822l9.712-9.521A8.673 8.673 0 0122.268 2c2.25.02 4.403.905 5.994 2.465a8.336 8.336 0 012.513 5.879 8.331 8.331 0 01-2.409 5.92l-9.708 9.526a5.157 5.157 0 01-1.67 1.095 5.238 5.238 0 01-3.943 0 5.159 5.159 0 01-1.67-1.096 5.044 5.044 0 01-1.117-1.639 4.966 4.966 0 010-3.866 5.046 5.046 0 011.117-1.638l9.71-9.523 2.427 2.38z" fill="#4E525F" />
                                </svg>
                                <div className="u_file-attachment-label">
                                    <input type="file" title=""  name={'eFileTDSReturnTXTFile'} id="upload" autoComplete="off" onChange={(e)=>handleChange(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {simpleValidator.current.message("excelFile", formData?.eFileTDSReturnTXTFile, 'required|eFileTDSReturnTXTFile')}
                </div>
                <div className={'formData_btn d_flex_end mt_2'}>
                    <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                    <FilledButton type={'submit'} value={ 'Save'} className={'btn loader_css'} loading={loader} />
                </div>
            </form>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenErrorModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenErrorModal} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Box>
    )
}
export default UploadTxtFileTDSReturn