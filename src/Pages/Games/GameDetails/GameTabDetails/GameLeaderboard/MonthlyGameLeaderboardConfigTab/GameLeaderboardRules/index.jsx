import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import PopComponent from "../../../../../../../hoc/PopContent";
import { getLeaderboardRules} from "../../../../../../../Redux/Documentation/action";
import Paper from "@mui/material/Paper";
import {ActionFunction, dotGenerator, hideActionFunc} from "../../../../../../../utils";
import CommonModal from "../../../../../../../hoc/CommonModal";
import CustomTable from "../../../../../../../hoc/CommonTable";
import TableCell from "@mui/material/TableCell";


const MonthlyGameLeaderboardRulesTab = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loader, setLoader] = React.useState(false);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [rowData,setRowData] = useState({})

    useEffect(() => {
        getLeaderboardData();
    }, []);

    const getLeaderboardData = () => {
        setLoader(true);
        dispatch(getLeaderboardRules({ gameId:id})).then(res => {
            setRowData(res?.data?.data)
            setLoader(false);
        });
    };


    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'UpdateLeaderboardRules': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewRejectedComment' :{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddGameLeaderboardRules':{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };


    const columns = [
        {
            id: '',
            label: 'Description',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return  <TableCell >{
                    dotGenerator(row, handleOpenModal, 'Leaderboard Rules','isGamePlay') || "-"
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
                    <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('AddGameLeaderboardRules', {isEdit:true, row})}>Edit</span>
                </TableCell>
            }
        })
    ];

    return (
        <div className={'monthly-bonus-release-date'}>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'game_tab_overView head_to_head_gameTab'}>
                    <div className={'d_flex_between'}>
                        <h2>Leaderboard Rules </h2>
                        {
                            (hideActionFunc('game') && Object?.keys(rowData?.leaderboardRules || {})?.length <= 0 )&&
                            <button className={'btn'}  onClick={()=>handleOpenModal('AddGameLeaderboardRules')}> + Add Leaderboard Rules </button>
                        }
                    </div>

                </div>
                <div className={'head_to_head_gameTab_table'}>
                    <CustomTable
                        headCells={columns}
                        rowData={Object?.keys(rowData?.leaderboardRules || {})?.length >  0 ? [rowData?.leaderboardRules] : []}
                        totalDocs={0}
                        isCurrency={true}
                        loading={loader}
                    />
                </div>
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getLeaderboardData} />
            </CommonModal>
            </div>
    )
}
export default MonthlyGameLeaderboardRulesTab