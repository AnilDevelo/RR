import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import PopComponent from "../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import {ActionFunction, currencyFormat, dotGenerator, hideActionFunc} from "../../../../utils";
import {getChallanTDSDetails, getTDSFilling} from "../../../../Redux/TDSReport/action";
import Box from "@mui/material/Box";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import {getBotList} from "../../../../Redux/Master/action";
import moment from "moment";

const ChallanTab = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddTDSChallan': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewRejectedComment' :{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ExportFileTDS' :{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewPayeeData':{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };

    const columns = [
        {
            id: 'id',
            numeric: false,
            disablePadding: false,
            label: 'Sr. no.',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{+pagination.rowsPerPage * ((+pagination.page + 1) - 1) + i+1}</TableCell>
            }
        },
        {
            id: "challan_serial",
            numeric: true,
            disablePadding: false,
            label: "Challan Serial",
        },
        {
            id: "bsr_code",
            numeric: true,
            disablePadding: false,
            label: "BSR Code",
        },
        {
            id: "paid_date",
            numeric: true,
            disablePadding: false,
            label: "Paid Date",
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment(row?.paid_date).format('MMM DD YYYY')}</TableCell>
            }
        },
        {
            id: "minor_head",
            numeric: true,
            disablePadding: false,
            label: "Minor Head",
        },
        {
            id: "section",
            numeric: true,
            disablePadding: false,
            label: "Section",
            type: 'custom',
            render: (row) => {
                return <TableCell >{dotGenerator(row?.section, handleOpenModal, 'Challan Section')}</TableCell>
            }
        },
        {
            id: "tds_amount",
            numeric: true,
            disablePadding: false,
            label: "TDS Amount",
            type: 'custom',
            render: (row) => {
                return <TableCell  >{currencyFormat(+row?.tds_amount)}</TableCell>
            }

        },
        {
            id: "surcharge",
            numeric: true,
            disablePadding: false,
            label: "Surcharge",
            type: 'custom',
            render: (row) => {
                return <TableCell  >{currencyFormat(+row?.surcharge)}</TableCell>
            }
        },
        {
            id: "education_cess",
            numeric: true,
            disablePadding: false,
            label: "Education Cess",
            type: 'custom',
            render: (row) => {
                return <TableCell  >{currencyFormat(+row?.education_cess)}</TableCell>
            }
        },
        {
            id: "interest",
            numeric: true,
            disablePadding: false,
            label: "Interest",
            type: 'custom',
            render: (row) => {
                return <TableCell  >{currencyFormat(+row?.interest)}</TableCell>
            }
        },
        {
            id: "late_filing_fees",
            numeric: true,
            disablePadding: false,
            label: "Late Filing Fees",
            type: 'custom',
            render: (row) => {
                return <TableCell  >{currencyFormat(+row?.late_filing_fees)}</TableCell>
            }
        },
        {
            id: "other_penalty",
            numeric: true,
            disablePadding: false,
            label: "Other Penalty",
            type: 'custom',
            render: (row) => {
                return <TableCell  >{currencyFormat(+row?.other_penalty)}</TableCell>
            }
        },
        {
            id: "month",
            numeric: true,
            disablePadding: false,
            label: "Month",
        },
        {
            id: "year",
            numeric: true,
            disablePadding: false,
            label: "Year",
        },
        {
            id: "chalnStartDate",
            numeric: true,
            disablePadding: false,
            label: "Challan Start Date",
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment(row?.chalnStartDate).format('MMM DD YYYY')}</TableCell>
            }
        },
        {
            id: "chalanEndDate",
            numeric: true,
            disablePadding: false,
            label: "Challan End Date",
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment(row?.chalanEndDate).format('MMM DD YYYY')}</TableCell>
            }
        },
        {
            id: "chalanEndDate",
            numeric: true,
            disablePadding: false,
            label: "Payee Data",
            type: 'custom',
            render: (row) => {
                return <TableCell >
                    <span className='edit_btn edit-btn-action' onClick={(e) => handleOpenModal('ViewPayeeData', row)}>View</span>
                </TableCell>
            }
        },
        ActionFunction('tdsReport', {
            id: 'action',
            label: 'Action',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action' onClick={(e) => handleOpenModal('AddTDSChallan', { isEdit: true, row })}>Edit</span>
                </TableCell>
            }
        })
    ];

    useEffect(()=>{
        getTDSChallanData()
    }, [pagination.rowsPerPage,pagination.page])

    const getTDSChallanData = () => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        };
        setLoader(true)
        // setLoader(true);
        dispatch(getChallanTDSDetails(payload)).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                list: res?.data?.data?.TDSchallan?.docs,
                totalDocs: res?.data?.data?.totalDocs
            })
        });
    }

    return(
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                {hideActionFunc("tdsReport") &&
                    <div className={'d_flex_end challan'}>
                        <button className={'btn mr_2'} onClick={(e) => handleOpenModal('ExportFileTDS')}> Export Challan File</button>
                        <button className={'btn'} onClick={(e) => handleOpenModal('AddTDSChallan')}> + Add Challan</button>
                    </div>
                }
                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list}
                    totalDocs={rowData?.totalDocs}
                    pagination={pagination}
                    setPagination={setPagination}
                    isWinnerTitle={true}
                    loading={loader}
                />
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getTDSChallanData} />
            </CommonModal>
        </Box>
    )
}
export default ChallanTab