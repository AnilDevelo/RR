import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../hoc/PopContent";
import {getLeaderboardGameList} from "../../../../../Redux/Bonus/action";
import moment from "moment";
import {createInternalAdsList, updateInternalAdsList} from "../../../../../Redux/Master/action";
import {Box} from "@mui/material";
import {profileImages} from "../../../../../utils";
import user from "../../../../../assets/images/avatar.png";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import DropdownList from "../../../../../Components/Dropdown/DropdownList";
import GameListDropdown from "../../../../Marketing/InternalAdsList/CreateAds/GameListDropdown";
import FilledButton from "../../../../../Components/FileButton";
import CommonModal from "../../../../../hoc/CommonModal";
import {getChallanExportFileDetails} from "../../../../../Redux/TDSReport/action";

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
const ExportFileTDS = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [, updateState] = useState({});
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [formData, setFormData] = useState({
        financialQuarter: '',
        year: '',
    });
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modalDetails, setModalDetails] = useState({modalValue: '', modalName: '', modalIsOpen: false});
    const [openCale, setOpenCale] = useState({
        year: false,
    })
    let Modal = PopComponent[modalDetails.modalName];


    const handleOpenErrorModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({...modalDetails, modalValue: data, modalName: type, modalIsOpen: true});
                break;
            }
            default: {
                setModalDetails({...modalDetails, modalIsOpen: false})
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                financialQuarter: +formData?.financialQuarter?.split(' ')?.[1],
                financialYear: moment(formData?.year).format('YYYY'),
            }
            setLoader(true)
            dispatch(getChallanExportFileDetails(payload)).then(res => {
                if (res?.data?.data?.filePath) {
                    setLoader(false)
                    window.open(res?.data?.data?.filePath,"_blank");
                    handleOpenModal()
                } else {
                    setLoader(false)
                    handleOpenErrorModal('CommonPop', {header: "Error", body: res?.data?.message || res?.data?.msg})
                }
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }


        return (
            <Box sx={style}>
                <div className={'add_admin_user_popup modal_main_popup'}>
                    <div className={'modal_popup_title'}>
                        <h2>{'Export Challan File'}</h2>
                    </div>
                    <div className={'header_slider_details header_slider_details_Ads'}>
                        <form className='form_group '
                              onSubmit={ (e) => handleSubmit(e)}>

                            <div className={'date-picker_coupon'}>
                                <div className={'start-date-picker'}>
                                    <label>Financial Year <span className={'validation-star'}>*</span></label>
                                    <div className={'date_picker_value'}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                views={['year']}
                                                maxDate={new Date()}
                                                value={formData?.year}
                                                onChange={(date)=>{
                                                    setOpenCale({...openCale, year:false})
                                                    setFormData({...formData, year : date})
                                                }}
                                                className={'w_100'}
                                                inputFormat="yyyy"
                                                open={openCale?.year}
                                                onClose={() => setOpenCale({...openCale, year: false})}
                                                inputProps={{ readOnly: true , placeholder: "Select Start Date"}}
                                                renderInput={(params) => <TextField {...params} helperText={null} onClick={() => setOpenCale({...openCale, year:!openCale?.year})} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                    {simpleValidator.current.message("financialYear", formData?.year, "required")}
                                </div>
                            </div>
                            <div className={'date-picker_coupon monthly-bonus-type'}>
                                <div className={'start-date-picker'}>
                                    <label> Financial Quarter <span className={'validation-star'}>*</span></label>
                                    <DropdownList name={'financialQuarter'} options={['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4']} placeholder={'Select Financial Quarter'}
                                                  setFormData={setFormData} formData={formData}/>
                                    {simpleValidator.current.message("financialQuarter", formData?.financialQuarter, "required")}
                                </div>
                            </div>

                            {/*--------------------------------------- Game Logo [End] ----------------------------------------- */}
                            <div className={'formData_btn'}>
                                <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                                <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'btn loader_css'} loading={loader}/>
                            </div>
                        </form>
                    </div>
                </div>
                <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen}
                             handleOpenModal={handleOpenErrorModal}>
                    <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenErrorModal}
                           modalIsOpen={modalDetails.modalIsOpen}/>
                </CommonModal>
            </Box>
        )

}
export default ExportFileTDS