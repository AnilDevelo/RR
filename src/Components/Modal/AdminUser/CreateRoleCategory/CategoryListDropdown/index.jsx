import React, { useEffect, useRef, useState } from "react";
import FormControl from "@mui/material/FormControl";
import {AdminRole, helpTicketTypeArr} from "../../../../../utils";

const CategoryListDropdown = ({ setPermission, permission, handleOpenModal, modalValue }) => {
    const ref = useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [router, setRouter] = useState(AdminRole);
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        setRouter(AdminRole);
    }, [handleOpenModal]);

    useEffect(() => {
        if (localStorage.getItem('closeModal')) {
            let temp = [];
            router?.forEach(ele => {
                temp.push({
                    label: ele?.label,
                    [ele?.value]: { editor: false, viewer: false },
                    value: ele?.value
                })
            })
            setRouter(temp);
            localStorage.removeItem('closeModal')
        }
    }, []);

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
            setPermission({
                ...permission,
                ...payload
            })
            setRouter(temp)
        }
    }, [modalValue.isEdit, handleOpenModal]);

    const handleChange = (e) => {
        let temp = [...router];
        setSearchValue(e.target.value)
        if (e.target.value) {
            let filter = temp?.filter(item => (item.label).toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
            setRouter(filter)
        } else {
            setRouter(AdminRole)
        }
    };

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isMenuOpen && ref.current && !ref.current.contains(e.target) && e.target.id !== 'profileIcon') {
                setIsMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => { document.removeEventListener("mousedown", checkIfClickedOutside) }
    }, [isMenuOpen])

    const handleChangeCheckbox = (e, index, name) => {
        let temp = [...router];
        if (e.target.checked) {
            temp[index][name].viewer = true;
        } else {
            let temp = [...router];
            temp[index][name].viewer = false;
            temp[index][name].editor = false;
        }
        setPermission({
            ...permission,
            [name]: temp[index][name]
        })
        setRouter(temp)
    };

    const handleEditorChange = (e, index, name) => {
        let temp = [...router];
        if (e.target.checked) {
            temp[index][name].editor = true
        } else {
            let temp = [...router];
            temp[index][name].editor = false
        }
        setPermission({
            ...permission,
            [name]: temp[index][name]
        })

        setRouter(temp)
    };

    const handleCloseSearchBtn = () => {
        setSearchValue('');
        setRouter(AdminRole);
    }


    return (
        <FormControl fullWidth>
            <div className={'default_dropdown category_listing_dropdown admin_role_testing'}>
                <div className={'dropdown_value_details'} id="profileIcon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <div className={'cate-main-details'}>
                        {router?.map(item => {
                            return (
                                item[item.value]?.viewer &&
                                <span className={'cate-admin-details'}>{item[item.value]?.viewer ? ` ${item?.label}` : ''}</span>
                            )
                        })
                        }
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
                                <p onClick={() => handleCloseSearchBtn()}>
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
    )
}
export default CategoryListDropdown