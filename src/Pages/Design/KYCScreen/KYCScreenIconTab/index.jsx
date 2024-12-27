import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import PopComponent from "../../../../hoc/PopContent";
import {deleteKYCScreenIcon, getKYCScreenIcon} from "../../../../Redux/Design/action";
import TableCell from "@material-ui/core/TableCell";
import user from "../../../../assets/images/avatar.png";
import {ActionFunction, hideActionFunc} from "../../../../utils";
import {Box} from "@mui/material";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";

const KYCScreenIconTab = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });

    useEffect(() => {
        getKYCScreenList();
    }, []);

    const getKYCScreenList = () => {
        setLoader(true);
        dispatch(getKYCScreenIcon({}))
            .then((res) => {
                if (res.data.success) {
                    setLoader(false);
                    setRowData({
                        ...rowData,
                        list: res?.data?.data?.docs,
                        totalDocs: res?.data?.data?.totalDocs
                    });
                } else {
                    setLoader(false);
                }
            })
            .catch((e) => {
                setLoader(false);
            });
    };



    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'DeleteCommonModal': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddKYCScreenIcon':{
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
            label: "KYC Icon",
            sortable: false,
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'table_icon'}>
                    <img src={row?.KYCIconImage || user} alt={''} />
                </TableCell>
            }
        },
        {
            id: "KYCTitle",
            numeric: true,
            disablePadding: false,
            label: "KYC Title",
        },
        ActionFunction('design', {
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('AddKYCScreenIcon', {  isEdit: true, row })}>Edit</span>
                    <span className='edit_btn edit-btn-action prTab' onClick={() => handleOpenModal('DeleteCommonModal',
                        { deleteListApiHandler: deleteKYCScreenIcon({ KYCScreenIconId: row?._id }), title: 'Do you want to delete this data?' })}>Delete</span>
                </TableCell>
            }
        })
    ];
    return (
        <Box>
            {/* {loader ? <Loader /> : ""} */}

            <Paper sx={{ mb: 2 }} className="outer-box">
                {
                    hideActionFunc('master') &&
                    <div className={'d_flex_end'}>
                        <button className={'btn'} onClick={(e) => handleOpenModal('AddKYCScreenIcon')}>  + Add KYC Screen Icon </button>
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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getKYCScreenList} />
            </CommonModal>
        </Box>
    );
}
export default KYCScreenIconTab