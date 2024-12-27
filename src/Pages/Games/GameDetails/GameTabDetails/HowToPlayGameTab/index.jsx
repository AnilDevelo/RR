import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {deleteHowToPlay, getHowToPlay} from "../../../../../Redux/games/action";
import { useParams } from "react-router-dom";
import {ActionFunction, dotGenerator, hideActionFunc} from "../../../../../utils";
import CustomTable from "../../../../../hoc/CommonTable";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";


const HowToPlayGameTab = ({ handleOpenModal }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [rowData, setRowData] = useState({
        gameHowToPlay:[],
    });
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        getGamesList()
    }, []);

    const getGamesList = () => {
        setLoader(true);
        dispatch(getHowToPlay({ gameId: id })).then(res => {
            setLoader(false);
            if (res?.data?.success) {
                setRowData({
                    ...rowData,
                    gameHowToPlay:res.data.data,
                })
            }
        })
    }

    const columns = [
        {
            id: 'title',
            label: 'Title'
        },
        {
            id: '',
            label: 'Description',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return  <TableCell >{
                    row?.type === "TextEditor" ? dotGenerator(row?.howToPlay?.value, handleOpenModal, 'How To Play Description','isGamePlay') :
                        <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('ViewHowToPlayPopup', row)}>View</span>
                }</TableCell>
            }
        },
        ActionFunction('game', {
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('editHowToPlayRules', { redirectApiProps: getGamesList, isEdit: true , row })}>Edit</span>
                    <span className='edit_btn edit-btn-action  prTab'
                          onClick={() => handleOpenModal('DeleteHowToPlay',
                              { deleteListApiHandler: deleteHowToPlay({ howToPlayId: row?._id }), redirectApiProps: getGamesList, title: 'Do you want to delete this data?' })}>
                        Delete
                    </span>
                </TableCell>
            }
        })
    ];

    return (
        <React.Fragment>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'game_tab_overView head_to_head_gameTab'}>
                    <div className={'d_flex_between'}>
                        <h2>Game How To Play </h2>
                        {
                            (hideActionFunc('game') && Object?.keys(rowData?.gameHowToPlay || {})?.length <= 0 )&&
                            <button className={'btn'}  onClick={()=>handleOpenModal('createHowToPlayGame',  { ...rowData, redirectApiProps: getGamesList})}> Create How To Play </button>
                        }
                    </div>

                </div>
                <div className={'head_to_head_gameTab_table'}>
                    <CustomTable
                        headCells={columns}
                        rowData={Object?.keys(rowData?.gameHowToPlay || {})?.length >  0 ? [rowData?.gameHowToPlay] : []}
                        totalDocs={0}
                        isCurrency={true}
                        loading={loader}
                    />
                </div>
            </Paper>
        </React.Fragment>
    )
}
export default HowToPlayGameTab;