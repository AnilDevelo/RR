import React, { useCallback, useEffect, useRef, useState } from "react";
import FilledButton from "../../../FileButton";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { Box, Grid, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};

const AddTraderUserList = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [commissionRate, setCommissionRate] = useState('');
    const [formData, setFormData] = useState({
        traderName: '',
        email: '',
        phoneNumber: '',
        commissionRate: '',
        traderId: '',  // auto-generated
        createDate: '',  // auto-generated
    });

    const simpleValidator = useRef(new SimpleReactValidator());

    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        // Auto-generate trader ID and current date/time on component mount or when modalValue changes
        if (modalValue?.isEdit) {
            setFormData({
                ...formData,
                traderId: modalValue?.data?.traderId || `TR-${Date.now()}`, // Example auto-generate
                createDate: modalValue?.data?.createDate || new Date().toLocaleString(),
            });
        } else {
            setFormData({
                ...formData,
                traderId: `TR-${Date.now()}`, // Example auto-generate
                createDate: new Date().toLocaleString(),
            });
        }
    }, [modalValue]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
                commissionRate, // Add commission rate if set
            };
            setLoader(true);
            // dispatch(createTraderUser(payload)).then((res) => {
            //     if (res.data.success) {
            //         setLoader(false);
            //         redirectApiHandler();
            //         handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
            //     } else {
            //         handleOpenModal('CommonPop', { header: "Error", body: res?.data?.message });
            //     }
            // });
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };

    const cancelHandler = () => {
        handleOpenModal();
    };

    const changeHandlerFunction = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <Box sx={style}>
            <div className={'modal_main_popup add_admin_user_popup'}>
                <div className={'modal_popup_title'}>
                    <h2>{`${modalValue?.isEdit ? 'Update Trader' : 'Add Trader'}`}</h2>
                </div>
                <div className={'add_admin_user_popup_content'}>
                    <form method={'POST'} onSubmit={handleSubmit}>
                        <div className="formData">
                            <label>Enter Trader Name <span className={'validation-star'}>*</span></label>
                            <div className="emailWrap">
                                <input type="text" name='traderName' value={formData?.traderName} placeholder={'Enter Trader Name'} className={'wrap_input_modal'} maxLength={40} onChange={(e) => changeHandlerFunction(e)} />
                            </div>
                            {simpleValidator.current.message("traderName", formData?.traderName, 'required')}
                        </div>

                        <div className="formData">
                            <label>Enter Email <span className={'validation-star'}>*</span></label>
                            <div className="emailWrap">
                                <input type="email" name='email' value={formData?.email} placeholder={'Enter Email'} className={'wrap_input_modal'} onChange={(e) => changeHandlerFunction(e)} />
                            </div>
                            {simpleValidator.current.message("email", formData?.email, "required|email")}
                        </div>

                        <div className="formData">
                            <label>Enter Phone Number</label>
                            <div className="emailWrap">
                                <input type="text" name='phoneNumber' value={formData?.phoneNumber} placeholder={'Enter Phone Number'} onChange={(e) => changeHandlerFunction(e)} />
                            </div>
                            {simpleValidator.current.message("phoneNumber", formData?.phoneNumber, "required|phone")}
                        </div>

                        <div className="formData">
                            <label>Commission Rate</label>
                            <div className="emailWrap">
                                <input type="text" name='commissionRate' value={commissionRate} placeholder={'Enter Commission Rate'} onChange={(e) => setCommissionRate(e.target.value)} />
                            </div>
                        </div>

                        <div className="formData">
                            <label>Trader ID (Auto-generated)</label>
                            <div className="emailWrap">
                                <input type="text" name='traderId' value={formData?.traderId} placeholder={'Trader ID'} disabled />
                            </div>
                        </div>

                        <div className="formData">
                            <label>Create Date and Time (Auto-generated)</label>
                            <div className="emailWrap">
                                <input type="text" name='createDate' value={formData?.createDate} placeholder={'Create Date and Time'} disabled />
                            </div>
                        </div>

                        <div className="formData_btn">
                            <button className={'btn_default mr_2'} type={'reset'} onClick={() => cancelHandler()}>Cancel</button>
                            <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'btn loader_css'} loading={loader} />
                        </div>
                    </form>
                </div>
            </div>
        </Box>
    );
};

export default AddTraderUserList;
