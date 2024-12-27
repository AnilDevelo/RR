import React, { useEffect, useState } from "react";
import Loader from "../../../images/Loader";
import Box from "@material-ui/core/Box";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import PopComponent from "../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import CommonModal from "../../../hoc/CommonModal";
import moment from "moment";
import { getGameList, getOptimizeStatus } from "../../../Redux/games/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainCommonFilter from "../../../Components/MainCommonFilter";
import user from "../../../assets/images/avatar.png";
import { ActionFunction } from "../../../utils";

const ApprovedGameList = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const gameList = useSelector(state => state.gameReducer?.gameAll);
    const dispatch = useDispatch();
    const [stepDetailsVerify, setStepDetailsVerify] = useState({})
    const [filterData, setFilterData] = useState({
        startDate: null,
        endDate: null,
        statusValue: "All Days",
        exportFile: false,
        csvDownload: false,
        search: "",
        filterClose: false,
        exportFileName: 'Export File',
        statusField: 'All Status',
        platformName: 'All Platform'
    })
    const [pagination, setPagination] = useState({
        rowsPerPage: 10,
        page: 0
        , startRange: '' , endRange: ''
    });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    let columns = [
        {
            id: 'icon',
            label: 'Game Icon',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'table_icon'}>
                    <img src={row?.gameIcon || user} alt={''} />
                </TableCell>
            }
        },
        {
            id: 'numericId',
            label: 'Game Id',
            type: 'custom',
            render: (row, i) => {
                return <TableCell><span className='edit_btn'
                    onClick={() => navigate(`/game-tab/${row.id}`)}>{`GID000${row?.numericId}`}
                </span></TableCell>
            }
        },
        {
            id: 'gameName',
            label: 'Game Name',
        },

        {
            id: 'platform',
            label: 'Game Platform',
            isDisbanding: true,
        },
        {
            id: 'gameStatus',
            label: 'Status',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell><span className={row?.isActive === true ? "Approved" : "Reject"}>{row?.isActive ? 'Activated' : 'Deactivated'}</span></TableCell>
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
        ActionFunction('game', {
            id: 'action',
            label: 'Action',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('ArchivedGamePopup', { gameId: row?._id, isArchive: true })}>Archive</span>
                    {
                        row?.isActive ?
                            <span className='edit_btn edit-btn-action prTab' onClick={() => handleOpenModal('ApprovedPendingPopup', { isActivePop: true, gameId: row?._id, isActive: !row?.isActive })}>Deactivate</span> :
                            <span className={'edit_btn edit-btn-action prTab'} onClick={() => handleOpenModal('ActiveDeactivatedPopup', { isActivePop: true, gameId: row?._id, isActive: !row?.isActive, data: row })}>Active</span>
                    }
                </TableCell>
            }

        })

    ];
    const handleActiveModalHandler = (row) => {
        dispatch(getOptimizeStatus({ gameId: row?._id, publisherId: row?.publisherId?._id })).then(res => {
            setStepDetailsVerify(res.data.data);
            if (res.data.success) {
                const { isGameReleaseCreated } = res.data.data;
                if (isGameReleaseCreated) {
                    handleOpenModal('ActiveDeactivatedPopup', { isActivePop: true, gameId: row?._id, isActive: !row?.isActive, data: row });
                } else {
                    handleOpenModal('CommonPop', { header: "Error", body: 'Please Complete Game Release Section  Before Game Activate.' });
                }
            } else {
                handleOpenModal('ActiveDeactivatedPopup', { isActivePop: true, gameId: row?._id, isActive: !row?.isActive, data: row });
            }
        })

    }
    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'ApprovedPendingPopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'RejectedPopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ArchivedGamePopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ActiveDeactivatedPopup': {
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

    useEffect(() => {
        if (filterData.startDate && filterData.endDate || filterData?.statusValue === 'All Days') {
            allApprovedGameListFetch(filterData.startDate, filterData.endDate,filterData.search)
        }
    }, [pagination.rowsPerPage, pagination.page, filterData.exportFile, filterData.csvDownload, filterData.statusField,
        filterData.platformName, filterData?.gameTag, filterData.startDate, filterData.endDate, filterData?.statusValue])

    const allApprovedGameListFetch = (startDate, endDate, search) => {
        setLoader(true)
        const activeStatus = filterData?.statusField == "Activated" ? "Active" : filterData?.statusField == "Deactivated" ? "Deactive" : filterData?.statusField
        let payload = {
            limit: pagination?.endRange ?  pagination?.endRange : pagination.rowsPerPage  ,
            start: +pagination?.startRange ? +pagination?.startRange :   ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            searchText: search,
            startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
            endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
            exportFile: filterData?.exportFile,
            csvDownload: filterData?.csvDownload,
            gameStatus: 'Approve',
            platform: filterData?.platformName !== 'All Platform' ? filterData?.platformName : '',
            activeStatus: activeStatus !== 'All Status' ? activeStatus : ''
        }

        Object?.keys(payload).forEach(ele => {
            if (payload[ele] === '' || payload[ele] === null) { delete payload[ele] }
        });
        dispatch(getGameList(payload)).then((res) => {
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
        });
    }
    useEffect(() => {
        if (filterData.startDate && filterData.endDate && filterData?.statusValue === 'Custom') {
            setPagination({
                ...pagination,
                page: 0
            });
            allApprovedGameListFetch(filterData.startDate, filterData.endDate)
        }
    }, [filterData.startDate, filterData.endDate]);
    const redirectApiDetails = () => {
        allApprovedGameListFetch(filterData.startDate, filterData.endDate)
    }

    useEffect(() => {
        setPagination({
          rowsPerPage: 10,
          page: 0,
          startRange: "",
          endRange: "",
        })
      }, [filterData?.platformName,filterData?.statusValue,filterData?.statusField])
      
    return (
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <MainCommonFilter
                    filterData={filterData}
                    setFilterData={setFilterData}
                    searchApiHandler={allApprovedGameListFetch}
                    pagination={pagination}
                    setPagination={setPagination}
                    statusOption={['All Status', 'Activated', 'Deactivated']}
                    plateFormOption={['All Platform', 'Ios', 'Android', 'Cross-Platform']}
                    addPropsFilter={{ isGameList: true, userPayment: gameList?.list?.length <= 0 }}
                    isSearchTooltip={{ isAllGame: true }}
                    totalDocs={gameList?.totalDocs}
                    handleOpenModal={handleOpenModal}
                />
                <CustomTable
                    headCells={columns}
                    rowData={gameList?.list}
                    totalDocs={gameList?.totalDocs}
                    pagination={pagination}
                    setPagination={setPagination}
                    loading={loader}
                />
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={redirectApiDetails} filterData={filterData} />
            </CommonModal>
        </Box>
    );
};

export default ApprovedGameList;