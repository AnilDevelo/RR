import React, {useEffect, useState} from "react";
import Box from "@material-ui/core/Box";
import axios from 'axios';
import FilledButton from "../../../../../../Components/FileButton";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Cookies from 'js-cookie';
import {DISTRIBUTION_UPLOAD_FORM_16A_PDF} from "../../../../../../Redux/route";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import  pdfIcon from '../../../../../../assets/images/pdfIcon.png'
import pdfIconRed from '../../../../../../assets/images/pdfIconred.png'
import PopComponent from "../../../../../../hoc/PopContent";
import CommonModal from "../../../../../../hoc/CommonModal";



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: '32px 0',
    borderRadius: "5px",
};

const  UploadForm16APDF = ({modalValue, handleOpenModal}) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [allResponse, setAllResponse] = useState([]);
    const [displayMsg, setDisplayMsg] = useState([]);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];


    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
        setUploadProgress(Array(files.length).fill(0));
        setDisplayMsg([]);
        setAllResponse([])
    };

    const handleUpload = (e) => {
        e.preventDefault();
        setUploading(true);
        const uploadPromises = selectedFiles.map((file, index) => {
            const formData = new FormData();
            formData.append('TDSForm16A', file);
            return axios.post(`${process.env.REACT_APP_END_POINT}${DISTRIBUTION_UPLOAD_FORM_16A_PDF}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: Cookies.get("token")
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100
                    );

                    setUploadProgress((prevProgress) => {
                        const updatedProgress = [...prevProgress];
                        updatedProgress[index] = progress;
                        return updatedProgress;
                    });
                },
            })
        });
        Promise.allSettled(uploadPromises)
            .then((res)=>{
                // Handle successful upload
                setAllResponse(res.reduce((acc,cur)=> [...acc, cur.value?.data || cur?.reason?.response?.data],[]))
                setUploading(false);
            })
            .catch(function(err) {
                setUploading(false);
            });
    };

    const handleDelete = (index) => {
        setSelectedFiles((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1);
            return updatedFiles;
        });
        setUploadProgress((prevProgress) => {
            const updatedProgress = [...prevProgress];
            updatedProgress.splice(index, 1);
            return updatedProgress;
        });
    };

    useEffect(()=>{
      let  tempA = [...allResponse]
      let temp =   selectedFiles?.reduce((acc,cur, i)=>{
          return [...acc ,{ file: cur, data: tempA[i] }]
        },[])

        if(!temp?.reduce((acc,cur)=> [...acc, cur?.data?.success] ,[])?.includes(false) && temp?.length > 0 && !temp?.reduce((acc,cur)=> [...acc, cur?.data] ,[])?.includes(undefined) ){
            handleOpenModal("CommonPop", {header: "Success", body: 'Upload form16A user wise has been uploaded successfully.',});
            setDisplayMsg(temp)
        }
        if(temp?.reduce((acc,cur)=> [...acc, cur?.data?.success] ,[])?.includes(false) && temp?.length > 0 && !temp?.reduce((acc,cur)=> [...acc, cur?.data] ,[])?.includes(undefined) ){
            handleErrorOpenModal("PdfFileFailedPopup", temp.filter(item => item.data.success === false));
            setDisplayMsg([])
        }

    },[allResponse]);

    // useEffect(()=>{
    //     let  tempA = [...allResponse]
    //     let temp =   selectedFiles?.reduce((acc,cur, i)=>{
    //         return [...acc ,{ file: cur, data: tempA[i] }]
    //       },[])
    //       setDisplayMsg(temp)
    // }, [allResponse]);
    
    const handleErrorOpenModal = (type, data) => {
        switch (type) {
            case 'PdfFileFailedPopup':
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
            <div className={'modal_main_popup distribution_form_upload_pdf'}>
                <div className={'add_admin_user_popup_title modal_popup_title'}>
                    <h2>{ `Upload User Wise Form 16A PDF` }</h2>
                </div>
                <form onSubmit={(e)=>handleUpload(e)}>
                    <div className={'file-upload_main_section'}>
                        <div className="file-upload-container">
                            <span>
                         <input type="file" multiple  accept="application/pdf" onChange={handleFileSelect} />
                        <div>
                            <span role="img" aria-label="plus" className="anticon anticon-plus"><svg
                                viewBox="64 64 896 896" focusable="false" data-icon="plus" width="1em" height="1em"
                                fill="currentColor" aria-hidden="true"><path
                                d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"/><path
                                d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"/></svg>
                            </span>
                            <div >Upload</div>
                        </div>
                    </span>
                        </div>
                    </div>
                    <div className={'form_pdf_section'}>
                        {
                            (selectedFiles?.length > 0 && allResponse?.length <= 0) ?
                                selectedFiles?.map((file, index) => (
                                    <div className={'upload_pdf_file mb_2'}>
                                        <div className={'img'}>
                                        <img src={ pdfIcon } alt={'pdfIcon'}/>
                                        </div>
                                        <div key={index} className={'upload_pdf_file_inner'}>
                                            <div className={'upload_pdf_file_inner_delete'}>
                                                <span>{file.name}</span>
                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => handleDelete(index)}
                                                    disabled={uploading}
                                                >
                                                    <DeleteOutlineOutlinedIcon />
                                                </IconButton>
                                            </div>
                                            <LinearProgress variant="determinate" value={uploadProgress[index]} />
                                        </div>
                                    </div>
                                ))
                                : selectedFiles?.length > 0 && allResponse?.length > 0 &&
                                displayMsg?.map((res, index)=> {
                                    return <>
                                        <div className={ res?.data?.success ? 'upload_pdf_file upload_pdf_file_success mb_2' : 'upload_pdf_file upload_pdf_file_error  mb_2'}>
                                            <div className={'img'}>
                                                <img src={ res?.data?.success ? pdfIcon : pdfIconRed} alt="pdficon"/>
                                            </div>
                                            <div key={index} className={'upload_pdf_file_inner'}>
                                                <div className={'upload_pdf_file_inner_delete'}>
                                                    <span>{res.file.name}</span>
                                                    {/*<IconButton*/}
                                                    {/*    color="secondary"*/}
                                                    {/*    onClick={() => handleDelete(index)}*/}
                                                    {/*    disabled={uploading}*/}
                                                    {/*>*/}
                                                    {/*    <DeleteIcon />*/}
                                                    {/*</IconButton>*/}
                                                </div>
                                                <LinearProgress variant="determinate" value={uploadProgress[index]} />
                                                <div>
                                                    <p> {res?.data?.message === "Cannot read property 'split' of undefined" ? 'The provided PDF file is invalid. Please make sure to attach a valid PDF file.' : res?.data?.message || res?.data?.msg }</p>
                                                </div>
                                            </div>

                                        </div>
                                    </>
                                } )
                        }
                    </div>
                    <div className={'formData_btn d_flex_end'}>
                        <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                        <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'btn loader_css'} loading={uploading } />
                    </div>

                </form>
            </div>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleErrorOpenModal} isBackground={true}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleErrorOpenModal} modalIsOpen={modalDetails.modalIsOpen}  />
            </CommonModal>


        </Box>
    )
}
export default  UploadForm16APDF