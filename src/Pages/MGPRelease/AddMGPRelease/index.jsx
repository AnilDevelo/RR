import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { checkRchEmpty, jsonToFormData } from "../../../utils";
import FilledButton from "../../../Components/FileButton";
import CommonModal from "../../../hoc/CommonModal";
import { useDispatch} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../hoc/PopContent";
import DropdownMode from "../../Games/GameDetails/GameTabDetails/LobbyTab/CreateLobby/DropdownMode";
import {createMGPRelease, updateMGPRelease} from "../../../Redux/MGPRelease/action";
import CommonDropdown from "../../../Components/Dropdown/CommonDropdown";
import TextEditor from "../../Master/Document/TextEditor";
import CircularProgressWithLabel from "./CircularLoader";
import Modal from "@mui/material/Modal";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 0,
    borderRadius: "5px",
};
const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 508,
    bgColor: "background.paper",
    boxShadow: 24,
    p: 5,
};

const AddMGPRelease = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const [progress, setProgress] = React.useState(1);

    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator({
        validators: {
            releaseNumber: {
                message: "Release number is not valid",
                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val,/^(\d+\.)?(\d+\.)?(\*|\d+)$/)
                },
                required: true
            }
        }
    }));
    const [mgpModal,setMGPModal] = useState(false)
    const [, updateState] = useState({});
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let ModalTab = PopComponent[modalDetails.modalName];
    const forceUpdate = useCallback(() => updateState({}), []);
    const [releaseNote,setReleaseNote] = useState('')
    const [formData, setFormData] = useState({
        releaseBuild: '',
        releaseNumber: '',
        rolloutStage: '',
        releaseBuildType:'',
        isReleaseBuildUpdate: false,
        releaseNote: '',

    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleInputValidation = (e) => {
        const inputValue = e.target.value;
        const validVersionPattern = /^(\d+(\.\d+)*)?$/;
    
        if (!validVersionPattern.test(inputValue)) {
            e.target.value = inputValue.replace(/[^\d.]/g, ''); // Remove non-numeric and non-dot characters
        }
    
        handleChange(e); // Continue with the regular handleChange function
    };
    
    

    useEffect(()=>{
        if(checkRchEmpty()){
            setReleaseNote('')
        }
    },[formData?.releaseNote]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (simpleValidator.current.allValid()) {
    //         let payload = {
    //             ...formData,
    //             releaseNote:releaseNote
    //         }
    //         setLoader(true)

    //         delete payload?.application;
    //         delete payload?.isReleaseBuildUpdate;
    //         let test = true;
    //         const timer = setInterval(() => {
    //             setProgress((prevProgress) => {
    //                 if(prevProgress >= 91){
    //                     test = false
    //                     setProgress(91)
    //                 }else {
    //                     return (prevProgress >= 100 ? 0 : prevProgress + 1)
    //                 }

    //             });
    //         }, 5000);

    //         if(progress >= 91){
    //             clearInterval()
    //             setProgress(91)
    //         }
    //         setMGPModal(true)
    //         dispatch(createMGPRelease(jsonToFormData(payload))).then(res => {
    //             if (res.data.success) {
    //                 setProgress(100)
    //                 setLoader(false)
    //                 redirectApiHandler()
    //                 setMGPModal(false)
    //                 handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
    //             } else {
    //                 setProgress(1)
    //                 setLoader(false)
    //                 setMGPModal(false)
    //                 handleOpenErrorModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
    //             }
    //         })
    //     } else {
    //         simpleValidator.current.showMessages();
    //         forceUpdate();
    //     }
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
          let payload = {
            ...formData,
            // releaseNote: releaseNote,
          };
          setLoader(true);
      
          delete payload?.application;
          delete payload?.isReleaseBuildUpdate;
      
          setMGPModal(true);
          const timer = setInterval(() => {
            setProgress((prevProgress) => {
              if (prevProgress >= 91) {
                clearInterval(timer);
                setProgress(91);
              } else {
                return prevProgress + 1;
              }
            });
          }, 5000);
      
          dispatch(createMGPRelease(jsonToFormData(payload))).then((res) => {
            if (res.data.success) {
              setProgress(100);
              setLoader(false);
              redirectApiHandler();
              setMGPModal(false);
              handleOpenModal("CommonPop", { header: "Success", body: res?.data?.message });
            } else {
              setProgress(1);
              setLoader(false);
              setMGPModal(false);
              handleOpenErrorModal("CommonPop", { header: "Error", body: res?.data?.message || res?.data?.msg });
            }
          });
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

    // const handleEditor = (props) => {
    //      setReleaseNote(props);
    // }

    const handleEditor = (props)=>{
        setFormData({
            ...formData,
            releaseNote: props
        })
    };

    useEffect(()=>{
        if(modalValue?.isEdit){
            const { row } = modalValue
            setFormData({
                ...formData,
                releaseBuild: { name: row?.releaseBuild?.split('/')[[row?.releaseBuild?.split('/')?.length]?.[0] - 1] },
                releaseNumber: row?.releaseNumber,
                rolloutStage: row?.rolloutStage,
                releaseBuildType:row?.releaseBuildType
            })
            setReleaseNote(row?.releaseNote)
        }
    },[modalValue])

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                releaseNote:releaseNote,
                MgpReleaseId: modalValue?.row?._id
            }
            if(!payload?.isReleaseBuildUpdate){
                delete payload?.releaseBuild
            }
            if(payload?.isReleaseBuildUpdate){
                const timer = setInterval(() => {
                    let test = true;
                    setProgress((prevProgress) => {
                        if(prevProgress >= 95){
                            test = false
                            setProgress(95)
                        }else {
                            return (prevProgress >= 100 ? 0 : prevProgress + 1)
                        }

                    });
                }, 5000);

                if(progress >= 95){
                    clearInterval()
                    setProgress(95)
                }
            }

            // if(payload?.isReleaseBuildUpdate){
            //     handleOpenErrorModal('CommonPop', { header: "Error", body: 'Please wait, it takes few minutes to upload an application build.' })
            // }
            setLoader(true)
            // dispatch(updateMGPRelease(jsonToFormData(payload))).then(res => {
            //     if (res.data.success) {
            //         setProgress(100)
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

    return (
        <Box sx={style} className={'mgp_release_section'}>

            <div className={'add_admin_user_popup modal_main_popup mgp_release_inner_section'}>
                <div className={'modal_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Update MGP Release' :'Add MGP Release'}</h2>
                </div>
                <div className={'add_admin_user_popup_content'}>
                    <form onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) :(e) => handleSubmit(e)}>
                        <div className={'user_kyc_section'}>
                            {/* {
                                (loader && formData?.isReleaseBuildUpdate) && <div className={'circular-progress-main'}>
                                    <CircularProgressWithLabel value={progress}/>
                                </div>
                            } */}

                            <div className={'documents_fields'}>
                                <div className={'user_kyc_section_filed'}>
                                    <label>Release Version <span className={'validation-star'}>*</span></label>
                                     <div className={ modalValue?.isEdit ? 'input_length_counter readOnly_field' : 'input_length_counter'}>
                                         <input type={'text'} name={'releaseNumber'} disabled={modalValue?.isEdit} value={formData?.releaseNumber} maxLength={10} placeholder={'Release Number'}  onChange={(e) => handleInputValidation(e)} />
                                         <span>{formData?.releaseNumber?.length}/10</span>
                                     </div>
                                    {simpleValidator.current.message('releaseNumber', formData?.releaseNumber?.toString(), 'required|releaseNumber')}
                                </div>

                                <div className={'user_kyc_section_filed'}>
                                    <div className={'text-editor-details-section'}>
                                        <label className={'main_label'}>Release Notes <span className={'validation-star'} style={{color:"red"}}>*</span></label>
                                       <div className={'mt_margin'}>
                                           <TextEditor handleChange={handleEditor}  value={formData?.releaseNote}/>
                                       </div>
                                    </div>
                                    {simpleValidator.current.message('releaseNote', formData?.releaseNote?.toString(), 'required')}
                                </div>

                                <div className={'application_build_dropdown mt_margin'}>
                                    <label>Release Build Type <span className={'validation-star'}>*</span></label>
                                    <div className={'mt_margin'}>
                                        <CommonDropdown setFormData={setFormData} formData={formData} options={['Android', 'Ios']} name={'releaseBuildType'} isAppDownload={true} placeholder={"Select Release Build Type"}/>
                                    </div>
                                    {simpleValidator.current.message("releaseBuildType", formData?.releaseBuildType, 'required')}
                                </div>

                                <div className={'user_kyc_section_filed_document'}>
                                    <label>Build upload <span className={'validation-star'}>*</span></label>
                                    <div className={'document_details_kyc'}>
                                        <div className="u_flex u_align-center">
                                            <div className="u_file-attachment add ">
                                                <svg width="18" height="18" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                                                    <path className="u_fill" d="M23.512 11.503l-9.708 9.523a1.682 1.682 0 00-.524 1.196 1.655 1.655 0 00.503 1.205 1.72 1.72 0 001.228.493 1.743 1.743 0 001.22-.514l9.71-9.52a5.002 5.002 0 001.508-3.572c0-1.34-.542-2.624-1.508-3.571a5.202 5.202 0 00-3.641-1.48 5.202 5.202 0 00-3.642 1.48l-9.71 9.523a8.413 8.413 0 00-1.906 2.731 8.277 8.277 0 00-.041 6.491 8.407 8.407 0 001.87 2.755 8.598 8.598 0 002.81 1.835 8.732 8.732 0 006.619-.042 8.592 8.592 0 002.785-1.87l9.71-9.52 2.427 2.38-9.71 9.523a12.033 12.033 0 01-3.898 2.554 12.221 12.221 0 01-9.197 0 12.035 12.035 0 01-3.898-2.554 11.772 11.772 0 01-2.604-3.823 11.587 11.587 0 010-9.02 11.771 11.771 0 012.604-3.822l9.712-9.521A8.673 8.673 0 0122.268 2c2.25.02 4.403.905 5.994 2.465a8.336 8.336 0 012.513 5.879 8.331 8.331 0 01-2.409 5.92l-9.708 9.526a5.157 5.157 0 01-1.67 1.095 5.238 5.238 0 01-3.943 0 5.159 5.159 0 01-1.67-1.096 5.044 5.044 0 01-1.117-1.639 4.966 4.966 0 010-3.866 5.046 5.046 0 011.117-1.638l9.71-9.523 2.427 2.38z" fill="#4E525F" />
                                                </svg>
                                                <div className="u_file-attachment-label">
                                                    <input type="file" title="" name={'application'} accept={formData?.releaseBuildType === 'Android' ?  ".apk" : formData?.releaseBuildType === 'Ios'  ? '.ipa' : '.zip' } id="upload" autoComplete="off" onChange={(e) =>{
                                                        if(formData?.releaseBuildType){
                                                            if(e.target.files[0]?.type === 'application/vnd.android.package-archive'){
                                                                setFormData({ ...formData, releaseBuild: e.target.files[0], isReleaseBuildUpdate:true })
                                                            } else if(e.target.files[0]?.name?.includes('.ipa')){
                                                                setFormData({ ...formData, releaseBuild: e.target.files[0], isReleaseBuildUpdate:true })
                                                            }else {
                                                                handleOpenErrorModal('CommonPop', { header: "Error", body: `Please Enter Only ${ formData?.releaseBuildType === 'Android' ?  ".apk" : formData?.releaseBuildType === 'Ios'  && '.ipa' } files.` });
                                                            }
                                                        }else {
                                                            handleOpenErrorModal('CommonPop', { header: "Error", body: `Please add application build after adding the application type` })
                                                        }
                                                    }}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={''}>{formData?.releaseBuild ? formData?.releaseBuild?.name : ''}</p>
                                    {simpleValidator.current.message("releaseBuild", formData?.releaseBuild, 'required')}
                                </div>
                                {/*<div className={'user_kyc_section_filed_document'}>*/}
                                {/*    <label>Build upload</label>*/}
                                {/*    <div className={'document_details_kyc'}>*/}
                                {/*        <div className="u_flex u_align-center">*/}
                                {/*            <div className="u_file-attachment add ">*/}
                                {/*                {*/}
                                {/*                    formData?.userKYCAadharCard ?*/}
                                {/*                        profileImages(formData?.userKYCAadharCard, user)*/}
                                {/*                        :*/}
                                {/*                        <svg width="18" height="18" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="">*/}
                                {/*                            <path className="u_fill" d="M23.512 11.503l-9.708 9.523a1.682 1.682 0 00-.524 1.196 1.655 1.655 0 00.503 1.205 1.72 1.72 0 001.228.493 1.743 1.743 0 001.22-.514l9.71-9.52a5.002 5.002 0 001.508-3.572c0-1.34-.542-2.624-1.508-3.571a5.202 5.202 0 00-3.641-1.48 5.202 5.202 0 00-3.642 1.48l-9.71 9.523a8.413 8.413 0 00-1.906 2.731 8.277 8.277 0 00-.041 6.491 8.407 8.407 0 001.87 2.755 8.598 8.598 0 002.81 1.835 8.732 8.732 0 006.619-.042 8.592 8.592 0 002.785-1.87l9.71-9.52 2.427 2.38-9.71 9.523a12.033 12.033 0 01-3.898 2.554 12.221 12.221 0 01-9.197 0 12.035 12.035 0 01-3.898-2.554 11.772 11.772 0 01-2.604-3.823 11.587 11.587 0 010-9.02 11.771 11.771 0 012.604-3.822l9.712-9.521A8.673 8.673 0 0122.268 2c2.25.02 4.403.905 5.994 2.465a8.336 8.336 0 012.513 5.879 8.331 8.331 0 01-2.409 5.92l-9.708 9.526a5.157 5.157 0 01-1.67 1.095 5.238 5.238 0 01-3.943 0 5.159 5.159 0 01-1.67-1.096 5.044 5.044 0 01-1.117-1.639 4.966 4.966 0 010-3.866 5.046 5.046 0 011.117-1.638l9.71-9.523 2.427 2.38z" fill="#4E525F" />*/}
                                {/*                        </svg>*/}
                                {/*                }*/}
                                {/*                <div className="u_file-attachment-label">*/}
                                {/*                    <input type="file" title="" name={'releaseBuild'} accept=".zip" id="upload" autoComplete="off" onChange={(e) => {*/}
                                {/*                        if(e.target.files[0]?.name.includes('.zip')){*/}
                                {/*                            setFormData({ ...formData, releaseBuild: e.target.files[0] })*/}
                                {/*                        }else{*/}
                                {/*                            handleOpenErrorModal('CommonPop', { header: "Error", body: 'Please add Only .zip File' })*/}
                                {/*                        }*/}

                                {/*                    }} />*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*    <p>{formData?.releaseBuild ? formData?.releaseBuild?.name : ''}</p>*/}
                                {/*    {simpleValidator.current.message("releaseBuild", formData?.releaseBuild, 'required')}*/}
                                {/*</div>*/}

                                <div className={'select_game_option_mode'}>
                                    <label>Rollout Stage <span className={'validation-star'}>*</span></label>
                                    <div className={'select_game_option'}>
                                        <DropdownMode options={['Regular', 'Force Fully']} formData={formData} name={'rolloutStage'} setFormData={setFormData} placeholder={"Select Rollout Stage"}/>
                                    </div>
                                    {simpleValidator.current.message("rolloutStage", formData?.rolloutStage, 'required')}
                                </div>
                            </div>
                        </div>
                        <div className={'formData_btn'}>
                            <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                            <FilledButton type={'submit'} value={'Save'} className={'btn loader_css'} loading={loader} />
                        </div>
                    </form>
                </div>
            </div>
            <Modal
                open={mgpModal}
                onClose={''}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={"common-modal"}>
                    <Box sx={style2} className={"common-modal-inner"}>
                        <h2>{'Info'}</h2>
                        <p>Please wait, it takes a few minutes to upload an application build.</p>
                          <CircularProgressWithLabel value={progress}/>
                    </Box>
                </div>
            </Modal>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenErrorModal}>
                <ModalTab modalValue={modalDetails.modalValue} handleOpenModal={handleOpenErrorModal} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Box>
    );
};
export default AddMGPRelease