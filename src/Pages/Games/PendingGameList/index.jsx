import React, { useEffect, useState } from "react";
import moment from "moment";
import Box from "@material-ui/core/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import PopComponent from "../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import { getGameList } from "../../../Redux/games/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "../../../assets/images/avatar.png";
import MainCommonFilter from "../../../Components/MainCommonFilter";
import { ActionFunction } from "../../../utils";

const PendingGameList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const gameList = useSelector((state) => state.gameReducer?.gameAll);
  const [filterData, setFilterData] = useState({
    startDate: null,
    endDate: null,
    statusValue: "All Days",
    exportFile: false,
    csvDownload: false,
    search: "",
    filterClose: false,
    exportFileName: "Export File",
    platformName: "All Platform",
  });
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0, startRange: '' , endRange: '' });
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];

  let columns = [
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
            >{`GID000${row?.numericId}`}</span>
          </TableCell>
        );
      },
    },
    {
      id: "gameName",
      label: "Game Name",
    },

    {
      id: "platform",
      label: "Game Platform",
      isDisbanding: true,
    },
    {
      id: "gameStatus",
      label: "Status",
    },
    {
      id: "createdAt",
      label: "Date & Time",
      twoLineText: true,
      type: "custom",
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
      type: "custom",
      render: (row) => {
        return (
          <TableCell className={"role_field_id"}>
            <span
              className="edit_btn edit-btn-action u_border"
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
            <span
              className="edit_btn edit-btn-action prTab"
              onClick={() =>
                handleOpenModal("ArchivedGamePopup", {
                  gameId: row?._id,
                  isArchive: true,
                })
              }
            >
              Archive
            </span>
          </TableCell>
        );
      },
    }),
  ];

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

  useEffect(() => {
    if (
      (filterData.startDate && filterData.endDate) ||
      filterData?.statusValue === "All Days"
    ) {
      allPendingGameListFetch(filterData.startDate, filterData.endDate,filterData.search);
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

  const allPendingGameListFetch = (startDate, endDate, search) => {
    setLoader(true);
    let payload = {
      limit: pagination?.endRange ?  pagination?.endRange : pagination.rowsPerPage  ,
      start: +pagination?.startRange ? +pagination?.startRange :   ((pagination.page + 1) - 1) * pagination.rowsPerPage,
searchText: search,
      startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
      endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
      exportFile: filterData?.exportFile,
      csvDownload: filterData?.csvDownload,
      gameStatus: "Pending",
      platform:
        filterData?.platformName !== "All Platform"
          ? filterData?.platformName
          : "",
    };
    Object?.keys(payload).forEach((ele) => {
      if (payload[ele] === "" || payload[ele] === null) {
        delete payload[ele];
      }
    });
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
      allPendingGameListFetch(filterData.startDate, filterData.endDate);
    }
  }, [filterData.startDate, filterData.endDate]);

  const redirectApiDetails = () => {
    allPendingGameListFetch(filterData.startDate, filterData.endDate);
  };

  return (
    <Box>
      {/* {loader ? <Loader /> : ""} */}
      <Paper sx={{ mb: 2 }} className="outer-box">
        <MainCommonFilter
          filterData={filterData}
          setFilterData={setFilterData}
          searchApiHandler={allPendingGameListFetch}
          pagination={pagination}
          setPagination={setPagination}
          plateFormOption={["All Platform", "Ios", "Android", "Cross-Platform"]}
          addPropsFilter={{
            isGameList: true,
            isPending: true,
            userPayment: gameList?.list?.length <= 0,
          }}
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
        className={"Approved-reject-section"}
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

export default PendingGameList;
