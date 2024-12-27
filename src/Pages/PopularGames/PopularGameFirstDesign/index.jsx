import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import { useDispatch } from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import user from "../../../assets/images/avatar.png";
import {
  deleteUpcomingGamesDetails,
  getGameForPopularGamesList,
  getPopularGames,
  swapPositionDefaultGames,
  swapPositionUpcomingGames,
  updatePopularGame,
} from "../../../Redux/popularGames/action";
import { ActionFunction, hideActionFunc } from "../../../utils";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { createLegalPolicy } from "Redux/Documentation/action";
import ro from "date-fns/locale/ro";
import DefaultGamesList from "./DefaultGamesList";
import CustomizeGamesList from "./CustomizeGamesList";
import TableLoader from "hoc/CommonTable/TableLoader";

const PopularGamesFirst = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [modalDetails, setModalDetails] = useState({ modalValue: "", modalName: "", modalIsOpen: false });
  let Modal = PopComponent[modalDetails.modalName];
  const [formData,setFormData] = useState({
    isDefaultGameList : true,
    popularGame:[],
    type:''
  });

  const handleOpenModal = (type, data) => {
    switch (type) {
      case "CommonPop": {
        setModalDetails({...modalDetails, modalValue: data, modalName: type, modalIsOpen: true,});
        break;
      }
      case "CreateCustomizeGameList": {
        setModalDetails({...modalDetails, modalValue: data, modalName: type, modalIsOpen: true,});
        break;
      }
      case "DeletePopularGame": {
        setModalDetails({...modalDetails, modalValue: data, modalName: type, modalIsOpen: true,});
        break;
      }
      default: {
        setModalDetails({ ...modalDetails, modalIsOpen: false });
      }
    }
  };

  const changeGameListHandler = (e, type) =>{
    if (type === "default") {
      dispatch(getGameForPopularGamesList({ isDefault: true })).then((res) => {
        if (res.data.success) {
          let payload = {
            isDefault: true,
            popularGames: res.data.data?.map((item) => item?._id),
          };
          dispatch(updatePopularGame(payload)).then((res) => {
            if (res.data.success) {
              getPopularGamesList();
            }
          });
        }
      });
      setFormData({ ...formData, isDefaultGameList: true });
    }else if(type === 'custom') {
      setFormData({ ...formData, isDefaultGameList: false, popularGame: [] });
    }
  };

  useEffect(() => {
    getPopularGamesList();
  }, []);

  useEffect(()=>{
    if(formData?.isDefaultGameList && formData?.type === 'Update'){
      dispatch(getGameForPopularGamesList({ isDefault: true })).then((res) => {
        if (res.data.success) {
          let payload = {
            isDefault: true,
            popularGames: res.data.data?.map((item) => item?._id),
          };
          dispatch(updatePopularGame(payload)).then((res) => {
            getPopularGamesList('isUpdate')
          });
        }
      });
    }
  },[formData?.type , formData?.isDefaultGameList])

  const getPopularGamesList = (type) => {
    if(type === 'isUpdate') {
      setLoader(false)
    }else {
      setLoader(true);
    }
    dispatch(getPopularGames({})).then((res) => {
      setLoader(false);
      if (res.data?.success) {
        setFormData({
          ...formData,
          popularGame: res?.data?.data?.gameList,
          isDefaultGameList : res?.data?.data?.isDefault || false,
          type: res?.data?.data?.isDefault ? 'Update' : ''
        })
      }
    });
  };
  return (
    <Box>
      {loader ? <TableLoader /> : ""}
      <Paper sx={{ mb: 2 }} className="outer-box">
        <div className={'common_checkbox_details'}>
          <div className={'game_mode_btn'}>
            <div className={'game_mode_btn_option yes_radio_btn'}>
              <input type={"radio"} checked={formData?.isDefaultGameList} name={"popularGame"} onChange={(e) => changeGameListHandler(e, "default")} />
              <label>Default Games List</label>
            </div>
            <div className={'game_mode_btn_option no_radio_btn'}>
              <input type={"radio"} checked={!formData?.isDefaultGameList} name={"popularGame"} onChange={(e) => changeGameListHandler(e, "custom")} />
              <label>Customize Games List</label>
            </div>
          </div>
        </div>
        {
          formData?.isDefaultGameList ?
          <DefaultGamesList formData={formData} setFormData={setFormData} handleOpenModal={handleOpenModal} getPopularGamesList={getPopularGamesList} />
          : <CustomizeGamesList formData={formData} setFormData={setFormData} handleOpenModal={handleOpenModal} getPopularGamesList={getPopularGamesList} />
        }
      </Paper>
      <CommonModal className={"Approved-reject-section"} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
        <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getPopularGamesList} gameData={formData?.popularGame} />
      </CommonModal>
    </Box>
  );
};
export default PopularGamesFirst;
