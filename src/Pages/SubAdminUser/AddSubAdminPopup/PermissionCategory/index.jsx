import React, {useEffect, useRef, useState} from "react";
import FormControl from "@mui/material/FormControl";
import {AdminRole, agentDetails} from "../../../../utils";

const PermissionCategory = ({ formData, setFormData, modalValue, handleOpenModal }) => {
    const ref = useRef();
    //let agentDataDetails = JSON.parse(localStorage.getItem('agentData')) || cookies.get('agentData');
    //let agentDataDetails = cookies.get('agentData');
    let agentDataDetails =  agentDetails();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [router, setRouter] = useState(AdminRole);
    const [searchValue, setSearchValue] = useState('');
    const [update,setUpdate] =useState('')


    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isMenuOpen && ref.current && !ref.current.contains(e.target) && e.target.id !== 'profileIcon') {
                setIsMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => { document.removeEventListener("mousedown", checkIfClickedOutside) }
    }, [isMenuOpen])

    useEffect(()=>{
        if(agentDataDetails?.permission){
            let temp = [...AdminRole];
            let filterRoute = []
            let indexes = temp.reduce((r, v, i) => r.concat(Object.keys(agentDataDetails?.permission).includes(v?.value) ? i : []), []);
            indexes?.forEach(ele=>{
                if(temp[ele][temp[ele]?.value]?.viewer !== agentDataDetails?.permission[temp[ele]?.value]?.viewer || temp[ele][temp[ele]?.value]?.viewer === agentDataDetails?.permission[temp[ele]?.value]?.viewer){
                    if(temp[ele].label !== 'Sub Admin Users'){
                        let payload = {
                            ...temp[ele],
                            [temp[ele]?.value] : {
                                editor:false,
                                viewer:false
                            }
                        }
                        filterRoute.push(payload)
                    }
                }
            });
            setRouter(filterRoute)
        }
    },[]);

    useEffect(() => {
        if (modalValue?.isEdit) {
            const { data } = modalValue;
            let temp = [...router];
            let indexes = temp.reduce((r, v, i) => r.concat(Object.keys(data?.adminUserPermission).includes(v?.value) ? i : []), []);
            let gameKey = temp.filter((item, i) => Object.keys(data?.adminUserPermission).includes(item.value));

            let payload = {};
            if (indexes?.length > 0) {
                indexes?.forEach((ele, i) => {
                    if (gameKey?.length > 1) {
                        temp[ele][gameKey[i].value].viewer = data?.adminUserPermission?.[gameKey[i].value].viewer;
                        temp[ele][gameKey[i].value].editor = data?.adminUserPermission?.[gameKey[i].value].editor;
                        payload = {
                            ...payload,
                            [gameKey[i].value]: temp[ele][gameKey[i].value]
                        }
                    } else {
                        temp[ele][gameKey[i].value].viewer = data?.adminUserPermission?.[gameKey[i].value].viewer;
                        temp[ele][gameKey[i].value].editor = data?.adminUserPermission?.[gameKey[i].value].editor;
                        payload = {
                            ...payload,
                            [gameKey[i].value]: temp[ele][gameKey[i].value]
                        }
                    }
                })
            }
            setFormData({
                ...formData,
                permission:{
                    ...formData.permission,
                    ...payload
                }
            })
            setRouter(temp?.filter(ele=> ele?.label !== 'Sub Admin Users'))
        }
    }, [modalValue, formData.email]);

    // const handleChangeCheckbox = (e, index, name) => {
    //     let temp = [...router];
    //     if (e.target.checked) {
    //         temp[index][name].viewer = true;
    //     } else {
    //         let temp = [...router];
    //         temp[index][name].viewer = false;
    //         temp[index][name].editor = false;
    //     }
    //     setFormData({
    //         ...formData,
    //         permission:{
    //             ...formData.permission,
    //           [name]: temp[index][name]
    //       }
    //     })
    //     setRouter(temp)
    // };


    const handleChangeCheckbox = (e, index, name) => {
        if(name === 'all'){
            let temp = [...router];
            let payload = {}
            if (e.target.checked) {
                temp?.forEach(ele=>{
                    ele[ele?.value].viewer = true
                    payload = {
                        ...payload,
                        [ele?.value]: ele[ele?.value]
                    }
                })

            }else {
                temp?.forEach(ele=>{
                    ele[ele?.value].viewer = false;
                    ele[ele?.value].editor = false;
                })
            }
                setFormData({
                    ...formData,
                    permission:{
                        ...formData.permission,
                        ...payload
                  }
                })
            // setPermission({
            //     ...permission,
            //     ...payload
            // })
            setRouter(temp)
        }else {
            let temp = [...router];
            if (e.target.checked) {
                let tempArray = []
                temp[index][name].viewer = true;
                temp?.forEach(ele=>{
                    if(ele?.label !== 'All'){
                        tempArray.push(ele[ele?.value].viewer)
                    }
                })
                if(!tempArray?.includes(false)){
                    temp?.forEach(ele=>{
                        ele[ele?.value].viewer = true
                    })
                }

            } else {
                let temp = [...router];
                temp[index][name].viewer = false;
                temp[index][name].editor = false;

                temp[0][temp[0].value].viewer =false
                temp[0][temp[0].value].editor =false
            }
            // setPermission({
            //     ...permission,
            //     [name]: temp[index][name]
            // })
            setFormData({
                ...formData,
                permission:{
                    ...formData.permission,
                    [name]: temp[index][name]
                }
            })
            setRouter(temp)
        }
    };


    const handleCloseSearchBtn = () => {
        let temp = [...AdminRole?.reduce((r, v, i) => r.concat(Object.keys(agentDataDetails?.permission).includes(v?.value) ? v : []), [])];
        setSearchValue('');
        setRouter(temp?.filter(ele=> ele?.label !== 'Sub Admin Users'));
    }

    const handleChange = (e) => {
        // let temp = [...router];
        let temp = [...AdminRole?.reduce((r, v, i) => r.concat(Object.keys(agentDataDetails?.permission).includes(v?.value) ? v : []), [])];
        setSearchValue(e.target.value)
        if (e.target.value) {
            let filter = temp?.filter(ele=> ele?.label !== 'Sub Admin Users')?.filter(item => (item.label).toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
            setRouter(filter)
        } else {
            setRouter(temp?.filter(ele=> ele?.label !== 'Sub Admin Users'))
        }
    };

    // const handleEditorChange = (e, index, name) => {
    //     let temp = [...router];
    //     if (e.target.checked) {
    //         temp[index][name].editor = true
    //     } else {
    //         let temp = [...router];
    //         temp[index][name].editor = false
    //     }
    //
    //     setFormData({
    //         ...formData,
    //         permission:{
    //             ...formData.permission,
    //             [name]: temp[index][name]
    //         }
    //     })
    //     setRouter(temp)
    // };

    const handleEditorChange = (e, index, name) => {
        if(name === 'all'){
            let temp = [...router];
            let payload = {}
            if (e.target.checked) {
                temp?.forEach(ele=>{
                    ele[ele?.value].editor = true
                    payload = {
                        ...payload,
                        [ele?.value]: ele[ele?.value]
                    }
                })
            }else {
                temp?.forEach(ele=>{
                    ele[ele?.value].editor = false;
                    payload = {
                        ...payload,
                        [ele?.value]: ele[ele?.value]
                    }
                })
            }
            // setPermission({
            //     ...permission,
            //     ...payload
            // })
                setFormData({
                    ...formData,
                    permission:{
                        ...formData.permission,
                        ...payload
                    }
                })
            setRouter(temp)
        }else {
            let temp = [...router];
            if (e.target.checked) {
                let tempArray = []
                temp[index][name].editor = true;

                temp?.forEach(ele=>{
                    if(ele?.label !== 'All'){
                        tempArray.push(ele[ele?.value].editor)
                    }
                });

                if(!tempArray?.includes(false)){
                    temp?.forEach(ele=>{
                        ele[ele?.value].editor = true
                    })
                }

            } else {
                let temp = [...router];
                temp[index][name].editor = false
                temp[0][temp[0].value].editor =false
            }
            // setPermission({
            //     ...permission,
            //     all:{
            //         ...permission.all,
            //         editor:false
            //     },
            //     [name]: temp[index][name]
            // })

            setFormData({
                ...formData,
                permission:{
                    ...formData.permission,
                    all:{
                        ...formData.permission.all,
                        editor:false
                    },
                    [name]: temp[index][name]
                }
            })

            setRouter(temp)
        }
    };


    // useEffect(()=>{
    //     if(modalValue?.isEdit){
    //         const { data } = modalValue;
    //         let temp = [...router];
    //         let indexes = temp.reduce((r, v, i) => r.concat(Object.keys(data?.adminUserPermission).includes(v?.value) ? i : []), []);
    //         let gameKey = temp.filter((item, i) => Object.keys(data?.adminUserPermission).includes(item.value));
    //         let payload = {};
    //         if(indexes?.length > 0){
    //             indexes?.forEach((cur, i)=>{
    //                 if(temp[cur]?.value !== "subAdminUser"){
    //                     temp[cur][gameKey[i].value].viewer = data?.adminUserPermission?.[gameKey[i].value].viewer;
    //                     temp[cur][gameKey[i].value].editor = data?.adminUserPermission?.[gameKey[i].value].editor;
    //                     payload = {
    //                         ...payload,
    //                         [gameKey[i].value]: temp[cur][gameKey[i].value]
    //                     }
    //                 }
    //             })
    //         }
    //         setFormData({
    //             ...formData,
    //             permission:{
    //                 ...formData.permission,
    //                 ...payload
    //             }
    //         })
    //
    //         setRouter(temp)
    //     }
    // },[modalValue?.isEdit, formData.email]);

    // useEffect(()=>{
    //     if(modalValue?.isEdit){
    //         const { data } = modalValue;
    //         let temp = [...AdminRole?.reduce((r, v, i) => r.concat(Object.keys(agentDataDetails?.permission).includes(v?.value) ? v : []), [])];
    //         let indexes = temp.reduce((r, v, i) => r.concat(Object.keys(data?.adminUserPermission).includes(v?.value) ? i : []), []);
    //         let gameKey = temp.filter((item, i) => Object.keys(data?.adminUserPermission).includes(item.value));
    //
    //         let payload = {};
    //         indexes?.forEach((ele,i)=>{
    //             if(temp[ele].label !== 'Sub Admin Users'){
    //                 temp[ele][gameKey[i].value].viewer = data?.adminUserPermission?.[gameKey[i].value].viewer;
    //                 temp[ele][gameKey[i].value].editor = data?.adminUserPermission?.[gameKey[i].value].editor;
    //                 payload = {
    //                     ...payload,
    //                     [gameKey[i].value]: temp[ele][gameKey[i].value]
    //                 }
    //             }
    //         });
    //         setFormData({
    //             ...formData,
    //             permission:{
    //                 ...formData.permission,
    //                 ...payload
    //             }
    //         })
    //         setRouter(temp?.filter(ele=> ele?.label !== 'Sub Admin Users'))
    //     }
    // },[modalValue?.isEdit]);





    return(
        <>
            <FormControl fullWidth>
                <div className={'default_dropdown category_listing_dropdown admin_role_testing'}>
                    <div className={'dropdown_value_details'} id="profileIcon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <div className={'cate-main-details'}>
                              {/*<span>*/}
                              {/*      {router?.filter(item=> item[item.value]?.viewer)?.map(item => item?.label)?.join()}*/}
                              {/*  </span>*/}
                            <span>
                            {
                                router?.filter(item=> item[item.value]?.viewer)?.length === (AdminRole?.length - 1) ?
                                    "All roles are selected."
                                    :
                                    router?.filter(item=> item[item.value]?.viewer)?.map(item => item?.label)?.join()
                            }
                        </span>
                            {/*{router?.map(item => {*/}
                            {/*    return (*/}
                            {/*        item[item.value]?.viewer &&*/}
                            {/*        <span className={'cate-admin-details'}>{item[item.value]?.viewer ? ` ${item?.label}` : ''}</span>*/}
                            {/*    )*/}
                            {/*})*/}
                            {/*}*/}
                            {
                                router?.filter(item => item[item.value]?.viewer)?.length > 0 ? '' : <span className={'placeholder-admin-role'}>Select  Role Level</span>
                            }
                        </div>
                        <div className="mat-select-arrow-wrappe ">
                            <div className="mat-select-arrow " />
                        </div>
                    </div>
                    {
                        isMenuOpen &&
                        <div className={'dropdown_content_value'} ref={ref}>
                            <div className={'search_filter_dropdown'}>
                                <input placeholder={'Search here'} value={searchValue} onChange={(e) => handleChange(e)} />
                                {
                                    searchValue &&
                                    <p onClick={() => handleCloseSearchBtn()} className={'sub_admin_permission_close_icon'}>
                                        <svg viewBox="0 0 24 24" x="1008" y="432" fit="" height="28" width="25" preserveAspectRatio="xMidYMid meet" focusable="false">
                                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="#64748b" /></svg>
                                    </p>
                                }

                            </div>
                            <div className={'dropdown_content_list '}>
                                <ul className={'admin_role_ul'}>
                                    {
                                        router?.map((item, index) => {
                                            return (
                                                <li>
                                                    <div className={'dropdown_content_list_field'}>
                                                        <input id={item?.label} type={'checkbox'} checked={item[item?.value]?.viewer} name={item?.value} onChange={(e) => handleChangeCheckbox(e, index, item?.value)} />
                                                        <label htmlFor={item?.label}>{item?.label}</label>
                                                    </div>
                                                    <div className={'dropdown_content_list_sub'}>
                                                        <div className={'dropdown_content_list_field'}>
                                                            {
                                                                item[item?.value]?.viewer ?
                                                                    <input id={`editor${index}`} name={`editor${index}`} checked={item[item?.value]?.editor} type={'checkbox'} onChange={(e) => handleEditorChange(e, index, item?.value)} /> :
                                                                    <input id={`editor${index}`} checked={false} name={`editor${index}`} type={'checkbox'} />
                                                            }

                                                            <label htmlFor={`editor${index}`} >Editor</label>
                                                        </div>
                                                        <div className={'dropdown_content_list_field'}>
                                                            <input id={`viewer${index}`} checked={!!item[item?.value]?.viewer} name={`viewer${index}`} type={'checkbox'} />
                                                            <label htmlFor={`viewer${index}`}>Viewer</label>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    }
                </div>
            </FormControl>
        </>
    )
}
export default PermissionCategory;