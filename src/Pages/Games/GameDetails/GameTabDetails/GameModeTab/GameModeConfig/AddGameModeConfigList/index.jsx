import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import FilledButton from "../../../../../../../Components/FileButton";
import CommonModal from "../../../../../../../hoc/CommonModal";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../../../hoc/PopContent";
import GameConfigDropdown from "./GameConfigDropdown";
import { createGameModeDesignConfigList } from "../../../../../../../Redux/games/action"; // Removed unnecessary import

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

const AddGameModeConfigList = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [, updateState] = useState({});
  const simpleValidator = useRef(new SimpleReactValidator());
  const forceUpdate = useCallback(() => updateState({}), []);
  const [formData, setFormData] = useState({ gameModeDesignId: '' });
  const gameDetails = useSelector(state => state?.gameReducer?.gameDetails);
  const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
  let Modal = PopComponent[modalDetails.modalName];

  const handleOpenErrorModal = (type, data) => {
    switch (type) {
      case 'CommonPop':
        setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
        break;
      default:
        setModalDetails({ ...modalDetails, modalIsOpen: false });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      let payload = {
        ...formData,
        gameId: id
      };
      setLoader(true);
      dispatch(createGameModeDesignConfigList(payload)).then(res => {
        setLoader(false);
        if (res.data.success) {
          redirectApiHandler();
          handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
        } else {
          handleOpenErrorModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg });
        }
      });
    } else {
      simpleValidator.current.showMessages();
      forceUpdate();
    }
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
        let payload = {
            ...formData,
            gameId: id
        }
        setLoader(true)
        dispatch(createGameModeDesignConfigList(payload)).then(res => {
            if (res.data.success) {
                setLoader(false)
                redirectApiHandler();
                handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message });
            } else {
                setLoader(false)
                handleOpenErrorModal('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg });
            }
        })
    } else {
        simpleValidator.current.showMessages();
        forceUpdate();
    }
}
  useEffect(() => {
    if (modalValue?.isEdit) {
      setFormData({
        ...formData,
        gameModeDesignId: modalValue?.row?.gameModeDesignId?._id
      });
    }
  }, [modalValue]);

  return (
    <Box sx={style}>
      <div className={'add_admin_user_popup modal_main_popup number-Of-decks'}>
        <div className={'modal_popup_title'}>
          <h2>{modalValue?.isEdit ? 'Edit Game Mode Design config' : 'Add Game Mode Design config'}</h2>
        </div>
        <div className={'add_game_details_sec add_admin_user_popup_content'}>
          <form onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
            <div className={'select_game_platform_value game_mode game_mode_main_section-config'}>
              <GameConfigDropdown setFormData={setFormData} formData={formData} options={gameDetails?.gameModeDesign} name={'gameModeDesignId'} />
              {simpleValidator.current.message("Game Mode Option", formData.gameModeDesignId, "required")}
            </div>
            <div className={'formData_btn form_common_btn'}>
              <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
              <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'btn loader_css'} loading={loader} />
            </div>
          </form>
        </div>
      </div>
      <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenErrorModal}>
        <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenErrorModal} modalIsOpen={modalDetails.modalIsOpen} />
      </CommonModal>
    </Box>
  );
};

export default AddGameModeConfigList;
