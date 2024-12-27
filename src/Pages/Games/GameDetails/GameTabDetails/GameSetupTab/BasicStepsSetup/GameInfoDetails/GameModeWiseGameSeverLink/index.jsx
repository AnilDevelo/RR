import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import PopComponent from "../../../../../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import {ActionFunction, hideActionFunc} from "../../../../../../../../utils";
import { deleteBotList } from "../../../../../../../../Redux/Master/action";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../../../../../hoc/CommonTable";
import CommonModal from "../../../../../../../../hoc/CommonModal";
import { deleteGameServerLinkModeWise,getGameServerLinkModeWise, getSingleGameDetails } from "../../../../../../../../Redux/games/action";
import { useParams } from "react-router-dom";

const GameModeWiseGameSeverLink = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    let Modal = PopComponent[modalDetails.modalName];

    useEffect(() => {
        dispatch(getSingleGameDetails({ gameId: id }))
    }, []);

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop':
            case 'AddModeWiseGameSeverLink':
            case 'DeleteCommonModal': {
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
            id: 'fullName',
            label: 'Game Mode',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>
                    <span >{row?.gameModeId?.gameModeName}</span></TableCell>
            }
        },
        {
            id: 'gameServerLink',
            label: 'Game Server URL',

        },
        ActionFunction('game', {
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className={'edit_btn edit-btn-action u_border'} onClick={(e) => handleOpenModal('AddModeWiseGameSeverLink', { isEdit: true, row })}>Edit</span>
                        <span className='edit_btn edit-btn-action prTab'
                              onClick={() => handleOpenModal('DeleteCommonModal',
                              { deleteListApiHandler: deleteGameServerLinkModeWise({ gameServerLinkModeWiseId: row?._id, gameServerLink : row?.gameServerLink, gameId: id, gameModeId: row?.gameModeId?._id, }), title: 'Do you want to delete this data?' })}>
                        Delete
                    </span>
                </TableCell>
            }
        })

    ];

    useEffect(() => {
         getGameServerLinkModeWiseDetails();
    }, [pagination.rowsPerPage,pagination.page]);

    const getGameServerLinkModeWiseDetails = () => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            gameId:id
        };
        setLoader(true);
        dispatch(getGameServerLinkModeWise(payload)).then(res => {
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
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'d_flex justify_content_between'}>
                    <h2>Mode Wise Game Server URL</h2>
                    {
                        hideActionFunc('game') &&
                        <div className={'d_flex_end'}>
                            <button className={'btn'} onClick={(e) => handleOpenModal('AddModeWiseGameSeverLink')}> + Add Mode Wise Game Server URL</button>
                        </div>
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
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getGameServerLinkModeWiseDetails} />
            </CommonModal>
        </Box>
    );
}
export default GameModeWiseGameSeverLink