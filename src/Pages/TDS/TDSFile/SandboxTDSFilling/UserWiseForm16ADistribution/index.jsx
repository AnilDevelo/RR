import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {ActionFunction, dotGenerator, hideActionFunc} from "../../../../../utils";
import CustomTable from "../../../../../hoc/CommonTable";
import CommonModal from "../../../../../hoc/CommonModal";
import TableCell from "@mui/material/TableCell";
import user from "../../../../../assets/images/avatar.png";
import moment from "moment";
import {deleteNotificationList} from "../../../../../Redux/Master/action";
import {useDispatch} from "react-redux";
import PopComponent from "../../../../../hoc/PopContent";
import {useNavigate} from "react-router-dom";
import {getDistributionUploadForm16APDF, getSandboxEFileTDSReturn} from "../../../../../Redux/TDSReport/action";
import MainCommonFilter from "../../../../../Components/MainCommonFilter";


const UserWiseForm16ADistribution = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    let Modal = PopComponent[modalDetails.modalName];
    const [filterData, setFilterData] = useState({
        search: "",
        filterClose: false,
    });

    const columns = [
        {
            id: 'id',
            numeric: false,
            disablePadding: false,
            label: 'Users ID',
            type: 'custom',
            render: (row, i) => {
                return <TableCell><span className='edit_btn' onClick={() => navigate(`/users-tab/${row?.userId?._id}`)}>{`UID000${row?.userId?.numericId}`}</span></TableCell>
            }
        },
        {
            id: 'panCardNumber',
            numeric: true,
            disablePadding: false,
            label: 'Pan Card Number',
        },
        {
            id: 'TDSForm16AUrl',
            numeric: true,
            disablePadding: false,
            label: 'TDS Form 16A Pdf',
            type: 'custom',
            render: (row) => {
                return <TableCell ><a href={row?.TDSForm16AUrl} className={'edit_btn edit-btn-action'} target={'_blank'} >Download</a> </TableCell>
            }
        },
        {
            id: 'financialYear',
            numeric: true,
            disablePadding: false,
            label: 'Financial Year',
        },
        {
            id: 'quarter',
            numeric: true,
            disablePadding: false,
            label: 'Quarter',
        },
    ];

    const handleOpenModal = (type, data) => {
        const modalValue = data;
        const modalName = type;
        const modalIsOpen = true;

        switch (type) {
            case 'CommonPop':
            case 'UploadForm16APDF':
            case 'DeleteCommonModal':
                setModalDetails({ ...modalDetails, modalValue, modalName, modalIsOpen });
                break;
            default:
                setModalDetails({ ...modalDetails, modalIsOpen: false });
        }
    };

    useEffect(()=>{
        getUserWiseForm16ADistributionList()
    },[pagination.rowsPerPage,pagination.page]);

    const getUserWiseForm16ADistributionList = (startDate, endDate, search) => {
        setLoader(true)
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            searchText: search,
        }
        Object?.keys(payload).forEach(ele => {
            if (payload[ele] === '' || payload[ele] === null) { delete payload[ele] }
        });
        dispatch(getDistributionUploadForm16APDF(payload)).then(res => {
            setLoader(false)
            if (res.data.success) {
                setRowData({
                    ...rowData,
                    list: res?.data?.data?.docs,
                    totalDocs: res?.data?.data?.totalDocs
                })
            }
        })
    };

    return(
        <Box>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'d_flex justify_content_between align_items_center'}>
                    {
                        hideActionFunc('tdsReport') &&
                        <div className={'d_flex_end'}>
                            <button className={'btn'} onClick={(e) => handleOpenModal('UploadForm16APDF')}>  Upload User Wise Form 16A PDF</button>
                        </div>
                    }
                    <MainCommonFilter
                        filterData={filterData}
                        setFilterData={setFilterData}
                        searchApiHandler={getUserWiseForm16ADistributionList}
                        pagination={pagination}
                        setPagination={setPagination}
                        addPropsFilter={{ isTDSDistributions:true , withdrawManually:true}}
                        isSearchTooltip={{ isTDSDistributions:true }}
                    />
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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={''} />
            </CommonModal>
        </Box>
    )
}
export default UserWiseForm16ADistribution