import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import PopComponent from "../../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import {ActionFunction, dotGenerator, hideActionFunc} from "../../../../../utils";
import {
    checkStatusSandboxEFileTDSReturn,
    checkStatusSandboxPrepareTDSReturn,
    getSandboxEFileTDSReturn,
    getSandboxPrepareTDSReturn
} from "../../../../../Redux/TDSReport/action";
import CustomTable from "../../../../../hoc/CommonTable";
import CommonModal from "../../../../../hoc/CommonModal";
import {CopyToClipboard} from "react-copy-to-clipboard";

const EFileTDSReturnTab = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [fileURL,setFileURL] = useState({
        copied_presigned_url_txt:'',
        copied_presigned_url_csi:''
    })

    useEffect(()=>{
        setTimeout(()=>{
            setFileURL({
                ...fileURL,
                copied_presigned_url_txt:'',
                copied_presigned_url_csi: ''
            })
        },1000)
    },[fileURL.copied_presigned_url_txt, fileURL?.copied_presigned_url_csi])

    const columns = [
        {
            id: 'id',
            numeric: false,
            disablePadding: false,
            label: 'ID',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{`STID000${row?.numericId}`}</TableCell>
            }
        },
        {
            id: "tan",
            numeric: true,
            disablePadding: false,
            label: "Tan Number",
        },
        {
            id: "form",
            numeric: true,
            disablePadding: false,
            label: "Form",
        },
        {
            id: "financial_year",
            numeric: true,
            disablePadding: false,
            label: "Financial Year",
        },
        {
            id: "quarter",
            numeric: true,
            disablePadding: false,
            label: "Quarter",
        },
        {
            id: "job_id",
            numeric: true,
            disablePadding: false,
            label: "Job Id",
        },
        {
            id: "presigned_url_txt",
            numeric: true,
            disablePadding: false,
            label: "Presigned URL TXT",
            type: 'custom',
            render: (row, i ) => {
                return <TableCell className={'pl_3'}>
                    {
                        fileURL?.copied_presigned_url_txt === i ?
                            <span style={{color: 'red'}}>Copied.</span>
                            :
                            <CopyToClipboard text={row?.presigned_url_txt}
                                             onCopy={() => setFileURL({
                                                 ...fileURL,
                                                 copied_presigned_url_txt: i
                                             })}>
                                <span className={'edit_btn edit-btn-action'}>Copy</span>
                            </CopyToClipboard>
                    }
                </TableCell>
            }
        },
        {
            id: "presigned_url_csi",
            numeric: true,
            disablePadding: false,
            label: "Presigned URL CSI",
            type: 'custom',
            render: (row, i ) => {
                return <TableCell className={'pl_3'}>
                    {
                        fileURL?.copied_presigned_url_csi === i ?
                            <span style={{color: 'red'}}>Copied.</span>
                            :
                            <CopyToClipboard text={row?.presigned_url_csi}
                                             onCopy={() => setFileURL({
                                                 ...fileURL,
                                                 copied_presigned_url_csi: i
                                             })}>
                                <span className={'edit_btn edit-btn-action'}>Copy</span>
                            </CopyToClipboard>
                    }
                </TableCell>
            }
        },
        {
            id: "status",
            numeric: true,
            disablePadding: false,
            label: "Status",
        },
        {
            id: "validation_report",
            numeric: true,
            disablePadding: false,
            label: "Validation Report",
            type: 'custom',
            render: (row) => {
                return <TableCell > { row?.validation_report ? <a href={row?.validation_report} className={'edit_btn edit-btn-action'} target={'_blank'} >Download</a> : '_' } </TableCell>
            }
        },{
            id: "message",
            numeric: true,
            disablePadding: false,
            label: "Message",
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.message ? dotGenerator(row?.message, handleOpenModal, 'Status Message') : '-'}</TableCell>
            }
        },
        {
            id: "tds_return",
            numeric: true,
            disablePadding: false,
            label: "Signed URL",
            type: 'custom',
            render: (row) => {
                return <TableCell > { row?.signed_url ? <a href={row?.signed_url} className={'edit_btn edit-btn-action'} target={'_blank'} >Download</a> : '_' } </TableCell>
            }
        },
        ActionFunction('user', {
            id: 'Action',
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id '} >
                    {
                        row?.status === 'JOBFAILED'  ? "-" :
                            <>
                            {
                        !row?.isTXTPutRequest &&
                        <span className='edit_btn edit-btn-action u_border prTab'  onClick={() => handleOpenModal('UploadTxtFileTDSReturn', row)}>Upload TXT File</span>
                                }
                                {
                        !row?.isCSIPutRequest &&
                        <span className='edit_btn edit-btn-action u_border prTab'  onClick={() => handleOpenModal('UploadCSIFileTDSReturn', row)}>Upload CSI File</span>
                    }
                                <span className='edit_btn edit-btn-action prTab' onClick={() => dispatch(checkStatusSandboxEFileTDSReturn({eFileTDSReturnId: row?._id})).then((res)=>{
                                    if (res.data.success) {
                                        getSandboxEFileTDSReturnList()
                                        handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                                    } else {
                                        setLoader(false)
                                        handleOpenModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                                    }
                                })}>Check Status</span>
                            </>
                    }
                </TableCell>
            }
        })
    ]

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddEFileTDSReturn' : {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'UploadTxtFileTDSReturn' :{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewRejectedComment':{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'UploadCSIFileTDSReturn':{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };

    useEffect(()=>{
        getSandboxEFileTDSReturnList()
    },[pagination.rowsPerPage,pagination.page])

    const getSandboxEFileTDSReturnList = () => {
        setLoader(true)
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        }
        dispatch(getSandboxEFileTDSReturn(payload)).then(res => {
            setLoader(false)
            if (res.data.success) {
                setRowData({
                    ...rowData,
                    list: res?.data?.data?.docs,
                    totalDocs: res?.data?.data?.totalDocs
                })
            }
        })
    }

    return(
        <div className={'outer-box'}>
            {hideActionFunc("tdsReport") &&
                <div className={'d_flex_end'}>
                    <button className={'btn'} onClick={(e) => handleOpenModal('AddEFileTDSReturn')}> + Add Sandbox E-File TDS Return</button>
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
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getSandboxEFileTDSReturnList} />
            </CommonModal>
        </div>
    )
}
export default EFileTDSReturnTab