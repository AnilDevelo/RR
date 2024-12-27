import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import PopComponent from "../../../hoc/PopContent";
import moment from "moment";
import Box from "@mui/material/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import MainCommonFilter from "../../../Components/MainCommonFilter";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import {overAllGSTDetailsApi, revenueGameWise} from "../../../Redux/revenue/action";
import {currencyFormat} from "../../../utils";

const OverallGST = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0, TotalAllGameGSTReport: 0 });
    let Modal = PopComponent[modalDetails.modalName];
    const [filterData, setFilterData] = useState({
        startDate: null,
        endDate: null,
        statusValue: "All Days",
    })

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
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
            id: 'gameName',
            label: 'Game Name'
        },
        {
            id: 'gameEarned',
            label: 'Total GST Collect',
            // type: 'custom',
            // render: (row) => {
            //     return <TableCell >{currencyFormat(+row?.gameEarned)}</TableCell>
            // }
        }
    ];

    useEffect(() => {
        if (filterData?.statusValue !== 'Custom') {
            overallGSTApiFun(filterData.startDate, filterData.endDate)
        }
    }, [pagination.rowsPerPage, pagination.page, filterData.startDate, filterData.endDate]);

    const overallGSTApiFun = (startDate, endDate) => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            startDate:
                startDate ? moment(startDate).format("YYYY-MM-DD") : null,
            endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
        };
        Object?.keys(payload).forEach(ele => {
            if (payload[ele] === '' || payload[ele] === null) { delete payload[ele] }
        });
        setLoader(true);
        dispatch(overAllGSTDetailsApi(payload)).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                list: res?.data?.data?.allGameGSTReport || res.data.data?.docs,
                totalDocs: res.data.data.totalDocs || 0
            })
        });
    };

    useEffect(() => {
        if (filterData.startDate && filterData.endDate && filterData?.statusValue === 'Custom') {
            setPagination({
                ...pagination,
                page: 0
            })
            overallGSTApiFun(filterData.startDate, filterData.endDate)
        }

    }, [filterData.startDate, filterData.endDate]);
    return (
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'d_flex justify_content_between gst_details_table'}>
                    <h5>Total GST: {currencyFormat(rowData?.TotalAllGameGSTReport )}</h5>
                    <MainCommonFilter filterData={filterData} setFilterData={setFilterData} searchApiHandler={''} pagination={pagination} setPagination={setPagination} addPropsFilter={{ revenueGame: true }} />
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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Box>
    );
}
export default OverallGST