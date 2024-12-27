import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import { useDispatch } from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import {
    deleteInternalAdsList,
    getInternalAdsConfig,
    getInternalAdsList
} from "../../../Redux/Master/action";
import moment from "moment";
import { ActionFunction, hideActionFunc } from "../../../utils";
import InternalAdsConfig from "./InternalAdsConfig";



const InternalAdsList = () => {
    const dispatch = useDispatch();
    const [internalAdsConfig, setInternalAdsConfig] = useState(false)
    const [loader, setLoader] = useState(false);
    const [formData, setFormData] = useState({isInternalAdsOn:false});
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    let Modal = PopComponent[modalDetails.modalName];

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'CreateAds': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ActiveDeactivatePopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    }

    const columns = [
        {
            id: 'inetrnalAdsBanner',
            label: 'Ads Banner',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell  className={'image_banner_ads'}>
                    <img src={row?.inetrnalAdsBanner} alt={''} />
                </TableCell>
            }
        },
        {
            id: 'startDate',
            label: 'Start Date',
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment(row?.startDate).format('MMM DD YYYY')}</TableCell>
            }
        },
        {
            id: 'expireDate',
            label: 'Expired Date',
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment(row?.expireDate).format('MMM DD YYYY')}</TableCell>
            }
        },
        {
            id: 'redirectToScreen',
            label: 'Navigation',
            type: 'custom',
            render: (row) => {
                return <TableCell >{(row?.redirectToScreen === 'GameDetailsScreen' || row?.gameId ) ? 'Game Details Screen' : row?.redirectToScreen ===  'AddCashScreen' ? 'Add Cash Screen' : row?.redirectToScreen === 'AddCashScreenQR' ? 'Add Cash Screen QR' : row?.redirectToScreen === 'ReferEarn' && 'Refer Earn'}</TableCell>
            }
            //(modalValue?.row?.navigationScreen === 'GameDetailsScreen' || modalValue?.row?.gameId ) ? 'Game Details Screen' : modalValue?.row?.navigationScreen ===  'AddCashScreen' ? 'Add Cash Screen' : formData?.navigationScreen === 'AddCashScreenQR' ? 'Add Cash Screen QR' : modalValue?.row?.navigationScreen === 'ReferEarnScreen' && 'Refer Earn Screen',
        },
        {
            id: 'status',
            label: 'Status',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell ><span className={row?.isActive ? "Approved" : "Reject"}>{row?.isActive ? "Activate" : "Deactivate"}</span></TableCell>
            }
        },
        ActionFunction('marketing', {
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('CreateAds', { isEdit: true, row })}>Edit</span>
                    <span className='edit_btn edit-btn-action u_border prTab' onClick={() => handleOpenModal('DeleteCommonModal',
                        { deleteListApiHandler: deleteInternalAdsList({ internalAdsId: row?._id }), title: 'Do you want to delete the Ads?' })}>
                        Delete
                    </span>
                    {
                        row?.isActive ?
                            <span className='edit_btn edit-btn-action prTab' onClick={() => handleOpenModal('ActiveDeactivatePopup', { internalAdsId: row?._id, isActive: false })}>
                                Deactivate
                            </span>
                            :
                            <span className='edit_btn edit-btn-action prTab' onClick={() => handleOpenModal('ActiveDeactivatePopup', { internalAdsId: row?._id, isActive: true })}>
                                Activate
                            </span>
                    }

                </TableCell>
            }
        })
    ];
    useEffect(()=>{
        getInternalAdsConfigList()
    },[]);

         const getInternalAdsConfigList = () => {
                dispatch(getInternalAdsConfig({})).then(res=>{
                    if(res?.data?.success){
                        setFormData({...formData, isInternalAdsOn : res?.data?.data?.isInternalAdsConfig});
                        setInternalAdsConfig( res?.data?.data?.isInternalAdsConfig);
                        getInternalAdsListDetails()
                    }
                })
            }

    useEffect(() => {
        getInternalAdsListDetails();
    }, [pagination.rowsPerPage, pagination.page]);

    const getInternalAdsListDetails = () => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        };
        setLoader(true);
        dispatch(getInternalAdsList(payload)).then(res => {
            if (res.data.success) {
                setLoader(false);
                setRowData({
                    ...rowData,
                    list: res?.data?.data?.docs,
                    totalDocs: res?.data?.data?.totalDocs
                });
            } else {
                setLoader(false);
                setRowData({
                    ...rowData,
                    list: [],
                    totalDocs: 0
                });
            }
        })
    }

    return (
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <InternalAdsConfig formData={formData} setFormData={setFormData} redirectApiHandler={getInternalAdsConfigList} handleOpenModal={handleOpenModal}  />
            {
                ( internalAdsConfig) &&
                <Paper sx={{ mb: 2 }} className="outer-box">
                    {
                        hideActionFunc('marketing') &&
                        <div className={'d_flex_end'}>
                            <button className={'btn'} onClick={() => handleOpenModal('CreateAds')}> +  Create Promotion Ads </button>
                        </div>
                    }
                    <CustomTable
                        headCells={columns}
                        rowData={rowData?.list}
                        totalDocs={rowData?.totalDocs}
                        pagination={pagination}
                            setPagination={setPagination}
                            loading={loader}
                    />
                </Paper>
            }

            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getInternalAdsListDetails} />
            </CommonModal>
        </Box>
    );
};
export default InternalAdsList;