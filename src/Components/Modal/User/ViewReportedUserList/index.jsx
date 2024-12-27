import React, { useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import Box from "@material-ui/core/Box";
import CustomTable from "../../../../hoc/CommonTable";
import { useDispatch } from "react-redux";
import PopComponent from "../../../../hoc/PopContent";
import { viewUserReportedList} from "../../../../Redux/user/action";
import Loader from "../../../../images/Loader";
import { dotGenerator } from "../../../../utils";
import CommonModal from "../../../../hoc/CommonModal";
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
const ViewReportedUserList = ({ modalValue, handleOpenModal }) => {
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false);
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const navigate = useNavigate();

    const [pagination, setPagination] = useState({
        rowsPerPage: 10,
        page: 0
    });

    const columns = [
        {
            id: '',
            numeric: true,
            disablePadding: false,
            label: 'Reported Users Id',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell><span className='edit_btn' onClick={() => navigate(`/users-tab/${row?.userId?._id}`)}>{`UID000${row?.userId?.numericId || (i + 1)}`}</span></TableCell>
            }
        },
        {
            id: 'Username',
            numeric: true,
            disablePadding: false,
            isDisbanding: true,
            label: 'Reported Users Name',
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.userId?.nickName}</TableCell>
            }
        },
        {
            id: 'number',
            numeric: true,
            disablePadding: false,
            isDisbanding: true,
            label: 'Phone Number',
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.userId?.phoneNumber}</TableCell>
            }
        },
        // {
        //     id: 'description',
        //     numeric: true,
        //     disablePadding: false,
        //     isDisbanding: true,
        //     label: 'Description',
        //     type: 'custom',
        //     render: (row) => {
        //         return <TableCell >{ row?.descripton ?  dotGenerator(row?.descripton, handleErrorOpenModal, 'Reported Description') : '-'}</TableCell>
        //     }
        // },
    ];

    useEffect(() => {
        let payload = {
            userId: modalValue,
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        }
        setLoader(true)
        dispatch(viewUserReportedList(payload)).then(res => {
            setLoader(false)
            if (res.data.success) {
                setRowData({
                    ...rowData,
                    list: res?.data?.data?.docs,
                    totalDocs: res?.data?.data?.totalDocs
                });
            }
        })
    }, [])

    const handleErrorOpenModal = (type, data) => {
        switch (type) {
            case 'ViewRejectedComment': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };

    return (
        <Box sx={style} >
            <p className={'custom_close_btn'} onClick={()=>handleOpenModal()}>
                <svg viewBox="0 0 24 24" x="1008" y="432" fit="" height="28" width="25"
                     preserveAspectRatio="xMidYMid meet" focusable="false">
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                        fill="#64748b" />
                </svg>
            </p>
            {/* {loader ? <Loader /> : ""} */}
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
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleErrorOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleErrorOpenModal} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Box>
    )
}
export default ViewReportedUserList