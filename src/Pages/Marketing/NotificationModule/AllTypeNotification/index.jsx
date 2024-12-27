import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PopComponent from "../../../../hoc/PopContent";
import { ActionFunction, dotGenerator, hideActionFunc } from "../../../../utils";
import TableCell from "@mui/material/TableCell";
import {
    deleteNotificationList,
    getNotificationList,
    getNotificationUserTypeDropdownList
} from "../../../../Redux/Master/action";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import moment from "moment";
import user from "../../../../assets/images/avatar.png";
import {getLeaderboardGameList} from "../../../../Redux/Bonus/action";

const AllTypeNotification = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [notificationType, setNotificationType] = useState([])
    let Modal = PopComponent[modalDetails.modalName];
    const [gameFilterData, setGameFilterData] = useState([]);

    useEffect(() => {
        dispatch(getLeaderboardGameList()).then(res => {
            setGameFilterData(res.data.data)
        })
    }, []);

    useEffect(()=>{
        dispatch(getNotificationUserTypeDropdownList()).then(res=>{
            const leaderboard = res.data.data
                ?.filter(item => item?.userType === "Leaderboard" || item?.userType === "Low Lobby")
                ?.reduce((acc, cur) => {
                    return [
                        ...acc,
                        {gameIds:cur.gameIds.map(item=>{
                                return {id: item,minRank: cur.minRank}
                            }).reduce((gameAcc, gameId, i) => {
                                const game = gameFilterData.find(item => item.id === gameId.id);
                                if (game) {
                                    gameAcc.push(`${game.gameName}`);
                                }
                                return [ ...gameAcc ];
                            }, []),
                            userType: cur?.userType,
                            _id: cur?._id,
                            minRank:cur?.minRank,
                            maxEntryFees:cur?.maxEntryFees
                        }
                    ]
                }, []);

            const filteredData = res.data.data?.reduce((acc, item) => {
                if (item?.userType !== "Leaderboard" && item?.userType !== "Low Lobby") {
                    acc.push(item);
                }
                return acc;
            }, []);

            const concatenatedData = leaderboard?.reduce((acc, cur) => {
                if (cur?.gameIds?.length > 0) {
                    const userType = `${cur.userType} - ${cur?.userType === "Leaderboard" ? `minRank: ${cur?.minRank}` : `maxEntryFees: ₹${(+cur?.maxEntryFees)}`}`;
                    const concatenatedItem = { ...cur, userType: `${userType}, Games: ${cur.gameIds?.join()}`};
                    acc.push(concatenatedItem);
                }
                return acc;
            }, []);

            const result = filteredData.concat(concatenatedData);
            setNotificationType(result)
        })
    },[gameFilterData]);

    useEffect(() => {
        getNotificationListDetails();
    }, [pagination.rowsPerPage,pagination.page])

    const handleOpenModal = (type, data) => {
        const modalValue = data;
        const modalName = type;
        const modalIsOpen = true;

        switch (type) {
            case 'CommonPop':
            case 'AddNotificationPopup':
            case 'DeleteCommonModal':
            case 'ViewRejectedComment':
                setModalDetails({ ...modalDetails, modalValue, modalName, modalIsOpen });
                break;
            default:
                setModalDetails({ ...modalDetails, modalIsOpen: false });
        }
    };

    const columns = [
        {
            id: 'logoImage',
            label: 'Logo',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'table_icon'}>
                    <img src={row?.logoImage || user} alt={''} />
                </TableCell>
            }
        },
        {
            id: 'Icon',
            label: ' Banner',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'table_icon'}>
                    <img src={row?.bannerImage || user} alt={''} />
                </TableCell>
            }
        },
        {
            id: 'title',
            label: 'Title',
        },
        {
            id: 'description',
            isDisbanding: true,
            label: 'Description',
            twoLineText: true,
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.description ? dotGenerator(row?.description, handleOpenModal, 'Description') : ''}</TableCell>
            }
        },
        {
            id: 'notificationType',
            label: 'Notification Type',
        },
        {
            id: 'type',
            label: 'User Type',
            type: 'custom',
            render: (row) => {
                let userType = notificationType?.filter(item => item?._id === row?.userTypeId)?.[0]?.userType
                return <TableCell >{userType ?  dotGenerator(userType,handleOpenModal, 'User Type') : ''}</TableCell>
            }
        },
        {
            id: 'sendTime',
            label: 'Send Time',
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment(row?.sendAt).format("hh:mm A")}</TableCell>
            }
        },
        {
            id: 'type',
            label: 'Start Date',
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment(row?.sendDate).format('MMM DD YYYY')}</TableCell>
            }
        },
        {
            id: '',
            label: 'Navigation',
            type: 'custom',
            render: (row) => {
                let label = '';
                switch (row?.navigationScreen) {
                    case 'GameDetailsScreen':
                        label = 'Game Details Screen';
                        break;
                    case 'AddCashScreen':
                        label = 'Add Cash Screen';
                        break;
                    case 'AddCashScreenQR':
                        label = 'Add Cash Screen QR';
                        break;
                    case 'ReferEarn':
                        label = 'Refer Earn';
                        break;
                    default: 
                        label = '';
                        break;
                }
                return <TableCell>{label}</TableCell>;                
            }
        },
        ActionFunction('marketing', {
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action u_border' onClick={(e) => handleOpenModal('AddNotificationPopup', { isEdit: true, row, notificationType })}>Edit</span>
                    <span className='edit_btn edit-btn-action prTab'
                          onClick={() => handleOpenModal('DeleteCommonModal',
                              { deleteListApiHandler: deleteNotificationList({ notificationId: row?._id }), title: 'Do you want to delete this data?' })}>
                        Delete
                    </span>
                </TableCell>
            }
        })

    ];

    const getNotificationListDetails = () => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        };
        setLoader(true);
        dispatch(getNotificationList(payload)).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                list: res?.data?.data?.docs,
                totalDocs: res?.data?.data?.totalDocs
            })
        });
    };

    return(
        <Box>
            <Paper sx={{ mb: 2 }} className="outer-box">
                {
                    hideActionFunc('marketing') &&
                    <div className={'d_flex_end'}>
                        <button className={'btn'} onClick={(e) => handleOpenModal('AddNotificationPopup', { notificationType })}> + Create Notification</button>
                    </div>
                }
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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getNotificationListDetails} />
            </CommonModal>
        </Box>
    )
}
export default AllTypeNotification