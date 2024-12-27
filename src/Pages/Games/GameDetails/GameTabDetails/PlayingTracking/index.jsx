import React, {useEffect, useState} from "react";
import PlayingTrackingConfig from "./PlayingTrackingConfig";
import Paper from "@mui/material/Paper";
import {ActionFunction, currencyFormat, hideActionFunc} from "../../../../../utils";
import CustomTable from "../../../../../hoc/CommonTable";
import Box from "@mui/material/Box";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import PopComponent from "../../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import user from "../../../../../assets/images/avatar.png";
import Loader from "../../../../../images/Loader";
import axios from 'axios';
import {useSelector} from "react-redux";

let CryptoJS = require("crypto-js");

const PlayingTracking = ({handleOpenModal}) =>{
    const { id } = useParams()
    const gameDetails = useSelector(state => state?.gameReducer?.gameDetails);

    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 })
    let Modal = PopComponent[modalDetails.modalName];
    const [isTracking, setIsTracking] = useState(false);
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });

    const columns = [

        {
            id: 'lobbyId',
            label: 'Lobby Id',
            isDisbanding: true,
        },
        {
            id:"tableId",
            label:'Table ID',
            isDisbanding: true,
        },
        // {
        //     id:"",
        //     label:'Lobby Type',
        //     isDisbanding: true,
        // },
        // {
        //     id:"",
        //     label:'Type Of Game',
        //     isDisbanding: true,
        // },
        {
            id:"totalRound",
            label:'Total Round',
            isDisbanding: true,
        },
        // {
        //     id:"",
        //     label:'Use Boat',
        //     isDisbanding: true,
        // },
        // {
        //     id:"maxPlayer",
        //     label:'Max Player',
        //     isDisbanding: true,
        // },
        {
            id:"entryFee",
            label:'Entry Fee',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'text_center'}>{currencyFormat(+row?.entryFee)}</TableCell>
            }
        },
        {
            id:"winningAmount",
            label:'Winning Amount',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                 return <TableCell className={'text_center'}>{currencyFormat(+row?.winningAmount)}</TableCell>
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
                    <span className='edit_btn edit-btn-action' onClick={(e) => handleOpenModal('viewPlayingScoreBoardPopup', { isEdit: true, row })}>View</span>
                </TableCell>
            }
        })
    ];

    useEffect(()=>{
        if(gameDetails?.gameServerLink){
            getPlayingTrackingData();
        }
    },[pagination.rowsPerPage, pagination.page])

    const getPlayingTrackingData = () => {
        const payload = {
            gameId:id,
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        }
        let gameServerURL = gameDetails?.gameServerLink;

        axios.post(`${gameServerURL}/getTtackingLobby`, payload, {headers : {'authorization': CryptoJS.AES.encrypt(id, process.env.REACT_APP_CALL_BREAK_TOKEN_KEY).toString()} }).then(res=>{
            if(res?.data?.success){
                setRowData({
                    ...rowData,
                    list: res?.data?.data?.results,
                    totalDocs: res?.data?.data?.totalDocs
                })
            }
        })
    }

    return(
        <div className={'tracking_players_section'}>
            {/* {loader ? <Loader /> : ""} */}
            <PlayingTrackingConfig handleOpenModal={handleOpenModal} setIsTracking={setIsTracking} gameDetails={gameDetails}/>
            {
                isTracking &&
                <Paper sx={{ mb: 2 }} className="outer-box">
                    <div className={'referAndEarn_title'}>
                        <h2>Playing Tracking List</h2>
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
            }

        </div>
    )
}
export default PlayingTracking