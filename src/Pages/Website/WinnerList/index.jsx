import React, { useEffect, useState } from "react";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import PopComponent from "../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import { useDispatch } from "react-redux";
import {
    deleteWebSiteWinnerTitle,
    deleteWinnerList,
    getWinnerList
} from "../../../Redux/website/action";
import {ActionFunction, currencyFormat, decimalGenerate, dotGenerator, hideActionFunc} from "../../../utils";
import NumberFormat from "react-number-format";

const WinnerList = () => {
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false);
    const [rowData, setRowData] = useState({list: [], totalDocs: 0})
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false })
    let Modal = PopComponent[modalDetails?.modalName];

    let columns = [
        {
            id: 'imageList',
            label: 'Image',
            isDisbanding:true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'winner_profile_img'}>
                    <img src={row?.photo} alt={'profile'} />
                </TableCell>
            }
        },
        {
            id: 'name',
            label: 'Name',
        },
        {
            id: 'city',
            label: 'City',
        },
        {
            id: 'state',
            label: 'State',
        },
        {
            id: 'description',
            label: 'Description',
            isDisbanding:true,
            type: 'custom',
            render: (row) => {
                let text = new DOMParser().parseFromString(row?.description, "text/html").documentElement.textContent
                return <TableCell >{dotGenerator(text, handleOpenModal, 'Winner Description')}</TableCell>
            }
        },
        {
            id: 'winAmount',
            label: 'Win Prize Amount',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(row?.winAmount)}</TableCell>
            }
        },
        ActionFunction( 'webSite',{
            id: 'action',
            label: 'Action',
            isDisbanding:true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('AddWinnerPopup', { isEditWinner: true, row })}>Edit</span>
                    <span className='edit_btn edit-btn-action prTab'
                          onClick={()=> handleOpenModal('DeleteCommonModal', {deleteListApiHandler : deleteWinnerList({winnerId: row?._id}), title: 'Do you want to delete this data?'})}>
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
            case 'AddWinnerPopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewRejectedComment': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddWinnerTitlePopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };

    useEffect(() => {
        winnerListHandler()
    }, [pagination.rowsPerPage, pagination.page,]);

    const winnerListHandler = () => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        };
        setLoader(true);
        dispatch(getWinnerList(payload)).then(res => {
            setLoader(false)
            if (res.data.success) {
                let temp = [];
                if (res?.data?.data?.winnerTitle) {
                    temp.push(res?.data?.data?.winnerTitle)
                }
                setRowData({
                    ...rowData,
                    list: res.data.data?.winner?.docs,
                    totalDocs: res.data.data?.winner?.totalDocs,
                    titleList: temp
                })
            }
        });
    };

    const columnsTitle = [
        {
            id: 'title',
            label: "Title",
            isDisbanding:true,
        },
        ActionFunction( 'webSite',{
            id: 'action',
            label: 'Action',
            isDisbanding:true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('AddWinnerTitlePopup', { isEdit: true, row })}>Edit</span>
                    <span className='edit_btn edit-btn-action prTab'
                          onClick={()=> handleOpenModal('DeleteCommonModal', {deleteListApiHandler : deleteWebSiteWinnerTitle({titleId: row?._id}), title: 'Do you want to delete this data?'})}>
                        Delete
                    </span>
                </TableCell>
            }
        })

    ];



    return (
        <>
            {/* { loader ? <Loader /> : "" } */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'d_flex_between'}>
                    <h2>Winner Title</h2>
                    {    hideActionFunc('webSite') &&
                        !rowData?.titleList?.length > 0 &&
                        <button className={'btn'} onClick={() => handleOpenModal('AddWinnerTitlePopup')}> +  Add Winner Title </button>
                    }
                </div>
                <CustomTable
                    headCells={columnsTitle}
                    rowData={rowData?.titleList}
                    totalDocs={rowData?.totalDocs}
                    pagination={pagination}
                    setPagination={setPagination}
                    dragUpdater={''}
                    isWinnerTitle={true}
                    loading={loader}
                />
            </Paper>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'d_flex_between'}>
                    <h2>Winner List</h2>
                    {
                        hideActionFunc('webSite') &&
                        <button className={'btn'} onClick={() => handleOpenModal('AddWinnerPopup')}>+  Add Winner </button>
                    }

                </div>
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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={winnerListHandler} />
            </CommonModal>
        </>
    );
};
export default WinnerList;