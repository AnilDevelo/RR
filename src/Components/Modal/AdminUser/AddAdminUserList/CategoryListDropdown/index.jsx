import React, { useEffect, useRef, useState } from "react";
import FormControl from "@mui/material/FormControl";
import { AdminRole, helpTicketTypeArr } from "../../../../../utils";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Typography } from "@mui/material";

const CategoryListDropdown = ({ setPermission, permission, handleOpenModal, modalValue }) => {
    const ref = useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [router, setRouter] = useState(AdminRole);
    const [list, setList] = useState(AdminRole);
    const [searchValue, setSearchValue] = useState('')

    // Reset the router when the handleOpenModal changes
    useEffect(() => {
        setRouter(AdminRole);
    }, [handleOpenModal]);
// Update the router based on localStorage when the component mounts
        useEffect(() => {
          if (localStorage.getItem("closeModal")) {
            let temp = [];
            let tempList = [];
            for(const ele of router){
              temp.push({
                ...ele,
                label: ele?.label,
                [ele?.value]: { editor: false, viewer: false },
                value: ele?.value,
              });
            }
            for(const ele of list){
              tempList.push({
                ...ele,
                label: ele?.label,
                [ele?.value]: { editor: false, viewer: false },
                value: ele?.value,
              });
            }
            setList(tempList)
            setRouter(temp);
            localStorage.removeItem("closeModal");
          }
        }, [isMenuOpen]);

    // Update the router and permission based on modalValue.isEdit

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

    // Handle input change in the search field

    // const handleChange = (e) => {
    //     let temp = [...router];
    //     setSearchValue(e.target.value)
    //     if (e.target.value) {
    //         let filter = temp?.filter(item => (item.label).toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
    //         setRouter(filter)
    //     } else {
    //         setRouter(AdminRole)
    //     }
    // };
    const handleChange = (e) => {
        let temp = [...router];
        setSearchValue(e.target.value);
        let filter = list?.filter(
          (item) =>
            item.label.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
        );
        setRouter(filter);
      };
    // Close the menu if clicked outside the component

    useEffect(() => {
        const checkIfClickedOutside = e => {
            let profileIcon = document.getElementById('profileIconDropdown')
                if (isMenuOpen && ref.current && !ref.current.contains(e.target) && !profileIcon.contains(e.target)) {
                    setIsMenuOpen(false)
                }
            
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => { document.removeEventListener("mousedown", checkIfClickedOutside) }
    }, [isMenuOpen])

    // Handle checkbox change for viewer permissions

    // const handleChangeCheckbox = (e, index, name) => {
    //     if(name === 'all'){
    //         let temp = [...router];
    //         let payload = {}
    //         if (e.target.checked) {
    //             temp?.forEach(ele=>{
    //                 ele[ele?.value].viewer = true
    //                 payload = {
    //                     ...payload,
    //                     [ele?.value]: ele[ele?.value]
    //                 }
    //             })
    //         }else {
    //             temp?.forEach(ele=>{
    //                 ele[ele?.value].viewer = false;
    //                 ele[ele?.value].editor = false;
    //                 payload = {
    //                     ...payload,
    //                     [ele?.value]: ele[ele?.value]
    //                 }
    //             })
    //         }
    //         setPermission({
    //             ...permission,
    //             ...payload
    //         })
    //         setRouter(temp)
    //     }else {
    //         let temp = [...router];
    //         if (e.target.checked) {
    //             let tempArray = []
    //             temp[index][name].viewer = true;
    //             temp?.forEach(ele=>{
    //                 if(ele?.label !== 'All Modules'){
    //                     tempArray.push(ele[ele?.value].viewer)
    //                 }
    //             })
    //             if(!tempArray?.includes(false)){
    //                 temp?.forEach(ele=>{
    //                     temp[0][temp[0].value].viewer = true
    //                     ele[ele?.value].viewer = true
    //                 })
    //             }
    //         } else {
    //             let temp = [...router];
    //             temp[0][temp[0].value].viewer =false
    //             temp[0][temp[0].value].editor =false

    //             temp[index][name].viewer = false;
    //             temp[index][name].editor = false;
    //         }
    //         setPermission({
    //             ...permission,
    //             all: temp[0]['all'],
    //             [name]: temp[index][name]
    //         })
    //         setRouter(temp)
    //     }
    // };

    const handleChangeCheckbox = (e, _, name, id) => {
        const index = list.findIndex((obj) => obj.id === id)
        if (name === "all") {
          let temp = [...AdminRole];
          let payload = {};
          if (e.target.checked) {
           
            const keyNameArray = temp.map(({ value }) => value);
            for (const iterator in keyNameArray) {
              temp[iterator] = {
                ...temp[iterator],
                [keyNameArray[iterator]]: { viewer: true, editor: false },
              };
              payload = {
                ...payload,
                [keyNameArray[iterator]]: { viewer: true, editor: false },
              };
            }
          } else {
            const keyNameArray = temp.map(({ value }) => value);
            for (const iterator in keyNameArray) {
              temp[iterator] = {
                ...temp[iterator],
                [keyNameArray[iterator]]: { viewer: false, editor: false },
              };
              payload = {
                ...payload,
                [keyNameArray[iterator]]: { viewer: false, editor: false },
              };
            }
            
          }
          setPermission({
            ...permission,
            ...payload,
          });
          setList([...temp]);
          setRouter([...temp]);
        } else {
          let temp = [...list];
          if (e.target.checked) {
            let tempArray = [];
            temp[index][name].viewer = true;
            temp?.forEach((ele) => {
              if (ele?.label !== "All Modules") {
                tempArray.push(ele[ele?.value].viewer);
              }
            });
            if (!tempArray?.includes(false)) {
              temp?.forEach((ele) => {
                temp[0][temp[0].value].viewer = true;
                ele[ele?.value].viewer = true;
              });
            }
          } else {
                
            temp[0] = { ...temp[0], all: { editor: false, viewer: false } };
    
            temp[index] = {...temp[index], [name]:  { editor: false, viewer: false }}
          }
          setPermission({
            ...permission,
            all: temp[0]["all"],
            [name]: temp[index][name],
          });
          setList([...temp]);
          setRouter([...temp]);
        }
      };

// Handle checkbox change for editor permissions

    // const handleEditorChange = (e, index, name) => {
    //     if(name === 'all'){
    //         let temp = [...router];
    //         let payload = {}
    //         if (e.target.checked) {
    //             temp?.forEach(ele=>{
    //                 ele[ele?.value].editor = true
    //                 payload = {
    //                     ...payload,
    //                     [ele?.value]: ele[ele?.value]
    //                 }
    //             })
    //         }else {
    //             temp?.forEach(ele=>{
    //                 ele[ele?.value].editor = false;
    //                 payload = {
    //                     ...payload,
    //                     [ele?.value]: ele[ele?.value]
    //                 }
    //             })
    //         }
    //         setPermission({
    //             ...permission,
    //             ...payload
    //         })
    //         setRouter(temp)
    //     }else {
    //         let temp = [...router];
    //         if (e.target.checked) {
    //             let tempArray = []
    //             temp[index][name].editor = true;

    //             temp?.forEach(ele=>{
    //                 if(ele?.label !== 'All Modules'){
    //                     tempArray.push(ele[ele?.value].editor)
    //                 }
    //             });

    //             if(!tempArray?.includes(false)){
    //                 temp?.forEach(ele=>{
    //                     ele[ele?.value].editor = true
    //                 })
    //             }

    //         } else {
    //             let temp = [...router];
    //             temp[index][name].editor = false
    //             temp[0][temp[0].value].editor =false
    //         }
    //         setPermission({
    //             ...permission,
    //             all:{
    //                 ...permission.all,
    //                 editor:false
    //             },
    //             [name]: temp[index][name]
    //         })

    //         setRouter(temp)
    //     }
    // };
    
    const handleEditorChange = (e, index, name, id) => {
        if (name === "all") {
          let temp = [...router];
          let payload = {};
          if (e.target.checked) {
            temp?.forEach((ele) => {
              ele[ele?.value].editor = true;
              payload = {
                ...payload,
                [ele?.value]: ele[ele?.value],
              };
            });
          } else {
            temp?.forEach((ele) => {
              ele[ele?.value].editor = false;
              payload = {
                ...payload,
                [ele?.value]: ele[ele?.value],
              };
            });
          }
          setPermission({
            ...permission,
            ...payload,
          });
          setRouter(temp);
        } else {
          let temp = [...router];
          if (e.target.checked) {
            let tempArray = [];
            temp[index][name].editor = true;
    
            temp?.forEach((ele) => {
              if (ele?.label !== "All Modules") {
                tempArray.push(ele[ele?.value].editor);
              }
            });
            if (!tempArray?.includes(false)) {
              temp?.forEach((ele) => {
                ele[ele?.value].editor = true;
              });
            }
          } else {
            let temp = [...router];
            temp[index][name].editor = false;
            temp[0][temp[0].value].editor = false;
          }
          if (temp[0]?.all?.editor === true) {
            setPermission({
              ...permission,
              all: {
                ...permission.all,
                editor: true,
              },
              [name]: temp[index][name],
            });
          } else {
            setPermission({
              ...permission,
              all: {
                ...permission.all,
                editor: false,
              },
              [name]: temp[index][name],
            });
          }
          // setPermission({
          //   ...permission,
          //   all: {
          //     ...permission.all,
          //     editor: false,
          //   },
          //   [name]: temp[index][name],
          // });
    
          setRouter(temp);
        }
      };
// Reset the search and router to default
    const handleCloseSearchBtn = () => {
        setSearchValue('');
        setRouter(AdminRole);
    }

    const renderNoDataFound = () => {
        return <Typography variant="body2" color="textSecondary" align="center" style={{margin:"1rem"}}>
        No data found
      </Typography>
      };
    return (
        <FormControl fullWidth>
            <div className={'default_dropdown category_listing_dropdown admin_role_testing'} >
                <div className={'dropdown_value_details'} id="profileIconDropdown" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <div className={'cate-main-details w_100'}>
                        <span>
                            {
                                router?.filter(item=> item[item.value]?.viewer)?.length === AdminRole?.length ?
                                    "All roles are selected."
                                    :
                                    router?.filter(item=> item[item.value]?.viewer)?.map(item => item?.label)?.join()
                            }
                        </span>
                        {
                            router?.filter(item => item[item.value]?.viewer)?.length > 0 ? '' : 
                            <div className="dropdown_icon_admin">
                            <span className={'placeholder-admin-role'}>Select  Role Level </span>
                            </div>
                        }
                    </div>
                    <div className="mat-select-arrow-wrappe ">
                        <div className="mat-select-arrow " />
                        <ArrowDropDownIcon/>
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
                        {router.length ? 
                        <div className={'dropdown_content_list '}>
                            <ul className={'admin_role_ul'}>
                                {
                                    router?.map((item, index) => {
                                        return (
                                            <li>
                                                <div className={'dropdown_content_list_field'}>
                                                    <input id={item?.label} type={'checkbox'} checked={item[item?.value]?.viewer} name={item?.value} onChange={(e) => handleChangeCheckbox(e, index, item?.value,item?.id)} />
                                                    <label htmlFor={item?.label}>{item?.label}</label>
                                                </div>
                                                <div className={'dropdown_content_list_sub'}>
                                                    <div className={'dropdown_content_list_field'}>
                                                        {
                                                            item[item?.value]?.viewer ?
                                                                <input id={`editor${index}`} name={`editor${index}`} checked={item[item?.value]?.editor} type={'checkbox'} onChange={(e) => handleEditorChange(e, index, item?.value, item?.id)} /> :
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
                        :   router?.length === 0 && renderNoDataFound()}
                    </div>
                }
            </div>
        </FormControl>
    )
}
export default CategoryListDropdown