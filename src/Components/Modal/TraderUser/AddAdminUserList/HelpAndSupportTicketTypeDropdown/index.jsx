import React, {useEffect, useRef, useState} from "react";
import FormControl from "@mui/material/FormControl";
import {helpTicketTypeArr} from "../../../../../utils";


const HelpAndSupportTicketTypeDropdown = ( {setPermission, permission, handleOpenModal, modalValue, helpTicketType, setHelpTicketType, formData,setFormData, gameFilterData}) => {
    const ref = useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isMenuOpen && ref.current && !ref.current.contains(e.target) && e.target.id !== 'profileIcon') { setIsMenuOpen(false) }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => { document.removeEventListener("mousedown", checkIfClickedOutside) }
    }, [isMenuOpen]);

    useEffect(()=>{
        let temp = [...helpTicketType];
        let index =  temp?.findIndex(item=> item?.value === 'selectAll');
        let gameIndex =  temp?.findIndex(item=> item?.value === 'helpAndSupportGame');
        let walletIndex =  temp?.findIndex(item=> item?.value === 'helpAndSupportWallet');
        let managementIndex =  temp?.findIndex(item=> item?.value === 'helpAndSupportTicket');
        temp[index]['selectAll'].viewer = !!(temp[gameIndex]['helpAndSupportGame']?.viewer && temp[walletIndex]['helpAndSupportWallet']?.viewer && temp[managementIndex]['helpAndSupportTicket']?.viewer);
        setHelpTicketType(temp);
    },[permission]);

    const handleCloseSearchBtn = () => {
        setSearchValue('');
        setHelpTicketType(helpTicketTypeArr);
    };

    const handleChange = (e) => {
        let temp = [...helpTicketType];
        setSearchValue(e.target.value)
        if (e.target.value) {
            let filter = temp?.filter(item => (item.label).toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
            setHelpTicketType(filter)
        } else {
            setHelpTicketType(helpTicketTypeArr)
        }
    };

    const handleChangeCheckbox = (e, index, name, row) => {
        let temp = [...helpTicketType];
        let gameIndex =  temp?.findIndex(item=> item?.value === row?.helpAndSupportGame);
        let walletIndex =  temp?.findIndex(item=> item?.value === row?.helpAndSupportWallet);
        let managementIndex =  temp?.findIndex(item=> item?.value === row?.helpAndSupportTicket);

        if(e.target.checked){
            if(row?.label === 'Select All'){
                temp[index][name].viewer = true;
                temp[gameIndex]['helpAndSupportGame'].viewer = true;
                temp[walletIndex]['helpAndSupportWallet'].viewer = true;
                temp[managementIndex]['helpAndSupportTicket'].viewer = true;
            }else {
                temp[index][name].viewer = true;
            }
            setFormData({
                ...formData,
                ticketType:'Yes'
            })
        }else{
            if(row?.label === 'Select All'){
                temp[index][name].viewer = false;
                temp[gameIndex]['helpAndSupportGame'].viewer = false;
                temp[walletIndex]['helpAndSupportWallet'].viewer = false;
                temp[managementIndex]['helpAndSupportTicket'].viewer = false;
                temp[index][name].editor = false;
                temp[gameIndex]['helpAndSupportGame'].editor = false;
                temp[walletIndex]['helpAndSupportWallet'].editor = false;
                temp[managementIndex]['helpAndSupportTicket'].editor = false;
            }else{
                temp[index][name].viewer = false;
                temp[index][name].editor = false;
            }
            setFormData({
                ...formData,
                ticketType:'No'
            })
        }

        if(row?.label === 'Select All'){
            setPermission({
                ...permission,
                [row?.helpAndSupportGame]: temp[gameIndex][row?.helpAndSupportGame],
                [row?.helpAndSupportWallet]: temp[walletIndex][row?.helpAndSupportWallet],
                [row?.helpAndSupportTicket]: temp[managementIndex][row?.helpAndSupportTicket],
            })
        }else {
            setPermission({
                ...permission,
                [name]: temp[index][name]
            })
        }
        setHelpTicketType(temp)
    };

    const handleEditorChange = (e, index, name) => {
        let temp = [...helpTicketType];
        if (e.target.checked) {
            temp[index][name].editor = true
        } else {
            let temp = [...helpTicketType];
            temp[index][name].editor = false
        }
        setPermission({
            ...permission,
            [name]: temp[index][name]
        })
        setHelpTicketType(temp)
    };

    useEffect(()=>{
       if(modalValue?.isEdit){
           let temp = [...helpTicketTypeArr];
           const { data } = modalValue;
           let indexes = temp.reduce((r, v, i) => r.concat(Object.keys(data?.adminUserPermission).includes(v?.value) ? i : []), []);

           indexes?.forEach(ele=>{
             let payload = {
                 ...temp[ele],
                [temp[ele]?.value]: {
                  ...data?.adminUserPermission[temp[ele].value]
               }
             }

             if(payload?.[temp[ele].value]?.allowedGames?.length > 0){
                let gameData = gameFilterData.filter((item, i) => payload?.[temp[ele].value]?.allowedGames.includes(item?.value));

                 payload = {
                     ...payload,
                     [temp[ele]?.value]: {
                         ...data?.adminUserPermission[temp[ele].value],
                         allowedGames: gameData
                     }
                 }
             }
               temp[ele] = payload;
           });

             setHelpTicketType(temp)
       }
    },[modalValue?.isEdit, gameFilterData]);

    return(
        <FormControl fullWidth>
            <div className={'default_dropdown category_listing_dropdown admin_role_testing'}>
                <div className={'dropdown_value_details'} id="profileIcon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <div className={'cate-main-details'}>
                        {helpTicketType?.map(item => {
                            return (
                                (item[item.value]?.viewer && item?.value !== 'selectAll') &&
                                <span className={'cate-admin-details'}>{item[item.value]?.viewer ? ` ${item?.label}` : ''}</span>
                            )
                        })
                        }
                        {
                            helpTicketType?.filter(item => item[item.value]?.viewer)?.length > 0 ? '' : <span className={'placeholder-admin-role'}>Select  Role Level</span>
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
                                    helpTicketType?.map((item, index) => {
                                        return (
                                            <li>
                                                <div className={'dropdown_content_list_field'}>
                                                    <input id={item?.label} type={'checkbox'} checked={item[item?.value]?.viewer} name={item?.value} onChange={(e) => handleChangeCheckbox(e, index, item?.value, item)} />
                                                    <label htmlFor={item?.label}>{item?.label}</label>
                                                </div>
                                                {
                                                    item?.value !== 'selectAll' &&
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
                                                }
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
export default HelpAndSupportTicketTypeDropdown