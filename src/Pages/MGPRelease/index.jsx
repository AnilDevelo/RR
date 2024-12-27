import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import PopComponent from "../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import {deleteMgpReleases, getMgpReleases} from "../../Redux/MGPRelease/action";
import Loader from "../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../hoc/CommonTable";
import CommonModal from "../../hoc/CommonModal";
import Box from "@material-ui/core/Box";
import {ActionFunction, dotGenerator, hideActionFunc} from "../../utils";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Switch from "@mui/material/Switch";
import moment from "moment";
import MainCommonFilter from "../../Components/MainCommonFilter";

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const MGPRelease = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    let Modal = PopComponent[modalDetails.modalName];
    const [releaseBuild,setReleaseBuild] = useState({
        buildCopy: '',
        copied:''
    })

    useEffect(()=>{
        setTimeout(()=>{
            setReleaseBuild({
                ...releaseBuild,
                copied:''
            })
        },1000)
    },[releaseBuild.copied])

    const columns = [
        {
            id: 'releaseNumber',
            numeric: true,
            disablePadding: false,
            isDisbanding: true,
            label: 'Date & Time',
            twoLineText: true,
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment(row?.createdAt).format('MMM DD YYYY, hh:mm A')}</TableCell>
            }
        },
        {
            id: 'releaseNumber',
            numeric: true,
            disablePadding: false,
            isDisbanding: true,
            label: 'Release Number',
        },
        {
            id: 'releaseNote',
            numeric: true,
            disablePadding: false,
            isDisbanding: true,
            label: 'Release Note',
            type: 'custom',
            render: (row) => {
                let text = new DOMParser().parseFromString(row?.releaseNote, "text/html").documentElement.textContent
                return <TableCell >{dotGenerator(text, handleOpenModal, 'Release Notes')}</TableCell>
            }
        },

        {
            id: 'rolloutStage',
            numeric: true,
            disablePadding: false,
            isDisbanding: true,
            label: 'Roll Out Stage',
        },

        {
            id: 'releaseBuild',
            label: 'Release Build',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell ><a href={row?.releaseBuild} className={'edit_btn edit-btn-action'} target={'_blank'} >Download</a> </TableCell>
            }
        },
        {
            id: 'releaseBuild',
            label: 'Release Build URL',
            isDisbanding: true,
            type: 'custom',
            render: (row, i ) => {
                return <TableCell className={'pl_3'}>
                    {
                        releaseBuild?.copied === i ?
                            <span style={{color: 'red'}}>Copied.</span>
                            :
                            <CopyToClipboard text={row?.releaseBuild}
                                             onCopy={() => setReleaseBuild({
                                                 ...releaseBuild,
                                                 copied: i
                                             })}>
                                <span className={'edit_btn edit-btn-action'}>Copy</span>
                            </CopyToClipboard>
                    }
                </TableCell>
            }
        },
        {
            id: 'releaseBuild',
            label: 'Status',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.isActive ? "Activate" : "Deactivate"}</TableCell>
            }
        },
        ActionFunction('mgpRelease', {
            id: 'action',
            label: 'Action',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                let getMGReleaseList;
                return <TableCell className={'role_field_id'}>
                    <span className={ row?.isDeleted ? '' : 'u_border' }>
                        {
                            row?.isActive ?
                                <Switch {...label} checked={row?.isActive === true} disabled={row?.isDeleted} onClick={() => handleOpenModal('ActiveDeactivateMGPRelease', { MgpReleaseId: row?._id, isActive: false })} />
                                :
                                <Switch {...label} checked={row?.isActive === true} disabled={row?.isDeleted} onClick={() => handleOpenModal('ActiveDeactivateMGPRelease', { MgpReleaseId: row?._id, isActive: true })} />
                        }
                    </span>
                    {
                       !row?.isDeleted &&
                       <span className='edit_btn edit-btn-action prTab' onClick={() => handleOpenModal('DeleteCommonModal',
                           { deleteListApiHandler: deleteMgpReleases({ MgpReleaseId: row?._id, isDeleted:true , deletedAt:moment.utc().format()}), title: 'Do you want to delete this data?' })}>Delete</span>
                    }

                    {/*<span className='edit_btn edit-btn-action' onClick={(e) => handleOpenModal('AddMGPRelease', {isEdit: true, row})}>Edit</span>*/}
                </TableCell>
            }
        })
    ];


    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddMGPRelease': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewRejectedComment': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'HaltRollOutPopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'UpdateRollOutPopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ActiveDeactivateMGPRelease' : {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal' :{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };

    useEffect(() => {
        getMGReleaseList();
    }, [pagination.rowsPerPage, pagination.page]);

    const getMGReleaseList = () => {
        let payload = {
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            limit: pagination.rowsPerPage,
            isDeleted: false
        }
        Object?.keys(payload).forEach(ele => {
            if (payload[ele] === '' || payload[ele] === null) { delete payload[ele] }
        });
        setLoader(true);
        dispatch(getMgpReleases(payload)).then(res => {
            setLoader(false);
            if (res.data.success) {
                setRowData({
                    ...rowData,
                    list: res?.data?.data?.docs,
                    totalDocs: res?.data?.data?.totalDocs
                });
            }
        });
    };

    return (
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
               <div className={'d_flex justify_content_end align_items_center mgp_release_box'}>
                   {
                       hideActionFunc('mgpRelease') &&
                       <div className={'d_flex_end'}>
                           <button className={'btn'} onClick={(e) => handleOpenModal('AddMGPRelease')}> + Add MGP Release</button>
                       </div>
                   }

               </div>
                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list}
                    totalDocs={rowData?.totalDocs}
                    pagination={pagination}
                    setPagination={setPagination}
                    loading={loader}
                />
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getMGReleaseList} />
            </CommonModal>
        </Box>
    );
};

export default MGPRelease;