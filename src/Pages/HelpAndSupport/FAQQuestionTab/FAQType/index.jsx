import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import PopComponent from "../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import {
    deleteHelpFAQType,
    getHelpFAQType
} from "../../../../Redux/HelpAndSupport/action";
import Box from "@mui/material/Box";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import {ActionFunction, hideActionFunc} from "../../../../utils";

const FAQType = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    let Modal = PopComponent[modalDetails.modalName];


    const columns = [
        {
            id: 'numericId',
            label: 'ID',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{`FAQT000${row?.numericId}`}</TableCell>
            }
        },
        {
            id: 'FAQType',
            label: 'FAQs Type',
        },
        ActionFunction('helpAndSupport',{
            id: 'Action',
            disablePadding: false,
            label: 'Action',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action u_border' onClick={(e) => handleOpenModal('AddFAQTypePopup', { isEdit: true, row })}>Edit</span>
                    <span className='edit_btn edit-btn-action prTab'
                          onClick={() => handleOpenModal('DeleteCommonModal',
                              { deleteListApiHandler: deleteHelpFAQType({ FAQTypeId: row?._id }), title: 'Do you want to delete this data?' })}>
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
            case 'AddFAQTypePopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };

    useEffect(() => {
        getFAQTypeHandler();
    }, [pagination.rowsPerPage, pagination.page]);

    const getFAQTypeHandler = () => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        };
        setLoader(true);
        dispatch(getHelpFAQType(payload)).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                list: res?.data?.data?.docs,
                totalDocs: res?.data?.data?.totalDocs
            })
        });
    };

    return (
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">

                <div className={'game_tab_overView head_to_head_gameTab'}>
                    <div className={'d_flex_between'}>
                        <h2>FAQs Type</h2>
                        {
                            hideActionFunc('helpAndSupport') &&
                            <button className={'btn'} onClick={(e) => handleOpenModal('AddFAQTypePopup')}> + Add FAQs Type</button>
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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getFAQTypeHandler} />
            </CommonModal>
        </Box>
    )
}
export default FAQType