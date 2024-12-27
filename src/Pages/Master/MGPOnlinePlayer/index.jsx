import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import {ActionFunction, hideActionFunc} from "../../../utils";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import {useDispatch} from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import {getMGPOnlinePlayer} from "../../../Redux/Master/action";
import TableCell from "@mui/material/TableCell";

const MGPOnlinePlayer = () => {
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
            case 'AddMGPOnlinePlayers': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };


    useEffect(() => {
        getDummyMGPOnlinePlayerPlayer()
    }, [])

    const getDummyMGPOnlinePlayerPlayer = () => {
        setLoader(true)
        dispatch(getMGPOnlinePlayer({})).then(res => {
            if (res.data?.success) {
                setLoader(false);
                setRowData({
                    list: Object?.keys(res?.data?.data)?.length > 0  ? [res?.data?.data] : [],
                    totalDocs: res?.data?.data?.totalDocs
                })
            } else {
                setLoader(false)
            }
        })
    }

    const columns = [
        {
            id: 'isDummyPlayer',
            label: 'Is Dummy Player',
            type: 'custom',
            render: (row) => {
                return <TableCell>{row?.isDummyPlayer ? "Yes" : "No"}</TableCell>
            }
        },
        {
            id: 'dummyPlayerStartPoint',
            label: 'Dummy Player Start Point',

        },
        ActionFunction('master', {
            id: 'Action',
            disablePadding: false,
            label: 'Action',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('AddMGPOnlinePlayers', { row, isEdit: true })}>Edit</span>
                </TableCell>
            }
        })
    ]
    return(
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                {
                    ( hideActionFunc('master') && rowData?.list?.length <= 0) &&
                    <div className={'d_flex_end'}>
                        <button className={'btn'} onClick={(e) => handleOpenModal('AddMGPOnlinePlayers')}> + Create Online Players</button>
                    </div>
                }

                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list}
                    totalDocs={rowData?.totalDocs}
                    pagination={pagination}
                    setPagination={setPagination}
                    isCurrency={true}
                    loading={loader}
                />
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getDummyMGPOnlinePlayerPlayer} />
            </CommonModal>
        </Box>
    )
}
export default MGPOnlinePlayer