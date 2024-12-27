import React, { useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import { ActionFunction } from "../../../../utils";
import Box from "@material-ui/core/Box";
import CustomTable from "../../../../hoc/CommonTable";
import { getViewUserBlockList } from "../../../../Redux/user/action";
import { useDispatch } from "react-redux";
import CommonModal from "../../../../hoc/CommonModal";
import PopComponent from "../../../../hoc/PopContent";
import Loader from "../../../../images/Loader";
import {useNavigate} from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    boxShadow: 24,
    padding: '32px 0',
    borderRadius: "5px",
};
const UserBlockListView = ({ modalValue, redirectApiHandler, handleOpenModal }) => {
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        rowsPerPage: 10,
        page: 0
    });

    const handleOpenModalView = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'BlockUser': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'UnblockUserPopup': {
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
            label: 'Users ID',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell><span className='edit_btn' onClick={() => navigate(`/users-tab/${row?.userId?._id}`)}>{`UID000${row?.userId?.numericId}`}</span></TableCell>
            }
        },
        {
            id: 'userName',
            label: 'Users Name',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{row?.userId?.fullName}</TableCell>
            }
        },
        {
            id: 'mobileNumber',
            label: 'Phone Number',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{row?.userId?.phoneNumber}</TableCell>
            }
        },
        ActionFunction('user', {
            id: 'Action',
            label: 'Action',
            type: 'custom',
            isDisbanding: true,
            render: (row) => {
                return <TableCell>
                    <span className='edit_btn edit-btn-action' onClick={() => handleOpenModalView('UnblockUserPopup', { blockUserId: modalValue?.userId })}>Unblock</span>
                </TableCell>
            }
        })
    ];

    useEffect(() => {
        getUserBlockDetailsHandler()
    }, [pagination.rowsPerPage, pagination.page]);

    // get Users Api and All Filter Api
    const getUserBlockDetailsHandler = () => {
        setLoader(true)
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            userId: modalValue?.userId
        }
        dispatch(getViewUserBlockList(payload)).then(res => {
            setLoader(false)
            if (res.data?.success) {
                setRowData({
                    ...rowData,
                    list: res.data.data?.docs,
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

    return (
        <Box sx={style} >
            {/* {loader ? <Loader /> : ""} */}
            <p className={'custom_close_btn'} onClick={()=>handleOpenModal()}>
                <svg viewBox="0 0 24 24" x="1008" y="432" fit="" height="28" width="25"
                     preserveAspectRatio="xMidYMid meet" focusable="false">
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                        fill="#64748b" />
                </svg>
            </p>
            <div className={'modal_main_popup'}>
                <div className={'add_admin_user_popup_title modal_popup_title'}>
                    <h2>Blocked By These Users</h2>
                </div>
            </div>
            <div className={'OverView_pagination'}>
            <CustomTable
                headCells={columns}
                rowData={rowData?.list}
                totalDocs={rowData?.totalDocs}
                pagination={pagination}
                    setPagination={setPagination}
                    loading={loader}
            />
            </div>
            {/*--------------------------------------------------------Common Popup-------------------------------------------------*/}
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModalView}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModalView} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getUserBlockDetailsHandler} />
            </CommonModal>
        </Box>
    )
}
export default UserBlockListView