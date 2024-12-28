import React, { useCallback, useEffect, useRef, useState } from "react";
import FilledButton from "../../../FileButton";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import CategoryListDropdown from "./CategoryListDropdown";
import {MultiSelect} from "react-multi-select-component";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import HelpAndSupportTicketTypeDropdown from "./HelpAndSupportTicketTypeDropdown";
import {helpTicketTypeArr} from "../../../../utils";
import { createAdminUserList, updateAdminUserList} from "../../../../Redux/AdminUser/action";
import {getLeaderboardGameList} from "../../../../Redux/Bonus/action";
import { Box, FormControl, FormControlLabel, Radio, RadioGroup,  DialogContent, Grid } from "@mui/material";

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

const AddAdminUserList = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [phoneNumberValidation, setPhoneNumberValidation] = useState(true)
    const [quickPay, setQuickPay] = useState(false);
    const [regularPay, setRegularPay] = useState(false);

    const simpleValidator = useRef(new SimpleReactValidator({
        validators: {
            email: {
                message: "The email must be a valid email address.",
                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val,/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)
                },
                required: true
            },
            phone: {
                message: "Please Enter Valid Phone Number.",
                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val,/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/)
                },
                required: true
            },
        }
    }));
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [permissionData, setPermissionData] = useState('')
    const [permission, setPermission] = useState('')
    const [helpTicketType,setHelpTicketType] =  useState(helpTicketTypeArr);
    const [gameFilterData, setGameFilterData] = useState([]);
    const [commissionRate, setCommissionRate] = useState('');
    const [formData,setFormData] = useState({
        email: '',
        fullName: '',
        phoneNumber:'',
        helpTicketType:'',
        helpTicketGameId:'',
        closeModal:false,
        ticketType: ''
    });

    // useEffect(() => {
    //     dispatch(getLeaderboardGameList()).then(res => {
    //         setGameFilterData(res.data.data?.map((item) => { return { value: item?._id, label: item?.gameName} }) || [])
    //     })
    // }, [modalValue]);
    useEffect(() => {
        if (permission) {
            let temp = []
            Object?.keys(permission).map(ele => {
                if (permission[ele]?.editor || permission[ele]?.viewer) {
                    setPermissionData('Testing')
                    temp.push('Testing')
                }
            });
            if (temp?.length > 0) {
                setPermissionData('Testing')
            } else {
                setPermissionData('')
            }
        }
    }, [permission, modalValue]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData?.phoneNumber === ''){
            simpleValidator.current.fields.phoneNumber = true
        }
        if (simpleValidator.current.allValid()) {
            if (!phoneNumberValidation) {
                let payload = {
                    email: formData?.email,
                    fullName: formData?.fullName,
                    phoneNumber: formData?.phoneNumber,
                    permission: {
                        ...permission
                    }
                }

                Object?.keys(payload).forEach(ele => {
                    if (payload[ele] === '' || payload[ele] === null) { delete payload[ele] }
                });
                setLoader(true);
                dispatch(createAdminUserList(payload)).then(res => {
                    if (res.data.success) {
                        setLoader(false);
                        redirectApiHandler();
                        setPermission({});
                        handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                    } else {
                        handleOpenModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg });
                    }
                });
            }
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }

    const cancelHandler = () => {
        setFormData({
            ...formData,
            closeModal:false
        })
        handleOpenModal();
    };

    const changeHandlerFunction = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
        if (name === "phoneNumber") {
            const numericValue = value.replace(/[^0-9]/g, '');
            setFormData({
                ...formData,
                [name]: numericValue
            })  
        }
    };
    
    

    useEffect(()=>{
          if(modalValue?.isEdit){
              let temp = {...modalValue?.data?.adminUserPermission};
              delete temp['subAdminUser'];
              setPermission(temp);
              setFormData({
                  ...formData,
                  email: modalValue?.data?.email,
                  fullName: modalValue?.data?.fullName,
                  phoneNumber:modalValue?.data?.phoneNumber
              })
          }
    },[modalValue, gameFilterData]);

    const handleEditSubmit = (e) => {
        if(formData?.phoneNumber === ''){
            simpleValidator.current.fields.phoneNumber = true
        }
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            if (!phoneNumberValidation) {
                let payload = {
                    fullName: formData?.fullName,
                    phoneNumber: formData?.phoneNumber,
                    permission: {
                        ...permission
                    },
                    adminUserId: modalValue?.data?._id
                }
                setLoader(true);
                dispatch(updateAdminUserList(payload)).then(res => {
                    if (res.data.success) {
                        setLoader(false);
                        redirectApiHandler();
                        handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                    } else {
                        handleOpenModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg });
                    }
                });
            }
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }

    }

    useEffect(()=>{
        if(formData?.phoneNumber?.toString() === '0000000000'){
            setPhoneNumberValidation(true)
        }else {
            setPhoneNumberValidation(false)
        }
    },[formData?.phoneNumber])


    return (
        <Box sx={style}>
            <div className={'modal_main_popup add_admin_user_popup'}>
                <div className={'modal_popup_title'}>
                    <h2>{`${modalValue?.isEdit ? 'Update Admin' : 'Add Admin'}`}</h2>
                </div>
                <div className={'add_admin_user_popup_content'}>
                    <form method={'POST'} onSubmit={modalValue?.isEdit ? (e)=>handleEditSubmit(e) : (e)=>handleSubmit(e)}>
                        <div className="formData">
                            <label>Enter Full Name <span className={'validation-star'}>*</span> </label>
                            <div className="emailWrap input_length_counter">
                                <input type="text" name='fullName' value={formData?.fullName}  placeholder={'Enter Full Name'} className={'wrap_input_modal'} maxLength={40}   onChange={(e)=>changeHandlerFunction(e)} />
                                <span>{formData?.fullName?.length}/40</span>
                            </div>
                            {simpleValidator.current.message("fullName", formData?.fullName, 'required')}
                        </div>
                        <div className={'admin_list_flex'}>
                            <div className="formData left_side_filed">
                                <label>Enter Email <span className={'validation-star'}>*</span></label>
                                <div className="emailWrap">
                                    <input type="email" name='email' value={formData?.email} placeholder={'Enter Email'} className={modalValue?.isEdit ? 'disabled-email' : ''}  readOnly={modalValue?.isEdit} onChange={(e)=>changeHandlerFunction(e)} />
                                </div>
                                {simpleValidator.current.message("email", formData?.email, "required|email")}
                            </div>
                            <div className="formData right_side_filed">
                                <label>Enter Phone Number</label>
                                <div className="emailWrap">
                                    <input type="text"  name='phoneNumber' value={formData?.phoneNumber}   maxLength={10} placeholder={'Enter Phone Number'}  onChange={(e)=>changeHandlerFunction(e)} />
                                </div>
                                {/* {phoneNumberValidation && <span className={'srv-validation-message'}>Please Enter Valid Phone Number</span>} */}
                                {formData?.phoneNumber && simpleValidator.current.message("phoneNumber", formData?.phoneNumber, "required|numeric|min:10|max:10|phone")}
                            </div>
                          
                        </div>
                          <div className="formData">
                            <label>Commission Rate</label>
                            <div className="emailWrap">
                                <input type="text" name='commissionRate' value={commissionRate} placeholder={'Enter Commission Rate'} onChange={(e) => setCommissionRate(e.target.value)} />
                            </div>
                        </div>
                        <div className={'add_admin_user_role'}>
                            <div className="role_admin">
                                <label>Select Access Role <span className={'validation-star'}>*</span> </label>
                                <CategoryListDropdown setPermission={setPermission} permission={permission} handleOpenModal={handleOpenModal} modalValue={modalValue} modalClose={formData?.closeModal}   />
                                {simpleValidator.current.message("adminUserPermission", permissionData, "required")}
                            </div>
                        </div>

                        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <RadioGroup row value={quickPay || regularPay ? "both" : ""}>
              <FormControlLabel
                control={<Radio checked={quickPay} onChange={() => setQuickPay(!quickPay)} />}
                label="Quick Pay"
              />
              <FormControlLabel
                control={<Radio checked={regularPay} onChange={() => setRegularPay(!regularPay)} />}
                label="Regular Pay"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
                        {/*{*/}
                        {/*    (permission?.helpAndSupport?.editor || permission?.helpAndSupport?.viewer) &&*/}
                        {/*    <>*/}
                        {/*        <div className={'formData role-game-wise'}>*/}
                        {/*            <label>Select Help & Support Ticket Type </label>*/}
                        {/*            <HelpAndSupportTicketTypeDropdown setPermission={setPermission} permission={permission} helpTicketType={helpTicketType} setHelpTicketType={setHelpTicketType} formData={formData} setFormData={setFormData}  modalValue={modalValue} gameFilterData={gameFilterData} />*/}
                        {/*            {simpleValidator.current.message("ticketType", formData?.ticketType, "required")}*/}
                        {/*        </div>*/}
                        {/*        {*/}
                        {/*           ( helpTicketType?.filter(item => item?.value === 'helpAndSupportGame')?.reduce((acc,cur)=>{ return {...cur}},{})?.helpAndSupportGame?.editor || helpTicketType?.filter(item => item?.value === 'helpAndSupportGame')?.reduce((acc,cur)=>{ return {...cur}},{})?.helpAndSupportGame?.viewer) &&(*/}
                        {/*                <div className={'formData role-game-wise'}>*/}
                        {/*                    <label>Select Game </label>*/}
                        {/*                    <MultiSelect*/}
                        {/*                        options={gameFilterData}*/}
                        {/*                        value={permission?.helpAndSupportGame?.allowedGames || [] }*/}
                        {/*                        onChange={(value)=>{*/}
                        {/*                            setPermission({*/}
                        {/*                                ...permission,*/}
                        {/*                                ['helpAndSupportGame']: {*/}
                        {/*                                    ...permission?.helpAndSupportGame,*/}
                        {/*                                    allowedGames: value*/}
                        {/*                                }*/}
                        {/*                            })*/}
                        {/*                        }}*/}
                        {/*                        labelledBy="Select State"*/}
                        {/*                        name='adminUserPermission'*/}
                        {/*                        arrowRenderer={() => <ArrowDropUpIcon />}*/}
                        {/*                    />*/}
                        {/*                    {simpleValidator.current.message("allowedGames", permission?.helpAndSupportGame?.allowedGames, "required")}*/}
                        {/*                </div>*/}
                        {/*            )*/}
                        {/*        }*/}

                        {/*    </>*/}
                        {/*}*/}
                        <div className={'formData_btn '}>
                            <button className={'btn_default mr_2'} type={'reset'} onClick={() => cancelHandler()}>Cancel</button>
                            <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'btn loader_css'} loading={loader} />
                        </div>
                    </form>
                </div>
            </div>
        </Box>
    )
}
export default AddAdminUserList