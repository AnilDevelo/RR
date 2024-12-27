import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import Loader from "../../../images/Loader";
import CommonModal from "../../../hoc/CommonModal";
import PopComponent from "../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import { useDispatch } from "react-redux";
import {deleteTopWebsiteGame, getWebsiteGamesList} from "../../../Redux/website/action";
import user from "../../../assets/images/avatar.png";
import {ActionFunction, hideActionFunc} from "../../../utils";
import { Box } from '@mui/material';


const TopGameList = () => {
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false);
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false })
    let Modal = PopComponent[modalDetails?.modalName];

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'ViewGameDetails': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddGame': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ActivatedDeactivatedPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal' : {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };

    useEffect(() => {
        getGamesList();
    }, [pagination.rowsPerPage, pagination.page]);

    const getGamesList = () => {
        setLoader(true);
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        };
        dispatch(getWebsiteGamesList(payload)).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                list: res.data.data.docs,
                totalDocs: res.data.data.totalDocs
            });
        });
    };

    const columns = [

        {
            id: 'gameIcon',
            label: 'Game Icon',
            isDisbanding:true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'game_icon_img'}>
                    <img src={row?.gameIcon || user} alt={''} />
                </TableCell>
            }
        },
        {
            id: 'gameName',
            label: 'Game Name',
        },
        {
            id: 'gameImages',
            label: 'Game Images',
            isDisbanding:true,
            type: 'custom',
            render: (row) => {
                return <TableCell>
                    <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('ViewGameDetails', row)}>View</span>
                </TableCell>
            }
        },
        {
            id: 'gameStatus',
            label: 'Status',
            isDisbanding:true,
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.isActive ? 'Activated' : 'Deactivated'}</TableCell>
            }
        },
        ActionFunction( 'webSite',{
            id: 'action',
            label: 'Action',
            isDisbanding:true,
            type: 'action',
            ActionContent: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('AddGame', { isEdit: true, data: row, redirectApiHandler: getGamesList })}>Edit</span>
                    <span className='edit_btn edit-btn-action u_border prTab'
                          onClick={()=> handleOpenModal('DeleteCommonModal',
                              {deleteListApiHandler : deleteTopWebsiteGame({gameId: row?._id}), title: 'Do you want to delete this data?'})}>
                        Delete
                    </span>
                    {
                        row?.isActive ?
                            <span className='edit_btn edit-btn-action prTab' onClick={() => handleOpenModal('ActivatedDeactivatedPop', { gameId: row?._id, isActive: !row?.isActive, redirectApiHandler: getGamesList })}>Deactivated</span> :
                            <span className='edit_btn edit-btn-action prTab' onClick={() => handleOpenModal('ActivatedDeactivatedPop', { gameId: row?._id, isActive: !row?.isActive, redirectApiHandler: getGamesList })}>Active</span>
                    }
                </TableCell>
            }
        })
    ];

    return (
        <>
        <Box>
            {/* { loader ? <Loader /> : "" } */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                {
                    hideActionFunc('webSite') &&
                    <div className={'d_flex_end'}>
                        <button className={'btn'} onClick={() => handleOpenModal('AddGame')}> + Add Game</button>
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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getGamesList} />
            </CommonModal>
            </Box>
        </>
    )
}
export default TopGameList