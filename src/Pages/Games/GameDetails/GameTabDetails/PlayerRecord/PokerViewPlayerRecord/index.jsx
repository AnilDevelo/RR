import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import PopComponent from "../../../../../../hoc/PopContent";
import {useNavigate} from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import user from "../../../../../../assets/images/avatar.png";
import {currencyFormat} from "../../../../../../utils";
import {viewPlayerRecordList} from "../../../../../../Redux/games/action";
import Box from "@material-ui/core/Box";
import CustomTable from "../../../../../../hoc/CommonTable";
import CommonModal from "../../../../../../hoc/CommonModal";
import TableLoader from "../../../../../../hoc/CommonTable/TableLoader";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 975,
    bgcolor: 'white',
    boxShadow: 24,
    padding: '32px 0',
    borderRadius: "5px",
};

const PokerViewPlayerRecord = ({ modalValue, handleOpenModal }) => {
    const dispatch = useDispatch();
    const gameDetails = useSelector(state => state?.gameReducer?.gameDetails);
    const [loader, setLoader] = useState(false);
    const [rowData, setRowData] = useState({ list: [], potValue:[], totalDocs: 0 });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const navigate = useNavigate();

    const [pagination, setPagination] = useState({
        rowsPerPage: 10,
        page: 0
    });

    const columns = [
        {
            id: '',
            numeric: true,
            disablePadding: false,
            label: ' Users Profile',
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'table_icon'}>
                    <img src={row?.userId?.profileImage || user} alt={''} />
                </TableCell>
            }
        },
        {
            id: 'Username',
            numeric: true,
            disablePadding: false,
            isDisbanding: true,
            label: 'Users Name',
            type: 'custom',
            render: (row) => {
                return <TableCell><span className='edit_btn'
                                        onClick={() => navigate(`/users-tab/${row?.userId?._id}`)}>{row?.userId?.nickName}</span></TableCell>
            }
        },
        gameDetails?.gameName === 'Poker' ?
            {
                id: 'entryFee',
                numeric: true,
                disablePadding: false,
                isDisbanding: true,
                label: 'Player spent',
                type: 'custom',
                render: (row, i) => {
                    return <TableCell className={'table_icon'}>
                        {currencyFormat(row?.entryFee || 0)}
                    </TableCell>
                }
            }  :{
                id: 'action',
                type: 'hide'
            } ,
        {
            id: 'score',
            numeric: true,
            disablePadding: false,
            isDisbanding: true,
            label: 'Score',
        },
        {
            id: 'winStatus',
            numeric: true,
            disablePadding: false,
            isDisbanding: true,
            label: 'Status',
        },
    ];

    useEffect(() => {
        let payload = {
            tableId: modalValue?.id
        }
        setLoader(true)
        dispatch(viewPlayerRecordList(payload)).then(res => {
            setLoader(false)
            if (res.data.success) {
                setRowData({
                    ...rowData,
                    list: res.data.data?.usersDetails,
                    potValue: res.data.data?.potDataUserWise,
                    totalDocs: res?.data?.data?.totalDocs || 0
                });
            }
        })
    }, []);


    const handleErrorOpenModal = (type, data) => {
        switch (type) {
            case 'ViewRejectedComment':
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };

    return (
        <Box sx={style}  className={'poker_game_view_pot'}>
            <p className={'custom_close_btn'} onClick={()=>handleOpenModal()}>
                <svg viewBox="0 0 24 24" x="1008" y="432" fit="" height="28" width="25"
                     preserveAspectRatio="xMidYMid meet" focusable="false">
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                        fill="#64748b" />
                </svg>
            </p>
            {loader && <TableLoader/>}
            <div className={'OverView_pagination'}>
               <div className={'port_main_table mb_2'}>
                   <CustomTable
                       headCells={columns}
                       rowData={rowData?.list}
                       totalDocs={rowData?.totalDocs}
                       pagination={pagination}
                       setPagination={setPagination}
                       loading={false}
                       isWinnerTitle={true}
                   />
               </div>
                {
                    rowData?.potValue?.map(port=>{
                        return (
                            <div className={' player_poker_game_view_main '}>
                                <div className={'player_poker_game_view'}>
                                    <div className={'poker_box'}>
                                        <h3>Pot value</h3>
                                        <p>{currencyFormat(port?.potValue || 0)}</p>
                                    </div>
                                    <h3>-</h3>
                                    <div className={'poker_box'}>
                                        <h3>Commision</h3>
                                        <p> {currencyFormat(port?.platformCommission)}</p>
                                    </div>
                                    <h3>=</h3>
                                    <div className={'poker_box'}>
                                        <h3> Net Pot Value </h3>
                                        <p>{currencyFormat(port?.portValueAfterCommissionDeduction)}</p>
                                    </div>
                                </div>
                                <CustomTable
                                    headCells={columns}
                                    rowData={port?.userData}
                                    totalDocs={rowData?.totalDocs}
                                    pagination={pagination}
                                    setPagination={setPagination}
                                    loading={false}
                                    isWinnerTitle={true}
                                />
                            </div>
                        )
                    })
                }
            </div>


            {/*--------------------------------------------------------Common Popup-------------------------------------------------*/}
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleErrorOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleErrorOpenModal} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Box>
    )
}
export default PokerViewPlayerRecord