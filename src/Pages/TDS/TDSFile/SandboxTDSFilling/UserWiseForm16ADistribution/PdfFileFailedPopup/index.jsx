import React from "react";
import {Box, Button} from "@mui/material";
import pdfIcon from "../../../../../../assets/images/pdfIcon.png";
import pdfIconRed from "../../../../../../assets/images/pdfIconred.png";
import LinearProgress from "@material-ui/core/LinearProgress";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: '32px 0',
    borderRadius: "5px",
};

const PdfFileFailedPopup = ({modalValue, handleOpenModal}) => {

    const closeModalPop = () => {
        handleOpenModal();
    }
    return (
        <Box sx={style}>
        <div className={'modal_main_popup distribution_form_upload_pdf error_popup_pdf'}>
            <div className={'add_admin_user_popup_title modal_popup_title'}>
                <h2>{ `Error` }</h2>
            </div>
            <form >
                <div className={'form_pdf_section'}>
                    {
                            modalValue?.map((res, index)=> {
                                return <>
                                    <div className={ res?.data?.success ? 'upload_pdf_file upload_pdf_file_success mb_2' : 'upload_pdf_file upload_pdf_file_error  mb_2'}>
                                        <div className={'img'}>
                                            <img src={ res?.data?.success ? pdfIcon : pdfIconRed}/>
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
                                            <LinearProgress variant="determinate" value={100} />
                                            <div>
                                                <p> {res?.data?.message === "Cannot read property 'split' of undefined" ? 'The provided PDF file is invalid. Please make sure to attach a valid PDF file.' : res?.data?.message || res?.data?.msg }</p>
                                            </div>
                                        </div>

                                    </div>
                                </>
                            } )
                    }
                </div>
            </form>
            <div style={{textAlign:'center'}} className={'mt_2'}>
                <Button style={{ width: "50%" }} variant="contained" color="primary" type="submit" onClick={() => closeModalPop()}>{" "}OK{" "}</Button>
            </div>
        </div>
        </Box>
    )
}
export default PdfFileFailedPopup