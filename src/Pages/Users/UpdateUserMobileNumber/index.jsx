import React, {useEffect, useState} from "react";
import CustomTable from "../../../hoc/CommonTable";
import Paper from "@mui/material/Paper";
import {useDispatch} from "react-redux";
import Loader from "../../../images/Loader";
import {ActionFunction, dotGenerator} from "../../../utils";
import TableCell from "@material-ui/core/TableCell";
import {Box} from "@mui/material";
import PopComponent from "../../../hoc/PopContent";
import CommonModal from "../../../hoc/CommonModal";
import MainCommonFilter from "../../../Components/MainCommonFilter";
import moment from "moment";
import {getUpdateUserMobileNumberReqList} from "../../../Redux/user/action";
import {useNavigate} from "react-router-dom";

const UpdateUserMobileNumber = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = React.useState(false);
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0, startRange: '' , endRange: '' });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [filterData, setFilterData] = useState({
        startDate: null,
        endDate: null,
        statusField: 'All Status',
        exportFile: false,
        csvDownload: false,
        search: "",
        filterClose: false,
        statusValue: "All Days",
        exportFileName: 'Export File'
    });
    const [dateFilter,setDateFilter] = useState(filterData);
    let prevDateFilter  = React.useRef(dateFilter);

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'RejectUserMobileNumber': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewOldUserMobileNumber': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ApprovedMobileNumber': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewRejectedComment' : {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ExportFilePopup': {
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
            id: 'createdAt',
            label: 'Date & Time',
            twoLineText: true,
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment(row?.createdAt).format('MMM DD YYYY, hh:mm A')}</TableCell>
            }
        },
        {
            id: 'id',
            numeric: false,
            disablePadding: false,
            label: 'Users ID',
            type: 'custom',
            render: (row, i) => {
                return <TableCell><span className='edit_btn'
                onClick={() => navigate(`/users-tab/${row?.userId?._id}`)}>{`UID000${row?.userId?.numericId}`}</span></TableCell>
            }
        },
        {
            id:'',
            label:'Users Name',
            type: 'custom',
            render: (row) => {
                return <TableCell>
                    {row?.userId?.nickName}
                </TableCell>
            }
        },
        {
            id:'currentPhonenumber',
            label:'Current Phone Number'
        },
        {
            id:'newPhoneNumber',
            label:'Update Phone Number'
        },
        {
            id:'oldNumber',
            label:'Mobile Number History',
            type: 'custom',
            render: (row) => {
                return <TableCell>
                    <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('ViewOldUserMobileNumber', row)}>View</span>
                </TableCell>
            }
        },
        {
            id:'status',
            label:'Status',
            type: 'custom',
            render: (row) => {
                return <TableCell><span className={row?.status === 'Reject' ? 'req_rejected' : 'Approved'}>
                   {row?.status === 'Approve' ? 'Approved' : row?.status === 'Reject' ? 'Rejected' : row?.status }</span>
                </TableCell>
            }
        }
    ];


    useEffect(() => {
        if(filterData?.statusValue ==='Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom'  ){
            getUserMobileNumberRequestList(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
        }
        else if (filterData.startDate && filterData.endDate || filterData?.statusValue === 'All Days') {
            getUserMobileNumberRequestList(filterData.startDate, filterData.endDate,filterData.search)
        }
    }, [pagination.rowsPerPage, pagination.page, filterData.exportFile, filterData.csvDownload, filterData.startDate, filterData.endDate, filterData?.statusField, filterData?.statusValue]);

    // get Users Api and All Filter Api
    const getUserMobileNumberRequestList = (startDate, endDate, search) => {
        setLoader(true)
        const activeStatus = filterData?.statusField == "Approved" ? "Approve" : filterData?.statusField == "Rejected" ? "Reject" : filterData?.statusField
        let payload = {
            limit: pagination?.endRange ?  pagination?.endRange : pagination.rowsPerPage  ,
            start: +pagination?.startRange ? +pagination?.startRange :   ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            searchText: search,
            startDate:
                startDate ? moment(startDate).format("YYYY-MM-DD") : null,
            endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
            exportFile: filterData?.exportFile,
            csvDownload: filterData?.csvDownload,
            status: activeStatus !== 'All Status' ? activeStatus : ''
        }
        Object?.keys(payload).forEach(ele => {
            if (payload[ele] === '' || payload[ele] === null) { delete payload[ele] }
        });
        dispatch(getUpdateUserMobileNumberReqList(payload)).then(res => {
            setLoader(false)
            if(pagination?.endRange?.toString() !== '' && pagination?.startRange?.toString() !== '' ){
                setPagination({
                    ...pagination,
                    startRange:'',
                    endRange: '',
                    rowsPerPage: 10,
                    page:0
                })
                setFilterData({
                    ...filterData,
                    csvDownload: false,
                    exportFile: false,
                    exportFileName: 'Export File'
                })
            }
            if (res?.data?.data?.filePath) {
                setFilterData({
                    ...filterData,
                    csvDownload: false,
                    exportFile: false
                })
                window.open(res?.data?.data?.filePath,"_blank");
            }else{
                if(res?.data?.success){
                    setRowData({
                        ...rowData,
                        list: res.data.data?.docs,
                        totalDocs: res?.data?.data?.totalDocs
                    })
                }else{
                    setRowData({
                        ...rowData,
                        list: [],
                        totalDocs: 0
                    })
                }
            }
        })
    };

    useEffect(() => {
        if (filterData.startDate && filterData.endDate && filterData?.statusValue === 'Custom') {
            setPagination({
                ...pagination,
                page: 0
            })
            getUserMobileNumberRequestList(filterData.startDate, filterData.endDate)
        }

    }, [filterData.startDate, filterData.endDate]);

    useEffect(() => {
        setPagination({
          rowsPerPage: 10,
          page: 0,
          startRange: "",
          endRange: "",
        })
      }, [filterData?.statusField,filterData?.statusValue])

    return(
        <>
            {/* {loader && <Loader />} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <MainCommonFilter
                    filterData={filterData}
                    setFilterData={setFilterData}
                    searchApiHandler={getUserMobileNumberRequestList}
                    pagination={pagination}
                    setPagination={setPagination}
                    statusOption={['All Status', 'Approved', 'Pending', 'Rejected']}
                    addPropsFilter={{ isKYCList: true, isGameList: true, userPayment: rowData?.list?.length <= 0 }}
                    isSearchTooltip={{ isWithdrawalRequest: true }}
                    handleOpenModal={handleOpenModal}
                    totalDocs={rowData?.totalDocs}
                />
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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getUserMobileNumberRequestList}  />
            </CommonModal>
        </>
    )
}
export default UpdateUserMobileNumber