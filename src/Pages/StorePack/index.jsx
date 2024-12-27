import React, { useCallback, useEffect, useRef, useState } from "react";
import PopComponent from "../../hoc/PopContent";
import { Box } from "@mui/material";
import Loader from "../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../hoc/CommonTable";
import TableCell from "@material-ui/core/TableCell";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { createStorePack, getStorePackListing, updateStorePackDetails } from "../../Redux/storePack/action";
import CommonModal from "../../hoc/CommonModal";
import SimpleReactValidator from "simple-react-validator";
import MainCommonFilter from "../../Components/MainCommonFilter";
import {currencyFormat, decimalGenerate} from "../../utils";

const StorePack = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [filterData, setFilterData] = useState({ search: "", filterClose: false, });
    const storeList = useSelector(state => state?.storePackReducer?.storeList);
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [, updateState] = useState({});
    const simpleValidator = useRef(new SimpleReactValidator());
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState({ amount: '', packageName: '', offerPercentage: '', offerName: '' })
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'DeleteSDKVersion': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };

    const columns = [
        {
            id: 'amount',
            numeric: false,
            disablePadding: false,
            label: 'Pack Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(row?.amount)}</TableCell>
            }
        },
        {
            id: 'packageName',
            numeric: true,
            disablePadding: false,
            label: 'Pack Name',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'sd_textcapitalize'}>{row?.packageName}</TableCell>
            }

        },
        {
            id: 'offerName',
            disablePadding: false,
            label: 'Offer Name',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'sd_textcapitalize'}>{row?.offerName}</TableCell>
            }
        },
        {
            id: 'offerPercentage',
            disablePadding: false,
            label: 'Offer Percentage',
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.offerPercentage}%</TableCell>
            }
        },
        {
            id: 'action',
            disablePadding: false,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell ><span className='edit_btn edit-btn-action' onClick={() => editStorePackHandler(row)}>Edit</span> <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('DeleteSDKVersion', {
                    storePackageId: row?._id, Type: 'StorePack'
                })}>Delete</span></TableCell>
            }
        },
    ];

    useEffect(() => {
        getStoreListing();
    }, [pagination.rowsPerPage, pagination.page]);

    const getStoreListing = (search) => {
        let payload = {
            searchText: search,
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        };
        setLoader(true);
        dispatch(getStorePackListing(payload)).then(res => {
            setLoader(false);
        });
    };

    const editStorePackHandler = (row) => {
        let filter = storeList?.storeListTable?.filter((item) => item._id === row._id)?.reduce((acc, cur) => ({ ...cur, ...acc }));
        setEditModal(true)
    };

    const closeEditModalHandler = () => {
        setEditModal(false);
    };

    const editStoreDetailsHandler = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            // dispatch(updateStorePackDetails(state)).then((res)=>{
            //     if(res.data.statusCode === 200 && res.data.success){
            //         setEditModal(false)
            //         reset()
            //         handleOpenModal('CommonPop', { header: "Success", body: res.data.message })
            //     }else{
            //         handleOpenModal('CommonPop', { header: "Error", body: res.data.message || res.data.msg })
            //     }
            // })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }

    };

    const storeDetailsHandler = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            // dispatch(createStorePack(state)).then((res)=>{
            //     if(res.data.statusCode === 200 && res.data.success){
            //         reset()
            //         getStoreListing()
            //         handleOpenModal('CommonPop', { header: "Success", body: res.data.message })
            //     }else{
            //         handleOpenModal('CommonPop', { header: "Error", body: res.data.message || res.data.msg })
            //     }
            //
            // })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }

    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    };

    return (
        <Box>
            {/* { loader ? <Loader /> : "" } */}
            <div className={'store-pack-section'}>
                <Box className={'store-pack-inner-box'}>
                    <form onSubmit={editModal ? editStoreDetailsHandler : storeDetailsHandler}>
                        <div className={'store-pack-form-sec'}>
                            <div className={'store-pack-input-sce'}>
                                <label>Pack Amount</label>
                                <input onWheel={event => event.currentTarget.blur()} value={formData.amount} type={'number'} name={'amount'} placeholder={'Enter Pack Amount'} onChange={(e) => handleChange(e)} />
                            </div>
                            {simpleValidator.current.message("amount", formData?.amount, "required")}
                        </div>

                        <div className={'store-pack-form-sec'}>
                            <div className={'store-pack-input-sce'}>
                                <label>Pack Name</label>
                                <input type={'text'} placeholder={'Enter Pack Name'} value={formData.packageName} name={'packageName'} onChange={(e) => handleChange(e)} />
                            </div>
                            {simpleValidator.current.message("Package Name", formData?.packageName, "required")}
                        </div>
                        <div className={'store-pack-form-sec'}>
                            <div className={'store-pack-input-sce'}>
                                <label>Offer Name</label>
                                <input type={'text'} name={'offerName'} placeholder={'Enter Offer Name'} value={formData.offerName} onChange={(e) => handleChange(e)} />

                            </div>
                        </div>
                        <div className={'store-pack-form-sec'}>
                            <div className={'store-pack-input-sce'}>
                                <label>Offer Percentage(%)</label>
                                <input type={'text'} name={'offerPercentage'} value={formData.offerPercentage} placeholder={'Enter Offer Percentage(%)'} onChange={(e) => handleChange(e)} />
                            </div>
                        </div>
                        {
                            editModal ?
                                <div className={'store-pack-button '}>
                                    <label>Action</label>
                                    <div className={'sd_flex store-button-flex-button'}>
                                        <button type={'submit'}><svg viewBox="0 0 24 24" x="1008" y="672" fit="" fill={'white'} height="100%" width="25" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06zM17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 000-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" /></svg></button>
                                        <button type={'reset'} onClick={() => closeEditModalHandler()}><svg viewBox="0 0 24 24" x="1008" y="432" fit="" height="100%" width="25" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor" /></svg></button>
                                    </div>
                                </div>
                                :
                                <div className={'store-pack-button'}>
                                    <label>Action</label>
                                    <button type={'submit'}>+</button>
                                </div>
                        }
                    </form>
                </Box>
            </div>
            <Paper sx={{ mb: 2 }} className="outerbox">
                <MainCommonFilter
                    filterData={filterData}
                    setFilterData={setFilterData}
                    searchApiHandler={getStoreListing}
                    pagination={pagination}
                    setPagination={setPagination}
                    addPropsFilter={{ isAvatar: true }}
                />
                <CustomTable
                    headCells={columns}
                    rowData={[]}
                    totalDocs={0}
                    pagination={pagination}
                    setPagination={setPagination}
                    loading={loader}
                />
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Box>
    );
};
export default StorePack;