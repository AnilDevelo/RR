import React, {useCallback, useEffect, useRef, useState} from "react";
import SimpleReactValidator from "simple-react-validator";
import {Box} from "@mui/material";
import FilledButton from "../../../../Components/FileButton";


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

const ExportFilePopup =  ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const {filterData,pagination, setFilterData, setPagination, csvDownload, exportFile, exportFileName} = modalValue?.exportProps;
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [loader, setLoader] = useState(false);
    const [userRange,setUserRange] = useState({startRange:'', endRange : ''});
    const simpleValidator = useRef( new SimpleReactValidator({
        validators: {
            startDownloadRecord:{
                message: "Please enter less start records than total records.",
                rule: (val, params, validator) => {
                    return +val <= modalValue?.totalDocs
                },
                required: true
            },
            endDownloadRecord: {
                message: "Please enter a end record that is greater than or equal to the start record and less than the total user record.",
                rule: (val, params, validator) => {
                    return (+val <= modalValue?.totalDocs &&  +val >= +localStorage.getItem('startRange'))
                },
                required: true
            }
        }
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            setFilterData({
                ...filterData,
                exportFileName: 'Export File',
                csvDownload:csvDownload,
                exportFile:exportFile
            });
            setPagination({
                ...pagination,
                endRange: +userRange?.endRange === +userRange?.startRange  ? 1 : (+userRange?.endRange - +userRange?.startRange) + 1 ,
                startRange:  +userRange?.startRange - 1
            });
            localStorage.removeItem('startRange')
            handleOpenModal();
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };

    return (
        <Box sx={style}>
            <div className={'add_admin_user_popup modal_main_popup export_file_user'}>
                <div className={'modal_popup_title'}>
                    <h2>Export {exportFileName}</h2>
                </div>
                <div className={'header_slider_details header_slider_details_Ads'}>
                    <form className='form_group ' onSubmit={(e) => handleSubmit(e)}>
                        {/*--------------------------------------- Game Logo [Start] ----------------------------------------- */}
                        <div className={'date-picker_coupon'}>
                            <div className={'start-date-picker'}>
                                <label>Start Download Record <span className={'validation-star'}>*</span></label>
                                <div className={'formData'}>
                                    <input type="text" className={'wrap_input_modal'} maxLength={10} value={userRange?.startRange} name='startRange' placeholder={'Enter Start Download Record'}  onChange={(e)=>{
                                        const { name, value } = e.target;
                                        // Check if the value is numeric
                                        if (!isNaN(value)) {
                                            setUserRange((prevFormData) => ({
                                                ...prevFormData,
                                                startRange :  /^0/.test(value) ? value.replace(/^0/, "") : value,
                                            }));
                                        }
                                        localStorage.setItem('startRange', !isNaN(value) ? /^0/.test(value) ? value.replace(/^0/, "") : value: '')
                                    }} />
                                </div>
                                {simpleValidator.current.message("startDownloadRecord", userRange?.startRange?.toString(), "required|startDownloadRecord")}
                            </div>
                            <div className={'end-date-picker'}>
                                <label>End Download Record <span className={'validation-star'}>*</span></label>
                                <div className={'formData'}>
                                    <input type="text"  className={'wrap_input_modal'} maxLength={10}  value={userRange?.endRange?.toString()}  name='gameName' placeholder={'Enter End Download Record'} onChange={(e)=>{
                                        const { name, value } = e.target;
                                        // Check if the value is numeric
                                        if (!isNaN(value)) {
                                            setUserRange((prevFormData) => ({
                                                ...prevFormData,
                                                endRange :  /^0/.test(value) ? value.replace(/^0/, "") : value,
                                            }));
                                        }
                                    }}  />
                                </div>
                                { simpleValidator.current.message("endDownloadRecord", userRange?.endRange, ['required', 'endDownloadRecord'])}
                            </div>
                        </div>
                        {/*--------------------------------------- Game Logo [End] ----------------------------------------- */}
                        <div className={'formData_btn'}>
                            <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                            <FilledButton type={'submit'} value={ 'Download'} className={'btn loader_css'} loading={loader} />
                        </div>
                    </form>
                </div>
            </div>

        </Box>
    )
}
export default ExportFilePopup