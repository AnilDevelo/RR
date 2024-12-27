import Loader from "../../../images/Loader";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import {deleteWebSiteFooterTitle, deleteWebSiteSocialMedia, getWebSiteFooterTitle} from "../../../Redux/website/action";
import TableCell from "@mui/material/TableCell";
import {ActionFunction, hideActionFunc} from "../../../utils";

const Footer = () => {
    const dispatch = useDispatch();
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails?.modalName];
    const [loader, setLoader] = useState(false);
    const [rowData, setRowData] = useState({list: [], totalDocs: 0});
    const [filterData, setFilterData] = useState({
        startDate: null,
        endDate: null,
        statusValue: "All Days",
        exportFile: false,
        csvDownload: false,
        search: "",
        filterClose: false,
        exportFileName: 'Export File',
        platformName: 'All Users',
    });

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddFooterData': {
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
            id: 'title',
            label: 'title'
        },
        {
            id: 'link',
            label: 'Link'
        },
        ActionFunction( 'webSite',{
            id: 'action',
            label: 'Action',
            isDisbanding:true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('AddFooterData', { isEdit: true, row })}>Edit</span>
                    <span className='edit_btn edit-btn-action prTab'
                          onClick={()=> handleOpenModal('DeleteCommonModal', {deleteListApiHandler : deleteWebSiteFooterTitle({footerId: row?._id}), title: 'Do you want to delete this data?'})}>
                        Delete
                    </span>
                </TableCell>
            }
        })
    ];

    useEffect(() => {
        getFooterData();
    }, [pagination.rowsPerPage, pagination.page, filterData.exportFile, filterData.csvDownload, filterData.startDate, filterData.endDate, filterData?.platformName]);

    const getFooterData = () => {
        setLoader(true);
        dispatch(getWebSiteFooterTitle()).then(res => {
            setLoader(false)
            if (res.data.success) {
                setRowData({
                    ...rowData,
                    list: res.data.data?.docs,
                    totalDocs: res.data?.data?.totalDocs,
                });
            }
        });
    };

    return (
        <>
            {/* { loader ? <Loader /> : "" } */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                {
                    hideActionFunc('webSite') &&
                    <div className={'d_flex_end'}>
                        <button className={'btn'} onClick={() => handleOpenModal('AddFooterData')}> + Add Footer</button>
                    </div>
                }
                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list}
                    totalDocs={rowData?.totalDocs}
                    pagination={pagination}
                    setPagination={setPagination}
                    dragUpdater={''}
                    loading={loader}
                />
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getFooterData} />
            </CommonModal>
        </>
    )
}
export default Footer