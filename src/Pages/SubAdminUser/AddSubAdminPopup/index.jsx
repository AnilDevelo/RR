import React, {useCallback, useEffect, useRef, useState} from "react";
import {Box} from "@mui/material";
import FilledButton from "../../../Components/FileButton";
import SimpleReactValidator from "simple-react-validator";
import PermissionCategory from "./PermissionCategory";
import HelpAndSupportTicketType from "./HelpAndSupportTicketType";
import {agentDetails, helpTicketTypeArr} from "../../../utils";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {MultiSelect} from "react-multi-select-component";
import {useDispatch} from "react-redux";
import { addSubAdminUserList, updateSubAdminUserList} from "../../../Redux/AdminUser/action";

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


const AddSubAdminPopup = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    //let agentDataDetails = JSON.parse(localStorage.getItem('agentData')) || cookies.get('agentData');
    //let agentDataDetails = cookies.get('agentData');
    let agentDataDetails =  agentDetails();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [formData,setFormData] = useState({
        email: '',
        fullName: '',
        phoneNumber:'',
        permission:{},
        helpTicketType:helpTicketTypeArr,
        gameDropdown:[],
        permissionValidation:''
    });

    // useEffect(() => {
    //     if(agentDataDetails?.permission?.helpAndSupportGame?.allowedGames?.length > 0){
    //         dispatch(getLeaderboardGameList()).then(res => {
    //             let temp = [...agentDataDetails?.permission?.helpAndSupportGame?.allowedGames]
    //             const results =  res.data.data.filter(({ _id: id2 }) => temp.some((id) => id2 === id));
    //             setFormData({
    //                 ...formData,
    //                 gameDropdown: results?.map((item) => { return { value: item?._id, label: item?.gameName} }) || []
    //             });
    //         })
    //     }
    //
    // }, []);

    useEffect(() => {
        if (formData?.permission) {
            let  temp =  Object?.keys(formData?.permission).reduce((acc,cur) => (formData?.permission[cur]?.editor || formData?.permission[cur]?.viewer) ? [...acc, cur] : acc?.filter(item => item !== cur) ,[]);
            let helpValid =  formData?.helpTicketType?.reduce((acc,cur)=> (cur[cur?.value]?.viewer || cur[cur?.value]?.editor) ? [...acc, cur.value ] : acc?.filter(item => item !== cur.value) ,[] );
            setFormData({
                ...formData,
                permissionValidation: temp?.length > 0 ? 'valid' : '',
                ticketValidation: helpValid?.length > 0 ?  'valid' : '',
            });
        }
    }, [formData?.permission]);

    useEffect(()=>{
        if(modalValue?.isEdit){
            const { data } = modalValue;
            setFormData({
                ...formData,
                email: modalValue?.data?.email,
                phoneNumber: data?.phoneNumber,
                fullName: data?.fullName,
            });
        }
    },[modalValue?.isEdit, formData?.gameDropdown]);

    const changeHandlerFunction = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                email: formData?.email,
                fullName: formData?.fullName,
                phoneNumber:formData?.phoneNumber,
                permission: {
                    ...formData?.permission
                }
            }

            if(!payload?.phoneNumber) {
                delete payload?.phoneNumber
            }

            // if(payload?.permission?.helpAndSupportGame?.allowedGames?.length > 0){
            //     payload = {
            //         ...payload,
            //         permission: {
            //             ...payload?.permission,
            //             helpAndSupportGame:{
            //                 ...formData?.permission.helpAndSupportGame,
            //                 allowedGames: formData?.permission?.helpAndSupportGame?.allowedGames?.map(item => item?.value)
            //             }
            //         }
            //     }
            // }
            setLoader(true);
            dispatch(addSubAdminUserList(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false);
                    redirectApiHandler();
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                } else {
                    handleOpenModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg });
                }
            });

        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };



    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                adminUserId: modalValue?.data?._id,
                email: formData?.email,
                fullName: formData?.fullName,
                phoneNumber: formData?.phoneNumber,
                permission: {
                    ...formData?.permission
                }
            }
            setLoader(true);
            dispatch(updateSubAdminUserList(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false);
                    redirectApiHandler();
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                } else {
                    handleOpenModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg });
                }
            });
        }else{
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };

    const cancelHandler = () => {
        handleOpenModal();
    };

    return(
        <>
            <Box sx={style}>
                <div className={'modal_main_popup add_admin_user_popup'}>
                    <div className={'modal_popup_title'}>
                        <h2>{`${modalValue?.isEdit ? 'Update Sub Admin' : 'Add Sub Admin'}`}</h2>
                    </div>
                    <div className={'add_admin_user_popup_content'}>
                        <form method={'POST'} onSubmit={modalValue?.isEdit ? (e)=>handleEditSubmit(e) : (e)=>handleSubmit(e)}>
                            <div className="formData">
                                <label>Enter Full Name </label>
                                <div className="emailWrap input_length_counter">
                                    <input type="text" name='fullName' value={formData?.fullName}  placeholder={'Enter Full Name'} className={'wrap_input_modal'} maxLength={20}   onChange={(e)=>changeHandlerFunction(e)} />
                                    <span>{formData?.fullName?.length}/20</span>
                                </div>
                                {simpleValidator.current.message("fullName", formData?.fullName, 'required')}
                            </div>
                            <div className={'admin_list_flex'}>
                                <div className="formData left_side_filed">
                                    <label>Enter Email</label>
                                    <div className="emailWrap">
                                        <input type="email" name='email' value={formData?.email} placeholder={'Enter Email'} className={modalValue?.isEdit ? 'disabled-email' : ''}  readOnly={modalValue?.isEdit} onChange={(e)=>changeHandlerFunction(e)} />
                                    </div>
                                    {simpleValidator.current.message("email", formData?.email, "required|email")}
                                </div>
                                <div className="formData right_side_filed">
                                    <label>Enter Phone Number</label>
                                    <div className="emailWrap">
                                        <input type="tel"  name='phoneNumber' value={ formData?.phoneNumber }   maxLength={10} placeholder={'Enter Phone Number'}  onChange={(e)=>changeHandlerFunction(e)} />
                                    </div>
                                </div>
                            </div>
                            <div className={'add_admin_user_role'}>
                                <div className="role_admin">
                                    <label> Select Access Role </label>
                                    <PermissionCategory formData={formData} setFormData={setFormData}  handleOpenModal={handleOpenModal} modalValue={modalValue} />
                                    {simpleValidator.current.message("adminUserPermission", formData?.permissionValidation, "required")}
                                </div>
                            </div>
                            {/*{*/}
                            {/*    (formData?.permission?.helpAndSupport?.editor || formData?.permission?.helpAndSupport?.viewer) &&*/}
                            {/*    <>*/}
                            {/*        <div className={'formData role-game-wise'}>*/}
                            {/*            <label>Select Help & Support Ticket Type </label>*/}
                            {/*            <HelpAndSupportTicketType formData={formData} setFormData={setFormData}  handleOpenModal={handleOpenModal} modalValue={modalValue} />*/}
                            {/*            {simpleValidator.current.message("ticketType", formData?.ticketValidation, "required")}*/}
                            {/*        </div>*/}
                            {/*        {*/}
                            {/*            ( formData?.helpTicketType?.filter(item => item?.value === 'helpAndSupportGame')?.reduce((acc,cur)=>{ return {...cur}},{})?.helpAndSupportGame?.editor || formData?.helpTicketType?.filter(item => item?.value === 'helpAndSupportGame')?.reduce((acc,cur)=>{ return {...cur}},{})?.helpAndSupportGame?.viewer) &&(*/}
                            {/*                <div className={'formData role-game-wise'}>*/}
                            {/*                    <label>Select Game </label>*/}
                            {/*                    <MultiSelect*/}
                            {/*                        options={formData?.gameDropdown}*/}
                            {/*                        value={formData?.permission?.helpAndSupportGame?.allowedGames || [] }*/}
                            {/*                        onChange={(value)=>{setFormData({*/}
                            {/*                                ...formData,*/}
                            {/*                                permission: {*/}
                            {/*                                    ...formData.permission,*/}
                            {/*                                    ['helpAndSupportGame']: {*/}
                            {/*                                        ...formData?.permission?.helpAndSupportGame,*/}
                            {/*                                        allowedGames: value*/}
                            {/*                                    }*/}
                            {/*                                }*/}
                            {/*                            })}}*/}
                            {/*                        labelledBy="Select State"*/}
                            {/*                        name='adminUserPermission'*/}
                            {/*                        arrowRenderer={() => <ArrowDropUpIcon />}*/}
                            {/*                    />*/}
                            {/*                    {simpleValidator.current.message("allowedGames", formData?.permission?.helpAndSupportGame?.allowedGames, "required")}*/}
                            {/*                </div>*/}
                            {/*            )*/}
                            {/*        }*/}

                            {/*    </>*/}
                            {/*}*/}
                            <div className={'formData_btn d_flex_end'}>
                                <button className={'btn_default'} type={'reset'} onClick={() => cancelHandler()}>Cancel</button>
                                <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'btn loader_css'} loading={loader} />
                            </div>
                        </form>
                    </div>
                </div>
            </Box>
        </>
    )
}
export default AddSubAdminPopup;