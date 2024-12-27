import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getGameNumberOfDeck } from "../../../../../Redux/games/action";
import { hideActionFunc } from "../../../../../utils";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../../hoc/CommonTable";
import Loader from "../../../../../images/Loader";
import TableCell from "@mui/material/TableCell";

const GameNumberOfDecksTab = ({ handleOpenModal }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loader, setLoader] = useState(false);
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });

    useEffect(() => {
        getGameDecksListHandler()
    }, [pagination.rowsPerPage, pagination.page]);

    const getGameDecksListHandler = () => {
        setLoader(true)
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            gameId: id
        }
        dispatch(getGameNumberOfDeck(payload)).then(res => {
            setLoader(false)
            if (res.data.success) {
                setRowData({
                    ...rowData,
                    list: res.data.data?.docs,
                    totalDocs: res.data.data.totalDocs
                })
            }
        })
    };
    //isJoker
    const columns = [
        {
            id: 'numberOfDeck',
            label: 'Number Of Decks',

        },
        {
            id: '',
            label: 'Joker Cards',
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.isJoker ? 'Yes' : 'No'}</TableCell>
            }
        },
        // ActionFunction( 'game',{
        //     id: 'Action',
        //     disablePadding: false,
        //     isDisbanding:true,
        //     label: 'Action',
        //     type: 'custom',
        //     render: (row) => {
        //         return <TableCell className={'role_field_id'}>
        //             <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('AddNumberOfDecksPopup', { redirectApiProps: getGameDecksListHandler, isEdit: true,row })}>Edit</span>
        //             <span className='edit_btn edit-btn-action prTab' onClick={()=> handleOpenModal('DeleteCommonModal',
        //                 {deleteListApiHandler : deleteGameModeList({gameModeId:row?._id,gameId:id}), title: 'Do you want to delete the game mode?'})}>Delete</span>
        //         </TableCell>
        //     }
        // })
    ];

    return (
        <React.Fragment>
            <Box>
                {/* {
                    loader &&
                    <Loader />
                } */}
                <Paper sx={{ mb: 2 }} className="outer-box">
                    <div className={'game_tab_overView head_to_head_gameTab'}>
                        <div className={'d_flex_between'}>
                            <h2>Game Decks</h2>
                            {
                                hideActionFunc('game') &&
                                <button className={'btn'} onClick={() => handleOpenModal('AddNumberOfDecksPopup', { redirectApiProps: getGameDecksListHandler, isEdit: false })}>+ Add Game Decks</button>
                            }

                        </div>
                        <div className={'head_to_head_gameTab_table'}>

                            <CustomTable
                                headCells={columns}
                                rowData={rowData?.list}
                                totalDocs={rowData?.totalDocs}
                                pagination={pagination}
                                setPagination={setPagination}
                                loading={loader}
                            />
                        </div>
                    </div>
                </Paper>
            </Box>

        </React.Fragment>
    );
}
export default GameNumberOfDecksTab