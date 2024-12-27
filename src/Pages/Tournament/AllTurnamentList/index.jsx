import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import TableCell from "@mui/material/TableCell";
import moment from "moment";
import PopComponent from "../../../hoc/PopContent";
import CommonModal from "../../../hoc/CommonModal";
import { useDispatch} from "react-redux";
import user from "../../../assets/images/avatar.png";
import MainCommonFilter from "../../../Components/MainCommonFilter";
import { getGenreNames } from "../../../Redux/games/GenreGame/action";
import { ActionFunction } from "../../../utils";
import { deleteTournament, getGameTournamentLobby } from "Redux/Tournament/action";
import { useNavigate } from "react-router-dom";

const AllGameList = () => {
  // Importing necessary dependencies and components
  const dispatch = useDispatch(); // Redux dispatch function
  const [loader, setLoader] = useState(false); // Loader state
  const navigate = useNavigate();

  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
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
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "Tournament ID",
    type: "custom",
    render: (row, i) => {
      return (
        <TableCell>
          <span
            className="edit_btn"
            onClick={() => navigate(`/tournament-tab/${row.id}`)}
          >{`TID000${row?.numericId}`}</span>
        </TableCell>
      );
    },
  },
    {
      id: "",
      label: "Tournament Icon",
      isDisbanding: true,
      type: "custom",
      render: (row, i) => {
        return (
          <TableCell className={"table_icon"}>
            {row?.tournamentIcon ? <img src={row?.tournamentIcon} alt={""} /> : "-"}
          </TableCell>
        );
      },
    },
    {
      id: "tournamentName",
      label: "Tournament Name",
      isDisbanding: true,
    },
    {
      id: "",
      label: "Game Name",
      isDisbanding: true,
      type: 'custom',
      render: (row, i) => {
        return <TableCell>{row?.gameId?.gameName}</TableCell>
      }
    },
    {
      id: "",
      label: "Game Mode Name",
      isDisbanding: true,
      type: 'custom',
      render: (row, i) => {
        return <TableCell>{row?.gameModeId?.gameModeName ?? "-"}</TableCell>
      }
    },
    {
      id: "",
      label: "Sub Mode Name",
      isDisbanding: true,
      type: 'custom',
      render: (row, i) => {
        return <TableCell>{row?.subMode ? row.subMode : "-"}</TableCell>
      }
    },
    {
      id: "platform",
      label: "Game Platform",
      isDisbanding: true,
    },
    {
      id: "",
      label: "Status",
      isDisbanding: true,
      type: 'custom',
      render: (row, i) => {
        return <TableCell>{row?.isActive == true ? "Active" : "Completed"}</TableCell>
      }
    },
    ActionFunction("tournament", {
      id: "action",
      label: "Action",
      isDisbanding: true,
      type: "action",
      ActionContent: (row) => {
        return (
          <TableCell className={"role_field_id"}>
            <span
              className="edit_btn edit-btn-action u_border"
              onClick={() => handleOpenModal("UpdateTurnament", {row , isEdit: true})}
            >
              Edit
            </span>
            <span className='edit_btn edit-btn-action prTab' onClick={() => handleOpenModal('DeleteCommonModal',
            { deleteListApiHandler: deleteTournament({ tournamentId: row?._id }), title: 'Do you want to delete this Tournament?' })}>Delete</span>
          </TableCell>
        );
      },
    }),
  ];

  // Function to handle opening modal based on type and data

  const handleOpenModal = (type, data) => {
    switch (type) {
      case "CommonPop": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "DeleteCommonModal": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "UpdateTurnament": {
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
      (filterData.startDate && filterData.endDate) || filterData?.statusValue === "All Days") {
      allTournamentList(filterData.startDate, filterData.endDate,filterData.search);
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
  const allTournamentList = (startDate, endDate, search) => {
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
    dispatch(getGameTournamentLobby(payload)).then((res) => {
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
      }else {
        setRowData({
          ...rowData,
          list: res?.data?.data?.docs,
          totalDocs: res?.data?.data?.totalDocs,
        });
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
      allTournamentList(filterData.startDate, filterData.endDate,filterData.search);
    }
  }, [filterData.startDate, filterData.endDate]);

  // Function to redirect to API details page
  const redirectApiDetails = () => {
    allTournamentList(filterData.startDate, filterData.endDate);
  };
  return (
    <Box>
      <Paper sx={{ mb: 2 }} className="outer-box">
        <MainCommonFilter
          filterData={filterData}
          setFilterData={setFilterData}
          searchApiHandler={allTournamentList}
          pagination={pagination}
          setPagination={setPagination}
          statusOption={["All Status", "Approved", "Pending", "Rejected", "Archive"]}
          plateFormOption={["All Platform", "Ios", "Android", "Cross-Platform"]}
          addPropsFilter={{ isPlayerRecord: true, isGameList: true, gameTag: false ,userPayment: rowData?.list?.length <= 0,}}
          isSearchTooltip={{ isAllGame: true }}
          handleOpenModal={handleOpenModal}
          totalDocs={rowData?.totalDocs}
        />
        <CustomTable
          headCells={columns}
          rowData={rowData?.list}
          totalDocs={rowData?.totalDocs}
          pagination={pagination}
          setPagination={setPagination}
          loading={loader}
        />
      </Paper>
      <CommonModal
        className={modalDetails?.modalName === "UpdateGame" ? "update_game_modal_details" : "Approved-reject-section"}
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
