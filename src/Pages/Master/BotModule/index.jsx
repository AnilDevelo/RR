import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import user from "../../../assets/images/avatar.png";
import {ActionFunction, dotGenerator, hideActionFunc} from "../../../utils";
import {deleteBotList, getBotList} from "../../../Redux/Master/action";
import Box from "@mui/material/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";

const BotModule = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    let Modal = PopComponent[modalDetails.modalName];

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddBot': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewRejectedComment': {
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
            id: 'profileImage',
            label: 'Profile',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'table_icon'}>
                    <img src={row?.profileImage || user} alt={''} />
                </TableCell>
            }
        },
        {
            id: 'fullName',
            label: 'Name',
        },
        {
            id: 'bonus',
            label: 'Total Bonus',
        },
        {
            id: 'cash',
            label: 'Cash',
        },
        {
            id: 'isBusy',
            label: 'Status',
            type: 'custom',
            render: (row) => {
                return <TableCell>{row?.isBusy ? <span className={'req_rejected'}>Busy</span> :  <span>Free</span>}</TableCell>
            }
        },
        ActionFunction('master', {
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className={row?.isDeletable ? 'edit_btn edit-btn-action u_border' : 'edit_btn edit-btn-action'} onClick={(e) => handleOpenModal('AddBot', { isEdit: true, row })}>Edit</span>
                    {
                        row?.isDeletable &&
                        <span className='edit_btn edit-btn-action prTab'
                              onClick={() => handleOpenModal('DeleteCommonModal',
                                  { deleteListApiHandler: deleteBotList({ userId: row?._id }), title: 'Do you want to delete this data?' })}>
                        Delete
                    </span>
                    }

                </TableCell>
            }
        })

    ];


    useEffect(() => {
        getBotDetails();
    }, [pagination.rowsPerPage,pagination.page])

    const getBotDetails = () => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        };
       // setLoader(true);
        dispatch(getBotList(payload)).then(res => {
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
                {
                    hideActionFunc('master') &&
                    <div className={'d_flex_end'}>
                        <button className={'btn'} onClick={(e) => handleOpenModal('AddBot')}> + Create Bot</button>
                    </div>
                }

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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getBotDetails} />
            </CommonModal>
        </Box>
    );
}
export default BotModule