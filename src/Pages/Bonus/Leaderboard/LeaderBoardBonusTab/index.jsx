import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import { ActionFunction, dotGenerator, hideActionFunc } from "../../../../utils";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import { useDispatch } from "react-redux";
import PopComponent from "../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import user from "../../../../assets/images/avatar.png";
import {
    deleteInternalAdsList,
    deleteLobbyLabelList,
    getLobbyLabelList
} from "../../../../Redux/Master/action";
import moment from "moment";
import PositionsLeaderBoard from "./PositionsLeaderBoard";
import {geLeaderboardBonus} from "../../../../Redux/Bonus/action";
import TableLoader from "hoc/CommonTable/TableLoader";

const LeaderBoardBonusTab = () => {
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
            case 'AddLeaderboardBonus': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };

    useEffect(() => {
        getLeaderboardBonusDetails();
    }, [])

    const getLeaderboardBonusDetails = () => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        };
        setLoader(true);
        dispatch(geLeaderboardBonus(payload)).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                list: res?.data?.data ?  [res.data.data] : [],
            })
        });
    };
    const columns = [
        {
            id:'date',
            label: 'Date',
            type: 'custom',
            render: (row) => {
                return <TableCell >
                    {row?.date}
                </TableCell>
            }
        },
        {
            id:'numberOfTopPlayer',
            label: 'Leaderboard Bonus',
            type: 'custom',
            render: (row) => {
                return <TableCell >
                    {row?.isLeaderBoardBonusConfigOn ? "Yes" : "No"}
                </TableCell>
            }
        },
        {
            id:'depositInto',
            label: 'Bonus Type',
            type: 'custom',
            render: (row) => {
                return <TableCell >
                    {row?.depositInto === 'WinCash' ?  'Winning Cash' : row?.depositInto === 'DepositCash' ? 'Deposit Cash' : row?.depositInto === 'Bonus' && 'Bonus Cash'}
                </TableCell>
            }
        },
        {
            id:'numberOfTopPlayer',
            label: 'Number Of Top Player'
        },
        ActionFunction('bonus', {
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('AddLeaderboardBonus', { isEdit: true, row })}>Edit</span>
                </TableCell>
            }
        })
    ];

    return (
        <Box>
            {loader ? <TableLoader /> : ""}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'leader-board-title'}>
                    <h2>Leaderboard Bonus</h2>
                    {
                         hideActionFunc('bonus') && rowData?.list?.length <= 0 &&
                        <div className={'admin_user_list'}>
                            <button className={'add_game_btn font-bold'} onClick={(e) => handleOpenModal('AddLeaderboardBonus')}> + Add Leaderboard Bonus</button>
                        </div>
                    }
                </div>

                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list}
                    totalDocs={rowData?.totalDocs}
                    pagination={pagination}
                    setPagination={setPagination}
                    isAboutWebsite={true}
                />
            </Paper>
            <PositionsLeaderBoard handleOpenModal={handleOpenModal} rowData={rowData?.list?.reduce((acc,cur)=> {
                return {...cur}
            } ,{})}/>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getLeaderboardBonusDetails} />
            </CommonModal>
        </Box>
    )
}
export default LeaderBoardBonusTab