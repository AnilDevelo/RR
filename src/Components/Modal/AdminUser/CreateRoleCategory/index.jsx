import { Box } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import FilledButton from "../../../FileButton";
import SimpleReactValidator from 'simple-react-validator';
import {useDispatch, useSelector} from "react-redux";
import CategoryListDropdown from "./CategoryListDropdown";
import { addRoleCategory, updateRoleCategoryList } from "../../../../Redux/AdminUser/action";
import { AdminRole } from "../../../../utils";
import {MultiSelect} from "react-multi-select-component";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {getLeaderboardGameList} from "../../../../Redux/Master/action";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};

const CreateRoleCategory = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const [formData, setFormData] = useState({ adminUserRoleName: ''});
    const [permission, setPermission] = useState('')
    const dispatch = useDispatch();
    const [modalClose, setModalClose] = useState(true)
    const [, updateState] = useState({});
    const [permissionData, setPermissionData] = useState('')
    const forceUpdate = useCallback(() => updateState({}), []);
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [gameFilterData, setGameFilterData] = useState([]);

    let HelpTicketType = [
        {
            value:'Games',
            label:'Games'
        },
        {
            value:'Wallet',
            label:'Wallet'
        },
        {
            value:'Management',
            label:'Management'
        },
    ]

    useEffect(() => {
        dispatch(getLeaderboardGameList()).then(res => {
            setGameFilterData(res.data.data?.docs?.map((item) => { return { value: item?._id, label: item?.gameName} }) || [])
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let temp = {}
            AdminRole?.forEach(ele => {
                if (Object?.keys(permission)?.length) {
                    if (permission?.[ele.value]?.viewer || permission?.[ele.value]?.editor) {
                        temp = {
                            ...temp,
                            [ele.value]: permission?.[ele.value]
                        }
                    }
                }
            });
            let payload = {
                permission: { ...temp },
                ...formData,
            }
            setLoader(true);
            dispatch(addRoleCategory(payload)).then(res => {
                if (res.data.success) {
                    redirectApiHandler();
                    setLoader(false);
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                } else {
                    setLoader(false)
                    handleOpenModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg });
                }
            });
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

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
    }, [permission, modalValue])

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let temp = {}
            AdminRole?.forEach(ele => {
                if (Object?.keys(permission)?.length) {
                    if (permission?.[ele.value]?.viewer || permission?.[ele.value]?.editor) {
                        temp = {
                            ...temp,
                            [ele.value]: permission?.[ele.value]
                        }
                    }
                }
            });
            let payload = {
                permission: {
                    ...temp,
                },
                ...formData,
                adminUserRoleId: modalValue?.data?._id
            }
            setLoader(true);
            dispatch(updateRoleCategoryList(payload)).then(res => {
                if (res.data.success) {
                    setLoader(false);
                    redirectApiHandler();
                    handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
                } else {
                    setLoader(false)
                    handleOpenModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg });
                }
            });
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }
    useEffect(() => {
        if (modalValue?.isEdit) {
            setFormData({
                ...formData,
                adminUserRoleName: modalValue?.data?.adminUserRoleName
            })
        }
    }, []);

    const cancelHandler = () => {
        setModalClose(false)
        handleOpenModal();
    }

    return (
        <Box sx={style}>
            <div className={'add_admin_user_popup'}>
                <div className={'add_admin_user_popup_title'}>
                    <h2>{`${modalValue?.isEdit ? 'Update Role Category' : 'Add Role Category'}`}</h2>
                </div>
                <div className={'add_admin_user_popup_content_pop'}>
                    <form method={'POST'} onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className="formData">
                            <label>Role Name </label>
                            <div className="emailWrap">
                                <input type="text" name='adminUserRoleName' placeholder={'Enter Role Name'} value={formData?.adminUserRoleName} onChange={(e) => handleChange(e)} />
                            </div>
                            {simpleValidator.current.message("adminUserRoleName", formData?.adminUserRoleName, "required")}
                        </div>
                        <div className="role_admin">
                            <label>Select Access Role Level </label>
                            <CategoryListDropdown setPermission={setPermission} permission={permission} handleOpenModal={handleOpenModal} modalValue={modalValue} modalClose={modalClose} />
                            {simpleValidator.current.message("adminUserPermission", permissionData, "required")}
                        </div>
                        {/*{*/}
                        {/*    permission?.helpAndSupport?.editor || permission?.helpAndSupport?.viewer &&*/}
                        {/*        <>*/}
                        {/*            <div className={'formData role-game-wise'}>*/}
                        {/*                <label>Select Help & Support Ticket Type </label>*/}
                        {/*                <MultiSelect*/}
                        {/*                    options={HelpTicketType}*/}
                        {/*                    value={formData?.helpTicketType}*/}
                        {/*                    onChange={(value) => setFormData({ ...formData, helpTicketType: value })}*/}
                        {/*                    labelledBy="Select State"*/}
                        {/*                    name='adminUserPermission'*/}
                        {/*                    arrowRenderer={() => <ArrowDropUpIcon />}*/}
                        {/*                />*/}
                        {/*                {simpleValidator.current.message("state", formData?.states, "required")}*/}
                        {/*            </div>*/}
                        {/*            {*/}
                        {/*                formData?.helpTicketType?.filter(item => item?.label === 'Games')?.length > 0 &&*/}
                        {/*                 <div className={'formData role-game-wise'}>*/}
                        {/*                     <label>Select Game </label>*/}
                        {/*                     <MultiSelect*/}
                        {/*                         options={gameFilterData}*/}
                        {/*                         value={formData?.selectGame}*/}
                        {/*                         onChange={(value) => setFormData({ ...formData, selectGame: value })}*/}
                        {/*                         labelledBy="Select State"*/}
                        {/*                         name='adminUserPermission'*/}
                        {/*                         arrowRenderer={() => <ArrowDropUpIcon />}*/}
                        {/*                     />*/}
                        {/*                     {simpleValidator.current.message("state", formData?.states, "required")}*/}
                        {/*                 </div>*/}
                        {/*            }*/}
                        {/*        </>*/}
                        {/*}*/}


                        <div className={'formData_btn'}>
                            <button className={'cancel_btn'} onClick={() => cancelHandler()}>Cancel</button>
                            <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'loader_css submit_btn'} loading={loader} />
                        </div>
                    </form>
                </div>
            </div>
        </Box>
    )
}
export default CreateRoleCategory