import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import TableCell from "@mui/material/TableCell";
import moment from "moment";
import PopComponent from "../../../hoc/PopContent";
import CommonModal from "../../../hoc/CommonModal";
import { getGameList, getSingleGameDetails } from "../../../Redux/games/action";
import { useDispatch, useSelector } from "react-redux";
import user from "../../../assets/images/avatar.png";
import { useNavigate } from "react-router-dom";
import MainCommonFilter from "../../../Components/MainCommonFilter";
import { getGenreNames } from "../../../Redux/games/GenreGame/action";
import { ActionFunction } from "../../../utils";

const AllGameList = () => {
  // Importing necessary dependencies and components
  const dispatch = useDispatch(); // Redux dispatch function
  const navigate = useNavigate(); // React Router navigation function
  const [loader, setLoader] = useState(false); // Loader state
  const gameList = useSelector((state) => state.gameReducer?.gameAll); // Game list from Redux store
  const [filterData, setFilterData] = useState({ // State for filter data
    startDate: null,
    endDate: null,
    statusValue: "All Days",
    exportFile: false,
    csvDownload: false,
    search: "",
    filterClose: false,
    exportFileName: "Export File",
    statusField: "All Status",
    platformName: "All Platform",
    gameTag: "All Game Tag",
  });
  const [pagination, setPagination] = useState({
    rowsPerPage: 10,
    page: 0,
    startRange: "",
    endRange: "",
  });

  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName]; // Modal component based on modal name

  let columns = [ // Array of table columns
  // Game Icon column
    {
      id: "icon",
      label: "Game Icon",
      isDisbanding: true,
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell className={"table_icon"}>
            <img src={row?.gameIcon || user} alt={""} />
          </TableCell>
        );
      },
    },
    // Game Id column
    {
      id: "numericId",
      label: "Game Id",
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell>
            <span
              className="edit_btn"
              onClick={() => navigate(`/game-tab/${row.id}`)}
            >
              {`GID000${row?.numericId}`}
            </span>
          </TableCell>
        );
      },
    },
    // Game Name column
    {
      id: "gameName",
      label: "Game Name",
    },
    // Game Platform column
    {
      id: "platform",
      label: "Game Platform",
      isDisbanding: true,
    },
    // Status column
    {
      id: "gameStatus",
      label: "Status",
      type: "custom",
      render: (row) => {
        return (
          <TableCell>
            <span
              className={row?.gameStatus === "Approve" ? "Approved" : "req_rejected"}
            >
              {row?.gameStatus === "Approve"
                ? "Approved"
                : row?.gameStatus === "Reject"
                ? "Rejected"
                : row?.gameStatus}
            </span>
          </TableCell>
        );
      },
    },
    // {
    //     id: 'gameTag',
    //     label: 'Game Tag',
    //     type: 'custom',
    //     render: (row) => {
    //         return <TableCell>{row?.gameTag}</TableCell>
    //     }
    // },
    {
      id: "createdAt",
      label: "Date & Time",
      type: "custom",
      twoLineText: true,
      render: (row) => {
        return (
          <TableCell>
            {moment(row?.createdAt).format("MMM DD YYYY, hh:mm A")}
          </TableCell>
        );
      },
    },
    ActionFunction("game", {
      id: "action",
      label: "Action",
      isDisbanding: true,
      type: "action",
      ActionContent: (row) => {
        return (
          <TableCell className={"role_field_id"}>
             {/* Edit button */}
            <span
              className="edit_btn edit-btn-action u_border"
              onClick={() => handleOpenModal("UpdateGame", row)}
            >
              Edit
            </span>
            {/* Conditional rendering based on game status show*/}
            {row?.gameStatus === "Pending" ? (
              <>
                <span
                  className="edit_btn edit-btn-action u_border prTab"
                  onClick={() =>
                    handleOpenModal("ApprovedPendingPopup", {
                      gameId: row?._id,
                      isApprove: true,
                    })
                  }
                >
                  Approve
                </span>
                <span
                  className="edit_btn edit-btn-action u_border prTab"
                  onClick={() =>
                    handleOpenModal("RejectedPopup", {
                      gameId: row?._id,
                      isApprove: false,
                    })
                  }
                >
                  Reject
                </span>
              </>
            ) : row?.gameStatus === "Reject" ? (
              <>
                <span
                  className="edit_btn edit-btn-action u_border prTab"
                  onClick={() =>
                    handleOpenModal("ApprovedPendingPopup", {
                      gameId: row?._id,
                      isApprove: true,
                    })
                  }
                >
                  Approve
                </span>
              </>
            ) : (
              ""
            )}
            {/* Archive/Unarchive button */}
            {row?.gameStatus === "Archive" ? (
              <span
                className={"edit_btn edit-btn-action  prTab"}
                onClick={() =>
                  handleOpenModal("ArchivedGamePopup", {
                    gameId: row?._id,
                    isArchive: false,
                  })
                }
              >
                Unarchive
              </span>
            ) : (
              <span
                className={"edit_btn edit-btn-action  prTab"}
                onClick={() =>
                  handleOpenModal("ArchivedGamePopup", {
                    gameId: row?._id,
                    isArchive: true,
                  })
                }
              >
                Archive
              </span>
            )}
          </TableCell>
        );
      },
    }),
  ];

  // Function to handle opening modal based on type and data

  const handleOpenModal = (type, data) => {
    switch (type) {
      case "ApprovedPendingPopup": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "RejectedPopup": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "CommonPop": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "UpdateGame": {
        dispatch(getGenreNames({ genreStatus: "Active" })); // Dispatch action to get genre names
        dispatch(getSingleGameDetails({ gameId: data?._id })); // Dispatch action to get single game details
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "ArchivedGamePopup": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "ExportFilePopup": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      default: {
        setModalDetails({ ...modalDetails, modalIsOpen: false });
      }
    }
  };

  // Trigger game list fetch when start date, end date, or status value changes
  useEffect(() => {
    if (
      (filterData.startDate && filterData.endDate) ||
      filterData?.statusValue === "All Days"
    ) {
      allGameListFetch(filterData.startDate, filterData.endDate,filterData.search);
    }
  }, [
    pagination.rowsPerPage,
    pagination.page,
    filterData.exportFile,
    filterData.csvDownload,
    filterData.statusField,
    filterData.platformName,
    filterData?.gameTag,
    filterData.startDate,
    filterData.endDate,
    filterData?.statusValue,
  ]);

  // Fetch game list based on filter data and pagination
  const allGameListFetch = (startDate, endDate, search) => {
    setLoader(true);
    const activeStatus = filterData?.statusField == "Approved" ? "Approve" : filterData?.statusField == "Rejected" ? "Reject" : filterData?.statusField
    let payload = {
      limit: pagination?.endRange || pagination.rowsPerPage,
      start: +pagination?.startRange || ((pagination.page + 1) - 1) * pagination.rowsPerPage,
      searchText: search,
      startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
      endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
      exportFile: filterData?.exportFile,
      csvDownload: filterData?.csvDownload,
      platform:
        filterData?.platformName !== "All Platform"
          ? filterData?.platformName
          : "",
      gameStatus:activeStatus !== "All Status" ? activeStatus : "",
      gameTag:filterData?.gameTag !== "All Game Tag" ? filterData?.gameTag : "",
    };

    Object.keys(payload).forEach(key => {if (payload[key] === '' || payload[key] === null) {delete payload[key];}});
    dispatch(getGameList(payload)).then((res) => {
        setLoader(false);
        if(pagination?.endRange?.toString() !== '' && pagination?.startRange?.toString() !== '' ){
            setPagination({
                ...pagination,
                startRange:'',
                endRange: '',
                rowsPerPage: 10,
                page:0
            })
            setFilterData({
                ...filterData,
                csvDownload: false,
                exportFile: false,
                exportFileName: 'Export File'
            })
        }
      if (res?.data?.data?.filePath) {
        setFilterData({
          ...filterData,
          csvDownload: false,
          exportFile: false,
        });
        window.open(res?.data?.data?.filePath,"_blank");
      }
    });
  };

// Trigger game list fetch when start date and end date are selected for custom range
useEffect(() => {
    if (
      filterData.startDate &&
      filterData.endDate &&
      filterData?.statusValue === "Custom"
    ) {
      setPagination({
        ...pagination,
        page: 0,
      });
      allGameListFetch(filterData.startDate, filterData.endDate,filterData.search);
    }
  }, [filterData.startDate, filterData.endDate]);

  // Function to redirect to API details page
  const redirectApiDetails = () => {
    allGameListFetch(filterData.startDate, filterData.endDate);
  };

    useEffect(() => {
    setPagination({
      rowsPerPage: 10,
      page: 0,
      startRange: "",
      endRange: "",
    })
  }, [filterData?.statusField,filterData?.statusValue,filterData?.platformName])
  
  return (
    <Box>
      {/* {loader ? <Loader /> : ""} */}
      <Paper sx={{ mb: 2 }} className="outer-box">
        <MainCommonFilter
          filterData={filterData}
          setFilterData={setFilterData}
          searchApiHandler={allGameListFetch}
          pagination={pagination}
          setPagination={setPagination}
          statusOption={["All Status", "Approved", "Pending", "Rejected", "Archive"]}
          plateFormOption={["All Platform", "Ios", "Android", "Cross-Platform"]}
          // gameTagOption={['All Game Tag', 'New Game', 'Popular Game',]}
          addPropsFilter={{ isGameList: true, gameTag: false ,userPayment: gameList?.list?.length <= 0}}
          isSearchTooltip={{ isAllGame: true }}
          handleOpenModal={handleOpenModal}
          totalDocs={gameList?.totalDocs}
        />
        <CustomTable
          headCells={columns}
          rowData={gameList?.list}
          totalDocs={gameList?.totalDocs}
          pagination={pagination}
          setPagination={setPagination}
          loading={loader}
        />
      </Paper>
      <CommonModal
        className={
          modalDetails?.modalName === "UpdateGame"
            ? "update_game_modal_details"
            : "Approved-reject-section"
        }
        modalIsOpen={modalDetails.modalIsOpen}
        handleOpenModal={handleOpenModal}
      >
        <Modal
          modalValue={modalDetails.modalValue}
          handleOpenModal={handleOpenModal}
          modalIsOpen={modalDetails.modalIsOpen}
          redirectApiHandler={redirectApiDetails}
        />
      </CommonModal>
    </Box>
  );
};

export default AllGameList;
