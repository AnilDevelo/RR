import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Paper, TableCell } from "@mui/material";
import CustomTable from "hoc/CommonTable";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useEffect } from "react";
import { getLeaderboardTournamentList } from "Redux/Tournament/action";


const TournamentLeaderboard = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const { id } = useParams(); // Extracts the 'id' param


    useEffect(() => {
        getLeaderBoardListDetails()
    }, []);
    const getLeaderBoardListDetails = () => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            tournamentId: id
        };
        setLoader(true);
        dispatch(getLeaderboardTournamentList(payload)).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                list: res?.data?.data?.docs,
                totalDocs: res?.data?.data?.totalDocs
            })
        });
    };
    const columns = [
       
        // {
        //     id: "Icon",
        //     label: " Banner",
        //     isDisbanding: true,
        //     type: "custom",
        //     render: (row, i) => {
        //         return (
        //             <TableCell className={"table_icon"}>
        //                 <img src={row?.bannerImage} alt={""} />
        //             </TableCell>
        //         );
        //     },
        // },
        {
            id: "title",
            label: "Sr.No.",
        },
        {
            id: "logoImage",
            label: "Player Profile",
            isDisbanding: true,
            type: "custom",
            render: (row, i) => {
                return (
                    <TableCell className={"table_icon"}>
                        <img src={row?.logoImage} alt={""} />
                    </TableCell>
                );
            },
        },
        {
            id: "title",
            label: "Player Rank",
        },
        {
            id: "title",
            label: "Player Name",
        },
        {
            id: "title",
            label: "Players Points",
        },
        // {
        //   id: "description",
        //   isDisbanding: true,
        //   label: "Description",
        //   twoLineText: true,
        //   type: "custom",
        //   render: (row) => {
        //     return (
        //       <TableCell>
        //         {row?.description
        //           ? dotGenerator(row?.description, handleOpenModal, "Description")
        //           : ""}
        //       </TableCell>
        //     );
        //   },
        // },
        // {
        //     id: "notificationType",
        //     label: "Notification Type",
        // },
        // {
        //   id: "type",
        //   label: "User Type",
        //   type: "custom",
        //   render: (row) => {
        //            return (
        //       <TableCell>
        //         {row?.userType
        //           ? dotGenerator(row?.userType, handleOpenModal, "User Type")
        //           : ""}
        //       </TableCell>
        //     );
        //   },
        // },
        // {
        //     id: "sendTime",
        //     label: "Send Time",
        //     type: "custom",
        //     render: (row) => {
        //         return <TableCell>{moment(row?.sendAt).format("hh:mm A")}</TableCell>;
        //     },
        // },
        // {
        //     id: "type",
        //     label: "Start Date",
        //     type: "custom",
        //     render: (row) => {
        //         return (
        //             <TableCell>{moment(row?.sendDate).format("MMM DD YYYY")}</TableCell>
        //         );
        //     },
        // },
        // {
        //     id: "",
        //     label: "Navigation",
        //     type: "custom",
        //     render: (row) => {
        //         let label = "";
        //         switch (row?.navigationScreen) {
        //             case "TournamentDetailScreen":
        //                 label = "Tournament Detail Screen";
        //                 break;
        //             case "TournamentWaitingScreen":
        //                 label = "Tournament Waiting Screen";
        //                 break;
        //             default:
        //                 label = "";
        //                 break;
        //         }
        //         return <TableCell>{label}</TableCell>;
        //     },
        // },
        // ActionFunction("marketing", {
        //   id: "Action",
        //   disablePadding: false,
        //   isDisbanding: true,
        //   label: "Action",
        //   type: "custom",
        //   render: (row) => {
        //     return (
        //       <TableCell className={"role_field_id"}>
        //         <span
        //           className="edit_btn edit-btn-action u_border"
        //           onClick={(e) =>
        //             handleOpenModal("CreateTournamentNotifications", {
        //               isEdit: true,
        //               row,
        //               notificationType,
        //             })
        //           }
        //         >
        //           Edit
        //         </span>
        //         <span
        //           className="edit_btn edit-btn-action prTab"
        //           onClick={() =>
        //             handleOpenModal("DeleteCommonModal", {
        //               deleteListApiHandler: deleteTournamentNotificationList({
        //                 tournamentNotificationId: row?._id,
        //               }),
        //               title: "Do you want to delete this data?",
        //             })
        //           }
        //         >
        //           Delete
        //         </span>
        //       </TableCell>
        //     );
        //   },
        // }),
    ];

    return (
        <Box>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list}
                    totalDocs={rowData?.totalDocs}
                    pagination={pagination}
                    setPagination={setPagination}
                    loading={loader}
                    isWinnerTitle={true}
                />
            </Paper>

        </Box>
    )
}
export default TournamentLeaderboard;
