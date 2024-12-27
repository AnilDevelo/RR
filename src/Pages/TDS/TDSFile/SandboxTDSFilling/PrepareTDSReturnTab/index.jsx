import React, {useEffect, useState} from "react";

import CustomTable from "../../../../../hoc/CommonTable";
import CommonModal from "../../../../../hoc/CommonModal";
import PopComponent from "../../../../../hoc/PopContent";
import {checkStatusSandboxPrepareTDSReturn, getSandboxPrepareTDSReturn} from "../../../../../Redux/TDSReport/action";
import {useDispatch} from "react-redux";
import TableCell from "@mui/material/TableCell";
import {ActionFunction, hideActionFunc} from "../../../../../utils";


const SendBoxTDSFilling = () => {
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
            id: "filing_type",
            numeric: true,
            disablePadding: false,
            label: "Filing Type",
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
        },
        {
            id: "",
            numeric: true,
            disablePadding: false,
            label: "TDS Return",
            type: 'custom',
            render: (row) => {
                return <TableCell ><a href={row?.tds_return} className={'edit_btn edit-btn-action'} target={'_blank'} >{row?.tds_return ? "TXT Download" : "-"}</a> </TableCell>
            }

        },
        ActionFunction('user', {
            id: 'Action',
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id '} >
                    <span className='edit_btn edit-btn-action u_border prTab'  onClick={() => handleOpenModal('UploadExcelSandboxPrepareTDS', row)}>Upload Excel File</span>
                    <span className='edit_btn edit-btn-action prTab' onClick={() => dispatch(checkStatusSandboxPrepareTDSReturn({prepareTDSReturnId: row?._id})).then((res)=>{
                        if (res.data.success) {
                            getSandboxPrepareTDSReturnList()
                            handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
                        } else {
                            setLoader(false)
                            handleOpenModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
                        }
                    })}>Check Status</span>
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
            case 'AddSandboxPrepareTDSReturn' : {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'UploadExcelSandboxPrepareTDS' :{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };

    useEffect(()=>{
        getSandboxPrepareTDSReturnList()
    },[pagination.rowsPerPage,pagination.page])

    const getSandboxPrepareTDSReturnList = () => {
        setLoader(true)
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        }
        dispatch(getSandboxPrepareTDSReturn(payload)).then(res => {
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
                    <button className={'btn'} onClick={(e) => handleOpenModal('AddSandboxPrepareTDSReturn')}> + Add Sandbox Prepare TDS Return</button>
                </div>
            }
            <CustomTable
                headCells={columns}
                rowData={rowData?.list}
                totalDocs={rowData?.totalDocs}
                pagination={pagination}
                setPagination={setPagination}
            />
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getSandboxPrepareTDSReturnList} />
            </CommonModal>
        </div>
    )
}
export default SendBoxTDSFilling