import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import PopComponent from "../../../../hoc/PopContent";
import MainCommonFilter from "../../../../Components/MainCommonFilter";
import moment from "moment";
import {revenueGameWise} from "../../../../Redux/revenue/action";
import {getUserWiseGSTReport} from "../../../../Redux/user/action";
import {currencyFormat} from "../../../../utils";

const UserGST = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0, totalUserGSTAmount:0 });
    const [loader, setLoader] = useState(false);
    const [filterData, setFilterData] = useState({
        startDate: null,
        endDate: null,
        statusValue: "All Days",
    });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });

    let columns = [
        {
            id: 'panCardNumber',
            label: 'Game Name',
            isDisbanding: true,
        },
        {
            id: 'panCardNumber',
            label: 'Total GST',
            isDisbanding: true,
        },
    ];

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

    useEffect(() => {
        if (filterData?.statusValue !== 'Custom') {
            getUserGSTApiFun(filterData.startDate, filterData.endDate)
        }
    }, [pagination.rowsPerPage, pagination.page, filterData.startDate, filterData.endDate]);

    const getUserGSTApiFun = (startDate, endDate) => {
        let payload = {
            userId:id,
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
        dispatch(getUserWiseGSTReport(payload)).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                list: res?.data?.data?.userGSTReport || res.data.data?.docs,
                totalDocs: res.data.data.totalDocs,
                totalUserGSTAmount: res?.data?.data?.totalUserGSTAmount
            })
        });
    };

    useEffect(() => {
        if (filterData.startDate && filterData.endDate && filterData?.statusValue === 'Custom') {
            setPagination({
                ...pagination,
                page: 0
            })
            getUserGSTApiFun(filterData.startDate, filterData.endDate)
        }

    }, [filterData.startDate, filterData.endDate]);

    return(
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'d_flex justify_content_between gst_details_table'}>
                    <h5>Total User GST: {currencyFormat(rowData?.totalUserGSTAmount )}</h5>
                    <MainCommonFilter filterData={filterData} setFilterData={setFilterData} searchApiHandler={''} pagination={pagination} setPagination={setPagination} addPropsFilter={{ revenueGame: true }} />
                </div>
                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list}
                    totalDocs={0}
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
export default UserGST