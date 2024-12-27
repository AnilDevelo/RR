import React, {useEffect, useState} from "react";
import {Box} from "@mui/material";
import Loader from "../../images/Loader";
import Paper from "@mui/material/Paper";
import {  Link } from 'react-router-dom';
import CustomTable from "../../hoc/CommonTable";
import PopComponent from "../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import moment from "moment";
import CommonModal from "../../hoc/CommonModal";
import {deleteSDKVersionDetails, getSdkVersionDetails} from "../../Redux/SDKManagement/action";
import {useDispatch, useSelector} from "react-redux";
import MainCommonFilter from "../../Components/MainCommonFilter";

const SDKManagement = () => {
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false);
    const [pagination,setPagination] = useState({rowsPerPage:10, page:0});
    const sdkVersion = useSelector(state => state?.SDKManagementReducer?.sdkVersion);
    const [filterData, setFilterData] = useState({search: "", filterClose: false,});
    const [modalDetails,setModalDetails] = useState({modalValue:'', modalName:'', modalIsOpen:false});
    let Modal = PopComponent[modalDetails.modalName];

    useEffect(() => {
        getSDKListData();
    }, [pagination.page, pagination.rowsPerPage]);

    const getSDKListData = (startDate, endDate,search) => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        }
        if (search) { payload = {...payload,searchText: search} }
        setLoader(true)
        dispatch(getSdkVersionDetails(payload)).then((res) => {
            if (res.data.statusCode === 200) {
                setLoader(false);
            } else {
                setLoader(false);
            }
        }).catch(e => {
            setLoader(false);
        })
    };

    const columns = [
        {
            id: 'sdkVersion',
            numeric: false,
            disablePadding: false,
            label: 'SDK Version',
        },
        {
            id: 'androidEnvCompatibility',
            numeric: true,
            disablePadding: false,
            label: '\n' +
                'Unity Environment\n' +
                'Compatibility',

        },
        {
            id: 'iosEnvCompatibility',
            disablePadding: false,
            label: 'IOS Environment Compatibility',
        },
        {
            id: 'androidEnvCompatibility',
            disablePadding: false,
            label: 'Android Environment Compatibility',
        },
        {
            id: 'releaseNote',
            disablePadding: false,
            label: 'Release Notes',
            type: 'custom',
            render: (row) => {
                return <TableCell>
                    <Link to={'#'} className={'edit_btn edit-btn-action'} onClick={()=>handleOpenModal('NoteSdkPopup',row?.releaseNote)}>Notes</Link>
                </TableCell>
            }
        },
        {
            id: 'releaseNote',
            disablePadding: false,
            label: 'Release Date',
            type: 'custom',
            render: (row) => {
                return <TableCell>{moment(row?.releaseDate).format('MMM DD YYYY')}</TableCell>
            }
        },
        {
            id: 'action',
            disablePadding: false,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}><span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('AddSDKPopup', row)} >Edit</span>
                    <span className='edit_btn edit-btn-action prTab'
                          onClick={()=> handleOpenModal('DeleteCommonModal',
                              {deleteListApiHandler : deleteSDKVersionDetails({ sdkVersionId: row.id }), title: 'Do you want to delete this data?'})}
                    >Delete</span></TableCell>
            }
        },
    ];

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'AddSDKPopup' : {
                setModalDetails({...modalDetails, modalValue: data, modalName: type, modalIsOpen: true});
                break;
            }
            case 'CommonPop': {
                setModalDetails({...modalDetails, modalValue: data, modalName: type, modalIsOpen: true});
                break;
            }
            case 'NoteSdkPopup':{
                setModalDetails({...modalDetails, modalValue: data, modalName: type, modalIsOpen: true});
                break;
            }
            case 'DeleteCommonModal':{
                setModalDetails({...modalDetails, modalValue: data, modalName: type, modalIsOpen: true});
                break;
            }
            default: {
                setModalDetails({...modalDetails, modalIsOpen: false});
            }
        }
    };

    return(
        <>
            <div className={'store-pack-section'}>
                <Box className={'store-pack-inner-box'}>
                    <div className={'sdk-Box-section'}>
                        <div>
                            <h4>Your SDK</h4>
                        </div>
                        <div className={'store-pack-button '}>
                            <button onClick={() => handleOpenModal('AddSDKPopup')}>Add New SDK</button>
                        </div>
                    </div>
                </Box>
            </div>
            <Box>
                { loader ? <Loader /> : "" }
                <Paper sx={{ mb: 2 }} className="outerbox">
                    <MainCommonFilter
                        filterData={filterData}
                        setFilterData={setFilterData}
                        searchApiHandler={getSDKListData}
                        pagination={pagination}
                        setPagination={setPagination}
                        addPropsFilter={{isAvatar: true}}
                    />
                    <CustomTable
                        headCells={columns}
                        rowData={sdkVersion?.sdkVersionList}
                        totalDocs={sdkVersion?.totalDocs}
                        pagination={pagination}
                        setPagination={setPagination}
                    />
                </Paper>
                <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                    <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getSDKListData}   />
                </CommonModal>
            </Box>
        </>
    )
}
export default SDKManagement;