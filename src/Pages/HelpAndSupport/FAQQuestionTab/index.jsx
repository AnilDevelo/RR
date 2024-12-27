import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import {deleteHelpFAQQuestionList, getHelpFAQQuestionList} from "../../../Redux/HelpAndSupport/action";
import Box from "@mui/material/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import FAQType from "./FAQType";
import {ActionFunction, dotGenerator, hideActionFunc} from "../../../utils";
import FAQTitle from "./FAQTitle";

const FAQQuestionTab = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    let Modal = PopComponent[modalDetails.modalName];
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

    const columns = [
        {
            id: 'numericId',
            label: 'ID',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{`FAQ000${row?.numericId}`}</TableCell>
            }
        },
        {
            id: 'question',
            label: 'Question',
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.question ? dotGenerator(row?.question, handleOpenModal, 'FAQs Question') : ''}</TableCell>
            }
        },
        {
            id: 'answer',
            label: 'Answer',
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.answer ? dotGenerator(row?.answer, handleOpenModal, 'FAQs Answer') : ''}</TableCell>
            }
        },
        {
            id: 'FAQType',
            label: 'FAQs Type',
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.FAQTypeId?.FAQType}</TableCell>
            }
        },
        ActionFunction('helpAndSupport',{
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action u_border' onClick={(e) => handleOpenModal('AddFAQPopup', { isEdit: true, row })}>Edit</span>
                    <span className='edit_btn edit-btn-action prTab'
                          onClick={() => handleOpenModal('DeleteCommonModal',
                              { deleteListApiHandler: deleteHelpFAQQuestionList({ FAQId: row?._id }), title: 'Do you want to delete this data?' })}>
                        Delete
                    </span>
                </TableCell>
            }
        })
    ];

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddFAQPopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewRejectedComment' : {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };

    useEffect(() => {
        getHelpFAQQuestionListHandler();
    }, [pagination.rowsPerPage, pagination.page, filterData.exportFile, filterData.csvDownload, filterData.startDate, filterData.endDate, filterData?.platformName]);

    const getHelpFAQQuestionListHandler = () => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        };
        setLoader(true);
        dispatch(getHelpFAQQuestionList(payload)).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                list: res?.data?.data?.docs,
                totalDocs: res?.data?.data?.totalDocs || 0
            })
        });
    };

    return (
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <FAQTitle/>
           <FAQType />
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'game_tab_overView head_to_head_gameTab'}>
                    <div className={'d_flex_between'}>
                        <h2>FAQs Question</h2>
                        {
                            hideActionFunc('helpAndSupport') &&
                            <button className={'btn'} onClick={(e) => handleOpenModal('AddFAQPopup')}> + Add FAQs</button>
                        }
                    </div>



                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list}
                    totalDocs={rowData?.totalDocs}
                    pagination={pagination}
                        setPagination={setPagination}
                        loading={loader}
                />
                </div>
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getHelpFAQQuestionListHandler} />
            </CommonModal>
        </Box>
    )
}
export default FAQQuestionTab