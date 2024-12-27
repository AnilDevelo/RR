import React, {useState} from "react";
import MonthlyBonusAmount from "./MonthlyBonusAmount";
import BonusReleaseDate from "./BonusReleaseDate";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import {useDispatch} from "react-redux";
import PopComponent from "../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import moment from "moment";
import {ActionFunction, currencyFormat} from "../../../../utils";
import {deleteReferAndEarnRankConfig} from "../../../../Redux/Bonus/action";

const LeaderBoardRankConfig = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 })
    let Modal = PopComponent[modalDetails.modalName];
    const [rowData, setRowData] = useState({monthlyBonusAmountConfig:[],monthlyBonusDateConfig:[],ranks:[],bonusMonthlyAllData:{}});
    const columns = [
        {
            id: '',
            label: 'Date',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment(row?.createdAt).format('MMM DD YYYY, hh:mm A')}</TableCell>
            }
        },
        {
            id: 'rankTitle',
            label: 'Rank Title',
        },
        {
            id: '',
            label: 'Rank Range',
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.startRank} TO {row?.endRank}</TableCell>
            }
        },
        {
            id: 'bonus',
            label: 'Bonus',
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.bonus)}</TableCell>
            }

        },
        ActionFunction('bonus', {
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action u_border' onClick={(e) => handleOpenModal('AddLeaderboardMonthlyBonusAmount', { isEdit: true, row })}>Edit</span>
                    <span className='edit_btn edit-btn-action prTab'
                          onClick={()=> handleOpenModal('DeleteCommonModal', {deleteListApiHandler : deleteReferAndEarnRankConfig({referAndEarnRankConfigId: row?._id}), title: 'Do you want to delete this data?'})}
                    >Delete</span>
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
            case 'DeleteCommonModal': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddBonusReleaseLeaderboardDate':{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddLeaderboardMonthlyBonusAmount': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddLeaderBoardRankConfig':{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };


    return(
        <>
            <div className={'monthly-refer-earn-details-table'}>
                <MonthlyBonusAmount handleOpenModal={handleOpenModal} rowData={rowData?.monthlyBonusAmountConfig} />
                <BonusReleaseDate handleOpenModal={handleOpenModal} rowData={rowData?.monthlyBonusDateConfig}/>
            </div>

            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'referAndEarn_title'}>
                    <h2>Monthly Leaderboard Rank</h2>
                    <div className={'admin_user_list'}>
                        <button className={'add_game_btn'} onClick={(e) => handleOpenModal('AddLeaderBoardRankConfig')}> + Add Monthly Leaderboard Rank</button>
                    </div>
                </div>
                <CustomTable
                    headCells={columns}
                    rowData={[]}
                    totalDocs={0}
                    pagination={pagination}
                    setPagination={setPagination}
                    isAboutWebsite={true}
                />
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={''} monthlyBonus={rowData?.bonusMonthlyAllData} />
            </CommonModal>
        </>
    )
}
export default LeaderBoardRankConfig