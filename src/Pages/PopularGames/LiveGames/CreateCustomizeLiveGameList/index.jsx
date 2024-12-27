import { Box } from "@mui/material";
import FilledButton from "../../../../Components/FileButton";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import {
  getGameForPopularGamesList,
  getLiveGamesList,
  livegame,
  updatePopularGame,
  addPopularGame
} from "../../../../Redux/popularGames/action";
import CommonDropdown from "../../../../Components/Dropdown/CommonDropdown";
import CommonModal from "../../../../hoc/CommonModal";
import PopComponent from "../../../../hoc/PopContent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

const CreateCustomizeLiveGameList = ({
  modalValue,
  handleOpenModal,
  redirectApiHandler,
  rowData
}) => {
  const dispatch = useDispatch();
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);
  const [loader, setLoader] = useState(false);
  const simpleValidator = useRef(new SimpleReactValidator());
  const [formData, setFormData] = useState({
    liveGameId: "",
    isliveGameIconUpdated: false,
    gameCategory: [],
  });
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });

  let Modal = PopComponent[modalDetails.modalName];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      let payload = {
        gameId: formData?.liveGameId,
      };
      setLoader(true);
      dispatch(addPopularGame(payload)).then((res) => {
        if (res.data.success) {
          setLoader(false);
          redirectApiHandler();
          handleOpenModal("CommonPop", {
            header: "Success",
            body: res?.data?.message,
          });
        } else {
          setLoader(false);
          handleOpenModal("CommonPop", {
            header: "Error",
            body: res?.data?.message || res?.data?.msg,
          });
        }
      });
    } else {
      simpleValidator.current.showMessages();
      forceUpdate();
    }
  };

  const handleOpenErrorModal = (type, data) => {
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
      default: {
        setModalDetails({ ...modalDetails, modalIsOpen: false });
      }
    }
  };

  useEffect(() => {
    dispatch(getGameForPopularGamesList()).then((res) => {
      if (res.data.success) {
        setFormData({
          ...formData,
          gameCategory: res.data.data?.reduce((acc, cur) => {
            return [...acc, { _id: cur._id, gameName: cur?.gameName }];
          }, []),
        });
      }
    });
  }, [modalValue]);
  return (
    <Box sx={style}>
      <div className={"add_admin_user_popup modal_main_popup upcoming-popup-details"}>
        <div className={"modal_popup_title"}>
          <h2>{"Add Live Game"}</h2>
        </div>
        <div className={"add_admin_user_popup_content"}>
          <form method={"POST"} onSubmit={(e) => handleSubmit(e)}>
            <div className={"w_100"}>
              <div className={""}>
                <CommonDropdown
                  setFormData={setFormData}
                  formData={formData}
                  options={formData?.gameCategory.filter((x)=>!rowData?.list.some((i)=>i.gameId===x._id))}
                  name={"liveGameId"}
                  isAppDownload={""}
                  isLiveGame={true}
                  placeholder={'Select Live Game'}
                />
              </div>
            </div>
            {simpleValidator.current.message("Select Live Game", formData?.liveGameId, 'required')}

            <div className={"formData_btn"}>
              <button
                className={"btn_default"}
                onClick={() => handleOpenModal()}
              >
                Cancel
              </button>
              <FilledButton
                type={"submit"}
                value={modalValue?.isEdit ? "Update" : "Save"}
                className={"btn loader_css"}
                loading={loader}
              />
            </div>
          </form>
        </div>
      </div>
      <CommonModal
        className={"Approved-reject-section"}
        modalIsOpen={modalDetails.modalIsOpen}
        handleOpenModal={handleOpenErrorModal}
      >
        <Modal
          modalValue={modalDetails.modalValue}
          handleOpenModal={handleOpenErrorModal}
          modalIsOpen={modalDetails.modalIsOpen}
        />
      </CommonModal>
    </Box>
  );
};
export default CreateCustomizeLiveGameList;