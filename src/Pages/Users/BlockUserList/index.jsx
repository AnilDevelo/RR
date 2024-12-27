import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import MainCommonFilter from "../../../Components/MainCommonFilter";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import moment from "moment";
import { useDispatch } from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import { getUserBlockList } from "../../../Redux/user/action";
import { useNavigate } from "react-router-dom";

const BlockUserList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0, startRange: '' , endRange: '' })
    let Modal = PopComponent[modalDetails.modalName];
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [filterData, setFilterData] = useState({
        startDate: null,
        endDate: null,
        statusValue: "All Days",
        exportFile: false,
        csvDownload: false,
        search: "",
        filterClose: false,
        exportFileName: 'Export File'
    });
    const [dateFilter,setDateFilter] = useState(filterData);
    let prevDateFilter  = React.useRef(dateFilter);

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'BlockUser': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'UserBlockListView': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ExportFilePopup':{
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
            id: 'numericId',
            label: 'Blocked Users ID',
            type: 'custom',
            render: (row, i) => {
                return <TableCell><span className='edit_btn' onClick={() => navigate(`/users-tab/${row.userId}`)}>{`UID000${row?.numericId}`}</span></TableCell>
            }
        },
        {
            id: 'userName',
            label: 'Blocked Users Name',
        },
        {
            id: 'mobileNumber',
            label: 'Blocked Phone Number',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{row?.mobileNumber}</TableCell>
            }

        },
        {
            id: 'Action',
            label: 'Action',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell >
                    <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('UserBlockListView', row)}>View</span>
                </TableCell>
            }
        }
    ];

    useEffect(() => {
        if(filterData?.statusValue ==='Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom'  ){
            getUserBlockListHandler(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
        }
        else if (filterData?.statusValue !== 'Custom') {
            getUserBlockListHandler(filterData.startDate, filterData.endDate)
        }
    }, [pagination.rowsPerPage, pagination.page, filterData.exportFile, filterData.csvDownload, filterData.startDate, filterData.endDate, filterData?.statusValue]);

    // get Users Api and All Filter Api
    const getUserBlockListHandler = (startDate, endDate, search) => {
        setLoader(true)
        let payload = {
            limit: pagination?.endRange ?  pagination?.endRange : pagination.rowsPerPage  ,
            start: +pagination?.startRange ? +pagination?.startRange :   ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            searchText: search,
            startDate:
                startDate ? moment(startDate).format("YYYY-MM-DD") : null,
            endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
            exportFile: filterData?.exportFile,
            csvDownload: filterData?.csvDownload
        }
        Object?.keys(payload).forEach(ele => {
            if (payload[ele] === '' || payload[ele] === null) { delete payload[ele] }
        });
        dispatch(getUserBlockList(payload)).then(res => {
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
            }
            if (res.data?.success) {
                setRowData({
                    ...rowData,
                    list: res?.data?.data?.docs,
                    totalDocs: res?.data?.data?.totalDocs
                })
            } else {
                setRowData({
                    ...rowData,
                    list: [],
                    totalDocs: 0
                })
            }
        })
    };

    useEffect(() => {
        if (filterData.startDate && filterData.endDate && filterData?.statusValue === 'Custom') {
            setPagination({
                ...pagination,
                page: 0
            })
            getUserBlockListHandler(filterData.startDate, filterData.endDate)
        }

    }, [filterData.startDate, filterData.endDate]);

    return (
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <MainCommonFilter
                    filterData={filterData}
                    setFilterData={setFilterData}
                    addPropsFilter={{userPayment: rowData?.list?.length <= 0}}
                    searchApiHandler={getUserBlockListHandler}
                    pagination={pagination}
                    setPagination={setPagination}
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
            {/*--------------------------------------------------------Common Popup-------------------------------------------------*/}
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getUserBlockListHandler} />
            </CommonModal>
        </Box>
    )
}
export default BlockUserList