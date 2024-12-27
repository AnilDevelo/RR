import React, { useEffect, useState } from "react";
import CommonModal from "../../../../../hoc/CommonModal";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PopComponent from "../../../../../hoc/PopContent";
import { hideActionFunc, a11yProps } from "../../../../../utils";
import { getGameBuildsList } from "../../../../../Redux/games/action";
import ModeWiseGameBuild from "./ModeWiseGameBuild";
import TabPanel from "../../../../../Components/TabPanel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const GameBuildsTab = () => {
  const { id } = useParams();
  const gameDetails = useSelector((state) => state?.gameReducer?.gameDetails);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  let Modal = PopComponent[modalDetails.modalName];
  const [value, setValue] = React.useState(0); // Initializes the 'value' state variable with an initial value of 0
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
  const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
  const [gameModeArr, setGameModeArr] = useState([]);
  const [singleModeData, setSingleModeData] = useState([]);

  useEffect(() => {
    setGameModeArr([
      ...gameDetails?.gameModes,
      { gameModeName: "Build without game mode", _id: "1" },
    ]);
  }, [gameDetails]);

  // const handleCopyURL = (url) => {
  //   navigator.clipboard.writeText(url).then((res) => {
  //     handleOpenModal("CommonPop", {
  //       header: "Success",
  //       body: "Code URL is Copy Successfully ",
  //     });
  //   });
  // };
  const handleOpenModal = (type, data) => {
    switch (type) {
      case "ViewRejectedComment": {
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
      case "AddGameBuilds": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "ViewReleaseGuide": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "UpdateGameBuild": {
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
      default: {
        setModalDetails({ ...modalDetails, modalIsOpen: false });
      }
    }
  };

  const handleChange = (event, newValue) => {
    let gameModes = gameModeArr
      ?.filter((item) => item?._id === event.target?.name)
      .reduce((acc, cur) => {
        return { ...acc, ...cur };
      }, {});
    setSingleModeData(gameModes);
    setValue(newValue); // Updates the 'value' state variable with the selected tab value
  };
  // const columns = [
  //     {
  //         id: 'releaseVersion',
  //         label: 'MPG Version ',
  //         type: 'custom',
  //         render: (row) => {
  //             return <TableCell >{row?.mgpReleaseId?.releaseNumber} </TableCell>
  //         }
  //     },
  //     {
  //         id: 'releaseVersion',
  //         label: 'Release Version ',
  //     },
  //     // {
  //     //     id: 'buildScript',
  //     //     label: 'Script(code)',
  //     //     twoLineText: true,
  //     //     type: 'custom',
  //     //     render: (row) => {
  //     //         return <TableCell ><a href={row?.buildScript} className={'edit_btn edit-btn-action'} target={'_blank'} >Download</a> </TableCell>
  //     //     }
  //     // },
  //     // {
  //     //     id: 'buildPlugging',
  //     //     label: 'Plugging',
  //     //     twoLineText: true,
  //     //     type: 'custom',
  //     //     render: (row) => {
  //     //         return <TableCell ><a href={row?.buildPlugging} className={'edit_btn edit-btn-action'} target={'_blank'} >Download</a> </TableCell>
  //     //     }
  //     // },
  //     {
  //         id: 'buildScene',
  //         label: 'Scene .unity ',
  //         type: 'custom',
  //         render: (row) => {
  //             return <TableCell ><a href={row?.buildScene} className={'edit_btn edit-btn-action'} target={'_blank'} >Download</a> </TableCell>
  //         }
  //     },
  //     {
  //         id: 'buildAndroidAssets',
  //         label: 'Asset Build  Android ',
  //         type: 'custom',
  //         render: (row) => {
  //             return <TableCell > {(gameDetails?.platform === "Android" || gameDetails?.platform === 'Cross-Platform') ? <a href={row?.buildAndroidAssets} className={'edit_btn edit-btn-action'} target={'_blank'} >Download</a> : '-'}  </TableCell>
  //         }
  //     },
  //     {
  //         id: 'buildIosAssets',
  //         label: 'Asset Build  IOS ',
  //         type: 'custom',
  //         render: (row) => {
  //             return <TableCell >  {(gameDetails?.platform === "Ios" || gameDetails?.platform === 'Cross-Platform') && row?.buildIosAssets? <a href={row?.buildIosAssets} className={'edit_btn edit-btn-action'} target={'_blank'} >Download</a> : '-'} </TableCell>
  //         }
  //     },
  //     // {
  //     //     id: 'codeUrl',
  //     //     label: 'Code URL',
  //     //     twoLineText: true,
  //     //     type: 'custom',
  //     //     render: (row) => {
  //     //         return <TableCell >{row?.codeUrl ? <span className='edit_btn edit-btn-action' onClick={() => handleCopyURL(row?.codeUrl)}>Copy</span> : '-'}   </TableCell>
  //     //     }
  //     // },
  //     // {
  //     //     id: 'releaseGuideLink',
  //     //     label: 'Release Guide </br>  Link ',
  //     //     type: 'custom',
  //     //     twoLineText: true,
  //     //     render: (row) => {
  //     //         return <TableCell > {row?.releaseGuideLink ? <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('ViewReleaseGuide', row)}>View</span> : '-'}  </TableCell>
  //     //     }
  //     // },
  //     {
  //         id: 'releaseNotes',
  //         label: 'Release Note',
  //         twoLineText: true,
  //         type: 'custom',
  //         render: (row) => {
  //             let text = new DOMParser().parseFromString(row?.releaseNotes, "text/html").documentElement.textContent
  //             return <TableCell >{dotGenerator(text, handleOpenModal, 'Release Notes')}</TableCell>
  //         }
  //     },
  //     ActionFunction('game', {
  //         id: 'action',
  //         label: 'Action',
  //         type: 'custom',
  //         twoLineText: true,
  //         render: (row) => {
  //             return <TableCell className={'role_field_id'}>
  //                 <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('UpdateGameBuild', row)}>Edit</span>
  //                 <span className='edit_btn edit-btn-action prTab'
  //                     onClick={() => handleOpenModal('DeleteCommonModal',
  //                         { deleteListApiHandler: deleteGameBuildsList({ gameId: id, gameBuildId: row?._id }), title: 'Do you want to delete this data?' })}
  //                 >Delete</span>
  //             </TableCell>
  //         }
  //     })
  // ];



  useEffect(() => {
    gameBuildListDetails();
  }, [value, gameDetails?.isUploadGameWiseModeBuild, gameModeArr]);

  const gameBuildListDetails = () => {
    let payload = {
      gameId: id,
      publisherId: gameDetails?.publisherId?._id,
      start: (pagination.page + 1 - 1) * pagination.rowsPerPage,
      limit: pagination.rowsPerPage,
      isUploadGameWiseModeBuild: gameDetails?.isUploadGameWiseModeBuild
        ? singleModeData?._id !== "1"
          ? gameDetails?.isUploadGameWiseModeBuild
          : false
        : gameDetails?.isUploadGameWiseModeBuild,
    };
    if (gameDetails?.isUploadGameWiseModeBuild) {
      let id = singleModeData?._id ? singleModeData?._id : gameModeArr[0]?._id;
      if (!id) {
        return;
    }
      payload = {
        ...payload,
        gameModeId: id
      };
    }
    if (payload?.gameModeId === "1") {
      delete payload?.gameModeId;
    }
    dispatch(getGameBuildsList(payload)).then((res) => {
      setLoader(false);
      if (res.data.success) {
        setRowData({
          ...rowData,
          list: res?.data?.data?.docs,
          totalDocs: res?.data?.data?.totalDocs,
        });
      }
    });
  };

  //   const handleTabClick = (mode) => {
  //     setTabGameMode(mode);
  //   };
  return (
    <div className={"outer-box game_build_details_table"}>
      <div className={"d_flex_end"}>
        {hideActionFunc("game") && (
          <button
            className={"btn"}
            onClick={() => handleOpenModal("AddGameBuilds")}
          >
            {" "}
            + Add Game Builds{" "}
          </button>
        )}
      </div>
      {gameDetails?.isUploadGameWiseModeBuild && (
        <Box sx={{ width: "100%" }} className={"tab"}>
          <Box
            className="bg_white tab_inner_section"
            sx={{ borderBottom: 1, borderColor: "divider" }}
            pl={3}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              className={"tab_bg_white"}
              scrollButtons="auto"
              variant="scrollable"
            >
              {gameModeArr?.map((item, i) => {
                return (
                  <Tab
                    className={"tab_listing"}
                    name={item?._id}
                    label={item?.gameModeName}
                    {...a11yProps(i)}
                  />
                );
              })}
            </Tabs>
          </Box>
          {gameModeArr?.map((tab, i) => {
            return (
              <TabPanel value={value} index={i} key={i}>
                <ModeWiseGameBuild
                  rowData={rowData}
                  pagination={pagination}
                  setPagination={setPagination}
                  loader={loader}
                  handleOpenModal={handleOpenModal}
                />
              </TabPanel>
            );
          })}
        </Box>
      )}
      {!gameDetails?.isUploadGameWiseModeBuild && (
        <ModeWiseGameBuild
          rowData={rowData}
          pagination={pagination}
          setPagination={setPagination}
          loader={loader}
          handleOpenModal={handleOpenModal}
        />
      )}

      <CommonModal
        className={"Approved-reject-section"}
        modalIsOpen={modalDetails.modalIsOpen}
        handleOpenModal={handleOpenModal}
      >
        <Modal
          modalValue={modalDetails.modalValue}
          handleOpenModal={handleOpenModal}
          modalIsOpen={modalDetails.modalIsOpen}
          redirectApiHandler={gameBuildListDetails}
          gameBuilddata={rowData}
        />
      </CommonModal>
    </div>
  );
};
export default GameBuildsTab;
