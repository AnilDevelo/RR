import React, {useEffect, useState} from "react";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import {ActionFunction, hideActionFunc} from "../../../../utils";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import Box from "@mui/material/Box";
import {useDispatch} from "react-redux";
import PopComponent from "../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import {deleteHelpFAQType, getFAQTitle, getHelpFAQType} from "../../../../Redux/HelpAndSupport/action";

const FAQTitle = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    let Modal = PopComponent[modalDetails.modalName];


    const columns = [
        {
            id: 'title',
            label: 'FAQs Title',
        },
        ActionFunction('helpAndSupport',{
            id: 'Action',
            disablePadding: false,
            label: 'Action',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action ' onClick={(e) => handleOpenModal('AddFAQTitle', { isEdit: true, row })}>Edit</span>
                    {/*<span className='edit_btn edit-btn-action prTab'*/}
                    {/*      onClick={() => handleOpenModal('DeleteCommonModal',*/}
                    {/*          { deleteListApiHandler: deleteHelpFAQType({ FAQTypeId: row?._id }), title: 'Do you want to delete this data?' })}>*/}
                    {/*    Delete*/}
                    {/*</span>*/}
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
            case 'AddFAQTitle': {
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
        getFAQTitleHandler();
    }, [pagination.rowsPerPage, pagination.page]);

    const getFAQTitleHandler = () => {
        setLoader(true);
        dispatch(getFAQTitle({})).then(res => {

            setLoader(false)
            setRowData({
                ...rowData,
                list: Object?.keys(res?.data?.data || {})?.length > 0 ? [res?.data?.data] : [],
            })
        });
    };

    return(
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'game_tab_overView head_to_head_gameTab'}>
                        <div className={'d_flex_between'}>
                            <h2>FAQs Title</h2>
                            {
                               ( hideActionFunc('helpAndSupport') && rowData?.list?.length <= 0) &&
                               <button className={'btn'} onClick={(e) => handleOpenModal('AddFAQTitle')}> + Add FAQ Title</button>
                            }

                        </div>
                    <CustomTable
                        headCells={columns}
                        rowData={rowData?.list}
                        totalDocs={rowData?.totalDocs}
                        isWinnerTitle={true}
                        loading={loader}
                    />
                </div>
            </Paper>

            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getFAQTitleHandler} />
            </CommonModal>
        </Box>
    )
}
export default FAQTitle