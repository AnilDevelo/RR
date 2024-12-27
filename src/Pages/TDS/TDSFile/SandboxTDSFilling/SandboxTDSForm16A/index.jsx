import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import PopComponent from "../../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import {ActionFunction, hideActionFunc} from "../../../../../utils";
import { downloadSandboxTDSForm16AStatus, getSandboxTDSForm16A } from "../../../../../Redux/TDSReport/action";
import CustomTable from "../../../../../hoc/CommonTable";
import CommonModal from "../../../../../hoc/CommonModal";

const SandboxTDSForm16A = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];

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
            id: "status",
            numeric: true,
            disablePadding: false,
            label: "Status",
        },
        {
            id: "message",
            numeric: true,
            disablePadding: false,
            label: "Message",
        },
        {
            id: "tds_return",
            numeric: true,
            disablePadding: false,
            label: "Signed URL",
            type: 'custom',
            render: (row) => {
                return <TableCell > {row?.signed_url?.length > 0 ?  <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('ViewSandboxTDSForm16A', { signed_url : row?.signed_url })}> View </span> : "" } </TableCell>
                // return <TableCell > { row?.signed_url ? <a href={row?.signed_url} className={'edit_btn edit-btn-action'} target={'_blank'} >Download</a> : '_' } </TableCell>
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
                                    <span className='edit_btn edit-btn-action' onClick={() => dispatch(downloadSandboxTDSForm16AStatus({downloadForm16AId: row?._id})).then((res)=>{
                                        if (res.data.success) {
                                            getSandboxTDSForm16AList()
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
            case 'AddSandboxTDSForm16A' : {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DownloadTDSForm16A' :{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewSandboxTDSForm16A' : {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };

    useEffect(()=>{
        getSandboxTDSForm16AList()
    },[pagination.rowsPerPage,pagination.page])

    const getSandboxTDSForm16AList = () => {
        setLoader(true)
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        }
        dispatch(getSandboxTDSForm16A(payload)).then(res => {
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
             {
                hideActionFunc("tdsReport") &&
            <div className={'d_flex_end'}>
                    {/* <button className={'btn mr_2'} onClick={(e) => handleOpenModal('DownloadTDSForm16A')}> Download TDS Form 16A </button> */}
                    <button className={'btn'} onClick={(e) => handleOpenModal('AddSandboxTDSForm16A')}> + Add Sandbox TDS Form 16A </button>
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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getSandboxTDSForm16AList} />
            </CommonModal>
        </div>
    )
}
export default SandboxTDSForm16A